# Sathyapal Reddy — Portfolio

Personal portfolio site. Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, and **Framer Motion**. Deployed as a static export to GitHub Pages.

## Stack

- Next.js 14 (`output: 'export'` for static HTML)
- TypeScript (strict)
- Tailwind CSS + CSS variables (light + dark themes)
- Framer Motion for entrance / scroll / hover animations
- `next/font` for self-hosted Space Grotesk, Inter, JetBrains Mono

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to ./out
npx serve out        # preview the production build
npm run lint
npm run type-check
```

## Project layout

```
app/                Next.js App Router (layout, page, globals.css)
components/         All UI components (Hero, About, Skills, Projects, ...)
data/portfolio.ts   Single source of truth for personal info, skills, projects
types/index.ts      Shared TypeScript interfaces
public/             Static assets (profile photo, logo, favicon)
.github/workflows/  GitHub Actions deploy pipeline
```

To edit content, change `data/portfolio.ts` — everything else flows from there.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which runs `npm ci && npm run build` and publishes `./out` to GitHub Pages.
