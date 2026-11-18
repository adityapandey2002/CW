# 12 — Development Guide

## Scripts (from `package.json`)

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js development server (hot reload) |
| `npm run build` | Production build; includes TypeScript type checking |
| `npm run start` | Serve the production build |
| `npm run lint` | Run ESLint (flat config) |
| `npm test` | Run Vitest unit tests once (`npm test -- --watch` for watch mode) |

There is no `test`, `format`, or `typecheck` script.

## Language and Compiler Conventions

- TypeScript `strict: true`; `noEmit: true` (Next.js handles compilation).
- Path alias `@/*` → repository root (e.g., `import { SITE } from "@/lib/constants"`).
- `target: ES2017`, `moduleResolution: "bundler"`, `jsx: "react-jsx"` (no need to import React).
- `next-env.d.ts` and `.next/types` are included automatically; never edit them.

## File and Component Conventions

| Concern | Convention | Example |
|---------|------------|---------|
| File naming | kebab-case for files | `components/contact-form.tsx` |
| Component naming | PascalCase | `export function ContactForm()` |
| Export style | Named exports (no default exports in `components/`) | `export function Card()` |
| Client components | `"use client"` first line | `components/header.tsx` |
| Server actions | `"use server"` first line, in `actions/` | `actions/contact.ts` |
| Route files | `page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx` | `app/terms/page.tsx` |
| Metadata routes | `robots.ts`, `sitemap.ts`, `manifest.ts` | `app/sitemap.ts` |

## Styling Conventions

- Tailwind v4 CSS-first: no `tailwind.config.js`; tokens live in `app/globals.css` under `@theme inline`.
- Custom utilities via `@utility` (`bg-cta-gradient`, `gradient-text`, `bg-cta-gradient-soft`, `bg-grid`).
- Merge classes with `cn()` rather than string concatenation.
- Brand palette: `navy` (text/base), `brand-orange`, `brand-magenta`, `brand-purple` (gradient stops), `surface` (alt background), `muted-foreground` (secondary text), `border`.
- Layout rhythm: `max-w-7xl` containers, `px-5 sm:px-8`, section padding `py-24 sm:py-32`, `scroll-mt-20` on anchored sections.

## Content Editing

All site copy lives in `lib/constants.ts`. Editing it changes the header, footer, hero, services, about, testimonials, FAQ, contact, metadata, sitemap, robots, manifest, and OG image simultaneously. Legal copy is separate (`app/privacy/page.tsx`, `app/terms/page.tsx`).

## Adding a Section (step by step)

1. Create `components/sections/<name>.tsx` as a Server Component.
2. Use `SectionHeading` for the heading block and `Reveal` around animated blocks.
3. Use `Card`, `Button`, `ButtonLink` from `components/ui` for consistency.
4. Import and render the section in `app/page.tsx` inside `<main>`.
5. Add an entry to `NAV_LINKS` if it needs a nav anchor, and set `id` + `scroll-mt-20` on the `<section>`.

## Adding a UI Primitive

- Place it in `components/ui/`.
- Accept `className` and merge with `cn()`.
- Keep styling tokens-based (no hardcoded hex outside `globals.css`).

## Adding a Form Field

1. Add the field to `FIELD_LIMITS` and to `ContactInput` in `lib/validation.ts`.
2. Add extraction + validation in `validateContactInput`.
3. Add the field to the payload construction and email body in `actions/contact.ts`.
4. Add the input + `Label` in `components/contact-form.tsx` with matching `name` and `id`, plus `maxLength={FIELD_LIMITS.<field>}`.
5. Update `ContactFormState` / `fieldErrors` if field-level errors are needed.

## Adding a Server Action

- New file under `actions/` with `"use server"`.
- Return a typed state object rather than throwing for validation failures.
- Call it from a client component and handle the pending/success/error states.

## Working Checklist

```bash
npm run lint
npm test
npx tsc --noEmit
npm run build
```

## Important Files (handle with care)

| File | Why |
|------|-----|
| `lib/constants.ts` | Global content; a bad edit breaks many pages |
| `lib/validation.ts` | Authoritative contact-form validation, limits, masking — change with care |
| `app/layout.tsx` | Metadata, SEO, JSON-LD (3 schemas), html/body shell |
| `app/globals.css` | Design tokens and custom utilities |
| `actions/contact.ts` | Lead capture: Resend delivery, honeypot, validation |
| `components/contact-form.tsx` | Mirrors the action's field names and `FIELD_LIMITS` |
| `next.config.ts` | Security headers (CSP, HSTS, etc.) |
| `AGENTS.md` | Auto-managed by Next.js — keep the managed block intact |

## Git Conventions

- Remote: `https://github.com/adityapandey2002/CW.git`; default branch `main`; no release tags.
- No documented branching or commit-message convention exists in the repository (no `CONTRIBUTING.md`). Observed commit subjects are informal ("doing project", "correcting SEO"). Not verified as a standard.