import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";

export async function GET(request, { params }) {
    try {
        await connectDB();

        const { id } = await params;

        const product = await Product.findById(id).lean();

        if (!product) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Product not found",
                },
                {
                    status: 404,
                }
            );
        }

        return NextResponse.json(
            {
                success: true,
                product,
            },
            {
                status: 200,
            }
        );

    } catch (error) {
        console.error("Single product fetch error:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message || "Failed to fetch product",
            },
            {
                status: 500,
            }
        );
    }
}