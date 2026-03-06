---
name: business-website
description: >
  Use when someone asks to build a business website, service landing page, company portfolio,
  contractor site, or professional multi-section website. Creates production-grade, image-heavy
  business landing pages with dark/light themes, card-based layouts, service grids, process
  timelines, interactive elements, and contact forms. Vanilla HTML/CSS/JS + GSAP.
argument-hint: "[business-name or brief description]"
---

# Business Website Builder

Create professional, multi-section business landing pages with rich interactions, responsive design, and distinctive aesthetics. Output is a complete vanilla HTML/CSS/JS project — no bundler, no framework.

**Use the `frontend-design` skill** for aesthetic direction (typography, color theory, motion principles). This skill adds structured section patterns, business-specific workflows, and interaction blueprints on top.

## Input

The user provides a business name and optionally:
- Industry/sector and services offered
- Contact info (phone, email, address)
- Branding preferences (colors, tone, existing logo)
- Images or image descriptions for sections
- Target language(s) (default: Slovak + English toggle)
- Which sections they want (default: all that apply)

If the user doesn't specify these, ask briefly or infer from context.

## Design System

Every business site built with this skill uses a **cohesive design system** defined via CSS variables. Choose a direction that fits the industry — the examples below show a dark industrial aesthetic (construction), but adapt freely.

### Color Architecture

```css
:root {
  /* Core palette — dark-dominant with warm accent */
  --bg-primary: #1a1a1a;       /* Main background */
  --bg-secondary: #242424;     /* Cards, elevated surfaces */
  --bg-tertiary: #2e2e2e;      /* Hover states, active elements */
  --bg-accent: #e8760a;        /* CTA sections, accent fills */
  --border-subtle: #333;       /* Card borders, dividers */

  /* Text hierarchy */
  --text-primary: #f5f5f5;     /* Headings, important text */
  --text-secondary: #a0a0a0;   /* Body text, descriptions */
  --text-accent: #e8760a;      /* Labels, highlights, links */
  --text-on-accent: #fff;      /* Text on accent backgrounds */

  /* Functional */
  --radius-sm: 6px;
  --radius-md: 12px;
  --radius-lg: 20px;
  --transition-base: 0.3s ease;
}
```

**Rules:**
- Dark themes: `--bg-primary` is near-black (#1a-#222), accent is warm (orange, amber, gold) or cool (blue, teal)
- Light themes: flip — `--bg-primary` is off-white (#f5f2ef), `--text-primary` is near-black, accent still stands out
- **Never** use pure black (#000) or pure white (#fff) as backgrounds
- Accent color appears sparingly: badges, labels, CTAs, active states, hover borders — NOT large fill areas except the CTA banner section

### Typography

```css
@import url('https://fonts.googleapis.com/css2?family=...');

:root {
  --font-display: '[DISPLAY FONT]', sans-serif;  /* Bold, condensed, uppercase headings */
  --font-body: '[BODY FONT]', sans-serif;         /* Clean, readable body text */
}
```

**Font pairing rules:**
- Display font: condensed or bold weight, used UPPERCASE for section headings (e.g., Oswald, Barlow Condensed, Bebas Neue, Antonio, Archivo Black)
- Body font: clean geometric or humanist sans (e.g., Outfit, DM Sans, Source Sans 3, Nunito Sans)
- **Never** use Inter, Roboto, Arial, or system fonts
- Section headings: `2.5rem–4rem`, uppercase, `letter-spacing: 0.04em`, `font-weight: 700+`
- Body text: `0.95rem–1.05rem`, `line-height: 1.7`, `color: var(--text-secondary)`
- Labels/badges: `0.7rem`, uppercase, `letter-spacing: 0.15em`, `color: var(--text-accent)`

### Card Pattern

Cards are the primary content container. They use subtle borders, NOT glassmorphism or heavy shadows.

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: border-color var(--transition-base);
}
.card:hover {
  border-color: var(--text-accent);
}
```

### Numbered Badge System

For ordered items (equipment, steps, services):

```css
.badge-number {
  width: 36px; height: 36px;
  border-radius: 50%;
  background: var(--bg-accent);
  color: var(--text-on-accent);
  font-weight: 700;
  font-size: 0.85rem;
  display: flex; align-items: center; justify-content: center;
  position: absolute; top: 12px; right: 12px;
}
```

### Icons

Use inline SVG or an icon library (Lucide Icons recommended — `https://unpkg.com/lucide@latest`). Match stroke color to `--text-accent`. Size: 28–36px for section icons, 20–24px for inline.

---

## Section Blueprint Library

Each section below is a named, reusable pattern. For detailed HTML/CSS/JS code for every section, see [sections-reference.md](sections-reference.md).

Pick sections based on business needs. A typical business site uses 6–9 of these.

### 1. HERO — Full-Viewport Impact

Full-screen background image with dark overlay gradient, location/category badge, massive bold heading, subtitle, primary CTA button, and optional scroll indicator.

- **Layout**: Centered vertically, content max-width ~800px
- **Image**: CSS `background-image` with `background-size: cover`, overlaid with `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.7))`
- **Badge**: Small pill with accent border — e.g., "Topoľčany, Slovakia"
- **Heading**: `3.5rem–5rem`, uppercase, `font-weight: 800`, `--font-display`
- **CTA**: Large button, accent-colored, `padding: 1rem 2.5rem`, subtle hover lift
- **Scroll indicator**: Small animated chevron or mouse icon at bottom center
- **Responsive**: Heading scales down to `2.2rem` on mobile, CTA becomes full-width

### 2. SHOWCASE GRID — Equipment / Products / Portfolio

Section heading + subtitle, then a responsive card grid. Each card has: image, numbered badge, title, and short description.

- **Layout**: CSS Grid `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`, gap `1.5rem`
- **Cards**: Image fills top portion (`aspect-ratio: 4/3`), text content below with padding
- **Badge**: Numbered circle positioned top-right of image
- **Responsive**: 4 cols → 2 cols → 1 col
- **Animation**: Staggered fade-up on scroll (GSAP ScrollTrigger)

### 3. PROJECT SHOWCASE — Before/During/After

Split layout: text + stats on the left, image gallery on the right. Includes toggle tabs to switch between project phases.

- **Layout**: CSS Grid `grid-template-columns: 1fr 1.2fr`, gap `3rem`
- **Left side**: Orange label ("REALIZOVANÝ PROJEKT"), heading, paragraph, tab buttons (Pred/Počas/Po), stat counters row
- **Right side**: Two images side by side, swap based on active tab
- **Tabs**: Button group with active state (accent border + accent text)
- **Stats**: Row of 3 stat cards — large number (animated counter), unit, label
- **Responsive**: Stacks vertically on mobile, images full-width, stats row wraps

### 4. SERVICES GRID — Asymmetric Bento Layout

Irregular grid of service cards — NOT a uniform 3×2. Mix large and small cards for visual interest.

- **Layout**: CSS Grid with `grid-template-columns: repeat(3, 1fr)` and specific `grid-column` spans:
  - Row 1: one card spans 2 cols, one spans 1
  - Row 2: two cards of equal width
  - Row 3: mirror of row 1
- **Each card**: Icon (SVG, 32px, accent color), title (uppercase, bold), short description
- **Active/hover state**: `border-color: var(--text-accent)` — one card starts highlighted
- **Responsive**: All cards stack to single column on mobile

### 5. PROCESS TIMELINE — How It Works

Horizontal step-by-step flow: circular icon nodes with step numbers, connecting line between them, titles and descriptions below.

- **Layout**: Flexbox row, `justify-content: space-between`, centered
- **Each step**: Circle icon container (56–72px, accent bg), step number label below, title, and short description
- **Connecting line**: Pseudo-element `::after` on each step (except last), `height: 2px`, `background: var(--border-subtle)`, positioned between circles
- **Responsive**: Switches to vertical layout on mobile (circles on left, text on right, line goes vertical)
- **Animation**: Steps fade in sequentially on scroll

### 6. COVERAGE MAP — Service Area Visualization

Concentric circle diagram centered on the business location, with surrounding city dots at approximate relative positions.

- **Layout**: Centered, fixed-height container (`min-height: 500px`)
- **Center**: Location pin icon + city name in a glowing circle
- **Rings**: 2–3 concentric circles (CSS `border-radius: 50%`, `border: 1px solid var(--border-subtle)`)
- **City dots**: Positioned absolutely with small circles + labels, placed at approximate geographic positions
- **Alternative**: Embed a Leaflet/Google Maps `<iframe>` styled with dark theme for real mapping needs
- **Responsive**: Scale down circles, reduce label font sizes

### 7. CTA BANNER — Call to Action

Full-width section with accent-colored background, bold heading, subtitle, and contrasting button.

- **Layout**: Centered text, generous vertical padding (`5rem–8rem`)
- **Background**: `var(--bg-accent)` solid color
- **Heading**: Large, white, uppercase
- **Button**: Dark background on accent (`#1a1a1a` on orange), `border: 2px solid`, hover invert
- **Responsive**: Padding reduces, heading scales down

### 8. CONTACT — Info + Form

Split layout: contact info cards on the left, form on the right.

- **Layout**: CSS Grid `grid-template-columns: 1fr 1fr`, gap `3rem`
- **Left side**: Stacked info cards (phone with icon, coverage note), bordered, dark bg
- **Right side**: Form with inputs (name, email, service dropdown, textarea), accent-colored submit button with send icon
- **Form**: Netlify Forms (`data-netlify="true"`) or Formspree as fallback. Client-side validation on required fields
- **Responsive**: Stacks vertically, form goes full-width

### 9. FOOTER — Minimal

Simple centered copyright text, muted color, small font.

```html
<footer class="site-footer">
  <p>&copy; 2026 BUSINESS NAME. City, Country.</p>
</footer>
```

---

## Workflow

### Step 1: Gather Business Info

Collect from the user (ask if not provided):
- Business name, tagline
- Industry/services list
- Location and service area
- Phone, email, address
- Images (or let user provide later — use descriptive placeholders)
- Language(s)
- Preferred color accent (or infer from industry)

### Step 2: Select Sections

Based on the business type, choose 6–9 sections from the blueprint library. Typical combinations:

| Business Type | Recommended Sections |
|---|---|
| Construction / Contractor | Hero, Showcase Grid, Project Showcase, Services Grid, Process Timeline, Coverage Map, CTA Banner, Contact, Footer |
| Professional Services | Hero, Services Grid, Process Timeline, Stats (embedded), CTA Banner, Contact, Footer |
| Local Business / Shop | Hero, Showcase Grid, Services Grid, Coverage Map, CTA Banner, Contact, Footer |
| Portfolio / Creative | Hero, Showcase Grid, Project Showcase, CTA Banner, Contact, Footer |

### Step 3: Scaffold

```
project-root/
  index.html
  css/style.css
  js/app.js
  images/          (user provides, or placeholder references)
```

No bundler. Vanilla HTML/CSS/JS + CDN libraries.

### Step 4: Build index.html

Required structure:
1. `<head>` — meta charset, viewport, title, meta description, font import, stylesheet link
2. **Sticky header** — logo + nav links + language toggle (if multilingual)
3. Selected sections in logical order (Hero always first, Contact/Footer always last)
4. CDN scripts at end of `<body>`:

```html
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/gsap.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3/dist/ScrollTrigger.min.js"></script>
<script src="js/app.js"></script>
```

**Navigation**: Header nav links should anchor to each section via `id` attributes and smooth-scroll behavior.

**Language toggle**: If multilingual, add `<button class="lang-toggle">` in header. Content is stored in a JS translations object and swapped on click.

### Step 5: Build css/style.css

1. Define the full design system variables in `:root`
2. Reset (`*, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }`)
3. Base typography styles
4. Header styles (sticky, `backdrop-filter: blur(10px)`, `background: rgba(26,26,26,0.9)`)
5. Section-by-section styles following the blueprints
6. Responsive breakpoints:
   - `@media (max-width: 1024px)` — reduce grid columns, scale typography
   - `@media (max-width: 768px)` — stack layouts, mobile navigation (hamburger menu), full-width cards
   - `@media (max-width: 480px)` — maximum compression, single column everything

### Step 6: Build js/app.js

Core modules (implement in this order):

1. **Smooth scroll** — `scroll-behavior: smooth` on `html`, or optionally Lenis for premium feel
2. **GSAP scroll-triggered reveals** — each section's content fades/slides in on scroll:
   ```js
   gsap.registerPlugin(ScrollTrigger);
   // Reveal pattern for each section
   document.querySelectorAll('.section-reveal').forEach(el => {
     gsap.from(el, {
       y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
       scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
     });
   });
   ```
3. **Staggered card animations** — cards in grids animate in with stagger delay
4. **Counter animations** — stat numbers count up from 0 using GSAP
5. **Tab switching** — project showcase Before/During/After tabs swap images + update active state
6. **Mobile menu** — hamburger toggle for nav on `<768px`
7. **Language toggle** — swap `textContent` from translations object, update `<html lang="">`
8. **Form validation** — lightweight client-side validation before submit
9. **Sticky header behavior** — optional: header becomes opaque after scrolling past hero

### Step 7: Test Checklist

- [ ] All sections render correctly at 1440px, 1024px, 768px, 480px, 320px
- [ ] Navigation smooth-scrolls to each section
- [ ] Cards have visible hover states
- [ ] Stat counters animate on scroll
- [ ] Tab switching works in Project Showcase
- [ ] Contact form validates required fields
- [ ] Mobile hamburger menu opens/closes
- [ ] Language toggle swaps all visible text (if multilingual)
- [ ] No horizontal scroll at any breakpoint
- [ ] Images have `alt` text and `loading="lazy"`
- [ ] Lighthouse: Performance 85+, Accessibility 90+, Best Practices 90+

---

## Animation Guidelines

Business sites need **professional restraint** — not the aggressive scroll-driven choreography of a product launch page.

### Scroll Reveals
- Use GSAP `ScrollTrigger` with `start: 'top 85%'` — elements appear as they enter viewport
- Default animation: `y: 40, opacity: 0, duration: 0.8, ease: 'power3.out'`
- Cards use `stagger: 0.1` for sequential entrance
- **Never** reverse animations on scroll-up — use `toggleActions: 'play none none none'`
- Each section animates independently when it enters view

### Counter Animations
- All numbers (stats, years, percentages) count up from 0
- Duration: 2s, ease: `power1.out`
- Trigger once on scroll into view

### Hover Micro-Interactions
- Cards: `border-color` transition to accent on hover
- Buttons: subtle `translateY(-2px)` + `box-shadow` on hover
- Nav links: underline slide-in or opacity change
- Keep all transitions under `0.3s`

### What NOT to Animate
- Body text — never animate paragraph text entrance
- Navigation — always visible, never animated in
- Footer — static, no animation
- Don't use parallax scrolling on images — it's overdone and hurts performance

---

## Internationalization (i18n)

For multilingual sites (common in Slovakia — SK/EN):

```js
const translations = {
  sk: {
    nav: { services: 'Služby', process: 'Postup', contact: 'Kontakt' },
    hero: { badge: 'Topoľčany, Slovensko', heading: '...', cta: 'Žiadosť o cenovú ponuku' },
    // ... all section text
  },
  en: {
    nav: { services: 'Services', process: 'Process', contact: 'Contact' },
    hero: { badge: 'Topoľčany, Slovakia', heading: '...', cta: 'Request a Quote' },
  }
};
```

- Store current language in `localStorage`
- Toggle button in header: `🌐 EN` / `🌐 SK`
- All translatable elements use `data-i18n="key.path"` attributes
- On toggle: iterate all `[data-i18n]` elements, set `textContent` from translations object
- Update `<html lang="">` attribute on switch

---

## Premium Checklist (Non-Negotiable)

1. **3+ different layout patterns** — never use the same grid for consecutive sections
2. **Responsive 320px → 2560px** — test at every breakpoint, no horizontal overflow
3. **All statistics animate** via counter — numbers never appear statically
4. **Scroll-triggered section reveals** — content fades in as user scrolls, not all visible on load
5. **Contact form with validation** — required fields, email format check, visual error states
6. **Semantic HTML** — proper heading hierarchy (h1 → h2 → h3), landmark elements, `alt` on images
7. **Performance** — `loading="lazy"` on images, `preconnect` for fonts, minimal DOM nesting
8. **Hover states on every interactive element** — cards, buttons, links, form inputs
9. **Sticky header** with backdrop blur — always accessible navigation
10. **CTA visibility** — at least 2 call-to-action touchpoints (hero CTA + CTA Banner + contact form)

---

## Anti-Patterns

- **No glassmorphism** — no `backdrop-filter: blur` on cards, no frosted glass panels. Cards use subtle borders
- **No generic Bootstrap/Tailwind templates** — every site should feel custom-designed for the specific business
- **No canvas frame rendering** — that's `video-to-website` territory. This skill uses standard HTML sections with images
- **No excessive animation** — business sites need trustworthiness, not spectacle. Restrained scroll reveals only
- **No center-aligned everything** — vary layouts: left-aligned hero text, right-aligned project text, centered CTA, asymmetric grids
- **No stock placeholder abuse** — use `via.placeholder.com` or `picsum.photos` only as temporary references; guide user to provide real images
- **No pure black/white** — always use off-black (`#1a1a1a`) and off-white (`#f5f5f5`)
- **No icon fonts** — use inline SVG or Lucide for crisp, accessible icons
- **Never use Inter, Roboto, Arial** — pick distinctive, characterful font pairings

---

## Troubleshooting

- **Sections overlapping on mobile**: Check that grid columns collapse properly at breakpoints
- **Counter not animating**: Verify `data-value` attribute exists and GSAP ScrollTrigger is registered
- **Language toggle not working**: Check that all translatable elements have `data-i18n` attributes
- **Form not submitting**: Verify `data-netlify="true"` attribute on `<form>` element (Netlify) or action URL (Formspree)
- **Hamburger menu not closing on link click**: Add click handler on nav links to close mobile menu
- **Horizontal scroll on mobile**: Check for elements with fixed widths — use `max-width: 100%` and `overflow-x: hidden` on body
