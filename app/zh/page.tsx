import { Hero } from "@/components/landing/Hero";
import { SectionVideo } from "@/components/landing/SectionVideo";
import { SectionProblem } from "@/components/landing/SectionProblem";
import { SectionBeliefs } from "@/components/landing/SectionBeliefs";
import { SectionFlow } from "@/components/landing/SectionFlow";
import { SectionShipped } from "@/components/landing/SectionShipped";
import { SectionStart } from "@/components/landing/SectionStart";
import { pageAlternates } from "@/lib/seo";

/**
 * 中文 landing. Same component graph as / (English), just with lang="zh".
 * Static export emits this to /zh/index.html.
 */
export const metadata = {
  title: "TEXT2ONTOLOGY — 本体先于查询",
  description:
    "LLM 驱动数据分析,组织维护本体,LLM 只往意图模板里填参数。每个错误都有地址。",
  alternates: pageAlternates({ enPath: "", lang: "zh" }),
};

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero lang="zh" />
      <SectionVideo lang="zh" />
      <SectionProblem lang="zh" />
      <SectionBeliefs lang="zh" />
      <SectionFlow lang="zh" />
      <SectionShipped lang="zh" />
      <SectionStart lang="zh" />
    </main>
  );
}
