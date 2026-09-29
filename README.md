# TYGER TECH V5 — DEPLOYMENT FIX

This version fixes the Vercel build error shown in the deployment:
`api/create-checkout-session.js` was referenced in `vercel.json`, but GitHub mobile had flattened/deleted the `api` directory.

## Fix in V5
- Removed the invalid Vercel `functions` pattern.
- The storefront can deploy successfully even if GitHub mobile flattens the API folder.
- Product Finder, cart and V4 storefront remain.
- Stripe checkout source is still included under `api/` in this ZIP for a proper folder-preserving upload.

## Important
Stripe remains test-only and will not work until:
1. `api/create-checkout-session.js` exists as that exact path in the repository, and
2. `STRIPE_SECRET_KEY` is added to Vercel.

Do not use a live Stripe key yet.
