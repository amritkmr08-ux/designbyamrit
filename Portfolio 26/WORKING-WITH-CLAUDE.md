# Getting good UI work out of an AI assistant

Written after three days of building this portfolio, from what actually worked and
what wasted time. Not general prompting advice. Specific to visual and interface work.

Paste the "Session preamble" at the bottom into any new session and most of this
becomes automatic.

---

## 1. The assistant is blind unless you fix that

This is the single biggest factor and everything else is secondary to it.

An assistant reading CSS can verify structure, syntax, missing assets, dead links and
contrast maths. It cannot see composition, spacing, crops, overlap, rhythm or whether
something reads as a caption for the wrong element. In this project every visual bug
was invisible in code and obvious in a render:

- a portrait sitting on top of the facts grid, because the row span was hardcoded
- a screenshot cropped so the header bar and half the panel were cut off
- a figure running edge to edge with no side padding
- a section label reading as a caption for the animation above it
- a scrolling marquee that ran out of content halfway across the viewport

None of those were code errors. All were caught by a human looking at the page.

**Fix it one of two ways:**

1. **Connect a browser tool** so the assistant can screenshot its own work.
   For Claude: https://chromewebstore.google.com/detail/fcoeoabgfenejglbffodgkkbkcdhcgfn
   Then it can navigate, screenshot at several widths, and check before reporting.
2. **Or paste a screenshot after every change**, without being asked. The screenshot
   *is* the prompt. A one-line "rail still broken" with an image beats three
   paragraphs of description.

**Corollary:** "done" from a blind assistant means "the code compiles," not "it looks
right." Ask *"did you actually see it?"* and expect an honest answer.

---

## 2. Constrain the system, not the instance

Fixing each problem as it appears is the slow path. Every rule you can write down once
removes a whole category of future correction.

Things worth fixing in writing before any work starts:

| Rule type | Example from this project |
|---|---|
| Layout measures | body 700, figures 1000, feature 1120 |
| Section rhythm | 96 to 110px between major sections |
| Colour tokens | never a raw hex in a component, always a variable |
| Type scale | display sizes as a named ramp, not ad-hoc clamps |
| Punctuation | no em dashes anywhere |
| Evidence | targets labelled as targets, recreated screens labelled as recreations |

Once "body 700, figures 1000" exists, "this feels too wide" stops being a matter of
taste you have to keep re-explaining and becomes a rule violation the assistant can
check itself.

Keep these in a file the assistant reads at the start of every session.

---

## 3. Ask for options, not an answer

"Make it better" gets you the assistant's default, which tends to be over-controlled,
slightly too clever, and evenly weighted.

Better:

> Give me three versions of this section: restrained, medium, loud. One paragraph on
> the trade-off for each.

Forcing a range makes it articulate what it is choosing between, and you get to pick
rather than react.

---

## 4. Make it state the rule before it writes the code

> Before you touch this: what layout method will you use, what measure, and what
> happens when the content length changes?

The overlap bug in this project happened because a portrait was placed with
`grid-row: 2 / span 4`, a row count arrived at by counting paragraphs by hand. Asking
for the rule first would have surfaced "I am hardcoding a row count" immediately, and
cost one line instead of four rounds of screenshots.

---

## 5. Use references, and name what you want from them

A URL alone is vague. A URL plus the specific quality is executable.

- Weak: "make it like abigaeldonahue.com"
- Strong: "that level of restraint, but borrow their credit-line pattern for my footer"

Same for images. "Use this mockup" is less useful than "use this frame, keep the
screenshot sharp, no drop shadow, the caption goes below not inside."

---

## 6. Name the failure mode directly

Assistants have tics they cannot see in their own writing. Naming one fixes every
instance at once.

The one that mattered here:

> You keep writing statement, dramatic fragment, reversal. It reads as AI-written.
> Stop.

That single instruction corrected sixteen lines across the site in one pass. Compare
to correcting them one at a time.

Other tics worth naming when you spot them:

- every section ending on a memorable one-liner
- symmetrical layouts everywhere, no hierarchy
- adding a new section instead of strengthening an existing one
- explaining the thing rather than showing it

---

## 7. Ask what should be cut

Left alone, an assistant adds. It will write five sections where three would land
harder, because adding looks like progress and cutting looks like loss.

> What would you remove from this page, and what does each removal cost?

In this project, "why is this line needed?" killed three elements that would have been
defended if the question had been "how would you improve this?"

---

## 8. Separate the passes

Do **content**, then **structure**, then **polish**, as distinct passes. Say which one
you are in.

When copy and spacing change in the same edit, both get done worse and you cannot tell
which change caused what you are looking at.

---

## 9. Batch the review

One bug per message is the slowest possible loop. Scroll the whole page, list eight
things, send once. Eight round trips become one.

A good review message looks like:

```
At 1440:
1. Portrait overlaps the facts row in About
2. Figure 07 touches both edges, no padding
3. "MORE WORK" reads as a caption for the band above it
4. Marquee runs out of content on the right
```

---

## 10. Demand measurements, not adjectives

If you ask "does this look good," you get a confident opinion about a page the
assistant has never seen. Ask instead:

- what is the contrast ratio on that grey
- what pixel width is that column at 1440
- are the two halves of the marquee exactly equal
- what is the smallest text size on screen after the scale is applied

Numbers can be verified. Adjectives cannot.

---

## 11. Give real source material

The best output in this project came directly from raw material handed over:
a design deck as PDF, a working prototype file, analytics screenshots, a certificate.

Every time real source arrived, the writing got more specific and less generic. The
strongest section on the whole site came from one offhand remark about reviewing a rent
agreement with a highlighter.

If you are describing something you already have a file for, send the file.

---

## 12. State the constraints, including the awkward ones

Confidentiality, brand rules, what cannot be published, what is a target rather than a
result. An assistant will happily produce something you then cannot use.

Also: **correct it when it is over-cautious.** In this project a whole class of material
was withheld on a confidentiality assumption that turned out to be wrong, because the
product had been publicly announced. One correction unlocked the strongest case study
on the site.

---

## Session preamble

Paste this at the start of a new session doing visual work.

```
Before we start, four things:

1. You cannot see the page. Do not tell me something looks right unless you have
   rendered and viewed it. If you cannot see it, say "structurally valid, unverified
   visually."

2. Read CONTENT.md for the facts, the voice rules and the layout measures. Those are
   binding. If you want to break one, say so and why first.

3. When I ask for a visual change, state the rule you are applying before you write
   code. One line is enough.

4. Work in passes. Tell me which pass we are in: content, structure, or polish.
   Do not mix them.

My review style: I will send screenshots with a short list. Fix the whole list, then
tell me what you changed and what you could not verify.
```

---

## What this does not fix

Taste. An assistant can hold a system, apply rules consistently, catch its own
inconsistencies and produce competent work fast. Deciding what is worth building, what
to cut, and when something is dishonest is still the human's job, and it is the part
that does not transfer.
