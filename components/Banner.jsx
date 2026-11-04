
"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Banner = () => {
    const router = useRouter();

    const handleShopCollection = () => {
        router.push("/all-products");
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <section className="my-20 px-4 sm:px-6 lg:px-10">
            <div
                className="
                    group
                    relative
                    mx-auto
                    flex
                    max-w-[1400px]
                    flex-col
                    overflow-hidden
                    bg-[#f3f3f0]
                    md:min-h-[390px]
                    md:flex-row
                    md:items-stretch
                "
            >
                {/* Subtle background movement */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        -right-24
                        -top-24
                        h-72
                        w-72
                        rounded-full
                        bg-white/70
                        blur-3xl
                        transition-transform
                        duration-[1800ms]
                        ease-out
                        group-hover:translate-x-10
                        group-hover:translate-y-8
                    "
                />

                <div
                    className="
                        pointer-events-none
                        absolute
                        -bottom-32
                        -left-20
                        h-72
                        w-72
                        rounded-full
                        bg-black/[0.025]
                        blur-3xl
                    "
                />

                {/* Left Image */}
                <div
                    className="
                        relative
                        flex
                        h-[230px]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        md:h-auto
                        md:w-[28%]
                        md:justify-start
                    "
                >
                    <Image
                        src={assets.jbl_soundbox_image}
                        alt="Morven premium menswear collection"
                        width={600}
                        height={600}
                        className="
                            h-full
                            w-auto
                            max-w-[260px]
                            object-contain
                            opacity-95
                            transition-transform
                            duration-[1400ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:-translate-x-2
                            group-hover:scale-[1.05]
                            md:ml-4
                            lg:ml-8
                            lg:max-w-[290px]
                        "
                    />

                    {/* Image fade */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-transparent
                            via-transparent
                            to-[#f3f3f0]
                            md:block
                        "
                    />
                </div>

                {/* Main Content */}
                <div
                    className="
                        relative
                        z-10
                        flex
                        flex-1
                        flex-col
                        items-center
                        justify-center
                        px-6
                        py-10
                        text-center
                        md:items-start
                        md:px-8
                        md:py-12
                        md:text-left
                        lg:px-12
                    "
                >
                    {/* Eyebrow */}
                    <div className="mb-4 flex items-center gap-3">
                        <span className="h-px w-8 bg-black" />

                        <p
                            className="
                                text-[9px]
                                font-medium
                                uppercase
                                tracking-[0.35em]
                                text-gray-500
                            "
                        >
                            MORVEN COLLECTION
                        </p>

                        <span className="h-px w-8 bg-black md:hidden" />
                    </div>

                    {/* Heading */}
                    <h2
                        className="
                            max-w-[520px]
                            text-3xl
                            font-medium
                            leading-[1.05]
                            tracking-[-0.04em]
                            text-black
                            sm:text-4xl
                            md:text-4xl
                            lg:text-[48px]
                        "
                    >
                        Elevate Your
                        <span className="block text-gray-500">
                            Presence.
                        </span>
                    </h2>

                    {/* Description */}
                    <p
                        className="
                            mt-5
                            max-w-[470px]
                            text-xs
                            leading-6
                            text-gray-500
                            sm:text-sm
                            md:mt-4
                        "
                    >
                        Discover premium suits, refined shirts,
                        sophisticated trousers and timeless menswear
                        designed for the modern gentleman.
                    </p>

                    {/* CTA */}
                    <button
                        type="button"
                        onClick={handleShopCollection}
                        className="
                            group/button
                            mt-7
                            flex
                            items-center
                            gap-4
                            bg-black
                            px-6
                            py-3
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.2em]
                            text-white
                            transition-all
                            duration-300
                            hover:bg-gray-800
                            hover:px-7
                        "
                    >
                        <span>
                            Shop Collection
                        </span>

                        <span
                            className="
                                text-sm
                                transition-transform
                                duration-300
                                group-hover/button:translate-x-1.5
                            "
                        >
                            →
                        </span>
                    </button>

                    {/* Bottom details */}
                    <div
                        className="
                            mt-8
                            flex
                            items-center
                            gap-4
                            text-[8px]
                            uppercase
                            tracking-[0.18em]
                            text-gray-400
                        "
                    >
                        <span>Premium Menswear</span>

                        <span className="h-3 w-px bg-gray-300" />

                        <span>Timeless Style</span>

                        <span className="h-3 w-px bg-gray-300" />

                        <span>Morven</span>
                    </div>
                </div>

                {/* Right Image */}
                <div
                    className="
                        relative
                        hidden
                        w-[30%]
                        overflow-hidden
                        md:flex
                        md:items-center
                        md:justify-end
                        lg:w-[32%]
                    "
                >
                    <Image
                        src={assets.md_controller_image}
                        alt="Morven menswear"
                        width={700}
                        height={700}
                        className="
                            h-full
                            w-full
                            object-contain
                            object-right
                            transition-transform
                            duration-[1600ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:translate-x-2
                            group-hover:scale-[1.04]
                        "
                    />

                    {/* Right image fade */}
                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-y-0
                            left-0
                            w-24
                            bg-gradient-to-r
                            from-[#f3f3f0]
                            to-transparent
                        "
                    />
                </div>

                {/* Mobile Image */}
                <div
                    className="
                        relative
                        flex
                        h-[250px]
                        w-full
                        items-center
                        justify-center
                        overflow-hidden
                        md:hidden
                    "
                >
                    <Image
                        src={assets.sm_controller_image}
                        alt="Morven menswear collection"
                        width={600}
                        height={600}
                        className="
                            h-full
                            w-auto
                            max-w-[330px]
                            object-contain
                            transition-transform
                            duration-[1400ms]
                            ease-[cubic-bezier(0.22,1,0.36,1)]
                            group-hover:scale-[1.04]
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            inset-x-0
                            bottom-0
                            h-20
                            bg-gradient-to-t
                            from-[#f3f3f0]
                            to-transparent
                        "
                    />
                </div>

                {/* Decorative border */}
                <div
                    className="
                        pointer-events-none
                        absolute
                        inset-3
                        border
                        border-black/[0.04]
                        transition-all
                        duration-700
                        group-hover:inset-4
                        group-hover:border-black/[0.08]
                    "
                />
            </div>
        </section>
    );
};

export default Banner;

