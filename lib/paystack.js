import Payment from "@/models/Payment";
import Order from "@/models/Order";
import { removePurchasedCartItems } from "@/lib/checkout";

export async function settlePaystackPayment(reference) {
  const secret = process.env.PAYSTACK_SECRET_KEY;
  if (!secret) throw new Error("Paystack is not configured.");
  const paystack = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` }, cache: "no-store",
  });
  const result = await paystack.json();
  if (!paystack.ok || !result.status || !result.data) throw new Error("Paystack verification was unavailable.");
  const transaction = result.data;
  if (transaction.status !== "success") return { success: false, status: transaction.status };
  const payment = await Payment.findOne({ reference });
  if (!payment) throw new Error("Payment record not found.");
  const expected = payment.amountPesewas ?? Math.round(payment.amount * 100);
  if (transaction.reference !== reference || transaction.currency !== "GHS" ||
      Number(transaction.amount) !== expected ||
      (payment.email && String(transaction.customer?.email || "").toLowerCase() !== payment.email.toLowerCase())) {
    throw new Error("Payment details did not match the checkout.");
  }
  // Unique paymentReference enforces one order per transaction, even with parallel callbacks.
  let orderResult;
  try {
    orderResult = await Order.findOneAndUpdate(
    { paymentReference: reference },
    {
      $setOnInsert: {
        paymentReference: reference,
        userId: payment.userId,
        address: payment.address,
        items: payment.items,
        amount: payment.amount,
        date: payment.date,
        status: "Order Placed",
        paymentStatus: "paid",
        paymentMethod: "paystack",
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true, includeResultMetadata: true }
    );
  } catch (error) {
    if (error.code !== 11000) throw error;
    // Another verified webhook or callback created the order concurrently.
    const existing = await Order.findOne({ paymentReference: reference });
    if (!existing) throw error;
    orderResult = { value: existing, lastErrorObject: { updatedExisting: true } };
  }
  const order = orderResult.value;
  await Payment.updateOne({ reference }, { $set: { status: "success", orderId: String(order._id) } });
  // Clear only purchased quantities once (not the entire cart). Retry callbacks
  // are safe because they do not re-run this step for an existing order.
  if (!orderResult.lastErrorObject?.updatedExisting) {
    try { await removePurchasedCartItems(payment.userId, payment.items); }
    catch (error) { console.error("Payment recorded, but cart cleanup failed:", error); }
  }
  return { success: true, orderId: String(order._id) };
}
