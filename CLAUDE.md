# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A dependency-free static affiliate site (arbitragesportsbet.com) reviewing arbitrage betting software. Plain HTML/CSS/JS — no build step, no framework, no node_modules. Deployed to GitHub Pages via `.github/workflows/pages.yml` on every push to `main`; the deploy runs `npm test` first, so a failing check blocks deployment.

## Commands

- `npm test` — runs `scripts/check-site.mjs`, the only validation. It walks every `.html` file and fails if any page is missing a `<title>`, missing the string "Affiliate disclosure", or contains a broken root-relative internal link (`href="/..."`). There is no way to run it against a single file; it's fast enough not to matter.
- `npm run serve` — serves the site locally at http://localhost:4173 via `python3 -m http.server`.

## Structure and conventions

- Every page is a directory with an `index.html` (e.g. `reviews/betburger/index.html`) so URLs are clean trailing-slash paths. Internal links are root-relative (`/reviews/betburger/`) — the checker resolves them against the repo root.
- Content clusters: `reviews/` (per-product), `comparisons/` (X-vs-Y), `alternatives/` (X-alternatives), `australia/` (country-specific buyer pages), `guides/`, `calculators/`, plus trust pages `methodology/`, `affiliate-disclosure/`, `responsible-gambling/`.
- Pages are single-line/minified-style HTML sharing `/assets/styles.css` and `/assets/calculator.js` (loaded on every page; the calculator activates only inside a `.calc` container).
- **When adding a page:** include a `<title>`, the affiliate-disclosure footer, and add the URL to `sitemap.xml`. New pages must pass `npm test`.
- `affiliate_verification.html` is a vendor verification file whose content must remain exactly `<body> verification: "BetBurger" </body>` — the site checker asserts this and exempts it from the editorial checks. Don't "fix" or reformat it.

## Editorial rules (from docs/plans/2026-06-30-project-buildout-plan.md)

- Never invent pricing, bookmaker coverage, EPCs, or cookie windows. Claims are labeled observed / partner-confirmed / tested / unknown, and stay provisionally worded until verified.
- Every money page needs an affiliate disclosure, responsible-gambling language, and internal links to review/comparison/calculator pages.
- Brand name is exactly `ArbitrageSportsBet.com` (not "ArbitrageSportsBetting").
- The buildout roadmap and current-phase priorities live in `docs/plans/`.
