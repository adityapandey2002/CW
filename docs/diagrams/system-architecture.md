# System Architecture Diagram

## Layered View

```mermaid
flowchart TB
  Browser[Browser / Visitor]
  Next[Next.js 16 App Router]
  Layout["Root Layout<br/>fonts, metadata, JSON-LD"]
  Home["Home Page<br/>app/page.tsx"]
  Sections["Sections<br/>Hero, Services, About,<br/>Testimonials, FAQ, Contact"]
  Constants["lib/constants.ts<br/>Content source of truth"]
  Action["Server Action<br/>actions/contact.ts"]
  Meta["Metadata Routes<br/>robots, sitemap,<br/>manifest, OG image"]
  Legal["Legal Pages<br/>/privacy, /terms"]
  Stdout["stdout logs<br/>PII"]

  Browser --> Next
  Next --> Layout
  Layout --> Home
  Home --> Sections
  Sections --> Constants
  Home --> Legal
  Next --> Meta
  Browser -->|form submit| Action
  Action --> Stdout
```

## Runtime vs Build Time

```mermaid
flowchart LR
  subgraph Build["Build time"]
    Font[next/font/google] --> CSS[globals.css]
    Constants[lib/constants.ts] --> Routes[Routes + metadata routes]
    CSS --> Routes
  end
  subgraph Runtime["Runtime"]
    Routes --> HTML[HTML + hydration]
    HTML --> User[User interaction]
    User --> Action[submitContact]
    Action --> Log[stdout]
  end
```

## Notes

- Everything except the contact form is static content rendered from `lib/constants.ts`.
- The only dynamic server-side path is `submitContact`, which validates and logs.
- No database, cache, queue, or third-party API is involved at runtime.
- See `docs/04-system-architecture.md` for the full written analysis.