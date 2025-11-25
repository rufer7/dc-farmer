# Quickstart: Contributing to DC Farmer Static Site

## 1. Prerequisites

- Git installed
- Optional: VS Code + Live Server extension OR run a simple Python/Node static server
- Image editor (e.g., GIMP) for resizing/compressing

## 2. Local Preview

Option A (VS Code Live Server): Open repository root, start Live Server.
Option B (Python 3):

```bash
python -m http.server 8080
```

Visit: `http://localhost:8080/public/`

## 3. Directory Overview

```
public/
  index.html
  css/ (base.css, theme.css, components/*)
  js/ (carousel.js, year.js, data-loader.js)
  data/ (events.json, members.json, sponsors.json, teams.json, committee-roles.json)
  news/ (Markdown articles)
  images/ (members/, sponsors/, placeholders/)
```

## 4. Adding Content

### Events

1. Open `public/data/events.json`.
2. Append new object following schema (see `contracts/event.schema.json`).
3. Keep ascending chronological order OR sort on load via JS.

### News Articles

1. Create new file in `public/news/` named `YYYY-MM-DD--slug.md`.
2. Add frontmatter:

```markdown
---
id: slug-example
title: Title Goes Here
date: YYYY-MM-DD
author: Your Name
summary: Short description.
---

Article body paragraphs...
```

3. Avoid inline scripts; use standard Markdown.

### Members

1. Edit `public/data/members.json`.
2. Provide stable `id`; supply `image` path if adding photo.

### Sponsors

1. Edit `public/data/sponsors.json`.
2. Confirm `tier` is one of `gold|silver|bronze`.
3. Provide `logo` WebP plus optional PNG fallback.

### Teams & Committee Roles

- Update respective JSON lists. Ensure referenced IDs exist.

## 5. Image Guidelines

- Max width: 1200px (members logos 400px max width)
- Format: WebP primary; include PNG fallback only if transparency needed.
- Naming: `slug.webp` lowercase.
- Compress: Target <150KB for large hero images, <60KB for member photos.

## 6. Performance Budgets

- Initial JS: <8KB (minified equivalent)
- CSS total: <50KB
- Single image initial viewport: <200KB aggregate
- Lighthouse LCP target <2.0s (desktop baseline)

## 7. Accessibility Checklist (Before Commit)

- Alt text on all `<img>`.
- Sufficient color contrast (use accent #45e783 on dark backgrounds only where pass ratio >= 4.5:1).
- Focus outline visible for interactive elements.
- Carousel: Arrow key scroll works; container has `tabindex="0"`.

## 8. Security

- No inline `<script>` or `<style>` tags.
- CSP meta in each HTML `<head>`:

```html
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'self';"
/>
```

- All external links use `rel="noopener noreferrer"`.

## 9. Testing

### Lighthouse CI (GitHub Action)

- Action runs on push to `main`; artifacts in Action logs.
- Local manual run (Chrome DevTools) for quick iteration.

### Pa11y

Local run example (if Node installed):

```bash
npx pa11y http://localhost:8080/public/index.html
```

Add pages list script later if required.

## 10. Deployment

- Commit + push to `main` (or merge PR).
- GitHub Pages auto-build (check repository settings for Pages branch = `main`, folder `/public`).
- Verify site loads with no blocked resources (DevTools console clean).

## 11. Validating JSON

Optional quick check (Node):

```bash
npm install -D ajv ajv-cli
npx ajv validate -s specs/001-darts-club-site/contracts/event.schema.json -d public/data/events.json
```

Repeat for other schemas.

## 12. Adding New Entity Field

1. Update `data-model.md`.
2. Update relevant schema in `contracts/`.
3. Adjust examples.
4. Create PR referencing spec change.

## 13. Common Pitfalls

| Pitfall                              | Avoidance                                        |
| ------------------------------------ | ------------------------------------------------ |
| Oversized images                     | Preprocess & check file size before commit       |
| Missing alt text                     | Use descriptive but concise alt attributes       |
| Inline scripts needed for quick hack | Refactor into module file under `js/`            |
| Slug mismatch                        | Generate slug from lowercase title, hyphens only |

## 14. Contact / Support

Open an issue labeled `content` or `design` for changes needing review.

---

Maintainers may extend this guide as tooling evolves.

## 15. Image Optimization Notes

All images should be optimized before adding to the repository:

### Member Photos

- **Format**: WebP preferred, PNG/JPEG as fallback
- **Max dimensions**: 400x400px
- **Target size**: < 60KB
- **Naming**: lowercase-hyphenated-name.webp
- **Location**: `/public/images/members/`

### Sponsor Logos

- **Format**: WebP with PNG fallback for transparency
- **Max dimensions**: 400x200px
- **Target size**: < 50KB
- **Naming**: sponsor-slug.webp
- **Location**: `/public/images/sponsors/`

### Optimization Tools

```bash
# Using ImageMagick
convert input.jpg -resize 400x400 -quality 85 output.webp

# Using cwebp (WebP encoder)
cwebp -q 85 input.jpg -o output.webp

# Batch optimization
for img in *.jpg; do cwebp -q 85 "$img" -o "${img%.jpg}.webp"; done
```

### Performance Impact

Properly optimized images ensure:

- Faster page load times
- Lower bandwidth usage
- Better Lighthouse performance scores
- Improved mobile experience
