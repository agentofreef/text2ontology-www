# Step 3 · Question Sets

> Define the correct answers that measure success, run your first pass, and why tokenization is the first thing you check.

---

With data connected and the ontology built, how do you know the system actually answers right? With a **question set**.

> A question set is the **key metric** for whether the whole system succeeds — and how you define the ground-truth standard.

## First, the idea: it's the oracle you build for data analysis

Go back to the core belief from the [Introduction](/docs/introduction/) — **data analysis has no natural oracle.** Code converges because the test suite *is* the oracle: run it, pass/fail, iterate. Data analysis never had that, which is why models stall at the demo.

A question set is **the oracle you build by hand.** It's the same object an engineer's test suite is: you write down "for this question, what the organization's consensus says the answer should be," and for the first time the system has a standard it can check against, again and again. Step 2 legislated *what a concept means*; this step legislates *what counts as correct* — the same discipline, a different target.

## What it looks like in the system

In the product, question sets live under **Agent → Dataset Testing** (`/ontology/lakehouse-agent/dataset-testing`). The UI calls it **"Dataset Testing / test set,"** and it has three layers worth keeping straight:

| Layer | What it is | The key point |
|---|---|---|
| **Test set** (suite) | A named collection of cases | One per scenario, e.g. "Sales v1" |
| **Case / question** | One natural-language question | Can carry an **expected answer** (what consensus says it should return — a human-written ground truth) |
| **Run** (version run) | One execution of the whole set | **Bound to a specific LLM config**; named and comparable |

There's a design choice here that's easy to miss but matters a lot: **a run replays every question faithfully** — down exactly the same path a live question takes (force-tokenize → three-tier recall → only the `lookup` + `smartquery` tools, SmartQuery stitches the SQL). So a test isn't a separate validation harness; it's a **replica of the live question**. It tests the very thing your users hit.

When a case finishes, the system keeps the scene: every tool-call round, the `generated_sql`, the execution result, the final answer, duration / model / tokens. **That scene is exactly the evidence you'll need when it's wrong** — testing and debugging are the same panel here.

## How right/wrong is decided — and why this way

This is the counterintuitive part: **the system does not score automatically.** A finished case starts as "pending." A verdict comes one of two ways:

| Verdict | How | Good for |
|---|---|---|
| **Manual** | You read the answer, click correct / incorrect | Small sets, or when you want to judge it yourself |
| **AI judge** | An LLM reviewer compares the final answer against your **expected answer** (fed the same recall context the live Agent saw, so it can assess semantic equivalence) and returns correct / incorrect / unknown | Larger sets, a batch sweep |

**Why not just compute a score?** Because of that same belief: a business question is **under-determined** — "correct" means "consistent with the organization's consensus," not "matching some objective truth" (see the Introduction, *consistency, not correctness*). If "correct" is **specified** by consensus, then *judging* correctness has to be legislated too — either you judge it, or you hand it to a reviewer that is **constrained by, and holding, your expected answer.** The system won't fake an objective score it doesn't have. That is the deepest difference between this and a tool that just flashes an accuracy number at you.

## Run compare: you can watch the ratchet

A question set's real power shows up **between versions.**

After you change an OD, a Metric, or the tokenization, **run a new version**, then use **N-way compare** to set two runs side by side and read the per-question diff. Because every run **pins the LLM config it used**, you can cleanly separate two things: did this get better/worse because of **the ontology you changed**, or because you **swapped the model**? — a distinction the "chat with your database" black box can't make at all.

And more importantly: a question you fixed in the last version is **still right** in the next one. The ratchet — *fix it once, it doesn't regress* — isn't something you take on faith; you **see it, cell by cell**, in the compare view.

## The first pass

1. Load the question set (add cases by hand, or import CSV / Excel).
2. Create a run and execute it once.

**Before you run, set an expectation: the first pass will probably be poor.** The reason is simple — **the LLM most likely doesn't yet understand the specific keywords in your question.**

So **don't chase accuracy yet — and don't rush to mark right/wrong.** After the first pass, what you should do is **check the tokenization** (below) — confirm the system actually "understood" the words you asked. Once tokenization is right, run a second version — accuracy will be **much** higher than the first.

## Why tokenization comes first

Across the whole system, **tokenization is the linchpin**: more than 60% of the pipeline depends on it.

Its core logic: **use the LLM to explain what keywords are actually involved in your question.**

When the LLM correctly extracts those keywords, the system and the Agent understand them better; **through those keywords the system reverse-infers the ontology (OD) and the OD's properties** behind your question. Get the keywords wrong and everything downstream is wrong.

Where to look:

- **Agent → Token Recall** (`/ontology/lakehouse-agent/token-recall`) — replay "how this sentence tokenized and what it recalled."
- **Knowledge Engineering → Keyword Triage** (`/ontology/lakehouse-keyword-triage`) — fix tokenization: add missing words, fix aliases, adjust metric priority.

> Tip: every case you run deposits its tokenization as an **annotation** (`/ontology/lakehouse-agent/annotations`). **Confirm** the good ones and they feed back as few-shots for the next tokenization — the quiet channel through which a question set makes the system sharper the more it's used.

## After it runs

At this point the whole system basically runs. The rest is turning "run → judge → find the wrong one → fix it in place → re-run and compare" into a habit — which is [The Debug Loop](/docs/correction-flywheel/). The question set gives you the **entry point** (which ones failed); the debug loop tells you **where each failure's address is, and how to fix it once so it doesn't come back.**
