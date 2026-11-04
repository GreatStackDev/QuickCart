import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import authSeller from '@/lib/authSeller';
import connectDB from '@/config/db';
import Product from '@/models/Product';

export async function DELETE(request) {
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

        // Get product ID from request
        const { productId } = await request.json();

        // Check if product ID was provided
        if (!productId) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product ID is required',
                },
                {
                    status: 400,
                }
            );
        }

        // Connect to MongoDB
        await connectDB();

        // Find the product belonging to this seller
        const product = await Product.findOne({
            _id: productId,
            userId,
        });

        // Check if product exists
        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Product not found or you are not authorized to delete it',
                },
                {
                    status: 404,
                }
            );
        }

        // Delete the product
        await Product.deleteOne({
            _id: productId,
            userId,
        });

        // Send success response
        return NextResponse.json(
            {
                success: true,
                message: 'Product deleted successfully',
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('Product delete error:', error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || 'Failed to delete product',
            },
            {
                status: 500,
            }
        );
    }
}