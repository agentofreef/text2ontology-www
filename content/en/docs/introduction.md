# Introduction

> What text2ontology is, the problem it solves, and the one belief that explains every design decision.

---

## In one sentence

**text2ontology makes "natural language → data analysis" something you can be accountable for.**

Its root claim is a single line:

> **Don't let the LLM freely generate executable queries (SQL / DAX / Pandas / any DSL).** The LLM only **fills parameters** into a *metric template* the organization maintains; a **deterministic compiler** (the SmartQuery engine) assembles the real SQL along pre-defined ontology relationships.

The payoff — the **one thing it sells** — is that **when the AI gets an answer wrong, the error has an *address***: which metric, which alias, which causality edge. You open that one row, fix it once, and the same shape of error stops coming back. That is not something a bigger model gives you.

Who it's for: **people who have already tried Text2SQL / "AI chat with your data" and watched it crumble on column-name aliasing, KPI ambiguity, and the question "is this answer even correct?"** If you want a black box that emits magic answers, this system is probably not for you — we say that plainly.

## Why it's built this way

Three points. Understand them and every screen and action later makes sense.

### 1. Data analysis has no oracle

AI coding converges because **the test suite is the oracle**: write code → run tests → pass/fail → iterate.

**Data analysis has no such thing.** You ask "what's our early-order rate?", the model says "12.3%", and you have **no automated mechanism** to verify 12.3% is right — because whether "early order" means `status='CONFIRMED'` or `status IN ('CONFIRMED','SHIPPED')` is a consensus that lives in people's heads, not in any code or data.

> No oracle → the LLM cannot iteratively converge → it stays a demo forever.
> This is a **mathematical** limit, not a model-capability problem. No bigger model rescues it.

Our answer: **since there's no natural oracle, the organization builds a semantic one — and that oracle is the ontology.**

### 2. What's sold is consistency, not correctness

A business question like "what's the early-order rate?" is **under-determined**: early = confirmed / paid / shipped? denominator = touched / new / target customers? Each combination is a real number; **none of them is "the answer"** — each is one solution in a set.

The ontology does not do Discovery (find truth); it does **Resolution (specify consensus)**: pick one legal solution as the organization's standard, lock it, and ensure the **same question gets the same answer every time**.

> When an answer is "wrong", it's not "objectively wrong" — it's "inconsistent with current consensus" → change the ontology, and all future queries are corrected in lockstep.
> **What this system actually sells is governable organizational consensus, not a smarter AI.**

### 3. Bounded error is a different species from unbounded hallucination

This system does not claim it never errs. It claims its **error model is a different species from LLM hallucination**:

| Dimension | Text2SQL (LLM writes SQL) | text2ontology (ontology path) |
|---|---|---|
| Error space | Unbounded — any plausible SQL | Bounded — only from `aliases ∪ metric priority ∪ causality` |
| Localizable | No (LLM is a black box) | Yes — down to which recall tier and which keyword |
| Fix | Edit a prompt, impact unknown | Edit one row, bounded impact, all future queries fixed |
| Reproducible | No (non-deterministic) | Fully (fixed ontology snapshot → fixed SQL) |

> **Bounded error is acceptable error. Unbounded hallucination is not.**

## What to read next

- **[Core Concepts](/docs/core-concepts/)** — ontology, OD, Metric, Keyword, and the two agent modes. Learn these before you touch anything.
- **[Installation & First Boot](/docs/installation/)** — bring the whole stack up with one command.
- For the full thesis, see the [Manifesto](/manifesto/) and [Design Philosophy](/blog/design-philosophy/).
