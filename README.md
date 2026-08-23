# Portfolio, Amrit Kumar

Static site. No build step, no dependencies. Open `index.html` in a browser to preview.

## Before you push: two folders must not be published

This folder contains material that should never reach a public repository:

- `Contract relationshp docs and dump/`: Sirion prototypes, for live interview walkthroughs only
- `About Photos/`: personal photos

Both are listed in `.gitignore`, which protects you **only if you push with git**.
GitHub's drag-and-drop web uploader ignores `.gitignore` entirely. If you upload
through the browser, move these two folders somewhere outside this directory first.

## What's in here

| File | Purpose |
|---|---|
| `index.html` | Homepage |
| `auto-extraction.html` | Case study 02, verifying AI-extracted contract data (14 min) |
| `contract-understanding.html` | Featured case study, contract relationships (14 min) |
| `intent-model.html` | Case study 03, the intent model (8 min) |
| `airtel-self-serve.html` | Case study 04, Airtel self-service (4 min) |
| `home-3d.html` | 3D experiment, linked from Contact |
| `404.html` | Not-found page |
| `og-image.jpg` | Social share card, 1200x630 |
| `family-graph.html` | The 340-SOW prototype, autoplaying. Embedded in two pages, noindex, never linked directly |
| `sitemap.xml`, `robots.txt` | Search |
| `LANDING-PAGE.md` | The homepage in full: every line, the reasoning, tokens, open items |
| `CONTENT.md` | Every line of copy on the site, plus the rules that govern it. Regenerate with `extract-content.py` |
| `extract-content.py` | Rebuilds `CONTENT.md` from the HTML |
| `_archive/` | Superseded drafts and unused crops. Gitignored, kept locally |
| `WORKING-WITH-CLAUDE.md` | How to run a session on this site without the correction loop |
| `PLAN.md` | Working notes. Gitignored |

Images ship as a JPEG plus a WebP sibling, served through `<picture>`.

## Still to do, only you can do these

1. **Resume and LinkedIn.** Both links in Contact are `href="#"` placeholders. Drop
   `resume.pdf` in this folder and send me your LinkedIn URL.
2. **Logo.** Save it here as `logo.svg` and it can replace the text mark in the rail
   on all four case-study pages.
3. **Set the real domain.** Every page has `og:image` and `og:url` pointing at
   `https://www.designamrit.com/`. If you publish elsewhere, find and replace that
   string across all HTML files plus `sitemap.xml` and `robots.txt`.

## Publish: GitHub Pages

```bash
cd "Portfolio 26"
git init
git add .
git status          # check the two private folders are NOT listed
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

Run `git status` before committing and confirm neither private folder appears.

Then **Settings → Pages → Deploy from a branch → main / (root)**.
Live at `https://<username>.github.io` within a minute or two.

**Custom domain:** add a file named `CNAME` containing just `www.designamrit.com`,
then point a CNAME record at `<username>.github.io` with your registrar.

## Conventions worth keeping

- No em dashes anywhere. Colons, commas and full stops instead.
- Every claim on the site is defensible. Pre-launch work is labelled as such,
  targets are called targets, recreated screens say so.
- Images: max ~1800px wide, JPEG at quality 86 plus a WebP sibling.
- Motion respects `prefers-reduced-motion`.
- Case-study pages share one layout: fixed left rail with a section list and
  scroll-spy, collapsing to a sticky topbar below 1080px.
