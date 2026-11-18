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
| Caching | Static routes prerendered; `s-maxage=31536000` | Fully cacheable at the CDN layer |

## Verified Response Headers (production build, `npm run start`)

```
x-nextjs-cache: HIT
x-nextjs-prerender: 1,1
x-nextjs-stale-time: 300
Cache-Control: s-maxage=31536000
ETag: "16mrwopcgef3j16"
Content-Type: text/html; charset=utf-8
Vary: rsc, next-router-state-tree, next-router-prefetch, next-router-segment-prefetch, Accept-Encoding
```

Observations:

- Pages are prerendered and served with a one-year shared-cache lifetime (`s-maxage=31536000`) — fully cacheable at the CDN layer.
- No `Set-Cookie` header is sent (consistent with a sessionless site).
- `X-Powered-By` is **not** emitted (`poweredByHeader: false` is set in `next.config.ts` — verified).
- Security headers (CSP, HSTS, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy, COOP) **are** present on every response — see [`15-security-documentation.md`](./15-security-documentation.md).
- Home page HTML is ~165 KB uncompressed (`Content-Length: 164767`), compressed over the wire by the host.

## Potential Bottlenecks

1. **Client bundle size** — `framer-motion` and `lucide-react` are the largest client-side dependencies.
2. **Single `lib/constants.ts`** — all content is bundled into the pages that import it; acceptable at this size.
3. **No explicit `Cache-Control` tuning** — Next.js defaults apply; the rendered output is already served with a one-year shared-cache lifetime.
4. **No `next/image`** — any future imagery should use it for resizing/format negotiation.
5. **Contact action** — every submission runs a server action and a Resend API call; without edge rate limiting this can be abused (availability concern, not throughput).

## Scalability

- **Read traffic:** fully static-friendly; can be served from a CDN/edge with negligible origin load.
- **Write traffic:** negligible — no persistence; enquiries are emailed via Resend and logged (PII masked) to stdout.
- **Statefulness:** none, so horizontal scaling of the app server is trivial.
- **Bottlenecks at scale:** none inside the app itself; the only shared dependencies are the host/CDN and Resend.

## Optimizations Not Yet Applied

- Per-route `revalidate` / ISR if content ever becomes dynamic.
- `next/image` + responsive `sizes` for future imagery.
- Dynamic import for heavy animation components if bundle size becomes a concern.
- Lazy-loading below-the-fold sections.
- Performance budgets / Lighthouse CI.

## Measurements

No performance budgets, Lighthouse baselines, or Core Web Vitals targets are defined in the repository. Not verified.
