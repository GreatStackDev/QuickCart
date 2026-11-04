import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Newsletter from "@/models/Newsletter";

const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request) {
    try {
        const body = await request.json();

        const email = String(body?.email || "")
            .trim()
            .toLowerCase();

        if (!email) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Email address is required.",
                },
                {
                    status: 400,
                }
            );
        }

        if (!emailRegex.test(email)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Please enter a valid email address.",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const existingSubscriber =
            await Newsletter.findOne({ email });

        if (existingSubscriber) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This email is already subscribed.",
                },
                {
                    status: 409,
                }
            );
        }

        const subscriber =
            await Newsletter.create({
                email,
            });

        return NextResponse.json(
            {
                success: true,
                message:
                    "Successfully subscribed to the Morven Journal.",
                subscriber: {
                    id: subscriber._id,
                    email: subscriber.email,
                },
            },
            {
                status: 201,
            }
        );
    } catch (error) {
        console.error(
            "Newsletter subscription error:",
            error
        );

        if (error?.code === 11000) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "This email is already subscribed.",
                },
                {
                    status: 409,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message:
                    "Something went wrong. Please try again.",
            },
            {
                status: 500,
            }
        );
    }
}