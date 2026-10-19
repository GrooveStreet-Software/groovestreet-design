# GROOVESTREET DESIGN — Design System & Strict Guidelines

**Version 1.1 · Binding for every page, component and future contributor.**
Structure, type scale, component shapes and **graphics** are taken from `duck.design`
(design template). Information architecture and marketing copy logic are derived from
`knapsackcreative.com` (content source of inspiration). The **colour palette is
GROOVESTREET's own** — deep green, hot orange, warm paper. We borrow the template's
craft and artwork; we never borrow its brand colour.

> Every token here exists in code as a CSS custom property inside the `@theme` block of
> `src/app/globals.css`. **If a value is not in that block, it does not exist.** Never
> hard-code a hex, font-size or duration in a component.

### What came from `duck.design`

| Area      | Adopted                                                                                                                                                        |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Type      | `Sentient` display serif (regular/italic) + `Inter` UI, self-hosted in `src/app/fonts`                                                                         |
| Scale     | 64/48px display steps, `-1.92px` tracking, 13px uppercase eyebrows                                                                                             |
| Shape     | `20px` cards, `100px` pill buttons, `2px` button borders                                                                                                       |
| Structure | Pill nav, eyebrow with trailing rule, dashed rules between list rows and stat columns, warm corner-glow on cards, ring-on-hover buttons                        |
| Graphics  | Hero / CTA / contact / pricing backdrops, case imagery, audience illustrations, two-tone icon set, quote mark — all in `public/images/duck` and `public/icons` |

### What is GROOVESTREET

- The whole palette (§3.1) — green `#1B4D3E`, orange `#FF5A1F`, paper `#F6F4EF`.
- The wordmark, voice, page copy and all proof/claims (§2, §12).
- The process steps treatment — oversized ghost numeral behind each icon (§10).
- The hero `client` ⇄ `customer` word-swap animation.
- The sticky call · WhatsApp · email bar under 768px (§5).

---

## 1. Design principles

1. **Editorial, not decorative.** Big type, generous whitespace, few colors. Content carries the weight.
2. **One action per screen.** A single primary CTA per viewport, repeated down the page — never two competing primaries side by side.
3. **Corporate trust, street energy.** Deep green + near-black for authority; one hot accent for momentum. Playful only in motion and micro-labels.
4. **Small screens first, always.** Every section is designed at 360px first. If it needs horizontal scroll, it is wrong.
5. **Earned proof only.** No invented client names, ratings or logos. Every review, partner and case study on the site is real, and published with the client's permission.
6. **Performance is a design decision.** The budget in §13 is a hard gate, not an aspiration.

---

## 2. Brand foundation

| Item                | Rule                                                                                                                                                  |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| Wordmark            | `GROOVESTREET` in the display serif at weight 500, with `design` as a lowercase italic accent suffix.                                                 |
| Written name        | `GROOVESTREET DESIGN` (all caps) in headlines; `Groovestreet Design` in legal/prose. Never `GrooveStreet`, `groovestreet`, or `GSD` on first mention. |
| Minimum clear space | Clear space = height of the `G` on all sides.                                                                                                         |
| Forbidden           | Arbitrary recolor, drop shadows, outlines, rotation, gradient fills, re-typesetting in Inter.                                                         |
| Tagline             | `Digitizing Your Business` — header tooltip, footer and OG metadata only.                                                                             |
| Promise             | **Premium design and build at rates that fit a growing business.** Fixed quotes written in UGX and launch dates in writing.                           |

**Voice.** Plain, second-person, outcome-led. Sentences ≤ 20 words in hero and CTA blocks.
Use "you" more than "we". Banned words: solutions, synergy, leverage, elevate, unleash,
game-changer, world-class, cutting-edge.

---

## 3. Color

### 3.1 Tokens

| Token                       | Hex                   | Role                                                             |
| --------------------------- | --------------------- | ---------------------------------------------------------------- |
| `--color-ink`               | `#0E1113`             | Body text on light, dark-section background, primary button fill |
| `--color-ink-2`             | `#171B1D`             | Elevated surface on dark sections                                |
| `--color-muted`             | `#4A5257`             | Secondary text, captions, meta                                   |
| `--color-muted-invert`      | `#C9CDD0`             | Body text on dark sections                                       |
| `--color-paper`             | `#F6F4EF`             | Default page background (warm off-white)                         |
| `--color-surface`           | `#FFFFFF`             | Cards, inputs, form panels                                       |
| `--color-line`              | `#E3DED3`             | Hairlines, card borders, dividers                                |
| `--color-line-invert`       | `#2A2F32`             | Hairlines on dark sections                                       |
| `--color-brand`             | `#1B4D3E`             | Brand fill: links, active states, badges, dark CTA variant       |
| `--color-brand-dark`        | `#143A2E`             | Hover/active for brand fill                                      |
| `--color-brand-tint`        | `#E7F0EB`             | Brand tinted background (badges, selected chips)                 |
| `--color-accent`            | `#FF5A1F`             | Accent fill, underlines, markers — **graphic use only**          |
| `--color-accent-text`       | `#B33A00`             | The only accent allowed as text on light backgrounds             |
| `--color-accent-tint`       | `#FFEDE4`             | Accent tinted background                                         |
| `--color-success` / `-tint` | `#157F4B` / `#E4F3EB` | Form success                                                     |
| `--color-danger` / `-tint`  | `#B3261E` / `#FBE9E7` | Form errors, invalid fields                                      |
| `--color-warning` / `-tint` | `#8A5B00` / `#FFF4DE` | Reserved for future notices                                      |

### 3.2 Hard rules

- Maximum **three** colors per section: background + text + one accent.
- Ratio guide: ~70% paper, ~25% ink, ≤5% accent. Accent never fills a whole section.
- **Never** white text on `--color-accent` (2.9:1, fails AA). Accent fills always take `--color-ink` text (6.6:1).
- Dark sections: `ink` background + `paper` headings + `muted-invert` body + `accent` graphics.
- Links in prose: `brand` + underline + `underline-offset-2`; hover → `brand-dark`. Never color alone.
- `*-tint` tokens are backgrounds for badges/chips only, never behind long paragraphs.

### 3.3 Minimum contrast (enforced)

| Pair                           | Ratio          | Verdict          |
| ------------------------------ | -------------- | ---------------- |
| `ink` on `paper`               | ~17:1          | ✔ AAA            |
| `muted` on `paper` / `surface` | ~7.2:1 / 7.7:1 | ✔ AA body        |
| `paper` on `brand`             | ~8.6:1         | ✔ AAA            |
| `accent-text` on `paper`       | ~4.8:1         | ✔ AA             |
| `ink` on `accent`              | ~6.6:1         | ✔ AA             |
| `paper` on `accent`            | ~2.9:1         | ✘ **Prohibited** |

---

## 4. Typography

**Two families, permanently.** `Sentient` (display serif: headings, wordmark, numerals —
and the italic `italic-accent` run inside a heading) and `Inter` (body, UI, forms, eyebrows),
self-hosted through `next/font/local` from `src/app/fonts` — no CDN font requests, no third
family without a written amendment. Mono micro-labels use the system mono stack.

### 4.1 Scale (fluid `clamp()` — no breakpoint jumps)

| Token          | Size                                      | Line-height | Weight | Tracking             | Use                           |
| -------------- | ----------------------------------------- | ----------- | ------ | -------------------- | ----------------------------- |
| `text-display` | `clamp(2.75rem, 1.6rem + 5.4vw, 4rem)`    | 1.125       | 500    | `-0.03em`            | Max one per page (home hero)  |
| `text-h1`      | `clamp(2.25rem, 1.4rem + 3.8vw, 3rem)`    | 1.167       | 500    | `-0.04em`            | Page hero                     |
| `text-h2`      | `clamp(1.75rem, 1.15rem + 2.4vw, 2.8rem)` | 1.167       | 500    | `-0.04em`            | Section title                 |
| `text-h3`      | `1.625rem`                                | 1.2         | 500    | `-0.04em`            | Card / case-study title       |
| `text-h4`      | `1.3125rem`                               | 1.3         | 500    | `-0.02em`            | Sub-section                   |
| `text-lg`      | `1.125rem`                                | 1.5         | 400    | 0                    | Lede paragraph                |
| `text-base`    | `1rem`                                    | 1.5         | 400    | 0                    | Default body                  |
| `text-sm`      | `0.875rem`                                | 1.5         | 400    | 0                    | Meta, card copy               |
| `text-label`   | `0.8125rem`                               | 1.2         | 700    | `+0.04em`, UPPERCASE | Eyebrows, table heads, badges |

### 4.2 Rules

- Heading order is semantic, never skipped (`h1 → h2 → h3`); visual size never overrides it.
- Exactly **one `h1`** per page.
- Paragraph measure `max-w-[62ch]`; body copy never spans wider.
- Display/h1 lines ≤ 8 words where possible (`text-balance`); body copy `text-pretty`.
- Eyebrow labels are the only uppercase body-size text; never uppercase beyond 6 words.
- Stats and prices use display face + `tabular-nums`.
- No justified text, no text baked into images, nothing below 11px.

---

## 5. Space, grid, layout

- **Base unit 4px.** Tailwind scale, permitted steps only (`4,8,12,16,20,24,32,40,48,64,80,96,128,144`).
- **Container:** max-width `1240px`, padding-inline `24px` → `32px` at ≥640px (`<Container />`).
- **Strict palette:** components paint only with the `@theme` tokens above. Raw hex or `rgb()/hsl()/oklch()` in `src/**` is a lint **error** (`no-restricted-syntax` in `eslint.config.mjs`), whether written as a literal, inside a Tailwind arbitrary value (`text-[#ff5a1f]`) or as a colour string. `globals.css` and `public/**` are exempt (palette definition and assets); the one sanctioned exception is an inline `eslint-disable-next-line` carrying a reason, e.g. `viewport.themeColor`, which Next requires as a literal.
- **Section rhythm:** `64px` mobile → `80px` ≥768px → `96px` ≥1024px (`<Section />`). Light bands alternate `paper` ↔ `surface` with `ink` as the dark punctuation; never stack two sections with the same background without a hairline or tone shift. On a `surface` band, `.card` takes the `paper` fill (`--card-fill`) so white cards never disappear into the background.
- **Grid:** 12 columns ≥1024px, gutter 24px (32px for portfolio grids). Mobile: single column, gutter 20px, no negative margins.
- Standard splits: `7/5` copy-led, `5/7` media-led, `4/4/4` three cards, `3/3/3/3` logo wall & stats.
- Sticky mobile action bar is `fixed bottom-0`; page content reserves `padding-bottom: 76px` below 768px so nothing hides behind it.
- Card padding `24px` mobile / `32px` desktop. Hairline border, **no drop shadow** on light sections.

---

## 6. Radius, borders, elevation, texture

| Token          | Value                         | Use                                   |
| -------------- | ----------------------------- | ------------------------------------- |
| `rounded-sm`   | `6px`                         | Inline tags, small chips              |
| `rounded-md`   | `10px`                        | Inputs, secondary buttons, list items |
| `rounded-lg`   | `16px`                        | Cards, media, modals                  |
| `rounded-pill` | `999px`                       | Primary CTAs, filter chips, badges    |
| `--edge`       | `1px solid var(--color-line)` | Every card, input and divider         |

- Elevation is used **once** in the product: the sticky header after scroll
  (`0 1px 0 line, 0 8px 24px rgba(14,17,19,0.06)`). Everything else stays flat.
- Texture: at most one subtle dot-grid or hairline-ruled block per page, drawn in CSS
  (`background-image` with `currentColor` at ≤8% opacity). No image textures.
- No glassmorphism, no blur stacks, no border gradients.

---

## 7. Components (strict specs)

### 7.1 Buttons

Height `48px` (touch target ≥44px), padding `14px 24px`, `0.875rem`/700 UPPERCASE with
tracking `+0.09em`, gap `11px`, `rounded-pill`, `2px` border. Hover is a soft **ring**
(`--shadow-ring-*`), never a colour shift on a filled style; `:active` presses `1px`.

| Variant   | Background  | Text    | Border | Hover               |
| --------- | ----------- | ------- | ------ | ------------------- |
| `primary` | `ink`       | `paper` | none   | `shadow-ring-ink`   |
| `dark`    | `ink`       | `paper` | none   | `shadow-ring-ink`   |
| `accent`  | `accent`    | `ink`   | none   | `accent-text`       |
| `outline` | transparent | `ink`   | `ink`  | `shadow-ring-soft`  |
| `ghost`   | transparent | `brand` | none   | underline           |
| `invert`  | `paper`     | `ink`   | none   | `shadow-ring-light` |

- Transitions `150ms`, background/color/transform only. Disabled: `opacity 40%` +
  `cursor-not-allowed`, never hidden.
- Every page has one `primary` CTA above the fold and one before the footer.
- **Never** more than one `primary`/`accent` button inside a single section.

### 7.2 Cards

`surface` background, `--edge`, `rounded-lg`, padding `24/32px`, internal gap `16px`.
Hover: `border-color: ink` + arrow shifts `4px`. No lift, no shadow, no scale.

### 7.3 Forms

Label above field (`text-label`, `6px` gap); input `48px`, `rounded-md`, `--edge`,
`surface`; placeholder `muted` at 60%. Focus: `2px` ring `brand`, offset `2px` — never removed.
Errors: `danger` text + `danger-tint` background + `aria-describedby`.
Required fields use `*` **and** `required`, never placeholder-as-label.
One column on mobile, two-column pairs ≥768px, submit full-width below 480px.

### 7.4 Header / footer

Header `h-[72px]`, `paper/85` + `backdrop-blur` after scroll, hairline bottom, logo left,
nav center (`text-sm`), primary CTA right. Mobile: logo + 44px hamburger, full-height drawer,
`text-h4` links, CTA pinned to drawer bottom, `Esc` to close + focus management + scroll lock.
Footer: `ink` background, 4 columns → 1, hairline `line-invert`, wordmark + tagline,
all three contact channels repeated, legal row with current year.

---

## 8. Motion

| Token        | Value                                    | Use                                  |
| ------------ | ---------------------------------------- | ------------------------------------ |
| `--dur-fast` | `150ms`                                  | Hover, focus, color                  |
| `--dur-base` | `250ms`                                  | Drawer, accordion, chips             |
| `--dur-slow` | `450ms`                                  | Scroll reveals                       |
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)`          | All entrances                        |
| Reveal       | `translateY(16px) → 0` + `opacity 0 → 1` | Sections/cards entering the viewport |

- Reveals run **once** (`viewport once`), trigger at 20% visibility, stagger `60ms`,
  capped at 6 items. Nothing animates twice on re-entry.
- Only `transform` and `opacity` may animate. Never `width`, `height`, `top/left`, `filter`.
- Marquee (logo wall) runs at 40s/loop, **pauses on hover and focus**, hidden static grid on mobile.
- `MotionConfig reducedMotion="user"` is global; with reduced motion everything renders in its
  final state instantly — no fade-only exceptions, no autoplay video, no parallax.
- No scroll-jacking, no pinned section longer than one screen, no cursor toys, no autoplay sound.

## 9. Imagery & portfolio

- Every project image: 4:3 at 1600×1200, AVIF/WebP via `next/image`, `sizes` set, LQIP placeholder,
  `alt` describing what the design _shows_ (never "screenshot").
- Portfolio grid: 2-up ≥768px, 1-up mobile, `3/6` split for the featured case study.
- Case-study page order: title → one-line outcome → hero image → context → problem →
  approach (3 steps) → outcome metrics → next case study. Metrics must be real and verifiable.
- No stock photography of people shaking hands, no laptop-on-desk shots, no gradient blobs.
- Icons: single stroke set, `1.5px`, `currentColor`, `24px` (labels `16px`). One set only.

## 10. Page patterns

**Home (order is fixed):** header → hero (eyebrow, display H1, lede, primary + secondary CTA,
contact trio) → logo wall → pain-points mirror ("Sound familiar?") → 3-step process →
outcome proof (stats + featured case study) → services grid → industries strip →
testimonial wall → guarantee row → pricing teaser → FAQ teaser → final CTA band → footer.
**Sub-pages** reuse hero → proof → detail → FAQ → CTA band. Never a page that ends without a CTA.
**Contact** always surfaces **call · email · WhatsApp** as three equal first-class actions, plus
the form. **Every** page: `text-label` eyebrow above each `text-h2`.

## 11. Accessibility — WCAG 2.2 AA, non-negotiable

- Contrast per §3.3; focus visible everywhere (§7.3); hit targets ≥44×44px.
- One `h1`, no skipped heading levels, landmarks (`header/nav/main/footer`), skip-link as first tab stop.
- Drawer & accordion: `aria-expanded`, `aria-controls`, `Esc` to close, focus returned to trigger.
- Forms: real `<label for>`, inline errors, `aria-live="polite"` status region, never alert().
- Keyboard-only and 200%-zoom walkthrough required before any page ships.
- Language set, link text describes its destination (no "click here"), `rel="noopener"` on targets.

## 12. Content rules (marketing logic from Knapsack Creative)

1. **Pain before promise.** Name the visitor's failure mode ("You built it yourself and it shows") before presenting the service.
2. **Outcome, not output.** "Get seen by potential clients", never "responsive layouts".
3. **Segment the visitor.** Every service names who it is for.
4. **Reduce the unknown.** Process, timeline, price bands and turnaround stated in plain numbers.
5. **One objection killed per section.** No filler sections; if a section does not answer a real doubt, delete it.
6. **Guarantees beat adjectives.** Fixed price, turnaround and revision counts stated explicitly.

## 13. Performance budget (build fails if broken)

| Metric              | Target                                         |
| ------------------- | ---------------------------------------------- |
| LCP (mobile, 4G)    | ≤ 2.0s                                         |
| CLS                 | ≤ 0.05                                         |
| INP                 | ≤ 200ms                                        |
| JS on first visit   | ≤ 140KB gzipped                                |
| Images              | AVIF/WebP, `sizes` set, no unscaled delivery   |
| Fonts               | 2 families, `display: swap`, subset latin      |
| Lighthouse (mobile) | ≥ 95 Performance / 100 A11y / 100 SEO / 100 BP |

Rules: server components by default, `"use client"` only where interaction requires it,
`LazyMotion` + `m` from `motion` instead of full `motion` imports, no third-party script
without a written performance note, no carousel that blocks reading.

## 14. Token → file map

| Concern                             | File                                                               |
| ----------------------------------- | ------------------------------------------------------------------ |
| Colors, type, radius, motion tokens | `src/app/globals.css` (`@theme`)                                   |
| Fonts                               | `src/app/layout.tsx` (`next/font/local`), files in `src/app/fonts` |
| Template graphics                   | `public/images/duck/*`, `public/icons/*`                           |
| Buttons, cards, section chrome      | `src/components/ui/*`                                              |
| Header, footer, mobile action bar   | `src/components/layout/*`                                          |
| Brand, contact, nav, copy constants | `src/lib/site.ts`                                                  |
| Services, work, proof, pricing data | `src/content/*.ts`                                                 |
| SEO metadata, sitemap, JSON-LD      | `src/lib/seo.ts`, `src/app/sitemap.ts`, `robots.ts`                |

## 15. Never list (instant rejection in review)

- Inventing testimonials, client names, logos, awards or metrics. Every entry in `src/content/*` must describe work we actually delivered.
- White-on-accent text, a third typeface, drop shadows on light cards, more than one primary CTA per section.
- Recolouring a `duck.design` graphic, or shipping a service tile backed by stock imagery — the tile carries a
  template illustration (`public/icons`) on a brand-tint chip, never a photo.
- `!important`, inline hex codes, arbitrary `text-[11px]`, Tailwind color utilities straight from the default palette (`bg-blue-500`).
- Copy in the banned-words list (§2), or a sentence over 30 words in a hero/CTA.
- Any page without a visible way to call, email or WhatsApp within one scroll.
