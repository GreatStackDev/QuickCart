
"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useAppContext } from "@/context/AppContext";

const ProductCard = ({ product }) => {
    const { currency, router } = useAppContext();

    const rating = 4.5;

    const handleProductClick = () => {
        router.push("/product/" + product._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const handleHeartClick = (e) => {
        e.stopPropagation();
    };

    const handleBuyNow = (e) => {
        e.stopPropagation();

        router.push("/product/" + product._id);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div
            onClick={handleProductClick}
            className="
                group
                flex
                w-full
                max-w-[210px]
                cursor-pointer
                flex-col
                items-start
                transition-all
                duration-500
                ease-out
                hover:-translate-y-1
            "
        >
            {/* PRODUCT IMAGE */}
            <div
                className="
                    relative
                    flex
                    h-[220px]
                    w-full
                    items-center
                    justify-center
                    overflow-hidden
                    bg-[#f6f6f4]
                    border
                    border-transparent
                    transition-all
                    duration-500
                    group-hover:border-black/10
                    group-hover:shadow-[0_10px_28px_rgba(0,0,0,0.07)]
                "
            >
                <div className="relative h-full w-full overflow-hidden">
                    <Image
                        src={product?.image?.[0]}
                        alt={product?.name || "Morven product"}
                        width={800}
                        height={800}
                        unoptimized
                        className="
                            h-full
                            w-full
                            object-cover
                            transition-transform
                            duration-700
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:scale-[1.05]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-black/0
                            transition-all
                            duration-500
                            group-hover:bg-black/[0.025]
                        "
                    />
                </div>

                {/* HEART */}
                <button
                    type="button"
                    onClick={handleHeartClick}
                    aria-label="Add to wishlist"
                    className="
                        absolute
                        right-2.5
                        top-2.5
                        flex
                        h-8
                        w-8
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/5
                        bg-white/95
                        shadow-[0_3px_12px_rgba(0,0,0,0.07)]
                        backdrop-blur-sm
                        transition-all
                        duration-300
                        hover:scale-110
                        hover:bg-black
                    "
                >
                    <Image
                        src={assets.heart_icon}
                        alt="Wishlist"
                        width={13}
                        height={13}
                        className="
                            h-[13px]
                            w-[13px]
                            object-contain
                        "
                    />
                </button>

                {/* VIEW PRODUCT */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-2.5
                        left-1/2
                        hidden
                        -translate-x-1/2
                        translate-y-2
                        whitespace-nowrap
                        bg-black
                        px-3.5
                        py-1.5
                        text-[8px]
                        font-medium
                        uppercase
                        tracking-[0.18em]
                        text-white
                        opacity-0
                        transition-all
                        duration-300
                        group-hover:translate-y-0
                        group-hover:opacity-100
                        sm:block
                    "
                >
                    View Product
                </div>
            </div>

            {/* PRODUCT DETAILS */}
            <div className="w-full pt-2">
                {/* NAME */}
                <p
                    className="
                        w-full
                        truncate
                        text-[13px]
                        font-medium
                        leading-5
                        tracking-[-0.01em]
                        text-black
                        transition-colors
                        duration-300
                        group-hover:text-gray-600
                    "
                >
                    {product?.name}
                </p>

                {/* DESCRIPTION */}
                <p
                    className="
                        mt-0.5
                        hidden
                        w-full
                        truncate
                        text-[10px]
                        leading-4
                        text-gray-400
                        sm:block
                    "
                >
                    {product?.description}
                </p>

                {/* RATING */}
                <div className="mt-1.5 flex items-center gap-1.5">
                    <span className="text-[9px] font-medium text-gray-500">
                        {rating}
                    </span>

                    <div className="flex items-center gap-[1px]">
                        {Array.from({ length: 5 }).map(
                            (_, index) => (
                                <Image
                                    key={index}
                                    src={
                                        index <
                                        Math.floor(rating)
                                            ? assets.star_icon
                                            : assets.star_dull_icon
                                    }
                                    alt="star"
                                    width={10}
                                    height={10}
                                    className="h-[10px] w-[10px]"
                                />
                            )
                        )}
                    </div>
                </div>

                {/* PRICE + BUY */}
                <div
                    className="
                        mt-1.5
                        flex
                        min-h-[30px]
                        w-full
                        items-center
                        justify-between
                    "
                >
                    <span
                        className="
                            text-[14px]
                            font-medium
                            leading-none
                            tracking-[-0.02em]
                            text-black
                        "
                    >
                        {currency}
                        {product?.offerPrice}
                    </span>

                    {/* BUY NOW */}
                    <button
                        type="button"
                        onClick={handleBuyNow}
                        className="
                            group/buy
                            hidden
                            items-center
                            gap-1.5
                            border
                            border-black/15
                            px-3
                            py-1.5
                            text-[8px]
                            font-medium
                            uppercase
                            tracking-[0.14em]
                            text-black
                            transition-all
                            duration-300
                            hover:border-black
                            hover:bg-black
                            hover:text-white
                            sm:flex
                        "
                    >
                        <span>Buy Now</span>

                        <span
                            className="
                                transition-transform
                                duration-300
                                group-hover/buy:translate-x-1
                            "
                        >
                            →
                        </span>
                    </button>
                </div>

                {/* MOBILE VIEW PRODUCT */}
                <div
                    className="
                        mt-2
                        flex
                        items-center
                        gap-1.5
                        border-t
                        border-black/5
                        pt-1.5
                        sm:hidden
                    "
                >
                    <span
                        className="
                            text-[7px]
                            font-medium
                            uppercase
                            tracking-[0.16em]
                            text-gray-500
                        "
                    >
                        View Product
                    </span>

                    <span className="text-[10px] text-black">
                        →
                    </span>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
