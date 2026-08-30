# Reusable prompt — find the content gaps a scanner falls into

Paste everything below the line into Claude, with the page file attached or its path given.
This exists because the same defect keeps shipping: copy that reads fine top-to-bottom and
falls apart the moment someone lands in the middle of it.

---

## Role

You are auditing a portfolio page for a reader who did not start at the top.

They arrived from a resume link, a LinkedIn post, or a fast scroll. They are giving the page
seconds, not minutes. They will not scroll back to recover context, and they will not click
anything to get more text. If a block does not explain itself where it sits, it is lost —
and so is whatever it was trying to prove.

Assume the reader is smart, in a hurry, and outside the industry. They do not know the
product, the company, or the vocabulary.

## The rule every block must pass

**Cover everything above and below one section. Read only that section. Can a stranger say
what it is and why it exists?**

If no, the block has a gap. There are only four kinds:

### 1. Unanchored referents

A pronoun or quantifier pointing at something the block never names: *it, this, that, these,
those, they, them, everyone, some.*

The writer knows what "it" is. The scanner does not, and will not scroll up to find out.

- Bad: "Measure it, don't argue about it."
- Good: "Measure the layout, don't argue about it."
- Bad: "The green band is everyone the redesign kept."
- Good: "The shaded area is users the old version lost, but the redesign kept."
- Bad: "If you're working on this kind of problem, get in touch."
- Good: "If you're working on how people and AI share hard decisions, get in touch."

A pronoun is fine when its noun sits in the same sentence, or the sentence directly before it
inside the same block. It is a gap when the noun lives in a different section.

### 2. Named things that were never introduced

A label that means something to the writer and nothing to a stranger: "The 606-node test",
"the intent model", "the radial layout", any internal project name, any metric shorthand.

Fix by putting the question or the purpose in the heading itself, not the name.

- Bad: "The 606-node test, drawn live"
- Good: "Can 606 contracts be drawn so a person can still read them?"

### 3. Headings that do not carry the point

A scanner reads headings and nothing else. If the headings alone do not tell the story, the
page has no story for the person who is scanning.

Read every heading on the page in order, with all body copy removed. Does the argument still
hold? Where it breaks, that heading is decorative and needs rewriting.

### 4. Domain vocabulary in a load-bearing position

Words like *amendment, clause, obligation, MSA, redline, SLA* are fine as supporting detail.
In a headline they cost you every reader who does not work in that industry.

Check whether the point survives with a plain word. If it does, use the plain word and let
the specific term appear one line down.

- Bad: "A folder tells you where an amendment sits."
- Good: "A folder tells you where a document sits."

## What NOT to do

- Do not add a summary button, a TL;DR toggle, or an "in short" expander. A reader who will
  not read a sentence will not click for more sentences. Fix the block instead.
- Do not shorten everything to seven words. Attention has not collapsed to a fixed number —
  what people won't spend is time on reading whose payoff is unclear. A block that states its
  point immediately can then run long and still be read.
- Do not delete the depth. A Lead-level portfolio is judged on reasoning. Answer first, then
  the reasoning underneath — never answer only.
- Do not invent facts to fill a gap. If a block needs a number or a reason the source does not
  contain, say so and ask, rather than writing something plausible.

## How to run the audit

1. Extract every heading and paragraph from the page, in order.
2. For each block, apply the four checks above. Note the specific words at fault, not a
   general observation.
3. Report a table: location · the exact text · which gap · a proposed rewrite.
4. Ranked worst first — a broken heading outranks a broken sentence, because headings are what
   a scanner actually reads.
5. Do not rewrite the thinking. Keep the argument, the numbers, the product names, and any
   sharp phrase that sounds like the writer. You are naming referents, not restyling voice.

## Verify before delivering

- Re-read only the headings, in order. The argument holds.
- Search the text for `it, this, that, these, those, they, them, everyone, some`. Every hit
  resolves inside its own block.
- Pick three blocks at random. Cover everything else. Each still explains itself.
- No new facts appeared that were not in the source.
