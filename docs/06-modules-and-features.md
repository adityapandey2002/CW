# 06 — Modules and Features

This document describes every meaningful module in the repository. The project is small; "modules" are source folders/components plus the content and action layers.

## Module Map

```mermaid
flowchart TB
  Constants[lib/constants.ts] --> Layout[app/layout.tsx]
  Constants --> Header[components/header.tsx]
  Constants --> Footer[components/footer.tsx]
  Constants --> Sections[components/sections/*]
  Constants --> Meta[app/robots.ts / sitemap.ts / manifest.ts / opengraph-image.tsx]
  Utils[lib/utils.ts] --> UI[components/ui/*]
  UI --> Sections
  Sections --> Home[app/page.tsx]
  ContactForm[components/contact-form.tsx] --> Action[actions/contact.ts]
  Action --> Constants
```

---

## 1. `lib/constants.ts` — Content and Domain Data

- **Purpose:** Single source of truth for site identity, navigation, services, testimonials, FAQs, and stats.
- **Exports:**
  - `SITE` (const object): name, taglines, hero, coFounder, URL, phone, phoneHref, whatsappHref, email, address, instagram, linkedin.
  - `NAV_LINKS` (const array): Home/Services/About/FAQ/Contact anchors.
  - `Service` / `ServiceGroup` types.
  - `SERVICE_GROUPS`: 4 groups, 10 services total.
  - `TESTIMONIALS`: 3 entries with quote/name/role/platform.
  - `FAQS`: 5 Q&A entries.
  - `STATS`: 4 metrics.
- **Dependencies:** `lucide-react` icons (`Store`, `Globe`, `PackageSearch`, `Target`, `TrendingUp`, `UserCog`, `Truck`, `ShieldCheck`, `Code2`, `BarChart3`).
- **Inputs:** `process.env.NEXT_PUBLIC_SITE_URL` for `SITE.url`.
- **Outputs:** Constants consumed across the app.
- **Business rules:**
  - Production URL default `https://consultancywala.com`.
  - WhatsApp link includes a pre-filled message: "Hi Consultancy Wala, I want to grow my e-commerce business."
- **Related APIs/DB:** None.
- **Care:** Changing `SITE.name`, `SITE.url`, or `SERVICE_GROUPS` affects metadata, footer, about, services, and generated routes.

## 2. `lib/utils.ts` — Class Merging

- **Purpose:** `cn(...inputs: ClassValue[]): string` using `clsx` + `tailwind-merge`.
- **Used by:** `Button`, `Card`, `Input`, `Label`, `Select`, `Textarea`, `Logo`, `SectionHeading`, `Faq`, `Header`.
- **Business rules:** Tailwind conflict resolution (later classes win where applicable).

## 3. `actions/contact.ts` — Contact Server Action

- **Directive:** `"use server"`.
- **Exports:** `ContactFormState`, `ContactPayload`, `submitContact`.
- **Input:** `_prevState: ContactFormState`, `formData: FormData`.
- **Processing:**
  1. Reads fields with `String(formData.get(...) ?? "").trim()`.
  2. Requires `name`, `email`, `phone`, `message`.
  3. Validates email with `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`.
  4. `console.log` the payload with `receivedAt`.
  5. Returns success/error state.
- **Outputs:** `{ status: "success" | "error", message? }`.
- **Side effects:** stdout log only.
- **Error handling:** returns errors (does not throw) for validation.
- **Business rules:** business name/service optional; email required.
- **Known gap:** no email delivery, no persistence, no rate limit/spam protection.

## 4. UI Primitives (`components/ui/`)

### `button.tsx`
- Exports `buttonVariants(args)`, `Button`, `ButtonLink`.
- Variants: `primary`, `outline`, `ghost`, `light`; sizes `sm`, `md`, `lg`.
- Base styles include focus-visible outline, active scale, disabled state.
- `ButtonLink` renders an `<a>` for navigation/CTAs.

### `card.tsx`
- `Card` wraps a `div` with rounded border, white background, shadow.

### `input.tsx`, `label.tsx`, `select.tsx`, `textarea.tsx`
- Focus rings, border tokens, surface background.
- `Select` adds a `ChevronDown` icon overlay.
- All forward native HTML attributes via `...props`.

## 5. `components/header.tsx` — Navigation

- **Client component** (`"use client"`).
- **State:** `open` for mobile menu.
- **Data:** `NAV_LINKS`, `SITE`, `Logo`, `ButtonLink`, `buttonVariants`.
- **Behavior:**
  - Fixed header with blur background.
  - Desktop nav shown at `lg`; phone link + "Get Free Audit".
  - Mobile hamburger toggles menu; links close menu.
  - Mobile menu includes WhatsApp CTA and phone.
- **Accessibility:** `aria-expanded`, `aria-controls`, `aria-label` on toggle; nav landmarks.

## 6. `components/footer.tsx` — Footer

- **Server component.**
- **Data:** `SITE`, `NAV_LINKS`, `SERVICE_GROUPS` (first 6 services), social icons, legal links.
- **Behavior:** brand/description/socials, explore links, services links, contact (phone/email/address), copyright with current year, legal links, "Made with ♥ in Patna".
- **Business rules:** service links all point to `#services`; legal links to `/privacy`, `/terms`.

## 7. `components/logo.tsx` — Brand Mark

- **Props:** `variant?: "dark" | "light"`, `className?`.
- Renders "CW" gradient tile + wordmark + tagline; links to `#home`.
- **Note:** On legal pages, `#home` anchor does not exist; link behavior depends on browser (navigates to same page with hash). This is a minor UX issue.

## 8. `components/reveal.tsx` — Scroll Animation Wrapper

- **Client component.**
- **Props:** `children`, `className?`, `delay?`.
- Uses `useReducedMotion`; if reduced, no initial/whileInView animation.
- `viewport={{ once: true, margin: "-80px" }}`, duration 0.6s easeOut.

## 9. `components/section-heading.tsx` — Shared Heading

- **Props:** `eyebrow?`, `title: ReactNode`, `subtitle?`, `align?: "center" | "left"`.
- Wraps in `Reveal`; renders eyebrow pill, `h2`, subtitle.

## 10. `components/social-icons.tsx` — Inline SVGs

- Exports `WhatsAppIcon`, `InstagramIcon`, `LinkedInIcon`.
- Props: `className?`; SVG `aria-hidden="true"`; size default `h-5 w-5`.

## 11. `components/legal-page.tsx` — Legal Shell

- **Props:** `title`, `updated`, `children`.
- Renders Header, title, "Last updated", prose container (`.legal-prose`), Footer.

## 12. `components/contact-form.tsx` — Lead Form

- **Client component.**
- **State:** `pending`, `sent`, `error`.
- **Fields:** name*, phone*, email*, businessName, service (select), message*.
- **Service options:** 7 hardcoded options (not derived from `SERVICE_GROUPS`).
- **Submit:** calls `submitContact` with `new FormData(form)`; on success resets form and shows success panel; on error shows inline alert.
- **Accessibility:** labels, `required`, `role="alert"` for errors, disabled submit while pending.
- **Known gap:** mismatch between hardcoded service options and `SERVICE_GROUPS`; potential drift.

## 13. `components/whatsapp-bubble.tsx` — Floating CTA

- **Client component**; Framer Motion spring entrance, hover/tap scales, ping ring.
- Links to `SITE.whatsappHref` in new tab with `rel="noopener noreferrer"`.

## 14. Home Sections (`components/sections/`)

### `hero.tsx`
- Eyebrow, headline, description, two CTAs, stats grid from `STATS`.
- Decorative grid and blurred blobs; `Reveal` delays.

### `services.tsx`
- `SectionHeading` + grouped service cards.
- Each card: icon tile, title, description; hover lift.
- CTA "Not sure where to start? Get a free audit" → `#contact`.

### `about.tsx`
- Two-column: narrative + 4 pillars (Founder-Led, ROI-First, Transparent Pricing, Zero-to-Scale Ready).
- Uses `SITE.coFounder` and `SITE.taglineAlt`.

### `testimonials.tsx`
- 3 cards with quote, 5 stars, name/role/platform.
- Note: `<figcaption>` is rendered inside a `<div>` (the `Card` primitive) rather than inside a `<figure>` element, so the caption semantics do not apply as intended. A `<figure>` wrapper would be the conventional fix.

### `faq.tsx`
- Client accordion; first item open by default (`openIndex = 0`).
- `AnimatePresence`, height animation, reduced-motion handling.
- `aria-expanded` on buttons; no `aria-controls`/region wiring.

### `contact.tsx`
- Contact items (phone, WhatsApp, email), location card, response-time card, `ContactForm`.
- External links get `target="_blank"` + `rel` when href starts with `http`.

## 15. App Routes (`app/`)

### `layout.tsx`
- Root layout; `Plus_Jakarta_Sans`; viewport (theme color white, width, scale).
- Metadata: title template, description, keywords, canonical, OG, Twitter, robots, icons.
- JSON-LD Organization with name/url/email/phone/address.
- Renders `<html lang="en">` and body.

### `page.tsx`
- Home composition (Header, sections, Footer, WhatsAppBubble).

### `error.tsx`
- Client error boundary; logs error; "Try Again" calls `retry()`.

### `not-found.tsx`
- 404 with Header/Footer and home/contact links.

### `privacy/page.tsx`, `terms/page.tsx`
- Legal content; static metadata; uses `LegalPage`.
- Last updated: September 2026.

## 16. Metadata Routes

- `robots.ts`: allow `*`, sitemap `${SITE.url}/sitemap.xml`, host from `SITE.url`.
- `sitemap.ts`: home (weekly, priority 1), privacy/terms (yearly, priority 0.3), `lastModified` at generation.
- `manifest.ts`: name/short_name/description/start_url/display/colors/icons.
- `opengraph-image.tsx`: 1200×630 gradient image with brand name, hero, tagline, "Get a free audit".
- `icon.svg`, `favicon.ico`: static icons.

## 17. `app/globals.css` — Design Tokens

- `@import "tailwindcss"`.
- `:root` background/foreground/surface.
- `@theme inline` colors/font/animation/keyframes.
- Custom `@utility` classes.
- Smooth scrolling + reduced motion; body font; selection; `.legal-prose` typography.

## Feature Inventory

| Feature | Status | Evidence |
|---------|--------|----------|
| Single-page marketing site | Implemented | `app/page.tsx` |
| Responsive navigation | Implemented | `components/header.tsx` |
| Contact form server validation | Implemented | `actions/contact.ts` |
| Email delivery of enquiries | Not implemented (TODO) | commented code in action |
| Lead persistence | Not implemented | no DB |
| WhatsApp CTAs | Implemented | `SITE.whatsappHref` |
| SEO metadata/JSON-LD | Implemented | `app/layout.tsx` |
| Sitemap/robots/manifest/OG | Implemented | `app/*.ts(x)` |
| Legal pages | Implemented | `app/privacy`, `app/terms` |
| Error/404 pages | Implemented | `app/error.tsx`, `app/not-found.tsx` |
| Auth/admin | Not implemented | no auth code |
| Tests | Not implemented | no test files |
| CMS | Not implemented | hardcoded constants |