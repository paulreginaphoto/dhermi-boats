# Conversion Audit Fixes

Date: 2026-05-25

## Scope

Improved conversion UX without changing prices, durations, routes, phone, WhatsApp, email, or existing real reviews.

## WhatsApp Message Templates

All WhatsApp CTAs now use the same required fields:

- Tour
- Date
- Adults
- Children
- Preferred time
- Questions

Templates by key:

- `default`
  - EN: `Hello Dhermi Boat, I'd like to book a boat tour. Tour: __ / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite réserver un tour en bateau. Tour : __ / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të rezervoj një tur me varkë. Turi: __ / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __`
- `gjipe`
  - EN: `Hello Dhermi Boat, I'd like to book the Gjipe Tour. Tour: Gjipe Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite réserver le tour de Gjipe. Tour : Gjipe / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të rezervoj Turin e Gjipesë. Turi: Gjipe / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __`
- `grama`
  - EN: `Hello Dhermi Boat, I'd like to ask about Grama Bay availability. Tour: Grama Bay Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite vérifier la disponibilité du tour de Grama. Tour : Grama / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të pyes për disponueshmërinë e Gramës. Turi: Grama / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __`
- `private`
  - EN: `Hello Dhermi Boat, I'd like to plan a private boat tour. Tour: Private Boat Tour / Date: __ / Adults: __ / Children: __ / Preferred time: __ / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite planifier un tour privé en bateau. Tour : tour privé / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : __ / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të planifikoj një tur privat me varkë. Turi: tur privat / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: __ / Pyetje: __`
- `sunset`
  - EN: `Hello Dhermi Boat, I'd like to ask about the sunset tour. Tour: Sunset Private Tour / Date: __ / Adults: __ / Children: __ / Preferred time: sunset / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite vérifier la disponibilité au coucher de soleil. Tour : coucher de soleil / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : coucher de soleil / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të pyes për turin në perëndim. Turi: perëndim / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: perëndim / Pyetje: __`
- `fishing`
  - EN: `Hello Dhermi Boat, I'd like to ask about the morning fishing tour. Tour: Morning Fishing Tour / Date: __ / Adults: __ / Children: __ / Preferred time: 5 AM to 8 AM / Questions: __`
  - FR: `Bonjour Dhermi Boat, je souhaite vérifier la disponibilité pour la pêche du matin. Tour : pêche du matin / Date : __ / Adultes : __ / Enfants : __ / Horaire souhaité : 5 h à 8 h / Questions : __`
  - SQ: `Përshëndetje Dhermi Boat, dua të pyes për turin e peshkimit në mëngjes. Turi: peshkimi në mëngjes / Data: __ / Të rritur: __ / Fëmijë: __ / Ora e preferuar: 5:00 - 8:00 / Pyetje: __`

## Analytics Event Pattern

WhatsApp CTAs use:

`whatsapp_click_{tour}_{language}_{placement}`

The rendered default is English for static export, and the locale bootstrap rewrites the language segment when `?dlang=fr` or `?dlang=sq` is active.

Placement families added:

- `home_hero`
- `header`
- `mobile_menu`
- `footer`
- `sticky_mobile`
- `floating_desktop`
- `booking_cta`
- `quick_fallback`
- `quick_form`
- `comparison_help`
- `comparison_card`
- `tour_card`
- `tour_hero`
- `tour_panel`
- `tour_final`
- `tours_hero`
- `tour_matrix`
- `contact_hero`
- `contact_panel`
- `contact_card`
- `faq_hero`
- `photos_hero`
- `photos_card`
- `destination_card`
- `destination_detail_hero`
- `destination_detail_card`
- `destination_detail_final`
- `group_hero`
- `not_found`

## Page Changes

- Main navigation, footer, mobile menu, sticky mobile CTA and floating desktop WhatsApp CTA now use placement-specific events.
- Home page keeps the hero CTA above the fold and adds a consistent trust block.
- Tour detail pages now have tour-specific WhatsApp CTAs in hero, side panel and final CTA.
- `/tours/` now presents fast-choice categories: best value, most complete, private/family, sunset/couple and fishing/morning.
- `/boat-photos/` now groups photos by matching tour, with captions, tour links and tour-specific WhatsApp CTAs.
- `/destinations/` cards now point directly to the relevant canonical tour pages for route and price.
- Destination detail pages now link both to WhatsApp and the matching canonical tour page above the fold.
- French copy added for new content uses formal `vous`.

## QA Notes

- CTA links are checked by `npm run qa:conversion-ux` and browser QA on exported pages.
- No prices, durations, routes, phone number, WhatsApp number, email address or existing real reviews were changed.

## Verification Results

- `npm run qa:conversion-ux`: passed.
- `npm run qa:i18n-links`: passed after static export.
- `npm run qa:url-canonicals`: passed for 5 canonical tours and 7 legacy redirects.
- `npm run content:guard`: passed.
- `npm run test:date-format`: passed.
- `npm run lint`: passed.
- `npm run typecheck`: passed.
- `npm run build`: passed and regenerated the static export.
- Browser QA: checked desktop `1280x720` and mobile `390x844` for home, tours, photos, destinations and canonical tour pages. No horizontal overflow was found; mobile sticky CTA was visible; `?dlang=fr` changed WhatsApp href fields and analytics events to French.
