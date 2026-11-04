import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import Product from "@/models/Product";
import { getAvailableSizes, needsSize, parseCartKey } from "@/lib/sizing.mjs";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
    const { cartItems } = await request.json();
    if (!cartItems || typeof cartItems !== "object" || Array.isArray(cartItems) ||
        Object.keys(cartItems).length > 60)
      return NextResponse.json({ success: false, message: "Invalid cart." }, { status: 400 });
    await connectDB();
    for (const [key, quantity] of Object.entries(cartItems)) {
      if (!Number.isSafeInteger(quantity) || quantity < 1 || quantity > 25)
        return NextResponse.json({ success: false, message: "Quantity must be between 1 and 25." }, { status: 400 });
      const { productId, size } = parseCartKey(key);
      if (!mongoose.isValidObjectId(productId))
        return NextResponse.json({ success: false, message: "Invalid product." }, { status: 400 });
      const product = await Product.findById(productId).lean();
      if (!product || (needsSize(product) && !getAvailableSizes(product).includes(size)) ||
          (!needsSize(product) && size))
        return NextResponse.json({ success: false, message: `Please select a valid size for ${product?.name || "your product"}.` }, { status: 400 });
    }
    const result = await User.updateOne({ _id: userId }, { $set: { cartItems } });
    if (!result.matchedCount) return NextResponse.json({ success: false, message: "Account not found." }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Cart update:", error);
    return NextResponse.json({ success: false, message: "Unable to update cart." }, { status: 500 });
  }
}
