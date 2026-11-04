
"use client";

import Image from "next/image";
import Link from "next/link";
import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { useState } from "react";

import { assets } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";

const CartIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    className="h-5 w-5"
  >
    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13 5.4 5M7 13l-1.5 3h12" />
    <circle cx="9" cy="19" r="1" />
    <circle cx="18" cy="19" r="1" />
  </svg>
);

const BagIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="M6 8h12l-1 12H7L6 8Z" />
    <path d="M9 8V6a3 3 0 0 1 6 0v2" />
  </svg>
);

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V10Z" />
    <path d="M9 21v-6h6v6" />
  </svg>
);

const BoxIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-4 w-4"
  >
    <path d="m21 8-9 5-9-5 9-5 9 5Z" />
    <path d="M3 8v8l9 5 9-5V8" />
    <path d="M12 13v8" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <path d="M7 17 17 7" />
    <path d="M7 7h10v10" />
  </svg>
);

const CloseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-7 w-7"
  >
    <path d="M6 6l12 12" />
    <path d="M18 6 6 18" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-7 w-7"
  >
    <path d="M4 6h16" />
    <path d="M4 12h16" />
    <path d="M4 18h16" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);

const LinkedinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6Z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-6 w-6"
  >
    <path d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.04c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.45 11.45 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z" />
  </svg>
);

const DribbbleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="h-6 w-6"
  >
    <circle cx="12" cy="12" r="9" />
    <path d="M3.5 9.5c5.5.5 10.5-.7 14.5-3.5" />
    <path d="M6 4.5c3.5 3 6.5 7 8 11.5" />
    <path d="M3.5 15c5-1.5 10.5-1.5 15.5.5" />
    <path d="M12 21c-.5-4 1-8 4.5-11.5" />
  </svg>
);

const Navbar = () => {
  const { isSeller, router, getCartCount } = useAppContext();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navigateAndClose = (path) => {
    closeMenu();
    router.push(path);
  };

  const UserMenu = () => (
    <UserButton>
      <UserButton.MenuItems>
        <UserButton.Action
          label="Home"
          labelIcon={<HomeIcon />}
          onClick={() => router.push("/")}
        />

        <UserButton.Action
          label="Products"
          labelIcon={<BoxIcon />}
          onClick={() => router.push("/all-products")}
        />

        <UserButton.Link
          label="Cart"
          labelIcon={<CartIcon />}
          href="/cart"
        />

        <UserButton.Action
          label="My Orders"
          labelIcon={<BagIcon />}
          onClick={() => router.push("/my-orders")}
        />
      </UserButton.MenuItems>
    </UserButton>
  );

  const AccountSection = () => (
    <>
      <Show when="signed-in">
        <UserMenu />
      </Show>

      <Show when="signed-out">
        <SignInButton mode="modal">
          <button className="flex items-center gap-2 text-white transition-opacity duration-300 hover:opacity-50">
            <Image
              src={assets.user_icon}
              alt="Account"
              className="h-5 w-5 invert"
            />
            <span>Account</span>
          </button>
        </SignInButton>
      </Show>
    </>
  );

  return (
    <header className="fixed left-0 top-0 z-[100] w-full bg-black text-white">
      <nav className="relative mx-auto flex h-14 max-w-[1120px] items-center justify-between px-6 md:px-8 lg:h-[5.5rem] lg:px-0">

        {/* Logo */}
        <Image
          src={assets.logo}
          alt="QuickCart logo"
          className="w-28 cursor-pointer brightness-0 invert md:w-32"
          onClick={() => router.push("/")}
          priority
        />

        {/* Desktop Navigation */}
        <div className="hidden items-center lg:flex">
          <div className="group/nav flex items-center gap-14">

            <Link
              href="/"
              className="group/link relative flex items-center text-sm font-medium text-white transition-all duration-300 hover:ml-10"
            >
              <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                <ArrowIcon />
              </span>

              <span className="relative transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                Home
              </span>
            </Link>

            <Link
              href="/all-products"
              className="group/link relative flex items-center text-sm font-medium text-white transition-all duration-300 hover:ml-10"
            >
              <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                <ArrowIcon />
              </span>

              <span className="relative transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                Shop
              </span>
            </Link>

            <Link
              href="/about"
              className="group/link relative flex items-center text-sm font-medium text-white transition-all duration-300 hover:ml-10"
            >
              <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                <ArrowIcon />
              </span>

              <span className="relative transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                About Us
              </span>
            </Link>

            <Link
              href="/contact"
              className="group/link relative flex items-center text-sm font-medium text-white transition-all duration-300 hover:ml-10"
            >
              <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                <ArrowIcon />
              </span>

              <span className="relative transition-all duration-300 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                Contact
              </span>
            </Link>

            {isSeller && (
              <button
                onClick={() => router.push("/seller")}
                className="rounded-full border border-white px-4 py-1.5 text-xs text-white transition-all duration-300 hover:bg-white hover:text-black"
              >
                Seller Dashboard
              </button>
            )}

          </div>
        </div>

        {/* Desktop Right Side */}
        <div className="hidden items-center gap-6 lg:flex">

          {/* Search */}
          <button
            type="button"
            onClick={() => router.push("/all-products?search=true")}
            className="transition-opacity duration-300 hover:opacity-50"
            aria-label="Search"
          >
            <Image
              src={assets.search_icon}
              alt="Search"
              className="h-4 w-4 invert"
            />
          </button>

          {/* Cart directly after Search */}
          <Link
            href="/cart"
            className="relative text-white transition-all duration-300 hover:-translate-y-1 hover:opacity-60"
            aria-label="Cart"
          >
            <CartIcon />

            {getCartCount() > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-black">
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Account */}
          <AccountSection />

        </div>

        {/* Mobile Right Side */}
        <div className="flex items-center gap-4 lg:hidden">

          <Link
            href="/cart"
            className="relative text-white transition-opacity duration-300 hover:opacity-50"
            aria-label="Cart"
          >
            <CartIcon />

            {getCartCount() > 0 && (
              <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-semibold text-black">
                {getCartCount()}
              </span>
            )}
          </Link>

          <Show when="signed-in">
            <UserMenu />
          </Show>

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button
                className="text-white transition-opacity duration-300 hover:opacity-50"
                aria-label="Account"
              >
                <Image
                  src={assets.user_icon}
                  alt="Account"
                  className="h-5 w-5 invert"
                />
              </button>
            </SignInButton>
          </Show>

          <button
            onClick={() => setMenuOpen(true)}
            className="flex cursor-pointer text-white transition-opacity duration-300 hover:opacity-50"
            aria-label="Open menu"
          >
            <MenuIcon />
          </button>

        </div>

        {/* Mobile Fullscreen Menu */}
        <div
          className={`fixed left-0 top-0 z-[200] flex h-screen w-full flex-col justify-between bg-black px-8 pb-12 pt-24 transition-transform duration-700 ease-[cubic-bezier(0.77,0,0.175,1)] lg:hidden ${
            menuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >

          <button
            onClick={closeMenu}
            className="absolute right-6 top-5 flex cursor-pointer text-white transition-transform duration-500 hover:rotate-90"
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>

          <ul className="flex flex-col gap-9">

            <li
              className={`transition-all duration-700 ease-out ${
                menuOpen
                  ? "translate-x-0 opacity-100 delay-100"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <Link
                href="/"
                onClick={closeMenu}
                className="group/link relative flex w-fit items-center text-3xl font-medium text-white"
              >
                <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                  <ArrowIcon />
                </span>

                <span className="relative transition-all duration-300 group-hover/link:ml-10 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                  Home
                </span>
              </Link>
            </li>

            <li
              className={`transition-all duration-700 ease-out ${
                menuOpen
                  ? "translate-x-0 opacity-100 delay-200"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <Link
                href="/all-products"
                onClick={closeMenu}
                className="group/link relative flex w-fit items-center text-3xl font-medium text-white"
              >
                <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                  <ArrowIcon />
                </span>

                <span className="relative transition-all duration-300 group-hover/link:ml-10 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                  Shop
                </span>
              </Link>
            </li>

            <li
              className={`transition-all duration-700 ease-out ${
                menuOpen
                  ? "translate-x-0 opacity-100 delay-300"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <Link
                href="/about"
                onClick={closeMenu}
                className="group/link relative flex w-fit items-center text-3xl font-medium text-white"
              >
                <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                  <ArrowIcon />
                </span>

                <span className="relative transition-all duration-300 group-hover/link:ml-10 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                  About Us
                </span>
              </Link>
            </li>

            <li
              className={`transition-all duration-700 ease-out ${
                menuOpen
                  ? "translate-x-0 opacity-100 delay-[400ms]"
                  : "-translate-x-20 opacity-0"
              }`}
            >
              <Link
                href="/contact"
                onClick={closeMenu}
                className="group/link relative flex w-fit items-center text-3xl font-medium text-white"
              >
                <span className="absolute -left-1 opacity-0 transition-all duration-300 group-hover/link:-left-10 group-hover/link:opacity-100">
                  <ArrowIcon />
                </span>

                <span className="relative transition-all duration-300 group-hover/link:ml-10 after:absolute after:-bottom-2 after:left-0 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-500 group-hover/link:after:w-full">
                  Contact
                </span>
              </Link>
            </li>

            {isSeller && (
              <li
                className={`transition-all duration-700 ease-out ${
                  menuOpen
                    ? "translate-x-0 opacity-100 delay-500"
                    : "-translate-x-20 opacity-0"
                }`}
              >
                <button
                  onClick={() => navigateAndClose("/seller")}
                  className="rounded-full border border-white px-5 py-2 text-sm text-white transition-all duration-300 hover:bg-white hover:text-black"
                >
                  Seller Dashboard
                </button>
              </li>
            )}

          </ul>

          <div
            className={`flex gap-6 transition-all duration-700 ${
              menuOpen
                ? "translate-y-0 opacity-100 delay-[600ms]"
                : "translate-y-10 opacity-0"
            }`}
          >
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white transition-transform duration-300 hover:-translate-y-1"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>

            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white transition-transform duration-300 hover:-translate-y-1"
              aria-label="GitHub"
            >
              <GithubIcon />
            </a>

            <a
              href="https://dribbble.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white transition-transform duration-300 hover:-translate-y-1"
              aria-label="Dribbble"
            >
              <DribbbleIcon />
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noreferrer"
              className="text-white transition-transform duration-300 hover:-translate-y-1"
              aria-label="LinkedIn"
            >
              <LinkedinIcon />
            </a>
          </div>

        </div>

      </nav>
    </header>
  );
};

export default Navbar;
