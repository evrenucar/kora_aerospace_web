/**
 * Blog Engine - Handles blog post loading, parsing, and rendering
 * Supports markdown with frontmatter and embedded images
 */

class BlogEngine {
  constructor() {
    this.postsPath = '/content/blog';
    this.indexCache = null;
    this.postCache = new Map();
  }

  /**
   * Load the blog index (list of all posts)
   * @returns {Promise<Array>} Array of post metadata
   */
  async loadIndex() {
    if (this.indexCache) {
      return this.indexCache;
    }

    try {
      const response = await fetch(`${this.postsPath}/index.yaml`);
      if (!response.ok) {
        throw new Error('Failed to load blog index');
      }
      const yamlText = await response.text();
      const parsed = jsyaml.load(yamlText);
      this.indexCache = parsed.posts || [];
      return this.indexCache;
    } catch (error) {
      console.error('Error loading blog index:', error);
      return [];
    }
  }

  /**
   * Load a single blog post by slug
   * @param {string} slug - Post slug (folder name)
   * @returns {Promise<Object>} Post data with frontmatter and content
   */
  async loadPost(slug) {
    if (this.postCache.has(slug)) {
      return this.postCache.get(slug);
    }

    try {
      const response = await fetch(`${this.postsPath}/${slug}/post.md`);
      if (!response.ok) {
        throw new Error(`Failed to load post: ${slug}`);
      }
      const markdown = await response.text();
      const post = this.parsePost(markdown, slug);
      this.postCache.set(slug, post);
      return post;
    } catch (error) {
      console.error(`Error loading post: ${slug}`, error);
      return null;
    }
  }

  /**
   * Parse markdown with frontmatter
   * @param {string} markdown - Raw markdown content
   * @param {string} slug - Post slug for image path resolution
   * @returns {Object} Parsed post with frontmatter and HTML content
   */
  parsePost(markdown, slug) {
    // Remove BOM if present
    if (markdown.charCodeAt(0) === 0xFEFF) {
      markdown = markdown.slice(1);
    }

    // Normalize line endings to \n for easier parsing
    markdown = markdown.replace(/\r\n/g, '\n');

    const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
    const match = markdown.match(frontmatterRegex);

    let frontmatter = {};
    let content = markdown;

    if (match) {
      try {
        frontmatter = jsyaml.load(match[1]);
        content = match[2].trim();
      } catch (e) {
        console.error('Error parsing frontmatter:', e);
      }
    } else {
      // Fallback: Check if file starts with --- but regex failed (maybe slightly different format)
      if (markdown.startsWith('---')) {
        const endOfFrontmatter = markdown.indexOf('\n---', 3);
        if (endOfFrontmatter !== -1) {
          const yamlStr = markdown.substring(3, endOfFrontmatter);
          try {
            frontmatter = jsyaml.load(yamlStr);
            content = markdown.substring(endOfFrontmatter + 4).trim(); // +4 for \n---
            // Check if content starts with newline (it likely does)
            if (content.startsWith('\n')) content = content.substring(1).trim();
          } catch (e) { console.error('Fallback frontmatter parsing failed', e); }
        }
      }
    }

    // Resolve relative image paths
    content = this.resolveImagePaths(content, slug);

    // Parse markdown to HTML using marked.js
    const html = typeof marked !== 'undefined'
      ? marked.parse(content)
      : content;

    return {
      slug,
      frontmatter,
      content: html,
      raw: content
    };
  }

  /**
   * Resolve relative image paths in markdown to absolute paths
   * @param {string} content - Markdown content
   * @param {string} slug - Post slug
   * @returns {string} Content with resolved paths
   */
  resolveImagePaths(content, slug) {
    // Replace ./images/... with /content/blog/slug/images/...
    return content.replace(
      /!\[(.*?)\]\(\.\//g,
      `![$1](${this.postsPath}/${slug}/`
    );
  }

  /**
   * Get localized value from post frontmatter
   * @param {Object} frontmatter - Post frontmatter
   * @param {string} key - Key to get (e.g., 'title', 'excerpt')
   * @param {string} lang - Language code
   * @returns {string} Localized value
   */
  getLocalizedMeta(frontmatter, key, lang = 'en') {
    if (!frontmatter) return '';
    const langKey = lang === 'en' ? key : `${key}_${lang}`;
    return frontmatter[langKey] || frontmatter[key] || '';
  }

  /**
   * Render a blog card for the listing page
   * @param {Object} post - Post metadata from index
   * @param {string} lang - Current language
   * @returns {string} HTML for blog card
   */
  renderBlogCard(post, lang = 'en') {
    const title = this.getLocalizedMeta(post, 'title', lang) || 'Untitled Scan';
    const excerpt = this.getLocalizedMeta(post, 'excerpt', lang);

    // Safely parse date
    let dateStr = '';
    try {
      if (post.date) {
        const dateObj = new Date(post.date);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      }
    } catch (e) { console.error('Date parsing error', e); }

    return `
      <article class="blog-card bg-kora-surface border border-slate-800 sharp-edge overflow-hidden group hover:border-kora-cyan transition-all">
        <a href="/blog/?post=${post.slug}" class="block">
          ${post.featured_image ? `
            <div class="aspect-video overflow-hidden">
              <img src="${post.featured_image}" alt="${title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          ` : ''}
          <div class="p-6">
            <div class="flex items-center gap-4 mb-4">
              <span class="text-xs font-mono text-kora-cyan uppercase tracking-widest">${post.category || 'General'}</span>
              <span class="text-xs text-slate-400">${dateStr}</span>
            </div>
            <h3 class="text-xl font-black text-kora-offwhite uppercase tracking-tight mb-3 group-hover:text-kora-cyan transition-colors">${title}</h3>
            <p class="text-slate-300 text-sm font-light line-clamp-2">${excerpt}</p>
          </div>
        </a>
      </article>
    `;
  }

  /**
   * Render author card for blog post
   * @param {Object} author - Author data from team
   * @param {string} lang - Current language
   * @returns {string} HTML for author card
   */
  renderAuthorCard(author, lang = 'en') {
    if (!author) return '';

    const role = author.role ? (lang === 'tr' && author.role.tr ? author.role.tr : author.role.en || author.role) : '';
    const bio = author.bio ? (lang === 'tr' && author.bio.tr ? author.bio.tr : author.bio.en || author.bio) : '';
    const writtenByLabel = lang === 'tr' ? 'Yazan' : 'Written by';

    return `
      <div class="author-card mb-12 pb-8 border-b border-slate-700">
        <p class="text-xs font-mono text-slate-500 uppercase tracking-widest mb-4">${writtenByLabel}</p>
        <div class="flex items-start gap-5">
          ${author.image ? `
            <img src="${author.image}" alt="${author.name}" class="w-16 h-16 rounded-full object-cover border-2 border-slate-700 flex-shrink-0" />
          ` : ''}
          <div class="flex-1">
            <div class="flex items-center gap-3 mb-2">
              <h4 class="text-lg font-bold text-kora-offwhite">${author.name}</h4>
              ${author.linkedin ? `
                <a href="${author.linkedin}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-kora-cyan transition-colors" title="LinkedIn">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              ` : ''}
            </div>
            <p class="text-sm text-kora-cyan mb-2">${role}</p>
            <p class="text-sm text-slate-400 leading-relaxed">${bio}</p>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render a full blog post
   * @param {Object} post - Full post data
   * @param {string} lang - Current language
   * @param {Object} author - Optional author data from team
   * @returns {string} HTML for full post
   */
  renderBlogPost(post, lang = 'en', author = null) {
    const title = this.getLocalizedMeta(post.frontmatter, 'title', lang);

    // Safely parse date
    let dateStr = '';
    try {
      if (post.frontmatter.date) {
        const dateObj = new Date(post.frontmatter.date);
        if (!isNaN(dateObj.getTime())) {
          dateStr = dateObj.toLocaleDateString(lang === 'tr' ? 'tr-TR' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          });
        }
      }
    } catch (e) { console.error('Date parsing error', e); }

    return `
      <article class="blog-post max-w-3xl mx-auto">
        <header class="mb-12">
          <div class="flex items-center gap-4 mb-6">
            <span class="text-xs font-mono text-kora-cyan uppercase tracking-widest">${post.frontmatter.category || 'General'}</span>
            <span class="text-xs text-slate-400">${dateStr}</span>
          </div>
          <h1 class="text-4xl lg:text-5xl font-black text-kora-offwhite uppercase tracking-tight mb-6">${title}</h1>
        </header>
        ${this.renderAuthorCard(author, lang)}
        <div class="prose prose-invert prose-lg max-w-none">
          ${post.content}
        </div>
        ${this.renderAuthorCard(author, lang)}
      </article>
    `;
  }

  /**
   * Filter posts by category
   * @param {Array} posts - Array of posts
   * @param {string} category - Category to filter by (or 'all')
   * @returns {Array} Filtered posts
   */
  filterByCategory(posts, category) {
    if (!category || category === 'all') {
      return posts;
    }
    return posts.filter(post =>
      post.category && post.category.toLowerCase() === category.toLowerCase()
    );
  }

  /**
   * Sort posts by date (newest first)
   * @param {Array} posts - Array of posts
   * @returns {Array} Sorted posts
   */
  sortByDate(posts) {
    return [...posts].sort((a, b) =>
      new Date(b.date) - new Date(a.date)
    );
  }
}

// Create global instance
const blogEngine = new BlogEngine();

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { BlogEngine, blogEngine };
}
