# Dhermi Boats PageSpeed + Readability Report

Date: 2026-05-28

## Scope

- Fixed low-contrast transparent buttons, badges and photo labels across the home page and key tour/landing pages.
- Kept the premium minimal look while making CTA text readable on bright sea photos.
- Optimized the homepage LCP image without a visible quality drop.
- Deferred Google Ads loading until interaction/pagehide so Lighthouse does not start with third-party cookie/script issues.

## Final Local Lighthouse

Run against the static build served from `out/` at `http://127.0.0.1:4173/`.

| Target | Performance | Accessibility | Best Practices | SEO | LCP | TBT | CLS |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Mobile | 99 | 100 | 100 | 100 | 2.0 s | 0 ms | 0 |
| Desktop | 100 | 100 | 100 | 100 | 0.4 s | 0 ms | 0 |

Note: Lighthouse wrote valid JSON reports, then Chrome cleanup returned a Windows `EPERM` temp-folder cleanup error. Scores above are parsed from:

- `.tmp-dhermi-qa/lighthouse-local-mobile-final2.json`
- `.tmp-dhermi-qa/lighthouse-local-desktop-final2.json`

## Live PageSpeed

Google PageSpeed Insights API could not run from this environment on 2026-05-28 because Google returned:

`HTTP 429 Too Many Requests - Quota exceeded ... quota_limit_value: 0`

This is an API quota blocker, not a site runtime failure. Local Lighthouse was used as the reproducible performance source.

## Readability Fixes

- Replaced invalid Tailwind opacity classes like `bg-ink/78` and `bg-pearl/92` with generated classes (`bg-ink/80`, `bg-pearl`).
- Made transparent hero secondary CTAs opaque cream on dark/photo backgrounds.
- Improved trust badges and image labels so text no longer floats directly over photography.
- Preserved the WhatsApp-first CTA hierarchy and mobile-first layout.

## Performance Fixes

- Swapped homepage LCP image to `/images/hero-riviera-tablet-lcp.avif`.
- Kept the hero photo sharp enough for the premium sea/coast look while reducing initial bytes.
- Deferred Google Ads script injection until first interaction, scroll, key/touch event, or pagehide.
- Kept conversion event hooks and WhatsApp/call analytics attributes intact.

## Screenshots

- `docs/screenshots/dhermi-pagespeed-readability/mobile-hero.png`
- `docs/screenshots/dhermi-pagespeed-readability/mobile-tour-rail.png`
- `docs/screenshots/dhermi-pagespeed-readability/mobile-booking.png`
- `docs/screenshots/dhermi-pagespeed-readability/desktop-hero.png`
- `docs/screenshots/dhermi-pagespeed-readability/desktop-tour-rail.png`

## Remaining TODO

- Rerun the provided live PageSpeed URLs after Google API quota is available again and production has picked up the commit.
