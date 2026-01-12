import dbConnect from '@/config/db';
import authSeller from '@/lib/authSeller';
import Product from '@/models/Product';
import { getAuth } from '@clerk/nextjs/server';
import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';


// Configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

export async function POST (request) {
    try {
        
        const { userId } = getAuth(request);

        const isSeller = await authSeller(userId);

        if (!isSeller) {
            return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();

        const name = formData.get('name');
        const description = formData. get('description');
        const price = formData.get('price');
        const category = formData. get('category');
        const offerPrice = formData.get('offerPrice');
        
        const files = formData.getAll('images');

        if (! files || files.length === 0) {
            return NextResponse.json({ success: false, message: "No Files Uploaded", path: "images" }, { status: 400 });
        }


        const result = await Promise.all(
            files.map(async (file, index) => {
                console.log(`✅ 9. ${index} Processing file:`, file.name);
                const arrayBuffer = await file.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                return new Promise((resolve, reject) => {
                    const stream = cloudinary.uploader.upload_stream(
                        { resource_type: 'auto'},
                        (error, result) => {
                            if (error) {
                                console.error(`❌ Cloudinary error for ${file.name}:`, error);
                                reject(error);
                            }
                            else {
                                console.log(`✅ Cloudinary success for ${file.name}`);
                                resolve(result);
                            }
                        }
                    )
                    stream.end(buffer);
                })
            })
        )


        const images = result.map(r => r.secure_url);
        
        await dbConnect();
        const newProduct = await Product.create({
            userId,
            name,
            description,
            price: Number(price),
            category,
            offerPrice: Number(offerPrice),
            images: images,
            date: Date.now(),
        })

        return NextResponse.json({ success: true, message: "Upload Successful", data: newProduct }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ success: false, message: error.message }, { status: 500 });
    }
}