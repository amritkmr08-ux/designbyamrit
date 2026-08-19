# Portfolio content, of record

Every line of copy on the published site, extracted from the HTML on
18 August 2026. If a page gets broken, rewritten badly,
or lost, the words are recoverable from here.

Regenerate this file any time with `python3 extract-content.py > CONTENT.md`.

---

## Facts and where they live

These are the claims a reader can check. Each one has been verified with Amrit or
traced to a source document. Do not soften, sharpen or relocate them without checking.

| Claim | Value | Source | Appears on |
|---|---|---|---|
| Review efficiency | 18% gain, measured after launch | Confirmed as a measured result, not a target | auto-extraction |
| Error rate | 15% reduction | Design Impact page of the AE deck | auto-extraction |
| Retention, before | 860 users; months 0-4: 79.8 / 30.5 / 22.7 / 14.8 / 5% | Heap, Sep 2023 to Jun 2024 | index, auto-extraction |
| Retention, after | 2,380 users; months 0-4: 74.8 / 29.7 / 23 / 22.3 / 23.1% | Heap, Sep 2024 to Jun 2025, captured 16 Jun 2025 | index, auto-extraction |
| Field count | 128 extracted fields per contract | Product screenshot | index, auto-extraction |
| Contract family scale | 340 statements of work | Prototype at real volume | index, contract-understanding |
| Radial layout failure | 606 nodes, 12% zoom to fit, 0 legible labels, 39.4ms frame | Instrumented in browser | index, contract-understanding |
| Amendment hunting | 15 to 45 minutes per contract review | Reported by enterprise legal teams | contract-understanding |
| Review-time target | ~40% reduction | A **target**, not a measured result. Must stay labelled as such | contract-understanding |
| Customers named | IBM, EY | Publicly referenceable Sirion customers | auto-extraction |
| Working group | 3-4 designers, 2-3 PMs, 4-5 engineers, plus legal SMEs | Amrit | index |
| Tenure | 13 years in design, 6+ in product, 5 at Sirion | Amrit | index |
| AI experience | 3 years designing AI-native experiences | Amrit | index |
| Glossary | ~60 terms, 5 sections, Version 1.0, 31 July 2026, Owner: Amrit Kumar | The glossary file itself | index |

### Credentials, and the exact wording they need

**Stanford is not in the credibility ticker, deliberately.** The certificate reads
*"Design Thinking: From Insights to Viability, Stanford Graduate School of Business"* and it is a
statement of completion for an online course. The site previously said "Stanford d.school", which is
a different school within the university, and sitting it in a ticker beside NIFT and XLRI implied
degree-level study. It now lives in the About facts block, worded in full:

> **Coursework**: Design Thinking: From Insights to Viability, Stanford Graduate School of Business (online)

The ticker holds proper nouns only, no keyword filler:
SirionLabs · Bharti Airtel · NIFT · XLRI · UX India 2023 · Design Up 2025

### Things that were deliberately removed, and must not come back

- **"$1.1B in contract value"**: prototype demo data, not an outcome
- **"4.2M support calls"** as an achievement: that was the problem, not the result
- **"10+ years"**, **"10K+ users"**: unsourced
- **"Shipped"** on contract-understanding: it is approved and prioritised, not in production
- **"Stanford d.school"**: wrong school, see above
- A claim that a node-link relationship graph was tested and rejected: it was shipped
- **"20% faster review"** as a hard result: it is a target

### Voice rules

- No em dashes anywhere. Colons, commas, full stops.
- One memorable line per section at most. Everything else explains the work plainly.
- No "statement, dramatic fragment, reversal" cadence. That reads as AI-written.
- Pre-launch work is labelled pre-launch. Targets are called targets. Recreated
  screens say so. Placeholder content is disclosed in the caption.
- "I" on decisions that were Amrit's. "We" only where it was genuinely collective.

### Layout measures

| Page | Body text | Figures | Feature |
|---|---|---|---|
| index | 700 | 1180 (wide) | 1280 (band) |
| contract-understanding | 700 | 1000 | 1120 (live prototype) |
| auto-extraction, intent-model, airtel | 720 (narrow) | 1080 (wrap) | — |

---

# index.html

**Page title:** Amrit Kumar · Product Designer, AI systems

**Meta description:** I design how humans and AI agents share judgment in enterprise work where decisions are hard and being wrong is expensive. Thirteen years in design, six in product.


### Designing trust into AI-powered workflows.

I design how humans and AI agents share judgment in enterprise work, especially where decisions are hard and being wrong is expensive.


## [section: band]

01 · Featured · System design


#### If the ground is folders, the AI is guessing. If the ground is relationships, the AI is reasoning.

A contract repository rebuilt from a storage hierarchy into a relationship model, so "which amendment applies to this SOW?" becomes something you read, not something you reconstruct.

Prototype, playing a recorded sequence


## [section: work]


**An AI extracts 128 fields. A lawyer still checks them.**

I redesigned this review workflow across three iterations, replacing the first two as we learned more from how it was actually used. Month-four retention went from 5% to 23%.


**The intent model**

When should an agent explain, suggest, act, or stay out of the way? A framework written for and presented to executive stakeholders as platform-wide direction.


**Support that answers before you ask**

Four million calls a year about a single issue. Redesigning self-service in a telecom app used by millions, predicting the question from behaviour instead of offering a menu.


## [section: nums]

5→23%

of users still returning to an AI review tool four months in, after I redesigned it. Early-month numbers barely moved, so the change was in retention rather than in how many people tried it.

Product analytics, two eight-month windows, captured June 2025.

13

years in design, six of them in product

3

years designing AI-native experiences

Millions

of users on work that shipped


## [section: influence]

Two decisions I helped change

Both of these were worked through with a group of roughly 3 to 4 designers, 2 to 3 product managers and 4 to 5 engineers, plus legal subject-matter experts. Neither was a decision I could make on my own.

01The product modelled where documents sit. I argued it had to model how contracts relate.

A parent document with children beneath it. Embedded in the product, standard across the category, and asked for by customers by name.

An amendment can govern several agreements, and a record can inherit from more than one instrument. Those relationships are many to many, which a tree structure cannot represent.

If the model is wrong, a user can misread their contractual position, and any AI reasoning built on that structure inherits the same error. Framing it that way moved the conversation from preference to risk, which is what changed people's minds.

Navigation separated from the relationship model: a flat list to move around in, explicit typed relationships underneath.

02A team was designing surfaces one at a time. I gave them a shared language, and it changed what they built.

Each surface treated as its own problem: design the chat, design the listing, design the procedure page. Nobody could settle which to build first.

I proposed three questions to ask of any surface instead: who starts the interaction, what the person is trying to do, and which surface should carry it.

It replaced the default assumption that AI belongs in a chat window, which is where most of these features end up by habit rather than by decision.

Listing and procedure surfaces were reclassified as discovery, which answered the sequencing question. Other designers used the same three questions when working through listing, procedure and homepage experiences. I wrote and maintain the team's glossary for agentic contract work, around sixty defined terms, so the language does not drift.


## [section: qband]

From a reviewer, after launch


> "The auto extraction module feels so simple now."

> — A legal reviewer on the auto extraction workflow


## [section: how]

I design AI products, and I use AI in the work itself, mostly to explore more directions than I otherwise could and to get something running in a browser early enough for it to be useful.

*[caption] Before any of the four steps below, this. Most of the hard decisions on a project are settled on a wall like this, weeks before anyone opens a design tool.*

01 Prototype


**Prototypes instead of mockups**

I build in HTML rather than linking static frames together. A branching graph holding 340 records behaves very differently at full volume than it does in a design tool, and the only way to find out is to load the data and look.

- family-graph-at-scale.html Does a many-to-many web stay readable at full volume?
- node-language-concept.html Can relationships replace folders as the storage model?
02 Measure


**Measuring before arguing**

My first relationship layout was radial, which is what these usually look like. Rather than argue about whether it worked, I instrumented it and ran it at full volume. The measurements settled it quickly.

Every record was on screen, and none of the labels could be read.

03 Explore


**Exploring more options**

Being able to build several structural options in an afternoon means the one I take into a review has been compared against alternatives, rather than being the first idea that seemed reasonable.

04 Judge


**Deciding what is right**

AI produces plausible options quickly. Working out which of them are actually correct, what to cut, and what I would not be comfortable defending, is still the part I have to do myself.

I removed several numbers from this site because I could not source them properly.


## [section: thinking]

What I keep coming back to


> I design the line where AI stops and a person decides.

An agent can be completely sure what the answer is and still not be entitled to act on it. Certainty belongs to the model; authority belongs to the person accountable for the outcome. Almost everything I design comes back to that distinction.


## [section: about]

My mission at Sirion has been simple: make complexity feel calm. Legal teams carry the weight of precision, and they don't have time to figure out an interface.

I came to product design the long way round: years in brand, creative direction and co-founding a denim label before moving into digital products. That history shows up in the work: I care as much about how something reads as how it functions. And I prototype in code, so ideas prove themselves in a browser rather than in a deck.

Design is personal for me. Being a father changed how I see it. I watch how naturally my daughter explores, where she gets confused, how she delights in small wins. That's the same lens I bring to work. When design steps back and lets someone move forward with confidence, that's when it's working.

Currently

Product Designer, SirionLabs, 5 years

Experience

13 years in design · 6+ in product

Focus

AI-native UX · Design systems

Recognition

Lightning Talk, UX India 2023 · Best AI-Driven Design Concept, Sirion 2024

Coursework

Design Thinking: From Insights to Viability, Stanford Graduate School of Business (online)

Community

Design Futures Collaboratory workshop, Design Up 2025

Based in

Noida, India


## [section: contact]


#### Let's build something that thinks.


---

# contract-understanding.html

**Page title:** Which amendment applies to this SOW? · Case study · Amrit Kumar

**Meta description:** One question a legal team asks dozens of times a week, that the system couldn't answer. Rebuilding a contract repository from folders into a relationship model: the ground AI has to stand on.

Case study


### One question. Our system couldn't answer it.

"Which amendment applies to this SOW?" A legal team asks it dozens of times a week. Answering it took folder navigation, file-name reading, notes checking, and eventually, asking someone who knows.

Role

Product Designer, owned the data model redesign

Context

Enterprise CLM platform · 2026

Focus

System design · AI enablement

Status

Current platform: approved, build prioritised · Next-gen: working prototype

If you read one thing

- Problem
- A legal team asks "which amendment applies to this SOW?" dozens of times a week. The system stored files in folders, so answering took half an hour of reconstruction.
- The fight
- The agreed direction was to improve the folder hierarchy. I argued the hierarchy was the problem: contract relationships are many to many, and a tree cannot express them.
- Why it mattered
- A wrong model does not just inconvenience a user. It makes the AI built on top of it confidently wrong.
- What changed
- The direction moved from improving the hierarchy to separating navigation from an explicit relationship model. Approved and prioritised for build.
- Hardest part
- Making it survive 340 statements of work. My first layout failed at 0 legible labels, so I replaced it.

## [section: problem]


#### The system showed a folder tree. Not an answer.

The folder tree isn't wrong. It stores what was put into it, correctly. But it was built to answer "where is this file?", and the question users actually ask is "what governs this contract?"

Those are different questions. The system answered only the first one.

What the system showed

▼ Counterparty

▼ Master Core Documents

MSA Contract.pdf

NDA Agreement.pdf

Service Level Agreement.pdf

▼ General Contract Terms

Terms Amendment 2024.pdf

▶ Amendments

▶ SOWs

…which of these applies to the Boston SOW?

What the user needed

SOW · Boston Mobile Platform

↳ Governed by

Master Service AgreementActive · governs 540 SOWs · 5 amendments

↳ Applied amendment

Amendment 4Modifies §4.2 · supersedes Amendment 2

Answered at a glance.

Recreated from the design; entity names illustrative.


## [section: workarounds]


#### When a system doesn't give users what they need, they build it themselves

Four patterns showed up repeatedly across enterprise legal teams. Each one is a user doing the system's job by hand.

MSA_v3_FINAL_governs_SOW-Boston_supersedes_Amend2_EXECUTED.pdf

The user needed to record a governing relationship, the SOW it applies to, and the amendment it supersedes. The system had no field for any of it. So it went into the file name.

Observed 01


**The file name becomes the data model**

Version, status and authority all encoded in a string, because there was nowhere else to put them.

Observed 02


**The relationship map lives somewhere else**

Confluence pages titled "Contract Family Structure." Excel sheets of parent–child relationships. Diagrams of which MSA governs which SOWs. The model users need already exists. They built it. It just sits alongside the product, maintained separately, going stale.

Observed 03


**The structure lives in one person's memory**

At one enterprise customer, a legal ops manager left, and her knowledge of which amendment applied to which SOW left with her. Her replacement needed weeks of handover. The knowledge existed. It was stored in a person, not a system.

Observed 04


**Amendment hunting eats the review**

Teams reported 15–45 minutes per contract review spent locating applicable amendments, cross-referencing dates and confirming what was actually in force. A question the system should answer in seconds took an expert half an hour, every time.


## [section: voices]


#### Everyone was describing the same gap

"The structure should clearly communicate agreements, documents, and their relationships. Today, that clarity is missing."

"Contracts are understood through what governs what, not through files."

"Amendments are often filed under SOWs, but they actually impact the MSA. That mismatch creates confusion."


## [section: language]


#### The language we use reveals the model we're in

Every internal description of the problem used storage vocabulary. That wasn't a naming issue. It was the model leaking into the words, and it told us what to change.

Folders model location. Contracts carry meaning. A folder can tell you where Amendment 4 is stored. It cannot tell you that Amendment 4 governs the Boston SOW, supersedes Amendment 2, and modifies section 4.2 of the master agreement.


## [section: decision]


#### The argument I had to win

It looked like a search problem. I tried what search offers: filters, OCR, indexing. None of it worked, because users weren't searching. They were reconstructing meaning.

That left a harder question, and it was not one I could decide. The established direction was to keep representing contracts as a parent document with children beneath it. It was already embedded in the product. Similar models exist across the category. Customers were asking for it by name.

The position

Improve the folder hierarchy. Faster, safer, shippable in weeks, familiar to every customer, and defensible on the grounds that the whole market works this way.

My objection

We were modelling where documents are stored, not how contracts legally relate.

Parent and child holds for some relationships and breaks for others. An amendment can govern several agreements at once. A record can inherit from more than one instrument. Those relationships are many to many, and a tree is structurally incapable of expressing them. Not inconvenient. Incapable.

The counter

Reasonable, and it was made: customers are asking for the hierarchy, they already understand it, and a data model rebuild is a large technical lift for a problem users have been working around for years. Why spend that to give people something they have not requested?

What moved it

Not a visual argument. The consequence of getting the model wrong.

If the product encodes the wrong relationship, a user can misread their own contractual position. And any AI reasoning built on that structure inherits the error and states it confidently. That turned a question of preference into a question of risk, which is a different conversation.

I prototyped the relationship model and several ways of representing it at realistic volume, so the argument could be tested rather than debated. The position was accepted. Instead of improving the hierarchy, the direction moved to separating navigation from the underlying relationship model: a flat list to move around in, explicit typed relationships underneath.

Contracts became entities with typed, explicit relationships: governs, modifies, applies to, supersedes. Documents stopped being the structure and became the evidence attached to it. Three layers, one model: structure surfaces authority, relationships show impact, documents provide proof.

Swipe to see the full diagram →

*[caption] The model. Three layers: structure surfaces authority, relationships carry impact, documents provide proof. Entity names illustrative.*

*[caption] The structure, authority-first: governing agreement → amendments → execution agreements → work orders. Every row carries its relationships on its face: "applies to 5 SOWs", "replaces 2 amendments", so the answer is read, not reconstructed. Design, not a production screenshot.*


## [section: ]


> If the ground is folders, the AI is guessing.If the ground is relationships, the AI is reasoning.


## [section: ai]


#### Why this was really an AI project

Without explicit relationships, a model asked "which amendment applies to the Boston SOW?" has to infer applicability every time, from retrieved documents, metadata and clause text. That inference can be good. It can't easily be shown, and a user who can't verify an answer eventually stops relying on it.

With human-verified relationships in place, applicability becomes an explicit traversal with traceable evidence: the SOW, its applied amendment edge, the amendment, plus who confirmed that relationship and when.

Same model. Same question. Completely different reliability. The structure isn't a feature sitting on top of the AI; it's the ground the AI stands on.

Swipe to see the full diagram →

*[caption] The same question, asked of the same model. On the left it infers; on the right it traverses.*


## [section: visible]


#### The question I had to argue out: does this even need to be visible?

If the AI can answer reliably, why show anyone a relationship graph at all? It's a fair challenge, and the honest answer isn't a binary. It's a spectrum of how much structure to surface.

Swipe to see the full diagram →

*[caption] Not "show the graph or hide it". A spectrum, with a decision about where to sit now and where to move next.*


**Invisible graph**

Structure exists in the database only. Works when the AI is trusted absolutely.


**Answer with citation**

The AI answers and names its source. Users can click through, though often won't.


**Structured list view (build now)**

Authority-first accordion with relationship chips. Solves the daily problem immediately.


**Relationship panel (build next)**

Typed relationships per entity, and the interface where humans confirm or correct what the AI inferred.


**Graph canvas · where it's heading**

A full view of a contract family. The reason this was ever "someday" was scale: a family of 340 statements of work broke every graph we drew. That's the problem I went after next.

The position I landed on: AI answers need to be backed by visible structure, not replaced by it. When the assistant says "Amendment 4 applies to your Boston SOW," the user's next move is to verify. The structure view is the footnote to every AI answer, and the workspace where a human resolves what the agent can't.

Three cases make visibility permanent rather than transitional: people who need to verify before signing off, people who need to correct a relationship the AI inferred, and people who need to govern a portfolio rather than query it one contract at a time. Accountability requires visibility.

Which leaves one obligation: if the structure has to be visible, it has to stay visible at real volume. That turned out to be the harder problem.


## [section: craft]


#### The detail nobody notices until it's wrong

On the graph canvas, a bucket holding 145 contracts and a single contract were drawn identically. The eye had no way to tell scaffolding from substance.

A group is a question. A record is a thing. A group has no ID, no paper, no signature, and disappears the moment you switch view. A record is a legal instrument that exists whether you're looking at it or not. They shouldn't share a silhouette.

Swipe to see the full diagram →

*[caption] Recreated from the design exploration.*

No single cue survives every zoom level, so they stack: at any zoom, at least one is doing the work:


## [section: scale]


#### Making the graph survive 340 statements of work

A relationship view is easy to draw for a family of six. Real families aren't six. One master agreement in this portfolio governs 340 SOWs, each with amendments, work orders and change orders hanging off it.

My first attempt was a radial layout, with the agreement at the centre and everything arranged around it. It looked like a relationship map should look. Then I measured it in the browser at real volume, and it stopped being defensible.

Zero legible labels is the number that ended the argument. A ring can only hold what fits on its circumference, so past a certain volume a radial graph isn't a dense view, it's a decorative one. Everything was on screen and nothing was readable.

The replacement branches instead of encircling: each click opens the next column, only the branch you opened is ever drawn, and no column holds more than about thirty records. Cost tracks what you're looking at rather than what exists.

This one lives in the next-generation platform, the agentic revamp the company is building toward, and the same programme behind my intent model work. Same relationship model underneath, a different surface on top: the structured view answers the daily question on the current product, this one is for reading a whole family at scale.

Swipe to see the full diagram →

*[caption] Each click opens the next column. The 137 records in branches you didn't open are never rendered.*


**Two rules that keep the model honest**


**Solid is parentage**

governs · issued under, a real level beneath.


**Dashed is a modifier**

amends · modifies. An amendment attaches to something. It is not a level beneath it.

That distinction is the whole original problem drawn in two line styles. Amendments were being filed under SOWs precisely because nothing distinguished attaching from belonging.

*[caption] Branching columns holding a 340-SOW family, playing a recorded sequence: a status worth worrying about, a cohort inside it, one record, and the amendment attached to it. Note the amendment joined by a dashed line and work orders by solid ones; the panel navigating by relationship, "governed by", "amended by"; and documents grouped by the role they play. Prototype with illustrative demo data.*


**Three things this screen makes literal**


**Relationships are the navigation**

The panel doesn't link to "related documents." It offers governed by, amended by, view work orders. You move through the contract by its legal structure, not a file tree.


**Documents are evidence, grouped by the role they play**

Executed, exhibit, correspondence, each with the signed original, the current rate card, and the letter that needs action each carrying its own state. The claim "documents became evidence" stops being a sentence here.


**The counts are the portfolio**

2,314 records, 5,055 documents, $1,099M in contract value, in the breadcrumb, on one family. That's the volume any relationship view has to survive.

What I'd claim, precisely: a working prototype, built in code, that removes the blocker which had kept a graph view at "later." Engineering hasn't started on it. But the reason it was deferred no longer holds, and that was the part design could settle.

The second rule protects it: grouping is a lens, not a hierarchy. Group-by re-cuts the same 340 SOWs by status, region or breach, and never re-parents them. And nothing is nested for you: a + on any separator inserts a grouping where you want the cut, rather than the system deciding which dimension matters.

The same logic runs through the side panel. Select a group and it answers for the cohort: combined value, what needs action, which amendments touch it. Select a record and you get its details plus its documents: executed, exhibits, drafts, correspondence. A cohort owns no paper, so it has no documents card.


## [section: learned]


#### What I took from it

The most valuable thing I did here wasn't a screen. It was refusing the framing everyone arrived with. Ten problem reports all pointed at search, and search was never the answer, but that's only visible if you're willing to work on the model underneath instead of the interface on top.

It also changed how I argue for AI work. The instinct is to design the intelligent surface. The leverage is a layer down: what a system can represent sets the ceiling on what any model built over it can understand.

The same argument, one layer up, is the auto extraction work. There the question was not what the system should represent, but what a person does with the answer once it has reasoned. That one shipped, and it has measured results. Read it →


## [section: end]


#### Let's build something that thinks.

Next: an AI extracts 128 fields, a lawyer still checks them →


---

# auto-extraction.html

**Page title:** An AI extracts 128 fields. A lawyer still checks them. · Amrit Kumar

**Meta description:** Three interface generations for verifying AI-extracted contract data, and what the retention curve did afterwards. A case study in designing for review rather than for speed.

Case study

Case study · AI review interface · 14 min read


### An AI can extract 128 fields. A lawyer still has to check every one.

Three generations of interface for verifying machine-extracted contract data. I built all three. This is the story of what the first two got wrong, and what the retention curve did once the third one shipped.

Product

Auto Extraction, the AI review module in an enterprise contract platform

My role

Led end to end UX: research synthesis, journey mapping, wireframes, UI, interaction

Team

Partnered with engineering, AI, and legal subject-matter experts

Period

Aug 2024 to Jan 2025

Status

Shipped. First phase of review assist delivered

Measured after

18% gain in review efficiency, 15% fewer errors, month-four retention up from 5% to 23%


## [section: problem]


#### The task nobody can skip

Thousands of contracts, each running to hundreds of pages, have to be read closely enough to pin down every risky clause, position, numeric value and date. Miss one and it costs the company money or exposes it legally. So nobody skims. The work is slow because the consequences of speed are expensive.

An AI model can read those pages in seconds and pull out the values. That was already working. The model was not the problem.

The problem was the second half of the job. Once the machine has proposed 128 answers, a lawyer has to agree with each one, and until they do, none of the speed counts. If verifying the machine takes as long as reading the contract, the AI has moved the work rather than removed it.


> The extraction was fast. The verification was not. Everything I designed here lives in that gap.

*[caption] Fig. 01 · The screen Contract on the left, the machine's 128 proposed answers on the right. Every one of them needs a human to accept, correct or reject it.*


## [section: principles]


#### What lawyers actually asked for

The instinct with an AI feature is to design for speed. Sitting with reviewers, that turned out to be the wrong target. They did not want the tool to be faster at telling them things. They wanted to be able to see why it had said them, without leaving the sentence they were reading.

Three principles came out of that, and every decision below was settled against them.


**Transparency over speed**

A reviewer needs to see why a clause was flagged. An answer they cannot trace is an answer they have to redo themselves.


**Human control at the centre**

Assistance, never substitution. The machine proposes. The person accountable for the contract decides.


**Continuity of flow**

Breaking focus reduces accuracy. Anything that pulls a reader out of the document has to earn its interruption.

*[caption] Fig. 02 · Prioritisation Pain points mapped against business impact and difficulty to execute, so the argument about what to build first happened once rather than every week.*


## [section: origin]


#### Where the shape came from

Before designing anything I went looking for what reviewing already looks like when nobody has built a tool for it.

People review things constantly. Someone turns a packet over in a shop and runs a finger down the nutrition panel, checking a few values against what they care about. A rent agreement comes back from a tenant with a highlighter through the clauses that matter, the marks sitting directly on the sentences rather than in a summary somewhere else.

Both share a property worth copying: the annotation stays on the source. Nobody transcribes the numbers into a separate sheet to check them. The mark is made where the evidence is, so the evidence and the judgment about it never come apart.

That gave the first version its shape, and it turned out to be the constraint that survived all three. What changed across the iterations was how much could sit on the page at once without breaking the reading. What did not change was the rule that a reviewer should never have to leave the sentence to check the claim about it.


## [section: iterations]


#### Three attempts at showing the machine's work

What follows is the honest sequence. Each version solved the complaint about the one before it and introduced a new one. I am including the two I replaced because the reason each failed is the actual finding.


**Inline annotations**

Highlight the extracted values directly in the text, where the lawyer is already looking. No panel, no navigation, no second place to look. The most literal reading of "keep them in the document".

Fast to scan. The value stayed attached to the sentence that produced it.

Detail was hidden behind a hover. Reading stopped every time someone needed to check what a highlight meant.


**Hover cards**

Expand the highlight into a card that shows the extracted value alongside the text, so a reviewer gets the context without losing their place. This fixed the depth problem directly.

Richer detail at a glance. Less guesswork, and validating a single value became quick.

Every check still required a deliberate mouse movement. Across a long document that is hundreds of small interruptions.


**Assist bars**

Stop hiding the labels. Put them in the margin, aligned with the passage each value came from, permanently visible. Names, dates and clauses become a sequence a reviewer can work down rather than a set of things to go hunting for.

Sequential and structured. Review became one continuous pass instead of constant context switching.

An extra layer of interface, and a real learning curve for people opening it for the first time.


## [section: colour]


#### Colour was not enough on its own

Four kinds of thing get extracted, and a reviewer has to tell them apart at a glance: metadata, clauses, obligations and service levels. The obvious answer is four colours. The obvious answer excludes colour-blind reviewers, and this is software people use for six hours a day.

So each type carries a shape as well as a colour. A circle, a square, a triangle, a diamond. The distinction survives without colour, and it costs nothing to anyone who can see it.

*[caption] Fig. 03 · The four types Shape carries the meaning, colour reinforces it. Simple geometry turned out to be enough for both jobs.*


## [section: uncertainty]


#### The number we decided not to show

Every AI feature reaches the same fork: the model has some sense of how sure it is, so do you put that on screen? The default answer is a confidence score. We tried it and took it out.

A lawyer cannot act on 0.82. It tells them the machine is somewhat sure, which they already assumed, and it gives them nothing to check. Worse, a high number invites people to skip the check, and a low one tells them to look without telling them where. Either way the score substitutes for the evidence rather than pointing at it.

What reviewers were actually doing was reading where the value came from. If the party name was pulled from the preamble it was almost certainly right. If it came from a recital halfway down page nine, it needed a second look. The position of a value in a contract carries meaning, and lawyers already know how to read that. So the interface shows the provenance instead of a probability.

*[caption] Fig. 04 · The card Four bands, in the order a reviewer needs them: what was found, why, where from, and what to do about it.*

The card went through its own revision on the way here. An earlier version pasted the surrounding sentence from the contract and gave a page number, which was honest but left the reviewer to work out why that passage was the relevant one. Replacing the excerpt with the model's reasoning, and the page number with jumpable references, kept the provenance and added the argument.

Two of those bands do the work a score would have done, and do it better.

The reasoning band states the case in words. "Based on the last 12 documents, the standard term used for this document type is Master Service Agreement." That is checkable. A reviewer can disagree with the reasoning itself, which they cannot do with a number.

The references band cites positions in the contract. Selecting one scrolls the document to the passage the value was taken from, so the reviewer is looking at the source rather than at a claim about it. Verification becomes reading, which is the job lawyers were trained to do, rather than trusting a metric they have no way to audit.


## [section: wrong]


#### What happens when it is wrong

Extraction gets things wrong, and a review tool that only designs the agreeing path is not a review tool. Every proposed value has three exits, not one.

Accept confirms it and moves to the next value, so agreement costs a single click and the reviewer keeps their place.

Edit corrects the value in place. The field becomes editable where it already sits, rather than opening a form somewhere else.

Re-tag is the one that matters. If the machine took the value from the wrong part of the document, the reviewer selects the correct passage in the contract itself and the value is rebound to it. The correction is made against the evidence rather than typed over the top of it, so the record keeps a defensible source rather than an unexplained override.

*[caption] Fig. 05 · Correcting in place The correction happens on the card, next to the passage it came from.*

Values are presented one at a time rather than as a wall of 128. That was a deliberate trade: it costs a reviewer some sense of the whole, and it buys a sequence they can work down without deciding what to look at next. On a hundred-page agreement, removing that decision repeatedly is worth more than the overview.


**Where a rejection goes**

Rejecting a value removes it from the reviewer's view, which is what they want, but it is the most informative thing that happens all day and throwing it away would be a waste. Every correction becomes a labelled example on the training side of the product, sorted by what kind of mistake it was: a value the model missed entirely, a value it captured incorrectly, or one a person tagged by hand.

That distinction matters, because a miss and a wrong answer are different failures and a single "incorrect" bucket would hide which one the model is actually getting worse at.

*[caption] Fig. 06 · Corrections, sorted Failures counted by type rather than lumped together. Design exploration; the row content is placeholder text.*

Two decisions in that screen are the ones I would defend hardest.

A person chooses what the model learns from. Each example has a toggle and a validation state, so corrections are curated rather than swept in automatically. A reviewer having a bad afternoon should not be able to teach the model something wrong, and a duplicate should not count twice.

Training has a floor. The model cannot be retrained until there are at least twenty data points. It is a small rule that stops someone reacting to a single bad extraction by retraining on it, which is exactly the instinct people have when they are annoyed.

The loop only closes because the review interface captures why something was wrong rather than only that it was. The two screens were designed as one system, and that is the part I would want to talk through rather than write down.


## [section: scale]


#### Then the field count grew

Assist bars worked. Then contracts arrived with a hundred and twenty-eight extracted fields, and the thing that had made review continuous started making it crowded. Clarity at forty fields is clutter at a hundred and twenty-eight.

Three questions had to be answered together: how does a reviewer switch between the four types, where does filtering live, and how much can be visible before visibility becomes noise.

Option 1


**Chips across the top**

- Extraction status readable at a glance, counts included
- One click to move between categories
- Visually cluttered once expanded
- Fell apart past a hundred fields
Option 2


**Grouped dropdown**

- Compact, and a familiar interaction to reach for
- Start broad, then go deeper into a category
- Holds up as the dataset grows
- More clicks than chips, and easy to overlook if underplayed
The dropdown won on scale, so I took it and fixed the thing it was bad at. Fields were grouped into meaningful categories rather than listed flat, and the groups were nested, so 128 fields reads as 64 performance review, then 34 obligations inside it. The filter stops being a list of everything and becomes a way of narrowing down.

*[caption] Fig. 07 · Where it landed Grouped and hierarchical. Clutter removed without hiding anything a reviewer needs to reach.*


## [section: impact]


#### What happened after it shipped

18%

gain in review efficiency, measured after launch

15%

reduction in error rates

5% → 23%

of users still returning in month four

The third number is the one I care about, and it is worth reading carefully rather than as a headline. This is the share of users still coming back to the module each month, for the eight months before the redesign and the eight months after.

- Cohort
- Users
- Month 0
- 1
- 2
- 3
- 4
- Before, Sep 2023 to Jun 2024
- 860
- 79.8%
- 30.5%
- 22.7%
- 14.8%
- 5%
- After, Sep 2024 to Jun 2025
- 2,380
- 74.8%
- 29.7%
- 23%
- 22.3%
- 23.1%
- Change
- +1,520
- -5.0
- -0.8
- +0.3
- +7.5
- +18.1
Months zero, one and two barely move. Slightly fewer people tried it, in fact. If the redesign had made the module more appealing, that is where it would show, and it doesn't.

The change is entirely at the back end of the curve. Before, month three was 14.8% and month four fell off a cliff to 5%: people tried it, worked with it for a while, and went back to doing it by hand. After, month three holds at 22.3% and month four holds at 23.1%. The decay stops.

The redesign did not win more users. It stopped losing the ones who arrived. For a tool that has to be trusted before it can be useful, that is the distinction that matters, and it is the only reason I believe the efficiency number rather than just reporting it.

*[caption] Fig. 08 · The source Product analytics, captured 16 June 2025. Both windows are eight months, same module, same measure.*

Alongside the numbers, the module went out in soft releases to customers including IBM and EY, and the response back was that it had become noticeably easier to work with. That is qualitative and I treat it as such, but it came from the accounts where being wrong is most expensive.


## [section: learned]


#### What I took from it

01


**Faster extraction is not faster review**

The model was never the bottleneck. Almost all of the time a reviewer spends is spent agreeing or disagreeing with the machine, and that is an interface problem, not a model problem. Teams building AI features consistently invest in the half that was already working.

02


**Design for the hundredth interaction**

Hover cards tested beautifully on a single value and failed on a whole contract. I now look at any interaction and ask what it costs when it happens a hundred times in an hour, because that is the real usage and it is not what a demo shows you.

03


**Retention is the honest metric for trust**

Efficiency percentages are easy to produce and easy to argue with. Whether people are still using the thing four months later is much harder to explain away, and for AI features, where the real question is whether anyone believes the output, it is closer to what you actually wanted to know.

04


**Two of the three designs here are mine and failed**

Inline annotations and hover cards were not someone else's bad ideas that I fixed. I made them, watched them fall short, and replaced them. The sequence is the work. A case study that shows only the third one is describing a different job than the one I did.


## [section: end-cta]


#### This is the same argument as the contract graph, one layer down.

That case study is about giving the AI ground worth reasoning over. This one is about what a person does with the answer once it has reasoned.


---

# intent-model.html

**Page title:** The Intent Model · Design Direction · Amrit Kumar

**Meta description:** A framework for deciding, on any screen, whether an AI agent should explain, suggest, act, or stay out of the way.

Design direction

Design direction · Product strategy · 6 min read


### The intent model: when should an agent act, ask, or stay quiet?

A framework for deciding, on any screen in the product, whether the agent should explain, suggest, act, or get out of the way. Written for and presented to executive stakeholders as the design direction for an AI-native contract platform.

What this is

Product design direction, not a feature. A rule set that governs every surface

Audience

Executive stakeholders and product leadership

My role

Authored the framework and the argument; ran the sessions it came out of

Scope

Platform-wide: entry points, personalisation, agent autonomy, success measures

Year

2026

Status

Adopted as design direction; roadmap specifics withheld here


## [section: arrive]


#### Nobody's job is "check the contract system"

Enterprise software is designed as though people will arrive at it. They don't. A system of record isn't somewhere anyone chooses to spend their morning, and designing as if they will is a large part of why this category still feels manual.

So the first question isn't "what should the homepage show?" It's: if we can't rely on people coming to us, how does the work reach them?


## [section: states]


#### Four situations, not four features

Not personas. States of mind. The same person moves between them hourly, and which one they're in tells you what the agent should do.

Scroll the diagram sideways to see the full flow.

Three ways in, one loop. The lane decides which surface carries the work. The depth of what someone actually said decides whether the agent asks first or acts. The dashed line is the part that matters: work the agent brings you becomes the thing you already know next time, so these are one cycle rather than three products.

State 1


**"I know"**

They have something in mind and say it, clearly or vaguely. The agent's job is to interpret and act, asking only if genuinely blocked.

"Renew the contract with this supplier."

State 2


**"It knows"**

They don't realise something needs them. The system does, so it goes to them, in the inbox or tool they already work in.

A notice window closes in 70 days and nobody has acted.

State 3


**"I'm looking"**

No sharp question. Orienting, checking an account, browsing. The agent should organise, not interrupt.

"What do we have with this counterparty?"

State 4


**"The world moved"**

Something external happened and the question lands across many contracts at once. The answer is a set, not a document.

A new regulation: where are we now exposed?


## [section: thesis]


#### The thesis: work should migrate toward "it knows"

The product's job is to keep shifting work out of asking and hunting, into being told. That single arrow is the strategy.

Today

Over time

It isn't magic. It's a designed action. Every arrow has a button behind it: keep watching, correct the agent, add a rule. A one-off sweep for a new regulation gets pinned as a standing check; the same need has moved from state 4 to state 2. States 1 and 4 never empty, and shouldn't. New questions keep arriving. The claim is only that repeatable work migrates.


## [section: permission]


#### The rule underneath: confidence is not permission

A fair challenge to any agentic system: if the agent is confident, why does it still stop and ask?


> Being sure what you meant isn't the same as being allowed to do it.

The agent can be certain the answer is "renew at 6%" and still not be entitled to send that to a counterparty. Certainty is a property of the model; authority is a property of the relationship. Conflating them is how autonomous systems cause damage while technically working correctly.

So the checkpoint sits at the irreversible step, and only there. Drafting can be undone; sending cannot. What that buys is the thing people actually want: they aren't supervising twelve small steps, they're making one real decision.


## [section: levels]


#### Three levels, and only one of them is hard

Before deciding which surface should carry an agent, there is a prior question that teams tend to skip: how much of the work is the agent actually doing? "Add AI to this page" hides three very different products behind one phrase.

I use the same three levels on every feature. Most of the effort in an AI product goes into arguing about the third one, and most of the value too.

Level 0


**Manual**

The person does the work. The system holds the data and gets out of the way.

Open each record and read it.

Level 1


**User initiated**

The person asks, the system answers. Faster, but the burden of knowing what to ask has not moved anywhere. This is where almost every AI feature currently sits, and it is the level a chat box gets you to.

"Does this contract have an indemnity clause?"

Level 2


**System initiated**

The system notices and comes to the person. This is the only level that removes work rather than relocating it, and it is also the only one that can be wrong without anyone having asked it a question. Everything difficult about agentic design lives here: what counts as worth interrupting for, what happens when it is wrong, and who is accountable when it acts.

Nobody asked. The system flags the missing clause anyway, on the surface the person was already working in.

Running a feature list through those three columns is unglamorous and it settles arguments fast. It exposes the features that are level 1 wearing level 2 language, and it makes the real question visible: not can the system do this, but is it entitled to do it unprompted.

That is the same distinction as the rule above, arriving from the other direction.


## [section: personalisation]


#### Personalisation that can't lie to you

If the agent adapts to intent, an obvious worry follows, and the answer had to be principled, not a preference.

"So does everyone see a different page?"

No. Personalisation reorders the page. It never changes what's on it. A renewal manager leads with expiry date, notice window and pricing history. A compliance officer leads with liability cap and data-processing status. Each sees the other's information further down, but always present.

Intent changes what's loudest, never what's true.

Why not simply hide what's irrelevant? Because then one person says "there's nothing here about liability" and the other says "it's right there", and they spend the meeting comparing screens instead of discussing the deal. Worse: if a card isn't shown, people reasonably assume the clause doesn't exist. On a contract, that's a confident wrong answer.

The single exception is permissions. If someone isn't cleared to see pricing, we withhold it, and we say something is withheld, rather than showing a page that looks complete.


## [section: measures]


#### Measures chosen because they're hard to fake

Adoption numbers can look healthy while a product quietly fails. These four resist gaming, including one that's uncomfortable for the team that owns it.


**How often people still have to go looking**

The share of sessions that begin with a search someone typed, rather than something the system raised. Should fall over time. Can't be gamed by sending more alerts. Spamming people doesn't stop them hunting for something else.


**Things we flagged that nobody ever touched**

The most useful number we'll have, and the least flattering: it is simultaneously the audit exposure and the honest verdict on whether our flags are any good.


**Acted-on versus dismissed**

Distinguishes flagging the wrong things from flagging the right things to the wrong person: two failures with completely different fixes.


**Time between flag and action**

Where "we told them, just not where they were working" shows up as a number instead of an anecdote.


## [section: failure]


#### Why I argued for showing the failure case

Two journeys illustrate the direction. The first flatters us: the system spots a renewal nobody was thinking about and brings it to the right person.

The second doesn't. A regulation lands and the system had flagged nothing, because until that morning nobody knew it mattered. I included it on purpose. Any system that only demos the cases it already handles is hiding something.

It also produces the mechanism that closes the gap: the unanswered question gets pinned, becomes a standing check, and next time it's caught before anyone asks. Coverage grows from real use instead of from guessing in a planning meeting. And what people search for that we failed to flag is exactly the roadmap for what to flag next.


## [section: oneline]


#### In one line


> The product's job is to keep learning what to tell you, before you have to go looking for it.

The four situations are where we meet people. The measures are how we know we're moving them. Everything else is machinery in service of that.


## [section: end-cta]


#### Want the full walkthrough?


---

# airtel-self-serve.html

**Page title:** Support That Answers Before You Ask · Airtel Thanks · Amrit Kumar

**Meta description:** Redesigning the help journey in a consumer app used by millions: fewer support calls, higher daily engagement.

Case study

Shipped · Consumer scale · Bharti Airtel · 4 min read


### Support that answers before you ask.

In a telecom app used by millions, the help section was a wall of articles nobody read, so people called instead. I redesigned the journey around what each person was probably there to do, using real behavioural signals rather than a menu.

What I did

Redesigned the help and self-service journey in the Airtel Thanks app

Role

UX Designer, in-house product team

Scale

Consumer app, millions of active users

Status

Shipped to production

Period

2019 – 2021

Why it's here

The counterweight to my enterprise work: it shipped, at scale, and moved measured numbers


## [section: question]


#### The question we started from

How might we reduce calls to customer care and make Help & Support actually cater to the user's problem, saving call-centre cost and cutting the time it takes someone to get unstuck?

Self-service help is usually a library: categories, articles, a search box. That assumes the user knows what their problem is called. Most don't. They know their internet stopped working, or that money left their account and the balance looks wrong.


> Telecom is an essential service. Disruption isn't an inconvenience. It's stressful.


## [section: why]


#### Why people were calling

We started with the call-centre data instead of guessing. The reasons were concentrated: 4G speed alone drove over four million calls.

Top call drivers from the internal analysis at the time. The shape of this chart set the whole design brief: solve the top few well and the rest largely takes care of itself.

Alongside the numbers we ran interviews and mapped the experience of a service outage: not just what people do, but how they feel at each step. That curve mattered: people arrive at Help & Support already frustrated, so any friction lands at the worst possible moment.


## [section: voices]


#### Four things users told us, and what each one meant

"Recently paid money but the validity credited is wrong."

Relevance to recent activity

Most queries come from something that just happened: a recharge, a payment, a plan change. The page should already know what that was.

"I don't like browsing through topics, it's complicated."

Anxiety

Their mind is already loaded with frustration. Making them browse to find the right topic is asking for patience they don't have.

"I usually prefer to call customer care, it's one-to-one."

Lack of personalisation

People call because a human acknowledges them. A screen that speaks to you directly gets closer to that than a menu ever will.

"Status of my complaint isn't visible. I don't know when it'll be resolved."

Visibility of progress

Half of what a support call buys is reassurance that something is happening. That can be designed instead of staffed.


## [section: redesign]


#### The redesign: answer before they ask

Instead of a directory, the page opens with what this person is probably here about, and where possible, with the answer already given.

Behind it, smart query routing used real-time behaviour to send people down the shortest path to resolution: a direct action where one existed, an explanation where it didn't, and a human when the issue genuinely needed one. The goal was never zero calls. It was zero unnecessary ones.


## [section: result]


#### What happened

9%

Reduction in care-centre call volume

15%

Increase in daily engagement

Millions

Of users on the shipped experience

Six years later I'm designing agents for contract software, and this is the project they keep rhyming with. Predicting intent from behaviour and putting the likely answer first is the same idea as an agent that reaches people rather than waiting to be visited, and the same restraint applies. Reordering what's prominent is helpful; hiding what someone might need is not. That rule survived intact into the intent model I wrote this year.


## [section: end-cta]


#### Want the full walkthrough?


---

# 404.html

**Page title:** Not found · Amrit Kumar

404


### This page doesn't exist.

Which, given that most of my work is about systems knowing what they don't know, feels like something I should own rather than hide.

