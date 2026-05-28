# Dhermi Site 5 Star Report

Date: 2026-05-28
Scope: premium minimalist conversion pass for dhermi.boats.

## Summary

The site was rebuilt around fast WhatsApp conversion for Dhërmi boat tours to Gjipe, Grama Bay and Blue Cave. The homepage now states the offer immediately, shows clear trust badges, keeps WhatsApp as the primary action, and routes visitors into tour comparison, prices, call or booking details without fake claims.

No prices, phone number, real routes or real review claims were invented. Sea/weather dependency is kept explicit.

## Main Changes

- Hero copy, badges, CTAs and desktop trust card were redesigned for quick clarity.
- Mobile sticky bar keeps WhatsApp, Tours, Prices and Call visible with cleaner spacing.
- Tour cards now show duration, price, capacity, best fit, main stops and tour-specific WhatsApp CTAs.
- Booking reassurance copy now focuses on WhatsApp first, meeting point, sea conditions and no payment before availability.
- EN, FR and AL/SQ translation keys were expanded and regenerated.
- WhatsApp links are centralized and include tour/date/guests/language placeholders.
- The contact booking form now works in the static export without the Next runtime: date, name, people and notes update the WhatsApp message.
- SEO title, description, Open Graph and schema copy were tightened around natural Dhërmi/Gjipe/Grama/Blue Cave terms.
- Legacy WordPress/WooCommerce helper routes were added as noindex redirects/shells so QA and static export stay clean.
- Accessibility fixes: valid tour-card facts markup, language switcher accessible names, and mobile Call label cleanup.

## Files Touched

- Core pages: `app/page.tsx`, `app/layout.tsx`, `app/tours/page.tsx`, `app/destinations/page.tsx`, hot-intent pages.
- Components: `HeroCinematic`, `TourCard`, `TourComparison`, `HighSeasonOfferLadder`, `OneMinuteBooking`, `StickyBookingBar`, `LanguageSwitcher`, trust/reassurance/local skipper blocks.
- Content/i18n/SEO: `data/content.ts`, `lib/i18n.ts`, `lib/seo.ts`, `lib/site.ts`, `lib/whatsappMessages.ts`, `public/locales/translations.json`.
- QA/guards: `scripts/content-guard.mjs`.
- New docs/assets: `DHERMI_SITE_5_STAR_PLAN.md`, `DHERMI_SITE_5_STAR_REPORT.md`, `docs/screenshots/dhermi-5-star/`.
- New legacy pages: `/tours/private/`, `/tours/group/`, `/20250721_103929/`, `/2026/02/28/hello-world/`, `/sample-page/`, `/boutique/`, `/panier/`, `/mon-compte/`, `/commander/`.

## Checks Run

All passed unless noted:

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run content:guard` | PASS |
| `npm run test:date-format` | PASS |
| `npm run build` | PASS, 33 static pages, Google Ads injected |
| `npm run qa:conversion-ux` | PASS |
| `npm run qa:i18n-links` | PASS, 31 HTML files, 519 used i18n keys, 604 translation keys |
| `npm run qa:url-canonicals` | PASS, 5 canonical tours, 8 legacy redirects, 1 legacy media file |
| `npm run qa:final-release` | PASS, 12 public URLs checked |
| Playwright visual/flow QA | PASS, no console errors, no horizontal overflow, layout shift 0 |
| Lighthouse local homepage | Performance 93, Accessibility 100, Best Practices 77, SEO 100 |

Lighthouse still reports Best Practices issues caused by Google Ads/DoubleClick third-party cookie and DevTools issues on localhost. The report JSON was written to `.tmp-dhermi-qa/lighthouse-home.json`; Lighthouse also hit a Windows temp cleanup `EPERM` after writing the report.

## Screenshots

- Mobile hero: `docs/screenshots/dhermi-5-star/mobile-hero.png`
- Mobile tour card: `docs/screenshots/dhermi-5-star/mobile-tour-card.png`
- Mobile booking flow: `docs/screenshots/dhermi-5-star/mobile-booking-flow.png`
- Desktop hero: `docs/screenshots/dhermi-5-star/desktop-hero.png`
- Desktop tour comparison: `docs/screenshots/dhermi-5-star/desktop-tour-comparison.png`

## Remaining TODOs

- Verify live production after push/deploy: Google Ads Tag Assistant, Search Console sitemap, Rich Results Test.
- Add richer real review embeds or updated review excerpts only if the business owner provides verified sources.
- Best Practices score can improve only by revisiting third-party Google Ads behavior or consent/loading strategy.

## Ship Decision

Ship. The static export is deployable, WhatsApp is easy to find, tours/prices are readable, EN/FR/AL works, and the visual pass now feels local, serious and premium.
