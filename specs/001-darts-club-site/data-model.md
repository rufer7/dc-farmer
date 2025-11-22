# Data Model: DC Farmer Static Website

> Version: Phase 1 Design | Source Spec: `spec.md`

The site uses static JSON (structured lists) and Markdown (rich articles) to represent club data. No runtime persistence layer; validation occurs via optional JSON lint scripts / CI.

## Conventions

- All JSON files are UTF-8 without BOM.
- Filenames: lowercase kebab-case; plural for collections (e.g., `events.json`).
- Dates: ISO 8601 `YYYY-MM-DD`.
- Times: 24h `HH:MM` local club time (Europe/Zurich assumed; no TZ suffix) when needed.
- IDs: Stable slug strings (`[a-z0-9-]`) derived from name/title.
- Optional fields omitted rather than set `null`.
- Currency amounts (if introduced later) use integer cents (NOT in MVP).

## Entities

### Event

Represents a scheduled club or team activity.

| Field       | Type     | Required | Constraints                                                  | Notes                             |
| ----------- | -------- | -------- | ------------------------------------------------------------ | --------------------------------- |
| id          | string   | yes      | slug unique                                                  | `event-<date>-<slug>` recommended |
| title       | string   | yes      | 3-120 chars                                                  | Display name                      |
| date        | string   | yes      | ISO date                                                     | Sorting primary key               |
| startTime   | string   | no       | `HH:MM`                                                      | Precise start time                |
| endTime     | string   | no       | `HH:MM`                                                      | For duration calc                 |
| location    | string   | yes      | 2-120 chars                                                  | Human-readable place              |
| description | string   | no       | 0-500 chars                                                  | Short plain text summary          |
| type        | string   | yes      | enum: `training`, `match`, `tournament`, `meeting`, `social` | Classification                    |
| teamIds     | string[] | no       | each valid team id                                           | Links to teams involved           |
| cancelled   | boolean  | no       | default false                                                | Conditional styling               |

Relationships: `teamIds` references `Team.id`.

### NewsArticle

Rich informational content about club updates. Stored as Markdown with YAML frontmatter.

Frontmatter Fields:
| Field | Type | Required | Constraints | Notes |
|-------|------|----------|-------------|-------|
| id | string | yes | slug unique | From title |
| title | string | yes | 3-160 chars | Article heading |
| date | string | yes | ISO date | Publish date |
| author | string | no | 2-80 chars | Display name |
| tags | string[] | no | <= 10 items | Lightweight categorization |
| summary | string | no | 0-240 chars | Meta / list blurb |

Body: Markdown content (basic formatting only: headings, paragraphs, lists, links, emphasis, images referencing `/public/images/...`).

### Member

Public profile card for club member and/or team player.

| Field           | Type     | Required | Constraints                     | Notes                   |
| --------------- | -------- | -------- | ------------------------------- | ----------------------- |
| id              | string   | yes      | slug unique                     | Based on name           |
| displayName     | string   | yes      | 2-80 chars                      | Shown on card           |
| role            | string   | no       | free text <= 60 chars           | e.g., "Player", "Coach" |
| committeeRoleId | string   | no       | valid committee role id         | If on committee         |
| teams           | string[] | no       | each valid team id              | Memberships             |
| image           | string   | no       | path relative `images/members/` | WebP preferred          |
| active          | boolean  | yes      | default true                    | For filtering           |

### CommitteeRole

Defines a governance position in the club.

| Field       | Type   | Required | Constraints | Notes             |
| ----------- | ------ | -------- | ----------- | ----------------- |
| id          | string | yes      | slug unique |                   |
| title       | string | yes      | 2-80 chars  | e.g., "President" |
| description | string | no       | 0-160 chars | Optional brief    |
| order       | number | yes      | integer >=0 | Sort ordering     |

### Team

Represents an internal darts team (e.g., e-darts, steel darts).

| Field      | Type     | Required | Constraints                  | Notes              |
| ---------- | -------- | -------- | ---------------------------- | ------------------ |
| id         | string   | yes      | slug unique                  |                    |
| name       | string   | yes      | 2-80 chars                   | Public name        |
| discipline | string   | yes      | enum: `edarts`, `steeldarts` |                    |
| division   | string   | no       | free text <= 60 chars        | League/level       |
| members    | string[] | no       | each valid member id         | Roster for display |

Relationship: `members` references `Member.id` (redundant with Member.teams for simplicity; both allowed).

### Sponsor

Commercial supporter entity.

| Field   | Type   | Required | Constraints                      | Notes               |
| ------- | ------ | -------- | -------------------------------- | ------------------- |
| id      | string | yes      | slug unique                      | Based on name       |
| name    | string | yes      | 2-120 chars                      | Display brand       |
| tier    | string | yes      | enum: `gold`, `silver`, `bronze` | Sponsoring level    |
| website | string | no       | valid URL                        | HTTPS preferred     |
| logo    | string | no       | path `images/sponsors/`          | WebP + fallback PNG |
| since   | string | no       | ISO year `YYYY`                  | Support start       |
| blurb   | string | no       | 0-160 chars                      | Short visible text  |

## Derived / Computed Values

- Event status (upcoming/past) computed client-side from `date`.
- Member carousel ordering from array index in `members.json`.
- Sponsor display grouping by `tier`.

## Validation Rules (Summary)

- Slug uniqueness across each collection.
- Enum fields restricted to listed values.
- No empty strings (omit field entirely instead).
- Max lengths enforced by manual review / optional CI JSON schema validation.

## Relationships Overview

```
Member --(committeeRoleId)--> CommitteeRole
Member --(teams[])--> Team
Team --(members[])--> Member
Event --(teamIds[])--> Team
Sponsor (no outward relationships)
NewsArticle (no outward relationships)
```

## JSON Collections

- `events.json`: Array<Event>
- `members.json`: Array<Member>
- `sponsors.json`: Array<Sponsor>
- `committee-roles.json`: Array<CommitteeRole>
- `teams.json`: Array<Team>

## Markdown Articles Directory

Proposed: `public/news/` with one file per article: `YYYY-MM-DD--slug.md`

Example Frontmatter:

```markdown
---
id: spring-open-2026
title: Spring Open Tournament Announced
date: 2026-03-15
author: Jane Doe
tags: [tournament, announcement]
summary: Our annual Spring Open returns with expanded brackets.
---

Body paragraph text here.
```

## Future Extensibility

- Add `results` to Event (object with placements) in later phase.
- Add `socialLinks` to Member (validate https only).
- Add `contactEmail` to Sponsor (obfuscated or via mailto:).

## Open Validation Tasks

- Provide JSON Schema definitions (see `contracts/`).
- Add optional CI script to test schema compliance pre-merge.

## Status

This document will be the authoritative reference for collection shape. Changes require spec update + version bump comment.
