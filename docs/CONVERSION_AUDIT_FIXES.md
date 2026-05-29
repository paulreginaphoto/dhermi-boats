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

Templates live in `lib/whatsappMessages.ts` and use this safe structure:

```text
Hello Dhermi Boat :) I'd like to book a boat tour.

*Tour:* __
*Date:* __
*Adults:* __
*Children:* __
*Preferred time:* __
*Language:* __
*Questions:* __
```

WhatsApp messages intentionally avoid pictogram emoji because the WhatsApp share preview can render them as replacement characters. The build is protected by `npm run qa:whatsapp-messages`, which checks exported WhatsApp links for broken symbols, required fields and the blank line after the greeting.

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
