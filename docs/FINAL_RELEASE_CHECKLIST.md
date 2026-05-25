# Final Release Checklist

Date: 2026-05-25

## Scope

Final technical SEO, performance hygiene, accessibility, analytics readiness, and release QA for `dhermi.boats`.

Commercial facts were not changed: prices, tour durations, routes, phone, WhatsApp, email, and existing real reviews remain as-is.

## SEO Status

- Unique title and meta description: PASS for canonical public pages.
- Canonical tags: PASS for indexable public pages.
- Hreflang: PASS for real translated pages only (`en`, `fr`, `sq`, `x-default`).
- JSON-LD LocalBusiness: PASS sitewide.
- JSON-LD WebSite: PASS sitewide.
- JSON-LD FAQPage: PASS only where the FAQ questions are visible on the page.
- JSON-LD TouristTrip/Offer: PASS on canonical tour pages with factual tour names, prices, itinerary text, provider, and URL. No availability/scarcity claims are emitted.
- Sitemap: PASS canonical public URLs only.
- Robots: PASS parameter garbage and legacy WordPress-style URLs excluded or blocked from indexing.

## Public URL Matrix

| URL | Expected | Status | Notes |
| --- | --- | --- | --- |
| `/` | 200 | PASS | Canonical home page with LocalBusiness/WebSite JSON-LD. |
| `/tours/` | 200 | PASS | Fast-choice tours page; canonical page in sitemap. |
| `/boat-photos/` | 200 | PASS | Photo page with tour captions and contextual CTAs. |
| `/gjipe-boat-tour/` | 200 | PASS | Canonical Gjipe tour page. |
| `/grama-bay-boat-tour/` | 200 | PASS | Canonical Grama Bay tour page. |
| `/private-boat-tour-albania/` | 200 | PASS | Canonical private boat tour page. |
| `/sunset-boat-tour/` | 200 | PASS | Canonical sunset tour page. |
| `/morning-fishing-tour/` | 200 | PASS | Canonical morning fishing tour page. |
| `/destinations/` | 200 | PASS | Destination hub links to canonical tour pages. |
| `/destinations/blue-cave/` | 200 | PASS | Real destination page with translated versions. |
| `/faq/` | 200 | PASS | Visible FAQ sections match FAQPage JSON-LD. |
| `/contact/` | 200 | PASS | Contact page with tracked phone/email/maps/WhatsApp links. |

## Legacy And Duplicate URL Status

| URL | Status | Notes |
| --- | --- | --- |
| `/tours/private/` | REDIRECT / NOINDEX | Redirect helper for the canonical private tour page. |
| `/tours/group/` | NOINDEX | Helper choice page canonicalizes to `/tours/`; removed from sitemap. |
| `/destinations/gjipe/` | NOINDEX | Helper destination page canonicalizes to `/gjipe-boat-tour/`; removed from sitemap. |
| `/destinations/grama-bay/` | NOINDEX | Helper destination page canonicalizes to `/grama-bay-boat-tour/`; removed from sitemap. |
| WordPress/blog artifact URLs | REDIRECT / NOINDEX | Legacy routes are excluded from public sitemap and blocked by robots/redirect handling. |
| Section/parameter garbage URLs | BLOCKED | `robots.ts` disallows WordPress, Elementor, paging, and section-style parameters. |

## Performance Hygiene

- Non-critical images: PASS, lazy-loading preserved on below-fold/static gallery images.
- Raw image dimensions: PASS for hero fallback images and map tile images.
- Video embed hygiene: PASS, local video uses `preload="none"` and a poster image.
- Social embeds: PASS, TikTok/Instagram are static preview links, not heavy above-the-fold embeds.
- Image format support: PASS where the current static stack already uses WebP assets.

## Accessibility Hygiene

- Skip link: PASS, preserved in the root layout.
- Visible focus states: PASS, global `focus-visible` outline remains active.
- Accessible names: PASS for tracked CTA links/buttons and icon links.
- Alt text: PASS for tour, destination, gallery, hero, and static social preview images.

## Analytics Readiness

- GA4 support: PASS, uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` when configured.
- GTM support: PASS, uses `NEXT_PUBLIC_GTM_ID` when configured.
- No analytics ID invented: PASS.
- `dataLayer` click events: PASS, emitted for tracked links even before GA/GTM is configured.
- WhatsApp click tracking: PASS with `whatsapp_click_{tour}_{language}_{placement}` event names.
- Phone tracking: PASS via `phone_click`.
- Email tracking: PASS via `email_click`.
- Maps tracking: PASS via `maps_click`.
- Instagram tracking: PASS via `instagram_click`.
- TikTok tracking: PASS via `tiktok_click`.
- GetYourGuide tracking: PASS via `getyourguide_click`.

## Language QA

- `?dlang=en`: PASS, changes language only.
- `?dlang=fr`: PASS, changes language only and uses formal `vous`.
- `?dlang=sq`: PASS, changes language only.
- `?dlang=al`: PASS, normalized to `sq` by the existing locale bootstrap.
- Hreflang: PASS, emitted only for real translated canonical pages.

## Garbage Text QA

The static export must not contain:

- `Partager`
- `J'aime`
- `J’aime`
- `Chargement...`
- `Chargement…`
- `%d`

Status: PASS by release QA guard.

## Commands

Final command results:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS - ESLint clean with `--max-warnings=0`. |
| `npm run typecheck` | PASS - TypeScript clean. |
| `npm run content:guard` | PASS - content, booking, and static links protected. |
| `npm run test:date-format` | PASS - booking date format test clean. |
| `npm run build` | PASS - translations generated, Next static export built, 27 pages generated, runtime stripped from 25 HTML files. |
| `npm run qa:final-release` | PASS - 12 public URLs checked. |
| `npm run qa:conversion-ux` | PASS - CTA and conversion UX guard clean. |
| `npm run qa:i18n-links` | PASS - 25 HTML files, 480 used i18n keys, 545 translation keys. |
| `npm run qa:url-canonicals` | PASS - 5 canonical tours and 7 legacy redirects checked. |

## Browser QA

Local static export served from `out/` and checked in Chromium:

| Check | Result |
| --- | --- |
| Desktop public URLs | PASS - 12/12 returned 200 with title, meta description, canonical, hreflang, LocalBusiness JSON-LD, and no garbage text. |
| Tour page structured data | PASS - all 5 canonical tour pages include TouristTrip and visible FAQPage JSON-LD. |
| Mobile layout | PASS - home, tours, boat photos, Gjipe tour, and contact had no horizontal overflow and showed the mobile sticky CTA. |
| Language variants | PASS - `?dlang=fr`, `?dlang=sq`, and `?dlang=al` kept the same template; `al` normalized to `sq`. |
| French formality | PASS - checked French variants for informal `tu/ton/ta/tes/toi`; none found. |
| Analytics click event | PASS - synthetic WhatsApp clicks pushed the expected event into `dataLayer`. |

## Remaining Manual Checks

- GA4/GTM realtime dashboards need production IDs in the deployment environment before live event validation.
- Search Console indexing and rich-result eligibility are external manual checks after deployment.
- Third-party profile availability for Google Maps, Instagram, TikTok, and GetYourGuide should be spot-checked in production.
