# Landing page, full content of record

`index.html` as published, 18 August 2026. Every word, in order, with the structure and
the reasoning behind each decision. Paste this into a new session to restore context.

---

## Page metadata

**Title:** Amrit Kumar · Product Designer, AI systems

**Meta description:** I design how humans and AI agents share judgment in enterprise
work where decisions are hard and being wrong is expensive. Thirteen years in design,
six in product.

**OG title:** Amrit Kumar · Product Designer
**OG description:** Designing trust into AI-powered workflows. Case studies in
human-guided AI for enterprise contract software.
**OG image / URL:** `https://www.designamrit.com/og-image.jpg` / `https://www.designamrit.com/`

---

## Section order

```
nav
header (hero)
creds (marquee)
band (featured case study, dark, live prototype)
work (three more case studies)
nums (one hero metric + three quiet facts)
influence (two Staff-level decisions)
qband (reviewer quote)
how (How I work, four steps)
thinking (manifesto)
about
contact
footer
```

Reordered deliberately: work sits immediately after the featured case so a recruiter
gets flagship then breadth before any philosophy. Process was folded into How I work
and no longer exists as its own section.

---

## 1. Nav

Left: **Amrit Kumar** (links to `#top`)
Centre: Work · How I work · About
Right: **Contact** (in sage)

Resume slots in beside Contact once `resume.pdf` exists.

---

## 2. Hero

**Eyebrow:** Amrit Kumar · Product Designer

**H1:** Designing **trust** into AI-powered workflows.
*("trust" carries a sage underline. 42 to 104px, left aligned, max 13ch.)*

**Sub:** I design how humans and AI agents share judgment in enterprise work,
especially where decisions are hard and being wrong is expensive.

**Availability:** Open to Lead roles *(pulsing sage dot)*

Note: the sub was promoted from the meta description, which was sharper than the
original visible line. Availability was "Staff & Lead", narrowed to "Lead" to widen
the funnel.

---

## 3. Credibility marquee

Proper nouns only, no keyword filler. Six items, repeated four times per half, halves
duplicated, 48 spans total so the track never runs out on a wide viewport.

```
SirionLabs · Bharti Airtel · NIFT · XLRI · UX India 2023 · Design Up 2025
```

Highlighted (darker): SirionLabs, Bharti Airtel, NIFT, XLRI

Removed from here deliberately: "Contract intelligence", "Agentic AI",
"Human-in-the-loop", "Enterprise SaaS", "Design systems" (keyword soup, the page proves
them anyway) and **Stanford d.school** (wrong school name, and an online course should
not sit beside degree institutions). Stanford now appears in About as Coursework.

---

## 4. Featured band (dark)

**Label:** 01 · Featured · System design

**H2:** If the ground is folders, the AI is guessing. If the ground is relationships,
the AI is reasoning.

**Sub:** A contract repository rebuilt from a storage hierarchy into a relationship
model, so "which amendment applies to this SOW?" becomes something you read, not
something you reconstruct.

**CTA:** Read the case study →   *(links to `contract-understanding.html`)*

**Below:** live `family-graph.html` in an iframe, 720px tall, rendered at 133% and
scaled to 75% so the inspector panel shrinks with everything else.
`pointer-events: none`, view only.

**Caption overlay:** Prototype, playing a recorded sequence

Structure note: the text block is the link, the iframe is a sibling. An iframe inside
an anchor swallows clicks and breaks the link.

---

## 5. Work (three cards)

Section label: **More work** *(not "Selected work", because 01 is the band above)*

### Card 02, full width, breaks the grid
**Category:** Shipped · AI review interface
**Title:** An AI extracts 128 fields. A lawyer still checks them.
**Body:** I redesigned this review workflow across three iterations, replacing the
first two as we learned more from how it was actually used. Month-four retention went
from 5% to 23%.
**CTA:** Read the case study → `auto-extraction.html`
**Image:** `ae-hero.jpg`, laptop device shot, full bleed, no plate or shadow

### Card 03
**Category:** Product strategy · Design direction
**Title:** The intent model
**Body:** When should an agent explain, suggest, act, or stay out of the way? A
framework written for and presented to executive stakeholders as platform-wide
direction.
**CTA:** Read the direction → `intent-model.html`
**Image:** inline SVG, four states of mind

### Card 04
**Category:** Shipped · Consumer scale
**Title:** Support that answers before you ask
**Body:** Four million calls a year about a single issue. Redesigning self-service in
a telecom app used by millions, predicting the question from behaviour instead of
offering a menu.
**CTA:** Read case study → `airtel-self-serve.html`
**Image:** inline SVG, call-driver bar chart

---

## 6. Numbers

One hero figure, three quiet facts. Not four equal columns.

**Hero:** **5→23%**
of users still returning to an AI review tool four months in, after I redesigned it.
Early-month numbers barely moved, so the change was in retention rather than in how
many people tried it.
*Source line:* Product analytics, two eight-month windows, captured June 2025.

**Quiet list (26px):**
- **13** years in design, six of them in product
- **3** years designing AI-native experiences
- **Millions** of users on work that shipped

---

## 7. Influence, "Two decisions I helped change"

**Scope line:** Both of these were worked through with a group of roughly **3 to 4
designers, 2 to 3 product managers and 4 to 5 engineers**, plus legal subject-matter
experts. Neither was a decision I could make on my own.

### 01. The product modelled where documents sit. I argued it had to model how contracts relate.

| Beat | Text |
|---|---|
| Context | A parent document with children beneath it. Embedded in the product, standard across the category, and asked for by customers by name. |
| The problem | An amendment can govern several agreements, and a record can inherit from more than one instrument. Those relationships are **many to many**, which a tree structure cannot represent. |
| Why it mattered | If the model is wrong, a user can misread their contractual position, and any AI reasoning built on that structure inherits the same error. Framing it that way moved the conversation from preference to risk, which is what changed people's minds. |
| Outcome | Navigation separated from the relationship model: a flat list to move around in, explicit typed relationships underneath. |

Link: The full argument, and how it was made → `contract-understanding.html`

### 02. A team was designing surfaces one at a time. I gave them a shared language, and it changed what they built.

| Beat | Text |
|---|---|
| Context | Each surface treated as its own problem: design the chat, design the listing, design the procedure page. Nobody could settle which to build first. |
| The problem | I proposed three questions to ask of any surface instead: who starts the interaction, what the person is trying to do, and which surface should carry it. |
| Why it mattered | It replaced the default assumption that AI belongs in a chat window, which is where most of these features end up by habit rather than by decision. |
| Outcome | Listing and procedure surfaces were reclassified as **discovery**, which answered the sequencing question. Other designers used the same three questions when working through listing, procedure and homepage experiences. I wrote and maintain the team's glossary for agentic contract work, around sixty defined terms, so the language does not drift. |

Link: The model, and the argument for it → `intent-model.html`

---

## 8. Reviewer quote

**Label:** From a reviewer, after launch
**Quote:** "The auto extraction module feels so simple now."
**Attribution:** A legal reviewer on the auto extraction workflow

Editorial on paper, not a second dark band. There is exactly one dark section on the
page and it belongs to the featured work.

---

## 9. How I work

**Intro:** I design AI products, and I use AI in the work itself, mostly to explore
more directions than I otherwise could and to get something running in a browser early
enough for it to be useful.

**Whiteboard photo caption:** Before any of the four steps below, this. Most of the
hard decisions on a project are settled on a wall like this, weeks before anyone opens
a design tool.

### 01 Prototype: Prototypes instead of mockups
I build in HTML rather than linking static frames together. A branching graph holding
340 records behaves very differently at full volume than it does in a design tool, and
the only way to find out is to load the data and look.

*Evidence column:*
- `family-graph-at-scale.html` → Does a many-to-many web stay readable at full volume?
- `node-language-concept.html` → Can relationships replace folders as the storage model?

### 02 Measure: Measuring before arguing
My first relationship layout was radial, which is what these usually look like. Rather
than argue about whether it worked, I instrumented it and ran it at full volume. The
measurements settled it quickly.

*Evidence column:*
| Nodes drawn | 606 |
| Zoom to fit | 12% |
| Labels legible | 0 |
| Frame time | 39.4ms |
| After redesign | all |

Caption: Every record was on screen, and none of the labels could be read.

### 03 Explore: Exploring more options
Being able to build several structural options in an afternoon means the one I take
into a review has been compared against alternatives, rather than being the first idea
that seemed reasonable.

*Evidence column:* tried radial · tried node-link graph · tried nested tree ·
**kept** branching columns

### 04 Judge: Deciding what is right
AI produces plausible options quickly. Working out which of them are actually correct,
what to cut, and what I would not be comfortable defending, is still the part I have to
do myself.

*Evidence column:* I removed several numbers from this site because I could not source
them properly.

---

## 10. Thinking (manifesto)

**Label:** What I keep coming back to

**Statement (34 to 86px):** I design the line where AI stops and *a person decides*.

**After:** An agent can be completely sure what the answer is and still not be entitled
to act on it. Certainty belongs to the model; authority belongs to the person
accountable for the outcome. Almost everything I design comes back to that distinction.

No link. It had one to `intent-model.html`, removed because that page was already
linked twice from this page, and a conviction with a button attached reads as an ad.

---

## 11. About

Two-column: 300px portrait left (`about-desk.jpg`), text right at 58ch, facts full
width beneath in four columns.

**Para 1:** My mission at Sirion has been simple: **make complexity feel calm.** Legal
teams carry the weight of precision, and they don't have time to figure out an
interface.

**Para 2:** I came to product design the long way round: years in brand, creative
direction and co-founding a denim label before moving into digital products. That
history shows up in the work: I care as much about how something reads as how it
functions. And I prototype in code, so ideas prove themselves in a browser rather than
in a deck.

**Para 3:** Design is personal for me. Being a father changed how I see it. I watch how
naturally my daughter explores, where she gets confused, how she delights in small
wins. That's the same lens I bring to work. When design steps back and lets someone
move forward with confidence, that's when it's working.

*A fourth paragraph ("Most AI features fail at the same question…") was cut because it
restated the manifesto.*

**Facts:**

| Label | Value |
|---|---|
| Currently | Product Designer, SirionLabs, 5 years |
| Experience | 13 years in design · 6+ in product |
| Focus | AI-native UX · Design systems |
| Recognition | Lightning Talk, UX India 2023 · Best AI-Driven Design Concept, Sirion 2024 |
| **Coursework** | **Design Thinking: From Insights to Viability, Stanford Graduate School of Business (online)** |
| Community | Design Futures Collaboratory workshop, Design Up 2025 |
| Based in | Noida, India |

---

## 12. Contact

**H2:** Let's build something that thinks.
**Button:** Copy my email → becomes "Copied, talk soon"
**Fallback:** or write directly: amritkmr08@gmail.com
**Links:** Resume *(still `href="#"`, unfinished)* · LinkedIn
*(`linkedin.com/in/amritkumardesigns`)* · Behance *(`behance.net/amritkmr08`,
handle unverified)* · 3D experiment *(`home-3d.html`)*

---

## 13. Footer

© [year] Amrit Kumar
Designed and written by me. Coded with Claude.

*A temporary `build [time]` stamp sits beside the credit line for cache-checking.
Remove before publishing.*

---

## Design tokens

```
--paper   #F7F7F5    page background
--ink     #191A18    primary text
--muted   #5F625C    secondary text
--faint   #8B8D87    tertiary, labels
--line    #E3E3DF    hairlines
--soft    #EDEDEA    fills
--mark    #DCE5D3    highlight underline
--accent  #3D5A45    sage, links and emphasis
--dark    #0B0C0E    featured band

--display  Poppins        headings, labels, numerals
--font     Inter          body, 17px / 1.65
```

**Measures:** body 700 · wide 1180 · band 1280
**Section rhythm:** 96 to 110px. Three separator rules on the page, no more.
**Motion:** reveal is 12px travel over 0.72s. Everything respects
`prefers-reduced-motion`.

---

## Rules that govern this page

1. No em dashes anywhere. Colons, commas, full stops.
2. One memorable line per section at most. The rest explains the work plainly.
3. No "statement, dramatic fragment, reversal" cadence.
4. Every number is defensible and sourced. Targets are labelled targets.
5. "I" on decisions that were Amrit's. "We" only where genuinely collective.
6. Exactly one dark section on the page.
7. Each case study is pitched once and cross-referenced at most once more.

---

## Open items

- `resume.pdf` missing, Contact link is a placeholder
- `logo.svg` missing, rails use a text mark
- Behance handle unverified
- Domain not confirmed; every page points at designamrit.com
- Build-time stamp in the footer still present
- The `family-graph.html` autoplay loop has never been watched by Claude, only by Amrit
