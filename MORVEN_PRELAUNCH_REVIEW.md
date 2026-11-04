# Morven QuickCart prelaunch review — 4 November 2026

This is a REVIEW BRANCH, not a verified production release.

## Major fixes in this branch
- Paystack checkout prices are calculated on the server from current MongoDB product prices, in integer pesewas, with a validated authenticated customer and owned delivery address.
- Payment verification checks Paystack's transaction response, amount, GHS currency, reference and, for new payments, customer email.
- The callback requires the owner to be signed in. The signed Paystack webhook is available at `/api/paystack/webhook`; configure it in the Paystack dashboard.
- Orders use a unique `paymentReference` to avoid duplicate records on webhook/callback retries. The unauthenticated direct-create route no longer creates unpaid orders.
- Clothing sizes can be configured by sellers, selected on product pages, carried through cart and checkout, and stored in both payment and order records.
- Tax display and charge use consistent pesewa-based arithmetic (existing **2%** rule retained until the business confirms the appropriate Ghana tax treatment).
- Seller and customer order screens show sizes and recorded payment status; inactive promo-code field is disabled.
- Tracked environment files have been removed from the new branch and replaced with `.env.example`.

## Critical credential action
The original public `main` branch and its Git history exposed a populated `.env` file. The new `.gitignore` only prevents FUTURE accidental commits. **Immediately rotate** Paystack secret, Clerk secret, MongoDB credentials, Cloudinary API secret, Inngest signing/event keys and any other exposed values. Reconfigure new values in Vercel and locally. To remove leaked historical content, consider GitHub's sensitive-data-removal guidance, then revoke all old credentials. Do not post key values in issues or pull requests.

## Existing catalog migration
Existing clothing products may have no `availableSizes` values. Until configured, they temporarily display the standard category options. From the seller product list, click **Sizes** on each garment and set only what is in stock. Older cart entries that had no size must be removed and added again from the product page with a selected size.

## Setup to validate
1. Copy `.env.example` to `.env.local`, using **rotated** test credentials. Confirm `NEXT_PUBLIC_APP_URL` matches the exact app origin (e.g. staging URL).
2. Set Paystack **test** secret key and webhook URL `https://YOUR-DOMAIN/api/paystack/webhook` in Paystack. Never put secret keys in `NEXT_PUBLIC_*`.
3. Run `npm ci`, `npm test`, `npm run lint`, and `npm run build`. Fix any reported failures before merging. No build or live transaction has been run by this review.
4. Test signed-in and signed-out checkouts, selection of all garment sizes, two sizes of one shirt, changed cart, invalid sizes, someone else's address, cancelled payments, successful Paystack test payment, duplicate webhook delivery, direct order-create 403, order confirmation, and seller dashboard.
5. Verify actual Ghana VAT/levies, shipping policy, refund/returns, product stock, and consumer-facing contact details before enabling live payments.

## Remaining limitations
- Stock is modeled as sizes available/unavailable, not quantity-by-size inventory or reservations. Do not claim automated stock control.
- A payment order is recorded after successful Paystack verification. Inngest continues to serve existing user sync; the paid order is no longer dependent on an asynchronous Inngest queue.
- Cart cleanup runs only on first order creation and is best-effort. If cleanup fails, a customer might need to remove previously purchased items manually.
- Existing orders may not contain size/payment method metadata.
- The project still requires a successful production build, real Paystack test-flow verification, and review of the rest of the application before launch.
