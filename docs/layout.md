
## Layout V2: Multi-Page Hub

### Layout
Multi-page hub architecture with persistent top navigation bar (pinned) and bottom navigation on mobile.

**Top bar (desktop) from left to right:**
Team logo, main navigation links (with dropdowns), language selector (TR/EN toggle), reach us button, support us button, university logos (ODTÜ, TU Delft)

**Main navigation structure:**
| Hakkında ▾ | Bu Yıl ▾ | Medya | Blog | İletişim |

**Dropdown under "Hakkında":**
- Takım (Team info + 4 members)
- Başarılar (Achievements)

**Dropdown under "Bu Yıl":**
- Araç (Vehicle info & photos)
- Yarışmalar (Competitions)

**Bottom bar (mobile) from left to right:**
Home icon, About icon (opens drawer), This Year icon (opens drawer), Media icon, Blog icon, Contact icon
### Page Structure

**Ana Sayfa (Home)**
- Hero section with vehicle imagery and tagline
- Quick navigation cards (Team, Vehicle, Media, Blog)
- Latest blog post preview (1-2 entries)
- Sponsor logo banner
- Footer with contact info and social links

**Hakkında > Takım (Team)**
- Team mission and story (who we are, what we do)
- 4 member cards with photo, name, role, short bio
- University affiliation section with logos

**Hakkında > Başarılar (Achievements)**
- Chronological achievement list
- Competition results, awards, milestones
- Supporting photos where relevant

**Bu Yıl > Araç (Vehicle)**
- Vehicle overview section (specs, description)
- Vehicle photo gallery (inline, scrollable or grid)

**Bu Yıl > Yarışmalar (Competitions)**
- 2 competition cards, each containing:
  - Competition name, date, location
  - Single hero photo
  - Short paragraph description

**Medya (Media Gallery)**
- Filterable gallery (Photos / Videos / Press Kit)
- Category tags (Vehicle, Testing, Competition, Team)
- Lightbox viewing
- Download options for press kit assets

**Geliştirme Blogu (Dev Blog)**
- Infinite scroll article feed
- Each entry shows: featured image, title, date, category tag, excerpt
- Category filter tabs (Mechanical, Avionics, Software, Testing, etc.)
- Clicking entry opens dedicated article page
- Article pages render markdown with embedded images

**İletişim (Contact)**
- Contact form
- Email and social links
- Embedded map (optional)
- University affiliation links
