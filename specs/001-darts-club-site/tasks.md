# Tasks: DC Farmer Static Website (Feature `001-darts-club-site`)

Source: `spec.md` + `plan.md`  | Date: 2025-11-23

## Phases Overview
1. Phase 1 – Setup
2. Phase 2 – Foundational Infrastructure
3. Phase 3 – User Story 1 (Landing Highlights)
4. Phase 4 – User Story 2 (Explore Teams)
5. Phase 5 – User Story 3 (Club Information)
6. Phase 6 – Polish & Cross-Cutting

## Dependency Graph (Story Order)
US1 → US2 (needs team data models) → US3 (uses committee/member models built prior)
Polish phase depends on completion of US1–US3 core tasks.

## Parallel Execution Examples
- Generate JSON schemas (T004) can run parallel with base CSS (T003).
- Member & Team JSON population (T007, T008) can run parallel after schema setup.
- Landing event/news rendering (T011, T012) parallel inside US1 once data loader (T010) exists.
- A11y audit tasks (T027, T028) in polish can run parallel after all pages exist.

## Phase 1: Setup
- [ ] T001 Initialize repository structure: create `public/` base folders (css, js, data, images, news) per plan
- [ ] T002 Add project README section for feature (append to existing `README.md` with feature overview)

## Phase 2: Foundational Infrastructure
- [ ] T003 Create base stylesheet `public/css/base.css` (variables, typography, layout, breakpoints)
- [ ] T004 [P] Add theme/components stylesheet `public/css/theme.css` (cards, grid, buttons)
- [ ] T005 Implement carousel component stylesheet `public/css/components/carousel.css`
- [ ] T006 Create placeholder HTML pages (about, clubhouse, team-edarts, team-steeldarts, club-active, club-passive, club-committee, sponsoring, impressum) under `public/`
- [ ] T007 Populate initial member dataset `public/data/members.json`
- [ ] T008 Populate initial team dataset `public/data/teams.json`
- [ ] T009 Populate committee roles dataset `public/data/committee-roles.json`
- [ ] T010 Implement data loader module `public/js/data-loader.js` (fetch & render events, news teasers, members, teams)
- [ ] T011 Create events dataset `public/data/events.json` (sample future + past exclusion)
- [ ] T012 Create sponsors dataset `public/data/sponsors.json`
- [ ] T013 Add dynamic year module `public/js/year.js`
- [ ] T014 Add carousel interaction module `public/js/carousel.js` (keyboard arrows, Home/End)
- [ ] T015 Add initial news article markdown `public/news/2026-03-15--spring-open-2026.md`
- [ ] T016 Insert CSP meta tag in all HTML pages (security baseline)

## Phase 3: User Story 1 – Landing Highlights (P1)
Independent Test Criteria: Landing shows next 3 future events and 3 newest news articles with fallbacks; keyboard navigation works on page; empty states graceful.
- [ ] T017 [US1] Add landing page `public/index.html` structure (sections: upcoming events, latest news)
- [ ] T018 [P] [US1] Implement events rendering function in `public/js/data-loader.js` (filter future, sort, take 3)
- [ ] T019 [P] [US1] Implement news teasers extraction (frontmatter parse or JSON placeholder) in `public/js/data-loader.js`
- [ ] T020 [US1] Add empty-state messaging markup logic (events/news) in `public/js/data-loader.js`
- [ ] T021 [US1] Accessibility pass for landing (heading order, landmarks) in `public/index.html`
- [ ] T022 [US1] Performance quick check: ensure total CSS+JS < size budgets (manual note in README)

## Phase 4: User Story 2 – Explore Teams (P2)
Independent Test Criteria: Each team page loads roster, team name/type, highlight section; fallback when roster empty.
- [ ] T023 [US2] Add roster render logic (E-Darts) in `public/js/data-loader.js`
- [ ] T024 [P] [US2] Add roster render logic (Steel Darts) in `public/js/data-loader.js`
- [ ] T025 [US2] Add team highlight placeholder sections to `public/team-edarts.html` & `public/team-steeldarts.html`
- [ ] T026 [US2] Empty roster fallback messaging (per team) in `public/js/data-loader.js`

## Phase 5: User Story 3 – Club Information (P3)
Independent Test Criteria: About, Clubhouse, Active, Passive, Committee pages display structured content or fallbacks independent of other pages.
- [ ] T027 [US3] Populate About page content blocks in `public/about.html` (mission/history placeholders)
- [ ] T028 [P] [US3] Populate Clubhouse page content blocks in `public/clubhouse.html` (facilities placeholders)
- [ ] T029 [US3] Implement active members list render in `public/js/data-loader.js`
- [ ] T030 [P] [US3] Implement passive members list render in `public/js/data-loader.js`
- [ ] T031 [US3] Implement committee roles + member mapping render in `public/js/data-loader.js`
- [ ] T032 [US3] Add empty-state fallback for committee roles without assigned members in `public/js/data-loader.js`

## Phase 6: Polish & Cross-Cutting
- [ ] T033 Add alt text review across all `public/*.html` and image references
- [ ] T034 [P] Add external link `rel="noopener noreferrer"` where needed (e.g., sponsor links) in HTML files
- [ ] T035 Optimize sample images (add placeholder `public/images/placeholders/member.webp`) and document sizes in `quickstart.md`
- [ ] T036 Add initial Lighthouse manual run notes to `README.md`
- [ ] T037 Add initial Pa11y manual run script placeholder `tests/accessibility/pa11y.config.json`
- [ ] T038 Add JSON schema validation instructions to `quickstart.md`
- [ ] T039 Security review checklist addition to `README.md` (CSP present, no inline scripts/styles)
- [ ] T040 Final accessibility sweep: keyboard navigation carousel test note in `README.md`
- [ ] T041 Prepare GitHub Actions workflow draft (not enabled) `/.github/workflows/quality.yml` (placeholder)

## MVP Definition
Completion of T017–T022 (US1), T023–T026 (US2), T027–T032 (US3) plus security baseline (T016) and dynamic year (T013) constitutes MVP readiness.

## Format Validation
All tasks follow `- [ ] T### [P] [US#] Description with file path` format where applicable.

## Parallelizable Tasks Summary
Parallel markers [P] appear on: T004, T018, T019, T024, T028, T030, T034.

## Notes
- News teasers (US1) may temporarily derive from markdown frontmatter parsing stub; full parser deferred.
- JSON content sizes kept minimal to meet performance goals.

