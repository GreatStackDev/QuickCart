
'use client'

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";
import { getCategorySizeOptions, getAvailableSizes } from "@/lib/sizing.mjs";
import Footer from "@/components/seller/Footer";
import Loading from "@/components/Loading";

const ProductList = () => {

  const { router, getToken } = useAppContext()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchSellerProduct = async () => {
    try {
      const token = await getToken();

      const response = await fetch("/api/product/seller-list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.success) {
        setProducts(data.products);
      } else {
        console.error(data.message);
      }

    } catch (error) {
      console.error("Failed to fetch seller products:", error);
    } finally {
      setLoading(false);
    }
  }

  const deleteProduct = async (productId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = await getToken();

      const response = await fetch("/api/product/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId,
        }),
      });

      const data = await response.json();

      if (data.success) {

        setProducts((prevProducts) =>
          prevProducts.filter(
            (product) => product._id !== productId
          )
        );

        alert("Product deleted successfully");

      } else {
        alert(data.message || "Failed to delete product");
      }

    } catch (error) {
      console.error("Delete product error:", error);

      alert("Failed to delete product");
    }
  }

  const editSizes = async (product) => {
    const options = getCategorySizeOptions(product.category);
    if (!options.length) return;
    const entry = window.prompt(
      `Available ${product.category} sizes (comma-separated). Choose from: ${options.join(", ")}`,
      getAvailableSizes(product).join(", ")
    );
    if (entry === null) return;
    const availableSizes = [...new Set(entry.split(",").map(x => x.trim()).filter(Boolean))];
    if (!availableSizes.length || availableSizes.some(x => !options.includes(x))) {
      alert("Enter one or more sizes from the available options.");
      return;
    }
    try {
      const token = await getToken();
      const response = await fetch("/api/product/sizes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ productId: product._id, availableSizes }),
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message || "Unable to save sizes.");
      setProducts(prev => prev.map(item => item._id === product._id ? { ...item, availableSizes } : item));
      alert("Available sizes updated.");
    } catch (error) { alert(error.message); }
  };

  useEffect(() => {
    fetchSellerProduct();
  }, [])

  return (
    <div className="flex-1 min-h-screen flex flex-col justify-between">

      {loading ? <Loading /> : <div className="w-full md:p-10 p-4">

        <h2 className="pb-4 text-lg font-medium">
          All Products
        </h2>

        <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-black/10">

          <table className="table-fixed w-full overflow-hidden">

            <thead className="text-black text-sm text-left bg-gray-50">

              <tr>

                <th className="w-2/3 md:w-2/5 px-4 py-3 font-medium truncate">
                  Product
                </th>

                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Category
                </th>

                <th className="px-4 py-3 font-medium truncate">
                  Price
                </th>

                <th className="px-4 py-3 font-medium truncate max-sm:hidden">
                  Action
                </th>

              </tr>

            </thead>

            <tbody className="text-sm text-gray-500">

              {products.map((product, index) => (

                <tr
                  key={product._id || index}
                  className="border-t border-black/10"
                >

                  <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">

                    <div className="bg-gray-100 rounded p-2">

                      <Image
                        src={product.image[0]}
                        alt="product Image"
                        className="w-16"
                        width={1280}
                        height={720}
                      />

                    </div>

                    <span className="truncate w-full text-black">
                      {product.name}
                    </span>

                  </td>

                  <td className="px-4 py-3 max-sm:hidden text-gray-600">
                    {product.category}
                  </td>

                  <td className="px-4 py-3 text-black font-medium">
                    GH₵{product.offerPrice}
                  </td>

                  <td className="px-4 py-3 max-sm:hidden">

                    <div className="flex items-center gap-2">

                      <button
                        onClick={() =>
                          router.push(`/product/${product._id}`)
                        }
                        className="flex items-center gap-1 px-1.5 md:px-3.5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                      >

                        <span className="hidden md:block">
                          Visit
                        </span>

                        <Image
                          className="h-3.5"
                          src={assets.redirect_icon}
                          alt="redirect_icon"
                        />

                      </button>

                      {getCategorySizeOptions(product.category).length > 0 && (
                        <button type="button" onClick={() => editSizes(product)}
                          className="px-2 py-2 border border-black text-black rounded-md hover:bg-gray-100">
                          Sizes
                        </button>
                      )}

                      <button
                        onClick={() =>
                          deleteProduct(product._id)
                        }
                        className="px-1.5 md:px-3.5 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                      >
                        Delete
                      </button>

                    </div>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>}

      <Footer />

    </div>
  );
};

export default ProductList;
