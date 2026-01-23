# Kora Website Rework Todo List

## Phase 1: Setup & Data Structure
- [ ] Create folder structure (`css/`, `js/`, `assets/`, `content/`, `components/`)
- [x] Create `content/data.yaml` with initial site data (nav links, hero text) for TR/EN
- [x] Create `content/blog-index.yaml` and a sample `content/blog/hello-world.md`
- [x] Download vendor libraries (`js-yaml.min.js`, `marked.min.js`) to `vendor/`
- [x] Create `start-server.sh` or instructions for local testing

## Phase 2: Core JavaScript Logic
- [ ] Implement `js/content-loader.js` (fetch YAML, parsing logic)
- [ ] Implement `js/i18n.js` (language toggle logic, saving preference)
- [ ] Implement `js/component-loader.js` (inject `navbar.html` / `footer.html`)
- [ ] Implement `js/blog-engine.js` (list parsing, markdown rendering)

## Phase 3: Design & Styling
- [ ] Create `css/variables.css` (Colors, Fonts)
- [ ] Create `css/layout.css` (Grid, Container, Responsive helpers)
- [ ] Create `css/components.css` (Buttons, Cards, Navbar styles)
- [ ] Design and build `components/navbar.html` and `components/footer.html`

## Phase 4: Page Implementation
- [ ] **Home** (`index.html`): Hero section, Quick cards
- [ ] **Team** (`team.html`): "Hakkında > Takım" grid
- [ ] **Vehicle** (`vehicle.html`): Specs & Gallery
- [ ] **Blog** (`blog.html`): Feed view (infinite scroll or pagination)
- [ ] **Article** (`article.html`): Single post view with parsing

## Phase 5: Polish & Verify
- [ ] Add loading states/skeletons to prevent layout shift
- [ ] Verify Mobile Navigation (Drawer)
- [ ] Test cross-browser compatibility
- [ ] Verify GitHub Pages deployment (relative paths check)
