import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Payment from "@/models/Payment";
import { settlePaystackPayment } from "@/lib/paystack";

export const runtime = "nodejs";

export async function GET(request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
  const reference = new URL(request.url).searchParams.get("reference");
  if (!reference || reference.length > 200 || !/^[a-zA-Z0-9._-]+$/.test(reference))
    return NextResponse.json({ success: false, message: "Invalid payment reference." }, { status: 400 });
  try {
    await connectDB();
    const payment = await Payment.findOne({ reference, userId });
    if (!payment) return NextResponse.json({ success: false, message: "Payment not found for your account." }, { status: 404 });
    const settled = await settlePaystackPayment(reference);
    if (!settled.success)
      return NextResponse.json({ success: false, message: "Payment has not been completed.", paymentStatus: settled.status }, { status: 409 });
    return NextResponse.json({ success: true, message: "Payment verified and order recorded.", orderId: settled.orderId });
  } catch (error) {
    console.error("Paystack verify:", error);
    return NextResponse.json({ success: false, message: "We could not confirm your payment yet. Please try again." }, { status: 502 });
  }
}
