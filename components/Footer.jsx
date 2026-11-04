
"use client";

import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="w-full bg-white text-gray-500">

      {/* MAIN FOOTER */}
      <div className="border-b border-gray-200">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-12 px-6 py-14 md:flex-row md:px-10 lg:px-12">

          {/* BRAND */}
          <div className="w-full md:w-[38%]">
            <div className="group">
              <Image
                className="w-32 md:w-36 transition-transform duration-500 group-hover:scale-[1.02]"
                src={assets.logo}
                alt="Morven logo"
                width={150}
                height={50}
              />
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-gray-500">
              Discover refined menswear crafted for the modern gentleman.
              Morven brings together exceptional craftsmanship, timeless
              style and premium quality to help you dress with confidence
              for every occasion.
            </p>

            <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-black">
              Style. Confidence. Distinction.
            </p>
          </div>

          {/* COMPANY */}
          <div className="w-full md:w-[17%]">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Company
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="/"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Home
                </a>
              </li>

              <li>
                <a
                  href="/all-products"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Shop
                </a>
              </li>

              <li>
                <a
                  href="/about"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  About Us
                </a>
              </li>

              <li>
                <a
                  href="/contact"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Contact Us
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SERVICE */}
          <div className="w-full md:w-[18%]">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Customer Service
            </h2>

            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Delivery Information
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Returns & Exchanges
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  Size Guide
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-block transition-all duration-300 hover:translate-x-1 hover:text-black"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT */}
          <div className="w-full md:w-[22%]">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-[0.12em] text-black">
              Get in Touch
            </h2>

            <div className="space-y-3 text-sm leading-6">
              <p className="font-medium text-gray-800">
                Morven
              </p>

              <p>
                Accra, Ghana
              </p>

              <p>
                +233 XX XXX XXXX
              </p>

              <p>
                info@morven.com
              </p>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="mt-7 flex items-center gap-3">

              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="
                  group
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-black
                  hover:bg-black
                "
              >
                <Image
                  src={assets.instagram_icon}
                  alt="Instagram"
                  width={16}
                  height={16}
                  className="
                    h-4
                    w-4
                    object-contain
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:brightness-0
                    group-hover:invert
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="
                  group
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-black
                  hover:bg-black
                "
              >
                <Image
                  src={assets.facebook_icon}
                  alt="Facebook"
                  width={16}
                  height={16}
                  className="
                    h-4
                    w-4
                    object-contain
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:brightness-0
                    group-hover:invert
                    group-hover:opacity-100
                  "
                />
              </a>

              {/* Twitter / X */}
              <a
                href="#"
                aria-label="Twitter"
                className="
                  group
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-gray-200
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-black
                  hover:bg-black
                "
              >
                <Image
                  src={assets.twitter_icon}
                  alt="Twitter"
                  width={16}
                  height={16}
                  className="
                    h-4
                    w-4
                    object-contain
                    opacity-60
                    transition-all
                    duration-300
                    group-hover:brightness-0
                    group-hover:invert
                    group-hover:opacity-100
                  "
                />
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* COPYRIGHT */}
      <div className="flex flex-col items-center justify-between gap-3 px-6 py-5 sm:flex-row md:px-10 lg:px-12">
        <p className="text-center text-[10px] uppercase tracking-[0.12em] text-gray-400 sm:text-left">
          © {new Date().getFullYear()} Morven. All Rights Reserved.
        </p>

        <p className="text-center text-[9px] uppercase tracking-[0.2em] text-gray-300">
          Premium Menswear · Accra, Ghana
        </p>
      </div>

    </footer>
  );
};

export default Footer;