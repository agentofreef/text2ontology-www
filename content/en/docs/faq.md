# Before You Start

> Honest expectations: this is not black-box magic, and four questions worth sitting with first.

---

## One honest paragraph

Most "AI agent + your database" products run on an unspoken assumption: that **schema metadata plus an LLM is enough to answer business questions.** We spent a long time trying to make that work — in different shapes, on different stacks — and watched it break the same way every time.

**Schema doesn't carry meaning.** `INFORMATION_SCHEMA.COLUMNS` doesn't know "early order" is `status='CONFIRMED'` in your company and `IN ('CONFIRMED','SHIPPED')` elsewhere; doesn't know the Q1 cut-off is the 14th, not the 15th; doesn't know which customers got misclassified after the 2025 migration. Those things live in people's heads, in audit history, in exception lists nobody wrote down — and an LLM staring at columns can't recover them.

So this system is the inverse of the usual pitch: **the organization slowly accumulates a curated ontology, and the AI just reads it.** Not auto-learning. The closer analogy is onboarding a new analyst — one who, once you've explained something, doesn't forget.

## Four questions worth sitting with first

Not requirements — the system starts up either way. But these are where people bump into the same wall.

1. What does your business actually do, and what do you want from AI analysis that you can't get today?
2. How clean is the data source? Half-migrated columns, broken FKs, things you've meant to fix for two quarters?
3. Are you ok writing the basics down — what "early order" means, which field defines "core customer", where the Q1 cut-off sits?
4. Has the knowledge in your team's heads — definitions, exception rules, calibration notes — been written somewhere shared?

If any feel fuzzy, that's usually the most useful place to start — not because the system demands it, but because that's where the time goes.

## FAQ

### How is this different from Text2SQL / "AI chat with your data"?

Text2SQL lets the LLM write SQL directly — unbounded, unlocalizable, irreproducible errors. The ontology path lets the LLM only pick from finite sets and fill parameters, with SQL assembled by a deterministic engine — bounded, localizable, reproducible. See [Introduction](/docs/introduction/).

### Is it accurate?

It doesn't promise "right the first time." It promises **consistency** (same question, same answer) and **correctability** (errors have an address; fix once, fixed forever). Accuracy is **accumulated**, not granted by the model.

### Can numbers be fabricated?

No. The LLM never writes a number across the tool chain — it emits structural pointers that a mechanical layer resolves to true values. See [Query Mode](/docs/query-mode/).

### How is it heavier than traditional BI?

You curate / annotate / activate; it isn't open-the-box-in-fifteen-minutes. What you get back is "once it's fixed, it stays fixed." See [The Correction Flywheel](/docs/correction-flywheel/).

---

> If this sounds like a fit for the shape of work you do, we'd be glad to have you use it. If you're hoping for a black-box magic answer, you might be happier with something else — and that's an honest call, not a put-down.
