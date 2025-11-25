# Phase 0 Research: DC Farmer Static Website

All NEEDS CLARIFICATION items resolved. Decisions below.

## 1. Testing Automation Stack

- **Decision**: Use Lighthouse CI GitHub Action + Pa11y CLI for accessibility.
- **Rationale**: Lighthouse covers performance, SEO, PWA-like checks; Pa11y is simple for WCAG A/AA assertions. Both run headless without build tooling.
- **Alternatives Considered**: Axe-core CLI (powerful but more config); Manual only (not scalable); PageSpeed API (rate limits, external dependency).

## 2. Content Format (Events & News)

- **Decision**: JSON for events (simple structured fields), Markdown with frontmatter for news articles (richer text formatting).
- **Rationale**: Events need predictable fields for sorting; news benefits from rich body formatting & optional future styling.
- **Alternatives Considered**: All JSON (harder for long-form formatting); All Markdown (requires parsing frontmatter for sorting simple date lists).

## 3. Image Optimization Workflow

- **Decision**: Manual pre-processing (resize to max width 1200px, export WebP + fallback PNG if needed) documented in quickstart; future CI step optional.
- **Rationale**: Keeps zero tooling complexity; small asset count manageable.
- **Alternatives Considered**: Automated compression script (adds tooling); External CDN (not needed scale).

## 4. Accessibility Auditing Tool

- **Decision**: Pa11y CLI with a JSON config listing key pages; fail build on severity > warning.
- **Rationale**: Lightweight, no extra browser setup beyond default; integrates easily with GitHub Actions.
- **Alternatives Considered**: axe-core (more granular but requires scripting); Manual audits only (risk of regression).

## 5. Carousel Accessibility Pattern

- **Decision**: Scroll-snap horizontal region with keyboard arrow support + focusable container and visible focus outline. No ARIA role override (native semantics) + aria-live not required.
- **Rationale**: Minimal JS; preserves native scrolling; widely supported; easy fallback.
- **Alternatives Considered**: ARIA listbox pattern (heavier semantics); Full slider library (extra JS size); CSS-only (less control over keyboard nav).

## 6. Sponsor Tier Benefits Source

- **Decision**: Extract benefits text directly from existing sponsoring dossier PDF and convert to a static `sponsors-tiers.md` included in repo.
- **Rationale**: Ensures alignment with official messaging; single authoritative source.
- **Alternatives Considered**: Rewriting benefits (risk inconsistency); External link only (less discoverable in site context).

## 7. CSP Directives

- **Decision**: `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self';">` placed in `<head>` for all pages.
- **Rationale**: Restricts to self-hosted assets; allows data URIs for icons/placeholders; disallows inline and external scripts/styles by design.
- **Alternatives Considered**: Adding fonts from external hosts (would weaken simplicity); Allowing inline scripts (reduces security posture).

## 8. Performance Metrics Collection

- **Decision**: Lighthouse CI in GitHub Action run against production deployment URL after push to main; store JSON artifacts.
- **Rationale**: Validates budgets continuously; simple setup.
- **Alternatives Considered**: Local manual runs (inconsistent); WebPageTest integration (overkill now).

## 9. Responsive Breakpoints

- **Decision**: Base mobile-first layout; breakpoints at 480px, 768px, 1024px, 1440px.
- **Rationale**: Covers common small phones, tablets, laptops, large desktops.
- **Alternatives Considered**: More granular (complex); Only two breakpoints (less refined layout control).

## 10. Dark Theme Color Tokens

- **Decision**: CSS custom properties in `:root`:
  - `--color-bg: #111;`
  - `--color-surface: #1b1b1b;`
  - `--color-text: #f5f5f5;`
  - `--color-accent: #45e783;`
  - `--color-border: #2a2a2a;`
- **Rationale**: Centralized theming; easy future accent changes.
- **Alternatives Considered**: Hard-coded colors (harder maintenance); Utility libraries (adds dependency complexity).

## 11. Data Loading Strategy for Dynamic Lists

- **Decision**: Client-side fetch of JSON for events/members/sponsors; inline serverless build not needed. News Markdown converted manually to HTML (static pages).
- **Rationale**: Minimizes processing complexity; events lists easily sortable at runtime; news needs formatting stability.
- **Alternatives Considered**: Pre-generating all lists manually (more editing overhead); Introducing a static site generator (not aligned with zero-build constraint).

## 12. File Naming & Organization

- **Decision**: Hyphenated lowercase filenames; entity JSON plural (`events.json`, `members.json`).
- **Rationale**: Consistency & clarity; matches constitution guidance.
- **Alternatives Considered**: Mixed casing (inconsistency); multiple JSON files per item (fragmentation).

---

**Phase 0 Complete**: All clarifications resolved. Proceed to Phase 1 design artifacts.
