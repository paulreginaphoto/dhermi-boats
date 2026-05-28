# Dhermi Site Simplification Report

Date: 2026-05-28

## What changed

- Removed the repeated first-name framing from visible source content. The site now speaks as `Dhermi Boat` / local skipper instead of repeating a person name.
- Kept the homepage focused on the 5-tour vertical-trigger horizontal rail, including the sunset tour positioned as the romantic/lovers option.
- Simplified the main navigation to `Tours`, `Photos`, `FAQ`, `Contact`.
- Removed duplicate tour-card and decision sections from `/tours/`. The page now keeps the hero, trust block, comparison cards and one price table.
- Moved the prices title outside the horizontal table scroll so it reads cleanly on mobile.
- Simplified `/destinations/` by removing repeated chooser/gallery sections and keeping the route overview.
- Simplified `/faq/` to one compact accordion with the highest-intent questions.
- Shortened repeated EN / FR / AL copy across hero, tours, contact, booking, trust and FAQ strings.
- Converted duplicate SEO-style URLs to `LegacyRedirectPage` with `noindex`, canonical targets, sitemap exclusions and `_redirects`.
- Restored the compact mobile sticky actions: WhatsApp / Tours / Prices / Call.

## Files touched

- `app/tours/page.tsx`
- `app/destinations/page.tsx`
- `app/faq/page.tsx`
- legacy redirect pages under `app/*/page.tsx`
- `components/StickyBookingBar.tsx`
- `components/navigationConfig.ts`
- `components/HotIntentLandingPage.tsx` deleted
- `components/WhyBookLocal.tsx` deleted
- `data/content.ts`
- `lib/i18n.ts`
- `public/_redirects`
- `public/llms.txt`
- `public/locales/translations.json`
- `app/sitemap.ts`
- `app/llms.txt/route.ts`
- `scripts/qa-final-release.mjs`
- `scripts/qa-url-canonicals.mjs`

## Checks run

- `npm run lint`
- `npm run typecheck`
- `npm run content:guard`
- `npm run build`
- `npm run qa:minimal-homepage`
- `npm run qa:conversion-ux`
- `npm run qa:five-tour-rail`
- `npm run qa:i18n-links`
- `npm run qa:url-canonicals`
- `npm run qa:final-release`
- `npm run test:date-format`
- Browser check on `http://127.0.0.1:4173/tours/`: 0 console errors.

## Screenshots

- `docs/screenshots/simplification/mobile-home-hero.png`
- `docs/screenshots/simplification/mobile-home-tour-rail.png`
- `docs/screenshots/simplification/mobile-contact-booking.png`
- `docs/screenshots/simplification/mobile-tours-prices-sticky.png`
- `docs/screenshots/simplification/desktop-home-hero.png`
- `docs/screenshots/simplification/desktop-tours-compare.png`
- `docs/screenshots/simplification/desktop-faq.png`

## Remaining TODOs

- Keep review text only from verified public sources or owner-provided review exports. No fake review claims were added.
- Legacy WooCommerce / WordPress artifact URLs remain as noindex redirect pages so old links do not break.
