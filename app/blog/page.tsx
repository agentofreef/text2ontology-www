import { blogCatalog } from "@/lib/content";
import { IndexShell } from "@/components/site/IndexShell";

export const metadata = {
  title: "Blog",
  description: "Long-form pieces on AI / data / ontology — the commercial thesis, the critique of mainstream Agentic Data Analyst, and the emerging Business Ontology Engineer role.",
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
    />
  );
}
