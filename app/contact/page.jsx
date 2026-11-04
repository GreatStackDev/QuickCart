
'use client';

import React, { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import Footer from "@/components/Footer";
import toast from "react-hot-toast";

const Contact = () => {

    const { router } = useAppContext();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        try {
            // This currently handles the form on the frontend.
            // Connect this to your contact API when you are ready.
            await new Promise((resolve) => setTimeout(resolve, 800));

            toast.success("Message sent successfully.");

            setFormData({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: ""
            });

        } catch (error) {
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white text-[#3F3D39]">

            {/* HERO */}
            <section className="relative overflow-hidden bg-[#F3F1EC]">

                <div className="absolute inset-0 pointer-events-none">

                    <div className="absolute right-[-8%] top-[-35%] h-[650px] w-[650px] rounded-full border border-[#3F3D39]/[0.05]" />

                    <div className="absolute right-[7%] top-[-12%] h-[430px] w-[430px] rounded-full border border-[#3F3D39]/[0.05]" />

                    <div className="absolute left-[60%] top-0 h-full w-px bg-[#3F3D39]/[0.035]" />

                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

                    <div className="max-w-4xl">

                        <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-[#77736B] mb-8">
                            Contact Morven
                        </p>

                        <h1 className="text-5xl md:text-7xl lg:text-[100px] font-light leading-[0.88] tracking-[-0.065em] text-[#3F3D39]">
                            Let's start a
                            <span className="block font-medium">
                                conversation.
                            </span>
                        </h1>

                        <p className="max-w-2xl mt-10 text-sm md:text-base leading-8 text-[#77736B]">
                            Have a question about our collection, your order, sizing,
                            delivery or anything else? We are here to help.
                        </p>

                    </div>

                </div>

                <div className="absolute bottom-8 left-6 md:left-10 flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                    <span>Get in touch</span>
                    <span className="h-px w-10 bg-[#D6D2C9]" />
                </div>

            </section>


            {/* CONTACT CONTENT */}
            <section className="bg-white">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

                    <div className="grid grid-cols-1 lg:grid-cols-[0.75fr_1.25fr] gap-16 lg:gap-28">


                        {/* CONTACT INFORMATION */}
                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                Contact Information
                            </p>

                            <h2 className="text-4xl md:text-5xl font-light leading-[1.05] tracking-[-0.05em] text-[#3F3D39]">
                                We're here to
                                <span className="block font-medium">
                                    help.
                                </span>
                            </h2>

                            <p className="mt-7 max-w-md text-sm leading-8 text-[#77736B]">
                                Whether you need assistance with an order or simply
                                want to learn more about Morven, our team is ready
                                to assist you.
                            </p>


                            {/* DETAILS */}
                            <div className="mt-12 border-t border-[#E8E5DE]">

                                <div className="py-6 border-b border-[#E8E5DE]">

                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                                        Visit Us
                                    </p>

                                    <p className="mt-3 text-sm leading-7 text-[#3F3D39]">
                                        Accra, Ghana
                                    </p>

                                </div>


                                <div className="py-6 border-b border-[#E8E5DE]">

                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                                        Email
                                    </p>

                                    <a
                                        href="mailto:info@morven.com"
                                        className="mt-3 inline-block text-sm text-[#3F3D39] hover:text-[#77736B] transition"
                                    >
                                        info@morven.com
                                    </a>

                                </div>


                                <div className="py-6 border-b border-[#E8E5DE]">

                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                                        Phone
                                    </p>

                                    <a
                                        href="tel:+233000000000"
                                        className="mt-3 inline-block text-sm text-[#3F3D39] hover:text-[#77736B] transition"
                                    >
                                        +233 00 000 0000
                                    </a>

                                </div>


                                <div className="py-6">

                                    <p className="text-[9px] uppercase tracking-[0.3em] text-[#AAA69E]">
                                        Opening Hours
                                    </p>

                                    <p className="mt-3 text-sm leading-7 text-[#3F3D39]">
                                        Monday – Saturday
                                        <br />
                                        9:00 AM – 6:00 PM
                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* CONTACT FORM */}
                        <div className="bg-[#FAF9F6] border border-[#E8E5DE] p-7 md:p-10 lg:p-12">

                            <div className="mb-10">

                                <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-5">
                                    Send Us A Message
                                </p>

                                <h2 className="text-3xl md:text-4xl font-light tracking-[-0.04em] text-[#3F3D39]">
                                    How can we help?
                                </h2>

                            </div>


                            <form
                                onSubmit={handleSubmit}
                                className="space-y-7"
                            >

                                {/* NAME + EMAIL */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>

                                        <label className="block mb-2 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                            Name *
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Your name"
                                            className="
                                                w-full
                                                border-b border-[#D6D2C9]
                                                bg-transparent
                                                px-0 py-3
                                                text-sm text-[#3F3D39]
                                                outline-none
                                                placeholder:text-[#AAA69E]
                                                focus:border-[#3F3D39]
                                                transition
                                            "
                                        />

                                    </div>


                                    <div>

                                        <label className="block mb-2 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                            Email *
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Your email"
                                            className="
                                                w-full
                                                border-b border-[#D6D2C9]
                                                bg-transparent
                                                px-0 py-3
                                                text-sm text-[#3F3D39]
                                                outline-none
                                                placeholder:text-[#AAA69E]
                                                focus:border-[#3F3D39]
                                                transition
                                            "
                                        />

                                    </div>

                                </div>


                                {/* PHONE + SUBJECT */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    <div>

                                        <label className="block mb-2 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                            Phone
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Your phone number"
                                            className="
                                                w-full
                                                border-b border-[#D6D2C9]
                                                bg-transparent
                                                px-0 py-3
                                                text-sm text-[#3F3D39]
                                                outline-none
                                                placeholder:text-[#AAA69E]
                                                focus:border-[#3F3D39]
                                                transition
                                            "
                                        />

                                    </div>


                                    <div>

                                        <label className="block mb-2 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                            Subject
                                        </label>

                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            placeholder="How can we help?"
                                            className="
                                                w-full
                                                border-b border-[#D6D2C9]
                                                bg-transparent
                                                px-0 py-3
                                                text-sm text-[#3F3D39]
                                                outline-none
                                                placeholder:text-[#AAA69E]
                                                focus:border-[#3F3D39]
                                                transition
                                            "
                                        />

                                    </div>

                                </div>


                                {/* MESSAGE */}
                                <div>

                                    <label className="block mb-2 text-[9px] uppercase tracking-[0.25em] text-[#77736B]">
                                        Message *
                                    </label>

                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message..."
                                        rows={6}
                                        className="
                                            w-full
                                            resize-none
                                            border-b border-[#D6D2C9]
                                            bg-transparent
                                            px-0 py-3
                                            text-sm text-[#3F3D39]
                                            outline-none
                                            placeholder:text-[#AAA69E]
                                            focus:border-[#3F3D39]
                                            transition
                                        "
                                    />

                                </div>


                                {/* SUBMIT */}
                                <div className="pt-3">

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="
                                            w-full md:w-auto
                                            bg-[#3F3D39]
                                            px-10 py-4
                                            text-[10px]
                                            uppercase
                                            tracking-[0.25em]
                                            text-white
                                            transition-all
                                            duration-300
                                            hover:bg-[#5A5751]
                                            disabled:cursor-not-allowed
                                            disabled:opacity-60
                                        "
                                    >
                                        {loading ? "Sending..." : "Send Message"}
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </section>


            {/* FAQ / HELP SECTION */}
            <section className="bg-[#F3F1EC] border-y border-[#E8E5DE]">

                <div className="max-w-7xl mx-auto px-6 md:px-10 py-24 md:py-32">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-28">

                        <div>

                            <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                                Need More Help?
                            </p>

                            <h2 className="text-4xl md:text-6xl font-light leading-[1.02] tracking-[-0.05em] text-[#3F3D39]">
                                We've got
                                <span className="block font-medium">
                                    answers.
                                </span>
                            </h2>

                        </div>


                        <div className="divide-y divide-[#D6D2C9]">

                            <button
                                onClick={() => router.push("/my-orders")}
                                className="group w-full py-6 flex items-center justify-between text-left"
                            >

                                <div>
                                    <p className="text-sm font-medium text-[#3F3D39]">
                                        Track My Order
                                    </p>

                                    <p className="mt-1 text-xs text-[#77736B]">
                                        View your recent orders and order status.
                                    </p>
                                </div>

                                <span className="text-lg text-[#77736B] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </button>


                            <button
                                onClick={() => router.push("/all-products")}
                                className="group w-full py-6 flex items-center justify-between text-left"
                            >

                                <div>
                                    <p className="text-sm font-medium text-[#3F3D39]">
                                        Explore Our Collection
                                    </p>

                                    <p className="mt-1 text-xs text-[#77736B]">
                                        Discover suits, shirts, trousers and more.
                                    </p>
                                </div>

                                <span className="text-lg text-[#77736B] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </button>


                            <button
                                onClick={() => router.push("/about")}
                                className="group w-full py-6 flex items-center justify-between text-left"
                            >

                                <div>
                                    <p className="text-sm font-medium text-[#3F3D39]">
                                        Learn More About Morven
                                    </p>

                                    <p className="mt-1 text-xs text-[#77736B]">
                                        Discover our story, values and approach to fashion.
                                    </p>
                                </div>

                                <span className="text-lg text-[#77736B] transition-transform duration-300 group-hover:translate-x-1">
                                    →
                                </span>

                            </button>

                        </div>

                    </div>

                </div>

            </section>


            {/* FINAL CTA */}
            <section className="bg-[#FAF9F6]">

                <div className="max-w-5xl mx-auto px-6 text-center py-24 md:py-32">

                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#AAA69E] mb-7">
                        Morven
                    </p>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1] tracking-[-0.05em] text-[#3F3D39]">
                        Style begins with
                        <span className="block font-medium text-[#77736B]">
                            a conversation.
                        </span>
                    </h2>

                    <p className="max-w-xl mx-auto mt-8 text-sm md:text-base leading-8 text-[#77736B]">
                        Reach out to our team and let us help you find the right
                        pieces for your wardrobe.
                    </p>

                    <button
                        onClick={() => router.push("/all-products")}
                        className="
                            mt-9
                            border border-[#3F3D39]/25
                            bg-white
                            px-9 py-3.5
                            text-[10px]
                            uppercase
                            tracking-[0.25em]
                            text-[#3F3D39]
                            transition-all
                            duration-300
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

export default Contact;
