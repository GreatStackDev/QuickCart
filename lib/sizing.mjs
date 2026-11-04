// Shared server/client garment sizing and cart-key rules.
const ALPHA = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];
const SUIT = Array.from({ length: 10 }, (_, i) => String(44 + i * 2));
const SHIRT_NECK = ["14", "14.5", "15", "15.5", "16", "16.5", "17", "17.5", "18", "18.5", "19", "19.5", "20", "21", "22", "23", "24", "25", "26"];

export const SIZE_OPTIONS = {
  SUIT, TUXEDO: SUIT,
  SHIRT: [...ALPHA, ...SHIRT_NECK],
  "T-SHIRT": ALPHA, JACKET: ALPHA, KNITWEAR: ALPHA,
  SWEATSHIRT: ALPHA, OUTERWEAR: ALPHA,
  TROUSERS: Array.from({ length: 10 }, (_, i) => String(28 + i * 2)),
  SHOE: Array.from({ length: 10 }, (_, i) => String(39 + i)),
};

export const getCategorySizeOptions = (category) =>
  SIZE_OPTIONS[String(category || "").trim().toUpperCase()] || [];

export const getAvailableSizes = (product) => {
  const allowed = getCategorySizeOptions(product?.category);
  if (!allowed.length) return [];
  const configured = product?.availableSizes;
  return Array.isArray(configured) && configured.length
    ? [...new Set(configured.map(String))].filter((size) => allowed.includes(size))
    : allowed;
};

// Existing catalog records without availableSizes use the category's standard
// size options. Sellers should configure actual availability before launch.
export const needsSize = (product) => getAvailableSizes(product).length > 0;

export const makeCartKey = (productId, size = "") =>
  size ? `${productId}::${size}` : String(productId);

export const parseCartKey = (key) => {
  const separator = String(key).indexOf("::");
  return separator < 0
    ? { productId: String(key), size: "" }
    : { productId: String(key).slice(0, separator), size: String(key).slice(separator + 2) };
};
