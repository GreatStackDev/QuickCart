"use client"
import React from "react";
import { assets, BagIcon, BoxIcon, CartIcon, HomeIcon } from "@/assets/assets";
import { useAppContext } from "@/context/AppContext";
import Image from "next/image";
import Link from "next/link";
import { useClerk, UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

const Navbar = () => {
  const { isSeller, router } = useAppContext();
  const { openSignIn } = useClerk();

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-32 py-3 border-b border-gray-300 text-gray-700">
      {/* Logo */}
      <Image
        className="cursor-pointer w-28 md:w-32"
        onClick={() => router.push('/')}
        src={assets.logo}
        alt="logo"
      />
      
      {/* Center Links (Desktop) */}
      <div className="flex items-center gap-4 lg:gap-8 max-md:hidden">
        <Link href="/" className="hover:text-gray-900 transition">Home</Link>
        <Link href="/all-products" className="hover:text-gray-900 transition">Shop</Link>
        <Link href="/" className="hover:text-gray-900 transition">About Us</Link>
        <Link href="/" className="hover:text-gray-900 transition">Contact</Link>

        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
      </div>

      {/* Desktop Navigation (Right Side) */}
      <div className="hidden md:flex items-center gap-4">
        <Image className="w-4 h-4 cursor-pointer" src={assets.search_icon} alt="search icon" />
        
        <SignedOut>
          <button 
            onClick={() => openSignIn()} 
            className="flex items-center gap-2 hover:text-gray-900 transition"
          >
            <Image src={assets.user_icon} alt="user icon" />
            Account
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action 
                label="Cart" 
                labelIcon={<CartIcon />} 
                onClick={() => router.push('/cart')} 
              />
              <UserButton.Action 
                label="My Orders" 
                labelIcon={<BagIcon />} 
                onClick={() => router.push('/my-orders')} 
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>

      {/* Mobile Navigation (Right Side) */}
      <div className="flex items-center md:hidden gap-3">
        {isSeller && (
          <button onClick={() => router.push('/seller')} className="text-xs border px-4 py-1.5 rounded-full">
            Seller Dashboard
          </button>
        )}
        
        <SignedOut>
          <button onClick={() => openSignIn()} className="flex items-center gap-2">
            <Image src={assets.user_icon} alt="user icon" />
          </button>
        </SignedOut>

        <SignedIn>
          <UserButton>
            <UserButton.MenuItems>
              <UserButton.Action 
                label="Home" 
                labelIcon={<HomeIcon />} 
                onClick={() => router.push('/')} 
              />

              <UserButton.Action 
                label="Products" 
                labelIcon={<BoxIcon />} 
                onClick={() => router.push('/all-products')} 
              />

              <UserButton.Action 
                label="Cart" 
                labelIcon={<CartIcon />} 
                onClick={() => router.push('/cart')} 
              />
              <UserButton.Action 
                label="My Orders" 
                labelIcon={<BagIcon />} 
                onClick={() => router.push('/my-orders')} 
              />
            </UserButton.MenuItems>
          </UserButton>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;