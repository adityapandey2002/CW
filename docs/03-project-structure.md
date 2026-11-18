# 03 — Project Structure

## Root Directory Tree (excluding generated/dependency folders)

```
CONSULATNCY_WALA/
├── .gitignore
├── AGENTS.md                  # Next.js agent rules (auto-generated block)
├── CLAUDE.md                  # @AGENTS.md
├── README.md                  # Project README
├── eslint.config.mjs
├── next.config.ts
├── next-env.d.ts              # generated (gitignored)
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── tsconfig.json
├── actions/
│   └── contact.ts             # Server Action: contact form submission
├── app/
│   ├── layout.tsx             # Root layout, metadata, viewport, JSON-LD
│   ├── page.tsx               # Home page composition
│   ├── globals.css            # Design tokens, Tailwind v4 theme, utilities
│   ├── icon.svg
│   ├── favicon.ico
│   ├── robots.ts              # Generated robots.txt
│   ├── sitemap.ts             # Generated sitemap.xml
│   ├── manifest.ts            # Generated PWA manifest
│   ├── opengraph-image.tsx    # Generated 1200x630 OG image
│   ├── error.tsx              # Client error boundary
│   ├── not-found.tsx          # 404 page
│   ├── privacy/
│   │   └── page.tsx           # Privacy Policy
│   └── terms/
│       └── page.tsx           # Terms of Service
├── components/
│   ├── header.tsx             # Sticky navbar + mobile menu
│   ├── footer.tsx             # Footer with nav, services, contact, legal links
│   ├── logo.tsx               # Brand logo (dark/light variants)
│   ├── reveal.tsx             # Framer Motion scroll-reveal wrapper
│   ├── section-heading.tsx    # Shared eyebrow/title/subtitle block
│   ├── social-icons.tsx       # Inline SVG brand icons
│   ├── legal-page.tsx         # Shared shell for legal pages
│   ├── contact-form.tsx       # Client contact form (calls Server Action)
│   ├── whatsapp-bubble.tsx    # Floating WhatsApp CTA
│   ├── ui/
│   │   ├── button.tsx         # Button / ButtonLink + variants
│   │   ├── card.tsx           # Surface container
│   │   ├── input.tsx          # Text input
│   │   ├── label.tsx          # Form label
│   │   ├── select.tsx         # Native select with icon
│   │   └── textarea.tsx       # Multi-line input
│   └── sections/
│       ├── hero.tsx
│       ├── services.tsx
│       ├── about.tsx
│       ├── testimonials.tsx
│       ├── faq.tsx
│       └── contact.tsx
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions: quality gates + opt-in Vercel deploy
├── lib/
│   ├── constants.ts           # Single source of truth for site content
│   ├── validation.ts          # Contact form validation, sanitising, phone normalisation, PII masking
│   └── utils.ts               # cn() class-merge helper
├── public/                    # Static assets (currently empty)
├── scripts/
│   └── validate-docs.mjs      # Zero-dependency doc validation (links, fences, mermaid)
├── tests/
│   └── validation.test.ts     # Vitest unit tests for lib/validation.ts
└── docs/                      # Documentation (this documentation set)
```

## File Inventory

| Path | Purpose |
|------|---------|
| `.github/workflows/ci.yml` | GitHub Actions CI: lint, typecheck, unit tests, docs validation, build, advisory audit; opt-in Vercel deploy |
| `tests/validation.test.ts` | Vitest unit tests for validation, limits, phone normalisation and PII masking |
| `PROJECT_CONTEXT.md` | 798-line single-source-of-truth document (overlaps with `docs/`) |
| `DEPLOYMENT_GUIDE.md` | Step-by-step Vercel + Resend + Hostinger domain setup |
| `app/layout.tsx` | Root HTML shell: font, viewport, metadata, icons, JSON-LD (3 schemas) |
| `app/page.tsx` | Composes home page sections |
| `app/globals.css` | Tailwind v4 import, theme tokens, custom utilities, legal prose styles |
| `app/robots.ts` | `robots.txt` metadata route |
| `app/sitemap.ts` | `sitemap.xml` metadata route |
| `app/manifest.ts` | Web app manifest metadata route |
| `app/opengraph-image.tsx` | Dynamic OG image (1200×630 PNG) |
| `app/error.tsx` | Route error boundary with retry |
| `app/not-found.tsx` | Branded 404 |
| `app/privacy/page.tsx` | Privacy Policy (DPDP Act 2023) |
| `app/terms/page.tsx` | Terms of Service |
| `app/icon.svg`, `app/favicon.ico` | Icons referenced by metadata and manifest |
| `actions/contact.ts` | `submitContact` Server Action + validation |
| `lib/constants.ts` | SITE, NAV_LINKS, SERVICE_GROUPS, TESTIMONIALS, FAQS, STATS, CONTACT_SERVICE_OPTIONS, whatsappLink() |
| `lib/validation.ts` | FIELD_LIMITS, sanitize, isValidPhone, normalizePhone, validateContactInput, maskEmail, maskPhone |
| `lib/utils.ts` | `cn()` helper |
| `components/header.tsx` | Fixed navbar, desktop nav, mobile menu, phone + CTA |
| `components/footer.tsx` | Footer columns, socials, legal links, copyright |
| `components/logo.tsx` | Brand mark with variant prop |
| `components/reveal.tsx` | Scroll reveal animation wrapper |
| `components/section-heading.tsx` | Section heading block |
| `components/social-icons.tsx` | WhatsApp/Instagram/LinkedIn SVGs |
| `components/legal-page.tsx` | Legal page layout shell |
| `components/contact-form.tsx` | Client form UI + Server Action call |
| `components/whatsapp-bubble.tsx` | Floating chat button |
| `components/ui/*` | Reusable primitives |
| `components/sections/*` | Home page sections |

## Directory Responsibilities

| Directory | Responsibility | Conventions |
|-----------|----------------|--------------|
| `app/` | Routing, layouts, metadata, global styles | One folder per route; `page.tsx` default export |
| `actions/` | Server-side mutations | `"use server"`, typed request/response state |
| `components/` | Presentation layer | PascalCase component names, kebab-case files |
| `components/ui/` | Design-system primitives | Accept `className`, merge with `cn()` |
| `components/sections/` | Page-level sections | Server by default, `"use client"` only when stateful |
| `lib/` | Shared data and helpers | No framework imports beyond `lucide-react` |
| `public/` | Static files served at `/` | Currently empty |
| `scripts/` | Repository maintenance tooling | `validate-docs.mjs` (no dependencies) |
| `docs/` | Documentation | Numbered topic docs + `diagrams/` |

## Entry Points

| Entry | File |
|-------|------|
| Application shell | `app/layout.tsx` |
| Home route | `app/page.tsx` |
| Legal routes | `app/privacy/page.tsx`, `app/terms/page.tsx` |
| Metadata routes | `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/opengraph-image.tsx` |
| Server action | `actions/contact.ts` |
| Build | Next.js default (`next build`) — no custom server |

## Excluded from This Tree

`node_modules/`, `.next/`, `.git/`, and any `*.tsbuildinfo` are generated and excluded. `public/` is included even though it is currently empty.