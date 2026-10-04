# Clear Credit – Responsive Landing Page

A responsive landing page built from the "Clear Credit Web Landing page" Figma design using plain HTML5, CSS3 and vanilla JavaScript (no frameworks, no libraries).

- **Live site:** https://clear-credit-landing.vercel.app/
- **Repository:** https://github.com/najirhussain029/clear-credit-landing

## Features

- Sticky header with mobile hamburger menu
- Hero with loan amount form (jumps to the calculator with the entered amount)
- Lender comparison **slider** (previous/next buttons, scroll snapping, touch/keyboard scroll)
- **Savings calculator** with live results, progress rings and comparison bars
- "Why choose us" cards, **accordion** services list and FAQ
- Fully responsive: desktop, laptop, tablet and mobile
- Optional dark mode toggle (default view is light, matching the Figma design; choice is saved in localStorage)

## Run locally

No build step is needed. JavaScript uses ES modules, so open the project through a local server (not `file://`):

```bash
npx live-server
```

Or use the VS Code "Live Server" extension and open `index.html`.

## Project structure

```
index.html
css/
  base.css          design tokens (CSS variables), reset, typography
  layout.css        container, section spacing, helpers
  components.css    buttons, slider, accordion, shared UI
  sections.css      section-specific styles + responsive breakpoints
js/
  main.js           entry point, mobile nav, theme toggle
  accordion.js      accessible accordion (services + FAQ)
  slider.js         lender slider
  calculator.js     savings calculator logic
assets/images/      images and logos
```

## Approach

**Figma to code.** I split the design into sections (header, hero, partners, compare, calculator, why-choose, services, FAQ, footer), extracted colors, type and spacing into CSS variables in `base.css`, then built each section as a semantic `<section>`.

**CSS.** Custom CSS (no framework) to keep the page light and to show clear structure. Files are split by responsibility, and every color, font and spacing value comes from `:root` variables, so a design change happens in one place. Layouts use CSS Grid and Flexbox.

**Responsive strategy.** Desktop first with two breakpoints:

| Breakpoint | Changes |
|---|---|
| `max-width: 1024px` (tablet) | Hero stacks to one column, cards and footer go to 2 columns |
| `max-width: 768px` (mobile) | Hamburger navigation, single column cards, calculator fields and results stack, smaller radii and spacing |

Tablet and mobile layouts are not in the Figma file, so they are my own adaptation of the design.

## JavaScript

- **Accordion** (`accordion.js`): event delegation on each `[data-accordion]` group. One item is open at a time; state is kept in `aria-expanded` and the panel's `hidden` attribute.
- **Slider** (`slider.js`): lender cards are rendered from an array; the arrow buttons call `scrollBy` on a scroll-snap track.
- **Calculator** (`calculator.js`): uses the standard amortised loan formula, with `r = APR / 12 / 100` and `n = years × 12`:

  `monthly = P · r / (1 − (1 + r)^−n)`, `interest = monthly · n − P`

  It computes the current loan and the new loan, then updates the summary sentence, the savings figures, the bars (width relative to the larger value) and the rings (percentage saved). With the default values (1,000 at 10% for 2 years vs 2% for 3 years) it shows $46 / $108 and $29 / $31, matching the design.

## Dark mode

A toggle button in the header switches between light and dark themes. Colors are CSS variables in `css/base.css`, overridden for the dark theme. The choice is stored in `localStorage`. The default view is light, matching the Figma design.

## Typography

The Figma file uses a rounded geometric grotesque font. I used **Plus Jakarta Sans** (Google Fonts) as the closest available alternative, with a system font fallback.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `section`, `footer`)
- Skip-to-content link and visible focus outlines
- Accordion and menu buttons use `aria-expanded` / `aria-controls`
- Form fields have labels, calculator summary uses `aria-live`
- `prefers-reduced-motion` respected

## Performance

- No frameworks or libraries; small CSS and JS files
- Only one external resource (Google Fonts, with `preconnect` and `display=swap`)
- Event delegation and minimal DOM updates

## Assets

Assets provided in the Figma file are used where exported. Items below are placeholders:

| Item | Status |
|---|---|
| Hero image | Placeholder (`assets/images/hero.webp` to be replaced with Figma export) |
| Lender and partner logos | Text placeholders until exported from Figma |
| Icons (cards, arrows, social) | Unicode characters as placeholders |

No external stock images are used. Update this table if any asset is sourced elsewhere.

## Contact & Links

Contact details in the header, footer and social icons were updated from the original design placeholders:

| Item | Value | Where used |
|---|---|---|
| Phone | `01737114304` | Header button, footer, `tel:` links |
| Email | `mnex@credit.al` | Footer, `mailto:` link |
| LinkedIn | https://www.linkedin.com/company/mnex-group-ltd/posts/ | Footer social icon |

## Changes from the Figma design

The desktop layout follows the Figma file. These are the intentional differences:

- Phone number, email and LinkedIn link replaced with project-specific details
- Tablet and mobile layouts designed by me (no Figma frames provided)
- Optional dark mode toggle (default view is light)
- Lender cards are rendered from a JavaScript array (static demo data)
