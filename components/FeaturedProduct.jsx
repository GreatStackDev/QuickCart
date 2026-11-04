
"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const products = [
    {
        id: 1,
        image: assets.girl_with_headphone_image,
        number: "01",
        eyebrow: "THE SUIT COLLECTION",
        title: "Premium Suits",
        description:
            "Discover refined tailoring crafted for confidence, elegance, and distinction.",
    },
    {
        id: 2,
        image: assets.girl_with_earphone_image,
        number: "02",
        eyebrow: "MODERN ESSENTIALS",
        title: "Modern Menswear",
        description:
            "Elevate your wardrobe with sophisticated pieces designed for the modern gentleman.",
    },
    {
        id: 3,
        image: assets.boy_with_laptop_image,
        number: "03",
        eyebrow: "COMPLETE THE LOOK",
        title: "Complete Your Look",
        description:
            "Discover premium pieces that bring style, comfort, and confidence together.",
    },
];

const FeaturedProduct = () => {
    const router = useRouter();

    const handleShopNow = () => {
        router.push("/all-products");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className="mt-20 w-full overflow-hidden bg-white sm:mt-24">
            {/* SECTION HEADING */}
            <div className="mx-auto flex max-w-7xl flex-col items-center px-5 text-center sm:px-8">
                {/* SMALL LABEL */}
                <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-8 bg-black" />

                    <p className="text-[9px] font-medium uppercase tracking-[0.35em] text-gray-500">
                        MORVEN COLLECTION
                    </p>

                    <span className="h-px w-8 bg-black" />
                </div>

                {/* TITLE */}
                <h2 className="text-3xl font-medium tracking-[-0.035em] text-black sm:text-4xl lg:text-[42px]">
                    Featured Collection
                </h2>

                {/* DESCRIPTION */}
                <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-[15px]">
                    Discover carefully selected pieces designed to
                    define your presence and elevate your everyday
                    style.
                </p>
            </div>

            {/* COLLECTION GRID */}
            <div className="mx-auto mt-12 grid max-w-[1400px] grid-cols-1 gap-5 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                {products.map(
                    ({
                        id,
                        image,
                        number,
                        eyebrow,
                        title,
                        description,
                    }) => (
                        <div
                            key={id}
                            onClick={handleShopNow}
                            className="
                                group
                                relative
                                h-[470px]
                                w-full
                                cursor-pointer
                                overflow-hidden
                                bg-[#f3f3f0]
                                sm:h-[500px]
                                lg:h-[560px]
                            "
                        >
                            {/* IMAGE */}
                            <div className="absolute inset-0 overflow-hidden">
                                <Image
                                    src={image}
                                    alt={title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="
                                        object-cover
                                        transition-transform
                                        duration-[1200ms]
                                        ease-[cubic-bezier(0.22,1,0.36,1)]
                                        group-hover:scale-[1.07]
                                    "
                                />
                            </div>

                            {/* DARK GRADIENT */}
                            <div
                                className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-black/85
                                    via-black/20
                                    to-black/5
                                    transition-all
                                    duration-700
                                    group-hover:from-black/90
                                    group-hover:via-black/30
                                "
                            />

                            {/* TOP NUMBER */}
                            <div className="absolute left-6 top-6 flex items-center gap-3 sm:left-7 sm:top-7">
                                <span className="text-[10px] font-medium tracking-[0.2em] text-white/80">
                                    {number}
                                </span>

                                <span className="h-px w-8 bg-white/40" />
                            </div>

                            {/* TOP RIGHT LABEL */}
                            <div className="absolute right-5 top-5 sm:right-6 sm:top-6">
                                <span
                                    className="
                                        border
                                        border-white/30
                                        px-3
                                        py-1.5
                                        text-[8px]
                                        font-medium
                                        uppercase
                                        tracking-[0.18em]
                                        text-white
                                        backdrop-blur-sm
                                    "
                                >
                                    Morven
                                </span>
                            </div>

                            {/* CONTENT */}
                            <div
                                className="
                                    absolute
                                    bottom-0
                                    left-0
                                    w-full
                                    p-6
                                    text-white
                                    sm:p-7
                                    lg:p-8
                                "
                            >
                                {/* EYEBROW */}
                                <div className="mb-3 flex items-center gap-2">
                                    <span className="h-px w-6 bg-white" />

                                    <p className="text-[8px] font-medium uppercase tracking-[0.25em] text-white/75 sm:text-[9px]">
                                        {eyebrow}
                                    </p>
                                </div>

                                {/* TITLE */}
                                <h3
                                    className="
                                        text-2xl
                                        font-medium
                                        tracking-[-0.025em]
                                        text-white
                                        transition-transform
                                        duration-500
                                        group-hover:-translate-y-1
                                        sm:text-3xl
                                    "
                                >
                                    {title}
                                </h3>

                                {/* DESCRIPTION */}
                                <p
                                    className="
                                        mt-3
                                        max-w-[330px]
                                        text-xs
                                        leading-5
                                        text-white/75
                                        transition-all
                                        duration-500
                                        sm:text-sm
                                        sm:leading-6
                                        group-hover:text-white/90
                                    "
                                >
                                    {description}
                                </p>

                                {/* CTA */}
                                <div className="mt-5">
                                    <button
                                        type="button"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleShopNow();
                                        }}
                                        className="
                                            group/button
                                            flex
                                            items-center
                                            gap-3
                                            text-[9px]
                                            font-medium
                                            uppercase
                                            tracking-[0.2em]
                                            text-white
                                        "
                                    >
                                        <span className="relative">
                                            Shop Collection

                                            <span
                                                className="
                                                    absolute
                                                    -bottom-2
                                                    left-0
                                                    h-px
                                                    w-0
                                                    bg-white
                                                    transition-all
                                                    duration-500
                                                    group-hover/button:w-full
                                                "
                                            />
                                        </span>

                                        <span
                                            className="
                                                flex
                                                h-7
                                                w-7
                                                items-center
                                                justify-center
                                                border
                                                border-white/40
                                                transition-all
                                                duration-300
                                                group-hover/button:bg-white
                                                group-hover/button:text-black
                                            "
                                        >
                                            →
                                        </span>
                                    </button>
                                </div>
                            </div>

                            {/* HOVER BORDER */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-3
                                    border
                                    border-white/0
                                    transition-all
                                    duration-700
                                    group-hover:border-white/20
                                "
                            />
                        </div>
                    )
                )}
            </div>

            {/* VIEW ALL */}
            <div className="mt-10 flex justify-center sm:mt-12">
                <button
                    type="button"
                    onClick={handleShopNow}
                    className="
                        group
                        flex
                        items-center
                        gap-4
                        border-b
                        border-black
                        pb-2
                        text-[9px]
                        font-medium
                        uppercase
                        tracking-[0.25em]
                        text-black
                        transition-all
                        duration-300
                        hover:gap-6
                    "
                >
                    <span>Explore All Collections</span>

                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </button>
            </div>
        </section>
    );
};

export default FeaturedProduct;

