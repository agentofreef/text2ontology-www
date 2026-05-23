import { loadDocument } from "@/lib/content";
import { DocsShell } from "@/components/site/DocsShell";
import { findDoc } from "@/lib/docs-nav";
import { pageAlternates } from "@/lib/seo";

const LANG = "zh" as const;
const ROOT_SLUG = "introduction";

export const metadata = {
  title: "文档",
  description: findDoc(LANG, ROOT_SLUG)?.subtitle ?? "text2ontology 用户文档。",
  alternates: pageAlternates({ enPath: "/docs", lang: LANG }),
};

export default function DocsIndexZh() {
  const { html, toc } = loadDocument(LANG, "docs", ROOT_SLUG);
  return (
    <DocsShell lang={LANG} basePath="/zh/docs" slug={ROOT_SLUG} html={html} toc={toc} />
  );
}
