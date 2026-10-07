"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import { Logo } from "@/components/logo";
import { ButtonLink, buttonVariants } from "@/components/ui/button";
import { NAV_LINKS, SITE } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Escape closes the menu, and focus returns to the toggle that opened it.
  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        close();
        toggleRef.current?.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, close]);

  // Prevent the page behind the menu from scrolling on touch devices.
  useEffect(() => {
    if (!open) return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Move focus into the panel so keyboard and screen-reader users land on the
  // links rather than continuing from the toggle.
  useEffect(() => {
    if (!open) return;
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/70 bg-white/85 backdrop-blur-lg">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Logo />

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-navy/70 transition-colors hover:text-brand-magenta"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            href={SITE.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors hover:text-brand-magenta"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {SITE.phone}
          </a>
          <ButtonLink href="#contact" size="sm">
            Get Free Audit
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </ButtonLink>
        </div>

        <button
          ref={toggleRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-navy transition-colors hover:bg-navy/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? (
            <X className="h-5 w-5" aria-hidden="true" />
          ) : (
            <Menu className="h-5 w-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open ? (
        <nav
          ref={panelRef}
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-border/70 bg-white px-5 pb-6 pt-3 shadow-xl lg:hidden"
        >
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                className="rounded-lg px-3 py-2.5 text-base font-medium text-navy transition-colors hover:bg-surface"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="mt-4 flex flex-col gap-2.5">
            <ButtonLink
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full"
              onClick={close}
            >
              Book a Free Strategy Call
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </ButtonLink>
            <a
              href={SITE.phoneHref}
              className={buttonVariants({ variant: "outline", className: "w-full" })}
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {SITE.phone}
            </a>
          </div>
        </nav>
      ) : null}
    </header>
  );
}