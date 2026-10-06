# Cromwell Community Site — Frontend Build Manifest

**Built by:** Frontend Developer (attempt 2 of the build task)
**Source of truth:** `cromwell-community-site/content/*.md` + `cromwell-community-site/design/**`
**Target URL:** https://springteasers.github.io/cromwell-community/
**Deploy target:** GitHub Pages — repo `SpringTeasers/cromwell-community`, branch `main`, site root = `code/` contents.

---

## Files ready for deployment

All files below are in `cromwell-community-site/code/` and are complete, validated, and deploy-ready.

| File | Bytes | Template | Notes |
|---|---|---|---|
| `index.html` | 20,187 | A — Landing | Home. Hero, 6 guide cards, 9-row fact table, New to Town steps, CTA band. |
| `about-cromwell.html` | 19,180 | B — Article | History, government, key facts table, population, getting here. |
| `things-to-do.html` | 18,830 | B — Article | River, three `.section--awaiting` blocks, nearby, plan-your-visit. |
| `local-businesses.html` | 19,869 | C — Directory | 3 sourced businesses + 6 `.card--empty` category slots. |
| `town-services.html` | 25,161 | B — Article | Service cards, transit pending block, quick-reference table with `row--pending`. |
| `news-events.html` | 23,181 | C — Directory | `.banner--sample`, 5 EXAMPLE cards, events table, official-sources table. |
| `contact.html` | 21,652 | B — Article | Town Hall card, `.field--placeholder` for phone/hours, who-to-contact table, no form. |
| `css/tokens.css` | 2,875 | — | Design token layer. |
| `css/styles.css` | 32,983 | — | Full visual system, 22 sections. |
| `js/site.js` | 6,476 | — | Drawer, footer accordions, sticky hairline. |
| `assets/hero-connecticut-river.svg` | 3,092 | — | Home hero artwork. |
| `assets/og-image.svg` | 3,157 | — | 1200×630 Open Graph image. |
| `.nojekyll` | 0 | — | **Required by the brief.** Prevents Jekyll processing on GitHub Pages. |

**Total: 13 files.**

---

## Routing

Flat, static, extension-based. Every page sits at site root.

| Nav label | File |
|---|---|
| Home | `index.html` |
| About | `about-cromwell.html` |
| Things to Do | `things-to-do.html` |
| Businesses | `local-businesses.html` |
| Services | `town-services.html` |
| News | `news-events.html` |
| Contact | `contact.html` (nav CTA button) |

Every page carries the same primary nav (6 items + Contact CTA), the same mobile drawer (7 items), the same breadcrumb, and the same 4-column footer. `aria-current="page"` marks the active item on both desktop nav and drawer.

---

## Deployment steps

1. Create repo `cromwell-community` under the **SpringTeasers** org (public — GitHub Pages needs it for the free tier).
2. Push the **contents** of `code/` to the repo root on `main` (not the `code/` folder itself).
3. Enable GitHub Pages: source = `main` branch, `/ (root)`.
4. Confirm `.nojekyll` is present at the repo root — without it GitHub Pages runs Jekyll and files beginning with `_` or containing certain sequences can be dropped.
5. Verify the live URL: https://springteasers.github.io/cromwell-community/

**Canonical/OG URLs already point at that exact URL** (`https://springteasers.github.io/cromwell-community/...`), so no post-deploy URL rewrite is needed — provided the repo is named `cromwell-community` under `SpringTeasers`.

---

## Content fidelity notes (do not "fix" these in deploy)

These are deliberate and match the researched, cited copy:

- **Population is `14,225` (2020 U.S. Census)** everywhere it appears. No other figure exists on the site.
- **`No website listed`** for Hunter Law LLC and Bella's Beauty Spot renders as **plain text**, not a link.
- **Hunter Law's address is `Main Street, Cromwell, CT`** with no street number — reproduced as published.
- **Town Hall phone and office hours are absent**, shown as `.field--placeholder` / `.section--awaiting`. The research did not supply them.
- **Transit has no named operator or route** — the research did not supply one.
- **News & Events is sample content**: the `.banner--sample` is at the top, and every entry carries a literal `EXAMPLE` status tag as **real DOM text** (not a CSS pseudo-element) so screen readers announce it.
- **`things-to-do.html` names no park, trail or landmark** — it provides "where to check" links instead, per the content brief.

## Accessibility built in

- Skip link is the first focusable element on every page.
- Exactly one `<h1>` per page; heading order is sequential.
- External links carry `rel="noopener"` and an `sr-only` "(opens in a new tab)".
- Mobile drawer: focus trap, `Esc` to close, scroll lock, `inert` on main.
- Footer accordions only become buttons below 600px; above that the lists render as normal.
- All interactive targets ≥ 44px. Colour pairs clear WCAG AA (long-form text clears AAA).
- `<caption class="sr-only">` on every data table; responsive tables expose `data-label` as visible labels in the mobile card stack.
