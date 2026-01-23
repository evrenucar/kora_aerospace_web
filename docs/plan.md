# Implementation Plan - Kora Aerospace Website Rework

## Goal Description
Rework the existing Kora Aerospace website to comply with the new design checklist and layout requirements (`docs/layout.md`). The site will remain a **Static Website (HTML/CSS/JS)** hosted on GitHub Pages, but will be modernized to use Client-Side Rendering (CSR) for dynamic content (YAML/Markdown).

## User Review Required
> [!NOTE]
> **Tech Stack Adjustment**: Sticking to **HTML5, Vanilla CSS, and Modern JavaScript (ES6+)**. No heavy build tools or frameworks (React/Vite) will be used.
>
> **Content Strategy**:
> - We will use **browser-compatible libraries** (`js-yaml` and `marked`) loaded via CDN (or downloaded locally) to parse config and blog posts on the fly.
> - **Navigation/Footer**: To avoid duplicating code across multiple HTML files, we will load these shared elements dynamically via JavaScript (`loadComponent('navbar.html')`).

## Proposed Changes

### Project Structure
- Keep the current root structure but organize assets better.
- `/assets/`: Images, icons.
- `/css/`: Main styles (`style.css`), variable definitions.
- `/js/`: Logic scripts (`app.js`, `content-loader.js`, `blog.js`).
- `/content/`:
    - `data.yaml`: Shared structured data (Team, settings, translations).
    - `blog/`: Folder containing `post-slug.md` files.
- `/vendor/`: 3rd party libs (js-yaml, marked) if we don't want to rely on external CDNs.

### Implementation Details
#### [MODIFY] Core Architecture
- **Multi-Page Layout**: Create physical HTML files for main sections to handle routing naturally on GitHub Pages.
    - `index.html` (Home)
    - `team.html` (Takım)
    - `vehicle.html` (Araç)
    - `blog.html` (Blog Feed)
    - `article.html` (Single Blog Post Viewer - uses URL params `?post=slug`)

#### [NEW] Content System (Client-Side)
- `js/content-loader.js`:
    - Fetches `content/data.yaml`.
    - Parses it using `js-yaml`.
    - Handles "Dictionary" logic: Returns string for `currentLang` (TR/EN).
- `js/blog-engine.js`:
    - Fetches list of blog posts (maintained in a `blog-index.yaml` or scanned if possible, but static sites usually need an index file).
    - Fetches `.md` content and renders it to HTML using `marked`.

#### [NEW] Design & components
- **Vanilla CSS Architecture**:
    - `css/variables.css`: Colors (Cyan, Dark), Fonts.
    - `css/components.css`: Buttons, Cards, Navbar.
    - `css/layout.css`: Grid systems, Responsive utilities.
- **Shared Components**:
    - `components/navbar.html`: The HTML fragment for the top bar.
    - `components/footer.html`: The HTML fragment for the footer.
    - JavaScript will inject these into `<div id="navbar-container"></div>`.

## Verification Plan

### Manual Verification
- **GitHub Pages Compatibility**: Ensure all paths are relative so they work on subpaths (e.g. `username.github.io/repo/`).
- **Performance**: Check if fetching YAML/MD on load causes layout shift (implement simple loaders/skeletons).
- **Cross-Browser**: Check modern ES6 features work in target browsers.
