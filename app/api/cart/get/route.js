import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import User from '@/models/User';

export async function GET(request) {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not authenticated',
                },
                {
                    status: 401,
                }
            );
        }

        await connectDB();

        const user = await User.findById(userId);

        if (!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'User not found',
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                cartItems: user.cartItems || {},
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('Cart fetch error:', error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Something went wrong',
            },
            {
                status: 500,
            }
        );
    }
}