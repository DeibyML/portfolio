# Deiby Montoya — Portfolio

Personal portfolio built with **Angular 21** (standalone components, signals, zoneless change detection). Dark editorial design: Fraunces + Archivo + JetBrains Mono, warm ink palette with copper accents.

## Stack & decisions

- **Angular 21, zero extra runtime dependencies.** i18n, scroll reveals and the ticker are hand-rolled with signals, `IntersectionObserver` and CSS — no translation or animation library needed at this size.
- **Runtime i18n (EN / FR / ES).** English keys define the `TranslationKey` type, so a missing translation in any language is a compile error. The language preference persists in `localStorage`.
- **No router.** Single page, in-page anchors; keeps the bundle at ~48 kB transferred.

## Getting started

```bash
npm install
npm start          # dev server on http://localhost:4200
npm test           # vitest unit tests
npm run build      # production build into dist/portfolio
```

## Project structure

```
src/app/
├── core/i18n/        # translations.ts (EN/FR/ES dictionaries) + I18nService
├── data/profile.ts   # ALL content: experience, projects, skills, education
├── layout/           # header (nav + language switcher), footer
├── sections/         # hero, about, experience, projects, skills, contact
└── shared/           # reveal directive, language switcher
```

## Theming

The whole palette derives from three RGB triplets at the top of `src/styles.scss`:

```scss
--ink-rgb: 14, 12, 9; /* page background */
--cream-rgb: 237, 230, 218; /* text */
--copper-rgb: 217, 138, 87; /* accent */
```

Every background, border, glow and hover state is computed from these via `rgb()` / `rgba()` / `color-mix()`, so changing the three triplets re-themes the entire site. Flag-chip colors live next to them as `--flag-*` tokens.

## Editing content

- **Facts** (companies, dates, links, tech tags): edit `src/app/data/profile.ts`.
- **Copy** (any visible sentence): edit `src/app/core/i18n/translations.ts` in all three languages — the compiler flags anything you miss.
- **Adding a language:** add its code to `LANGS`, provide a dictionary typed `Record<TranslationKey, string>`, done.

## Deploy

Static output — any host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages). Publish directory: `dist/portfolio/browser`.

For GitHub Pages under a subpath, build with `ng build --base-href /<repo-name>/`.

## Publishing on a custom domain (cheap)

The site is fully static, so hosting is free; the only cost is the domain (~US$10-12/year). Recommended setup: **Cloudflare Pages** (free unlimited bandwidth, global CDN, automatic HTTPS).

1. **Push the repo to GitHub:**

   ```bash
   git remote add origin https://github.com/DeibyML/portfolio.git
   git push -u origin main
   ```

2. **Buy the domain** at Cloudflare Registrar (at-cost pricing, no renewal markup) or Porkbun / Namecheap.

3. **Create the Pages project:** Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git → pick this repo, then:
   - Build command: `npm run build`
   - Output directory: `dist/portfolio/browser`

4. **Attach the domain:** in the Pages project → Custom domains → add `yourdomain.com`. If the domain lives on Cloudflare, DNS and the HTTPS certificate configure themselves in minutes.

5. From then on, **every `git push` deploys automatically**. No servers, no maintenance.

Want to try before buying a domain? Step 3 already gives you a free `*.pages.dev` URL.

There is no router in this app, so no SPA redirect config is needed. If you ever add routes, create a `_redirects` file containing `/* /index.html 200`.
