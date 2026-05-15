import Link from "next/link";
import { pageAlternates } from "@/lib/seo";

export const metadata = {
  title: "文档",
  description: "text2ontology 用户文档 —— 建设中。",
  alternates: pageAlternates({ enPath: "/docs", lang: "zh" }),
};

export default function DocsIndexZh() {
  return (
    <main className="min-h-screen pt-24">
      <section className="mx-auto max-w-[820px] px-6 py-16">
        <div className="mb-10 flex items-center gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            ▼// 文档
          </span>
          <span className="status-block status-block-accent">建设中</span>
        </div>

        <h1 className="mb-8 font-sans text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[0.95] tracking-tight text-ink">
          文档
        </h1>

        <p className="mb-6 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
          用户文档建设中。这一栏最终会按"实际触碰它的顺序"放:安装、首次配置、本体构建、Agent 模式 reference。
        </p>

        <p className="mb-12 max-w-[640px] font-mono text-sm leading-relaxed text-text-soft">
          在那之前,GitHub 仓库的 README 涵盖安装步骤;架构深度文住在{" "}
          <Link
            href="/zh/blog/"
            className="border-b border-text-ghost text-ink hover:border-accent hover:text-accent"
          >
            博客
          </Link>{" "}
          —— 想理解系统怎么搭起来的,从{" "}
          <Link
            href="/zh/blog/design-philosophy/"
            className="border-b border-text-ghost text-ink hover:border-accent hover:text-accent"
          >
            设计哲学
          </Link>{" "}
          开始读。
        </p>

        <div className="mb-12 border-2 border-ink bg-canvas-alt p-6">
          <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-text-ghost">
            // 这一栏的形态
          </div>
          <p className="font-mono text-xs leading-relaxed text-text">
            这一栏写完之后想长成的样子:
          </p>
          <ul className="mt-4 space-y-2 font-mono text-xs leading-relaxed text-text">
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              01 — 安装与首次启动
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              02 — 接入数据源(PBIT / Excel / Postgres / SQLite)
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              03 — Builder 模式:用人话把业务讲给 Agent 听
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              04 — Curate 本体(关键词、Intent、别名)
            </li>
            <li className="relative pl-6 before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-accent before:content-['']">
              05 — 开始提问;错了在"地址"那里修
            </li>
          </ul>
        </div>

        <div className="border-t border-border pt-8">
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
