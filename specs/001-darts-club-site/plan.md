# Implementation Plan: DC Farmer Static Website

**Branch**: `001-darts-club-site` | **Date**: 2025-11-22 | **Spec**: `spec.md`
**Input**: Feature specification from `specs/001-darts-club-site/spec.md`

## Summary

Static, mobile-first dark themed website (accent #45e783) for DC Farmer hosted on GitHub Pages with no backend or database. All content (events, news, members, sponsors) embedded as static assets (HTML/Markdown/JSON). Minimal JavaScript limited to member carousel, dynamic year in footer, optional client-side filtering. Security via CSP meta tag, no secrets. Accessibility (WCAG 2.1 A) and performance (fast initial paint, <2s landing) enforced through lean assets.

## Technical Context

**Language/Version**: HTML5, CSS3, ECMAScript Modules (Vanilla JS) – no framework.
**Primary Dependencies**: None (no build tooling). Optional dev-only: Node (future) NOT in MVP.
**Storage**: N/A (static files only). Data as JSON/Markdown embedded in repo.
**Testing**: Manual + automated via GitHub Actions (NEEDS CLARIFICATION: adopt Lighthouse CI & Pa11y).  
**Target Platform**: GitHub Pages (static hosting) – modern browsers (last 2 versions Chrome/Firefox/Safari/Edge).
**Project Type**: Static web site (single web project).
**Performance Goals**: Landing LCP < 2.0s on 25Mbps, total initial JS < 8KB, CSS < 50KB, images optimized (WebP where possible).
**Constraints**: No server logic; CSP via meta only; zero inline scripts/styles; responsive ≥320px; no third-party fonts.
**Scale/Scope**: <= 30 content pages (initial ~10), events/news list < 50 items each, member cards < 50, sponsors < 30.

NEEDS CLARIFICATION items:

1. Testing automation stack (Lighthouse vs custom script).
2. Content format choice for events/news (Markdown frontmatter vs pure JSON).
3. Image optimization workflow (manual pre-processing vs future CI compression).
4. Accessibility audit tooling (Pa11y, axe-core CLI).
5. Carousel implementation details (scroll-snap only vs ARIA roving tabindex).
6. Sponsor tiers benefits wording source (existing dossier vs new copy).
7. CSP policy exact directives (allow data: images only?).

## Constitution Check

| Principle         | Compliance | Notes                                         |
| ----------------- | ---------- | --------------------------------------------- |
| Static-First      | ✅         | No build required; all files static.          |
| Responsive Design | ✅         | Mobile-first CSS breakpoints planned.         |
| Performance       | ✅ (plan)  | Budgets defined; tooling TBD (clarification). |
| Accessibility     | ✅ (plan)  | WCAG A baseline; audit tool pending.          |
| Maintainability   | ✅         | Simple directories, no deps.                  |
| Security          | ✅ (plan)  | CSP meta, HTTPS by Pages, no secrets.         |

GATE STATUS: Proceed to Phase 0; NEEDS CLARIFICATION items must be resolved in `research.md`.

## Project Structure

### Documentation (this feature)

```text
specs/[###-feature]/
├── plan.md              # This file (/speckit.plan command output)
├── research.md          # Phase 0 output (/speckit.plan command)
├── data-model.md        # Phase 1 output (/speckit.plan command)
├── quickstart.md        # Phase 1 output (/speckit.plan command)
├── contracts/           # Phase 1 output (/speckit.plan command)
└── tasks.md             # Phase 2 output (/speckit.tasks command - NOT created by /speckit.plan)
```

### Source Code (repository root)

<!--
  ACTION REQUIRED: Replace the placeholder tree below with the concrete layout
  for this feature. Delete unused options and expand the chosen structure with
  real paths (e.g., apps/admin, packages/something). The delivered plan must
  not include Option labels.
-->

```text
# [REMOVE IF UNUSED] Option 1: Single project (DEFAULT)
src/
├── models/
├── services/
public/
├── index.html
├── about.html
├── clubhouse.html
├── team-edarts.html
├── team-steeldarts.html
├── club-active.html
├── club-passive.html
├── club-committee.html
├── sponsoring.html
├── impressum.html
├── css/
│   ├── base.css
│   ├── theme.css
│   └── components/ (carousel, cards)
├── js/
│   ├── carousel.js
│   ├── year.js
│   └── data-loader.js (optional fetch lists)
├── data/
│   ├── events.json
│   ├── news.json
│   ├── members.json
│   └── sponsors.json
├── images/
│   ├── members/
│   ├── sponsors/
│   └── placeholders/
└── docs/
  └── sponsoring-dossier.pdf

tests/ (future; initial manual)
├── lighthouse/ (config)
└── accessibility/ (pa11y scripts)

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

## Phase 0: Research Plan

Resolve all NEEDS CLARIFICATION items:
| Topic | Task | Output |
|-------|------|--------|
| Testing automation | Compare Lighthouse CI vs GitHub Action using PageSpeed API | Decision & tooling choice |
| Content format | Evaluate Markdown+frontmatter vs JSON for events/news | Selected format per entity |
| Image workflow | Choose manual pre-export vs introduce compression script | Workflow documented |
| Accessibility auditing | Compare Pa11y vs axe-core CLI integration | Tool + script plan |
| Carousel a11y | Decide ARIA pattern (listbox vs scroll region) | Chosen implementation guidelines |
| Sponsor benefits | Source from dossier or create new copy | Content source decision |
| CSP directives | Draft meta CSP with minimal allowances | Final CSP snippet |

Phase 0 Output: `research.md` with Decision/Rationale/Alternatives.

## Phase 1: Design & Contracts (Planned)

Artifacts:
- `data-model.md`: Define schema for Event, NewsArticle, Member, Sponsor.
- `contracts/` (static JSON schema examples for each entity) – purely descriptive since no API.
- `quickstart.md`: How to add/update events, news, members, sponsors, deploy via GitHub Pages.
- Update agent context (N/A for static; note no runtime services).

## Phase 2: Tasks (Future)

Will generate `tasks.md` with prioritized implementation slices (Landing, Teams, Carousel, Sponsoring, Footer, Accessibility pass, Performance optimization).

## Risks & Mitigations
| Risk | Impact | Mitigation |
|------|--------|------------|
| Manual content updates lead to inconsistency | Medium | Document editing workflow in quickstart; optional JSON validator script |
| CSP too strict blocks assets | Low | Iteratively test in staging (local) before commit |
| Accessibility gaps (carousel) | Medium | Use established scroll-snap pattern + keyboard controls + focus management |
| Performance regression (large images) | Medium | Enforce image pre-processing & size guidelines in quickstart |

## Open Questions (to close in research.md)
1. Choose Pa11y vs axe-core for CI.
2. JSON vs Markdown for news/events (lean vs richer formatting).
3. Final sponsor tier benefit text source.

## Exit Criteria for Phase 1
All NEEDS CLARIFICATION resolved; data-model & schemas approved; quickstart instructs contributor workflow; CSP meta finalized.
```
