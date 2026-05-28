# Dhermi Boat 5-Star Conversion Plan

## Goal

Make dhermi.boats feel premium, local and easy to book for 2026 tourists in Dhermi, with WhatsApp as the primary action and tour comparison as the second action.

## Current audit

- Framework: Next.js 16 App Router, React 19, Tailwind CSS, static export flow.
- Content source: real tour data, prices, reviews, skipper copy and FAQs in `data/content.ts`.
- Translation source: `lib/i18n.ts`, generated to `public/locales/translations.json`.
- Conversion layer: centralized WhatsApp helpers in `lib/site.ts` and locale-aware messages in `lib/whatsappMessages.ts`.
- Existing strengths: optimized route images, LocalBusiness / TouristTrip / FAQ schema, sticky mobile booking bar, fast booking form, real reviews, clear tour data.
- Main weaknesses to fix: hero copy is not the requested offer, several visible strings are hardcoded in English, some sections expose internal business copy, tour labels are too promotional, card hierarchy is busy, and trust/reassurance can be calmer and more premium.

## Design direction

- Palette: cream / pearl backgrounds, deep navy and ink for authority, turquoise only for useful accents, bronze only for restrained labels.
- Typography: keep the existing elegant serif + system sans pairing, but reduce all-caps clutter and improve body copy rhythm.
- Layout: mobile-first, fewer pills, clearer tour facts, aligned desktop cards, generous but not empty spacing.
- Imagery: keep real sea/coast/boat photos, prioritize clear crops and alt text, avoid fake luxury or generic tourist visuals.
- Tone: short, honest, local, specific. Routes depend on sea/weather. No fake guarantees.

## Implementation plan

1. Create this plan file.
2. Hero
   - Use the requested headline and subline.
   - Localize all visible hero strings.
   - Keep two primary actions: WhatsApp availability and compare tours.
   - Add compact trust facts: 5-star reviews, max 15 guests, local skipper, daily departures, sea-condition routes.
   - Add near-CTA reassurance: no payment before availability and exact meeting point on WhatsApp.
3. Mobile sticky navigation
   - Keep WhatsApp, Tours, Prices, Call.
   - Use a clean selected/primary state without covering content.
   - Keep event hooks for WhatsApp, tour, price and call clicks.
4. Tour cards and comparison
   - Show tour name, duration, real price, max guests, best fit, main stops and WhatsApp CTA.
   - Use only true labels: Best value, Most complete route, Private option.
   - Align desktop cards and simplify mobile scanning.
5. Booking reassurance and trust
   - Tighten "What we confirm before departure".
   - Rewrite conversion trust and local skipper sections into visitor-facing copy.
   - Keep real reviews only.
   - Keep FAQ focused on meeting point, weather, booking, child prices, what to bring, private trips and languages.
6. Copy and i18n
   - Move visible strings to `lib/i18n.ts`.
   - Update EN / FR / AL for new and changed copy.
   - Regenerate `public/locales/translations.json`.
7. SEO and conversion hooks
   - Improve metadata wording with natural keywords.
   - Preserve existing LocalBusiness / TouristTrip / FAQPage schema.
   - Keep WhatsApp links centralized and locale-aware.
   - Add/keep data attributes for WhatsApp, call, tour-card and compare interactions.
8. QA
   - Run lint, typecheck, content guard and build.
   - Run available QA scripts.
   - Start local site and capture required screenshots:
     - mobile hero
     - mobile tour card
     - mobile booking flow
     - desktop hero
     - desktop tour comparison
   - Review screenshots for layout, contrast, crops, sticky nav, console errors and obvious CLS.
9. Final report
   - Create `DHERMI_SITE_5_STAR_REPORT.md` with changes, files touched, checks, screenshots and remaining TODOs.
   - Commit on `main` when verification is complete.

## Non-goals

- Do not invent new prices, reviews, claims, guarantees or locations.
- Do not add fake luxury language.
- Do not migrate framework or styling stack.
- Do not remove real content unless it harms clarity and the same information remains accessible elsewhere.

