import crypto from "node:crypto";
import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import { settlePaystackPayment } from "@/lib/paystack";

export const runtime = "nodejs";

export async function POST(request) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  const signature = request.headers.get("x-paystack-signature") || "";
  if (!secret || !/^[a-f0-9]{128}$/i.test(signature))
    return NextResponse.json({ success: false }, { status: 401 });
  const body = await request.text();
  const digest = crypto.createHmac("sha512", secret).update(body).digest("hex");
  if (!crypto.timingSafeEqual(Buffer.from(digest, "hex"), Buffer.from(signature, "hex")))
    return NextResponse.json({ success: false }, { status: 401 });
  try {
    const event = JSON.parse(body);
    if (event.event !== "charge.success") return NextResponse.json({ success: true });
    const reference = event.data?.reference;
    if (typeof reference !== "string" || !/^[a-zA-Z0-9._-]{1,200}$/.test(reference))
      return NextResponse.json({ success: false }, { status: 400 });
    await connectDB();
    const settled = await settlePaystackPayment(reference);
    if (!settled.success) return NextResponse.json({ success: false }, { status: 409 });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Paystack webhook failed:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
