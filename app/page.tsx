import { Hero } from "@/components/landing/Hero";
import { SectionProblem } from "@/components/landing/SectionProblem";
import { SectionBeliefs } from "@/components/landing/SectionBeliefs";
import { SectionFlow } from "@/components/landing/SectionFlow";
import { SectionShipped } from "@/components/landing/SectionShipped";
import { SectionStart } from "@/components/landing/SectionStart";

/**
 * Landing page assembly. Five sections after the hero, telling the story in
 * the order:
 *   01 the problem  → why "AI + schema" doesn't work
 *   02 the position → three beliefs that drive the design
 *   03 the runtime  → six-step flow from question to answer
 *   04 shipped       → what you can actually run today
 *   05 start         → docker compose up + GitHub link
 */
export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <SectionProblem />
      <SectionBeliefs />
      <SectionFlow />
      <SectionShipped />
      <SectionStart />
    </main>
  );
}
