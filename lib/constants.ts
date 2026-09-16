import {
  BarChart3,
  Code2,
  Globe,
  PackageSearch,
  ShieldCheck,
  Store,
  Target,
  TrendingUp,
  Truck,
  UserCog,
  type LucideIcon,
} from "lucide-react";

export const SITE = {
  name: "Consultancy Wala",
  tagline: "Smart Solutions. Stronger Businesses.",
  taglineAlt: "Empowering Brands. Boosting Growth.",
  hero: "Your E-Commerce Growth Partner.",
  coFounder: "Aditya Pandey",
  phone: "+91 8601862114",
  phoneHref: "+918601862114",
  whatsappHref:
    "https://wa.me/918601862114?text=Hi%20Consultancy%20Wala%2C%20I%20want%20to%20grow%20my%20e-commerce%20business.",
  email: "support.consultancywala@gmail.com",
  address: "Kumhrar, Patna, Bihar 800026",
  instagram: "https://instagram.com/consultancywala",
  linkedin: "https://linkedin.com/company/consultancywala",
} as const;

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
] as const;

export type Service = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type ServiceGroup = {
  title: string;
  subtitle: string;
  services: Service[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    title: "Store Launch & Expansion",
    subtitle: "Get live on India's biggest marketplaces without the paperwork headache.",
    services: [
      {
        title: "Amazon & Flipkart Onboarding",
        description:
          "Complete seller registration, GST setup, brand approval and store setup so you launch compliantly and quickly.",
        icon: Store,
      },
      {
        title: "Marketplace Expansion",
        description:
          "Expand beyond the Big Two to Meesho, JioMart, Nykaa and more with marketplace-perfect listings.",
        icon: Globe,
      },
    ],
  },
  {
    title: "Growth & Marketing",
    subtitle: "Turn clicks into customers with data-backed listing and ad strategy.",
    services: [
      {
        title: "Product Listing & Cataloging",
        description:
          "Keyword-rich titles, high-converting images, A+ content and catalog health that ranks and sells.",
        icon: PackageSearch,
      },
      {
        title: "Amazon PPC & Ad Campaigns",
        description:
          "Full-funnel advertising across Sponsored Products, Brands and Display — optimized to your ACOS.",
        icon: Target,
      },
      {
        title: "Pricing & Profitability Strategy",
        description:
          "Competitive price mapping and margin engineering so growth never costs you profit.",
        icon: TrendingUp,
      },
    ],
  },
  {
    title: "Operations & Protection",
    subtitle: "Run it like clockwork — safe, fast, and fully compliant.",
    services: [
      {
        title: "Account Management A to Z",
        description:
          "A dedicated growth manager running your account end-to-end, from listings to refunds.",
        icon: UserCog,
      },
      {
        title: "Inventory & Logistics Support",
        description:
          "Smart stocking plans, FBA vs FBM guidance and shipment reconciliation that prevent stockouts and fees.",
        icon: Truck,
      },
      {
        title: "Brand Protection & Compliance",
        description:
          "Anti-counterfeit action, trademark guidance and policy guardrails that keep your account healthy.",
        icon: ShieldCheck,
      },
    ],
  },
  {
    title: "Custom Solutions",
    subtitle: "Build your own moat on the internet.",
    services: [
      {
        title: "Website Development & Management",
        description:
          "High-converting e-commerce and brand websites — built fast, managed forever.",
        icon: Code2,
      },
      {
        title: "Sales & Performance Analytics",
        description:
          "Dashboards and weekly reviews that turn your marketplace data into clear next actions.",
        icon: BarChart3,
      },
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      "Within six months of onboarding, our monthly sales on Amazon crossed ₹40 lakh. They handled everything — listings, ads, the works.",
    name: "Rohit Sharma",
    role: "Home & Décor Seller",
    platform: "Amazon",
  },
  {
    quote:
      "Their PPC team cut our ACOS from 45% to 18% in just two months. Finally, campaigns that actually print money.",
    name: "Priya Singh",
    role: "Fashion Brand Owner",
    platform: "Flipkart",
  },
  {
    quote:
      "“Bilkul professional team” — from listing audits to inventory planning, it feels like having our own e-commerce chief. Highly recommended.",
    name: "Aman Verma",
    role: "Electronics Reseller",
    platform: "Meesho + Amazon",
  },
];

export const FAQS = [
  {
    question: "Is our data protected and business kept confidential?",
    answer:
      "Haan, bilkul. We sign NDAs on request, treat your catalog, margins and account data as strictly confidential, and never share seller information with third parties.",
  },
  {
    question: "How fast can my brand go live on Amazon or Flipkart?",
    answer:
      "Most sellers are live within 7–14 days. We handle registration, GST, brand approval and onboarding so you skip the usual 3–4 week delays.",
  },
  {
    question: "I'm a new seller. Do you take small businesses too?",
    answer:
      "Absolutely. Half our clients started from zero. Whether you need full account management or just a launch plan, we right-size the engagement to your stage and budget.",
  },
  {
    question: "What does an engagement typically cost?",
    answer:
      "We mix a transparent monthly retainer with a performance component for ads. After a free discovery call we'll share a fixed quote — no hidden charges, no surprises.",
  },
  {
    question: "Why should I choose Consultancy Wala over a bigger agency?",
    answer:
      "Because you work directly with our founders and senior strategists, not junior account managers. Smaller team, sharper focus, and ROI-first thinking on every rupee you spend.",
  },
];

export const STATS = [
  { value: "50+", label: "Brands Scaled" },
  { value: "10+", label: "Marketplaces Managed" },
  { value: "500+", label: "Listings Optimized" },
  { value: "₹40Cr+", label: "GMV Handled" },
] as const;