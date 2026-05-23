import { loadDocument } from "@/lib/content";
import { DocsShell } from "@/components/site/DocsShell";
import { findDoc } from "@/lib/docs-nav";
import { pageAlternates } from "@/lib/seo";

const LANG = "en" as const;
const ROOT_SLUG = "introduction";

export const metadata = {
  title: "Docs",
  description: findDoc(LANG, ROOT_SLUG)?.subtitle ?? "User documentation for text2ontology.",
  alternates: pageAlternates({ enPath: "/docs", lang: LANG }),
};

export default function DocsIndex() {
  const { html, toc } = loadDocument(LANG, "docs", ROOT_SLUG);
  return (
    <DocsShell lang={LANG} basePath="/docs" slug={ROOT_SLUG} html={html} toc={toc} />
  );
}
