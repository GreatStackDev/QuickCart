
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import authSeller from '@/lib/authSeller';
import connectDB from '@/config/db';
import Product from '@/models/Product';
import { getCategorySizeOptions } from '@/lib/sizing.mjs';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function POST(request) {
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

        // Check Cloudinary configuration
        if (
            !process.env.CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET
        ) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'Cloudinary environment variables are missing',
                },
                {
                    status: 500,
                }
            );
        }

        // Get form data
        const formData = await request.formData();

        // Get product details
        const name = formData.get('name');
        const description = formData.get('description');
        const category = formData.get('category');
        const price = formData.get('price');
        const offerPrice = formData.get('offerPrice');
        let availableSizes;
        try { availableSizes = JSON.parse(formData.get('availableSizes') || "[]"); }
        catch { return NextResponse.json({ success: false, message: "Invalid size options." }, { status: 400 }); }
        const allowedSizes = getCategorySizeOptions(category);
        if (!Array.isArray(availableSizes) || availableSizes.some(size => !allowedSizes.includes(size)) ||
            (allowedSizes.length > 0 && availableSizes.length === 0) ||
            !Number.isFinite(Number(price)) || Number(price) <= 0 ||
            !Number.isFinite(Number(offerPrice)) || Number(offerPrice) <= 0 ||
            Number(offerPrice) > Number(price))
          return NextResponse.json({ success: false, message: "Select valid sizes and enter valid prices." }, { status: 400 });

        // Get image files
        const files = formData.getAll('images');

        // Check if files exist
        if (!files || files.length === 0) {
            return NextResponse.json(
                {
                    success: false,
                    message: 'No image files uploaded',
                },
                {
                    status: 400,
                }
            );
        }

        // Upload images to Cloudinary
        const result = await Promise.all(
            files.map(async (file) => {

                // Check if file is valid
                if (!file || typeof file.arrayBuffer !== 'function') {
                    throw new Error('Invalid image file');
                }

                // Convert file to ArrayBuffer
                const arrayBuffer = await file.arrayBuffer();

                // Convert ArrayBuffer to Buffer
                const buffer = Buffer.from(arrayBuffer);

                // Upload to Cloudinary
                return new Promise((resolve, reject) => {

                    const uploadStream = cloudinary.uploader.upload_stream(
                        {
                            resource_type: 'image',
                            folder: 'quickcart/products',
                        },
                        (error, result) => {

                            if (error) {
                                console.error(
                                    'Cloudinary upload error:',
                                    error
                                );

                                reject(error);
                            } else {
                                resolve(result);
                            }
                        }
                    );

                    uploadStream.end(buffer);
                });
            })
        );

        // Get image URLs
        const image = result.map(
            (item) => item.secure_url
        );

        // Connect to MongoDB
        await connectDB();

        // Create product in MongoDB
        const newProduct = await Product.create({
            userId,
            name,
            description,
            category,
            price: Number(price),
            offerPrice: Number(offerPrice),
            availableSizes: [...new Set(availableSizes)],
            image,
            date: Date.now(),
        });

        // Send success response
        return NextResponse.json(
            {
                success: true,
                message: 'Upload successful',
                product: newProduct,
            },
            {
                status: 200,
            }
        );

    } catch (error) {

        console.error('Product upload error:', error);

        return NextResponse.json(
            {
                success: false,
                message:
                    error?.message ||
                    'Something went wrong while uploading the product',

                cloudinaryError: error?.http_code
                    ? {
                        http_code: error.http_code,
                        name: error.name,
                        message: error.message,
                    }
                    : null,
            },
            {
                status: 500,
            }
        );
    }
}

