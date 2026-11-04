"use client";

import { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { useParams } from "next/navigation";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";
import React from "react";
import { getAvailableSizes, needsSize } from "@/lib/sizing.mjs";

const Product = () => {
    const { id } = useParams();

    const { products, router, addToCart, currency } = useAppContext();

    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState("");
    const [productData, setProductData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProductData = async () => {
        try {
            if (!id) return;

            setLoading(true);

            const response = await fetch(`/api/product/${id}`, {
                cache: "no-store",
            });

            const data = await response.json();

            if (data.success) {
                setProductData(data.product);
                setSelectedSize("");
            } else {
                setProductData(null);
            }
        } catch (error) {
            console.error("Fetch single product error:", error);
            setProductData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    if (!productData) {
        return (
            <>
                <Navbar />

                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-2xl font-medium text-gray-800">
                            Product not available
                        </h2>
                        <p className="text-gray-500 mt-2">
                            The product you are looking for could not be found.
                        </p>

                        <button
                            onClick={() => router.push("/all-products")}
                            className="mt-6 px-6 py-3 bg-orange-500 text-white hover:bg-orange-600 transition"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>

                <Footer />
            </>
        );
    }

    return (
        <>
            <Navbar />

            <div className="px-6 md:px-16 lg:px-32 pt-14 space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    <div className="px-5 lg:px-16 xl:px-20">
                        <div className="rounded-lg overflow-hidden bg-gray-500/10 mb-4">
                            <Image
                                src={mainImage || productData.image[0]}
                                alt="alt"
                                className="w-full h-auto object-cover mix-blend-multiply"
                                width={1280}
                                height={720}
                            />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            {productData.image.map((image, index) => (
                                <div
                                    key={index}
                                    onClick={() => setMainImage(image)}
                                    className="cursor-pointer rounded-lg overflow-hidden bg-gray-500/10"
                                >
                                    <Image
                                        src={image}
                                        alt="alt"
                                        className="w-full h-auto object-cover mix-blend-multiply"
                                        width={1280}
                                        height={720}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-col">
                        <h1 className="text-3xl font-medium text-gray-800/90 mb-4">
                            {productData.name}
                        </h1>

                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-0.5">
                                <Image
                                    className="h-4 w-4"
                                    src={assets.star_icon}
                                    alt="star_icon"
                                />

                                <Image
                                    className="h-4 w-4"
                                    src={assets.star_icon}
                                    alt="star_icon"
                                />

                                <Image
                                    className="h-4 w-4"
                                    src={assets.star_icon}
                                    alt="star_icon"
                                />

                                <Image
                                    className="h-4 w-4"
                                    src={assets.star_icon}
                                    alt="star_icon"
                                />

                                <Image
                                    className="h-4 w-4"
                                    src={assets.star_dull_icon}
                                    alt="star_dull_icon"
                                />
                            </div>

                            <p>(4.5)</p>
                        </div>

                        <p className="text-gray-600 mt-3">
                            {productData.description}
                        </p>

                        <p className="text-3xl font-medium mt-6">
                            {currency}
                            {productData.offerPrice}

                            <span className="text-base font-normal text-gray-800/60 line-through ml-2">
                                {currency}
                                {productData.price}
                            </span>
                        </p>

                        <hr className="bg-gray-600 my-6" />

                        <div className="overflow-x-auto">
                            <table className="table-auto border-collapse w-full max-w-72">
                                <tbody>
                                    <tr>
                                        <td className="text-gray-600 font-medium">
                                            Brand
                                        </td>

                                        <td className="text-gray-800/50">
                                            Morven
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="text-gray-600 font-medium">
                                            Color
                                        </td>

                                        <td className="text-gray-800/50">
                                            Multi
                                        </td>
                                    </tr>

                                    <tr>
                                        <td className="text-gray-600 font-medium">
                                            Category
                                        </td>

                                        <td className="text-gray-800/50">
                                            {productData.category}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {needsSize(productData) && (
                          <div className="mt-7">
                            <label className="block text-sm font-medium text-gray-800 mb-3">Select size *</label>
                            <div className="flex flex-wrap gap-2" role="group" aria-label="Available sizes">
                              {getAvailableSizes(productData).map((size) => (
                                <button key={size} type="button" onClick={() => setSelectedSize(size)}
                                  aria-pressed={selectedSize === size}
                                  className={`border px-3 py-2 min-w-12 text-sm ${selectedSize === size ? "bg-black text-white border-black" : "border-gray-300 text-gray-800 hover:border-black"}`}>
                                  {size}
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                        <div className="flex items-center mt-10 gap-4">
                            <button
                                onClick={() =>
                                    addToCart(productData._id, selectedSize)
                                }
                                disabled={needsSize(productData) && !selectedSize}
                                className="w-full disabled:opacity-50 py-3.5 bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
                            >
                                Add to Cart
                            </button>

                            <button
                                onClick={async () => {
                                    const added = await addToCart(productData._id, selectedSize);
                                    if (added) router.push("/cart");
                                }}
                                disabled={needsSize(productData) && !selectedSize}
                                className="w-full disabled:opacity-50 py-3.5 bg-orange-500 text-white hover:bg-orange-600 transition"
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col items-center">
                    <div className="flex flex-col items-center mb-4 mt-16">
                        <p className="text-3xl font-medium">
                            Featured{" "}
                            <span className="font-medium text-orange-600">
                                Products
                            </span>
                        </p>

                        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6 pb-14 w-full">
                        {products
                            .slice(0, 5)
                            .map((product, index) => (
                                <ProductCard
                                    key={index}
                                    product={product}
                                />
                            ))}
                    </div>

                    <button className="px-8 py-2 mb-16 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
                        See more
                    </button>
                </div>
            </div>

            <Footer />
        </>
    );
};

export default Product;