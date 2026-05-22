# Dhermi Boat

Premium static website for Dhermi Boat, built with Next.js, TypeScript and Tailwind, exported as static files for GitHub Pages.

## Local Development

```bash
npm install
npm run dev
```

Open the local URL shown by Next.js.

## Checks

```bash
npm run typecheck
npm run lint
npm run build
npm audit --omit=dev
```

`npm run build` creates the static export in `out/`.

## Deployment

Deployment is handled by `.github/workflows/deploy.yml` on every push to `main`.

1. In GitHub, enable Pages with source `GitHub Actions`.
2. Push to `main`.
3. The workflow installs dependencies, builds the static export, uploads `out/`, and deploys it with GitHub Pages.

## Custom Domain

The custom domain is stored in `public/CNAME`:

```txt
dhermi.boats
```

If the site is deployed without a custom domain, remove or edit `public/CNAME`.

For a project subpath such as `https://owner.github.io/repo/`, set the repository variable `NEXT_PUBLIC_BASE_PATH` to `/repo` before deployment. Leave it blank for `https://dhermi.boats/`.

## Editing Content

Most business content lives in `data/content.ts`:

- tours, prices, durations and highlights
- destination cards
- reviews
- FAQ
- navigation labels

Contact and booking constants live in `lib/site.ts`:

- `whatsappNumber`
- `phoneDisplay`
- `emailAddress`
- `instagramHandle`
- `instagramUrl`

Images are in `public/images/`. The sea clip is in `public/videos/`.

## Static SEO Files

- `public/robots.txt`
- `public/sitemap.xml`
- page metadata in `app/**/page.tsx`
- JSON-LD schema in `app/page.tsx` and `app/faq/page.tsx`

