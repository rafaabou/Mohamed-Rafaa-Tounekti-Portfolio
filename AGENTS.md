# AGENTS.md — CV site

**Static vanilla HTML/CSS/JS site.** No build step, no package.json, no tests, no linter.

## Key architecture

- **`index.html`** — template with `id=` attributes on every translatable element
- **`js/translations.js`** — single `const i18n = { en: {...}, fr: {...}, ar: {...} }` object
- **`js/script.js`** — IIFE that calls `applyLang(lang)`, which reads `i18n[lang]` and writes DOM via `setText(id, val)`
- **`css/style.css`** — screen styles + `@media print` at the bottom

## Adding a translatable text

1. Add `id="some-id"` on the HTML element
2. Add `someId: "value"` key inside each of the 3 language blocks in `translations.js`
3. Add `setText('some-id', t.someId)` in `script.js` inside `applyLang()`

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

CSS/JS links have `?v=N` query params. Increment `v` when modifying those files so browsers reload them.
