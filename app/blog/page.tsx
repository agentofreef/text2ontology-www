import { blogCatalog } from "@/lib/content";
import { IndexShell } from "@/components/site/IndexShell";
import { EmbeddedVideo } from "@/components/landing/EmbeddedVideo";
import { pageAlternates } from "@/lib/seo";

export const metadata = {
  title: "Blog",
  description: "Long-form pieces on AI / data / ontology — the commercial thesis, the critique of mainstream Agentic Data Analyst, and the emerging Business Ontology Engineer role.",
  alternates: pageAlternates({ enPath: "/blog", lang: "en" }),
};

export default function BlogIndex() {
  return (
    <IndexShell
      sectionLabel="blog"
      title="Blog"
      lede="Long-form thinking on AI / data / ontology. Not product updates — the underlying arguments. All pieces are CC-BY licensed."
      entries={blogCatalog.en}
      basePath="/blog"
      backHref="/"
      backLabel="Back home"
      topSlot={<EmbeddedVideo lang="en" />}
    />
  );
}
