import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Address from '@/models/Address';

export async function POST(request) {
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

        const address = await request.json();

        if (!address) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Address data is required',
                },
                {
                    status: 400,
                }
            );
        }

        await connectDB();

        const newAddress = await Address.create({
            ...address,
            userId,
        });

        return NextResponse.json(
            {
                success: true,
                message: 'Address added successfully',
                address: newAddress,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error('Add address error:', error);

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