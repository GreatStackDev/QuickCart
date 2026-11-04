import test from "node:test";
import assert from "node:assert/strict";
import { getCategorySizeOptions, getAvailableSizes, needsSize, makeCartKey, parseCartKey } from "../lib/sizing.mjs";

test("shirt neck sizes support legal/formalwear orders", () => {
  const sizes = getCategorySizeOptions("SHIRT");
  assert.ok(sizes.includes("14"));
  assert.ok(sizes.includes("26"));
  assert.ok(sizes.includes("XL"));
});
test("suit sizes include 44 through 62", () => {
  const sizes = getCategorySizeOptions("SUIT");
  assert.equal(sizes[0], "44");
  assert.equal(sizes.at(-1), "62");
});
test("seller size availability constrains purchased options", () => {
  const product = { category: "SHIRT", availableSizes: ["M", "L"] };
  assert.deepEqual(getAvailableSizes(product), ["M", "L"]);
  assert.equal(needsSize(product), true);
});
test("size variants receive distinct cart keys", () => {
  const id = "507f1f77bcf86cd799439011";
  assert.notEqual(makeCartKey(id, "M"), makeCartKey(id, "L"));
  assert.deepEqual(parseCartKey(makeCartKey(id, "M")), { productId: id, size: "M" });
  assert.deepEqual(parseCartKey(id), { productId: id, size: "" });
});
test("accessories do not require a garment size", () => {
  assert.equal(needsSize({ category: "ACCESSORY" }), false);
});
