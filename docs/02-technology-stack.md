# 02 — Technology Stack

All entries are derived from `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `app/globals.css` and source imports. Nothing here is speculative.

## Dependency Summary

| Dependency | Version (declared) | Type |
|-----------|--------------------|------|
| next | 16.3.5 | runtime |
| react | 19.2.8 | runtime |
| react-dom | 19.2.8 | runtime |
| resend | ^4.0.0 | runtime |
| clsx | ^2.1.1 | runtime |
| tailwind-merge | ^3.7.0 | runtime |
| framer-motion | ^13.3.0 | runtime |
| lucide-react | ^1.46.0 | runtime |
| typescript | ^5 | dev |
| eslint | ^9 | dev |
| eslint-config-next | 16.3.5 | dev |
| tailwindcss | ^4 | dev |
| @tailwindcss/postcss | ^4 | dev |
| @types/node | ^20 | dev |
| @types/react | ^19 | dev |
| @types/react-dom | ^19 | dev |

## Languages

| Technology | Where Used | Why It Matters Here |
|-----------|------------|---------------------|
| TypeScript 5 (`strict`) | All `.ts`/`.tsx` | Type safety for content shapes (`ServiceGroup`, `ContactPayload`, `ContactFormState`) and component props; `npm run build` fails on type errors |
| CSS / Tailwind v4 | `app/globals.css` | Design tokens and utilities; no separate stylesheet per component |
| JavaScript (ESM) | `eslint.config.mjs`, `postcss.config.mjs` | Tooling configuration |

## Frameworks and Runtime

### Next.js 16.3.5 (App Router)

- **What:** Full-stack React framework providing routing, rendering, Server Components, Server Actions, metadata routes, image generation (`next/og`), and font optimization.
- **Where:** `app/` (routes, layout, metadata routes), `actions/` (Server Action), `next.config.ts`.
- **Why relevant:** It is the entire application runtime; there is no separate backend server.
- **Relationships:** Builds on React 19; provides `next/font` (Google Fonts), `next/og` (`ImageResponse`), and the metadata route conventions used by `robots.ts`/`sitemap.ts`/`manifest.ts`.

### React 19.2.8 / React DOM 19.2.8

- **What:** UI runtime.
- **Where:** Every component.
- **Why relevant:** Server/Client Component split (`"use client"`) governs how interactivity is added; no global state library is used.

## UI, Styling and Motion

### Tailwind CSS 4 + @tailwindcss/postcss

- **What:** Utility-first CSS framework; v4 is configured CSS-first.
- **Where:** `postcss.config.mjs` (plugin), `app/globals.css` (`@import "tailwindcss"`, `@theme inline`, `@utility` blocks), component `className` strings.
- **Why relevant:** There is no `tailwind.config.js`; adding a color/utility means editing `app/globals.css`.
- **Relationships:** Tailwind v4 native utilities (`bg-cta-gradient`, `gradient-text`) are consumed by `components/ui/*` and sections.

### clsx + tailwind-merge (`lib/utils.ts`)

- **What:** `cn()` merges conditional class lists and resolves Tailwind conflicts (last conflicting class wins).
- **Where:** `lib/utils.ts`; used by every UI primitive and several sections.
- **Why relevant:** Allows callers to override default styling, e.g. `<Button className="w-full">`.

### framer-motion 13.3.0

- **What:** Declarative animation library for React.
- **Where:** `components/reveal.tsx` (scroll reveal), `components/sections/faq.tsx` (accordion height animation with `AnimatePresence`), `components/whatsapp-bubble.tsx` (spring entrance, hover/tap).
- **Why relevant:** It is the main client-side runtime cost; `useReducedMotion` is used to respect accessibility preferences.

### lucide-react 1.46.0

- **What:** Tree-shakeable SVG icon library.
- **Where:** Almost every component; `lib/constants.ts` stores icon components inside `SERVICE_GROUPS` data.
- **Why relevant:** Icons are stored as component references in data structures (typed as `LucideIcon`), which is why the data file imports React icon components.

### resend ^4.0.0

- **What:** Email delivery SDK.
- **Where:** `actions/contact.ts` — sends enquiry emails; `lib/validation.ts` is the only other server-side code.
- **Why relevant:** Replaces the earlier TODO; sends from `RESEND_FROM_EMAIL` (default sandbox sender) to `SITE.email` with the submitter as `replyTo`.
- **Relationships:** Server Action only; client never sees the API key.

### next/font/google (Plus Jakarta Sans)

- **What:** Build-time font download and self-hosting with CSS variable output.
- **Where:** `app/layout.tsx` → `--font-jakarta` → Tailwind `--font-sans` in `app/globals.css`.
- **Why relevant:** No third-party font request at runtime.

## Build and Tooling

| Tool | Version | Where | Notes |
|------|---------|-------|-------|
| TypeScript compiler | ^5 | `tsconfig.json` | `strict`, `noEmit`, `@/*` alias |
| ESLint | ^9 | `eslint.config.mjs` | Flat config (`defineConfig`), `globalIgnores` for `.next`, `out`, `build`, `next-env.d.ts` |
| eslint-config-next | 16.3.5 | `eslint.config.mjs` | Applies `core-web-vitals` and `typescript` rule sets |
| PostCSS | bundled with Next | `postcss.config.mjs` | Only the Tailwind plugin |
| npm | lockfile v3 | `package-lock.json` | Sole package manager |

## Package Manager

npm — evidenced by `package-lock.json` and `scripts` written for npm. No `pnpm-lock.yaml`, `yarn.lock`, or `bun.lockb`.

## Testing Frameworks

None. No Jest, Vitest, Playwright, Cypress, or Testing Library dependencies.

## CI/CD and Hosting

- **CI/CD:** none configured in the repository.
- **Hosting (intended):** Vercel, per the README (`npx vercel`). No `vercel.json` present. Not verified as the actual production host.

## Databases, ORMs, Caches, Queues

None. No database engine, ORM, Redis, or job queue dependencies.

## Authentication / Authorization

None. No NextAuth, Clerk, Auth0, or similar.

## Monitoring and Logging

None as libraries. Only `console.log` / `console.error` at runtime.

## External Services (runtime)

- WhatsApp (`wa.me`), Instagram, LinkedIn — outbound links.
- Google Fonts — build-time only.
- Resend — email delivery for contact enquiries (requires `RESEND_API_KEY`; sender defaults to the Resend sandbox address).

## Technology Relationship Summary

```mermaid
flowchart TB
  Next[Next.js 16] --> React[React 19]
  Next --> Font[next/font/google]
  Next --> OG[next/og ImageResponse]
  Next --> Actions[Server Actions]
  Tailwind[Tailwind CSS 4] --> PostCSS[PostCSS plugin]
  Tailwind --> Theme[app/globals.css @theme]
  CLSX[clsx] --> CN[cn()]
  TWM[tailwind-merge] --> CN
  FM[framer-motion] --> Reveal[Reveal / Faq / Bubble]
  Lucide[lucide-react] --> Constants[lib/constants.ts]
```

## Version Notes

- Node.js version is not pinned (`package.json` has no `engines`). Not verified from the repository.
- Exact installed versions may differ from the declared ranges (e.g. `eslint` resolves to a newer 9.x).