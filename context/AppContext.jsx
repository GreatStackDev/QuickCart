"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

import { parseCartKey, makeCartKey, needsSize, getAvailableSizes } from "@/lib/sizing.mjs";

export const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const currency = "GH₵";
  const router = useRouter();

  const { user, isSignedIn } = useUser();
  const { getToken } = useAuth();

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(true);

  const [userData, setUserData] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});

  const fetchProductData = async () => {
    try {
      setProductsLoading(true);

      const { data } = await axios.get("/api/product/list");

      if (data.success) {
        setProducts(data.products || []);
      } else {
        toast.error(data.message);
        setProducts([]);
      }
    } catch (error) {
      console.error("Fetch product data error:", error);

      setProducts([]);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch products"
      );
    } finally {
      setProductsLoading(false);
    }
  };

  const fetchUserData = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get("/api/user/data", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data.user);
        setCartItems(data.user.cartItems || {});

        if (user?.publicMetadata?.role === "seller") {
          setIsSeller(true);
        } else {
          setIsSeller(false);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Fetch user data error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to fetch user data"
      );
    }
  };

  const addToCart = async (itemId, size = "") => {
    try {
      const product = products.find((item) => item._id === itemId);
      if (product && needsSize(product) && !getAvailableSizes(product).includes(size)) {
        toast.error("Select your size on the product page first.");
        router.push("/product/" + itemId);
        return false;
      }
      const key = makeCartKey(itemId, size);
      const cartData = structuredClone(cartItems);
      cartData[key] = (cartData[key] || 0) + 1;
      if (cartData[key] > 25) {
        toast.error("Maximum 25 units per size.");
        return false;
      }

      const token = await getToken();

      const { data } = await axios.post(
        "/api/cart/update",
        {
          cartItems: cartData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setCartItems(cartData);
        toast.success("Product added to cart");
        return true;
      } else {
        toast.error(data.message);
        return false;
      }
    } catch (error) {
      console.error("Add to cart error:", error);

      toast.error(
        error.response?.data?.message || error.message || "Failed to add product to cart"
      );
      return false;
    }
  };

  const updateCartQuantity = async (itemId, quantity) => {
    try {
      const cartData = structuredClone(cartItems);

      if (quantity === 0) {
        delete cartData[itemId];
      } else {
        cartData[itemId] = quantity;
      }

      if (!Number.isSafeInteger(quantity) || quantity < 0 || quantity > 25) {
        toast.error("Choose a quantity between 0 and 25.");
        return;
      }

      const token = await getToken();

      const { data } = await axios.post(
        "/api/cart/update",
        {
          cartItems: cartData,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!data.success) {
        toast.error(data.message);
      } else {
        setCartItems(cartData);
      }
    } catch (error) {
      console.error("Update cart quantity error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to update cart"
      );
    }
  };

  const getCartCount = () => {
    let totalCount = 0;

    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        totalCount += cartItems[itemId];
      }
    }

    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const { productId } = parseCartKey(itemId);
      const itemInfo = products.find((product) => product._id === productId);

      if (itemInfo && cartItems[itemId] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[itemId];
      }
    }

    return Math.floor(totalAmount * 100) / 100;
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  useEffect(() => {
    if (user && isSignedIn) {
      fetchUserData();
    } else {
      setUserData(false);
      setCartItems({});
      setIsSeller(false);
    }
  }, [user, isSignedIn]);

  const value = {
    user,
    isSignedIn,
    getToken,
    currency,
    router,

    isSeller,
    setIsSeller,

    userData,
    fetchUserData,

    products,
    productsLoading,
    fetchProductData,

    cartItems,
    setCartItems,
    addToCart,
    updateCartQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};