# FormatMD — Roadmap

> Last Updated: 2026-03-10

---

## Legend
- P0 = Critical / Blocking
- P1 = High priority
- P2 = Medium priority
- P3 = Nice to have

---

## Phase 1: Fix & Stabilize (Current Sprint)

### Bugs (P0) — COMPLETED 2026-03-10
- [x] BUG-001: Fix footer animation stuck after paste
- [x] BUG-002: Fix /docs and /features pointing to same page
- [x] BUG-003: Fix toolbar button background mismatch
- [x] BUG-004: Fix animated placeholder getting stuck
- [x] BUG-006: Deduplicate paste handling into shared hook

### SEO (P1)
- [ ] A. Add structured data (JSON-LD) to index.html
- [ ] A. Complete missing meta tags (canonical, og:url, theme-color, keywords)
- [ ] A. Create sitemap.xml + update robots.txt
- [ ] A. Add per-page titles via react-helmet-async
- [ ] A. Fix og:image to use self-hosted asset
- [ ] A. Fix twitter:site from "@Lovable" to own handle

### Quick Fixes (P1)
- [ ] Remove unused ReactMarkdown import
- [ ] Align theme naming (vaporwave vs cappuccino)
- [ ] Fix copy button feedback (inverted state)
- [ ] Fix theme switch icon semantics
- [ ] Persist theme to localStorage

---

## Phase 2: UX Polish (Next 2 Weeks)

### Feedback System Improvements (P1) — Task B
- [ ] B. Add form validation UX (inline errors, character counters)
- [ ] B. Show upload progress indicator
- [ ] B. Handle partial upload failures gracefully
- [ ] B. Add success animation after submit
- [ ] B. Consider email field for follow-up

### Donate Button (P1) — Task C
- [ ] C. Add Ko-fi / Buy Me a Coffee / GitHub Sponsors link
- [ ] C. Place in footer and/or header as subtle CTA
- [ ] C. No backend needed — external link only

### InfinitiGRID Link (P1) — Task D
- [ ] D. Add InfinitiGRID link in footer
- [ ] D. Add "Powered by InfinitiGRID" branding option

### Toolbar UX Overhaul (P1) — Bug Fix
- [ ] Group toolbar buttons by function with dividers
- [ ] Add tooltips (hover + focus, 500ms delay)
- [ ] Add focus-visible states for keyboard nav
- [ ] Add aria-labels to all icon buttons
- [ ] Add "More" overflow menu for mobile
- [ ] Follow Material Design spacing and interaction patterns

### Mobile View (P1) — Task G
- [ ] Fix toolbar overflow (horizontal scroll or collapse menu)
- [ ] Fix terminal header wrapping on small screens
- [ ] Fix footer link layout on mobile
- [ ] Fix landing page layout shift
- [ ] Test and fix on iOS Safari, Chrome Mobile
- [ ] Add responsive font scaling

---

## Phase 3: Content & Pages (Next Month)

### Features on Homepage (P1) — Task J
- [ ] J. Move current features/docs content to homepage second fold
- [ ] J. After scroll from editor, show feature cards
- [ ] J. Smooth scroll transition
- [ ] J. Keep /docs as detailed documentation

### Documentation Page (P2) — Task E
- [ ] E. Proper documentation with sections and navigation
- [ ] E. Markdown syntax reference
- [ ] E. Keyboard shortcuts reference
- [ ] E. Theme customization guide

### Release Notes Page (P2) — Task E
- [ ] E. Changelog with version history
- [ ] E. New `releases` table in Supabase
- [ ] E. Visual timeline of updates

### Public Roadmap Page (P2) — Task E
- [ ] E. Display planned features from database
- [ ] E. Upvote system for feature requests
- [ ] E. New `feedback_votes` table (user + feedback FK)
- [ ] E. Public leaderboard of most-requested features
- [ ] E. Status labels: planned, in progress, shipped

### Domain Linking (P2) — Task F
- [ ] F. Connect custom domain via Lovable settings
- [ ] F. Update all og:url, canonical, sitemap URLs
- [ ] F. Set up SSL

---

## Phase 4: Discovery & Growth

### Other Tools Page (P2) — Task H
- [ ] H. Curated list of complementary tools
- [ ] H. Categories: editors, converters, validators
- [ ] H. Partner / affiliate links

### Additional Themes (P2)
- [ ] 3-5 more themes (e.g., Dracula, Nord, Solarized, GitHub)
- [ ] Theme preview thumbnails
- [ ] Custom theme creator (color picker)

### Syntax Highlighting (P2)
- [ ] Add Prism.js or highlight.js for code blocks
- [ ] Language auto-detection
- [ ] 50+ language support

### User Accounts (P3)
- [ ] Enable Supabase Auth (Google, GitHub, email)
- [ ] User profile page
- [ ] Save documents to account
- [ ] Document history/versions

### Advanced Exports (P3)
- [ ] Export to Dev.to, Medium, Hashnode
- [ ] GitHub Gist creation
- [ ] Image export (screenshot of styled output)

### AI Features (P3)
- [ ] Auto-format messy markdown
- [ ] Grammar/spell check
- [ ] Tone suggestions
- [ ] API: Claude or GPT integration

---

## Infrastructure Tasks (Ongoing)

- [ ] Add error boundaries at route level
- [ ] Add build-time env validation
- [ ] Remove unused shadcn/ui components
- [ ] Enable TypeScript strict mode incrementally
- [ ] Add unit tests (aim for 60% coverage)
- [ ] Set up code splitting with React.lazy
- [ ] Debounce preview rendering
- [ ] Add DOMPurify for XSS protection
- [ ] Add security headers to deployment config
- [ ] Create .env.example file
