# Dhermi Boat

Static website for Dhermi Boat, built with Next.js, TypeScript and Tailwind, exported as static files for GitHub Pages.

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

## GitHub Pages URL

The site currently deploys to the default GitHub Pages project URL:

https://regina.photo/dhermi-boats/

The workflow sets:

```txt
NEXT_PUBLIC_BASE_PATH=/dhermi-boats
NEXT_PUBLIC_SITE_ORIGIN=https://regina.photo
```

There is no `public/CNAME` while the custom domain is not connected.

## Custom Domain Later

When `dhermi.boats` is ready, restore a `public/CNAME` file containing:

```txt
dhermi.boats
```

Then set `NEXT_PUBLIC_BASE_PATH` to an empty value and `NEXT_PUBLIC_SITE_ORIGIN` to `https://dhermi.boats` in `.github/workflows/deploy.yml`.

DNS details for moving `dhermi.boats` from the old WordPress host to GitHub Pages are in `DEPLOYMENT.md`.

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
- `tiktokHandle`
- `tiktokUrl`
- `googleMapsUrl`

Images are in `public/images/`. The sea clip is in `public/videos/`.

3D interface icons are stored in `public/icons/fluent-emoji-3d/`. They come from Microsoft Fluent Emoji (`https://github.com/microsoft/fluentui-emoji`, MIT license) and are used for friendly visual cues in badges, tour facts and contact cards.

Language labels and interface translations live in `lib/i18n.ts`. The current site supports a persistent EN / FR / AL selector in the header; changing language also updates the `dlang` URL parameter.

Social media thumbnails from the public TikTok profile live in `public/images/social/`, with metadata in `data/tiktok-media.json`. Instagram is linked through the official profile URL. Google review excerpts and the Google Maps profile link are stored in `data/content.ts` and `lib/site.ts`.

## Static SEO Files

- `public/robots.txt`
- `public/llms.txt`
- `public/sitemap.xml`
- page metadata in `app/**/page.tsx`
- JSON-LD schema in `app/page.tsx` and `app/faq/page.tsx`
