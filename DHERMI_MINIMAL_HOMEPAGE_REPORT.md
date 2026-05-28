# Dhermi Minimal Homepage Report

Date: 2026-05-28
Scope: rebuild the homepage as a minimalist, visual, WhatsApp-first conversion page.

## Summary

The homepage is now a five-section landing page: full-screen visual hero, three tour cards, lazy gallery, compact real reviews and practical contact/form. Copy is shorter, WhatsApp is the primary action, and the reassurance "no payment before availability / departure confirmed on WhatsApp" is kept near conversion points.

No prices, routes, locations or review claims were invented. Existing real prices, routes, contact details and review excerpts were reused.

## Main Changes

- Replaced the dense homepage composition with five clear sections marked by `data-home-section`: hero, tours, gallery, reviews and contact.
- Added a minimal availability form that prepares a WhatsApp message with name, date and number of people in EN/FR/AL.
- Kept gallery images as optimized WebP/Next images with lazy loading and zoom links.
- Reduced the mobile sticky booking bar to one compact WhatsApp CTA so it does not cover the booking form.
- Added mobile scroll padding/margins so section anchors and sticky CTA behave better on small screens.
- Added a dedicated `qa:minimal-homepage` guard for the new structure and the dynamic form WhatsApp link behavior.
- Updated EN, FR and SQ/AL translations for all new visible homepage strings.

## Files Touched

- `app/page.tsx`
- `app/globals.css`
- `components/StickyBookingBar.tsx`
- `lib/i18n.ts`
- `public/locales/translations.json`
- `scripts/content-guard.mjs`
- `scripts/qa-minimal-homepage.mjs`
- `package.json`
- `docs/screenshots/dhermi-minimal-homepage/`

## Checks Run

All passed:

| Check | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run content:guard` | PASS |
| `npm run build` | PASS, 33 static pages exported |
| `npm run qa:minimal-homepage` | PASS |
| `npm run qa:conversion-ux` | PASS |
| `npm run qa:i18n-links` | PASS, 31 HTML files, 483 used i18n keys, 633 translation keys |
| `npm run qa:url-canonicals` | PASS |
| `npm run qa:final-release` | PASS |
| `npm run test:date-format` | PASS |

## Visual QA

- Browser plugin verified page identity, 5 sections, sticky CTA visibility, no console errors and the booking form interaction.
- Playwright local screenshots were used for fixed viewport PNGs after Browser screenshot capture timed out.
- Mobile FR: hero title renders as "Excursions en bateau à Dhërmi".
- Mobile FR form: WhatsApp href includes `Nom`, `Date`, `Personnes` and the filled values.
- Mobile gallery: 8 gallery images, all lazy-loaded, 0 missing alt attributes, 0 broken images.
- Desktop EN: tour cards align at equal height and the mobile sticky bar is hidden.
- AL/SQ: homepage title and sticky CTA render in Albanian.

## Screenshots

- Mobile hero FR: `docs/screenshots/dhermi-minimal-homepage/mobile-hero-fr.png`
- Mobile tours FR: `docs/screenshots/dhermi-minimal-homepage/mobile-tours-fr.png`
- Mobile gallery FR: `docs/screenshots/dhermi-minimal-homepage/mobile-gallery-fr.png`
- Mobile contact form FR: `docs/screenshots/dhermi-minimal-homepage/mobile-contact-form-fr.png`
- Desktop hero EN: `docs/screenshots/dhermi-minimal-homepage/desktop-hero-en.png`
- Desktop tours EN: `docs/screenshots/dhermi-minimal-homepage/desktop-tours-en.png`
- Desktop reviews EN: `docs/screenshots/dhermi-minimal-homepage/desktop-reviews-en.png`

## Remaining TODOs

- Verify the live production deployment after push.
- Replace or expand review excerpts only with verified new Google reviews from Isuf.
- Consider a later media pass if more strong boat/cave photos become available.

## Ship Decision

Ship. The homepage is now visually simpler, mobile-first, clear in a few seconds, easy to book on WhatsApp, and deployable as a static export.
