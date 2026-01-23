# KORA Aerospace Website Rework - Task List

## Phase 1: Setup and Content Migration ✅

### 1.1 Project Setup
- [x] Create `content/` directory structure
- [ ] Add js-yaml CDN to pages that need it
- [ ] Add marked.js CDN for markdown parsing
- [x] Update `.vscode/tasks.json` with working local server command
- [ ] Create `start-server.sh` backup script (optional)

### 1.2 Content Migration
- [x] Create `content/common.yaml` - extract nav, footer, button strings
  - [x] Meta tags (title, description)
  - [x] Navigation labels
  - [x] Footer content
  - [x] CTA buttons
  - [x] Language selector strings
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
  - [x] YAML fetching and parsing
  - [x] Language-aware value extraction
  - [x] Caching mechanism
  - [x] Error handling with fallback to EN
- [x] Create `js/component-loader.js`
  - [x] loadComponent() function for navbar/footer
  - [x] injectComponent() for DOM insertion
- [x] Create `js/blog-engine.js`
  - [x] loadBlogIndex() - fetch and parse blog index
  - [x] loadPost(slug) - fetch and render single post
  - [x] parseMarkdown() - frontmatter + content parsing
  - [x] renderBlogCard() - for listing page
  - [x] renderBlogPost() - for detail page
- [x] Create `content/blog/index.yaml` - blog metadata index
- [x] Create sample blog post `content/blog/2026-01-sample-post/post.md`

---

## Phase 2: Page Structure Implementation

### 2.1 Shared Components
- [ ] Create `components/navbar.html`
  - [ ] Desktop top navigation with dropdowns
  - [ ] Mobile hamburger menu (hidden on lg+)
  - [ ] Language toggle (TR/EN)
  - [ ] University logos (ODTÜ, TU Delft)
  - [ ] CTA buttons (Reach Us, Support Us)
- [ ] Create `components/footer.html`
  - [ ] Contact info section
  - [ ] Location section
  - [ ] Media kit links
  - [ ] Page index links
  - [ ] Social links

### 2.2 Mobile Navigation
- [ ] Create `components/mobile-nav.html`
  - [ ] Fixed bottom bar
  - [ ] Icons: Home, About (drawer), This Year (drawer), Media, Blog, Contact
- [ ] Implement drawer system for nested navigation
  - [ ] About drawer (Team, Achievements)
  - [ ] This Year drawer (Vehicle, Competitions)
- [ ] Add necessary CSS to `styles.css`
  - [ ] Bottom nav styling
  - [ ] Drawer animation (slide-up)
  - [ ] Backdrop overlay

### 2.3 Page Creation
- [ ] Refactor `index.html` to home page
  - [ ] Keep hero section
  - [ ] Add quick nav cards (Team, Vehicle, Media, Blog)
  - [ ] Add latest blog preview section
  - [ ] Keep sponsor banner
  - [ ] Load navbar/footer components
- [ ] Create `about/team/index.html`
  - [ ] Team mission and story
  - [ ] 4 member cards (photo, name, role, bio)
  - [ ] University affiliation section
- [ ] Create `about/achievements/index.html`
  - [ ] Chronological achievement list
  - [ ] Competition results, awards, milestones
  - [ ] Supporting photos
- [ ] Create `this-year/vehicle/index.html`
  - [ ] Vehicle overview (specs, description)
  - [ ] Photo gallery (grid or scrollable)
- [ ] Create `this-year/competitions/index.html`
  - [ ] SUAS 2026 card
  - [ ] Teknofest 2026 card
  - [ ] Each with: name, date, location, hero photo, description
- [ ] Create `media/index.html`
  - [ ] Filterable gallery (Photos/Videos/Press Kit)
  - [ ] Category tags (Vehicle, Testing, Competition, Team)
  - [ ] Lightbox viewing
  - [ ] Download options for press kit
- [ ] Create `contact/index.html`
  - [ ] Contact form
  - [ ] Email and social links
  - [ ] Optional embedded map
  - [ ] University affiliation links

---

## Phase 3: Blog System

### 3.1 Blog Infrastructure
- [x] Create `js/blog-engine.js` (moved to Phase 1)
- [x] Create `content/blog/index.yaml` - blog metadata index

### 3.2 Blog Pages
- [ ] Create `blog/index.html`
  - [ ] Infinite scroll article feed
  - [ ] Category filter tabs (Mechanical, Avionics, Software, Testing)
  - [ ] Each entry: featured image, title, date, category, excerpt
- [ ] Create `blog/post/index.html` (template for individual posts)
  - [ ] Article header (title, date, category, featured image)
  - [ ] Markdown content area
  - [ ] Image embedding support
  - [ ] Back to blog link
  - [ ] Language toggle for post

### 3.3 Sample Blog Posts
- [x] Create `content/blog/2026-01-sample-post/post.md`
  - [x] Include frontmatter with both EN and TR metadata
  - [ ] Include sample embedded images
  - [x] Example markdown formatting

---

## Phase 4: Polish and Testing

### 4.1 Navigation Updates
- [ ] Update `scripts.js` for multi-page support
  - [ ] Update navbar scroll behavior for all pages
  - [ ] Language persistence across pages
  - [ ] Active page highlighting in nav
- [ ] Implement dropdown menus on desktop
  - [ ] Hover to open
  - [ ] Keyboard navigation support
  - [ ] Proper ARIA attributes

### 4.2 Styling Cleanup
- [ ] Review and update `styles.css`
  - [ ] Mobile bottom nav styles
  - [ ] Drawer animation styles
  - [ ] Dropdown menu styles
  - [ ] Gallery lightbox styles
- [ ] Verify Tailwind classes work on all pages
- [ ] Test dark mode consistency

### 4.3 Accessibility
- [ ] Add proper ARIA labels to navigation
- [ ] Ensure keyboard navigation works
- [ ] Add skip-to-content links
- [ ] Verify color contrast ratios
- [ ] Add alt text to all images via i18n

### 4.4 Testing
- [ ] Test all pages in English
- [ ] Test all pages in Turkish
- [ ] Test language switching persistence
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile testing (iOS Safari, Android Chrome)
- [ ] Test blog post rendering with various content
- [ ] Verify all internal links work
- [ ] Run Lighthouse audit on all pages

### 4.5 Developer Experience
- [x] Verify VSCode task runs correctly
  - [x] Python http.server option
  - [x] npx serve option
- [ ] Add README section for development setup
- [ ] Document content file format

---

## Documentation

- [ ] Update `README.md`
  - [ ] Development setup instructions
  - [ ] Content editing guide
  - [ ] Blog post creation guide
  - [ ] Deployment notes
- [ ] Create `docs/content-guide.md`
  - [ ] YAML format documentation
  - [ ] Blog post markdown format
  - [ ] Image organization guidelines

---

## Content to Distribute from index.html

| Current Section | Target Location | Content File |
|-----------------|-----------------|--------------|
| Hero section | Home page | `home.yaml` |
| "What we do" cards | Home page | `home.yaml` |
| Competitions 2026 | `/this-year/competitions/` | `competitions.yaml` |
| "What we're working on" | `/this-year/vehicle/` | `vehicle.yaml` |
| Milestones | Home page (summary) + Contact | `home.yaml`, `contact.yaml` |
| Sponsorship enables | Home page or Contact | `contact.yaml` |
| Team section | `/about/team/` | `team.yaml` |
| Track record | `/about/achievements/` | `achievements.yaml` |
| Sponsors section | Home page | `home.yaml` |
| Get involved | Contact page | `contact.yaml` |
| Footer | All pages (component) | `common.yaml` |

---

## Priority Order

1. ~~**Critical**: VSCode task fix (blocks local development)~~ ✅
2. ~~**High**: Content migration to YAML (foundation for all else)~~ ✅
3. **High**: Shared components (navbar, footer)
4. **Medium**: Individual page creation
5. **Medium**: Blog system pages
6. **Low**: Polish and optimization

---

## Quick Wins (Can do immediately)

- [x] Read and understand layout.md and design checklist
- [x] Update `.vscode/tasks.json` with working server command
- [x] Create `content/` folder structure
- [x] Start migrating `common.yaml` with nav/footer strings
