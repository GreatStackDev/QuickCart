
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Order from '@/models/Order';
import Address from '@/models/Address';
import Product from '@/models/Product';
import authSeller from '@/lib/authSeller';

export async function GET() {
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

        await connectDB();

        const orders = await Order.find({})
            .populate('address')
            .populate('items.product');

        return NextResponse.json(
            {
                success: true,
                orders,
            },
            {
                status: 200,
            }
        );
    } catch (error) {
        console.error('Get seller orders error:', error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error.message ||
                    'Something went wrong',
            },
            {
                status: 500,
            }
        );
    }
}
