# Deploy

This is a TanStack Start SSR application. Deploy the `openskills` directory as
the project root; do not publish the `public` directory as a static site.

## Vercel

1. Import the Git repository and set **Root Directory** to `openskills`.
2. Keep the detected build command (`npm run build`).
3. Deploy. `vercel.json` explicitly identifies the TanStack Start framework.

## Environment variables

Add production secrets in the provider dashboard. Values prefixed with
`VITE_` are exposed to browser code; never use that prefix for secrets.
