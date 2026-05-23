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
- `bookingFormEndpoint`
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
- Backup: free FormSubmit endpoint from `bookingFormEndpoint`, currently `https://formsubmit.co/58d2000ae13924641d4bc3061af4ca1a`.

The first FormSubmit email may require the owner to click an activation link. After activation, form submissions are sent to the email address without exposing the naked email in the form action or adding a backend to the site.

## SEO Files

- `app/robots.ts` (generates `/robots.txt`)
- `app/sitemap.ts` (generates `/sitemap.xml`)
- `public/llms.txt`
- page metadata in `app/**/page.tsx`
- JSON-LD schema in `app/page.tsx` and `app/faq/page.tsx`
