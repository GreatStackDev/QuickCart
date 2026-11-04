
"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";

const normalizeText = (value = "") => {
    return decodeURIComponent(String(value))
        .toLowerCase()
        .trim()
        .replace(/&/g, "and")
        .replace(/[()']/g, "")
        .replace(/[-_]+/g, " ")
        .replace(/\s+/g, " ");
};

const formatTitle = (value = "") => {
    return value
        .split(" ")
        .filter(Boolean)
        .map(
            (word) =>
                word.charAt(0).toUpperCase() + word.slice(1)
        )
        .join(" ");
};

const categoryMatches = (
    productCategory,
    selectedCategory
) => {
    const productValue = normalizeText(productCategory);
    const selectedValue = normalizeText(selectedCategory);

    if (!productValue || !selectedValue) {
        return false;
    }

    // Direct category match
    if (productValue === selectedValue) {
        return true;
    }

    // Singular / plural match
    if (
        productValue === `${selectedValue}s` ||
        selectedValue === `${productValue}s`
    ) {
        return true;
    }

    // Handle values such as:
    // t-shirt / tshirt / t shirts
    const cleanProductValue =
        productValue.replace(/\s+/g, "");

    const cleanSelectedValue =
        selectedValue.replace(/\s+/g, "");

    if (cleanProductValue === cleanSelectedValue) {
        return true;
    }

    // Allow categories such as:
    // Men's Suit
    // Suit Collection
    // Premium Suit
    if (
        productValue.includes(selectedValue) ||
        selectedValue.includes(productValue)
    ) {
        return true;
    }

    return false;
};

const AllProductsContent = () => {
    const { products } = useAppContext();

    const searchParams = useSearchParams();

    const [category, setCategory] = useState("");
    const [subcategory, setSubcategory] = useState("");
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        setCategory(searchParams.get("category") || "");

        setSubcategory(
            searchParams.get("subcategory") || ""
        );

        setSearch(searchParams.get("search") || "");
    }, [searchParams]);

    useEffect(() => {
        if (search && search !== "true") {
            setSearchInput(search);
        } else {
            setSearchInput("");
        }
    }, [search]);

    const {
        displayedProducts,
        title,
        subtitle,
        isOutOfStock,
        isFallback,
    } = useMemo(() => {
        const allProducts = Array.isArray(products)
            ? products
            : [];

        const selectedCategory =
            normalizeText(category);

        const selectedSubcategory =
            normalizeText(subcategory);

        const selectedSearch =
            normalizeText(search);

        // =====================================================
        // FIND PRODUCTS IN THE SELECTED CATEGORY
        // =====================================================

        const categoryProducts = selectedCategory
            ? allProducts.filter((product) =>
                  categoryMatches(
                      product?.category,
                      selectedCategory
                  )
              )
            : allProducts;

        // =====================================================
        // SEARCH
        // =====================================================

        if (
            selectedSearch &&
            selectedSearch !== "true"
        ) {
            const searchProducts =
                categoryProducts.filter((product) => {
                    const productName =
                        normalizeText(product?.name);

                    const productCategory =
                        normalizeText(product?.category);

                    return (
                        productName.includes(
                            selectedSearch
                        ) ||
                        productCategory.includes(
                            selectedSearch
                        )
                    );
                });

            return {
                displayedProducts: searchProducts,
                title: "Search Results",
                subtitle: `${searchProducts.length} ${
                    searchProducts.length === 1
                        ? "product"
                        : "products"
                } found`,
                isOutOfStock:
                    searchProducts.length === 0,
                isFallback: false,
            };
        }

        // =====================================================
        // NO FILTER
        // =====================================================

        if (
            !selectedCategory &&
            !selectedSubcategory
        ) {
            return {
                displayedProducts: allProducts,
                title: "All Products",
                subtitle: "",
                isOutOfStock: false,
                isFallback: false,
            };
        }

        // =====================================================
        // EXACT SUBCATEGORY / PRODUCT MATCH
        //
        // Example:
        // Slim Fit Suit
        //
        // We search the product NAME because the current
        // Product model does not have a subcategory field.
        // =====================================================

        if (selectedSubcategory) {
            const exactProducts =
                categoryProducts.filter((product) => {
                    const productName =
                        normalizeText(product?.name);

                    if (!productName) {
                        return false;
                    }

                    // Exact name
                    if (
                        productName ===
                        selectedSubcategory
                    ) {
                        return true;
                    }

                    // Example:
                    // Slim Fit Suit - Navy
                    // contains:
                    // Slim Fit Suit
                    if (
                        productName.includes(
                            selectedSubcategory
                        )
                    ) {
                        return true;
                    }

                    return false;
                });

            // =================================================
            // EXACT PRODUCTS FOUND
            // =================================================

            if (exactProducts.length > 0) {
                return {
                    displayedProducts: exactProducts,
                    title: formatTitle(subcategory),
                    subtitle: `${exactProducts.length} ${
                        exactProducts.length === 1
                            ? "product"
                            : "products"
                    } available`,
                    isOutOfStock: false,
                    isFallback: false,
                };
            }

            // =================================================
            // NO EXACT PRODUCT
            //
            // Show similar products from the same category.
            // =================================================

            if (categoryProducts.length > 0) {
                return {
                    displayedProducts: categoryProducts,
                    title: `Similar to ${formatTitle(
                        subcategory
                    )}`,
                    subtitle: `No exact ${formatTitle(
                        subcategory
                    )} found. Showing similar products.`,
                    isOutOfStock: false,
                    isFallback: true,
                };
            }

            // =================================================
            // NOTHING IN THE CATEGORY
            //
            // DO NOT SHOW UNRELATED PRODUCTS.
            //
            // Show OUT OF STOCK instead.
            // =================================================

            return {
                displayedProducts: [],
                title: formatTitle(subcategory),
                subtitle: "",
                isOutOfStock: true,
                isFallback: false,
            };
        }

        // =====================================================
        // CATEGORY ONLY
        //
        // Example:
        // /all-products?category=suit
        // =====================================================

        if (categoryProducts.length > 0) {
            return {
                displayedProducts: categoryProducts,
                title: formatTitle(category),
                subtitle: `${categoryProducts.length} ${
                    categoryProducts.length === 1
                        ? "product"
                        : "products"
                } available`,
                isOutOfStock: false,
                isFallback: false,
            };
        }

        // =====================================================
        // CATEGORY HAS NO PRODUCTS
        // =====================================================

        return {
            displayedProducts: [],
            title: formatTitle(category),
            subtitle: "",
            isOutOfStock: true,
            isFallback: false,
        };
    }, [
        products,
        category,
        subcategory,
        search,
    ]);

    return (
        <>
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                {/* =========================================
                    PAGE TITLE
                ========================================= */}

                <div className="flex w-full flex-col items-start pt-12">

                    {/* =====================================
                        SEARCH
                    ===================================== */}

                    {search === "true" && (
                        <div className="mb-8 w-full max-w-xl">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();

                                    const value =
                                        searchInput.trim();

                                    if (!value) {
                                        window.history.pushState(
                                            {},
                                            "",
                                            "/all-products"
                                        );

                                        setSearch("");
                                        return;
                                    }

                                    window.history.pushState(
                                        {},
                                        "",
                                        `/all-products?search=${encodeURIComponent(
                                            value
                                        )}`
                                    );

                                    setSearch(value);
                                }}
                                className="flex w-full items-center border-b border-black pb-3"
                            >
                                <input
                                    type="text"
                                    value={searchInput}
                                    onChange={(e) =>
                                        setSearchInput(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search products..."
                                    autoFocus
                                    className="w-full bg-transparent text-sm text-black outline-none placeholder:text-gray-400"
                                />

                                <button
                                    type="submit"
                                    className="text-sm font-medium text-black transition-opacity hover:opacity-50"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                    )}

                    <p className="text-2xl font-medium">
                        {title}
                    </p>

                    <div className="mt-2 h-0.5 w-16 rounded-full bg-orange-600"></div>

                    {subtitle && (
                        <p
                            className={`mt-3 text-sm ${
                                isFallback
                                    ? "text-gray-500"
                                    : "text-gray-400"
                            }`}
                        >
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* =========================================
                    PRODUCTS
                ========================================= */}

                {displayedProducts.length > 0 ? (
                    <div className="mt-12 grid w-full grid-cols-2 items-center gap-6 pb-14 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {displayedProducts.map(
                            (product, index) => (
                                <ProductCard
                                    key={
                                        product?._id ||
                                        product?.id ||
                                        index
                                    }
                                    product={product}
                                />
                            )
                        )}
                    </div>
                ) : isOutOfStock ? (
                    /* =====================================
                       OUT OF STOCK
                    ===================================== */

                    <div className="flex min-h-[430px] w-full items-center justify-center pb-14">
                        <div className="flex max-w-md flex-col items-center text-center">

                            {/* OUT OF STOCK ICON */}

                            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-gray-200 bg-gray-50">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.4"
                                    className="h-8 w-8 text-gray-400"
                                >
                                    <path d="M6 7h12l-1 13H7L6 7Z" />
                                    <path d="M9 7V5a3 3 0 0 1 6 0v2" />
                                </svg>
                            </div>

                            {/* LABEL */}

                            <p className="text-[10px] font-medium uppercase tracking-[0.3em] text-gray-400">
                                Currently unavailable
                            </p>

                            {/* OUT OF STOCK */}

                            <h2 className="mt-3 text-2xl font-medium tracking-wide text-black">
                                OUT OF STOCK
                            </h2>

                            {/* MESSAGE */}

                            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-500">
                                We currently don't have{" "}
                                <span className="font-medium text-gray-700">
                                    {title}
                                </span>{" "}
                                available. Please check back
                                soon for new arrivals.
                            </p>

                            {/* SMALL DECORATIVE LINE */}

                            <div className="mt-7 h-px w-12 bg-black"></div>

                            {/* BACK TO PRODUCTS */}

                            <a
                                href="/all-products"
                                className="group mt-7 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.2em] text-black"
                            >
                                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                                    ←
                                </span>

                                <span className="relative">
                                    View All Products

                                    <span className="absolute -bottom-2 left-0 h-px w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
                                </span>
                            </a>
                        </div>
                    </div>
                ) : (
                    /* =====================================
                       EMPTY STATE
                    ===================================== */

                    <div className="flex min-h-[350px] w-full items-center justify-center pb-14">
                        <div className="text-center">
                            <p className="text-lg font-medium text-gray-800">
                                No products available
                            </p>

                            <p className="mt-2 text-sm text-gray-400">
                                We couldn't find any products
                                for this selection.
                            </p>
                        </div>
                    </div>
                )}
            </div>

            <Footer />
        </>
    );
};

const AllProducts = () => {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[500px] items-center justify-center">
                    <p className="text-sm text-gray-400">
                        Loading products...
                    </p>
                </div>
            }
        >
            <AllProductsContent />
        </Suspense>
    );
};

export default AllProducts;
