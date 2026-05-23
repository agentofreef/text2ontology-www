# Step 3 · Question Sets

> Define the correct answers that measure success, run your first pass, and why tokenization is the first thing you check.

---

With data connected and the ontology built, how do you know the system actually answers right? With a **question set**.

> A question set is the **key metric** for whether the whole system succeeds — and how you define the ground-truth standard.

## What a question set is

It's simpler than it sounds. A question set is a set of pairs:

> **a "correct answer" ↔ an "example instance of that correct answer".**

That is: for a class of question, what result the organization's consensus says it *should* return (the correct answer), paired with a concrete example. This step is, at heart, writing down "what counts as correct" — the same discipline as writing down "what the concept means" in [Step 2](/docs/builder-mode/).

In the system, question sets live under **Agent → Dataset Testing** (`/ontology/lakehouse-agent/dataset-testing`): you build named test suites, run them in the background, and diff run-over-run.

## The first pass

1. Load the question set into the system.
2. Run it once.

**Before you run, set an expectation: the first pass will probably be poor.** The reason is simple — **the LLM most likely doesn't yet understand the specific keywords in your question.**

So **don't chase accuracy yet.** After the first pass, what you should do is **check the tokenization** (below) — confirm the system actually "understood" the words you asked. Once tokenization is right, run a second pass — accuracy will be **much** higher than the first.

## Why tokenization comes first

Across the whole system, **tokenization is the linchpin**: more than 60% of the pipeline depends on it.

Its core logic: **use the LLM to explain what keywords are actually involved in your question.**

When the LLM correctly extracts those keywords, the system and the Agent understand them better; **through those keywords the system reverse-infers the ontology (OD) and the OD's properties** behind your question. Get the keywords wrong and everything downstream is wrong.

Where to look:

- **Agent → Token Recall** (`/ontology/lakehouse-agent/token-recall`) — replay "how this sentence tokenized and what it recalled."
- **Knowledge Engineering → Keyword Triage** (`/ontology/lakehouse-keyword-triage`) — fix tokenization: add missing words, fix aliases, adjust metric priority.

## After it runs

At this point the whole system basically runs. The rest is going back into the debug loop and calibrating continuously. The full debug decision tree (tokenization → OD → descriptions → table / SQL / keys) is in **[The Debug Loop](/docs/correction-flywheel/)**.
