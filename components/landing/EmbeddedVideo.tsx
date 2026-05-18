"use client";

import { useEffect, useRef } from "react";
import { useInView } from "framer-motion";
import type { Lang } from "./Hero";

/**
 * Reusable explainer-video block. Sits inside whatever container the caller
 * provides — no section chrome, no margins of its own. Auto-plays once,
 * muted, when scrolled into view; the MP4 has no audio track so muted
 * autoplay is allowed everywhere. Browser `controls` stay available so
 * the reader can replay / pause.
 *
 * Two `variant`s:
 *  - "concept"      — the 30s positioning piece (homepage, design-philosophy)
 *  - "architecture" — the ~55s how-it-works pipeline (blog index)
 */
export type VideoVariant = "concept" | "architecture";

const T: Record<VideoVariant, Record<Lang, { kicker: string; src: string; poster: string }>> = {
  concept: {
    en: {
      kicker: "▼// 30-second overview",
      src: "/text2ontology-en.mp4",
      poster: "/poster-en.png",
    },
    zh: {
      kicker: "▼// 30 秒看懂",
      src: "/text2ontology-zh.mp4",
      poster: "/poster-zh.png",
    },
  },
  architecture: {
    en: {
      kicker: "▼// how it actually works",
      src: "/text2ontology-architecture-en.mp4",
      poster: "/poster-architecture-en.png",
    },
    zh: {
      kicker: "▼// 看懂这套架构怎么跑",
      src: "/text2ontology-architecture-zh.mp4",
      poster: "/poster-architecture-zh.png",
    },
  },
};

export function EmbeddedVideo({
  lang,
  variant = "concept",
  kicker,
  showKicker = true,
}: {
  lang: Lang;
  variant?: VideoVariant;
  kicker?: string;
  showKicker?: boolean;
}) {
  const c = T[variant][lang];
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const inView = useInView(frameRef, {
    once: true,
    margin: "0px 0px -25% 0px",
  });

  useEffect(() => {
    if (inView) {
      videoRef.current?.play().catch(() => {
        // Autoplay can be blocked; the controls remain available.
      });
    }
  }, [inView]);

  return (
    <div>
      {showKicker ? (
        <div className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-ghost">
          {kicker ?? c.kicker}
        </div>
      ) : null}
      <div ref={frameRef} className="border-2 border-ink">
        <video
          ref={videoRef}
          className="block w-full"
          src={c.src}
          poster={c.poster}
          muted
          playsInline
          controls
          preload="none"
        />
      </div>
    </div>
  );
}
