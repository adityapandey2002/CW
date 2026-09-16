import { cn } from "@/lib/utils";
import type { InputHTMLAttributes } from "react";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-12 w-full rounded-xl border border-border bg-surface px-4 text-sm text-navy placeholder:text-muted-foreground/70 transition-colors focus:border-brand-magenta/60 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20",
        className
      )}
      {...props}
    />
  );
}