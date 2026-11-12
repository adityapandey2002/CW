# AI Agent Context — Consultancy Wala

> Concise orientation for AI coding agents. Read this before changing code.
> Full detail: [`docs/README.md`](./README.md) (documentation index).

## Project Purpose

Marketing and lead-generation website for **Consultancy Wala**, an e-commerce growth agency (Amazon / Flipkart / Meesho onboarding, cataloging, PPC, account management, logistics, brand protection, web development, analytics). Single-page marketing site plus `/privacy` and `/terms` legal pages.

## Architecture at a Glance

- Next.js 16 App Router, React 19, server-rendered by default.
- All site copy in `lib/constants.ts` (single source of truth).
- One Server Action: `submitContact` in `actions/contact.ts` — validates, logs to stdout, email delivery is a TODO.
- No database, no auth, no API, no tests, no CI.

## Tech Stack

Next.js 16.3.5 · React 19.2.8 · TypeScript 5 (strict) · Tailwind CSS 4 (CSS-first, no `tailwind.config.js`) · Framer Motion 13 · lucide-react 1.46 · clsx + tailwind-merge · npm · ESLint 9 flat config.

## Entry Points

| File | Role |
|------|------|
| `app/layout.tsx` | Root layout: font, viewport, metadata, Organization JSON-LD |
| `app/page.tsx` | Home composition (Header → sections → Footer → WhatsAppBubble) |
| `actions/contact.ts` | `submitContact` Server Action (only server-side logic) |
| `app/globals.css` | Tailwind theme tokens + custom utilities |
| `lib/constants.ts` | SITE, NAV_LINKS, SERVICE_GROUPS, TESTIMONIALS, FAQS, STATS |

## Critical Directories

```
app/           routes, layout, metadata routes, global CSS
actions/       "use server" modules
components/    sections/, ui/ primitives, layout components
lib/           constants.ts, utils.ts
public/        empty
scripts/       validate-docs.mjs (docs linting, zero deps)
docs/          this documentation set
```

## Module Relationships

`lib/constants.ts` → consumed by `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`, `app/manifest.ts`, `app/opengraph-image.tsx`, `components/header.tsx`, `components/footer.tsx`, and every section. A change there ripples through the whole site.

`lib/utils.ts` (`cn()`) → used by all `components/ui/*` primitives plus several sections.

`components/contact-form.tsx` ⇄ `actions/contact.ts` — field names must stay in sync (`name`, `email`, `phone`, `businessName`, `service`, `message`).

## Database

None. No ORM, driver, migration, or schema.

## API Conventions

No REST/GraphQL. Single Server Action:

```ts
submitContact(prevState: ContactFormState, formData: FormData): Promise<ContactFormState>
```

Returns `{ status: "idle" | "success" | "error", message?: string }`. Validation errors are returned, never thrown.

## Coding Standards

- TypeScript `strict`; path alias `@/*` → repo root.
- `"use client"` on interactive components; Server Components by default.
- Tailwind tokens only — no hardcoded hex outside `app/globals.css`.
- Merge classes with `cn()`.
- Kebab-case files, PascalCase components, named exports in `components/`.
- Route files use Next.js conventions (`page.tsx`, `layout.tsx`, `error.tsx`, `not-found.tsx`, `robots.ts`, `sitemap.ts`, `manifest.ts`).
- Server actions live in `actions/` with `"use server"`.

## Naming Conventions

- `components/sections/hero.tsx` exports `Hero`.
- `components/ui/button.tsx` exports `Button`, `ButtonLink`, `buttonVariants`.
- Design tokens: `navy`, `brand-orange`, `brand-magenta`, `brand-purple`, `surface`, `muted-foreground`, `border`.

## Error-Handling Patterns

- Server Action → error state object.
- `app/error.tsx` → client boundary with `retry()`; `console.error(error)`.
- `app/not-found.tsx` → branded 404.
- No `global-error.tsx`, no error reporting service.

## Authentication / Authorization Rules

None implemented. The contact action is publicly callable.

## Testing Procedure

No test suite. Quality gates:

```bash
npm run lint
npm run build          # includes TypeScript check
node scripts/validate-docs.mjs   # docs links/fences/mermaid
```

Manual checklist lives in [`13-testing-and-quality.md`](./13-testing-and-quality.md).

## Build and Execution Commands

```bash
npm install      # or: npm ci (reproducible, from package-lock.json)
npm run dev       # dev server
npm run build     # production build
npm run start     # serve production build
npm run lint      # ESLint
```

## Important Business Rules

- Contact requires name, email, phone, message; business name and service optional.
- Email regex: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
- Success copy: "Thanks! Our team will reach out within 24 hours."
- Production URL defaults to `https://consultancywala.com`; override with `NEXT_PUBLIC_SITE_URL`.
- Legal pages state "Last updated: September 2026".
- Agency replies within 24 hours on weekdays, 10am–7pm IST (marketing copy).

## Known Limitations

- No email delivery (TODO in `actions/contact.ts`); leads only reach stdout.
- No persistence of enquiries.
- No rate limiting or spam protection.
- `public/` is empty.
- `SITE.phoneHref` lacks a `tel:` prefix, so phone links are relative URLs.
- Contact form service options are hardcoded and can drift from `SERVICE_GROUPS`.
- Root layout canonical `"/"` is inherited by `/privacy` and `/terms` (verified).
- `ContactForm` has no `try/catch` around the Server Action call.
- No tests, no CI/CD, no `LICENSE` file.

## Verified Working Behaviour

Checked against `npm run build` + `npm run start`:
- All routes prerender as static content and return 200; unknown paths return 404.
- `npm run lint`, `npx tsc --noEmit`, and `npm run build` all pass after `npm ci`.
- Contact form: invalid email → inline "Please enter a valid email address."; valid payload → "Message sent!" + stdout log.
- FAQ accordion: first item open by default, only one item expanded at a time (`aria-expanded`).
- `robots.txt`, `sitemap.xml`, `manifest.webmanifest`, `opengraph-image` return the expected content.
- No `Set-Cookie` header; no CSP/HSTS/`X-Content-Type-Options` headers; `X-Powered-By: Next.js` is exposed.
- Use `npm ci` (not an interrupted `npm install`) — a partial `node_modules` produces misleading module-resolution errors.

## Common Development Pitfalls

- Do not assume `public/` contains assets — it is empty.
- Editing `lib/constants.ts` changes metadata, sitemap, robots, manifest, and OG image as well.
- Tailwind v4 has no `tailwind.config.js`; add tokens in `app/globals.css` `@theme`.
- `next.config.ts` is intentionally empty — add config only with a reason.
- `AGENTS.md` contains a Next.js-managed block; keep it intact.
- `app/error.tsx` uses the Next 16 `retry` prop (not `reset`).
- `lucide-react` icons are stored as components inside `SERVICE_GROUPS` data — keep the `LucideIcon` type.
- `components/contact-form.tsx` has no `try/catch` around the action call; a rejected promise leaves the form in the pending state.

## Files Requiring Extra Care

| File | Why |
|------|-----|
| `lib/constants.ts` | Global content; a bad edit breaks many pages |
| `app/layout.tsx` | Metadata, canonical, OG, JSON-LD, html shell |
| `app/globals.css` | Design tokens and custom utilities |
| `actions/contact.ts` | Lead-capture validation with no test coverage |
| `components/contact-form.tsx` | Must stay in sync with the action's field names |
| `AGENTS.md` | Auto-managed by `next dev` |

## Safe Modification Guidelines

1. Make focused changes; keep diffs small and reviewable.
2. Prefer editing `lib/constants.ts` for copy over hardcoding strings in components.
3. Run `npm run lint` and `npm run build` before finishing; also `node scripts/validate-docs.mjs` if docs changed.
4. Do not change `submitContact` validation rules without updating the docs and adding tests.
5. Never commit secrets; `.env*` is gitignored. `NEXT_PUBLIC_*` values are public.
6. Do not modify application behavior as a side effect of documentation work.
7. Preserve existing visual language: navy base, orange→magenta→purple gradient, `Reveal` animations, `SectionHeading` structure.