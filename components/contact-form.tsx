"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { submitContact, type ContactFormState } from "@/actions/contact";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { SITE } from "@/lib/constants";

const SERVICE_OPTIONS = [
  "Amazon / Flipkart Onboarding",
  "Marketplace Expansion",
  "Product Listing & Cataloging",
  "Amazon PPC & Ad Campaigns",
  "Account Management",
  "Website Development",
  "Something else",
];

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    setError(null);
    setPending(true);

    const result: ContactFormState = await submitContact(
      { status: "idle" },
      new FormData(form)
    );

    setPending(false);

    if (result.status === "success") {
      form.reset();
      setSent(true);
    } else {
      setError(result.message ?? "Something went wrong. Please try again.");
    }
  }

  if (sent) {
    return (
      <div className="flex h-full min-h-96 flex-col items-center justify-center rounded-2xl border border-border bg-white p-8 text-center shadow-sm">
        <CheckCircle2 className="h-12 w-12 text-brand-magenta" aria-hidden="true" />
        <h3 className="mt-4 text-xl font-extrabold text-navy">Message sent!</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
          Thanks for reaching out. Our team will get back to you within 24 hours with a free
          growth plan for your store.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-8"
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
          />
        </div>
      </div>

      <div className="mt-5">
        <Label htmlFor="service">What do you need?</Label>
        <Select id="service" name="service" defaultValue={SERVICE_OPTIONS[0]}>
          {SERVICE_OPTIONS.map((option) => (
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
          required
        />
      </div>

      {error ? (
        <p className="mt-3 text-sm font-medium text-red-500" role="alert">
          {error}
        </p>
      ) : null}

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
          href={SITE.whatsappHref}
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