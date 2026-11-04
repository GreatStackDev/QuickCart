
'use client';

import React from "react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";

const About = () => {

    const { router } = useAppContext();

    const values = [
        {
            number: "01",
            title: "Quality",
            text: "We believe quality should be seen, felt and experienced. Every piece is selected with attention to fabric, construction, comfort and finishing."
        },
        {
            number: "02",
            title: "Timeless Style",
            text: "Our collections combine contemporary fashion with timeless essentials that remain relevant beyond seasonal trends."
        },
        {
            number: "03",
            title: "Confidence",
            text: "Clothing should make you feel ready. Morven is designed for people who want to look polished, feel confident and make an impression."
        },
        {
            number: "04",
            title: "Experience",
            text: "From discovering a collection to completing your purchase, we aim to make every interaction with Morven simple, refined and memorable."
        }
    ];

    const categories = [
        "Suits",
        "Shirts",
        "Jackets",
        "Trousers",
        "T-Shirts",
        "Knitwear",
        "Shoes",
        "Accessories"
    ];

    return (
        <div className="bg-white text-[#3F3D39]">

            {/* HERO */}
            <section className="relative min-h-[76vh] overflow-hidden bg-[#F3F1EC] flex items-center">

                <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute right-[-8%] top-[-20%] h-[620px] w-[620px] rounded-full border border-[#3F3D39]/[0.05]" />

                    <div className="absolute right-[6%] top-[-5%] h-[450px] w-[450px] rounded-full border border-[#3F3D39]/[0.05]" />

                    <div className="absolute left-[55%] top-0 h-full w-px bg-[#3F3D39]/[0.04]" />

                </div>

                <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-10 py-24 md:py-32">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-16 items-end">

                        <div>

                            <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#77736B] mb-8">
                                The Morven Story
                            </p>

                            <h1 className="text-5xl md:text-7xl lg:text-[100px] font-light leading-[0.88] tracking-[-0.065em] text-[#3F3D39]">
                                Designed for
                                <span className="block font-medium">
                                    the way you live.
                                </span>
                            </h1>

                            <p className="max-w-xl mt-10 text-sm md:text-base leading-8 text-[#77736B]">
                                Morven is a modern fashion destination built around
                                sophisticated style, quality craftsmanship and confident
                                dressing. We believe what you wear should reflect who you are.
                            </p>

                            <button
                                onClick={() => router.push("/all-products")}
                                className="
                                    mt-9
                                    border border-[#3F3D39]/30
                                    bg-white
                                    px-8 py-3.5
                                    text-[10px] uppercase tracking-[0.25em]
                                    text-[#3F3D39]
                                    transition-all duration-300
                                    hover:bg-[#E8E5DE]
                                    hover:border-[#3F3D39]/40
                                "
                            >
                                Explore Collection
                            </button>

                        </div>

                        <div className="hidden lg:flex justify-end">

                            <div className="w-56 h-72 bg-white border border-[#D6D2C9] p-7 flex flex-col justify-between shadow-[0_20px_60px_rgba(63,61,57,0.05)]">

                                <div className="flex items-center justify-between">

                                    <span className="text-[9px] uppercase tracking-[0.3em] text-[#77736B]">
                                        Morven
                                    </span>

                                    <span className="text-[9px] tracking-[0.2em] text-[#AAA69E]">
                                        01
                                    </span>

                                </div>

                                <div>

                                    <div className="h-px w-12 bg-[#D6D2C9] mb-5" />

                                    <p className="text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                        Accra
                                    </p>

                                    <p className="mt-1 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                        Ghana
                                    </p>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="absolute bottom-8 left-6 md:left-10 flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                    <span>Discover Morven</span>
                    <span className="h-px w-10 bg-[#D6D2C9]" />
                </div>

            </section>


            {/* INTRODUCTION */}
            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">

                    <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr] gap-16 lg:gap-32">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                About Morven
                            </p>

                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light leading-[1.02] tracking-[-0.05em] text-[#3F3D39]">
                                Fashion that
                                <span className="block font-medium">
                                    speaks for you.
                                </span>
                            </h2>

                        </div>

                        <div className="space-y-7 text-sm md:text-base leading-8 text-[#77736B]">

                            <p>
                                Morven is a fashion brand dedicated to helping modern
                                individuals express their identity through refined clothing
                                and exceptional personal style.
                            </p>

                            <p>
                                Our collections bring together formal and casual essentials
                                designed for different moments of life — from important
                                professional occasions to everyday experiences.
                            </p>

                            <p>
                                We believe fashion is not simply about following trends.
                                It is about discovering pieces that feel right, fit your
                                lifestyle and give you the confidence to walk into any room
                                with purpose.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* STATEMENT */}
            <section className="bg-[#FAF9F6] border-y border-[#E8E5DE]">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-16 items-end">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                Our Perspective
                            </p>

                            <h2 className="text-5xl md:text-7xl lg:text-[86px] font-light leading-[0.95] tracking-[-0.06em] text-[#3F3D39]">
                                Style is personal.
                                <span className="block font-medium text-[#77736B]">
                                    Make it yours.
                                </span>
                            </h2>

                        </div>

                        <div className="border-l border-[#D6D2C9] pl-7">

                            <p className="text-sm leading-8 text-[#77736B]">
                                We create and curate fashion for people who appreciate
                                simplicity, sophistication and clothing that carries
                                presence without demanding attention.
                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* COLLECTION */}
            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-6">
                                The Collection
                            </p>

                            <h2 className="text-4xl md:text-6xl font-light tracking-[-0.05em] leading-tight text-[#3F3D39]">
                                Everything you need
                                <span className="block font-medium">
                                    to dress well.
                                </span>
                            </h2>

                        </div>

                        <button
                            onClick={() => router.push("/all-products")}
                            className="
                                w-fit
                                text-[10px] uppercase tracking-[0.25em]
                                border-b border-[#3F3D39]/30
                                pb-2
                                text-[#3F3D39]
                                hover:border-[#3F3D39]
                                transition
                            "
                        >
                            View All Products
                        </button>

                    </div>


                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 border-t border-l border-[#E8E5DE]">

                        {categories.map((category, index) => (

                            <button
                                key={category}
                                onClick={() => router.push(`/all-products?category=${encodeURIComponent(category.toUpperCase())}`)}
                                className="
                                    group
                                    text-left
                                    p-7 md:p-9
                                    border-r border-b border-[#E8E5DE]
                                    bg-white
                                    transition-all duration-500
                                    hover:bg-[#F3F1EC]
                                "
                            >

                                <div className="flex items-start justify-between">

                                    <span className="text-[9px] tracking-[0.2em] text-[#AAA69E]">
                                        0{index + 1}
                                    </span>

                                    <span className="
                                        text-lg font-light text-[#77736B]
                                        opacity-0 -translate-x-2
                                        transition-all duration-300
                                        group-hover:opacity-100
                                        group-hover:translate-x-0
                                    ">
                                        →
                                    </span>

                                </div>

                                <h3 className="mt-16 text-sm md:text-base font-medium uppercase tracking-[0.1em] text-[#3F3D39]">
                                    {category}
                                </h3>

                                <div className="mt-5 h-px w-0 bg-[#AAA69E] transition-all duration-500 group-hover:w-10" />

                            </button>

                        ))}

                    </div>

                </div>

            </section>


            {/* VALUES */}
            <section className="bg-[#F3F1EC] border-y border-[#E8E5DE]">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 mb-20">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                What We Stand For
                            </p>

                            <h2 className="text-4xl md:text-6xl font-light leading-tight tracking-[-0.05em] text-[#3F3D39]">
                                The principles
                                <span className="block font-medium text-[#77736B]">
                                    behind Morven.
                                </span>
                            </h2>

                        </div>

                        <div className="flex items-end">

                            <p className="text-sm md:text-base leading-8 text-[#77736B] max-w-lg">
                                Every decision we make is guided by a simple idea:
                                fashion should add value to your life, not simply
                                occupy space in your wardrobe.
                            </p>

                        </div>

                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 border-t border-[#D6D2C9]">

                        {values.map((value) => (

                            <div
                                key={value.number}
                                className="
                                    border-b border-[#D6D2C9]
                                    md:border-r
                                    p-8 md:p-10
                                    bg-transparent
                                    transition-all duration-500
                                    hover:bg-white
                                "
                            >

                                <div className="flex items-start justify-between">

                                    <span className="text-[10px] tracking-[0.25em] text-[#AAA69E]">
                                        {value.number}
                                    </span>

                                    <span className="text-[#AAA69E] text-xl">
                                        +
                                    </span>

                                </div>

                                <h3 className="mt-14 text-xl font-medium text-[#3F3D39]">
                                    {value.title}
                                </h3>

                                <p className="mt-4 max-w-md text-sm leading-7 text-[#77736B]">
                                    {value.text}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </section>


            {/* BRAND EXPERIENCE */}
            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-28 md:py-36">

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                More Than Clothing
                            </p>

                            <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.02] tracking-[-0.05em] text-[#3F3D39]">
                                Your wardrobe
                                <span className="block font-medium text-[#77736B]">
                                    tells your story.
                                </span>
                            </h2>

                        </div>

                        <div className="space-y-7">

                            <p className="text-sm md:text-base leading-8 text-[#77736B]">
                                Whether you are dressing for the boardroom, a celebration,
                                a weekend outing or an everyday moment, Morven gives you
                                pieces that help you show up with confidence.
                            </p>

                            <p className="text-sm md:text-base leading-8 text-[#77736B]">
                                We are committed to building a fashion experience where
                                contemporary style meets practicality, quality and
                                individuality.
                            </p>

                            <div className="pt-3">

                                <button
                                    onClick={() => router.push("/all-products")}
                                    className="
                                        bg-[#3F3D39]
                                        text-white
                                        px-8 py-3.5
                                        text-[10px] uppercase tracking-[0.25em]
                                        transition-all duration-300
                                        hover:bg-[#5A5751]
                                    "
                                >
                                    Shop Morven
                                </button>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* FINAL CTA */}
            <section className="bg-[#FAF9F6] border-t border-[#E8E5DE]">

                <div className="max-w-5xl mx-auto px-6 text-center py-28 md:py-36">

                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                        Discover Your Style
                    </p>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1] tracking-[-0.05em] text-[#3F3D39]">
                        Dress with purpose.
                        <span className="block font-medium text-[#77736B]">
                            Move with confidence.
                        </span>
                    </h2>

                    <p className="max-w-xl mx-auto mt-8 text-sm md:text-base leading-8 text-[#77736B]">
                        Explore Morven's collection and discover pieces designed
                        to become part of your signature style.
                    </p>

                    <button
                        onClick={() => router.push("/all-products")}
                        className="
                            mt-10
                            border border-[#3F3D39]/25
                            bg-white
                            px-9 py-3.5
                            text-[10px] uppercase tracking-[0.25em]
                            text-[#3F3D39]
                            transition-all duration-300
                            hover:bg-[#F3F1EC]
                            hover:border-[#3F3D39]/40
                        "
                    >
                        Explore Collection
                    </button>

                </div>

            </section>


            {/* FOOTER */}
            <Footer />

        </div>
    );
};

export default About;
