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
  layout.tsx          Root layout: fonts, metadata, viewport
  page.tsx            Home page — composes all sections
  globals.css         Design tokens, gradients, utilities (Tailwind v4)
  icon.svg            Site icon
components/
  ui/                 Primitives: Button, Card, Input, Label, Select, Textarea
  header.tsx          Sticky navbar with mobile menu
  footer.tsx          Site footer
  logo.tsx            Brand logo (dark/light variants)
  reveal.tsx          Framer Motion scroll-reveal wrapper
  section-heading.tsx Shared section heading (eyebrow + title + subtitle)
  social-icons.tsx    Inline SVG brand icons (WhatsApp, Instagram, LinkedIn)
  sections/           Page sections: hero, services, about, testimonials, faq, contact
lib/
  constants.ts        Single source of truth for site data, services, testimonials, FAQs, stats
  utils.ts            `cn()` class-merge helper
```

## Editing Content

All site content lives in **`lib/constants.ts`** — site info, phone/WhatsApp/email, services
(`SERVICE_GROUPS`), testimonials, FAQs and stats. Update that one file to change the copy.

## Design System

- Brand colors: navy, orange, magenta, purple (defined via `@theme` in `app/globals.css`)
- Signature gradient: `bg-cta-gradient` / `gradient-text`
- Grid background utility: `bg-grid`
- Animation: `<Reveal>` wrapper (respects `prefers-reduced-motion`)

## Contact / Lead Flow

The contact form is a client component that builds a **pre-filled WhatsApp message**
(`wa.me/<number>?text=...`) from the submitted fields — no backend required. All fields are
encoded with `encodeURIComponent` and every external link uses `rel="noopener noreferrer"`.

## Deployment

This is a fully static-friendly site. Deploy to Vercel with a single click:

```bash
npx vercel
```