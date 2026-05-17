# The Day Text-to-SQL Died

> My VP didn't say no. He said one sentence.

---

> "If a BERT query is accurate but doesn't generalize, and an LLM generalizes but isn't accurate — and you make me choose between them — I'll use neither."
>
> — My VP

It took me a year to get to the point where my VP could say that to me.

When I finally stood in front of that sentence, I thought I'd won. Our multi-table query accuracy had jumped from the low 40s to the mid 80s. The feedback I expected was "when can we ship it" — not this.

It took me three days to understand what he was actually saying. Once I did, the first principle of text2ontology appeared. But that comes later.

First, let me tell you how I got to that table.

---

## 1. Before LLMs: The Death of Text-to-API

The system was already running before I joined the company.

The problem it was built to solve fits in one sentence: **when an executive asks a question in a meeting, we need to be able to answer immediately.**

Here is a concrete shape of it: "Can we move project X's schedule forward?"

The question itself is simple, but you can't answer it. Not because the meeting room is tense, not because nobody collected the data — but because that one sentence **unfolds into N sub-questions**:

- What projects do we currently have?
- What are their current schedules?
- Do any of those schedules conflict?
- What are the upstream / downstream dependencies?
- Moving which one blocks which?

The domain I worked in looked like this: **hundreds of parallel projects, each threading through a dependency graph across dozens of tables, schedules dynamic, changes happening every day.** A single "can we move it forward" in a meeting is, underneath, a join across 5-10 tables plus a second layer of reasoning. Nobody can answer that in 30 seconds.

The company recognized early that this was a real problem. The system was already in progress before I joined — it's just that, back then, LLMs hadn't taken off yet.

The strategy at the time was called Text-to-API: a BERT model (a pre-LLM language model — good at "reading" — tokenizing, classifying, similarity — but it can't "write," can't generate full sentences; its ceiling is, given a finite vocabulary, picking the closest match) tokenized the user's question, the tokens were assembled into a JSON template, the template triggered a predefined API query, and the API returned a table.

Sounds elegant. The problem is it **had no generalization ability whatsoever** — BERT's ceiling is its vocabulary. The moment a user's question has one extra letter, one missing letter, a synonym, or an abbreviation, it fails to recognize it.

Here is an example everyone gets instantly (not our actual data — just the same shape of problem): the database says "iPhone 14", but the user might ask "Apple 14", or "ip14", or fat-finger it into "iphone4". All four point to the same row, but the BERT system 404s three of them.

Our real data is full of this shape. Every class of business object has an official spelling, a colloquial spelling, an abbreviated spelling, an internal-codename spelling, a legacy spelling — **five names pointing at one thing is the norm.** Every user of the BERT system had to first learn to "ask by the dictionary," or get nothing back.

We tried to rescue it with question rewriting — adding a rewriter before BERT to translate the user's words into something BERT could understand. Single-turn questions barely worked. But the moment context entered (the user asked about X last turn, this turn's pronoun refers to X), the rewriter collapsed.

This path died before I joined the company.

---

## 2. My First Week: Blocked by Two Walls

I joined right as ChatGPT took off.

Senior leadership's thinking was: if LLMs can apparently do anything, was the path we'd spent two years on wrong? Should we switch?

The first thing I did at the company was answer that question.

We took two steps and reached a cautious conclusion: **given enough correct context, an LLM can reason out a useful result inside our domain.** Not a strong conclusion, but enough to launch a new project. That new project was, at the time, simply called text-to-SQL — text2ontology was the next generation that grew much later; **its reason for existing is to solve the problems text-to-SQL avoided, or simply could not solve.** But that was a year or two away.

The new project hit a wall on day one. The wall had two layers.

**The first layer was compliance.** The company's data was sensitive; all models had to be deployed on-premise. **Any externally-called model — OpenAI, Anthropic, Google — was categorically not allowed.** That meant the strongest model I had was an open-source model that could run locally, quantized (compressing model weights from 16-bit floats to 8-bit — halving the VRAM, with a small accuracy drop) down to roughly 70B (a parameter count — an order of magnitude smaller than the strongest closed model OpenAI had at the time), occupying about 40GB of VRAM at FP8. A model at that tier is simply not in the same league as the strongest closed model of the day. Every optimistic conclusion of the form "a top closed model could do this given enough context" **had to be discounted** the moment it moved onto a local model.

**The second layer was data.** Good news and bad news arrived together:

- Good news: **we had a huge amount of product data and sales data.** Structured, clean, large.
- Bad news: **we had no business knowledge base of any kind.**

Back then, "business knowledge base" wasn't even a thing with a name. But the meaning was clear: **data alone won't make the system run.** Because the same data carries different definitions in the eyes of different business units; the same field means different things in different contexts; the same aggregation gives different numbers in different scenarios.

A concrete example: "number of products on sale" is defined differently by the sales team and the supply-chain team. The former counts "SKUs with a sales record in the last 30 days"; the latter counts "SKUs with current inventory greater than 0." Both queries are correct, both numbers are correct — but put them on the same dashboard and the VP asks: **"Which one is real?"**

That's not a data problem. It's a problem of **business knowledge never having been written down.** And back then, across the whole team, the whole domain, **nobody had ever written that knowledge down.**

So from day one, I was fighting "two nightmares" at once: **the model isn't strong enough + the knowledge hasn't been captured.** Together those two nightmares form a very particular kind of difficulty — not the "find the bug and you can fix it" kind, but a **structural difficulty that gets deeper with every step forward.**

---

## 3. The Keyword War

After abandoning Text-to-API, we pivoted to Text-to-SQL. The idea was plain: **let the LLM generate SQL directly, and we execute it.**

The first wrong turn was stuffing entire table schemas into the prompt. A few tables was fine; dozens of tables and the prompt blew up. And the LLM, seeing a pile of field names it didn't recognize (our field naming was half English abbreviations, half internal codenames), would pick fields at random. We didn't even get to the layer of **"accuracy"** — just the step of stuffing every relevant table's schema into the prompt already burst the context window of the local model of the day. Whether the SQL would even run was decided dead before that layer.

The second wrong turn was adding context. Single-turn was OK; multi-turn, the moment it involved pronoun resolution, implicit constraints, or re-filtering on the previous turn's result, the LLM started making things up.

But of all these wrong turns, **the most fatal wasn't the schema and wasn't the context — it was the keywords.**

Back to that iPhone 14 shape: the user asks "ip14 sales", the LLM generates `SELECT ... WHERE product = 'ip14'`, the database returns 0 rows — because the database says "iPhone 14".

The LLM doesn't know that mapping. The schema doesn't carry that mapping either. **It lives in the user's head.**

So we had to solve one thing first: **how does a keyword the user asks with become a value that actually exists in the database?**

This is the keyword recall problem. Looking back from 2026 it's mundane; at the time it was a mountain.

We tried three paths.

**1. jieba tokenization** (an open-source Chinese tokenizer, dictionary- and statistics-based, no AI). Fast, controllable, easy to debug. But it's dictionary-based — whether it tokenizes correctly depends entirely on whether the word is in the dictionary. Our company's product names were often a mix of English, digits, and Chinese, and jieba was simply stumped. Worse: **for questions that depend on human experience** (things like "recent", "key customers", "high priority") — jieba can split those words, but the split is meaningless, because their meaning lives in business knowledge, not in a dictionary. I still remember the afternoon jieba split a product codename into three fragments — that line of output sitting in the terminal, each fragment a "word" on its own, and together meaning nothing. That was the first time I knew, clearly: a dictionary-based path has no end in a domain that names things the way ours does.

**2. Training a BERT tokenization model.** Theoretically feasible — our domain had plenty of historical data. But in practice it got stuck on **the quality of the samples themselves** — the example questions our department had written into Excel sheets and the questions users actually asked were **worlds apart.** The example questions were "standard, compliant, by-the-dictionary"; the real questions were "colloquial, elliptical, ambiguous." A model trained on the former simply does not work in front of the latter. Add training cost and the deployment pipeline, and we PASSED on BERT.

**3. Using an LLM for tokenization plus RAG** (retrieval-augmented generation — fetch relevant material from a store first, then let the LLM answer based on that material). Let the LLM read the user's question and produce a keyword list directly. This was the only path that actually worked at the time. The LLM's language understanding was broad enough to cover mixed Chinese-English, typos, abbreviations, and colloquialisms.

After that step, **when the user asked in a relatively standard way — no abbreviations, no variants, no typos, phrased clearly — we'd nailed it.** Except we hadn't.

Because there was still one fatal problem: **the keyword the LLM extracts and the value in the database are semantically similar but literally different.** The LLM extracts "Apple 14"; the database has "iPhone 14." To a human these are the same thing; to SQL they are two different things.

Our first strategy was to dump every possible keyword into the final SQL-generating LLM step and let it judge for itself. It didn't work well. The model was too limited at the time — **you genuinely couldn't tell whether the LLM had misunderstood the prompt, or the prompt hadn't been clear.** Ask the same question twice and the two SQLs might be completely different; even within a single run, with temperature set to 0, the SQL still varied — because the local model's implementation wasn't that strict.

So we added **vector recall** (precompute every candidate term into a string of numbers, compute the numbers for the user's input at query time, and see which is closest — far more forgiving than literal matching). We precomputed a vector for every possible value in the database, computed a vector for every keyword extracted from the user's question, ran similarity, and substituted anything above a threshold.

This started to work. "Apple 14" and "iPhone 14" sit close in vector space — auto-substituted; "ip14" hits too. Only in rare cases did it go wrong (for instance, two genuinely different products in the domain sitting too close in vector space).

But this only cured the disease at **the keyword layer.** The disease of Text-to-SQL as a whole was far deeper.

---

## 4. The Multi-Table Collapse: The Stretch Where I Felt Despair

With keywords solved, we thought we could move forward.

Single-table queries did start to stabilize. The user asks "X product's Q3 sales" — we get it. "Aggregate the last year's sales by region" — we get it. These are single-table plus one or two aggregations; the LLM can handle them.

But the moment a question involved **three or more tables**, accuracy fell off a cliff.

Here is a real shape (details scrubbed): "the year-over-year change for a certain product category in our key regions last quarter, compared with the same period last year, excluding the effect of joint-venture categories."

That question unfolds into:

- Sales table × product table × region table × customer table × time table — 5 tables
- One time filter, one product-type filter, one region filter, one customer-type anti-filter
- One year-over-year comparison, one ratio computation
- And finally "exclude the effect of joint-venture categories" — this step needs business knowledge (what counts as a joint-venture category, how the effect is bounded)

Faced with that complexity, the LLM **writes SQL that looks right but is wrong 90% of the time.** The ways it goes wrong are varied: the JOIN relationship is wrong, hanging the sales figure off the wrong product; the filter is misplaced, sliding "last quarter" into a subquery; the aggregation grain is wrong, missing a GROUP BY that should be there or a DISTINCT that should be there.

Worse: **the LLM bullshits with a straight face.**

It gives you a complete, very reasonable-looking answer: "a certain product category in the key regions declined 8.3% year-over-year last quarter." The number is precise to one decimal place, looks airtight. You believe it.

But you go back to the DB and query the same definition by hand — and the real number is 11.7%, a decline nearly 50% larger than what the LLM said.

Worse still, the LLM's summarization step went wrong constantly: the SQL computed 11827, the LLM wrote 11000 in the summary; you ask it to "keep two decimal places," it gives you three; ask the same question a second time and the number drifts from 11000 to 11250 — still nowhere near the real 11827.

This isn't a bug. It's the nature of an LLM. At generation time, an LLM **does not distinguish "a fact it knows" from "a plausible shape it made up."** With no strong constraints, it gives you **the most answer-shaped response**, not **the correct response.**

At this stage, **the whole system had degraded from "AI data analysis" into "a faster lookup tool"** — it could get you a number a little faster than hand-writing SQL, but you couldn't trust that number; you had to go back and verify every single one by hand. And once you have to verify every number, the system's reason for existing drops to zero.

What I felt during that stretch wasn't technical frustration. It was despair.

> **If the numbers are only roughly right, why should anyone trust the analysis?**
>
> The question I asked myself most that year.

---

## 5. DeepSeek and the Architectural Pivot

In the middle of the despair, DeepSeek v3 burst onto the scene.

We couldn't deploy the full v3, but we deployed a distilled version (distillation is using a large model as a teacher to train a small one, yielding a version that's "small but acts large") — specifically Qwen2.5 distilled from DeepSeek reasoning, 32B. The company also added a few more GPUs.

In raw capability, this was the strongest reasoning model we could run locally at the time. But upgrading the model alone doesn't solve the root problem. We decided to **redo the architecture.**

The core idea of the new architecture — also the prototype of text2ontology's current form — was this:

**Treat the database itself as something to be metadata-ized.**

More concretely: for every table, every column, every unique value in every column, **register a copy ahead of time in a separate structure outside the database.** That registry isn't the SQL schema; it's more structured, searchable metadata — what the table is, what the column is, what unique values the column holds, and what business relationships values have with one another.

At query time, **the LLM no longer freely writes SQL.** The flow runs in reverse:

1. The user asks a question
2. Tokenize — extract the key candidates from the question (product names, customer names, time ranges, action verbs, etc.)
3. Key candidates → vector recall → hit the specific unique values in the database
4. Unique value → infer which column it belongs to
5. Column → infer which table it belongs to
6. Once the few tables are determined, **the join relationships between tables are predefined and fixed**
7. Assemble all of this into a very lean prompt, **containing only what this particular question actually needs**, and hand it to the LLM to generate SQL
8. Execute the SQL, return the result

The beauty of this flow: **the prompt the LLM sees is tiny, but every line of it is precise.** Before, we dumped the whole data dictionary on it and let it pick; now I pick first, and leave only what's relevant.

And more importantly: **the JOIN relationships are predefined.** The LLM no longer has the chance to pick joins wrong. We hard-wired, in advance, "the sales table joins the product table on product_id, the customer table on customer_id, the region table on region_code." The LLM only has to decide WHERE and GROUP BY; the JOINs are out of its hands.

The result: **multi-table query accuracy jumped from a sorry low-40s to the mid-80s.**

Two costs:

1. **Heavily dependent on tokenization** — if tokenization extracts the wrong keyword, the entire downstream chain is wrong
2. **The database design has to be standard enough** — if the schema naming is a mess, foreign keys are missing, or a column is stuffed with multiple semantics, the metadata-ization built on top is itself wrong

But with that accuracy, we'd finally clawed our way to the point of being able to demo to the VP.

---

## 6. My VP's One Sentence

The VP watched the demo. He didn't reject the path, and he didn't say "when can we ship it."

He said only one sentence:

> **"If a BERT query is accurate but doesn't generalize, and an LLM generalizes but isn't accurate — and you make me choose between them — I'll use neither."**

I didn't catch that sentence in the moment. **It was walking out of the meeting room, riding home, that I realized he was saying a third thing.**

I had been treating BERT and the LLM as two options to compare — which is more accurate, which generalizes better. The VP wasn't talking to me at the option layer at all.

The VP wasn't comparing BERT and the LLM. The VP was saying: **neither one can be used, because neither one solves the problem he actually cares about.**

The problem he actually cares about is — once this system ships, an executive makes a decision based on a wrong number, and **who is accountable?**

BERT won't do, because it's accurate but can't answer most real questions — 80% of the queries get a flat 404. The LLM won't do, because it can answer most questions but 20% of the answers are wrong — and **that 20% looks exactly like the other 80%.** From the outside, you can't tell them apart.

The VP didn't care whether it was 80% accurate or 90%. What he cared about was that a system in the "80% accurate" class **can't ship** — because he doesn't know which 20% is wrong, doesn't know why it's wrong, and doesn't even know whether it'll be wrong the next time someone asks the same question.

On that ride home, I worked out three things.

**First:** the VP was right. In a zero-tolerance domain like ours, 80% accuracy isn't a product — it's a draft that will forever need a human to re-check. It saves no labor at all. It just swaps "writing SQL by hand" for "reading SQL and correcting SQL," and adds a layer of psychological burden: "do I have to trust the LLM?"

**Second:** the real problem isn't that accuracy isn't high enough. It's that **when it's wrong, there's no way to locate the fault.** The nature of an LLM makes 100% accuracy impossible — **any LLM-based system will make mistakes; that is a fact you cannot eliminate.** But **whether you can find the mistake when it happens is something you can design for.** Nobody had ever put it to me that way before.

**Third:** to make "you can find the mistake" possible, you need two things:

> 1. **The same question must produce the same SQL** — otherwise a bug can't be reproduced, and what can't be reproduced can't be debugged
> 2. **There must be a standard spec for the metadata / knowledge base** — otherwise you can't even define "what is correct," let alone find what's wrong

Those two conclusions are **text2ontology's first principles.**

---

## 7. Birth

Later, those two became:

**1. The same question, under the same ontology, must produce the same query.** This one eventually grew into the "two-level query" — the upper level is the Intent (a canonical query template), the lower level is the properties on an OD. The LLM only fills parameters; it does not write SQL. When something is wrong, **the SQL is fixed, so the error can only be in Intent selection or parameter filling — the search space has shrunk by an order of magnitude.**

Look back at §4 — the multi-table collapse. The LLM, facing 5 tables and having to write SQL across them, was wrong 90% of the time. The ontology flips this completely: **the Links between ODs are maintained by the organization in advance — the LLM does not reason them out on the fly**. The LLM no longer sees "5 tables"; it sees **5 OD nodes that are already connected to each other**. Its job shrinks to picking from three **finite sets**:

- pick the ODs this question involves, from the OD network
- pick one Intent, from those bound to the selected ODs
- pick a few Keywords as parameters, recalled from the user's question

Once those three picks are made, **the LLM's job is over**. The SQL is assembled by the downstream SmartQuery engine, following the Links between ODs — a deterministic piece of backend code, no LLM involved. **The LLM never sees a JOIN, and never "decides" which tables to use**. The multi-table problem is not solved by making the LLM smarter — it is **removed from the LLM's field of view entirely**.

**2. There must be a standard metadata spec.** This one grew into 7 core concepts — OD (objects), OK (knowledge), OL (operational facts), Link (relationships between objects), Causality, Intent (query intent), Keyword (trigger words). Each corresponds to a concrete shape of business knowledge that had been overlooked before — what each concept is responsible for is broken down one by one in the *Design Philosophy* essay.

That day, I only saw two principles clearly. The other five were **forced out** by different facets of the business over the following two years — each corresponding to another small death-day of "I thought we'd solved it, but the VP / a user / the data told us we hadn't." Each of those stories deserves its own essay; there's no room here.

---

## 8. Looking Back: Three Sentences I Want to Leave the Reader

Looking back after writing this essay, I want to compress that year into three sentences.

**One:** every failure in the "AI + data" race over the past few years **was not caused by the model not being strong enough.** Even if you handed me the strongest closed model in the world to run locally, this path still wouldn't work. The problem is in the **architecture**, not the **compute.**

**Two:** letting an LLM freely write SQL works in high-tolerance domains (toy demos, personal assistants, little blog widgets); in a zero-tolerance enterprise domain, it should never have been allowed from day one. **The LLM must only fill parameters, not write SQL.** That is the precondition for accountability to be distributable.

**Three:** business knowledge (definitions, conventions, name mappings, dependency graphs) is not something an LLM can "learn" its way to — it is something the organization **must capture.** If you don't capture it, the LLM makes one up; and what the LLM makes up, in an enterprise domain, is a time bomb.

text2ontology, this project, was built from day one so that an organization can **easily capture business knowledge, easily locate errors, and easily keep the LLM in the cage where it belongs.**

It does not pretend to have solved the problem of 100% accuracy. It solves a different thing: **when it's wrong, you can find where it went wrong.**

After that one sentence from my VP, I've been making this bet for two years.

I'm still betting in the same direction.

---

> This essay is part of the [text2ontology](https://github.com/agentofreef/text2ontology) series:
> - **War story**: this essay ★
> - Technical thesis: [*Ontology Before Query*](/manifesto/)
> - Commercial thesis: [*Responsibility as Moat*](/blog/responsibility-as-moat/)
> - Counter-narrative: [*"AI Agentic Data Analyst" is the most expensive illusion of 2026*](/blog/ai-agentic-illusion/)
> - Role definition: [*Business Ontology Engineer*](/blog/business-ontology-engineer/)
> - Design philosophy: [*text2ontology Design Philosophy*](/blog/design-philosophy/)
>
> Licensed under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).
