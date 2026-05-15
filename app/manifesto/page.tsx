import { loadAndRender } from "@/lib/content";
import { DocShell } from "@/components/site/DocShell";

export const metadata = {
  title: "Manifesto — Ontology Before Query",
  description:
    "The thesis: LLM-driven analysis should fill parameters into intent templates the organization maintains. Why ontology-first, why bounded error, why Resolution over Discovery.",
};

export default function ManifestoPage() {
  const html = loadAndRender("en", "manifesto", "manifesto");
  return (
    <DocShell
      sectionLabel="manifesto"
      backHref="/"
      backLabel="Back home"
      title="Ontology Before Query"
      subtitle="The thesis. Why LLM-driven analysis should fill parameters into intent templates the organization maintains — and what that buys you."
      html={html}
    />
  );
}
