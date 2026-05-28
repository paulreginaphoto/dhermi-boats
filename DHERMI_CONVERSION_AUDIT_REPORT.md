# Dhermi Conversion Audit Report

Date: 2026-05-28
Scope: screenshot-led conversion polish after the five-tour rail pass.

## Goal

Make the homepage sell faster: clear offer, clear prices, stronger WhatsApp booking path, less clutter, professional reassurance.

## Screenshot Audit

Before:
- Desktop hero looked premium, but the headline "Boat tours in Dhërmi" was too generic.
- Mobile hero repeated the WhatsApp CTA because the sticky bar stayed visible while the hero already had a WhatsApp button.
- Prices were clear on tour cards, but not visible early enough for impatient visitors.
- Tour rail and booking form were structurally clean, with no horizontal overflow.

After:
- Hero now says the actual money offer: Dhërmi boat tours to Gjipe, Grama Bay and Blue Cave.
- Hero copy mentions clear prices from 35 € adult, small groups, local skipper and WhatsApp booking after the sea check.
- Hero now has two actions: check availability on WhatsApp and compare tours.
- Mobile sticky WhatsApp bar hides on hero, tours and form sections so it does not cover content that already has CTAs.
- Tour rail hint now reinforces pricing: prices start from 35 € adult, compare, then confirm on WhatsApp.

No prices, reviews, locations or guarantees were invented.

## Files Touched

- `app/page.tsx`
- `lib/i18n.ts`
- `public/locales/translations.json`
- `docs/screenshots/dhermi-conversion-audit/`
- `DHERMI_CONVERSION_AUDIT_REPORT.md`

## Screenshots

Before:
- `docs/screenshots/dhermi-conversion-audit/before/desktop-hero.png`
- `docs/screenshots/dhermi-conversion-audit/before/mobile-hero.png`
- `docs/screenshots/dhermi-conversion-audit/before/desktop-tours.png`
- `docs/screenshots/dhermi-conversion-audit/before/mobile-tours.png`
- `docs/screenshots/dhermi-conversion-audit/before/mobile-form.png`

After:
- `docs/screenshots/dhermi-conversion-audit/after/desktop-hero.png`
- `docs/screenshots/dhermi-conversion-audit/after/mobile-hero.png`
- `docs/screenshots/dhermi-conversion-audit/after/desktop-tours.png`
- `docs/screenshots/dhermi-conversion-audit/after/mobile-tours.png`
- `docs/screenshots/dhermi-conversion-audit/after/mobile-form.png`

## Checks Run

Passed:
- `npm run translations`
- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run qa:minimal-homepage`
- `npm run qa:conversion-ux`
- `npm run qa:five-tour-rail`
- `npm run qa:i18n-links`
- `npm run content:guard`

Visual assertions:
- Mobile hero H1 estimated at 3 lines.
- Desktop hero H1 estimated at 2 lines.
- Hero exposes both "Check availability on WhatsApp" and "Compare tours".
- Mobile sticky bar opacity is 0 on the hero because the hero already has a WhatsApp CTA.
- Horizontal overflow remains 0 on mobile and desktop.

## Remaining TODOs

- Verify live deployment after push.
- If the owner provides stronger verified reviews or booking data, add them without inventing claims.

## Ship Decision

Ship. The homepage is clearer in the first 5 seconds, pricing appears earlier, WhatsApp intent is stronger, and the mobile experience feels less cluttered.
