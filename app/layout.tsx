import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Noto_Sans_SC } from "next/font/google";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

// Three font families to mirror the main product's design system.
// Space Grotesk for titles / sans body, JetBrains Mono for data / labels,
// Noto Sans SC for Chinese fallback so mixed-language pages don't fall back
// to platform default Chinese fonts.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans-loaded",
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono-loaded",
});
const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-zh-loaded",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "text2ontology — Ontology before query",
    template: "%s · text2ontology",
  },
  description:
    "An open-source system for LLM-driven data analysis where the organization maintains the ontology and the LLM only fills parameters into intent templates. Built so every wrong answer has an address.",
  openGraph: {
    title: "text2ontology — Ontology before query",
    description:
      "LLM-driven analysis should not freely write SQL. It should fill parameters into intent templates the organization maintains.",
    url: SITE_URL,
    siteName: "text2ontology",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "text2ontology — Ontology before query",
    description:
      "LLM-driven analysis should not freely write SQL. It should fill parameters into intent templates the organization maintains.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
  },
};

/**
 * Inline lang-attribute fix. The root <html> ships with `lang="en"` because
 * static export resolves the layout once for every route. This <script> runs
 * synchronously in <head> before paint — it flips `documentElement.lang` to
 * `zh-CN` for any /zh/* path, so AT screen readers, browser translation
 * banners, and JS-aware crawlers (Googlebot, Bingbot since 2019) all see the
 * correct locale. Non-JS crawlers see `en` on ZH pages — small cost we
 * accept to avoid restructuring the entire app into route groups.
 */
const LANG_SCRIPT = `(function(){var p=location.pathname;if(p==='/zh'||p.indexOf('/zh/')===0){document.documentElement.lang='zh-CN';}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${notoSansSC.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: LANG_SCRIPT }} />
      </head>
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
