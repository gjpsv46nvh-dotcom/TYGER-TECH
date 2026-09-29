# TYGER TECH V4

V4 is the checked, cleaned Vercel build.

## Included
- Responsive storefront
- Product Finder / live search
- Demo catalogue and cart
- Stripe Checkout server endpoint
- Server-side authoritative pricing
- Australian shipping address collection
- Success and cancelled-checkout pages
- Stripe remains TEST-only until you add a test secret key

## Required repository structure
api/create-checkout-session.js
success/index.html
cancel/index.html
README.md
app.js
index.html
package.json
styles.css

## Stripe
Add `STRIPE_SECRET_KEY` in Vercel → Project → Settings → Environment Variables.
Use a Stripe TEST/SANDBOX secret key only while testing.

## Important
Real supplier products, costs, stock and fulfilment are not connected yet.
Do not enable live payments until the real catalogue and fulfilment workflow are ready.
