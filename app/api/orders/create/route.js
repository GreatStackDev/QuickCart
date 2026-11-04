import { NextResponse } from "next/server";
// Paid orders must be created only after server-side Paystack verification.
// Do not permit an unauthenticated or client-directed bypass of payment.
export async function POST() {
  return NextResponse.json(
    { success: false, message: "Please complete checkout using Paystack." },
    { status: 403 }
  );
}
