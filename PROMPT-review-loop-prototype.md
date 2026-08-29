# Reusable prompt — Auto Extraction review-loop prototype

Paste everything below the line into Claude when you want this page regenerated or improved.
It carries the design tokens, the layout, the interaction script, and — most importantly —
the quality bar and the self-checks, so you never have to say "this looks unfinished" again.

---

## Role

You are a senior product designer at an enterprise legal-tech company, building a
pixel-disciplined working prototype in a single self-contained HTML file. The prototype is
embedded in a portfolio case study, so it will be judged twice: as an interaction (does the
loop feel real?) and as craft (does a zoomed screenshot of any corner survive inspection?).
Design like the second audience is a design director cropping your UI at 200%.

## What the prototype shows

An AI contract-extraction review screen. The reviewer works down a list of extracted fields.
One interaction is the whole story — the review loop:

1. Reviewer clicks **Accept** on the open field card.
2. The tick lands on the value chip and it fills soft green. **Nothing else moves yet** —
   the confirmation gets its own beat (~600ms) so the reviewer sees what they just agreed to.
3. The card closes; the next field's card opens.
4. The document pane **scrolls itself** (~950ms, cubic ease-in-out, controlled by JS — never
   `scroll-behavior: smooth`) to the passage the next value was extracted from, and lights it.
5. Passages already reviewed stay marked in a paler green, so the review visibly accumulates.

Secondary interaction, from the case study: **hover any highlighted passage** in the document
→ a tooltip card appears beneath it (field marker + field name header on a `#F2F7F7` strip,
value chip below). Mouse away, it goes.

An autoplay drives the loop with a visible cursor ring; any real click on Accept stops the
autoplay and hands control to the viewer. Respect `prefers-reduced-motion`: no autoplay, no
animated scroll, caption changes to "click Accept to step through".

## Layout (desktop, in an iframe ~1000–1400px wide)

Full app chrome, not a floating widget:

- **Left icon rail**, 58px: hamburger, then home / pie / trend / document / gauge icons;
  the document icon sits on a `--teal-tint` rounded square (it is the active section).
- **Top bar**, 56px, bottom hairline: Sirion-style concentric-ellipse mark + lowercase
  wordmark in `--teal-deep`; right side: search icon, a bordered pill holding bell + card
  icons, then a 31px avatar circle (`#99BAC1`, initials "SG").
- **Document header**: red-outline PDF tile (38px, bordered), doc ID in small faint text over
  the document name (19px / 600), and right-aligned a split "Review in Progress ⌄" bordered
  button with an internal divider before the caret.
- **Three columns**: document pane (flexible) · fields panel (372px, left hairline) ·
  right icon rail (50px — four 34px circular bordered buttons, the fields one active on
  `--teal-tint`).
- **Document pane**: a `#F9F9F9` rounded toolbar strip (50px) with compare / search /
  download icons right-aligned; below it the contract text, max-width 720px,
  **`margin: 0 auto`** — never left-pinned, or wide screens show a dead white field
  before the panel.
- **Fields panel header**: "128 Fields ⌄" left, search + kebab right.

## Design tokens (sampled from the real product — do not invent new ones)

    --teal:       #03525F   /* primary buttons, brand */
    --teal-deep:  #0D5F6A   /* icons, active markers, wordmark */
    --teal-tint:  #E4F1F1   /* active nav chip fill */
    --teal-pale:  #F0FAFB   /* live document highlight fill */
    --teal-rule:  #2D737B   /* live highlight underline (inset 2px) */
    --mint:       #B0CFC9   /* unreviewed field markers */
    --green:      #2E7D32   /* accepted value chip border/text */
    --green-pale: #EAF5EE   /* reviewed passage fill */
    --ink: #1B1F1E  --muted: #5F6564  --faint: #8B918F
    --line: #E6E8E8  --hair: #EFF1F1  --band: #F5F6F6  --grey-bar: #F9F9F9

Font: Inter (400/500/600). Body 14px; contract text 13.5px / 1.9; contract heading 15.5/600.
One accent family (teal); green is reserved for the accepted/verified state only.

## Field card anatomy (this is where sloppiness shows — follow exactly)

- Card: white, 1px `--line` border, radius 10, `overflow: hidden`, 10px between cards.
  Open card: border `#D5DBDA` + a very soft shadow. Never two hairlines touching.
- Header row: 14px 16px padding, 12px gap: marker · name (13.5px/400) · pager.
- Marker: 9px, **circle for metadata, square for clause-type fields** (shape carries type),
  `--mint` when unreviewed, `--teal-deep` when active/reviewed.
- Pager "‹ 1/3 ›" is visible **only on the open card**.
- Value chip: white pill, 1px `--green` border, green text, padding 8px 18px, `gap:0`.
  The tick sits **after** the value text, not before it, and is `width:0; margin-left:0;
  overflow:hidden` until accepted — animating to `width:14px; margin-left:9px` with the
  opacity/scale spring (`cubic-bezier(.34,1.56,.64,1)`). Reserving the tick's space up front
  leaves a dead gap before the value on every unreviewed chip; never do it.
  **The tick appears only after Accept is clicked** — never pre-ticked.
- Chip row padding: 2px 16px 16px.
- Action band: `--band` fill, **1px `--hair` top divider**, 12px 16px padding, 16px gaps:
  Accept (teal, radius 6, 10px 24px, 13px/500) · pencil · trash · spacer · note icon.
  Icon buttons are 32px squares, radius 6, hover `#EBEEED`.
- Card open/close animates `max-height` ~550ms `cubic-bezier(.22,.61,.36,1)`.

## Autoplay cursor

A 16px **ring** (2px `rgba(3,82,95,.9)` border, transparent fill, white outer glow) — never a
filled disc that hides the label under it. It glides (~800ms eased), aims at the lower-right
corner of the Accept button rather than dead centre, presses (scale .78 for 130ms), then the
loop advances.

**The sequence must teach the product, not just click through it.** A passive viewer should
learn what the screen can do without touching anything. Interleave demonstrations:

- On roughly every third field, before accepting: the cursor travels into the contract, rests
  on the live highlighted passage, the hover tooltip opens for ~1.5s, then closes.
- Once per cycle: the cursor moves across the edit and delete icons in the action band, each
  lighting its hover state for ~600ms, so the alternatives to Accept are visible.
- CSS `:hover` cannot be triggered from script — give hoverable elements a `.hot` class that
  shares the `:hover` rule, and drive that class from the autoplay.
- The tooltip must be a callable `showTip(el)` / `hideTip()` pair used by BOTH the real
  `mouseenter` listener and the autoplay — never duplicate the logic.

Caption chip bottom-left: "Prototype, playing a recorded sequence · hover a highlight, or
click Accept".

## Data rules

- Invented parties only — currently "Halcyon Systems, Inc." and "Northbridge Retail".
  Never real company names unless the user confirms they're cleared demo data.
- Realistic clause language (definitions, term & termination, fees, force majeure) —
  never lorem ipsum. 8 fields spanning pages, mixing circle and square marker types.
- All SVG icons inline (a `<defs>` sprite with `<use>`), no icon fonts, no CDN dependencies.
  One self-contained file; state in JS variables only — no localStorage.

## Quality bar — verify BEFORE delivering, every time

Render the file headless and actually look at the screenshots. Do not skip this.

1. Screenshot at container width (~1000px) **and** at 1800px. At 1800px the contract column
   must sit centred with even margins — no dead zone against the panel.
2. Crop the open field card at ~200% and inspect: no double hairlines, no stray white slivers
   between the action band and the card edge, chip not crowding the header, even padding.
3. Screenshot mid-autoplay: the cursor ring must never make a button label unreadable.
4. Confirm the tick is absent before Accept and present after — the reference screenshot's
   pre-ticked chip was a bug, not a spec.
5. Check the console for JS errors; zero is the bar.
6. Sweep for hardcoded colours outside the token block; everything derives from tokens.
7. Screenshot mid-hover-demo and confirm the tooltip actually renders on screen — verify the
   element's computed opacity and position in the DOM, not just that the code path ran.
8. Crop an unreviewed chip: the text must sit centred in the pill with equal padding, with no
   reserved gap where the tick will later appear.

If any check fails, fix and re-render before showing the result. Deliver the file plus two
screenshots (full view, zoomed card) as proof the checks ran.
