# Setup & Collaboration

> The three-step setup — data, ontology, question set — and how business and technical people divide and share the work.

---

Getting a text2ontology instance running is, at heart, three steps:

1. **Data source** — connect your data correctly.
2. **Ontology (business logic)** — turn "what business concepts this scenario actually analyzes, and what data describes them" into an ontology.
3. **Question set** — prepare a set of *correct answers* that measure whether the system actually answers right.

Of the three, **Step 2 is the core**, and it's the one place where **a business person and a technical person have to sit down together.** Understand who owns what and the rest follows.

## Who owns what (the collaboration)

In one line: **the business person owns *meaning*, the technical person owns the *data plumbing*, and the natural-language descriptions are the bridge between them.**

| Step | Business person owns | Technical person owns |
|---|---|---|
| **1 Data source** | what data exists, where it comes from | connect + configure the source (PBIX / PBIT / Excel / Postgres / SQLite) |
| **2 Ontology** | which **business concepts** this scenario has, each concept's **dimensions**, the **relationships** between concepts — and **what each concept and dimension actually means** (natural-language descriptions) | map each concept to **one table + one semantic_sql**; dimensions to **columns**; relationships to **primary/foreign keys (join keys)**; mark semantics-free columns (machine codes, timestamps, phone numbers) as **Machine Code** |
| **3 Question set** | define the **correct answers** — what, under organizational consensus, this question *should* return (the ground-truth standard) | load the question set, run it, read the tokenization, walk the debug loop |

> This is exactly where the [**Business Ontology Engineer**](/blog/business-ontology-engineer/) role comes from: Step 2 needs someone who understands the business *and* can align with the technical side. In a small team that's one person; in a larger one it's a conversation between business and engineering, held around the ontology.

## The three steps at a glance

### Step 1 — Data source: how you know it's done

Connect your data and finish the connection config — that's Step 1 done. Every ingest goes through the single collector-server entry; once connected, the source flips to `ready`. See **[Step 1 · Connect Data Sources](/docs/data-sources/)**.

### Step 2 — Ontology: tell your business as data

This is the core. You answer: which business concepts does this scenario want to analyze? what data describes them? what dimensions does each concept have? what relationships exist between concepts?

Mapped into the system:

- **Each ontology (OD) = one business concept**
- **An OD's properties = the concept's dimensions** (at the data layer = the table's columns)
- **A relationship between ODs = a connection between concepts** (at the data layer = a primary/foreign key, the join key)
- **Each OD maps to one table** — think of it as a traditional-BI **semantic layer**, and each semantic layer has one SQL statement (`semantic_sql`, the "describe SQL") that **describes the data behind the OD**

Two more things after that: judge each column for **whether it carries meaning** (mark the ones that don't as Machine Code), and write **natural-language descriptions** of what each OD and each column means (at runtime this acts as the Agent's prompt).

> **Note**: Builder mode is currently **unreliable** — prefer **building the ontology by hand**.

See **[Step 2 · Ontology Modeling](/docs/builder-mode/)**.

### Step 3 — Question set: the ground-truth standard

A question set is simpler than it sounds: it's a set of pairs of a **correct answer** and an **example instance of that correct answer**. It is the key metric for whether the whole system succeeds.

When you load it and run the first pass, **expect it to be poor** — because the LLM probably doesn't yet understand the specific keywords in your questions. Don't chase accuracy first; **go check the tokenization**. See **[Step 3 · Question Sets](/docs/question-sets/)** and **[The Debug Loop](/docs/correction-flywheel/)**.

## Mindset: the first pass being wrong is normal

This system's intelligence is **accumulated**. Finishing the config is only the start; what makes it accurate is going back into the debug loop and **calibrating tokenization, ontology, and descriptions, pass after pass.** Check tokenization first — it decides 60%+ of the outcome.
