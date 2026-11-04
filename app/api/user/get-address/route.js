import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Address from '@/models/Address';

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

        const addresses = await Address.find({ userId });

        return NextResponse.json(
            {
                success: true,
                addresses,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('Get addresses error:', error);

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