import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="flex-1 bg-surface">
        <section className="mx-auto max-w-3xl px-5 pt-32 pb-24 sm:px-8 sm:pt-40">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-magenta">
            Last updated: {updated}
          </p>
          <h1 className="mt-3 text-balance text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
            {title}
          </h1>
          <div className="legal-prose mt-8 rounded-2xl border border-border bg-white p-6 shadow-sm sm:p-10">
            {children}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
