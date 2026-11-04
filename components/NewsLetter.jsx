"use client";

import React, { useState } from "react";

const NewsLetter = () => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState("idle");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const trimmedEmail = email.trim();

        if (!trimmedEmail) {
            setStatus("error");
            setMessage(
                "Please enter your email address."
            );
            return;
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(trimmedEmail)) {
            setStatus("error");
            setMessage(
                "Please enter a valid email address."
            );
            return;
        }

        try {
            setStatus("loading");
            setMessage("");

            const response = await fetch(
                "/api/newsletter",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json",
                    },
                    body: JSON.stringify({
                        email: trimmedEmail,
                    }),
                }
            );

            const data =
                await response.json();

            if (!response.ok) {
                setStatus("error");
                setMessage(
                    data?.message ||
                        "Something went wrong. Please try again."
                );
                return;
            }

            setStatus("success");
            setMessage(
                data?.message ||
                    "Successfully subscribed to the Morven Journal."
            );

            setEmail("");
        } catch (error) {
            console.error(
                "Newsletter subscription error:",
                error
            );

            setStatus("error");
            setMessage(
                "Unable to subscribe right now. Please try again."
            );
        }
    };

    return (
        <section className="w-full bg-white py-20 sm:py-24">
            <div className="mx-auto flex max-w-4xl flex-col items-center px-5 text-center sm:px-8">

                {/* Small Label */}
                <div className="flex items-center gap-3">
                    <span className="h-px w-7 bg-black" />

                    <p
                        className="
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.35em]
                            text-gray-500
                        "
                    >
                        MORVEN JOURNAL
                    </p>

                    <span className="h-px w-7 bg-black" />
                </div>

                {/* Heading */}
                <h2
                    className="
                        mt-5
                        text-3xl
                        font-medium
                        tracking-[-0.04em]
                        text-black
                        sm:text-4xl
                        lg:text-[42px]
                    "
                >
                    Stay Updated
                </h2>

                {/* Description */}
                <p
                    className="
                        mt-4
                        max-w-[570px]
                        text-sm
                        leading-6
                        text-gray-500
                    "
                >
                    Be the first to discover new
                    collections, exclusive pieces,
                    styling inspiration and special
                    offers from Morven.
                </p>

                {/* Newsletter Form */}
                <form
                    onSubmit={handleSubmit}
                    className="
                        mt-9
                        flex
                        w-full
                        max-w-[620px]
                        flex-col
                        sm:flex-row
                    "
                >
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);

                            if (
                                status !==
                                "idle"
                            ) {
                                setStatus(
                                    "idle"
                                );
                                setMessage("");
                            }
                        }}
                        placeholder="Enter your email address"
                        disabled={
                            status === "loading"
                        }
                        aria-label="Email address"
                        className="
                            h-14
                            w-full
                            border
                            border-black/20
                            bg-white
                            px-5
                            text-sm
                            text-black
                            outline-none
                            transition-all
                            duration-300
                            placeholder:text-gray-400
                            focus:border-black
                            disabled:bg-gray-50
                            sm:border-r-0
                        "
                    />

                    <button
                        type="submit"
                        disabled={
                            status === "loading"
                        }
                        className="
                            group
                            flex
                            h-14
                            items-center
                            justify-center
                            gap-3
                            bg-black
                            px-8
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-[0.2em]
                            text-white
                            transition-all
                            duration-300
                            hover:bg-gray-800
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                            sm:min-w-[170px]
                        "
                    >
                        {status ===
                        "loading" ? (
                            <>
                                <span
                                    className="
                                        h-3
                                        w-3
                                        animate-spin
                                        rounded-full
                                        border
                                        border-white/30
                                        border-t-white
                                    "
                                />

                                <span>
                                    Subscribing
                                </span>
                            </>
                        ) : (
                            <>
                                <span>
                                    Subscribe
                                </span>

                                <span
                                    className="
                                        text-sm
                                        transition-transform
                                        duration-300
                                        group-hover:translate-x-1
                                    "
                                >
                                    →
                                </span>
                            </>
                        )}
                    </button>
                </form>

                {/* Form Status */}
                <div className="mt-4 min-h-[18px]">
                    {status ===
                        "success" && (
                        <p
                            className="
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.15em]
                                text-green-700
                            "
                        >
                            ✓ {message}
                        </p>
                    )}

                    {status ===
                        "error" && (
                        <p
                            className="
                                text-[10px]
                                font-medium
                                uppercase
                                tracking-[0.15em]
                                text-red-600
                            "
                        >
                            {message}
                        </p>
                    )}
                </div>

                {/* Bottom Information */}
                <div
                    className="
                        mt-8
                        flex
                        flex-wrap
                        items-center
                        justify-center
                        gap-x-4
                        gap-y-2
                        text-[8px]
                        uppercase
                        tracking-[0.18em]
                        text-gray-400
                    "
                >
                    <span>
                        New Arrivals
                    </span>

                    <span className="h-3 w-px bg-gray-300" />

                    <span>
                        Style Inspiration
                    </span>

                    <span className="h-3 w-px bg-gray-300" />

                    <span>
                        Exclusive Offers
                    </span>
                </div>

                {/* Privacy Text */}
                <p className="mt-4 text-[9px] text-gray-400">
                    No spam. Only selected Morven
                    updates.
                </p>
            </div>
        </section>
    );
};

export default NewsLetter;