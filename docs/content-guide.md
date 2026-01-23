# Content Editing Guide

This guide explains how to manage content on the KORA Aerospace website. The site is built with a custom content loader that reads from YAML files, allowing you to update text and images without touching code.

## 📂 Content Structure

All content is located in the `/content/` directory.

- **`common.yaml`**: Shared elements like Navbar, Footer, and Buttons.
- **`home.yaml`**: Hero section, "What We Do", and main page cards.
- **`team.yaml`**: Team members, leadership, and subteams.
- **`vehicle.yaml`**: "This Year" vehicle specs, features, and gallery.
- **`competitions.yaml`**: Competition entries (SUAS, Teknofest).
- **`achievements.yaml`**: Past awards and track record.
- **`media-gallery.yaml`**: Media page items (photos/videos).
- **`blog/`**: Blog system (see [Blog Guide](#blog-guide)).

## 🌍 Bilingual System (English & Turkish)

Most YAML files follow a strict key-value pair for languages:

```yaml
section_name:
  title:
    en: "English Title"
    tr: "Turkish Title"
  description:
    en: "English description text."
    tr: "Turkish description text."
```

> **Note:** If you miss a translation, the system typically falls back to English or empty text.

## 📝 Page-Specific Guides

### 1. Team Page (`team.yaml`)
To add a new team member:
```yaml
groups:
  leadership:
    title: ...
    members:
      - name: "Name Surname"
        role: 
          en: "Role Title"
          tr: "Rol Başlığı"
        image: "/media/photo.jpg"
        social:
          linkedin: "https://..."
```

### 2. Vehicle Page (`vehicle.yaml`)
The vehicle page has a "Specs" list and a "Features" carousel.
```yaml
specs:
  - label: 
      en: "Wingspan"
      tr: "Kanat Açıklığı"
    value: "2.1m"
```

### 3. Media Gallery (`media-gallery.yaml`)
Items appear in the grid with filters.
```yaml
items:
  - id: "photo1"
    src: "/media/photo.jpg"
    type: "photo"        # 'photo' or 'video'
    category: "vehicle"  # 'vehicle', 'testing', 'competition', 'team'
    title:
      en: "Flight Test"
      tr: "Uçuş Testi"
```

---

<a id="blog-guide"></a>
## ✍️ Blog Guide

The blog system is slightly more advanced, using Markdown for the post body and YAML for metadata.

### Creating a Post
1. **Folder**: Create a folder `content/blog/YYYY-MM-slug/`
2. **File**: Create `post.md` inside it.

### `post.md` Structure
We use a special bilingual Markdown format:

```markdown
---
title: "English Title"
title_tr: "Turkish Title"
date: "2026-01-23"      # YYYY-MM-DD
category: "technical"   # mechanical, avionics, software, testing, team
featured_image: "/media/hero.jpg"
excerpt: "Short summary in English"
excerpt_tr: "Short summary in Turkish"
author: "KORA Team"
---

<div lang="en">

# English Header

Write your English content here using standard Markdown.
- Bullet points
- **Bold text**
- [Links](https://...)

</div>

<div lang="tr">

# Turkish Header

Write your Turkish content here.

</div>
```

### Registering the Post
After creating the file, you **MUST** add it to `content/blog/index.yaml`:

```yaml
posts:
  - slug: "YYYY-MM-slug"
    title: ... (same as frontmatter)
    title_tr: ...
    date: ...
    category: ...
    featured_image: ...
    excerpt: ...
    excerpt_tr: ...
```
> **Tip:** The `index.yaml` is what populates the main blog usage list. If you forget this step, your post won't appear!

## 🖼️ Images

- Place images in the `/media/` directory.
- Use absolute paths starting with `/media/` (e.g., `/media/drone.jpg`).
- For blog posts, you can also place images inside the post folder and reference them relative to the post, but `/media/` is properly cached and easier to manage.

## ⚠️ Common Issues

- **"Invalid Date"**: Ensure your date is "YYYY-MM-DD" in quotes.
- **Broken Layout**: Ensure you didn't break YAML indentation (2 spaces).
- **Missing Translations**: Check if you added both `en` and `tr` keys.
