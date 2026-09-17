# Portfolio, Amrit Kumar

Static site. No build step, no dependencies. Open `index.html` in a browser to preview.

## Before you push: push with git, not the browser

The folder on this machine is 255 MB. The site is 22 MB of it, across 211 files.
`.gitignore` holds back the other 233 MB: source art, working notes, local backups,
and two PDFs, one of which is 103 MB. GitHub refuses any single file over 100 MB,
so a push that included it would fail outright.

**This protects you only if you push with git.** GitHub's drag-and-drop web uploader
ignores `.gitignore` completely. If you ever upload through the browser, you will
publish all 255 MB, including anything private sitting in this folder.

Held back, in full: `_archive/`, `_backup-before-fixes/`, `Claude outputs/`,
`My visual choices/`, `UI Sketch Book/`, `vegnance Library/`, every `.pdf` except
your resume, `index.html.png`, `Final Header- Home.jpg`, the working notes
(`CONTENT.md`, `LANDING-PAGE.md`, `CHANGELOG.md`, `PLAN.md`, `WORKING-WITH-CLAUDE.md`,
`PROMPT-*.md`, the two `.py` scripts), and the unused `morph.js`.

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

The repository is already initialised and `.gitignore` is set. From this folder:

```bash
git add .
git status          # should list about 211 files and nothing else
git commit -m "Portfolio"
git branch -M main
git remote add origin https://github.com/<username>/<username>.github.io.git
git push -u origin main
```

Check `git status` before committing. If you see a PDF other than
`Amrit-Kumar-Resume.pdf`, or any folder listed in the section above, stop.

Then **Settings → Pages → Deploy from a branch → main / (root)**.
Live at `https://<username>.github.io` within a minute or two.

**Custom domain:** every page's `og:url` already says `www.designamrit.com`. To make
that real, point a CNAME record at `<username>.github.io` with your registrar FIRST,
then add a file here named `CNAME` containing just `www.designamrit.com`. Adding the
file before the DNS record is in place takes the site offline until DNS catches up,
which is why it is not in this folder already.

`.nojekyll` is present so GitHub Pages serves the files as they are instead of
running them through Jekyll.

## Conventions worth keeping

- No em dashes anywhere. Colons, commas and full stops instead.
- Every claim on the site is defensible. Pre-launch work is labelled as such,
  targets are called targets, recreated screens say so.
- Images: max ~1800px wide, JPEG at quality 86 plus a WebP sibling.
- Motion respects `prefers-reduced-motion`.
- Case-study pages share one layout: fixed left rail with a section list and
  scroll-spy, collapsing to a sticky topbar below 1080px.
