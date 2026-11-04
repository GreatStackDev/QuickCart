import mongoose from "mongoose";
import Product from "@/models/Product";
import Address from "@/models/Address";
import { getAvailableSizes, needsSize, parseCartKey } from "@/lib/sizing.mjs";

const MAX_QTY = 25;
export const isValidId = (id) => typeof id === "string" && mongoose.isValidObjectId(id);

export async function priceCart(userId, addressId, requestedItems) {
  if (!isValidId(addressId)) throw new Error("Please select a valid delivery address.");
  const address = await Address.findOne({ _id: addressId, userId }).lean();
  if (!address) throw new Error("Delivery address does not belong to this account.");
  if (!Array.isArray(requestedItems) || !requestedItems.length || requestedItems.length > 60)
    throw new Error("Cart must contain between 1 and 60 items.");

  const items = [];
  let subtotalPesewas = 0;
  const seen = new Set();
  for (const requested of requestedItems) {
    const productId = String(requested?.product || "");
    const size = String(requested?.size || "").trim();
    const quantity = requested?.quantity;
    if (!isValidId(productId) || !Number.isSafeInteger(quantity) || quantity < 1 || quantity > MAX_QTY)
      throw new Error("Invalid product or quantity in cart.");
    const uniqueKey = `${productId}::${size}`;
    if (seen.has(uniqueKey)) throw new Error("Duplicate cart item.");
    seen.add(uniqueKey);
    const product = await Product.findById(productId).lean();
    if (!product) throw new Error("A product in your cart is no longer available.");
    const availableSizes = getAvailableSizes(product);
    if (needsSize(product) && !availableSizes.includes(size))
      throw new Error(`Please select a valid available size for ${product.name}.`);
    if (!needsSize(product) && size) throw new Error("Invalid size for this item.");
    if (!Number.isFinite(product.offerPrice) || product.offerPrice <= 0)
      throw new Error("A product has an invalid price.");
    const unitPesewas = Math.round(product.offerPrice * 100);
    if (!Number.isSafeInteger(unitPesewas) || unitPesewas <= 0) throw new Error("Invalid product price.");
    subtotalPesewas += unitPesewas * quantity;
    items.push({ product: productId, size, quantity });
  }
  if (!Number.isSafeInteger(subtotalPesewas) || subtotalPesewas <= 0)
    throw new Error("Invalid order total.");
  const taxPesewas = Math.round(subtotalPesewas * 0.02);
  return {
    items, address: addressId, subtotalPesewas, taxPesewas,
    amountPesewas: subtotalPesewas + taxPesewas,
    amount: (subtotalPesewas + taxPesewas) / 100,
  };
}

export async function verifyCartMatchesUser(user, items) {
  const cart = user?.cartItems || {};
  for (const item of items) {
    const key = item.size ? `${item.product}::${item.size}` : item.product;
    if (!Number.isSafeInteger(cart[key]) || cart[key] < item.quantity) {
      throw new Error("Your cart has changed. Please review it before paying.");
    }
  }
}

export async function removePurchasedCartItems(userId, items) {
  // Use conditional atomic decrements so additions made while paying are retained.
  const User = (await import("@/models/User")).default;
  const user = await User.findById(userId);
  if (!user) return;
  const cart = { ...user.cartItems };
  for (const item of items) {
    const key = item.size ? `${item.product}::${item.size}` : item.product;
    if (Number.isSafeInteger(cart[key])) {
      cart[key] -= item.quantity;
      if (cart[key] <= 0) delete cart[key];
    }
  }
  user.cartItems = cart;
  await user.save();
}
