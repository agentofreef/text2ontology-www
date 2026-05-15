/**
 * Industrial-flavored prose wrapper for rendered markdown.
 *
 * Mirrors the design system: square corners, hard borders, no shadows, mono
 * for code/tables, sans (Space Grotesk) for headings + body. Accent left bar
 * on blockquotes. Tailwind v4 arbitrary-child selectors do the lift so the
 * raw HTML output of marked stays untouched.
 */
export function Prose({ html }: { html: string }) {
  return (
    <article
      className={[
        "prose-industrial max-w-none font-sans text-text",
        // headings
        "[&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:font-sans [&_h1]:text-[clamp(2rem,4.5vw,3.25rem)] [&_h1]:font-bold [&_h1]:leading-[1.05] [&_h1]:tracking-tight [&_h1]:text-ink",
        "[&_h2]:mt-16 [&_h2]:mb-5 [&_h2]:border-t [&_h2]:border-ink [&_h2]:pt-6 [&_h2]:font-sans [&_h2]:text-[clamp(1.4rem,2.6vw,2rem)] [&_h2]:font-semibold [&_h2]:leading-tight [&_h2]:tracking-tight [&_h2]:text-ink",
        "[&_h3]:mt-10 [&_h3]:mb-4 [&_h3]:font-sans [&_h3]:text-[1.2rem] [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-ink",
        "[&_h4]:mt-8 [&_h4]:mb-3 [&_h4]:font-mono [&_h4]:text-[0.78rem] [&_h4]:uppercase [&_h4]:tracking-[0.18em] [&_h4]:text-text-soft",
        // body
        "[&_p]:my-5 [&_p]:text-[0.97rem] [&_p]:leading-[1.75] [&_p]:text-text",
        "[&_strong]:font-semibold [&_strong]:text-ink",
        "[&_em]:italic",
        // links
        "[&_a]:border-b [&_a]:border-text-ghost [&_a]:text-ink [&_a]:transition-colors hover:[&_a]:border-accent hover:[&_a]:text-accent",
        // lists
        "[&_ul]:my-5 [&_ul]:space-y-2 [&_ul]:pl-0 [&_ul]:list-none",
        "[&_ol]:my-5 [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:list-decimal",
        "[&_li]:relative [&_li]:leading-[1.7] [&_li]:text-text",
        "[&_ul>li]:pl-6",
        "[&_ul>li]:before:absolute [&_ul>li]:before:left-0 [&_ul>li]:before:top-[0.55em] [&_ul>li]:before:size-1.5 [&_ul>li]:before:bg-accent [&_ul>li]:before:content-['']",
        // blockquote
        "[&_blockquote]:my-8 [&_blockquote]:border-l-2 [&_blockquote]:border-accent [&_blockquote]:bg-canvas-alt [&_blockquote]:px-6 [&_blockquote]:py-4 [&_blockquote]:font-mono [&_blockquote]:text-[0.88rem] [&_blockquote]:leading-relaxed [&_blockquote]:text-text-soft",
        "[&_blockquote_p]:my-2 [&_blockquote_p]:font-mono [&_blockquote_p]:text-[0.88rem]",
        // inline code
        "[&_code]:bg-canvas-alt [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.85em] [&_code]:text-accent",
        // pre / fenced code
        "[&_pre]:my-6 [&_pre]:overflow-x-auto [&_pre]:border-2 [&_pre]:border-ink [&_pre]:bg-ink [&_pre]:p-5 [&_pre]:font-mono [&_pre]:text-[0.82rem] [&_pre]:leading-relaxed [&_pre]:text-canvas",
        "[&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_pre_code]:text-canvas",
        // hr
        "[&_hr]:my-12 [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-border",
        // tables
        "[&_table]:my-8 [&_table]:w-full [&_table]:border-collapse [&_table]:border [&_table]:border-ink [&_table]:font-mono [&_table]:text-[0.82rem]",
        "[&_thead]:border-b-2 [&_thead]:border-ink [&_thead]:bg-canvas-alt",
        "[&_th]:border [&_th]:border-border-strong [&_th]:px-3 [&_th]:py-2.5 [&_th]:text-left [&_th]:font-semibold [&_th]:uppercase [&_th]:tracking-wider [&_th]:text-ink",
        "[&_td]:border [&_td]:border-border [&_td]:px-3 [&_td]:py-2.5 [&_td]:align-top [&_td]:text-text",
        "[&_tbody_tr:hover]:bg-canvas-alt",
        // images
        "[&_img]:my-6 [&_img]:border [&_img]:border-border",
      ].join(" ")}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
