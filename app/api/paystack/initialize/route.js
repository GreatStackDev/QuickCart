import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import User from "@/models/User";
import Payment from "@/models/Payment";
import { priceCart, verifyCartMatchesUser } from "@/lib/checkout";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ success: false, message: "Please sign in." }, { status: 401 });
    const secret = process.env.PAYSTACK_SECRET_KEY;
    const appUrl = process.env.NEXT_PUBLIC_APP_URL;
    if (!secret || !appUrl || !/^https?:\/\//.test(appUrl)) {
      return NextResponse.json({ success: false, message: "Payments are not yet configured." }, { status: 503 });
    }
    const { address, items } = await request.json();
    await connectDB();
    const user = await User.findById(userId);
    if (!user?.email) return NextResponse.json({ success: false, message: "Account email unavailable." }, { status: 400 });
    const quote = await priceCart(userId, address, items);
    await verifyCartMatchesUser(user, quote.items);
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: user.email,
        amount: quote.amountPesewas,
        currency: "GHS",
        callback_url: new URL("/payment/callback", appUrl).toString(),
        metadata: { userId },
      }),
      cache: "no-store",
    });
    const data = await response.json();
    if (!response.ok || !data.status || !data.data?.reference || !data.data?.authorization_url)
      return NextResponse.json({ success: false, message: data.message || "Payment setup failed." }, { status: 502 });
    await Payment.create({
      reference: data.data.reference, userId, address: quote.address, items: quote.items,
      amount: quote.amount, amountPesewas: quote.amountPesewas, currency: "GHS",
      email: user.email, status: "pending", date: Date.now(),
    });
    return NextResponse.json({ success: true, reference: data.data.reference, authorization_url: data.data.authorization_url });
  } catch (error) {
    console.error("Paystack initialize:", error);
    const badRequest = /cart|address|product|quantity|size|price|total|available/i.test(error.message);
    return NextResponse.json({ success: false, message: badRequest ? error.message : "Unable to start payment." }, { status: badRequest ? 400 : 500 });
  }
}
