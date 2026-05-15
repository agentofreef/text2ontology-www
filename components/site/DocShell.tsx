import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Prose } from "./Prose";
import { Comments } from "./Comments";

/**
 * Shared layout for every long-form doc page: manifesto, design philosophy,
 * essays. Header strip with ▼// section label, big sans title, mono subtitle,
 * the rendered prose body, comments widget, and a back-link footer.
 */
export function DocShell({
  sectionLabel,
  backHref,
  backLabel,
  title,
  subtitle,
  html,
  lang,
}: {
  sectionLabel: string;
  backHref: string;
  backLabel: string;
  title: string;
  subtitle?: string;
  html: string;
  lang: "en" | "zh";
}) {
  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[820px] px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// {sectionLabel}
          </span>
        </div>

        <header className="mb-12 border-b border-ink pb-10">
          <h1 className="mb-4 font-sans text-[clamp(2.25rem,5vw,3.75rem)] font-bold leading-[1.0] tracking-tight text-ink">
            {title}
          </h1>
          {subtitle ? (
            <p className="max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
              {subtitle}
            </p>
          ) : null}
        </header>

        <Prose html={html} />

        <Comments lang={lang} />

        <div className="mt-20 border-t border-border pt-8">
          <Link
            href={backHref}
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-text-soft hover:text-ink"
          >
            <ArrowLeft className="size-3" />
            {backLabel}
          </Link>
        </div>
      </section>
    </main>
  );
}
