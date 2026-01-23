# KORA Aerospace Website

Official website for KORA Aerospace, a competition team from METU and TU Delft building the smallest AI-enabled fixed-wing UAV.

**Live Site:** https://www.kora-aerospace.org/

## 🚀 Quick Start

### Prerequisites
- Python 3.x (for local development server)
- Modern web browser
- Text editor

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/evrenucar/kora_aerospace_web.git
   cd kora_aerospace_web
   ```

2. **Start the development server**
   ```bash
   python -m http.server 8080
   ```

3. **Open in browser**
   ```
   http://localhost:8080
   ```

## 📁 Project Structure

```
kora_aerospace_web/
├── components/           # Reusable HTML components
│   ├── navbar.html      # Main navigation bar
│   ├── footer.html      # Site footer
│   └── mobile-nav.html  # Mobile bottom navigation
├── content/             # YAML content files
│   ├── common.yaml      # Shared content (nav, footer)
│   ├── home.yaml        # Home page content
│   ├── team.yaml        # Team page content
│   ├── achievements.yaml # Achievements content
│   ├── competitions.yaml # Competitions content
│   ├── vehicle.yaml     # Vehicle page content
│   └── blog/            # Blog posts
│       ├── index.yaml   # Blog metadata
│       └── [posts]/     # Individual blog posts
├── js/                  # JavaScript files
│   ├── main.js          # Main application logic
│   ├── content-loader.js # YAML content loader
│   ├── component-loader.js # Component injection
│   └── blog-engine.js   # Blog functionality
├── media/               # Images, videos, assets
├── about/              # About section pages
├── this-year/          # Current year pages
├── blog/               # Blog page
├── contact/            # Contact page
├── styles.css          # Global styles
└── index.html          # Home page

```

## 🎨 Architecture

### Component System

The website uses a component-based architecture where reusable components (navbar, footer, mobile-nav) are loaded dynamically on each page.

**How it works:**
1. Each page has placeholder divs with specific IDs
2. `component-loader.js` fetches component HTML and injects it
3. Components are initialized after injection

### Content Management

Content is stored in YAML files and loaded dynamically:

**Benefits:**
- Easy to update content without touching HTML
- Built-in multi-language support (EN/TR)
- Reusable content across pages

**Example content structure:**
```yaml
hero:
  title:
    en: "English Title"
    tr: "Turkish Title"
  subtitle:
    en: "English subtitle"
    tr: "Turkish subtitle"
```

### Localization

The site supports English and Turkish:
- Language preference stored in localStorage
- Content loaded from YAML files
- Elements marked with `data-i18n` attributes are auto-populated

## 📝 Adding/Editing Content

###Adding a New Page

1. **Create HTML file** in appropriate directory
2. **Add component placeholders:**
   ```html
   <div id="navbar-placeholder"></div>
   <!-- Your content -->
   <div id="footer-placeholder"></div>
   <div id="mobile-nav-placeholder"></div>
   ```

3. **Load scripts:**
   ```html
   <script src="/js/content-loader.js"></script>
   <script src="/js/component-loader.js"></script>
   <script src="/js/main.js"></script>
   ```

4. **Create content YAML file** in `/content/` directory

5. **Initialize content loading:**
   ```html
   <script>
     document.addEventListener('app-ready', async () => {
       const content = await contentLoader.loadLocalizedContent('your-content-file');
       // Use content...
     });
   </script>
   ```

### Editing Content

1. **Locate the YAML file** in `/content/` directory
2. **Edit the content** for the desired language
3. **Save the file** - changes appear immediately on refresh

### Adding Blog Posts
1. **Create a new directory** in `/content/blog/[post-slug]/`
2. **Add post.md** file with markdown content:
   ```markdown
   ---
   title: "English Title"
   title_tr: "Turkish Title"
   date: "2026-01-23"
   category: "technical"
   featured_image: "/media/image.jpg"
   excerpt: "English excerpt"
   excerpt_tr: "Turkish excerpt"
   author: "KORA Team"
   ---

   <div lang="en">
   # English Content
   ...
   </div>

   <div lang="tr">
   # Turkish Content
   ...
   </div>
   ```

3. **Update** `/content/blog/index.yaml` with post metadata:
   ```yaml
   posts:
     - slug: "post-slug"
       title: "English Title"
       title_tr: "Turkish Title"
       date: "2026-01-23"
       category: "technical"
       featured_image: "/media/image.jpg"
       excerpt: "English excerpt"
       excerpt_tr: "Turkish excerpt"
       author: "KORA Team"
   ```

## 🛠️ Development

### File Naming Conventions
- HTML files: lowercase with hyphens (`index.html`)
- YAML files: lowercase with hyphens (`team.yaml`)
- JavaScript files: camelCase or kebab-case (`content-loader.js`)
- CSS classes: BEM-inspired, using Tailwind utilities

### Code Style
- **HTML:** Clean, semantic markup
- **CSS:** Tailwind utility classes + custom CSS in`styles.css`
- **JavaScript:** ES6+, async/await for async operations
- **YAML:** Consistent indentation (2 spaces)

### Adding New Features

1. **Follow existing patterns** for consistency
2. **Test in both languages** (EN/TR)
3. **Test on mobile and desktop**
4. **Ensure accessibility** (ARIA labels, semantic HTML)

## 🔧 Troubleshooting

### Components not loading
- Check browser console for errors
- Ensure server is running
- Verify component file paths are correct

### Content not appearing
- Check YAML file syntax (use a YAML validator)
- Verify `data-i18n` attributes match YAML keys
- Check browser console for loading errors

### Language switching not working
- Clear localStorage in browser dev tools
- Check if `contentLoader` is properly initialized
- Verify YAML files have both EN and TR keys

## 📱 Browser Compatibility

- Chrome/Edge: ✅ Latest 2 versions
- Firefox: ✅ Latest 2 versions
- Safari: ✅ Latest 2 versions
- Mobile browsers: ✅ iOS Safari, Chrome Mobile

## 🤝 Contributing

1. Make your changes
2. Test thoroughly (both languages, mobile + desktop)
3. Submit a pull request

## 📄 License

All rights reserved - KORA Aerospace Team

## 📞 Contact

For questions or support, reach out via the website contact page or email the team.

---

Built with ❤️ by the KORA Aerospace Team
