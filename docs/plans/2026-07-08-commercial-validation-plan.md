# ArbitrageSportsBet.com — Commercial Validation Plan

Date: 2026-07-08. Supersedes the strategy sections of `2026-06-30-project-buildout-plan.md` (task-level history there remains valid).

## Goal restated

Prove or disprove, cheaply and quickly, that ArbitrageSportsBet.com can generate affiliate revenue, subscribers and organic traffic — using evidence-led comparison content, without overbuilding and without compliance risk.

## Highest-leverage strategy

**Revenue validation does not need SEO to succeed first.** The site already holds written partner terms from BetBurger (30% recurring, comparison pages allowed, verification file live) and RebelBetting (up to 35% recurring, signup invited). The fastest path to a revenue signal is: complete those two affiliate signups, place disclosed links on the existing money pages, and measure clicks/trials — while the 37-page content base compounds in search over the following months. Everything else supports that sequence.

## Challenged assumptions (from the earlier plan)

1. **"Publish 3–5 pages/week until 40 pages exist"** — wrong bottleneck after this buildout. The site now has 37 indexable pages. The bottleneck is affiliate activation and evidence depth, not page count. Cadence drops to 1–2 high-intent pages/week.
2. **"Australia cluster is an easy topical angle"** — half right. It is a real differentiator (almost no competitor addresses licensed-pool coverage honestly) but it is a *trust and conversion* asset more than a traffic asset; Australian search volume for these terms is thin. Build it for authority and AU partner conversations (Bookie Charity, Bonusbank), not as the primary traffic bet.
3. **"Alternatives pages capture high-intent traffic"** — true only once individual reviews rank; alternatives keywords are low-volume and competitive. Keep the four built; don't build more until Search Console shows impressions.
4. **"BetOnValue is a priority partner"** — demote. Site was Cloudflare-blocked during research; nothing is verified. Trademate, Bookie Charity and Bet Hero have observed 30–50% recurring terms and are easier wins.
5. **Unstated assumption that traffic will come** — the honest risk: a new gambling-adjacent domain may take 6–12 months to rank for anything commercial. That is why revenue validation runs through direct partner activation and the newsletter, not through rankings.

## Critical assumptions this plan relies on

- BetBurger and RebelBetting affiliate approvals complete without new restrictions (both have written confirmations already).
- Google indexes the site normally once Search Console is verified (no manual action against the domain).
- The operator (Ron) can spend ~5–8 hours/week: partner follow-ups, evidence capture in a real browser, and 1–2 pages.
- Recurring software commissions (30–35%) on €70–360/month products make even single-digit monthly referrals a meaningful validation signal.

## 1. Positioning

**"The evidence-led buyer's guide for arbitrage and value betting software."** Every claim labelled observed / partner-confirmed / tested / unknown; no income claims; risk-honest guides; visible disclosures. The anti-thin-affiliate site. This is both the moat (hard to fake, compounding trust) and the compliance posture.

## 2. Target audience

Primary: bettors in AU/EU/UK actively researching a €50–360/month scanner subscription — they've seen the marketing and want an independent check before paying. Secondary: Australians needing licensed-pool and legality clarity. Tertiary (education → email): beginners deciding whether arbitrage is for them at all.

## 3. Content/SEO angle

Combination, weighted: **product-led commercial pages** (reviews, comparisons, alternatives) are the revenue spine; **calculators + risk-honest guides** are the link-earning authority layer; **Australia** is the differentiation wedge. Matched betting: comparison-guide coverage only (done), no cluster — different audience, saturated UK market, weak AU fit. Odds-comparison portals: out of scope entirely; that market belongs to giants.

## 4. Pages built to reach 37 (2026-07-08)

Guides hub + 6 guides (vs value betting, vs matched betting, limits, bankroll, mistakes, still-profitable); calculators hub + 4 calculators (implied probability, hedge, EV, Kelly staking); Australia legal/risk, AU bookmaker coverage, RebelBetting Australia; BetOnValue alternatives; trial checklist (lead-magnet page). Remaining pipeline (only after affiliate activation): Trademate review, Bookie Charity review (AU), BetBurger Australia, "how we test" expansion of methodology, arbitrage-calculator guide walkthrough.

## 5. Internal linking structure

Hub-and-spoke, three hubs: `/best-arbitrage-betting-software/` (commercial), `/guides/` (education), `/calculators/` (tools), plus `/australia/…` as a regional mini-hub. Rules: every guide/calculator links to at least one money page and the trial checklist; every money page links to its review(s), one comparison, one calculator and `/responsible-gambling/`; the trial checklist is the universal mid-funnel target (linked from every cluster, converts readers to trials = affiliate events). All implemented in the current build.

## 6. Comparison table structure (money pages)

Columns: Tool | Verification status badge | Best for | Pricing (with observed date) | Trial terms | Coverage (labelled verified/unknown) | Key limitation | Link to review. Never rank by number until hands-on testing exists; use status badges (Evidence collected / Hold / Research) as the honesty layer — implemented on the homepage research-status table.

## 7. Review criteria (fixed set, every review)

1. Pricing with dated source; 2. Trial terms; 3. Strategy modes (surebets/value/middles); 4. Bookmaker/exchange/broker coverage by country; 5. Odds freshness (tested); 6. Alert-to-action workflow; 7. Limits footprint features (stake rounding etc.); 8. Who it's for / who should not buy; 9. Affiliate relationship disclosure; 10. Verdict with explicit provisional/tested status.

## 8. Evidence system

Already operating; formalise as: every claim on a money page traces to a dated entry in Obsidian `Source Log.md`; screenshots stored in the vault with `YYYY-MM-DD-product-page` names; labels observed (fetched/seen), partner-confirmed (written reply), tested (hands-on), unknown (say so on-page). Refresh pricing evidence every 60 days or on partner notification; the review's disclosure block carries the "research status updated" date.

## 9–10. Affiliate CRM and outreach

Both already exist and are current in the Obsidian vault (`Affiliate Programs/Affiliate CRM.md`, `Affiliate Outreach Templates.md`, send-ready drafts dated 2026-07-01). No rebuild needed. Priority queue stands: 1) BetBurger application completion + review access; 2) RebelBetting affiliate signup + permissions; 3) OddsJam written exception only; then Bet Hero, Trademate, Bookie Charity (AU), Bonusbank (AU).

## 11. Monetisation plan

Phase 1 (now): recurring software commissions from BetBurger + RebelBetting on existing money pages; measure clicks → trials → paid. Phase 2 (after 2+ partners live): add AU-fit partners (Bookie Charity, Bonusbank) to the Australia cluster. Phase 3 (only with traffic data): newsletter sponsorships/expanded partners. Never: sportsbook/casino CPA, offshore operators, pay-for-ranking.

## 12. Compliance checklist (every page, every partner)

- Affiliate disclosure visible near content and CTAs ✅ (enforced by `npm test`)
- Responsible gambling language + link; BetStop named for AU audiences ✅
- No "guaranteed profit / risk-free / easy money / passive income" phrasing — grep before every deploy: `rg -i "guaranteed profit|risk-free income|easy money|passive income" --glob '*.html'`
- No links or instructions facilitating offshore/unlicensed gambling access for Australians
- AU legal content marked "general information, not legal advice" ✅
- Partner restrictions honoured (OddsJam: no promotion until written exception)
- Claims labelled; pricing always carries an observed date

## 13. Newsletter plan

Lead magnet exists as `/trial-checklist/` (canonical on-page version). Next: pick a low-cost ESP (Buttondown or MailerLite tier), add a single form to homepage, best-software hub, calculators hub and Australia hub; deliver a PDF/printable version of the checklist on signup. Cadence: monthly "what changed" (pricing changes observed, partner status, new evidence) — cheap to write from the source log, genuinely useful, zero hype. KPI: signups per 100 visitors on pages with the form.

## 14. Click-tracking plan (no cloaking)

Plausible (lightweight, cookieless, ~$9/mo) over GA4 for a static site. Track outbound clicks with `data-partner` attributes + Plausible custom events; direct visible affiliate links (no redirect chains) now that BetBurger permits standard links; only add `/go/[partner]/` pages if a partner's terms require their tracker domains, and then with a visible "this is an affiliate link" interstitial note. Never mask destinations.

## 15. 30-day execution plan

- Week 1: Push this buildout live; verify Search Console (domain property) + submit sitemap; complete BetBurger application, request 3-month review access; sign up RebelBetting affiliate program.
- Week 2: Install Plausible + outbound click events; place approved affiliate links with disclosures on reviews/comparisons/hubs; capture fresh dated screenshots for the top-3 reviews in a real browser.
- Week 3: ESP + email form live; hands-on BetBurger trial week logged per own trial checklist; publish testing notes into the review.
- Week 4: RebelBetting trial week logged; publish; first "what changed" newsletter; review Search Console for indexing coverage issues.

## 16. 90-day roadmap

Days 31–60: OddsJam exception outcome recorded either way; Trademate + Bookie Charity applications; 4–6 new pages only where Search Console shows impressions (likely guides/calculators); begin digital-PR pushes (below). Days 61–90: first revenue read — clicks, trials, conversions per partner dashboards; kill/scale decision per cluster; if AU partners approved, build Bookie Charity review + BetBurger Australia. Decision gate at day 90: if zero trials from ≥500 sessions, the problem is traffic mix — shift effort to link building and long-tail guides; if trials but no conversions, the problem is partner fit — renegotiate or reprioritise partners.

## 17. Backlink / digital PR strategy

Realistic for a solo operator: (1) calculators as linkable assets — pitch to betting-strategy forums, subreddits (r/sportsbook etc.) where tools are shareable, and "free calculator" roundups; (2) the AU legal/risk explainer pitched to responsible-gambling and consumer-finance writers as a rare non-promotional resource; (3) HARO/Qwoted-style expert commentary on arbitrage/limits topics; (4) partner newsletters (BetBurger/RebelBetting often feature affiliates). No paid links, no PBNs, no guest-post farms — one manual-action risk would kill the domain.

## 18. Do-not-waste-time-on-yet list

More alternatives pages; US/UK country clusters; matched-betting cluster; BetOnValue review; custom /go/ redirect system; schema markup beyond basics; social accounts; paid ads (compliance minefield); site redesign; migrating off GitHub Pages; automated odds data anything.

## 19. Biggest risks

1. **Indexing/ranking failure** (new gambling-adjacent domain) — mitigated by direct-activation revenue path + linkable assets; measured via Search Console from week 1.
2. **Partner concentration** — RebelBetting/BetBurger changing terms kills phase 1; mitigated by the B-list pipeline already in the CRM.
3. **Compliance drift** — one careless "guaranteed profit" phrase undermines the whole positioning; mitigated by the grep check and the labelled-claims system.
4. **Operator time** — evidence-led reviews need real browser sessions; if hours/week collapse, freeze publishing before freezing partner follow-ups.
5. **AU regulatory movement** — ad/inducement reforms are live politics; the site's software-not-sportsbook focus is the hedge, but re-check quarterly.

## 20. Fastest revenue validation

BetBurger application → review access → affiliate links live on `/reviews/betburger/`, `/best-arbitrage-betting-software/` and both BetBurger comparisons → Plausible outbound events → partner dashboard trials. Terms are already confirmed in writing; this can produce a first signal within the partner's payout cycle. RebelBetting parallel. Everything else is compounding, not blocking.

## 21. Launch-ready milestone checklist

- [x] 35–40 indexable pages (37 live in repo)
- [ ] Search Console verified + sitemap submitted (user action)
- [ ] Analytics installed (Plausible account — user action)
- [x] ≥2 affiliate programs with outcomes (BetBurger terms confirmed; RebelBetting reply received; OddsJam hold documented)
- [x] Top-3 reviews carry dated evidence (2026-07-01 snapshots; browser screenshots still to add)
- [x] Money pages: CTA + disclosure + RG link + internal links
- [x] `npm test` passes (38 files)
- [ ] Live smoke checks post-deploy (after push)
