# GROOVESTREET Brand Guide

Reference for anyone designing, writing or building for GROOVESTREET.

**Source of truth:** `src/styles/globals.css` (design tokens) and
`tailwind.config.ts` (token mapping). If this document and the code disagree,
the code wins — then update this document.

---

## 1. Brand at a glance

| Item | Value |
| --- | --- |
| Name | **GROOVESTREET** (always uppercase; never "Groove Street" or "Groovestreet") |
| Wordmark | `GROOVESTREET` with a green full stop: `GROOVESTREET.` |
| Primary tagline | **Design. Build. Ship.** |
| Secondary line | **Digitizing Your Business.** |
| Positioning | A Kampala design studio building websites, brands and graphics for growing businesses, serving Africa and beyond. |
| Audience | Small and growing businesses in Uganda and East Africa, plus international clients. |
| Personality | Direct, confident, local, practical, fast. Premium work at accessible prices. |
| Languages | English (default), French, German. |

**One-sentence brand promise:** premium design and build, fixed UGX quotes,
launch dates in writing, no surprises.

### Voice

- Short sentences. Outcome first. No agency jargon.
- Speak to the business owner, not to other designers.
- Lead with what the client gets: calls, bookings, visibility, ownership.
- Be specific about time and money: “48 hours”, “3–5 days”, “fixed UGX price”.
- Local pride without slogans: “Built by Ugandans”.
- Confident, never boastful. “Either you are found, or you are not.”

**Avoid:** “cutting-edge”, “synergy”, “passionate about”, “we are a team of
visionaries”, emoji in body copy, and exclamation marks in headings.

---

## 2. Colour system

GROOVESTREET is a **black-and-white interface with one dark green accent**.
The page is almost entirely black, white and grey; green is a signal, not a
surface. Keep green below roughly **10% of any screen**.

### 2.1 Core palette (design tokens)

| Token | HSL | Hex | Role |
| --- | --- | --- | --- |
| `--background` | `0 0% 0%` | `#000000` | Page canvas. Pure black. |
| `--foreground` | `0 0% 100%` | `#FFFFFF` | Primary text, primary CTA fill. |
| `--brand` | `168 42% 19%` | `#1C453D` | Brand green. Accent, focus, logo dot, hover fills. |
| `--brand-foreground` | `0 0% 100%` | `#FFFFFF` | Text/icons on brand green. |
| `--brand-muted` | `168 30% 25%` | `#2D534B` | Secondary green; subtle hover/active states. |
| `--card` | `0 0% 3%` | `#080808` | Card and popover surface. |
| `--secondary` | `0 0% 10%` | `#1A1A1A` | Secondary surfaces. |
| `--muted` | `0 0% 15%` | `#262626` | Muted surfaces. |
| `--muted-foreground` | `0 0% 60%` | `#999999` | Secondary text. |
| `--accent` | `0 0% 20%` | `#333333` | Accent surface. |
| `--border` / `--input` | `0 0% 20%` | `#333333` | Borders and input outlines. |
| `--destructive` | `0 100% 50%` | `#FF0000` | Errors only. |
| `--ring` | `0 0% 100%` | `#FFFFFF` | Focus ring. |
| `--radius` | `0rem` | — | Square corners by default. |

### 2.2 Greens in practice

| Use | Class | Notes |
| --- | --- | --- |
| Logo full stop | `text-brand` | The only permanent green in the wordmark. |
| Focused pricing card | `target:border-brand target:bg-white/[0.08]` | Green border marks selection. |
| Card hover | `hover:border-brand/40` | 40% green over black. |
| Process step ring | `bg-brand/10 border-brand/30` | Tinted fill, green outline. |
| CTA hover | `hover:bg-brand hover:text-white` | White button flips to green on hover. |
| Badge accent | `border-brand/30 text-brand-foreground/90` | Thin green outline. |
| Selection / active dot | `bg-brand` | Small moments only. |

**Rules**

- Do **not** use `#1C453D` as body text on black; contrast is only ~2.0:1.
- Do **not** fill large sections with green. Use black, then white type.
- Do **not** introduce blue, purple, orange or teal. Only red for errors.
- Gradients are background-only and near-invisible: black → `neutral-900`,
  or the hero radial `#1a2a24 → #000000`.
- Alpha variants are allowed (`brand/10`, `brand/30`, `brand/40`) but only as
  borders, tints and hover states.

### 2.3 Neutrals used in code

These are Tailwind’s neutral scale, used directly in components:

| Shade | Hex | Typical use |
| --- | --- | --- |
| `neutral-950` | `#0A0A0A` | Hero shape backing panel. |
| `neutral-900` | `#171717` | End of section gradients. |
| `neutral-800` | `#262626` | Dividers, card borders, secondary button borders. |
| `neutral-700` | `#404040` | Subtle borders/dividers. |
| `neutral-600` | `#525252` | Disabled details, decorative lines. |
| `neutral-500` | `#737373` | Small meta text only; ~4.4:1 on black. |
| `neutral-400` | `#A3A3A3` | Body/secondary text (~8.3:1). |
| `neutral-300` | `#D4D4D4` | Emphasised body text. |
| `neutral-200` | `#E5E5E5` | Near-white text. |

### 2.4 Opacity whites

Used heavily for hierarchy without adding hue:

| Class | Effective on black | Use |
| --- | --- | --- |
| `text-white/90` | `#E6E6E6` | Badge text, strong secondary. |
| `text-white/80` | `#CCCCCC` | Section labels, list items. |
| `text-white/70` | `#B3B3B3` | Subtitles, secondary headings. |
| `text-white/60` | `#999999` | Footer labels, meta. |
| `text-white/55` | `#8C8C8C` | Active rail text. |
| `text-white/40` | `#666666` | Large meta only; fails normal-text contrast. |
| `text-white/25` | `#404040` | Decorative rail text only. |
| `bg-white/5` | `#0D0D0D` | Card fill. |
| `bg-white/[0.03]` | `#080808` | Footer CTA band. |
| `border-white/20` | `#333333` | Card outlines. |

### 2.5 Contrast check (on `#000000`)

| Foreground | Ratio | Verdict |
| --- | --- | --- |
| `#FFFFFF` | 21.0:1 | AAA |
| `neutral-300` `#D4D4D4` | ~14.2:1 | AAA |
| `neutral-400` `#A3A3A3` | 8.3:1 | AAA |
| `#999999` (`muted-foreground`, `white/60`) | 7.4:1 | AAA |
| `neutral-500` `#737373` | 4.4:1 | Large text only |
| `white/40` `#666666` | 3.7:1 | Large text only |
| `#1C453D` brand green | 2.0:1 | Decorative only |
| `#FF0000` destructive | 5.3:1 | Passes normal text |

On-brand text: `#FFFFFF` on `#1C453D` = **10.7:1**; on `#2D534B` = **8.6:1**.
Both are safe.

### 2.6 Known colour inconsistencies

- The custom scrollbar uses `#1B4D3E` and `#2A6B54`, which are close to but
  **not** the brand token `#1C453D`. Prefer the token if you touch it.
- `--brand-muted` is defined but rarely used. Reach for it before inventing a
  new green.
- The site is dark-only (`className="dark"` on `<html>`); there is no light
  theme to design for yet.

---

## 3. Typography

**Typeface:** [Inter](https://rsms.me/inter/) via `next/font/google`, exposed as
`--font-inter`. One family for everything. No serif, no script, no display font.

| Level | Size | Weight | Tracking | Line height | Casing |
| --- | --- | --- | --- | --- | --- |
| Hero display | 48 / 72 / 96 px (`text-5xl` / `md:text-7xl` / `lg:text-8xl`) | 700 | `-0.03em` (`tracking-tighter`) | `0.95` | Uppercase |
| Section title (H2) | 36–48 px (`text-4xl md:text-5xl`) | 700 | `-0.03em` | tight | Sentence case |
| Card / step title (H3) | 20–24 px | 700 | normal | tight | Sentence case |
| Body | 16–18 px | 400 | 0 | `leading-relaxed` (1.625) | Sentence case |
| Small / meta | 14 px | 400 | 0 | normal | Sentence case |
| Eyebrow / label | 10–12 px | 500–600 | `0.1em`–`0.35em` | normal | UPPERCASE |
| Button | 12–14 px | 600 | `tracking-widest` (`0.1em`) | normal | UPPERCASE |
| Vertical rail | 7–9 px | 600 | `0.34em` | normal | UPPERCASE |

### Type rules

- Headings are **bold**, **tightly tracked**, and often **uppercase**.
- Body copy is **sentence case**, never justified, max ~65ch.
- Eyebrows always sit behind a short 48px rule (`h-px w-12 bg-white/40`) and
  above the headline.
- Use `text-white` for the first line of a section title and `text-white/70`
  for the second line.
- Do not use more than two weights on a screen (400 + 700 is the default).
- Numbers in stats and pricing are bold, large, and use tabular figures where
  available.
- Arabic is supported in the CSS (`[dir]`, `:lang(ar)`), but the site currently
  ships `en`, `fr`, `de` only.

---

## 4. Layout and spacing

| Token | Value |
| --- | --- |
| Content max width | `1280px` (`max-w-[1280px]`), centred |
| Container padding | `2rem` mobile, `4rem` at `md` and up |
| Section padding | `py-24` (96px) |
| Hero | `min-h-[100dvh]`, `py-[100px]` / `sm:py-[110px]` |
| Grid gap | `gap-8` (32px); hero `gap-12` |
| Card padding | `p-8` (32px) |
| Border width | `1px` dividers, `2px` cards and inputs |
| Radius | `0` — square corners everywhere |
| Icon size | 16–24px; 12px for inline meta |

**Corner rule:** square by default. The only circles are the numbered process
steps and decorative blur orbs. Never round cards, buttons, badges or inputs.

**Density:** generous. Sections breathe; text blocks stay narrow. Avoid dense
dashboards or cramped multi-column text.

---

## 5. Components and surfaces

### Buttons

- Base: `uppercase tracking-widest`, 150ms transition, `translateY(1px)
  scale(0.985)` on press.
- **Primary:** white fill, black text, `hover:bg-white/90` (or brand on CTAs).
- **Secondary:** `border-neutral-800`, `text-neutral-400`,
  `hover:border-neutral-600 hover:text-white`.
- **Outline:** white border, transparent, inverts on hover.
- **Ghost:** text only, `hover:bg-white/5`.
- Sizes: `sm` `px-4 py-2 text-xs`, `md` `px-6 py-3 text-sm`, `lg` `px-8 py-4`.

### Cards

- `border-2 border-white/20 bg-white/5 backdrop-blur-sm p-8`.
- Hover: border to `white/50`, background to `white/10`.
- Popular pricing card: `border-white` plus a white “Popular” tab.
- No shadows. Depth comes from borders, transparency and blur.

### Badges

- Square, `px-3 py-1`, `text-xs uppercase tracking-widest`.
- Default: black/60 with white/20 border.
- Outline: `border-neutral-800 text-neutral-400`.
- Brand variant: `border-brand/30 text-brand-foreground/90`.

### Forms

- Inputs: black/near-black fill, `border` token, white text, square corners.
- Labels are uppercase, small, tracked.
- Errors use `destructive` red, never green.
- Focus ring is white.
- Contact form is the primary conversion surface; keep it short (name, email,
  message).

### Motion

| Interaction | Duration / easing |
| --- | --- |
| Control hover/press | 150ms ease; 90ms on press |
| Border/background hover | 300ms |
| Scroll reveal | 500ms, `y: 20 → 0`, opacity 0 → 1 |
| Hero headline | 900ms, `cubic-bezier(0.16, 1, 0.3, 1)`, staggered 120ms |
| Hero shape | spring, stiffness 100, damping 20 |
| Horizontal marquee | 40s linear, pauses on hover |
| Vertical rails | 64s linear, opposite directions |
| Testimonial progress | 7s linear |

Honour `prefers-reduced-motion`: all marquees and loaders stop, transitions
collapse. Never autoplay video with sound.

---

## 6. Imagery and graphics

- Prefer real work: screenshots of live sites, real client graphics, real team
  avatars. Avoid generic corporate stock.
- Screenshots are shown at `16:10`, `object-cover object-top`, with a dark
  overlay and “Open preview” on hover.
- The hero visual is a geometric, line-based square — not a photo.
- Sample work lives in `public/samples-shots/` and `public/graphics/`.
- Social preview: `public/image.png` at 1200×630.
- Keep images dark, high-contrast and free of text smaller than 24px when used
  as backgrounds.

---

## 7. Logo and wordmark

**Current implementation:** the wordmark is rendered as text in
`src/components/Logo/index.tsx`:

```tsx
<Link className="text-2xl font-bold tracking-tighter">
  GROOVESTREET<span className="text-brand">.</span>
</Link>
```

Guidelines:

- Always uppercase, one word, tight tracking.
- The full stop is always brand green (`#1C453D`); the letters are white on
  dark, black on light.
- Minimum clearspace: the height of the “G” on all sides.
- Do not box it, outline it, add a shadow, stretch it, or set it in another
  typeface.
- There is no standalone SVG wordmark or monogram yet. The favicon is a
  raster image embedded in an SVG. If you need a vector logo, create one and
  add it to `public/` rather than tracing the wordmark.
- `public/site.webmanifest` still says **“Mono”** — it should be updated to
  GROOVESTREET before launch.

**Asset inventory**

| Asset | Path |
| --- | --- |
| Wordmark | Rendered by `src/components/Logo/index.tsx` |
| Favicon (ICO) | `public/favicon.ico` |
| Favicon (SVG) | `public/favicon.svg` |
| Favicon 96px | `public/favicon-96x96.png` |
| Apple touch icon | `public/apple-touch-icon.png` |
| PWA icons | `public/web-app-manifest-192x192.png`, `-512x512.png` |
| Social card | `public/image.png` |
| Team avatars | `public/team/*.svg` |
| Social icons | `src/components/icons/*.tsx` |

---

## 8. Accessibility

- Body text: use `neutral-400` or lighter on black. Avoid `neutral-500` for
  anything below 18px.
- Never use brand green for text on black. Use it for borders, fills and
  backgrounds with white text.
- Focus states must remain visible; the ring is white.
- Icons that carry meaning need an accessible label; decorative icons get
  `aria-hidden`.
- Keep motion optional; respect `prefers-reduced-motion`.
- Tap targets: minimum 44×44px on mobile.
- Colour is never the only signal — pair green with a border, label or icon.

---

## 9. Copy patterns

**Do**

- “Fixed UGX quotes. Launch dates in writing.”
- “We build websites that turn visitors into calls and bookings.”
- “Get found on Google, Maps and search.”
- “You go live. Full ownership. Two weeks free support.”
- “Built by Ugandans.”

**Don’t**

- “We are a passionate team of creative visionaries.”
- “Cutting-edge solutions for the digital age.”
- “Unlock synergies.”
- “Best web design company in Uganda!!!”

**Casing**

- Brand: `GROOVESTREET`.
- Taglines: `Design. Build. Ship.` / `Digitizing Your Business.`
- Headings: sentence case, except the hero and eyebrow labels.
- Currency: `UGX 200,000` (space, comma thousands) and `$` only when the
  currency toggle is set to USD.

---

## 10. Quick reference for new pages

1. Start on `bg-black text-white`.
2. Wrap content in `container mx-auto` (max 1280px, 2rem/4rem padding).
3. Use `py-24` between sections.
4. Add an eyebrow rule + uppercase label, then a bold tight headline.
5. Body copy at `text-neutral-400`, 16–18px, max ~65ch.
6. One primary white CTA per section; everything else is outline/ghost.
7. Cards: 2px `white/20` border, `white/5` fill, square corners, `p-8`.
8. Add green only as a small accent: logo dot, focus border, step ring, hover.
9. Add a scroll reveal (500ms, 20px rise) and respect reduced motion.
10. End every page with the footer CTA band — never a dead end.

---

## 11. Open brand tasks

- [ ] Update `public/site.webmanifest` name/short_name from “Mono” to
      GROOVESTREET and set `theme_color`/`background_color` intentionally.
- [ ] Decide whether `#1B4D3E`/`#2A6B54` (scrollbar) should be replaced by
      `#1C453D`/`#2D534B`.
- [ ] Create a vector wordmark and monogram for print, social avatars and
      favicons.
- [ ] Add a dedicated brand page (`/brand`) or downloadable press kit once the
      logo files exist.
- [ ] Document the final domain and email addresses here after launch.
