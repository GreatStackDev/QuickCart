
import { useAppContext } from "@/context/AppContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { parseCartKey } from "@/lib/sizing.mjs";

const OrderSummary = () => {

  const {
    currency,
    router,
    getCartCount,
    getCartAmount,
    getToken,
    user,
    cartItems,
    setCartItems,
  } = useAppContext();

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [userAddresses, setUserAddresses] = useState([]);

  const [paymentLoading, setPaymentLoading] = useState(false);

  const fetchUserAddresses = async () => {
    try {
      const token = await getToken();

      const { data } = await axios.get(
        "/api/user/get-address",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setUserAddresses(data.addresses);

        if (data.addresses.length > 0) {
          setSelectedAddress(data.addresses[0]);
        }

      } else {
        toast.error(data.message);
      }

    } catch (error) {
      console.error("Fetch addresses error:", error);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to fetch addresses"
      );
    }
  };

  const handleAddressSelect = (address) => {
    setSelectedAddress(address);
    setIsDropdownOpen(false);
  };

  const createOrder = async () => {
    try {

      if (!selectedAddress) {
        return toast.error("Please select an address");
      }

      let cartItemsArray = Object.keys(cartItems).map((key) => ({
        product: parseCartKey(key).productId,
        size: parseCartKey(key).size,
        quantity: cartItems[key],
      }));

      cartItemsArray = cartItemsArray.filter(
        (item) => item.quantity > 0
      );

      if (cartItemsArray.length === 0) {
        return toast.error("Cart is empty");
      }

      setPaymentLoading(true);

      const token = await getToken();

      const { data } = await axios.post(
        "/api/paystack/initialize",
        {
          address: selectedAddress._id,
          items: cartItemsArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        window.location.href = data.authorization_url;
      } else {
        setPaymentLoading(false);

        toast.error(
          data.message ||
          "Unable to initialize payment"
        );
      }

    } catch (error) {
      console.error("Paystack payment error:", error);

      setPaymentLoading(false);

      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to initialize payment"
      );
    }
  };

  useEffect(() => {
    if (user) {
      fetchUserAddresses();
    }
  }, [user]);

  return (
    <div className="w-full md:w-96 bg-gray-500/5 p-5">

      <h2 className="text-xl md:text-2xl font-medium text-gray-700">
        Order Summary
      </h2>

      <hr className="border-gray-500/30 my-5" />

      <div className="space-y-6">

        {/* Select Address */}
        <div>

          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Select Address
          </label>

          <div className="relative inline-block w-full text-sm border">

            <button
              type="button"
              className="peer w-full text-left px-4 pr-2 py-2 bg-white text-gray-700 focus:outline-none"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >

              <span>
                {selectedAddress
                  ? `${selectedAddress.fullName}, ${selectedAddress.area}, ${selectedAddress.city}, ${selectedAddress.state}`
                  : "Select Address"}
              </span>

              <svg
                className={`w-5 h-5 inline float-right transition-transform duration-200 ${
                  isDropdownOpen ? "rotate-0" : "-rotate-90"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="#6B7280"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>

            </button>

            {isDropdownOpen && (
              <ul className="absolute w-full bg-white border shadow-md mt-1 z-10 py-1.5">

                {userAddresses.map((address) => (
                  <li
                    key={address._id}
                    className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer"
                    onClick={() => handleAddressSelect(address)}
                  >
                    {address.fullName}, {address.area}, {address.city}, {address.state}
                  </li>
                ))}

                <li
                  onClick={() => router.push("/add-address")}
                  className="px-4 py-2 hover:bg-gray-500/10 cursor-pointer text-center"
                >
                  + Add New Address
                </li>

              </ul>
            )}

          </div>

        </div>

        {/* Promo Code */}
        <div>

          <label className="text-base font-medium uppercase text-gray-600 block mb-2">
            Promo Code
          </label>

          <div className="flex flex-col items-start gap-3">

            <input
              type="text"
              placeholder="Promo codes are not available yet"
              disabled
              className="flex-grow w-full outline-none p-2.5 text-gray-600 border"
            />

            <button
              type="button"
              disabled
              className="bg-gray-400 text-white px-9 py-2 cursor-not-allowed"
            >
              Apply
            </button>

          </div>

        </div>

        <hr className="border-gray-500/30 my-5" />

        {/* Order Amount */}
        <div className="space-y-4">

          <div className="flex justify-between text-base font-medium">

            <p className="uppercase text-gray-600">
              Items {getCartCount()}
            </p>

            <p className="text-gray-800">
              {currency}{getCartAmount()}
            </p>

          </div>

          <div className="flex justify-between">

            <p className="text-gray-600">
              Shipping Fee
            </p>

            <p className="font-medium text-gray-800">
              Free
            </p>

          </div>

          <div className="flex justify-between">

            <p className="text-gray-600">
              Tax (2%)
            </p>

            <p className="font-medium text-gray-800">
              {currency}{(Math.round(getCartAmount() * 100 * 0.02) / 100).toFixed(2)}
            </p>

          </div>

          <div className="flex justify-between text-lg md:text-xl font-medium border-t pt-3">

            <p>Total</p>

            <p>
              {currency}
              {(getCartAmount() + Math.round(getCartAmount() * 100 * 0.02) / 100).toFixed(2)}
            </p>

          </div>

        </div>

      </div>

      {/* Pay with Paystack */}
      <button
        onClick={createOrder}
        disabled={paymentLoading || getCartCount() === 0}
        className="w-full bg-orange-600 text-white py-3 mt-5 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {paymentLoading ? "Processing Payment..." : "Pay with Paystack"}
      </button>

    </div>
  );
};

export default OrderSummary;
