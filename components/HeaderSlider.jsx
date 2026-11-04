"use client";

import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const HeaderSlider = () => {
  const sliderData = [
    {
      id: 1,
      eyebrow: "MORVEN COLLECTION",
      title: "Dress With Confidence.",
      description:
        "Discover refined menswear designed for the modern gentleman.",
      buttonText1: "Shop Now",
      buttonText2: "Explore Collection",
      imgSrc: assets.header_headphone_image,
    },
    {
      id: 2,
      eyebrow: "PREMIUM MENSWEAR",
      title: "Define Your Presence.",
      description:
        "Exceptional tailoring, timeless silhouettes and effortless sophistication.",
      buttonText1: "Discover More",
      buttonText2: "View Collection",
      imgSrc: assets.header_playstation_image,
    },
    {
      id: 3,
      eyebrow: "MORVEN SUITS",
      title: "Make Every Entrance Count.",
      description:
        "Premium suits crafted to elevate your style from the boardroom to every special occasion.",
      buttonText1: "Shop Suits",
      buttonText2: "Explore More",
      imgSrc: assets.header_macbook_image,
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide(
        (prev) => (prev + 1) % sliderData.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isPaused, sliderData.length]);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    setCurrentSlide(
      (prev) => (prev + 1) % sliderData.length
    );
  };

  const handlePrevious = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + sliderData.length) %
        sliderData.length
    );
  };

  return (
    <section
      className="relative w-full overflow-hidden bg-white"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* SLIDES */}
      <div
        className="flex transition-transform duration-[1200ms] ease-[cubic-bezier(0.77,0,0.175,1)]"
        style={{
          transform: `translateX(-${currentSlide * 100}%)`,
        }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={slide.id}
            className="relative min-w-full"
          >
            {/* HERO */}
            <div className="relative flex min-h-[650px] w-full flex-col overflow-hidden bg-[#f5f5f3] sm:min-h-[680px] md:min-h-[440px] md:flex-row lg:min-h-[460px]">

              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-32 -top-32 h-[380px] w-[380px] rounded-full border border-black/[0.04]" />

              <div className="pointer-events-none absolute -bottom-40 -left-40 h-[460px] w-[460px] rounded-full border border-black/[0.04]" />

              {/* ========================= */}
              {/* MOBILE CONTENT */}
              {/* ========================= */}
              <div
                className={`relative z-20 flex w-full flex-1 flex-col px-6 pt-10 pb-4 sm:px-10 sm:pt-12 md:hidden ${
                  currentSlide === index
                    ? "animate-[slideContent_1s_ease-out]"
                    : ""
                }`}
              >
                <div className="max-w-xl">

                  {/* Eyebrow */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-7 bg-black" />

                    <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-gray-500 sm:text-[10px]">
                      {slide.eyebrow}
                    </p>
                  </div>

                  {/* Title */}
                  <h1 className="max-w-[340px] text-[36px] font-medium leading-[1.05] tracking-[-0.04em] text-black sm:max-w-[430px] sm:text-[44px]">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 max-w-[330px] text-sm leading-6 text-gray-500 sm:max-w-md sm:text-[15px] sm:leading-7">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">

                    {/* Primary Button */}
                    <button
                      type="button"
                      className="group relative overflow-hidden bg-black px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-gray-800 sm:px-8 sm:py-3.5"
                    >
                      <span className="relative z-10">
                        {slide.buttonText1}
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gray-700 transition-transform duration-500 group-hover:translate-x-0" />
                    </button>

                    {/* Secondary Button */}
                    <button
                      type="button"
                      className="group flex items-center gap-3 px-3 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-black"
                    >
                      <span className="relative">
                        {slide.buttonText2}

                        <span className="absolute -bottom-2 left-0 h-px w-0 bg-black transition-all duration-500 group-hover:w-full" />
                      </span>

                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================= */}
              {/* MOBILE IMAGE */}
              {/* ========================= */}
              <div className="relative z-10 h-[260px] w-full shrink-0 sm:h-[290px] md:hidden">
                <div
                  className={`relative mx-auto h-full w-[82%] sm:w-[70%] ${
                    currentSlide === index
                      ? "translate-y-0 scale-100 opacity-100"
                      : "translate-y-5 scale-105 opacity-0"
                  } transition-all duration-[1200ms] ease-out`}
                >
                  <Image
                    src={slide.imgSrc}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                    sizes="80vw"
                  />
                </div>
              </div>

              {/* ========================= */}
              {/* DESKTOP CONTENT */}
              {/* ========================= */}
              <div
                className={`relative z-10 hidden w-full px-6 py-10 md:block md:w-[55%] md:px-12 md:py-12 lg:w-[52%] lg:px-16 ${
                  currentSlide === index
                    ? "animate-[slideContent_1s_ease-out]"
                    : ""
                }`}
              >
                <div className="max-w-xl">

                  {/* Eyebrow */}
                  <div className="mb-4 flex items-center gap-3">
                    <span className="h-px w-7 bg-black" />

                    <p className="text-[9px] font-medium uppercase tracking-[0.32em] text-gray-500 sm:text-[10px]">
                      {slide.eyebrow}
                    </p>
                  </div>

                  {/* Title */}
                  <h1 className="max-w-xl text-[38px] font-medium leading-[1.04] tracking-[-0.04em] text-black sm:text-[46px] md:text-[50px] lg:text-[62px]">
                    {slide.title}
                  </h1>

                  {/* Description */}
                  <p className="mt-5 max-w-md text-sm leading-6 text-gray-500 sm:text-[15px] sm:leading-7">
                    {slide.description}
                  </p>

                  {/* Buttons */}
                  <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">

                    {/* Primary Button */}
                    <button
                      type="button"
                      className="group relative overflow-hidden bg-black px-7 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-white transition-all duration-500 hover:bg-gray-800 sm:px-8 sm:py-3.5"
                    >
                      <span className="relative z-10">
                        {slide.buttonText1}
                      </span>

                      <span className="absolute inset-0 -translate-x-full bg-gray-700 transition-transform duration-500 group-hover:translate-x-0" />
                    </button>

                    {/* Secondary Button */}
                    <button
                      type="button"
                      className="group flex items-center gap-3 px-3 py-3 text-[10px] font-medium uppercase tracking-[0.18em] text-black"
                    >
                      <span className="relative">
                        {slide.buttonText2}

                        <span className="absolute -bottom-2 left-0 h-px w-0 bg-black transition-all duration-500 group-hover:w-full" />
                      </span>

                      <span className="transition-transform duration-500 group-hover:translate-x-1">
                        →
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              {/* ========================= */}
              {/* DESKTOP IMAGE */}
              {/* ========================= */}
              <div className="absolute inset-y-0 right-0 hidden w-[52%] items-center justify-center overflow-hidden md:flex md:w-[48%]">
                <div
                  className={`relative h-full w-full transition-all duration-[1500ms] ease-out ${
                    currentSlide === index
                      ? "scale-100 opacity-100"
                      : "scale-110 opacity-0"
                  }`}
                >
                  <Image
                    src={slide.imgSrc}
                    alt={slide.title}
                    fill
                    priority={index === 0}
                    className="object-contain object-center"
                    sizes="(max-width: 768px) 50vw, 48vw"
                  />
                </div>

                {/* Soft image fade */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#f5f5f3] via-transparent to-transparent opacity-70" />
              </div>

              {/* SLIDE NUMBER */}
              <div className="absolute bottom-6 right-6 z-20 hidden items-center gap-3 md:flex lg:bottom-7 lg:right-10">
                <span className="text-[10px] font-medium tracking-[0.2em] text-black">
                  0{index + 1}
                </span>

                <span className="h-px w-8 bg-black/20" />

                <span className="text-[10px] tracking-[0.2em] text-gray-400">
                  0{sliderData.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PREVIOUS / NEXT */}
      <div className="absolute bottom-7 left-6 z-30 hidden items-center gap-2 md:flex lg:left-10">
        <button
          type="button"
          onClick={handlePrevious}
          aria-label="Previous slide"
          className="group flex h-9 w-9 items-center justify-center border border-black/10 bg-white/70 text-black backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-1">
            ←
          </span>
        </button>

        <button
          type="button"
          onClick={handleNext}
          aria-label="Next slide"
          className="group flex h-9 w-9 items-center justify-center border border-black/10 bg-white/70 text-black backdrop-blur-sm transition-all duration-300 hover:bg-black hover:text-white"
        >
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </button>
      </div>

      {/* SLIDE INDICATORS */}
      <div className="absolute bottom-6 left-1/2 z-30 flex -translate-x-1/2 items-center gap-2 md:bottom-7">
        {sliderData.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => handleSlideChange(index)}
            aria-label={`Go to slide ${index + 1}`}
            className="group flex h-5 items-center"
          >
            <span
              className={`block h-[2px] transition-all duration-500 ${
                currentSlide === index
                  ? "w-10 bg-black"
                  : "w-5 bg-black/20 group-hover:w-7 group-hover:bg-black/50"
              }`}
            />
          </button>
        ))}
      </div>

      {/* PROGRESS BAR */}
      <div className="absolute bottom-0 left-0 z-30 h-[2px] w-full bg-black/5">
        <div
          key={currentSlide}
          className="h-full bg-black"
          style={{
            animation: isPaused
              ? "none"
              : "sliderProgress 5s linear",
          }}
        />
      </div>

      {/* ANIMATIONS */}
      <style jsx>{`
        @keyframes slideContent {
          0% {
            opacity: 0;
            transform: translateY(25px);
          }

          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes sliderProgress {
          0% {
            width: 0%;
          }

          100% {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
};

export default HeaderSlider;