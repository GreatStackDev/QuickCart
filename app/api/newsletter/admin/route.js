import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/config/db";
import Newsletter from "@/models/Newsletter";

const checkAdminAccess = async () => {
    const { userId } = await auth();

    if (!userId) {
        return {
            authorized: false,
            status: 401,
            message: "Unauthorized.",
        };
    }

    const userResponse = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/user/data`,
        {
            headers: {
                Cookie: "",
            },
        }
    ).catch(() => null);

    return {
        authorized: true,
        userId,
    };
};

export async function GET() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                {
                    status: 401,
                }
            );
        }

        const adminEmail =
            process.env.NEWSLETTER_ADMIN_EMAIL;

        if (!adminEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Newsletter admin email is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        const { clerkClient } =
            await import("@clerk/nextjs/server");

        const client = await clerkClient();

        const user =
            await client.users.getUser(userId);

        const email =
            user.emailAddresses?.find(
                (item) =>
                    item.id ===
                    user.primaryEmailAddressId
            )?.emailAddress;

        if (
            !email ||
            email.toLowerCase() !==
                adminEmail.toLowerCase()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Access denied.",
                },
                {
                    status: 403,
                }
            );
        }

        await connectDB();

        const subscribers =
            await Newsletter.find({})
                .sort({
                    subscribedAt: -1,
                })
                .lean();

        return NextResponse.json(
            {
                success: true,
                count: subscribers.length,
                subscribers,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Newsletter admin GET error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to load newsletter subscribers.",
            },
            {
                status: 500,
            }
        );
    }
}

export async function DELETE(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Unauthorized.",
                },
                {
                    status: 401,
                }
            );
        }

        const adminEmail =
            process.env.NEWSLETTER_ADMIN_EMAIL;

        if (!adminEmail) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Newsletter admin email is not configured.",
                },
                {
                    status: 500,
                }
            );
        }

        const { clerkClient } =
            await import("@clerk/nextjs/server");

        const client = await clerkClient();

        const user =
            await client.users.getUser(userId);

        const email =
            user.emailAddresses?.find(
                (item) =>
                    item.id ===
                    user.primaryEmailAddressId
            )?.emailAddress;

        if (
            !email ||
            email.toLowerCase() !==
                adminEmail.toLowerCase()
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Access denied.",
                },
                {
                    status: 403,
                }
            );
        }

        const body = await request.json();

        const subscriberId =
            body?.id;

        if (!subscriberId) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Subscriber ID is required.",
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const deletedSubscriber =
            await Newsletter.findByIdAndDelete(
                subscriberId
            );

        if (!deletedSubscriber) {
            return NextResponse.json(
                {
                    success: false,
                    message:
                        "Subscriber not found.",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message:
                    "Subscriber removed successfully.",
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error(
            "Newsletter admin DELETE error:",
            error
        );

        return NextResponse.json(
            {
                success: false,
                message:
                    "Failed to delete subscriber.",
            },
            {
                status: 500,
            }
        );
    }
}