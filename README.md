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
npm run content:guard
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

## Production URL

The site deploys to the custom GitHub Pages domain:

https://dhermi.boats/

The workflow sets:

```txt
NEXT_PUBLIC_BASE_PATH=
NEXT_PUBLIC_SITE_ORIGIN=https://dhermi.boats
```

Canonical, hreflang, sitemap and `llms.txt` URLs now use the production domain. The static export includes `public/CNAME`:

```txt
dhermi.boats
```

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
- `getYourGuideUrl`

Images are in `public/images/`. The sea clip is in `public/videos/`. The current hero, tour, destination and gallery media were selected from the Google Drive folder `Photo & Videos Bateau`, then cropped and compressed for GitHub Pages.

Interface icons use `lucide-react` outline icons with a shared 1.75px stroke. The old local 3D icon assets were removed so the visual system stays cleaner and more elegant.

Language labels and interface translations live in `lib/i18n.ts`. The current site supports a persistent EN / FR / AL selector in the header; changing language also updates the `dlang` URL parameter.

Social media thumbnails from the public TikTok profile live in `public/images/social/`, with metadata in `data/tiktok-media.json`. Instagram, TikTok, Google Maps and GetYourGuide are linked through the official URLs in `lib/site.ts`. Google review excerpts are stored in `data/content.ts`.

## Booking And Email

GitHub Pages is static, so it cannot run a private backend or send email itself.

The one-minute booking form uses two static-friendly paths:

- Primary: WhatsApp link generated in the browser with tour, date, people, name, phone and notes.
- Backup: `mailto:` email link generated in the browser with the same booking message.

The email backup opens the visitor's email app. A private backend or serverless endpoint can be added later if the owner wants direct form delivery.

## SEO Files

- `app/robots.ts` (generates `/robots.txt`)
- `app/sitemap.ts` (generates `/sitemap.xml`)
- `public/llms.txt`
- page metadata in `app/**/page.tsx`
- JSON-LD schema in `app/page.tsx` and `app/faq/page.tsx`
