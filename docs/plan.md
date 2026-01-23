# KORA Aerospace Website Rework - Implementation Plan

## Overview

Rework the existing single-page website into a multi-page hub architecture with improved content management, localization, and developer experience.

---

## Current State Analysis

### Existing Assets
| Category | Files/Count | Notes |
|----------|-------------|-------|
| Main HTML | `index.html` (781 lines) | Single-page, all content inline |
| Translations | `locales/en.json`, `tr.json`, `nl.json` | Flat key-value JSON, ~197 keys each |
| Styles | `styles.css` (50 lines) | Minimal custom CSS, uses Tailwind CDN |
| Scripts | `scripts.js` (219 lines) | i18n system, carousel, navbar scroll |
| Media | `media/` (28 files) | Team photos, vehicle images, logos |
| Design System | Tailwind config in `<head>` | Kora colors, Space Grotesk font |

### Design Tokens to Preserve
```javascript
colors: {
  kora: {
    bg: '#222222',
    surface: '#2d2d2d',
    cyan: '#00f0ff',
    cyanDark: '#008b94',
    offwhite: '#f5f5f5',
  }
}
fontFamily: {
  sans: ['Space Grotesk', 'sans-serif'],
  mono: ['JetBrains Mono', 'monospace'],
}
```

---

## Architecture Changes

### Multi-Page Structure (from [layout.md](file:///Users/yigit/Documents/GitHub/kora_aerospace_web/docs/layout.md))

```
/                     → Home (index.html)
/about/team           → Team page
/about/achievements   → Achievements page  
/this-year/vehicle    → Vehicle page
/this-year/competitions → Competitions page
/media                → Media gallery
/blog                 → Blog listing
/blog/{slug}          → Individual blog post
/contact              → Contact page
```

> [!IMPORTANT]
> Since this is a static site hosted via GitHub Pages, we'll use a folder-based page structure (e.g., `/about/team/index.html`) rather than server-side routing.

---

## Content Management System

### New Content File Structure

```
content/
├── common.yaml            # Shared UI strings (nav, footer, buttons)
├── home.yaml              # Home page content
├── team.yaml              # Team page content  
├── achievements.yaml      # Achievements page content
├── vehicle.yaml           # Vehicle page content
├── competitions.yaml      # Competitions page content
├── media-gallery.yaml     # Media page content
├── blog.yaml              # Blog page UI strings
├── contact.yaml           # Contact page content
└── blog/
    ├── en/
    │   ├── 2026-01-15-first-flight.md
    │   └── 2026-01-10-pcb-design.md
    └── tr/
        ├── 2026-01-15-ilk-ucus.md
        └── 2026-01-10-pcb-tasarimi.md
```

### Content File Format (YAML with co-located translations)

```yaml
# Example: team.yaml
page_title:
  en: "Our Team"
  tr: "Takımımız"

page_description:
  en: "A compact competition team of multidisciplinary specialists"
  tr: "Çok disiplinli küçük bir yarışma takımı"

members:
  - name: "Yiğit Kılıçarslan"
    role:
      en: "Embedded Systems Engineer"
      tr: "Gömülü Sistemler Mühendisi"
    bio:
      en: "Specializes in PCB and firmware development..."
      tr: "PCB ve gömülü yazılım geliştirmede uzman..."
    image: "/media/yigit.png"
```

> [!TIP]
> This format keeps translations adjacent for easy editing while supporting future language additions without restructuring.

---

## Blog System Architecture

### Blog Post Structure

```markdown
---
title: "First Successful Flight Test"
title_tr: "İlk Başarılı Uçuş Testi"
date: 2026-01-15
category: testing
featured_image: ./images/first-flight-hero.jpg
excerpt: "We completed our first successful flight..."
excerpt_tr: "İlk başarılı uçuşumuzu tamamladık..."
---

# First Successful Flight Test

Content here with **markdown** formatting.

![Flight preparation](./images/prep.jpg)

More content...
```

### Blog Folder Structure
```
content/blog/
├── 2026-01-15-first-flight/
│   ├── post.md           # Contains both EN and TR content
│   └── images/
│       ├── hero.jpg
│       └── prep.jpg
├── 2026-01-10-pcb-design/
│   ├── post.md
│   └── images/
│       └── pcb-closeup.jpg
└── index.yaml            # Blog listing metadata
```

> [!NOTE]
> Each blog post gets its own folder with co-located images. This keeps assets organized and enables relative image paths in markdown.

### Alternative: Separate Language Folders
If you prefer fully separate content per language:
```
content/blog/
├── en/
│   ├── 2026-01-15-first-flight.md
│   └── 2026-01-10-pcb-design.md
└── tr/
    ├── 2026-01-15-ilk-ucus.md
    └── 2026-01-10-pcb-tasarimi.md
```

**User Decision Required:** Which blog structure do you prefer?
1. Single folder with bilingual posts (recommended - keeps translations in sync)
2. Separate folders per language (more traditional, may drift apart)

---

## Technical Implementation Details

### 1. Content Loading System (`js/content-loader.js`)

```javascript
// New content loading approach
class ContentLoader {
  constructor() {
    this.cache = new Map();
    this.currentLang = localStorage.getItem('kora_lang') || 'en';
  }

  async loadContent(contentFile) {
    const response = await fetch(`/content/${contentFile}.yaml`);
    const yaml = await response.text();
    return this.parseYAML(yaml);
  }

  getLocalizedValue(obj) {
    return obj[this.currentLang] || obj['en'];
  }
}
```

### 2. Blog Engine (`js/blog-engine.js`)

```javascript
class BlogEngine {
  async loadPosts() {
    const index = await fetch('/content/blog/index.yaml');
    // Parse and render blog listing
  }

  async renderPost(slug) {
    const markdown = await fetch(`/content/blog/${slug}/post.md`);
    // Parse frontmatter, render markdown with marked.js
  }
}
```

### 3. Page Templates

Each page will be a standalone HTML file that:
1. Loads shared components (navbar, footer) via JavaScript
2. Loads page-specific content from YAML
3. Renders content based on current language

---

## Navigation Implementation

### Desktop Top Bar
```html
<nav class="fixed top-0 w-full z-50">
  <!-- Left: Team logo -->
  <a href="/"><img src="/media/fulll_logo.svg" /></a>
  
  <!-- Center: Navigation with dropdowns -->
  <div class="nav-links">
    <div class="dropdown">
      <button data-i18n="nav.about">Hakkında ▾</button>
      <div class="dropdown-menu">
        <a href="/about/team" data-i18n="nav.team">Takım</a>
        <a href="/about/achievements" data-i18n="nav.achievements">Başarılar</a>
      </div>
    </div>
    <!-- Similar for "Bu Yıl" dropdown -->
    <a href="/media" data-i18n="nav.media">Medya</a>
    <a href="/blog" data-i18n="nav.blog">Blog</a>
    <a href="/contact" data-i18n="nav.contact">İletişim</a>
  </div>
  
  <!-- Right: Language toggle, CTAs, University logos -->
  <div class="nav-right">
    <button class="lang-toggle">TR/EN</button>
    <a href="/contact" class="btn-outline" data-i18n="cta.reach_us">Reach Us</a>
    <a href="#sponsors" class="btn-primary" data-i18n="cta.support_us">Support Us</a>
    <img src="/media/odtu_logo.png" />
    <img src="/media/png_TuDelft_logo_white_rgb.png" />
  </div>
</nav>
```

### Mobile Bottom Bar
```html
<nav class="fixed bottom-0 w-full lg:hidden bg-kora-surface">
  <a href="/"><svg><!-- home icon --></svg></a>
  <button data-drawer="about"><svg><!-- about icon --></svg></button>
  <button data-drawer="this-year"><svg><!-- calendar icon --></svg></button>
  <a href="/media"><svg><!-- media icon --></svg></a>
  <a href="/blog"><svg><!-- blog icon --></svg></a>
  <a href="/contact"><svg><!-- contact icon --></svg></a>
</nav>

<!-- Drawer components for nested navigation -->
<div id="drawer-about" class="drawer hidden">
  <a href="/about/team">Team</a>
  <a href="/about/achievements">Achievements</a>
</div>
```

---

## File Changes Summary

### New Files to Create
| File | Purpose |
|------|---------|
| `content/*.yaml` (9 files) | Page content with co-located translations |
| `content/blog/index.yaml` | Blog post index |
| `content/blog/*/post.md` | Individual blog posts |
| `js/content-loader.js` | YAML content loading system |
| `js/blog-engine.js` | Markdown blog rendering |
| `js/components.js` | Shared component loading |
| `about/team/index.html` | Team page |
| `about/achievements/index.html` | Achievements page |
| `this-year/vehicle/index.html` | Vehicle page |
| `this-year/competitions/index.html` | Competitions page |
| `media/index.html` | Media gallery page |
| `blog/index.html` | Blog listing page |
| `contact/index.html` | Contact page |
| `components/navbar.html` | Shared navbar component |
| `components/footer.html` | Shared footer component |
| `start-server.sh` | Local development server script |
| `.vscode/tasks.json` | Update with working server task |

### Files to Modify
| File | Changes |
|------|---------|
| `index.html` | Convert to home page, load content dynamically |
| `scripts.js` | Update for multi-page, integrate content loader |
| `styles.css` | Add mobile bottom nav, drawer styles |

### Files to Archive/Remove
| File | Action |
|------|--------|
| `locales/en.json` | Archive (content migrated to YAML) |
| `locales/tr.json` | Archive (content migrated to YAML) |
| `locales/nl.json` | Archive (if not supporting Dutch) |

---

## Dependencies

### External Libraries (via CDN)
- `tailwindcss` (already included)
- `marked.js` - Markdown parsing for blog
- `js-yaml` - YAML parsing for content

---

## VSCode Task Configuration

```json
{
    "version": "2.0.0",
    "tasks": [
        {
            "label": "Run Local Server",
            "type": "shell",
            "command": "python3 -m http.server 8080",
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "isBackground": true,
            "problemMatcher": [],
            "presentation": {
                "reveal": "always",
                "panel": "dedicated",
                "clear": true
            },
            "group": {
                "kind": "build",
                "isDefault": true
            }
        },
        {
            "label": "Run Local Server (Node)",
            "type": "shell", 
            "command": "npx serve -l 8080",
            "options": {
                "cwd": "${workspaceFolder}"
            },
            "isBackground": true,
            "problemMatcher": []
        }
    ]
}
```

---

## Verification Plan

### Manual Testing
1. Verify all pages load correctly in EN and TR
2. Test language switching persists across pages
3. Verify mobile bottom nav and drawer functionality
4. Test blog post rendering with images
5. Cross-browser testing (Chrome, Firefox, Safari)

### Automated Checks
```bash
# Validate HTML
npx html-validate ./**/*.html

# Check for broken links
npx broken-link-checker http://localhost:8080

# Lighthouse audit
npx lighthouse http://localhost:8080 --output html
```

---

## Migration Strategy

### Phase 1: Content Migration (Non-Breaking)
1. Create `content/` folder structure
2. Migrate existing JSON translations to YAML format
3. Create content loader that falls back to existing JSON

### Phase 2: Page Structure
1. Create individual page HTML files
2. Extract shared components (navbar, footer)
3. Update navigation to multi-page

### Phase 3: Blog System
1. Implement blog engine with markdown parsing
2. Create sample blog posts
3. Add blog listing and individual post pages

### Phase 4: Polish
1. Update VSCode tasks
2. Add mobile bottom navigation
3. Final testing and optimization

---

## Risk Considerations

> [!CAUTION]
> **Breaking Changes**: The URL structure will change. Old anchor links (e.g., `#team`) will need redirects or updates to `/about/team`.

> [!WARNING]
> **SEO Impact**: Moving from single-page to multi-page may affect existing search rankings. Ensure proper meta tags and consider 301 redirects if needed.

---

## Timeline Estimate

| Phase | Effort | Description |
|-------|--------|-------------|
| Phase 1 | 2-3 hours | Content migration to YAML |
| Phase 2 | 4-6 hours | Multi-page structure |
| Phase 3 | 3-4 hours | Blog system |
| Phase 4 | 2-3 hours | Polish and testing |
| **Total** | **11-16 hours** | |

---

## Open Questions for User

1. **Blog structure preference**: Single bilingual posts or separate language folders?
2. **Dutch language support**: Keep `nl.json` or deprecate?
3. **URL structure**: Keep Turkish as default or English? (affects SEO)
4. **Blog categories**: What categories should be supported? (Mechanical, Avionics, Software, Testing suggested in layout.md)
