# Shaban Malik — Portfolio

![Shaban Malik portfolio banner](public/assets/images/portfolio-banner.webp)

Personal portfolio built as a static single-page site with React, TypeScript, Vite, Tailwind CSS v4, and Framer Motion.

## Stack

- React 19 + TypeScript
- Vite 7
- Tailwind CSS v4
- Framer Motion
- lucide-react icons

## Getting started

```bash
npm install
cp .env.example .env   # Windows: Copy-Item .env.example .env
npm run dev
```

## Contact form

The form posts to [Formspree](https://formspree.io) when `VITE_FORMSPREE_ENDPOINT` is set:

1. Create a free form at <https://formspree.io>.
2. Copy its endpoint (for example `https://formspree.io/f/abcdwxyz`).
3. Set it in `.env` locally and in your host's environment variables:
   `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/abcdwxyz`

Without that variable the form falls back to a prefilled `mailto:` link, so it never breaks.

## Editing content

- `src/data/fallback.ts` — skills, projects, experience, and education
- `src/data/links.ts` — email, GitHub, LinkedIn, and location
- `public/profile.jpg` — hero/about photo
- `public/og-image.png` — social sharing image (1200×630)
- `index.html` — title, description, and social meta
- `src/index.css` — theme tokens, fonts, and shared visual effects

After deploying to a custom domain, make `og:url` and `og:image` absolute in `index.html`.

## Scripts

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Start the dev server     |
| `npm run build`   | Type-check and build     |
| `npm run preview` | Preview the build        |
| `npm run lint`    | Run ESLint               |

## Deployment

The site is a static SPA and can be hosted anywhere.

### Vercel

1. Import this repository.
2. Framework preset: **Vite**; build command `npm run build`; output directory `dist`.
3. Add `VITE_FORMSPREE_ENDPOINT` under Project → Settings → Environment Variables.
4. Deploy. `vercel.json` handles SPA rewrites.

### Netlify / Cloudflare Pages

- Build command: `npm run build`
- Publish directory: `dist`
- Add the `VITE_FORMSPREE_ENDPOINT` environment variable.
- Add an SPA fallback (`/* → /index.html 200` on Netlify; Pages handles this by default).

## Project structure

```text
src/
  components/   page sections and UI
  data/         site content and links
  lib/          motion variants
  pages/        Home
archive/        dormant Express/Supabase/admin/EC2 code (not built or deployed)
```

`archive/` is kept for reference only. It is excluded from linting, type-checking, the client build, and deployment.

## CI

`.github/workflows/ci.yml` runs `npm ci`, `npm run lint`, and `npm run build` on every push and pull request.
