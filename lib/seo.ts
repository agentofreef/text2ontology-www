import type { Metadata } from "next";

/**
 * SEO helpers — produce canonical + hreflang alternates for any page on the
 * bilingual site. Pass the EN path; the ZH counterpart is derived by
 * prefixing `/zh`. This keeps every page's metadata consistent without
 * sprinkling the URL math everywhere.
 *
 * Per Google's hreflang docs (developers.google.com/search/docs/specialty/
 * international/managing-multi-regional-sites): every page in a language pair
 * must reference itself + its alternate(s) + an x-default. Skipping x-default
 * causes Google to guess which locale to serve when the user's preference
 * doesn't match either — usually wrong.
 */
export const SITE_URL = "https://text2ontology.com";
export const DEFAULT_OG_IMAGE = "/og.png";

export interface PageSeoInput {
  /** Path without trailing slash; e.g. "/manifesto" or "/blog/responsibility-as-moat". Pass "" for root. */
  enPath: string;
  /** "en" or "zh" — which locale the page actually is. */
  lang: "en" | "zh";
}

function withTrailingSlash(p: string): string {
  if (p === "") return "/";
  return p.endsWith("/") ? p : p + "/";
}

export function pageAlternates({ enPath, lang }: PageSeoInput): NonNullable<Metadata["alternates"]> {
  const enUrl = SITE_URL + withTrailingSlash(enPath);
  const zhUrl = SITE_URL + withTrailingSlash("/zh" + enPath);
  const canonical = lang === "zh" ? zhUrl : enUrl;
  return {
    canonical,
    languages: {
      en: enUrl,
      "zh-CN": zhUrl,
      "x-default": enUrl,
    },
    types: {
      "application/rss+xml": [
        { url: "/rss.xml", title: "text2ontology — Blog (English)" },
        { url: "/zh/rss.xml", title: "text2ontology — 博客 (中文)" },
      ],
    },
  };
}

/** OG image config consumed by per-page metadata blocks. */
export function pageOpenGraph(args: {
  title: string;
  description: string;
  url: string;
  lang: "en" | "zh";
  type?: "website" | "article";
  publishedTime?: string;
}): NonNullable<Metadata["openGraph"]> {
  return {
    title: args.title,
    description: args.description,
    url: args.url,
    siteName: "text2ontology",
    locale: args.lang === "zh" ? "zh_CN" : "en_US",
    type: args.type ?? "website",
    images: [{ url: DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: "text2ontology — Ontology before query" }],
    ...(args.publishedTime ? { publishedTime: args.publishedTime } : {}),
  };
}
