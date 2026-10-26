---
name: web-sample-addition
description: Add new website sample to the samples system
---

# Web Sample Addition

Add a new preview sample to the GrooveStreet website samples system.

## When to use

Adding a new landing page / clinic / hotel / restaurant preview to the website's `/samples` section.

## Procedure

Follow these steps IN ORDER. Every step must complete before the next begins.

1. **Create the preview HTML** at `public/samples/<key>-real.html`.
   - Must be a full HTML document (DOCTYPE, html lang, head with meta and title).
   - Target size: 15–25 KB. Self-contained (embedded CSS in `<style>`).
   - Use relative public paths for images: `/samples-shots/<filename>`.
   - Use Google Fonts imports per the design system.
   - Responsive, semantic HTML5.

2. **Create the thumbnail** at `public/samples-shots/<filename>.png`.
   - Minimum ~2 MB with noise for compression size.
   - Must match the preview content.

3. **Register in `src/lib/samples.ts`**.
   - Add to `samplePreviews` array with: `key`, `messageKey`, `file` (public path), `image` (public path).
   - `key` is the internal identifier. `messageKey` matches the language file key.

4. **Add message keys** to all three language files:
   - `messages/en.json`, `messages/de.json`, `messages/fr.json`.
   - Under `samples.items.<messageKey>` with: `title`, `subtitle`, `description`, `image`.
   - Use English strings as reference for content; translate for German and French.
   - Validate JSON with `json.load` after writing.

5. **Verify**.
   - Run `npx tsc --noEmit` for type safety.
   - Run `npm run lint` for code style.
   - Start dev server (`npm run dev`) and curl sample paths to confirm HTTP 200.
   - Check all public paths resolve (no 404s).

6. **Audit — verify the HTML is correct, not just valid**.
   - Check every image reference resolves to an existing file in `public/samples-shots/`.
   - Check that NO image is repeated across different sections (hero, about, doctors each need a distinct image).
   - Check that Font Awesome CSS (or other icon library CSS) is loaded if the HTML uses `<i class="fas ...">` icons — without it, icons render invisible.
   - Check for typo-prone strings: "Premiun" → "Premium", "Recepi" → "Recipe", "Occurence" → "Occurrence", "Accomodation" → "Accommodation", "Seperate" → "Separate".
   - Check phone numbers are consistent: do not show a masked number (e.g., `+256****3456`) in footer while showing a full number in the contact form.
   - Check for unclosed/misnested tags and stray indentation inside section tags (hero, about, services, doctors, contact, footer).
   - Check the language JSON files are valid after writing (load with `json.load`).
   - Check all required content is present: branding (GrooveStreet), location (Mbale, Uganda), medical services (cardiology, pediatrics, maternity, laboratory, pharmacy), doctor names, contact info.

## User preferences

- Brand colors: primary `#1B4D3E`, secondary `#2A7A5C`, dark `#0a0a0c`.
- Sampling system relies on three parts: (1) standalone HTML in `public\samples\`, (2) registration in `src\lib\samples.ts` with `key`, `messageKey`, `file`, `image`, (3) message keys in `messages\*{en,de,fr}.json`.
- Concise, direct responses. No redundant explanations.
- Technical competence is expected — no hand-holding on standard web development.

## Common pitfalls

- **Missing prerequisite image**: If the thumbnail file doesn't exist in `public/samples-shots/`, the sample grid image breaks. Always confirm presence before registering.
- **JSON not valid**: Never write language file JSON without validating with `json.load`.
- **HTML file size out of range**: Must be 15–25 KB. Overly large files suggest bloat; too small suggests missing content.
- **Wrong messageKey mismatch**: The `messageKey` in `samples.ts` must exactly match the key under `samples.items` in all three JSON files.
- **Public path wrong**: Images must use `/samples-shots/...` not relative paths like `../samples-shots/...`.
- **Template page links (404)**: When adapting a template HTML, replace all `.html` page references (e.g., `index.html`, `about.html`) with valid section anchors (`#home`, `#about`, `#doctors`, `#services`, `#contact`) to prevent 404 redirects.
- **Font Awesome icons invisible**: If the HTML uses `<i class="fas fa-*` icons but no Font Awesome CSS is loaded, icons render as invisible glyphs. Always add the Font Awesome CDN link in `<head>` when using icon elements.
- **Shared image across sections**: Reusing the same image (e.g., `clinic.png`) for hero, about, and doctor cards makes the sample look broken. Use distinct images for each section.
- **Phone number inconsistency**: A masked number (e.g., `+256****3456`) in the footer but full number in the contact form is a security and consistency bug. Use the same number in all places.
- **Typo-prone strings**: "Premiun" → "Premium", "Recepi" → "Recipe", "Occurence" → "Occurrence", "Accomodation" → "Accommodation", "Seperate" → "Separate". Check for these before finalizing.
- **Structural indentation drift**: When editing HTML with multiple patches, indentation can drift and lie outside its correct section tag. After every patch round, read the full file and verify section boundaries (hero, about, services, doctors, contact, footer) and tag nesting.
