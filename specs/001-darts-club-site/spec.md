# Feature Specification: Modern DC Farmer Website (Aligned & Updated 2025-11-23)

**Feature Branch**: `001-darts-club-site`  
**Created**: 2025-11-22  
**Status**: Draft  
**Input**: User description: "I'm building a modern website for darts club DC Farmer. I want it to be sleek, appealing and someting that would stand out. There should be a landing page with the next 3 events and the three newest news articles, an about page, two teams pages (one for E-Darts team and one for Steel-Darts team), a clubhouse page and a club page with subpages for active members, passive members and the committee. The whole webiste should be in dark theme with #45e783 as secondary color."

## User Scenarios & Testing _(mandatory)_

### User Story 1 - View Landing Highlights (Priority: P1)

A visitor arrives at the site and immediately sees the next 3 upcoming events and the 3 newest news articles, each with clear titles, dates, and short teasers, enabling quick awareness of club activity.

**Why this priority**: Delivers immediate value and establishes relevance; primary entry point for all audiences.

**Independent Test**: Load landing page with seeded events/news; verify exactly 3 future events (or fewer with graceful fallback) and 3 newest articles display with required metadata.

**Acceptance Scenarios**:

1. **Given** 5 future events exist, **When** landing page loads, **Then** the soonest 3 future events sorted ascending by date are shown.
2. **Given** only 1 future event exists, **When** landing page loads, **Then** that single event is shown and remaining slots omitted without placeholder errors.
3. **Given** 10 news articles exist, **When** landing page loads, **Then** the 3 most recently published articles appear with title + publish date + teaser.
4. **Given** no news articles exist, **When** landing page loads, **Then** a friendly "No news yet" message appears instead of an empty block.

---

### User Story 2 - Explore Teams (Priority: P2)

A visitor navigates to E-Darts or Steel-Darts team pages to view team overview, roster, and key highlights (e.g., achievements or season focus) to learn about club competitiveness and participation options.

**Why this priority**: Showcases club identity and engagement; supports recruitment and community pride.

**Independent Test**: Open each team page and confirm presence of team name, type, roster list, and highlight/description section without relying on other pages.

**Acceptance Scenarios**:

1. **Given** team roster data exists, **When** team page loads, **Then** all listed members display with name and role (e.g., Captain) in a readable layout.
2. **Given** a team has no defined achievements yet, **When** page loads, **Then** a generic "Season goals coming soon" message appears.

---

### User Story 3 - Discover Club Information (Priority: P3)

Visitor navigates to About, Clubhouse, and Club subpages (Active Members, Passive Members, Committee) to learn history, facilities, membership structure, and leadership.

**Why this priority**: Builds trust and encourages membership engagement; complements core event/news value.

**Independent Test**: Each informational page renders required static content sections (e.g., About: mission/history; Clubhouse: location/facilities; Committee: roles) independent of dynamic data.

**Acceptance Scenarios**:

1. **Given** committee member list exists, **When** Committee page loads, **Then** each role (e.g., President) displays with member name.
2. **Given** passive members list is large, **When** Passive Members page loads, **Then** list renders without layout overflow and allows vertical scrolling.

---

### Edge Cases

- Fewer than 3 upcoming events (display only available).
- Event date in the past mistakenly included (must be excluded).
- Two events on same date (maintain secondary sort by title).
- No news articles (show friendly empty-state message).
- Extremely long news titles (truncate with ellipsis after defined character limit).
- Missing member photo (show neutral placeholder silhouette).
- Color contrast issues on dark theme (must meet WCAG AA).
- Very narrow mobile viewport (<320px) – ensure layout does not break; horizontal scroll avoided.

## Requirements _(mandatory)_

### Functional Requirements (Updated for performance target & entity naming)

- **FR-001**: Landing page MUST display the next 3 future events sorted ascending by start date; if fewer exist, show only available without placeholders.
- **FR-002**: Landing page MUST display the 3 most recently published news articles with title, publish date, and teaser text.
- **FR-003**: Team pages MUST present team name, type (E-Darts / Steel-Darts), roster list (member name + optional role), and a highlights/description section.
- **FR-004**: Club section MUST provide separate subpages: Active Members, Passive Members, Committee (roles mapped to member names).
- **FR-005**: About page MUST contain club mission/history narrative; Clubhouse page MUST describe location/facilities and visiting guidance.
- **FR-006**: Site MUST implement a consistent dark theme with #45e783 as secondary accent (links, highlights, buttons) and maintain accessible contrast.
- **FR-007**: Layout MUST be responsive across mobile (>=320px), tablet, and desktop breakpoints without functional loss.
- **FR-008**: All images MUST include descriptive alt text; missing images MUST fall back to placeholders.
- **FR-009**: Site MUST avoid exposing secrets—no API keys, credentials, or private member data beyond names and roles.
- **FR-010**: Pages MUST load essential content (above-the-fold) within 3 seconds on standard broadband (approx 25 Mbps) for first visit.
- **FR-011**: Site MUST implement security baseline: HTTPS-only hosting assumption, strong Content Security Policy (restrict inline scripts/styles, allow only required domains), and no mixed content.
- **FR-012**: Navigation MUST allow reaching any primary page (Landing, About, Clubhouse, Teams, Club subpages) with max 2 clicks from any page.
- **FR-013**: Event and news lists MUST gracefully handle absence of items by displaying clear empty-state messages.
- **FR-014**: Text content MUST use semantic HTML structure (headings hierarchical, lists, sections, landmarks for accessibility).
- **FR-015**: No user authentication required; all content is publicly viewable (assumption for static site scope).
- **FR-016**: Member listings (Active, Passive, Committee) MUST present members in an accessible horizontal card carousel: each card shows name, membership category/role, optional photo; carousel MUST support keyboard navigation (tab + arrow keys), swipe on touch devices, and provide a fallback stacked list layout on very narrow viewports (<360px) or when JS disabled.
- **FR-017**: A persistent footer MUST appear on all pages containing: (a) copyright notice in the form "© DC Farmer <current year>" auto-updated annually, (b) an internal link labeled "Impressum" to legal/contact info, and (c) an external link labeled "Swiss Darts Association" opening in a new tab with rel="noopener noreferrer"; footer MUST maintain dark theme contrast and logical keyboard focus order.
- **FR-018**: A Sponsoring page MUST present: (a) introductory section explaining sponsorship value, (b) minimum three tiers (Bronze, Silver, Gold) each with list of benefits, (c) responsive grid of sponsor logos (alt text; placeholder if missing), (d) a prominent call-to-action button labeled "Become a Sponsor" linking to existing sponsoring dossier, and (e) disclaimer on logo usage rights; page MUST follow dark theme with #45e783 accent and be accessible (semantic headings, keyboard focusable CTA).

### Key Entities _(include if feature involves data)_ (Normalized naming)

- **Event**: Represents scheduled club activity. Attributes: title, date (ISO), startTime (HH:MM optional), endTime (HH:MM optional), location, description, status (upcoming/past derived), optional image, sort key (date then title).
- **NewsArticle**: Represents a published update. Attributes: title, publishDate, teaser, body, optional tags, optional image.
- **Team**: Represents a club team. Attributes: name, type (E-Darts | Steel-Darts), description/highlights, roster (Member references).
- **Member**: Represents a club participant. Attributes: name, membershipCategory (active | passive | committee), active (boolean convenience flag), optional role (e.g., Captain, Treasurer), optional short bio, optional committeeRoleId (if committee).
- **CommitteeRole**: Mapping between role title and Member (derived view from Member data where membershipCategory=Committee).
- **Sponsor**: Represents supporting organization/individual. Attributes: name, tier (bronze | silver | gold), logo (optional), website URL (optional), short description (blurb), benefits list reference (external `sponsors-tiers.md`), since (YYYY optional).

## Success Criteria _(mandatory)_

### Measurable Outcomes (Updated performance metric)

- **SC-001**: Landing page initial content (events + news teasers) visible within 3 seconds on standard broadband (cold load) in 90% of test runs.
- **SC-002**: 100% pages pass automated WCAG AA contrast checks for text and interactive elements.
- **SC-003**: Navigation path to any core page requires ≤2 clicks from any other page (verified via usability walkthrough).
- **SC-004**: Responsive layout renders without horizontal scroll at viewport widths: 320px, 375px, 768px, 1024px, 1440px (95% element containers verified).
- **SC-005**: Empty-state messaging appears for missing events/news with zero broken layout instances (0 layout errors across test dataset).
- **SC-006**: All images provide alt text; accessibility audit reports 0 missing alt attributes.
- **SC-007**: Dark theme + #45e783 accent consistently applied: minimum 90% of accent-eligible components use specified color (style audit sample).
- **SC-008**: No secrets or personally sensitive data found via repository scan (0 violations).

## Notes & Assumptions (Updated)

- Content management assumed manual/static for initial version—no CMS or admin interface included.
- Member privacy: Only names and roles displayed; no contact details (email/phone) shown.
- Events considered "upcoming" if date > current date/time at build or deployment.
- Performance target relaxed from 2s to 3s to align with Constitution baseline while retaining stretch goal potential.
- Performance target excludes first-time DNS/connection overhead; focuses on rendering meaningful content.
- Security implementation defined as deployment configuration (hosting platform) + static headers; not covering dynamic server hardening.
