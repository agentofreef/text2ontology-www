import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

/**
 * /zh/docs placeholder — same shape as the English /docs/ but pointing at
 * the Chinese essays in the main repo.
 */
export const metadata = {
  title: "文档",
  description: "text2ontology 文档 —— 正在搭建中。",
};

const links = [
  {
    title: "宣言 —— 本体先于查询",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/manifesto/manifesto.zh.md",
    desc: "整套 thesis。为什么本体先于查询、为什么有界错误、为什么 Resolution 而不是 Discovery。",
  },
  {
    title: "设计哲学",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/spec/design-philosophy.zh.md",
    desc: "三层本体生命周期 + 两层查询架构 + 召回机制深度拆解。",
  },
  {
    title: "责任即利润率",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/responsibility-as-moat.zh.md",
    desc: "为什么 AI 企业服务的真正护城河是谁承担责任,而不是谁的模型更大。",
  },
  {
    title: "AI Agentic 错觉",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/ai-agentic-illusion.zh.md",
    desc: "为什么 \"AI Agentic Data Analyst\" 这个产品类目从概念框架开始就是错的 —— 五层拆解。",
  },
  {
    title: "业务本体工程师",
    href: "https://github.com/agentofreef/text2ontology/blob/main/docs/essays/business-ontology-engineer.zh.md",
    desc: "一个即将出现的新职业 —— 它在干什么、为什么不是任何现有 title、会在哪种公司里先出现。",
  },
];

export default function DocsLanding() {
  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[1100px] px-6 py-20">
        <div className="mb-12 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// 文档
          </span>
          <span className="status-block status-block-accent">搭建中</span>
        </div>

        <h1 className="mb-8 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-ink">
          文档
        </h1>

        <p className="mb-16 max-w-[680px] font-mono text-sm leading-relaxed text-text-soft">
          完整的 Fumadocs 文档站会在下个版本上线。在那之前,所有 essay + 设计笔记的中文版都住在 GitHub 仓库里:
        </p>

        <div className="grid gap-px bg-border md:grid-cols-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col bg-canvas p-8 hover:bg-canvas-alt"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <h2 className="font-sans text-lg font-semibold leading-tight tracking-tight text-ink group-hover:text-accent">
                  {l.title}
                </h2>
                <ArrowUpRight className="size-4 shrink-0 text-text-ghost group-hover:text-accent" />
              </div>
              <p className="font-mono text-xs leading-relaxed text-text-soft">
                {l.desc}
              </p>
            </a>
          ))}
        </div>

        <div className="mt-16 border-t border-border pt-8">
          <Link
            href="/zh/"
            className="font-mono text-xs uppercase tracking-[0.22em] text-text-soft hover:text-ink"
          >
            ← 返回首页
          </Link>
        </div>
      </section>
    </main>
  );
}
