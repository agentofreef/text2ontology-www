# Builder Mode: Model Your Business

> Walk the agent through your business in plain language, review the draft ontology, and activate it.

---

Once data is ingested, the ontology is still *draft-grade*. Open **Agent → Lakehouse Agent**, switch to **builder mode**, and walk the agent through your business in **plain language**.

## How it works

- The agent is **interview-driven**: it asks clarifying questions and won't start proposing until a **≥3-turn interview gate** is met — this is to surface the implicit consensus in people's heads, not to be bureaucratic.
- The OD / Metric / Link it produces are **drafts (`mark=false`)** and **must be activated by a human** to take effect (the `mark=false → human activate` lifecycle).
- **Read it before activating anything.**

## A useful test

If you can't explain to a colleague why a particular OD or Metric should exist, that usually means the conversation upstairs isn't done — and that's where to stop, not to rush activation.

> This "AI proposes → human activates" shape is the same as Palantir Foundry's Branch / Proposal flow, simplified.

## Where to view the ontology

See and manage your ODs and their property graph under **Data Assets → Ontology** (`/ontology/lakehouse-objects`).

Remember the three hard invariants (see [Core Concepts](/docs/core-concepts/)): **you need at least one active OD; every active OD has exactly one semantic_sql; multiple active ODs may not be islands (each must connect via an active Link).** These are enforced by the architecture — you can't bypass them at activation.

Once you've modeled and activated, you can **[ask questions](/docs/query-mode/)**.
