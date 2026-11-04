import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Product from '@/models/Product';

export async function GET() {
    try {
        await connectDB();

        const products = await Product.find({})
            .sort({ date: -1 })
            .lean();

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
        console.error('Product list fetch error:', error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to fetch products',
            },
            {
                status: 500,
            }
        );
    }
}