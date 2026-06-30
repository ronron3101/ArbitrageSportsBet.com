# ArbitrageSportsBet.com Project Buildout Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task when scaling beyond the current static MVP.

**Goal:** Turn the live static MVP into a credible, indexable affiliate authority site for arbitrage betting software without making unverified claims.

**Architecture:** Keep the current GitHub Pages static site for speed and low cost. Expand commercial-intent clusters first, then add evidence-backed review depth, tracking, analytics, and partner operations. Preserve trust with visible affiliate disclosure, responsible gambling language, source logs, and provisional wording until claims are verified.

**Tech Stack:** Static HTML/CSS/JS, GitHub Pages, Node validation script, Obsidian project knowledge base.

---

## Current State — 2026-06-30

- Live domain: `https://arbitragesportsbet.com/`
- Local repo: `/Users/ron/Projects/ArbitrageSportsBet.com`
- Knowledge base: `/Users/ron/Documents/LUMINI_Obsidian_Starter_Vault_Clean/04 ArbitrageSportsBet.com`
- Page count after today's buildout: 20 HTML pages.
- Current verification command: `npm test`
- Validation result: `Checked 20 HTML files; no missing titles/disclosures or broken internal links.`

## Commercial Strategy

Prioritise recurring software subscription affiliate programs over sportsbook/casino CPA offers. The moat should be independent comparison content, calculators, transparent methodology, country-specific buyer guidance, and better source hygiene than thin affiliate listicles.

## Phase 1 — Technical Launch Hygiene

### Task 1: Keep brand/domain consistent

**Objective:** Ensure every visible brand reference uses `ArbitrageSportsBet.com`.

**Files:**
- Modify: every `*.html`

**Verification:**

```bash
rg "ArbitrageSportsBetting|SportsBetting" . --glob '*.html'
npm test
```

Expected: no old branding in HTML and test passes.

### Task 2: Submit indexation assets

**Objective:** Make Search Console/Bing setup straightforward.

**Files:**
- Created: `robots.txt`
- Created: `sitemap.xml`

**Next manual action:** submit `https://arbitragesportsbet.com/sitemap.xml` in Google Search Console after property verification.

## Phase 2 — Money Page Expansion

### Task 3: Alternatives cluster

**Objective:** Capture high-intent searches from users considering or leaving a product.

**Files created:**
- `alternatives/index.html`
- `alternatives/rebelbetting-alternatives/index.html`
- `alternatives/betburger-alternatives/index.html`
- `alternatives/oddsjam-alternatives/index.html`

**Verification:**

```bash
npm test
python3 -m http.server 4173
curl -I http://localhost:4173/alternatives/
```

### Task 4: Australia cluster

**Objective:** Start an Australia-specific buying cluster, aligned with the user's local market knowledge and likely easier topical angle.

**Files created:**
- `australia/best-arbitrage-betting-software-australia/index.html`

**Next supporting pages:**
- `australia/arbitrage-betting-australia-bookmaker-coverage/`
- `australia/arbitrage-betting-legal-risk-australia/`
- `australia/rebelbetting-australia/`

## Phase 3 — Evidence Upgrade

### Task 5: Source-backed screenshots and pricing archive

**Objective:** Replace provisional statements with dated evidence.

**Files to update:**
- `reviews/rebelbetting/index.html`
- `reviews/betburger/index.html`
- `reviews/oddsjam/index.html`
- Obsidian `Source Log.md`
- Obsidian `Arbitrage Software Feature Matrix.md`

**Rules:**
- Do not invent pricing, bookmaker coverage, EPCs, or cookie windows.
- Label every item as observed, partner-confirmed, tested, or unknown.

### Task 6: Affiliate CRM and outreach

**Objective:** Convert the site from content shell to monetisable partner pipeline.

**Files to update:**
- Obsidian `Affiliate Programs/Affiliate CRM.md`
- Obsidian `Affiliate Programs/Affiliate Outreach Templates.md`

**Partner priority:** RebelBetting, BetBurger, BetOnValue, ArbMate/OddStorm, Trademate/Bookie Charity. Keep OddsJam paused until independent comparison permissions are clear.

## Phase 4 — Conversion Infrastructure

### Task 7: Click tracking without cloaking

**Objective:** Track partner clicks transparently once affiliate links are approved.

**Implementation direction:**
- Add `/go/[partner]/` disclosure interstitial pages or transparent redirect pages only after partner terms are confirmed.
- Keep visible disclosures near CTA buttons.
- Track outbound clicks with GA4/Plausible events if analytics is installed.

### Task 8: Email capture

**Objective:** Capture visitors who are not ready to buy software yet.

**Lead magnet:** “Arbitrage Betting Software Trial Checklist.”

**Pages to modify:**
- Homepage
- Best software hub
- Calculator page
- Australia page

## Phase 5 — Publishing Cadence

### Task 9: Weekly content sprint

**Objective:** Publish 3–5 pages/week until the first 40 pages exist.

**Priority order:**
1. Product alternatives pages.
2. Product-vs-product comparisons.
3. Australia-specific buyer pages.
4. Beginner/risk guides with calculator CTAs.
5. Individual reviews after screenshots and pricing evidence are collected.

## Definition of Done for the Next Major Milestone

The project is commercially launch-ready when:

- 35–40 indexable pages exist.
- Search Console and analytics are installed.
- At least two affiliate programs have either approved, rejected, or requested changes.
- Top 3 reviews have dated pricing/source evidence.
- Each money page has a clear CTA, disclosure, responsible gambling link, and internal links to review/comparison/calculator pages.
- `npm test` passes and live smoke checks return 200 for the main money pages.
