import { ChevronRight, Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/logo";
import { InstagramIcon, LinkedInIcon, WhatsAppIcon } from "@/components/social-icons";
import { NAV_LINKS, SERVICE_GROUPS, SITE } from "@/lib/constants";

const SOCIALS = [
  { label: "WhatsApp", href: SITE.whatsappHref, Icon: WhatsAppIcon },
  { label: "Instagram", href: SITE.instagram, Icon: InstagramIcon },
  { label: "LinkedIn", href: SITE.linkedin, Icon: LinkedInIcon },
];

const FOOTER_SERVICES = SERVICE_GROUPS.flatMap((group) => group.services).slice(0, 6);

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.6fr_0.8fr_1.2fr_1.2fr]">
        <div>
          <Logo variant="light" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-white/60">
            An e-commerce growth agency helping brands launch, scale and dominate Amazon,
            Flipkart, Meesho and beyond — strategy, PPC, cataloging and operations, all in one
            place.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition-all duration-300 hover:bg-cta-gradient hover:shadow-lg hover:shadow-brand-magenta/30"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Explore</h3>
          <ul className="mt-5 space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <ChevronRight
                    className="h-3.5 w-3.5 text-brand-magenta/70 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Services</h3>
          <ul className="mt-5 space-y-3">
            {FOOTER_SERVICES.map((service) => (
              <li key={service.title}>
                <a href="#services" className="text-sm text-white/70 transition-colors hover:text-white">
                  {service.title}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-white/40">Contact</h3>
          <ul className="mt-5 space-y-4">
            <li>
              <a
                href={SITE.phoneHref}
                className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta" aria-hidden="true" />
                {SITE.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="flex items-start gap-3 text-sm text-white/70 transition-colors hover:text-white"
              >
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-sm text-white/70">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-magenta" aria-hidden="true" />
              {SITE.address}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-6 text-xs text-white/50 sm:flex-row sm:px-8">
          <p>© {new Date().getFullYear()} Consultancy Wala. All rights reserved.</p>
          <p>
            Made with <span aria-hidden="true">♥</span> in Patna, India
          </p>
        </div>
      </div>
    </footer>
  );
}