
"use client";

import React from 'react';
import Link from 'next/link';
import { assets } from '../../assets/assets';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SideBar = () => {
    const pathname = usePathname();

    const menuItems = [
        {
            name: 'Add Product',
            path: '/seller',
            icon: assets.add_icon,
        },
        {
            name: 'Product List',
            path: '/seller/product-list',
            icon: assets.product_list_icon,
        },
        {
            name: 'Orders',
            path: '/seller/orders',
            icon: assets.order_icon,
        },
        {
            name: 'Newsletter',
            path: '/seller/newsletter',
        },
    ];

    return (
        <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-300 py-2 flex flex-col'>
            {menuItems.map((item) => {

                const isActive = pathname === item.path;

                return (
                    <Link href={item.path} key={item.name} passHref>
                        <div
                            className={
                                `flex items-center py-3 px-4 gap-3 ${
                                    isActive
                                        ? "border-r-4 md:border-r-[6px] bg-black/10 border-black"
                                        : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                            {item.name === 'Newsletter' ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="28"
                                    height="28"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="w-7 h-7"
                                >
                                    <rect
                                        width="20"
                                        height="16"
                                        x="2"
                                        y="4"
                                        rx="2"
                                    />
                                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                            ) : (
                                <Image
                                    src={item.icon}
                                    alt={`${item.name.toLowerCase()}_icon`}
                                    width={28}
                                    height={28}
                                    className="w-7 h-7"
                                />
                            )}

                            <p className='md:block hidden text-center'>
                                {item.name}
                            </p>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
};

export default SideBar;
