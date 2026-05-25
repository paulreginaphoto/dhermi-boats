# Final Ship Report

Date: 2026-05-25 18:27 Europe/Paris
Site: https://dhermi.boats/

## 1. Final Decision

SHIP WITH POST-DEPLOY CHECKS.

All required local QA passed after the final fix. Live production was reachable over HTTPS and passed the public URL, canonical, sitemap, robots, Google Ads, and legacy URL checks after commit `52d5eff` was pushed. Only external dashboard and search tooling checks remain.

## 2. Exact Commit Checked

Site code checked: `52d5eff698224595b33644e7309662d0c930610f`

Latest relevant history confirmed before final QA:

- `5aa97e7` URL canonical cleanup.
- `9d04c56` conversion CTA cleanup.
- `1d9737a` final SEO release QA.
- `fdd6f65` Google Ads conversion tag.
- `52d5eff` final `/commander/` legacy redirect fix and stricter canonical QA guard.

## 3. Commands Run

All commands below passed after the final fix:

| Command | Result |
| --- | --- |
| `npm run lint` | PASS |
| `npm run typecheck` | PASS |
| `npm run content:guard` | PASS |
| `npm run test:date-format` | PASS |
| `npm run build` | PASS, 27 static pages generated, Google Ads injected into 25 HTML files |
| `npm run qa:final-release` | PASS, 12 public URLs checked |
| `npm run qa:conversion-ux` | PASS |
| `npm run qa:i18n-links` | PASS, 25 HTML files, 480 used i18n keys, 545 translation keys |
| `npm run qa:url-canonicals` | PASS, 5 canonical tours, 7 legacy redirects checked |

Additional local static export QA from `out/` served at `http://127.0.0.1:4392/`: PASS.

## 4. URLs Checked Locally

All returned 200 locally from the static export and passed title, meta description, canonical, hreflang, artifact, CTA, schema, navigation, and mobile overflow checks:

- `/`
- `/tours/`
- `/boat-photos/`
- `/gjipe-boat-tour/`
- `/grama-bay-boat-tour/`
- `/private-boat-tour-albania/`
- `/sunset-boat-tour/`
- `/morning-fishing-tour/`
- `/destinations/`
- `/destinations/blue-cave/`
- `/faq/`
- `/contact/`

Local helper and legacy URLs checked:

- `/tours/private/`: noindex, canonical/meta-refresh to `/private-boat-tour-albania/`.
- `/tours/group/`: noindex, canonical to `/tours/`.
- `/destinations/gjipe/`: noindex, canonical to `/gjipe-boat-tour/`.
- `/destinations/grama-bay/`: noindex, canonical to `/grama-bay-boat-tour/`.
- `/2026/02/28/hello-world/`, `/sample-page/`, `/boutique/`, `/panier/`, `/mon-compte/`: noindex legacy shells.
- `/commander/`: noindex, canonical/meta-refresh to `/contact/`.
- Query garbage examples with `section`, `dhermi-section`, `elementor`, `p`, and `page_id`: no public artifact strings found; robots disallows documented garbage patterns.

## 5. URLs Checked Live

Live check timestamp: 2026-05-25T16:26:45Z.

All canonical live URLs returned 200 over HTTPS, had the expected canonical tag, had the Google Ads tag, and did not show forbidden legacy strings:

- `https://dhermi.boats/`
- `https://dhermi.boats/tours/`
- `https://dhermi.boats/boat-photos/`
- `https://dhermi.boats/gjipe-boat-tour/`
- `https://dhermi.boats/grama-bay-boat-tour/`
- `https://dhermi.boats/private-boat-tour-albania/`
- `https://dhermi.boats/sunset-boat-tour/`
- `https://dhermi.boats/morning-fishing-tour/`
- `https://dhermi.boats/destinations/`
- `https://dhermi.boats/destinations/blue-cave/`
- `https://dhermi.boats/faq/`
- `https://dhermi.boats/contact/`

Live legacy spot checks passed:

- `/tours/private/`: noindex, canonical/meta-refresh to `/private-boat-tour-albania/`.
- `/commander/`: noindex, canonical/meta-refresh to `/contact/`.
- `/sample-page/`: noindex, canonical/meta-refresh to `/`.

Live `sitemap.xml` and `robots.txt` returned 200 and matched the documented canonical/garbage URL policy.

## 6. SEO and Schema Status

PASS.

- Unique titles and meta descriptions are present on canonical public pages.
- Canonical tags point to the canonical public URLs.
- Hreflang only exposes `en`, `fr`, `sq`, and `x-default`.
- No `al` hreflang or `?dlang=al` public alternate is exposed.
- Sitemap includes canonical public URLs and excludes legacy/helper URLs.
- Robots disallows documented WordPress and parameter garbage patterns.
- LocalBusiness and WebSite JSON-LD are present sitewide.
- FAQPage JSON-LD appears only where visible FAQ content is present.
- TouristTrip/Offer JSON-LD appears on canonical tour pages with factual names, prices, provider, itinerary, and URLs.
- No fake availability, scarcity, review count, aggregate rating, award, or rating claims were found in JSON-LD.

## 7. Analytics and Ads Status

PASS.

- Google Ads tag `AW-18050141389` is present in the head of exported and live public pages.
- Contact conversion snippet `AW-18050141389/5E84COKT_5EcEM2Z_Z5D` appears on `/contact/`.
- The contact conversion snippet is not present on non-contact canonical pages.
- GA4 uses `NEXT_PUBLIC_GA_MEASUREMENT_ID` only when configured; no fake GA4 ID was invented in this build.
- GTM uses `NEXT_PUBLIC_GTM_ID` only when configured; no fake GTM ID was invented in this build.
- dataLayer click tracking works without GA4/GTM configured.

## 8. Language QA Status

PASS.

Representative browser checks on `/gjipe-boat-tour/`:

- `?dlang=en`: English page, same canonical/template.
- `?dlang=fr`: French page, same canonical/template, no English section headings found in visible content.
- `?dlang=sq`: Albanian page, same canonical/template.
- `?dlang=al`: normalized to `?dlang=sq`, Albanian page, same canonical/template.

French visible content check passed for formal `vous` usage. No informal `tu`, `ton`, `ta`, `tes`, or `toi` was found.

## 9. CTA and Tracking Status

PASS.

Verified locally in Chromium:

- WhatsApp tour CTA for Gjipe uses `whatsapp_click_gjipe_en_tour_hero`.
- WhatsApp message includes tour name, date, adults, children, preferred time, and questions.
- Phone click pushes `call_click`.
- Email click pushes `email_click`.
- Maps click pushes `maps_click`.
- Instagram click pushes `instagram_click`.
- TikTok click pushes `tiktok_click`.
- GetYourGuide click pushes `getyourguide_click`.

Tour pages and main pages retain above-the-fold CTAs. Mobile sticky CTA was visible where expected.

## 10. Mobile and Browser QA Status

PASS.

Chromium checks covered desktop `1366x900` and mobile `390x844` for all 12 canonical URLs.

- No horizontal overflow found.
- Skip link present.
- Focus-visible styles present.
- Header/footer navigation uses canonical public URLs.
- Visible important images have alt text.
- Mobile sticky CTA rendered on main/tour/contact flows where expected.

## 11. Fixes Made In This Final Pass

One release-blocking legacy mismatch was fixed:

- `app/commander/page.tsx`: `/commander/` now noindexes, canonicalizes, and meta-refreshes to `/contact/`, matching the documented WooCommerce checkout artifact policy.
- `scripts/qa-url-canonicals.mjs`: legacy redirect QA now checks the exact canonical tag and meta-refresh target, so this mismatch cannot pass because the target URL merely appears elsewhere in navigation.

No prices, tour durations, tour names, routes, phone, WhatsApp, email, reviews, business facts, or commercial claims were changed.

## 12. Remaining Manual Checks

Required after or during production monitoring:

- Google Ads Tag Assistant / conversion helper sees `AW-18050141389`.
- Google Ads conversion action records the `/contact/` conversion when tested.
- GA4 realtime receives events if `NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured later.
- GTM preview/debug receives events if `NEXT_PUBLIC_GTM_ID` is configured later.
- Google Search Console sitemap submission/indexing.
- Rich Results Test for representative pages.
- External Google Maps, Instagram, TikTok, and GetYourGuide links open correctly from production on real devices.

## 13. Recommendation

Ship. The local release gates and live production checks passed after commit `52d5eff`. Keep the external dashboard/search checks as post-deploy verification items, because they require Google account tooling and real production event ingestion.
