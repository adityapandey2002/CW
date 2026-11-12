# 18 — Maintenance and Troubleshooting

## Routine Maintenance

### Update site copy

1. Edit `lib/constants.ts` — `SITE`, `NAV_LINKS`, `SERVICE_GROUPS`, `TESTIMONIALS`, `FAQS`, `STATS`.
2. Confirm nothing else hardcodes the same text (e.g., the contact form's `SERVICE_OPTIONS` list is independent of `SERVICE_GROUPS`).
3. Run `npm run lint` and `npm run build`.

### Update legal pages

- `app/privacy/page.tsx` and `app/terms/page.tsx`; also update the `updated` prop passed to `LegalPage`.

### Change brand tokens

- `app/globals.css` → `@theme inline` block (colors, font) and `@utility` blocks (gradients, grid).

### Change the domain

- Set `NEXT_PUBLIC_SITE_URL` and rebuild. Verify `/sitemap.xml`, `/robots.txt`, canonical tags, OG image URLs.

### Add a new service

1. Append to the relevant group in `SERVICE_GROUPS` with a `lucide-react` icon.
2. Optionally add a matching option in `components/contact-form.tsx` → `SERVICE_OPTIONS`.

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Sitemap/robots/OG point to the wrong domain | `NEXT_PUBLIC_SITE_URL` unset or wrong | Set env var and rebuild |
| Metadata/Open Graph image missing | `metadataBase` invalid URL | Ensure `SITE.url` is a valid absolute URL |
| Build fails on type errors | TS strict mode | Fix the reported errors (do not silence with `@ts-ignore`) |
| `npm run lint` fails to start (`Cannot find module '.../zod/v4/index.cjs'`) | Incomplete/corrupted dependency install | Run `npm ci` to reinstall exactly from `package-lock.json` |
| `tsc` reports missing declarations for `lucide-react` / `framer-motion` | Incomplete dependency install | Run `npm ci`; do not silence with `@ts-ignore` |
| `next build` fails with "not exported from 'motion-dom'" | Partially extracted `node_modules` (interrupted install) | Run `npm ci` |
| `next build` fails: "Turbopack is not supported on this platform" | Native SWC binary missing/invalid for the OS | Reinstall dependencies for the platform, or use Next's suggested fallback `next build --webpack` |
| Styles missing | Tailwind v4 CSS-first config broken | Verify `@import "tailwindcss"` and `@theme` in `app/globals.css` |
| Contact form always shows an error | Validation failure | Required: name, email, phone, message; email must match the regex |
| Form stays in "Sending..." | Server Action threw and there is no `try/catch` in the client | Check server logs; add error handling in `components/contact-form.tsx` |
| Enquiries not received by email | Email provider not implemented | Implement the TODO in `actions/contact.ts` |
| Mobile menu not opening | Client component state/hydration issue | Confirm `"use client"` is present in `components/header.tsx` |
| Animations ignore reduced motion | `useReducedMotion` usage | `Reveal` and `Faq` handle it; check custom animations |
| Anchor links land under the fixed header | Header height/scroll offset | `scroll-padding-top: 90px` in `globals.css`; `scroll-mt-20` per section |
| `/privacy` and `/terms` canonical points to `/` | Root layout sets `alternates.canonical: "/"` (verified for both legal pages) | Add per-page `alternates.canonical` metadata |
| Phone link does not open the dialer | `SITE.phoneHref` lacks the `tel:` scheme | Prefix with `tel:` in `lib/constants.ts` |

## Backup and Recovery

- No database to back up.
- Source of truth is Git; use tags/branches for releases (no existing tagging convention — not verified).
- `.env.local` is gitignored — back it up separately if used.

## Dependency Maintenance

```bash
npm outdated        # check for updates
npm audit           # review vulnerabilities
npm ci              # clean, reproducible install
```

Do not run `npm audit fix --force` without verifying the build and lint still pass — major bumps may break Next.js 16 compatibility.

## Cleanup

- Remove `.next/` and `*.tsbuildinfo` to reclaim space; both are gitignored.
- `public/` currently holds no assets.

## Log Hygiene

Contact enquiries (name, email, phone, message) are written to stdout. Apply retention limits at the host/logging layer and avoid exposing logs publicly.