# The Correction Flywheel

> Every wrong answer has an address. Where to open it, fix it once, and stop seeing the same error.

---

When an answer is wrong, don't retry or re-prompt — fix it at the right **address**. The relevant pages are all in the sidebar.

## Symptom → where to fix

| Symptom | Where to fix | Page |
|---|---|---|
| Tokenization wrong / a word isn't understood | **Keyword Triage**: add missing keywords, fix aliases, adjust metric priority | `Knowledge Engineering → Keyword Triage` (`/ontology/lakehouse-keyword-triage`) |
| No existing Metric covers an analytical dimension | **Metrics**: create a brand-new metric (measure / filters / auto-group-by / pivot) | `Knowledge Engineering → Metrics` (`/ontology/lakehouse-metric-intents`) |
| Add / edit / remove keywords | **Keywords** | `Knowledge Engineering → Keywords` (`/ontology/lakehouse-keywords`) |
| See "how this sentence tokenized + what it recalled" | **Token Recall**: replay recall, locate which tier (EXACT/FUZZY/VEC) and which keyword | `Agent → Token Recall` (`/ontology/lakehouse-agent/token-recall`) |
| Annotate a token decision of an agent run | **Annotations** | `Agent → Annotations` (`/ontology/lakehouse-agent/annotations`) |
| Facts the AI learned in conversation (OL) | **Learned Knowledge** | `Agent → Learned Knowledge` (`/ontology/lakehouse-agent/knowledge-learned`) |
| Regression-test a set of questions, diff across versions | **Dataset Testing**: named suites, background runner, run-over-run diff | `Agent → Dataset Testing` (`/ontology/lakehouse-agent/dataset-testing`) |

## This is the biggest difference from traditional BI

You **curate, annotate, activate**. It does not fall out of the box in fifteen minutes.

What that buys you: **once an answer is fixed, it stays fixed** — because the error has an address, you fix it there, and the same shape of mistake doesn't return next week. Traditional BI doesn't give you that.

## The two most-used correction paths

In the project's own words:

> - The **Keyword Triage page** is where you fix tokenization — making sure the LLM sees the words the way your team uses them.
> - The **Metrics page** is where you add a brand-new analytical dimension when none of the existing Metrics cover it.

## Other tool pages

- **Chat History** (`/ontology/lakehouse-agent/history`)
- **Data Flywheel** (`/ontology/lakehouse-agent/flywheel`)
- Under SQL: **Ontology SQL** (`/ontology/sql-passthrough`) and **Lakehouse SQL** (`/ontology/lakehouse-sql`) for advanced users.

Full map in **[Interface Reference](/docs/interface-reference/)**.
