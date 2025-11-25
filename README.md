# :dart: dc-farmer

![Status](https://img.shields.io/badge/status-draft-orange?logo=statuspal)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/rufer7/dc-farmer/blob/main/LICENSE)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=bugs)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=rufer7_dc-farmer&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=rufer7_dc-farmer)

New website of darts club `DC Farmer`

> [!IMPORTANT]
> The new website is currently under construction and therefore not yet deployed.

## Preview

See [here](https://rufer7.github.io/dc-farmer/)

## Feature: DC Farmer Static Website (001-darts-club-site)

A modern, mobile-first static website for DC Farmer darts club with:

### Key Features
- **Dark Theme Design**: Professional dark theme with accent color #45e783
- **Responsive Layout**: Mobile-first design supporting all devices (320px+)
- **Team Pages**: Dedicated pages for E-Darts and Steel Darts teams
- **Events & News**: Dynamic loading of upcoming events and latest news
- **Member Directory**: Active, passive, and committee member listings
- **Sponsor Showcase**: Tiered sponsor display (Gold, Silver, Bronze)
- **Accessibility**: WCAG 2.1 Level A compliant with keyboard navigation support
- **Security**: Content Security Policy (CSP) headers, no inline scripts

### Technical Stack
- **HTML5, CSS3, Vanilla JavaScript** (no frameworks or build tools)
- **ECMAScript Modules** for clean, modular code
- **GitHub Pages** hosting with static file serving
- **JSON data storage** for events, members, teams, and sponsors
- **Markdown support** for rich news articles

### Project Structure
```
public/
├── index.html              # Landing page
├── about.html              # Club information
├── clubhouse.html          # Facility details
├── team-edarts.html        # E-Darts team
├── team-steeldarts.html    # Steel Darts team
├── club-active.html        # Active members
├── club-passive.html       # Passive members
├── club-committee.html     # Committee members
├── sponsoring.html         # Sponsors page
├── impressum.html          # Legal information
├── css/
│   ├── base.css           # Base styles, variables, typography
│   ├── theme.css          # Cards, grids, buttons
│   └── components/
│       └── carousel.css   # Carousel component
├── js/
│   ├── data-loader.js     # Dynamic content loading
│   ├── carousel.js        # Keyboard navigation
│   └── year.js            # Dynamic year in footer
├── data/
│   ├── events.json        # Event listings
│   ├── news.json          # News articles metadata
│   ├── members.json       # Member profiles
│   ├── teams.json         # Team information
│   ├── committee-roles.json  # Committee positions
│   └── sponsors.json      # Sponsor details
└── images/
    ├── members/           # Member photos
    ├── sponsors/          # Sponsor logos
    └── placeholders/      # Default images
```

### Performance Targets
- Total initial JS: < 8KB
- Total CSS: < 50KB
- Largest Contentful Paint (LCP): < 3.0s on standard broadband

### Local Development
```bash
# Serve the site locally
python -m http.server 8080

# Or use VS Code Live Server
# Navigate to http://localhost:8080/public/
```

### Quality Checks

#### Lighthouse Performance Testing
Run Lighthouse manually in Chrome DevTools:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select categories: Performance, Accessibility, Best Practices, SEO
4. Click "Analyze page load"

**Performance Targets:**
- Performance Score: > 90
- Accessibility Score: > 90
- Best Practices Score: > 90
- First Contentful Paint (FCP): < 1.5s
- Largest Contentful Paint (LCP): < 2.5s
- Total Blocking Time (TBT): < 200ms

#### Accessibility Testing with Pa11y
```bash
# Install Pa11y CLI
npm install -g pa11y-ci

# Start local server
python3 -m http.server 8080

# Run Pa11y tests
pa11y-ci --config tests/accessibility/pa11y.config.json
```

#### Security Review Checklist
- [x] Content Security Policy (CSP) meta tag present in all HTML pages
- [x] No inline scripts or styles (all external)
- [x] All scripts loaded as ES modules with `type="module"`
- [x] External links use `rel="noopener noreferrer"` (when applicable)
- [x] No hardcoded secrets or API keys
- [x] HTTPS enforced by GitHub Pages
- [x] Input sanitization via `escapeHtml()` function in data-loader.js
- [x] Safe JSON parsing with error handling

#### Keyboard Navigation Testing
- [x] All interactive elements accessible via Tab key
- [x] Focus indicators visible on all focusable elements
- [x] Carousel supports Arrow keys, Home, and End keys
- [x] Skip links or logical tab order present
- [x] No keyboard traps

### Documentation
See `specs/001-darts-club-site/` for complete specification:
- `plan.md` - Technical implementation plan
- `data-model.md` - Data structure definitions
- `quickstart.md` - Contributing guide
- `tasks.md` - Implementation task breakdown
- `contracts/` - JSON schema definitions
