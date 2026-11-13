# AGENTS.md — CV site

**Static vanilla HTML/CSS/JS site.** No build step, no package.json, no tests, no linter.

## Key architecture

- **`index.html`** — template with `id=` attributes on every translatable element
- **`js/translations.js`** — single `const i18n = { en, fr, ar, pt }` object
- **`js/script.js`** — IIFE that calls `applyLang(lang)`, which reads `i18n[lang]` and writes DOM via `setText(id, val)`
- **`css/style.css`** — screen styles + `@media print` at the bottom

## Adding a translatable text

1. Add `id="some-id"` on the HTML element
2. Add `someId: "value"` key inside each of the 4 language blocks in `translations.js`
3. Add `setText('some-id', t.someId)` in `script.js` inside `applyLang()`

## PDF button

`#downloadPdf` downloads a pre-generated PDF from `assets/cv/cv-<lang>.pdf` (locale is set in `applyLang()`), so no browser print header/footer can appear. After any content change that affects print output, regenerate all four files with headless Chromium `Page.printToPDF` (`displayHeaderFooter: false`, `preferCSSPageSize: true`).

## Print (PDF) quirks

- Uses **float-based** layout (not CSS grid) — grid can't paginate columns independently
- Sizes in `pt` (not rem) for precise A4 fitting
- Page break forced after 2nd experience entry
- Compact sizing: body 6.5pt, bullets 5.5pt, tags 4.5pt
- All bullet content is visible — no `display: none` hiding

## RTL (Arabic)

- Phone numbers, email, URLs wrapped in `<bdi dir="ltr">` to prevent RTL reversal
- `body.rtl` class added by JS, used in CSS to swap padding/direction

## Cache busting

CSS/JS links have `?v=N` query params. Increment `v` by 1 when modifying those files so browsers reload them.

## CSS conventions

- **Utilities**: `.mt-1` (margin-top: 0.5rem), `.icon-left` (margin-right: 8px), `.icon-left-sm` (margin-right: 6px), `.skill-label` (shared skill heading styles)
- **Footer**: styled via `.cv-footer` class, not inline
- **Profile text**: styled via `#profile-text` in CSS, not inline
- **Animations**: `.fade-in` elements get staggered `--fade-delay` CSS custom property set by JS

## Accessibility

- Contact links have `aria-label` attributes for screen readers
- Theme toggle button dynamically updates `aria-label` ("Switch to light/dark mode")
- Profile photo click opens a lightbox overlay

## GitHub Pages

A deploy workflow exists at `.github/workflows/deploy.yml`. Push to `main` to auto-deploy.
