# Consultancy Wala

**Smart Solutions. Stronger Businesses.**

Marketing website for Consultancy Wala — an e-commerce growth agency helping brands launch, scale and dominate Amazon, Flipkart, Meesho and beyond.

Built with **Next.js 16 (App Router)**, **React 19**, **Tailwind CSS v4** and **Framer Motion**.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command            | Description                        |
| ------------------ | ---------------------------------- |
| `npm run dev`      | Start the development server       |
| `npm run build`    | Production build (TypeScript check included) |
| `npm run start`    | Start the production server        |
| `npm run lint`     | Run ESLint                         |

## Project Structure

```
app/
  layout.tsx          Root layout: fonts, metadata, viewport, JSON-LD schema
  page.tsx            Home page — composes all sections
  globals.css         Design tokens, gradients, utilities (Tailwind v4)
  icon.svg            Site icon
  favicon.ico         Classic favicon
  robots.ts           Generated robots.txt
  sitemap.ts          Generated sitemap.xml
  manifest.ts         Generated PWA manifest
  opengraph-image.tsx Generated 1200×630 social preview image
  error.tsx           Client error boundary (Next 16 `retry` API)
  not-found.tsx       Branded 404 page
  privacy/page.tsx    Privacy Policy (DPDP Act 2023 aligned)
  terms/page.tsx      Terms of Service
actions/
  contact.ts          `submitContact` server action - validation + Resend delivery
components/
  ui/                 Primitives: Button, Card, Input, Label, Select, Textarea
  header.tsx          Sticky navbar with accessible mobile menu
  footer.tsx          Site footer (incl. legal links)
  logo.tsx            Brand logo (dark/light variants)
  reveal.tsx          Framer Motion scroll-reveal wrapper
  section-heading.tsx Shared section heading (eyebrow + title + subtitle)
  social-icons.tsx    Inline SVG brand icons (WhatsApp, Instagram, LinkedIn)
  legal-page.tsx      Shared shell for legal pages
  contact-form.tsx    Contact form (React 19 `useActionState`, progressive enhancement)
  whatsapp-bubble.tsx Floating WhatsApp button
  sections/           Page sections: hero, services, about, testimonials, faq, contact
lib/
  constants.ts        Single source of truth for site data, services, testimonials, FAQs, stats
  validation.ts       Contact form field limits, sanitising and validation (pure, testable)
  utils.ts            `cn()` class-merge helper
```

## Configuration

Set the production URL before deploying (used by sitemap, robots, manifest and metadata):

```bash
# .env.local or Vercel env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Defaults to `https://consultancywala.com` when unset.

## Email Setup (Contact Form)

The contact form uses [Resend](https://resend.com) to send email notifications.

1. Sign up at [resend.com](https://resend.com) (free tier: 100 emails/day)
2. Create an API key at [resend.com/api-keys](https://resend.com/api-keys)
3. Add to your environment:

```bash
# .env.local or Vercel env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxx
```

4. Verify your sending domain in Resend, then set `RESEND_FROM_EMAIL` to an address on
   that domain. The default `onboarding@resend.dev` sender only works for local testing:

## Editing Content

All site content lives in **`lib/constants.ts`** — site info, phone/WhatsApp/email, services
(`SERVICE_GROUPS`), testimonials, FAQs and stats. Update that one file to change the copy.

## Design System

- Brand colors: navy, orange, magenta, purple (defined via `@theme` in `app/globals.css`)
- Signature gradient: `bg-cta-gradient` / `gradient-text`
- Grid background utility: `bg-grid`
- Animation: `<Reveal>` wrapper (respects `prefers-reduced-motion`)
- Legal prose: `.legal-prose` scoped styles for privacy/terms content

## Contact / Lead Flow

The contact form uses React 19 `useActionState` with the form's `action` prop, so it submits to the `submitContact`
server action **and still works before hydration or with JavaScript disabled** (progressive enhancement).

1. Client-side HTML validation marks required fields.
2. The server action re-validates every field, strips control characters and applies length caps.
3. The enquiry is emailed to the agency inbox via Resend.
4. On success the form shows a confirmation plus a **pre-filled WhatsApp message** built from the
   submitted fields (`wa.me/<number>?text=...`).

All query values are encoded with `encodeURIComponent` via the `whatsappLink()` helper in
`lib/constants.ts`, and every external link uses `rel="noopener noreferrer"`.

## Security

**Headers** (`next.config.ts` sends these on every route):

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | `default-src 'self'`; no third-party script origins, `frame-ancestors 'none'`, `object-src 'none'`, `base-uri 'self'`, `form-action 'self'` |
| `Strict-Transport-Security` | `max-age=63072000; includeSubDomains; preload` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | camera, microphone, geolocation all disabled |
| `Cross-Origin-Opener-Policy` | `same-origin` |

`X-Powered-By` is disabled via `poweredByHeader: false`.

> **CSP trade-off:** the strict nonce-based policy from the Next.js docs requires
> dynamic rendering, because a nonce must be minted per request. This site is
> statically prerendered and depends on organic search, so we keep static
> rendering and accept `'unsafe-inline'` for scripts and styles instead.
> That still blocks third-party script origins, framing, plugins, base-tag
> hijacking and form hijacking. Move to a nonce via `proxy.ts` only if you
> are willing to give up static rendering.

**Contact form hardening** (`lib/validation.ts` + `actions/contact.ts`):

- Server-side length caps on every field, mirrored as `maxLength` on the inputs
- Email format and 10-15 digit phone validation; phone normalised to international form
- Control characters stripped from all input, so user text cannot inject email headers
  or forge log lines
- Honeypot field (`company_website`); a filled trap returns a fake success and
  sends nothing
- Resend's returned `error` is checked explicitly, because the SDK resolves
  instead of throwing on API failures
- Logs store metadata only - the email and phone are masked, so serverless logs do
  not become a second copy of user PII

**Known gap:** there is **no per-IP rate limiting**. The honeypot and length caps stop
naive bots, but a determined attacker can still submit repeatedly and consume Resend
quota (100 emails/day on the free tier). Because serverless functions are stateless,
in-memory rate limiting does not work on Vercel. To close this properly, add either
Vercel Firewall rate-limit rules or a CAPTCHA (Cloudflare Turnstile / hCaptcha), both
of which are enforced at the edge before your function runs.

---
## SEO & Discovery

- `sitemap.xml` and `robots.txt` are generated at build time.
- Open Graph + Twitter cards resolve against `NEXT_PUBLIC_SITE_URL` via `metadataBase`.
- The 404 page is `noindex` (Next.js handles this automatically).
- Organization JSON-LD schema is injected in the root layout.

## Deployment

### Quick Deploy (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Add New Project**
3. Import your GitHub repo
4. Set environment variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://your-domain.com`
   - `RESEND_API_KEY` = your Resend API key
   - `RESEND_FROM_EMAIL` = verified sender, e.g. `Consultancy Wala <hello@yourdomain.com>`
5. Click **Deploy**

### Custom Domain (Hostinger DNS)

1. In Vercel: **Project Settings → Domains** → add `your-domain.com`
2. In Hostinger: **Domains → DNS Zone Editor**
3. Add DNS records:
   - **A record** → `@` → `76.76.21.21` (Vercel IP)
   - **CNAME record** → `www` → `cname.vercel-dns.com`
4. Wait for DNS propagation (up to 24 hours, usually minutes)
5. SSL is automatic on Vercel

### Manual Deploy

```bash
npx vercel
```
