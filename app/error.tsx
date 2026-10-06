"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-5 text-center">
      <span className="bg-cta-gradient-soft inline-flex items-center rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-brand-magenta">
        Something went wrong
      </span>
      <h1 className="mt-6 text-balance text-3xl font-extrabold leading-[1.15] tracking-tight text-navy sm:text-5xl">
        Oops — an unexpected <span className="gradient-text">error occurred.</span>
      </h1>
      <p className="mt-4 max-w-md text-base leading-7 text-muted-foreground">
        Don&apos;t worry, it happens to the best of us. Try again — your data is safe.
      </p>
      <Button type="button" onClick={() => retry()} size="lg" className="mt-8">
        <AlertTriangle className="h-4 w-4" aria-hidden="true" />
        Try Again
      </Button>
    </div>
  );
}
