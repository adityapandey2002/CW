# 10 — Configuration and Environment

## Environment Variables

| Variable | Required | Scope | Purpose | Default | Example |
|----------|----------|-------|---------|---------|---------|
| `NEXT_PUBLIC_SITE_URL` | No | Build-time (public) | Base URL used for `metadataBase`, canonical, Open Graph URL, sitemap, robots host, manifest | `https://consultancywala.com` | `https://your-domain.com` |

**Evidence:** `lib/constants.ts`:

```ts
url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://consultancywala.com",
```

No other environment variables are referenced in the codebase. The email provider TODO in `actions/contact.ts` would need new variables (e.g., `RESEND_API_KEY`) once implemented; none are defined today.

## Configuration Files

| File | Purpose | Notable Values |
|------|---------|----------------|
| `package.json` | Scripts/dependencies | `dev`, `build`, `start`, `lint`; Next 16.3.5 |
| `tsconfig.json` | TypeScript | `strict: true`, `@/*` → `./*`, `jsx: react-jsx` |
| `next.config.ts` | Next.js config | Empty/default |
| `postcss.config.mjs` | PostCSS | `@tailwindcss/postcss` |
| `eslint.config.mjs` | ESLint flat config | `next/core-web-vitals` + `next/typescript` |
| `.gitignore` | Ignore rules | `node_modules`, `.next`, `.env*`, `*.tsbuildinfo`, `next-env.d.ts` |

## Environment File Example

```bash
# .env.local (never commit)
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Because the variable is prefixed with `NEXT_PUBLIC_`, it is embedded into client-visible output. Do not put secrets in it.

## Build-Time vs Runtime

- Next.js reads `NEXT_PUBLIC_*` at build time. Changing it requires a rebuild/redeploy.
- `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/layout.tsx`, and `app/opengraph-image.tsx` all derive URLs from `SITE.url`.
- If `NEXT_PUBLIC_SITE_URL` is wrong, SEO artifacts will point to the wrong domain.

## Verification

```bash
# Check the variable is visible to the build
node -e "console.log(process.env.NEXT_PUBLIC_SITE_URL)"
```

(Note: `NEXT_PUBLIC_*` variables from `.env.local` are loaded by Next.js, not automatically by a bare Node process.)

## Missing Configuration

- No `.env.example` in the repository.
- No `engines` field in `package.json` (Node version not pinned).
- No `vercel.json`, Dockerfile, or CI config.
- No email provider configuration.