"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CONTACT_SERVICE_OPTIONS, SITE, whatsappLink } from "@/lib/constants";
import { FIELD_LIMITS } from "@/lib/validation";

const INITIAL_STATE: ContactFormState = { status: "idle" };

type Summary = { name: string; service: string; message: string };

export function ContactForm() {
  // useActionState gives us `pending` for free and, critically, wires the form
  // to the server action via the `action` prop. That preserves progressive
  // enhancement: the form still submits before hydration / without JS.
  const [state, formAction, pending] = useActionState(
    submitContact,
    INITIAL_STATE
  );

  const formRef = useRef<HTMLFormElement>(null);
  const [summary, setSummary] = useState<Summary | null>(null);

  const sent = state.status === "success";
  const error = state.status === "error" ? (state.message ?? null) : null;

  // Clear the fields once the action reports success, but keep `summary` so the
  // success panel can offer a pre-filled WhatsApp message.
  useEffect(() => {
    if (sent) formRef.current?.reset();
  }, [sent]);

  /**
   * Records what the visitor typed so the success state can deep-link into
   * WhatsApp with their enquiry already written. This deliberately does NOT
   * call preventDefault, so native form submission still proceeds.
   */
  function captureSummary(form: HTMLFormElement) {
    const data = new FormData(form);
    const read = (key: string) => String(data.get(key) ?? "").trim();
    setSummary({
      name: read("name"),
      service: read("service"),
      message: read("message"),
    });
  }

  const whatsappHref = summary
    ? whatsappLink(
        [
          `Hi Consultancy Wala, I'm ${summary.name || "a seller"}.`,
          summary.service ? `I'm interested in: ${summary.service}.` : null,
          summary.message ? `\n\n${summary.message}` : null,
        ]
          .filter(Boolean)
          .join(" ")
      )
    : null;

  if (sent) {
    return (
      <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-brand-magenta" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold text-navy">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Thanks for reaching out. Our team will get back to you within 24 hours with a free
          growth plan for your store.
        </p>

        <div className="mt-6 flex flex-col items-center gap-3">
          {whatsappHref ? (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-cta-gradient px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Send it again on WhatsApp
            </a>
          ) : null}
          <Button
            type="button"
            variant="outline"
            onClick={() => setSummary(null)}
          >
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      onSubmit={(event) => captureSummary(event.currentTarget)}
      className="relative rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your Name *</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Rohit Sharma"
            autoComplete="name"
            maxLength={FIELD_LIMITS.name}
            required
          />
        </div>
        <div>
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 98765 43210"
            autoComplete="tel"
            maxLength={FIELD_LIMITS.phone}
            required
          />
        </div>
      </div>

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            autoComplete="email"
            maxLength={FIELD_LIMITS.email}
            required
          />
        </div>
        <div>
          <Label htmlFor="businessName">Business Name</Label>
          <Input
            id="businessName"
            name="businessName"
            type="text"
            placeholder="Your store / brand name"
            autoComplete="organization"
            maxLength={FIELD_LIMITS.businessName}
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="service">What do you need?</Label>
        <Select
          id="service"
          name="service"
          defaultValue={CONTACT_SERVICE_OPTIONS[0]}
        >
          {CONTACT_SERVICE_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </Select>
      </div>

      <div className="mt-5">
        <Label htmlFor="message">Your Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your store, your goals, and where you'd like to be in 12 months."
          maxLength={FIELD_LIMITS.message}
          required
        />
      </div>

      {/*
        Honeypot. Hidden from humans and assistive tech, but a naive bot that
        fills every input will populate it. The server action treats a
        non-empty value as a bot and returns success without sending email.
      */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="company_website">Company website</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/*
        aria-live so screen-reader users hear the validation failure as soon
        as the server returns it.
      */}
      <div aria-live="polite" role="status">
        {error ? (
          <p className="mt-3 text-sm font-medium text-red-500">{error}</p>
        ) : null}
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={pending}>
          {pending ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending...
            </>
          ) : (
            "Send Message"
          )}
        </Button>
        <a
          href={whatsappHref ?? SITE.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-magenta transition-colors hover:text-brand-purple"
        >
          <MessageCircle className="h-4 w-4" aria-hidden="true" />
          Prefer WhatsApp? Chat now
        </a>
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        We reply within 24 hours. No spam, ever.
      </p>
    </form>
  );
}