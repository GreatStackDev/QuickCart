'use client';

import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import Loading from "@/components/Loading";
import { useAppContext } from "@/context/AppContext";

const PaymentCallback = () => {

    const searchParams = useSearchParams();
    const router = useRouter();
    const { fetchUserData } = useAppContext();

    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("Verifying your payment...");

    useEffect(() => {

        const verifyPayment = async () => {

            const reference = searchParams.get("reference");

            if (!reference) {
                setMessage("Payment reference not found.");
                setLoading(false);
                return;
            }

            try {

                const { data } = await axios.get(
                    `/api/paystack/verify?reference=${encodeURIComponent(reference)}`
                );

                if (data.success) {
                    setMessage("Payment verified and order confirmed!");
                    await fetchUserData();

                    setTimeout(() => {
                        router.push("/order-placed");
                    }, 2000);

                } else {
                    setMessage(
                        data.message ||
                        "Payment verification failed."
                    );
                    setLoading(false);
                }

            } catch (error) {

                console.error(error);

                setMessage(
                    error.response?.data?.message ||
                    "Unable to verify payment."
                );

                setLoading(false);
            }
        };

        verifyPayment();

    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="text-center">

                {loading && <Loading />}

                <h2 className="text-lg font-medium mt-5">
                    {message}
                </h2>

            </div>
        </div>
    );
};

const PaymentCallbackPage = () => {
    return (
        <Suspense fallback={<Loading />}>
            <PaymentCallback />
        </Suspense>
    );
};

export default PaymentCallbackPage;