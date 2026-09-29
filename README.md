# TYGER TECH V3 — Stripe Test Checkout

V3 adds a secure Stripe Checkout integration while keeping the storefront Vercel-ready.

## What's new
- Cart → Stripe Checkout flow
- Server-side price catalogue (customers cannot alter prices in the browser)
- Australian shipping-address collection
- Phone-number collection
- Promotion-code support
- Payment success and cancellation pages
- Safe error message when Stripe has not yet been connected
- Existing product finder/search and demo catalogue remain

## Connect Stripe TEST mode
1. Create/sign in to Stripe.
2. Use Stripe's test/sandbox secret key.
3. In Vercel: Project → Settings → Environment Variables.
4. Add `STRIPE_SECRET_KEY` with the TEST secret key.
5. Redeploy the project.
6. Add a demo product to the bag and press Checkout.

Do not add a live Stripe key until the business is ready to accept real orders.

## Important before launch
The current products/prices are prototype data. Replace the server-side CATALOG and front-end catalogue with the approved supplier products/prices before enabling live payments. Supplier fulfilment/webhooks are not yet connected.
