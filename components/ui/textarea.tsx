import { cn } from "@/lib/utils";
import type { TextareaHTMLAttributes } from "react";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-navy placeholder:text-muted-foreground/70 transition-colors focus:border-brand-magenta/60 focus:outline-none focus:ring-2 focus:ring-brand-magenta/20",
        className
      )}
      {...props}
    />
  );
}