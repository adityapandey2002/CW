import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { WhatsAppIcon } from "@/components/social-icons";
import { SITE } from "@/lib/constants";

const CONTACT_ITEMS = [
  { icon: Phone, label: "Call Us", value: SITE.phone, href: SITE.phoneHref },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with a strategist",
    href: SITE.whatsappHref,
  },
  { icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
];

export function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Get In Touch"
          title={
            <>
              Let&apos;s grow your store — <span className="gradient-text">together.</span>
            </>
          }
          subtitle="Book a free discovery call and get a no-obligation growth plan within 48 hours."
        />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
          <div className="space-y-4">
            {CONTACT_ITEMS.map((item) => (
              <Reveal key={item.label}>
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-magenta/40 hover:shadow-md"
                >
                  <span className="bg-cta-gradient inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-brand-magenta/25">
                    <item.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {item.label}
                    </span>
                    <span className="mt-0.5 block font-bold text-navy">{item.value}</span>
                  </span>
                </a>
              </Reveal>
            ))}

            <Reveal delay={0.1}>
              <div className="flex items-center gap-4 rounded-2xl border border-border bg-white p-5 shadow-sm">
                <span className="bg-cta-gradient inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white shadow-md shadow-brand-magenta/25">
                  <MapPin className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    Based In
                  </span>
                  <span className="mt-0.5 block font-bold text-navy">{SITE.address}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">
                    Serving clients across India &amp; beyond.
                  </span>
                </span>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="flex items-center gap-4 rounded-2xl bg-navy p-5 text-white shadow-md shadow-navy/20">
                <Clock className="h-9 w-9 shrink-0 rounded-xl bg-white/10 p-2" aria-hidden="true" />
                <p className="text-sm leading-6 text-white/80">
                  <span className="font-bold text-white">Fast replies:</span> within 24 hours on
                  weekdays, 10am–7pm IST.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14} className="lg:self-start">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}