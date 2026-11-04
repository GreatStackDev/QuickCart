
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const categories = [
  {
    name: "SUIT",
    items: [
      "Slim Fit Suit",
      "Regular Fit Suit",
      "Double-breasted suit",
      "Sports Suit",
      "Suit with Vest",
      "Wool Suit",
      "Linen Suit",
      "Striped Suit",
      "Plaid Suit",
    ],
  },
  {
    name: "SHIRT",
    items: [
      "Slim Fit Shirt",
      "Regular Fit Shirt",
      "Sports Shirt",
      "Basic Shirt",
      "Short-Sleeved Shirt",
      "White Shirt",
      "Black Shirt",
      "Blue Shirt",
      "Groom's Shirt",
      "Online Exclusive",
    ],
  },
  {
    name: "JACKET",
    items: [
      "Blazer Jacket",
      "Sports jacket",
      "Double-breasted jacket",
      "Linen Jacket",
      "Patterned Jacket",
      "Plaid Jacket",
      "Black Jacket",
      "Navy Blue Jacket",
      "Grey Jacket",
    ],
  },
  {
    name: "TROUSERS",
    items: [
      "Slim Fit Pants",
      "Regular Fit Trousers",
      "Chino Pants",
      "Linen Trousers",
      "Jogger Pants",
      "Sports Pants",
      "Pants with Elastic Waist",
      "Denim (Jean) Pants",
      "Shorts",
    ],
  },
  {
    name: "T-SHIRT",
    items: [
      "Polo Shirt",
      "Crew Neck T-shirt",
      "Knitted T-shirt",
      "Printed T-shirt",
      "Basic T-shirt",
      "Slim Fit T-shirt",
      "White T-shirt",
      "Black T-shirt",
    ],
  },
  {
    name: "KNITWEAR",
    items: [
      "Polo Collar Knitwear",
      "Crew Neck Knitwear",
      "Half Turtleneck Sweater",
      "Fisherman's Knitwear",
      "V-Neck Knitwear",
      "Knitted Vest",
      "Knitted Jacket",
    ],
  },
  {
    name: "SWEATSHIRT",
    items: [
      "Crew Neck Sweatshirt",
      "Hooded Sweatshirt",
      "Zip-up Collar Sweatshirt",
      "Printed Sweatshirt",
    ],
  },
  {
    name: "OUTERWEAR",
    items: [
      "Waistcoat",
      "Mont",
      "Coat",
      "Spring Jacket",
    ],
  },
  {
    name: "SHOE",
    items: [
      "Classic Shoes",
      "Casual Shoes",
    ],
  },
  {
    name: "ACCESSORY",
    items: [
      "Wallet & Card Holder",
      "Belt",
      "Tie",
      "Perfume",
      "Sock",
    ],
  },
  {
    name: "TUXEDO",
    items: [],
  },
  {
    name: "COMBINATIONS",
    items: [],
  },
  {
    name: "NEW ARRIVALS",
    items: [],
  },
  {
    name: "OUTLET",
    items: [],
  },
];

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[()&']/g, "")
    .replace(/\s+/g, "-");

const ArrowDown = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className={`h-3 w-3 shrink-0 transition-transform duration-500 ${
      open ? "rotate-180" : ""
    }`}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

const ArrowRight = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-4 w-4"
  >
    <path d="M5 12h13" />
    <path d="m13 6 6 6-6 6" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-6 w-6"
  >
    <path d="M4 7h16" />
    <path d="M4 12h16" />
    <path d="M4 17h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-6 w-6"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

const FashionNavbar = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileCategory, setMobileCategory] = useState(null);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleMouseEnter = (categoryName) => {
    setActiveCategory(categoryName);
  };

  const handleMouseLeave = () => {
    setActiveCategory(null);
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileCategory(null);
  };

  const toggleMobileCategory = (categoryName) => {
    setMobileCategory((current) =>
      current === categoryName ? null : categoryName
    );
  };

  const getCategoryUrl = (categoryName) => {
    return `/all-products?category=${encodeURIComponent(
      slugify(categoryName)
    )}`;
  };

  const getItemUrl = (categoryName, item) => {
    return `/all-products?category=${encodeURIComponent(
      slugify(categoryName)
    )}&subcategory=${encodeURIComponent(slugify(item))}`;
  };

  return (
    <>
      {/* =========================================================
          DESKTOP FASHION NAVBAR
      ========================================================== */}
      <header
        className="fixed left-0 top-[3.5rem] z-[90] hidden w-full border-b border-gray-200 bg-white text-black shadow-[0_4px_20px_rgba(0,0,0,0.03)] lg:top-[5.5rem] lg:block"
        onMouseLeave={handleMouseLeave}
      >
        <div className="mx-auto flex h-[3.5rem] w-full max-w-[1400px] items-center px-4 xl:px-8">

          <nav className="flex h-full w-full items-center justify-center">

            <div className="flex h-full w-full items-center justify-between">

              {categories.map((category, index) => {
                const isActive = activeCategory === category.name;

                return (
                  <div
                    key={category.name}
                    className="relative flex h-full items-center"
                    onMouseEnter={() =>
                      handleMouseEnter(category.name)
                    }
                  >
                    <Link
                      href={getCategoryUrl(category.name)}
                      className={`group relative flex h-full items-center gap-1 whitespace-nowrap text-[9px] font-medium tracking-[0.08em] text-black transition-all duration-300 xl:text-[10px] ${
                        isActive
                          ? "opacity-100"
                          : "opacity-75 hover:opacity-100"
                      }`}
                    >
                      <span className="relative transition-all duration-300 group-hover:-translate-y-[1px]">
                        {category.name}

                        <span
                          className={`absolute -bottom-1 left-0 h-[1px] bg-black transition-all duration-500 ease-out ${
                            isActive
                              ? "w-full"
                              : "w-0 group-hover:w-full"
                          }`}
                        />
                      </span>

                      <ArrowDown open={isActive} />
                    </Link>

                    {/* =================================================
                        DESKTOP DROPDOWN
                        Automatically moves inward at screen edges
                    ================================================== */}
                    <div
                      className={`absolute top-full z-[120] pt-3 transition-all duration-400 ease-out ${
                        index === 0
                          ? "left-0"
                          : index === categories.length - 1
                          ? "right-0"
                          : "left-1/2 -translate-x-1/2"
                      } ${
                        isActive
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-3 opacity-0"
                      }`}
                    >
                      <div className="w-[270px] overflow-hidden border border-gray-100 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.12)]">

                        {/* Dropdown Header */}
                        <div className="border-b border-gray-100 px-6 py-4">
                          <p className="text-[9px] font-medium tracking-[0.22em] text-gray-400">
                            SHOP
                          </p>

                          <p className="mt-1 text-sm font-medium tracking-wide text-black">
                            {category.name}
                          </p>
                        </div>

                        {/* Dropdown Items */}
                        <div className="max-h-[430px] overflow-y-auto py-2">

                          {category.items.length > 0 ? (
                            category.items.map((item, itemIndex) => (
                              <Link
                                key={item}
                                href={getItemUrl(
                                  category.name,
                                  item
                                )}
                                className="group/item flex items-center justify-between px-6 py-3 text-[11px] text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:pl-8 hover:text-black"
                                style={{
                                  transitionDelay: isActive
                                    ? `${itemIndex * 15}ms`
                                    : "0ms",
                                }}
                              >
                                <span>{item}</span>

                                <span className="translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                                  <ArrowRight />
                                </span>
                              </Link>
                            ))
                          ) : (
                            <Link
                              href={getCategoryUrl(
                                category.name
                              )}
                              className="group/item flex items-center justify-between px-6 py-4 text-[11px] text-gray-600 transition-all duration-300 hover:bg-gray-50 hover:pl-8 hover:text-black"
                            >
                              <span>
                                Explore {category.name}
                              </span>

                              <span className="translate-x-[-8px] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                                <ArrowRight />
                              </span>
                            </Link>
                          )}

                        </div>

                        {/* View All */}
                        <Link
                          href={getCategoryUrl(category.name)}
                          className="group/all flex items-center justify-between border-t border-gray-100 px-6 py-4 text-[9px] font-medium tracking-[0.15em] text-black"
                        >
                          <span className="transition-all duration-300 group-hover/all:translate-x-1">
                            VIEW ALL {category.name}
                          </span>

                          <span className="transition-transform duration-300 group-hover/all:translate-x-1">
                            <ArrowRight />
                          </span>
                        </Link>

                      </div>
                    </div>
                  </div>
                );
              })}

            </div>
          </nav>
        </div>
      </header>

      {/* =========================================================
          MOBILE FASHION NAVBAR
      ========================================================== */}
      <div className="fixed left-0 top-14 z-[90] flex h-[3.25rem] w-full items-center justify-between border-b border-gray-200 bg-white px-5 text-black shadow-[0_4px_20px_rgba(0,0,0,0.04)] lg:hidden">

        <Link
          href="/all-products"
          className="text-[10px] font-medium tracking-[0.18em] text-black"
        >
          SHOP
        </Link>

        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 text-black transition-opacity duration-300 hover:opacity-50"
          aria-label="Open fashion categories"
        >
          <span className="text-[9px] font-medium tracking-[0.15em]">
            CATEGORIES
          </span>

          <MenuIcon />
        </button>
      </div>

      {/* =========================================================
          MOBILE FULLSCREEN CATEGORY MENU
      ========================================================== */}
      <div
        className={`fixed inset-0 z-[200] flex h-screen w-full flex-col bg-white transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden ${
          mobileOpen
            ? "translate-x-0"
            : "pointer-events-none translate-x-full"
        }`}
      >

        {/* Mobile Header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-gray-200 px-5">

          <span className="text-[10px] font-medium tracking-[0.2em]">
            QUICKCART
          </span>

          <button
            type="button"
            onClick={closeMobileMenu}
            className="flex text-black transition-transform duration-500 hover:rotate-90"
            aria-label="Close categories"
          >
            <CloseIcon />
          </button>

        </div>

        {/* Mobile Categories */}
        <div className="flex-1 overflow-y-auto px-5 py-5">

          <div className="flex flex-col">

            {categories.map((category, categoryIndex) => {
              const isOpen =
                mobileCategory === category.name;

              return (
                <div
                  key={category.name}
                  className="border-b border-gray-100"
                >

                  {/* Category Button */}
                  <div className="flex items-center justify-between">

                    <Link
                      href={getCategoryUrl(category.name)}
                      onClick={closeMobileMenu}
                      className="flex-1 py-5 text-sm font-medium tracking-[0.08em] text-black transition-all duration-300 hover:pl-2"
                    >
                      {category.name}
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        toggleMobileCategory(category.name)
                      }
                      className="flex h-12 w-12 items-center justify-center text-black"
                      aria-label={`Open ${category.name} submenu`}
                    >
                      <ArrowDown open={isOpen} />
                    </button>

                  </div>

                  {/* Mobile Dropdown */}
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >

                    <div className="overflow-hidden">

                      <div className="pb-4">

                        {category.items.length > 0 ? (
                          category.items.map((item, itemIndex) => (
                            <Link
                              key={item}
                              href={getItemUrl(
                                category.name,
                                item
                              )}
                              onClick={closeMobileMenu}
                              className="group flex items-center justify-between py-3 pl-4 pr-2 text-[12px] text-gray-500 transition-all duration-300 hover:pl-6 hover:text-black"
                              style={{
                                transitionDelay: isOpen
                                  ? `${itemIndex * 20}ms`
                                  : "0ms",
                              }}
                            >
                              <span>{item}</span>

                              <span className="translate-x-[-6px] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                                <ArrowRight />
                              </span>
                            </Link>
                          ))
                        ) : (
                          <Link
                            href={getCategoryUrl(
                              category.name
                            )}
                            onClick={closeMobileMenu}
                            className="flex items-center justify-between py-3 pl-4 text-[12px] text-gray-500 transition-all duration-300 hover:pl-6 hover:text-black"
                          >
                            <span>
                              Explore {category.name}
                            </span>

                            <ArrowRight />
                          </Link>
                        )}

                        <Link
                          href={getCategoryUrl(category.name)}
                          onClick={closeMobileMenu}
                          className="mt-2 flex items-center justify-between border-t border-gray-100 px-4 py-4 text-[9px] font-medium tracking-[0.15em] text-black"
                        >
                          <span>
                            VIEW ALL {category.name}
                          </span>

                          <ArrowRight />
                        </Link>

                      </div>

                    </div>
                  </div>

                </div>
              );
            })}

          </div>

        </div>

        {/* Mobile Footer */}
        <div className="shrink-0 border-t border-gray-200 px-5 py-5">

          <Link
            href="/all-products"
            onClick={closeMobileMenu}
            className="group flex items-center justify-between text-[10px] font-medium tracking-[0.18em] text-black"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">
              VIEW ALL PRODUCTS
            </span>

            <span className="transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </span>
          </Link>

        </div>

      </div>
    </>
  );
};

export default FashionNavbar;

