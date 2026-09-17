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
components/
  ui/                 Primitives: Button, Card, Input, Label, Select, Textarea
  header.tsx          Sticky navbar with mobile menu
  footer.tsx          Site footer (incl. legal links)
  logo.tsx            Brand logo (dark/light variants)
  reveal.tsx          Framer Motion scroll-reveal wrapper
  section-heading.tsx Shared section heading (eyebrow + title + subtitle)
  social-icons.tsx    Inline SVG brand icons (WhatsApp, Instagram, LinkedIn)
  legal-page.tsx      Shared shell for legal pages
  sections/           Page sections: hero, services, about, testimonials, faq, contact
lib/
  constants.ts        Single source of truth for site data, services, testimonials, FAQs, stats
  utils.ts            `cn()` class-merge helper
```

## Configuration

Set the production URL before deploying (used by sitemap, robots, manifest and metadata):

```bash
# .env.local or Vercel env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

Defaults to `https://consultancywala.com` when unset.

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

The contact form is a client component that builds a **pre-filled WhatsApp message**
(`wa.me/<number>?text=...`) from the submitted fields — no backend required. All fields are
encoded with `encodeURIComponent` and every external link uses `rel="noopener noreferrer"`.

## SEO & Discovery

- `sitemap.xml` and `robots.txt` are generated at build time.
- Open Graph + Twitter cards resolve against `NEXT_PUBLIC_SITE_URL` via `metadataBase`.
- The 404 page is `noindex` (Next.js handles this automatically).
- Organization JSON-LD schema is injected in the root layout.

## Deployment

This is a fully static-friendly site. Deploy to Vercel with a single click:

```bash
npx vercel
```
