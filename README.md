# Mohamed Rafaa Tounekti · CV / Portfolio

Multi-language responsive CV site for a DevOps & DevSecOps engineer, built with vanilla HTML/CSS/JS.

## Features

- **3 languages**: English, French, Arabic (with RTL support)
- **Dark/Light theme** toggle with localStorage persistence
- **PDF download** — prints a 2-page A4 PDF with all content visible
- Responsive layout (2-column grid, stacks on mobile)
- Scroll-triggered fade-in animations (IntersectionObserver)
- Schema.org structured data for search engines
- Font Awesome icons, profile photo

## Structure

```
index.html              — HTML template
css/style.css           — styles (screen + print)
js/translations.js      — i18n object (EN/FR/AR)
js/script.js            — language switching, theme, PDF, animations
```

## Usage

Open `index.html` directly in a browser (no build step needed).  
Use the language buttons (EN/FR/AR) to switch translations.  
Click the moon/sun icon to toggle theme.  
Click **PDF** to generate a 2-page A4 print.

> **Note**: The PDF uses `@media print` CSS with a float-based layout and compact sizing (5.5–7pt body) to fit all CV content into 2 pages. Print margins are 0.3in and page break is forced after the second experience entry.

## Author

**Mohamed Rafaa Tounekti**  
[LinkedIn](https://linkedin.com/in/mohamed-rafaa-tounekti) · [GitHub](https://github.com/rafaabou) · rafaabou@gmail.com
