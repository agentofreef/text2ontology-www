import { Reveal } from "./Reveal";
import { EmbeddedVideo } from "./EmbeddedVideo";
import type { Lang } from "./Hero";

/**
 * Homepage explainer-video section, sits right below the hero. Thin wrapper
 * around EmbeddedVideo that adds the section chrome (kicker line, big title,
 * top border). The same EmbeddedVideo block is reused inside the blog index
 * and the design-philosophy essay.
 */
const t = {
  en: {
    kicker: "▼// 30-second overview",
    title: "See the whole idea in 30 seconds",
  },
  zh: {
    kicker: "▼// 30 秒看懂",
    title: "30 秒看懂这套系统",
  },
};

export function SectionVideo({ lang }: { lang: Lang }) {
  const c = t[lang];
  return (
    <section className="border-t border-border px-6 py-14 md:py-24">
      <div className="mx-auto max-w-[1080px]">
        <Reveal>
          <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-ghost">
            {c.kicker}
          </div>
          <h2 className="mb-6 font-sans text-[clamp(1.9rem,3.2vw,2.75rem)] font-bold tracking-tight text-ink md:mb-10">
            {c.title}
          </h2>
        </Reveal>
        <Reveal delay={0.08}>
          <EmbeddedVideo lang={lang} showKicker={false} />
        </Reveal>
      </div>
    </section>
  );
}
