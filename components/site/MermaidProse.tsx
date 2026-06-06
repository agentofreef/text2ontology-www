"use client";

import { useEffect, useRef } from "react";
import { Prose } from "./Prose";

/**
 * Prose + client-side mermaid rendering, for long-form pages (blog, manifesto)
 * served through DocShell. The docs tree has its own copy of this pass inside
 * DocsShell; this is the same mechanism wrapped as a standalone client
 * component so server shells can opt in without becoming client components.
 *
 * marked emits ```mermaid fences as <pre><code class="language-mermaid">; we
 * read the unescaped source via textContent, render to SVG in the site's
 * palette, and swap the <pre> for the diagram. A parse error leaves the
 * original code block untouched. Re-runs when `html` changes.
 */
export function MermaidProse({
  html,
  scope = "doc",
}: {
  html: string;
  scope?: string;
}) {
  const proseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = proseRef.current;
    if (!root) return;
    const blocks = Array.from(
      root.querySelectorAll<HTMLElement>("code.language-mermaid"),
    );
    if (blocks.length === 0) return;
    let cancelled = false;
    (async () => {
      const mermaid = (await import("mermaid")).default;
      // CJK labels are sized against the page fonts. If mermaid measures text
      // before the web fonts settle, node boxes come out too small and Chinese
      // characters get clipped — so wait for fonts to be ready first, and use a
      // font stack that includes CJK families.
      if (typeof document !== "undefined" && document.fonts?.ready) {
        try {
          await document.fonts.ready;
        } catch {
          /* ignore */
        }
      }
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: "loose",
        theme: "base",
        fontFamily:
          '"JetBrains Mono", "PingFang SC", "Noto Sans SC", "Microsoft YaHei", ui-monospace, monospace',
        htmlLabels: false,
        flowchart: { htmlLabels: false, useMaxWidth: true },
        themeVariables: {
          background: "#fafafa",
          primaryColor: "#f4f4f4",
          primaryBorderColor: "#0a0a0a",
          primaryTextColor: "#0a0a0a",
          secondaryColor: "#ffffff",
          tertiaryColor: "#ffffff",
          lineColor: "#0a0a0a",
          fontSize: "14px",
        },
      });
      for (let i = 0; i < blocks.length; i++) {
        const code = blocks[i];
        const pre = code.closest("pre") ?? code;
        const src = code.textContent ?? "";
        const id = `mmd-${scope}-${i}-${Math.random().toString(36).slice(2, 8)}`;
        try {
          const { svg } = await mermaid.render(id, src);
          if (cancelled) return;
          const wrap = document.createElement("div");
          wrap.className =
            "mermaid-rendered my-6 overflow-x-auto border-2 border-ink bg-canvas-alt p-5";
          wrap.innerHTML = svg;
          const svgEl = wrap.querySelector("svg");
          if (svgEl) {
            const vb = svgEl.getAttribute("viewBox");
            const vbW = vb ? parseFloat(vb.trim().split(/\s+/)[2]) : 0;
            svgEl.removeAttribute("width");
            svgEl.removeAttribute("height");
            svgEl.style.width = vbW > 0 ? `${vbW}px` : "auto";
            svgEl.style.height = "auto";
            svgEl.style.maxWidth = "100%";
            svgEl.style.maxHeight = "690px";
            svgEl.style.display = "block";
            svgEl.style.margin = "0 auto";
          }
          pre.replaceWith(wrap);
        } catch {
          // leave the original code block in place on parse error
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [html, scope]);

  return (
    <div ref={proseRef}>
      <Prose html={html} />
    </div>
  );
}
