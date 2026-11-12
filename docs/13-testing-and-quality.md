# 13 — Testing and Quality

## Test Suite Status

**No automated tests exist in the repository.**

Evidence:
- `package.json` has no `test` script and no test framework dependencies.
- No `*.test.*`, `*.spec.*`, or `__tests__/` files.
- No Playwright/Cypress config.
- No coverage configuration.

## Available Quality Gates

| Gate | Command | What It Covers | Verified result |
|------|---------|----------------|-----------------|
| ESLint | `npm run lint` | Next.js core-web-vitals + TypeScript rules | **Passes** — no output, exit 0 |
| TypeScript | `npx tsc --noEmit` | Type checking | **Passes** — exit 0 |
| Next build | `npm run build` | Production compilation + static generation | **Passes** — 9 routes prerendered as static |
| Documentation validation | `node scripts/validate-docs.mjs` | Markdown links, code fences, Mermaid structure | **Passes** — 29 files, 60 links, 15 Mermaid blocks |

The verification above was performed with `npm ci` (clean install from `package-lock.json`). An earlier interrupted `npm install` left a partially extracted `node_modules` (missing `.mjs` files while their `.map` siblings were present), which produced misleading `zod/v4`, `lucide-react` typings, and `framer-motion` import errors. Those were environment artifacts, not repository defects; `npm ci` resolves them.

### Documentation Validation Script

`scripts/validate-docs.mjs` runs without installing anything:

```bash
node scripts/validate-docs.mjs
```

It verifies that every relative Markdown link resolves, code fences are balanced, Mermaid blocks start with a known diagram type and have balanced delimiters, and no documentation file is empty. It exits non-zero when a problem is found — suitable for CI.

## Manual Test Checklist

Because no tests exist, use this checklist after changes. Items marked **[verified]** were confirmed against a running production build during the documentation pass.

- [ ] Home page renders all sections in order: Hero, Services, About, Testimonials, FAQ, Contact.
- [ ] Desktop nav anchors scroll to correct sections. **[verified: `header nav` exposes `#home`, `#services`, `#about`, `#faq`, `#contact`]**
- [ ] Mobile menu opens/closes; links close it.
- [ ] WhatsApp CTAs open `wa.me` with the pre-filled message. **[verified: 4 `wa.me` links on the home page]**
- [ ] Contact form:
  - [ ] Empty submit shows required-field error.
  - [ ] Invalid email shows email error. **[verified: inline `role="alert"` shows "Please enter a valid email address."]**
  - [ ] Valid submit shows success panel and resets form. **[verified: "Message sent!" panel renders]**
  - [ ] Error state clears on retry.
- [ ] FAQ accordion toggles; first item open by default. **[verified: `aria-expanded` = `true,false,false,false,false` initially; clicking item 3 leaves only item 3 expanded]**
- [ ] `/privacy` and `/terms` render legal content. **[verified: HTTP 200]**
- [ ] Unknown route renders branded 404. **[verified: HTTP 404]**
- [ ] `robots.txt`, `sitemap.xml`, manifest, OG image are reachable. **[verified: 200 with expected content types]**
- [ ] Reduced-motion preference disables animations.
- [ ] No console errors on page load. **[verified: browser console empty on the home page]**
- [ ] Response headers reviewed for cache and security policy. **[verified: `Cache-Control: s-maxage=31536000`, `x-nextjs-prerender`, ETag present; no `Set-Cookie`; no CSP/HSTS/`X-Content-Type-Options`; `X-Powered-By: Next.js` exposed]**

## Recommended Test Additions (not implemented)

1. **Unit tests** for `submitContact` (Vitest/Jest): required fields, invalid email, success shape.
2. **Component tests** for `ContactForm` states (idle/pending/success/error).
3. **E2E tests** (Playwright): navigation, form submission, legal pages, 404.
4. **Accessibility checks** (axe) for nav, form labels, accordion.
5. **Link checker** in CI for internal/external links.
6. **CI workflow** (GitHub Actions) running lint/build/tests.

These are recommendations only; nothing is implemented.

## Dependency Notes

- `npm audit` reports advisories in the transitive dependency tree. Review with `npm audit` and update intentionally; do not run `npm audit fix --force` without re-running `npm run build` (Next.js 16 compatibility matters).
- If `npm install` is interrupted, `node_modules` can end up partially extracted and produce misleading "Cannot find module" / "not exported from" errors. Use `npm ci` for a reproducible, complete install.