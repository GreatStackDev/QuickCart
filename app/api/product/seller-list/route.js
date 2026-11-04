import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import authSeller from '@/lib/authSeller';
import connectDB from '@/config/db';
import Product from '@/models/Product';

export async function GET(request) {
    try {
        // Get user ID from Clerk
        const { userId } = await auth();

        // Check if user is logged in
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

        // Check if user is a seller
        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Not authorized',
                },
                {
                    status: 401,
                }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Get all products belonging to this seller
        const products = await Product.find({ userId });

        // Send products in response
        return NextResponse.json(
            {
                success: true,
                products,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('Seller product fetch error:', error);

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