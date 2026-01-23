# KORA Aerospace Website Rework - Task List

## Phase 1: Setup and Content Migration ✅

### 1.1 Project Setup
- [x] Create `content/` directory structure
- [x] Add js-yaml CDN to pages that need it
- [x] Add marked.js CDN for markdown parsing
- [x] Update `.vscode/tasks.json` with working local server command

### 1.2 Content Migration
- [x] Create `content/common.yaml` - extract nav, footer, button strings
- [x] Create `content/home.yaml` - hero, what we do, quick nav cards
- [x] Create `content/team.yaml` - team section extracted
- [x] Create `content/achievements.yaml` - track record section
- [x] Create `content/vehicle.yaml` - work carousel, focus items
- [x] Create `content/competitions.yaml` - 2026 competitions content
- [x] Create `content/media-gallery.yaml` - media page strings
- [x] Create `content/blog.yaml` - blog UI strings
- [x] Create `content/contact.yaml` - footer contact info

### 1.3 Content Loader Implementation
- [x] Create `js/content-loader.js`
- [x] Create `js/component-loader.js`
- [x] Create `js/blog-engine.js`
- [x] Create `content/blog/index.yaml` - blog metadata index
- [x] Create sample blog post `content/blog/2026-01-sample-post/post.md`

---

## Phase 2: Page Structure Implementation ✅

### 2.1 Shared Components
- [x] Create `components/navbar.html`
  - [x] Desktop top navigation with dropdowns
  - [x] Mobile hamburger menu (hidden on lg+)
  - [x] Language toggle (TR/EN)
  - [x] University logos (ODTÜ, TU Delft)
  - [x] CTA buttons (Reach Us, Support Us)
- [x] Create `components/footer.html`
  - [x] Contact info section
  - [x] Location section
  - [x] Media kit links
  - [x] Page index links
- [x] Create `components/mobile-nav.html`
  - [x] Fixed bottom bar
  - [x] Drawer system for nested navigation

### 2.2 Main Application Script
- [x] Create `js/main.js`
  - [x] Navbar scroll behavior
  - [x] Mobile menu toggle
  - [x] Drawer initialization
  - [x] Language switching
  - [x] Carousel initialization
  - [x] Component loading

### 2.3 Styles Updates
- [x] Update `styles.css`
  - [x] Mobile bottom nav styles
  - [x] Drawer animation styles
  - [x] Dropdown styles
  - [x] Prose styles for blog
  - [x] Lightbox styles
  - [x] Filter button styles

### 2.4 Page Creation
- [x] Create `about/team/index.html`
- [x] Create `about/achievements/index.html`
- [x] Create `this-year/vehicle/index.html`
- [x] Create `this-year/competitions/index.html`
- [x] Create `media/index.html` (gallery with lightbox)
- [x] Create `blog/index.html` (listing + single post view)
- [x] Create `contact/index.html`
- [X] Refactor `index.html` to home page with component loading

---

## Phase 3: Blog System ✅

### 3.1 Blog Infrastructure
- [x] Create `js/blog-engine.js`
- [x] Create `content/blog/index.yaml`
- [x] Create sample blog post

### 3.2 Blog Pages
- [x] Create `blog/index.html` with listing and single post views
  - [x] Category filter tabs
  - [x] Infinite scroll article feed (grid layout)
  - [x] Full post rendering with markdown

---

## Phase 4: Polish and Testing

### 4.1 Index Page Refactor
- [A] Update `index.html` to use new component system
  - [A] Add navbar/footer/mobile-nav placeholders
  - [A] Load from YAML content files
  - [A] Keep existing visual design

### 4.2 Navigation
- [x] Implement dropdown menus on desktop
- [x] Implement mobile bottom nav with drawers
- [A] Add active page highlighting in nav

### 4.3 Testing
- [A] Test all pages in English
- [A] Test all pages in Turkish
- [A] Test language switching persistence
- [X] Cross-browser testing
- [X] Mobile testing
- [A] Verify all internal links work

### 4.4 Developer Experience
- [x] VSCode tasks configured
- [X] Add README section for development setup
- [A] Document content file format

---

## Documentation

- [A] Update `README.md`
- [A] Create `docs/content-guide.md`

---

## File Structure Summary

```
kora_aerospace_web/
├── about/
│   ├── team/index.html
│   └── achievements/index.html
├── blog/index.html
├── components/
│   ├── navbar.html
│   ├── footer.html
│   └── mobile-nav.html
├── contact/index.html
├── content/
│   ├── common.yaml
│   ├── home.yaml
│   ├── team.yaml
│   ├── achievements.yaml
│   ├── vehicle.yaml
│   ├── competitions.yaml
│   ├── media-gallery.yaml
│   ├── blog.yaml
│   ├── contact.yaml
│   └── blog/
│       ├── index.yaml
│       └── 2026-01-sample-post/
│           └── post.md
├── js/
│   ├── content-loader.js
│   ├── component-loader.js
│   ├── blog-engine.js
│   └── main.js
├── media/index.html
├── this-year/
│   ├── vehicle/index.html
│   └── competitions/index.html
├── index.html (needs refactor)
└── styles.css
```

---

## Remaining Work

1. **Index page refactor** - [A] Done
2. **Testing** - [A] Basic functionality verified
3. **Documentation** - Update README and create content guide

---

## Quick Start

1. Run local server: `Cmd+Shift+B` in VSCode (runs Python http.server)
2. Open http://localhost:8080
3. Navigate to any page to test
