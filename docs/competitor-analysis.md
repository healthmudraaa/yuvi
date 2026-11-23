# Yuvi — Competitor Landscape (Embedded Group Health Insurance / Insurtech, India)

Scope: platforms that sell, administer, or embed **group/employee health insurance** via API, with a focus on multi-insurer aggregation, benefits add-ons, and copay/OPD top-ups — the space Yuvi is entering.

| Player | Core model | Multi-group / multi-insurer aggregation | Add-ons marketplace | Copay waiver / top-up | Embedded API for partners | Primary buyer |
|---|---|---|---|---|---|---|
| **Bimaplan** | Full-stack embedded insurance platform (API-first) | Yes — plugs into multiple insurers via one integration | Life, health, travel, credit/EMI protect | Not a named feature | Yes — core product is the API/SDK | Fintechs, NBFCs, lending apps |
| **Plum** | SME/enterprise group health broker + platform | Partial — own-curated insurer panel, not open aggregation | Wellness, OPD, dental, mental health | OPD cashback-style add-ons, not framed as "copay waiver" | Admin dashboard API, limited embed | HR/People teams at startups & SMEs |
| **Loop Health** | Health insurance + primary care bundled | No — single underwriting partner model | Doctor consults, diagnostics, gym | No explicit copay waiver | No public embeddable API | Mid-large enterprises |
| **Onsurity** | Subscription-based employee health membership | No — Onsurity is itself the single plan issuer | OPD, pharmacy, diagnostics bundled into membership tiers | Built into membership (soft, not insurance-copay specific) | No developer/API platform | SMEs, startups (incl. gig/contract workers) |
| **Pazcare** | Group health insurance broker-tech platform | Partial — multi-insurer quotes, single policy per client | OPD, wellness, insurance literacy | No | Internal tooling only, no partner API | HR teams, insurance brokers |
| **Nova Benefits** | Group health broker platform | Partial — multi-insurer comparison at renewal | Wellness perks | No | No | SME HR teams |
| **SahiBima / Zyla / Even Healthcare** | Health membership / subscription care | No — single-panel | OPD + wellness subscriptions | Partial, framed as subscription perks | No | Consumers/SME employees directly |
| **Symbo (Reliance-backed)** | Embedded insurance infra, bite-sized policies | Yes, insurer-agnostic for *product* embedding (not group-specific) | Broad — travel, device, health micro-policies | No | Yes — API-first, closest structural analog to Bimaplan | E-commerce, fintech, travel apps |

## Where the white space is for Yuvi

1. **No one aggregates *multiple employer group policies* into a single employee-facing layer.** Every competitor sells *one* policy (theirs, or one insurer's) per employer. Yuvi's pitch — sit on top of whichever group policy(ies) an employee already has, across insurers — has no direct incumbent.
2. **"Copay waiver" is not a named product category.** Everyone treats OPD/wellness as the add-on lane; nobody frames the add-on explicitly as *waiving the employee's copay/deductible gap* on the *existing* employer policy. This is a sharper, easier-to-explain value prop than "better coverage" or "wellness perks."
3. **API-first embedding is rare in the group-health segment specifically.** Bimaplan and Symbo are API-first, but for retail/lending-attached insurance, not group/employer health. Loop, Plum, Onsurity, Pazcare, Nova are all closed, sales-led platforms with no public dev docs. A credible "Tech/API" page positions Yuvi as the only API-first player in group health add-ons — a real differentiator to show in the proposal.
4. **Risk to flag honestly:** aggregating *other insurers'* group policies (not just selling your own) implies data/claims integration with each insurer's TPA — this is the hard technical and commercial lift competitors have avoided by staying single-insurer. Worth a slide on phased rollout (start with 2–3 insurer/TPA integrations, expand) rather than claiming full aggregation day one.

## Positioning line for the deck

> "Plum and Onsurity sell you *a* policy. Bimaplan and Symbo embed *someone else's* policy into *your* app. Yuvi is the only platform that sits on top of the group policy your employees **already have** — any insurer — and lets them top up exactly the gap that hurts: the copay."
