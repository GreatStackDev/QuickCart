import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import authSeller from "@/lib/authSeller";
import { getCategorySizeOptions } from "@/lib/sizing.mjs";

export async function PATCH(request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
    if (!(await authSeller(userId))) return NextResponse.json({ success: false, message: "Seller access required." }, { status: 403 });
    const { productId, availableSizes } = await request.json();
    if (!mongoose.isValidObjectId(productId) || !Array.isArray(availableSizes))
      return NextResponse.json({ success: false, message: "Invalid product or sizes." }, { status: 400 });
    await connectDB();
    const product = await Product.findOne({ _id: productId, userId });
    if (!product) return NextResponse.json({ success: false, message: "Product not found." }, { status: 404 });
    const options = getCategorySizeOptions(product.category);
    if (availableSizes.some(size => typeof size !== "string" || !options.includes(size)) ||
        (options.length > 0 && availableSizes.length === 0))
      return NextResponse.json({ success: false, message: "Choose valid available sizes." }, { status: 400 });
    product.availableSizes = [...new Set(availableSizes)];
    await product.save();
    return NextResponse.json({ success: true, availableSizes: product.availableSizes });
  } catch (error) {
    console.error("Update product sizes:", error);
    return NextResponse.json({ success: false, message: "Unable to update product sizes." }, { status: 500 });
  }
}
