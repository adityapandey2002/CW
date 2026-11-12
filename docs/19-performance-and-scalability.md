# 19 — Performance and Scalability

## Current Performance Characteristics

| Aspect | Implementation | Impact |
|--------|----------------|--------|
| Rendering | Next.js App Router, mostly Server Components | Small HTML payload, minimal hydration |
| Code splitting | Per-route splitting by Next.js | `/privacy`, `/terms` do not ship home-page JS |
| Fonts | `next/font/google` self-hosted with `display: "swap"` | No render-blocking third-party request |
| CSS | Tailwind v4 emits only used utilities; single global stylesheet | Small CSS payload |
| Animations | Framer Motion with `viewport={{ once: true }}` | Animations run once; no scroll listeners after reveal |
| Reduced motion | `useReducedMotion` in `Reveal`/`Faq`; CSS media query for smooth scroll | Accessibility + lower CPU |
| Images | None in the app (`public/` empty); OG image generated at build | No runtime image processing |
| Caching | No explicit config; Next.js defaults | Static routes cache well |

## Verified Response Headers (production build, `npm run start`)

```
x-nextjs-cache: HIT
x-nextjs-prerender: 1,1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=31536000
ETag: "16mrwopcgef3j16"
Content-Type: text/html; charset=utf-8
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
X-Powered-By: Next.js
```

Observations:
- Pages are prerendered and served with a one-year shared-cache lifetime (`s-maxage=31536000`) — the site is fully cacheable at the CDN layer.
- No `Set-Cookie` header is sent (consistent with a sessionless site).
- `X-Powered-By: Next.js` is emitted; it can be removed with `poweredByHeader: false` in `next.config.ts` (not currently set).
- No `Strict-Transport-Security`, `Content-Security-Policy`, `X-Content-Type-Options`, or `Referrer-Policy` headers are present — see [`15-security-documentation.md`](./15-security-documentation.md).
- Home page HTML is ~165 KB uncompressed (`Content-Length: 164767`), compressed over the wire by the host.

## Potential Bottlenecks

1. **Client bundle size** — `framer-motion` and `lucide-react` are the largest client-side dependencies.
2. **Single `lib/constants.ts`** — all content is bundled into the pages that import it; acceptable at this size.
3. **No caching headers** — `next.config.ts` is empty, so no explicit `Cache-Control` tuning or ISR.
4. **No `next/image`** — any future imagery should use it for resizing/format negotiation.
5. **Contact action** — every submission runs a server action; without rate limiting this can be abused (availability concern, not throughput).

## Scalability

- **Read traffic:** fully static-friendly; can be served from a CDN/edge with negligible origin load.
- **Write traffic:** negligible — no persistence; only stdout logging.
- **Statefulness:** none, so horizontal scaling of the app server is trivial.
- **Bottlenecks at scale:** none inside the app itself; the only shared dependency would be the host/CDN.

## Optimizations Not Yet Applied

- Per-route `revalidate` / ISR if content ever becomes dynamic.
- Explicit caching and security headers in `next.config.ts`.
- `next/image` + responsive `sizes` for future imagery.
- Dynamic import for heavy animation components if bundle size becomes a concern.
- Lazy-loading below-the-fold sections.

## Measurements

No performance budgets, Lighthouse baselines, or Core Web Vitals targets are defined in the repository. Not verified.