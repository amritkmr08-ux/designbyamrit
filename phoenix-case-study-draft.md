# Draft — Act II for the intent model case study
### New sections to slot into intent-model.html, after "Why I argued for showing the failure case" and before "In one line"

*(Each ## is a section in the page's existing style. [VISUAL] notes mark where a screen or the live prototype sits.)*

---

## From direction to a surface: the listing page

A framework that never touches a screen is a deck. This one got its first test on the least glamorous page in the product: the contract listing.

It went first because of the three questions, not despite them. Ten thousand records, and nobody arrives there knowing which one they need — the listing is where "I'm looking" and "the world moved" live. If the migration thesis works anywhere, it has to work here.

The team called the work Phoenix. What follows is the direction that came out of it, agreed and heading into build.

[VISUAL — prototype still or live iframe: the listing with the ask bar]

## A question becomes the page

There is an ask bar, but it isn't a chat. Type "breach notification for active suppliers and customers with a DPA — flag anything slower than our 72-hour policy" and you don't get a paragraph back. The page becomes the answer: 63 families, filtered, with a new column it built for the question.

No transcript, no thread to scroll back through. We decided early that conversations here are disposable — the *view* is the thing worth keeping. A question you'll ask again gets pinned, and then it isn't a conversation at all. It's part of the product.

## The agent shows its reading before you trust a row

Under the question sits one line: **"Phoenix read that as"** — followed by the interpretation as chips. *Active. Customer & supplier paper. DPA in family. Breach notification column. Against our 72-hour policy.* Each one removable.

This is the piece I'd defend hardest. An agent that filters ten thousand records on a sentence has interpreted that sentence, and its interpretation can be wrong in ways a fluent answer hides. So the reading is shown as objects you can correct, not prose you have to take on faith. Remove a chip and the set updates. You're not debugging the agent's understanding — you're editing it.

[VISUAL — resolved state: readback chips + generated column]

## A column that admits what it doesn't know

The generated column doesn't pretend to certainty. Row by row it says *72 hours*, or *5 business days*, or *Conflicting terms · 3*, or — the one I care about most — *Not found*.

The same rule as the personalisation principle, arriving smaller: a blank that looks like an answer is a confident wrong answer. On a contract, "we found nothing" and "there is nothing" are different facts, and the interface keeps them different.

## Pinning is the migration arrow, as a button

Earlier I claimed work should migrate from "the world moved" toward "it knows", and that every arrow needs a designed action behind it. Pin is that action. A one-off sweep — *anything slower than our 72-hour policy?* — becomes a standing view in the sidebar, watching as records change. The same need has moved from state 4 to state 2, and nobody built a feature for it. They asked a question and kept it.

## One component underneath

None of this survives contact with a real product unless the table itself can hold it. So the column header became one component with a fixed anatomy — label, pin, exception badge, sort — whether the column is a stored field, a live question, or a rule. Reordering works from the keyboard, not just drag. Unglamorous, and it's the reason a question-column sits next to a database column without the page turning into two products.

[VISUAL — column header cell spec, live demo]

## Where it stands

Agreed as direction; build starts next sprint. No outcome numbers yet, and none invented here — the measures it will be judged by are the four above, the same ones chosen because they're hard to fake.

---

# Homepage — card 03, revised copy

**Kicker:** 03 · Design direction · Entering build

**Title (keep):** The intent model

**Body:** When should an agent explain, suggest, act, or stay out of the way? A framework I wrote for executive stakeholders — and the contract listing rebuilt on it, where a typed question becomes the page, shows its reading as removable chips, and can be pinned as a standing check.

**Link:** Read the direction →

---

# Before this goes public — your checklist, not mine

1. **Ajay / stakeholder clearance.** The current page deliberately withholds unreleased screens ("walked through live in interviews"). Publishing Phoenix reverses that decision — reverse it on purpose, not by accident. The draft works either way: with the prototype embedded, or with stills and the interview line kept.
2. **Names in the prototype.** Pranay Raicha, Meera Vaidya, Arjun Nair, Lisa Rath appear as owners. If real, replace.
3. **Codename.** "Phoenix" and "AskSirion" appear throughout the prototype chrome. Decide if the public version keeps them.
4. **The old site.** designamrit.com's "Embedded AI NEW" page covers this territory in the old voice, with a 2.5x / 4-days-to-40-hours claim that has no source in any material you've shown me. When this case study ships, retire or redirect that page — two live versions of the same story, one with unsourced numbers, is worse than either alone.
