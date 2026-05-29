# Dhermi Boat Structural QA

Last updated: 2026-05-25

## Scope

This QA covers the structural URL pass only:

- one canonical modern page per tour
- no duplicate private-tour template at `/tours/private/`
- legacy WordPress/WooCommerce URLs noindexed or redirected
- language query changes language only, not template
- French uses `vous`, not `tu`
- Albanian routing uses `sq`, not mixed `al/sq`
- sitemap, canonical tags, hreflang, header, footer, menu, and LLM links point to canonical URLs

It does not redesign the site and does not change prices, routes, durations, phone, WhatsApp, email, or business facts.

## Required Commands

Run these from the project root:

```bash
npm run translations
npm run qa:url-canonicals
npm run content:guard
npm run qa:i18n-links
npm run lint
npm run typecheck
npm run build
```

After `npm run build`, run the URL QA again so it checks the fresh static export:

```bash
npm run qa:url-canonicals
```

## URL Checks

The five canonical tour URLs must export to static HTML and return 200 from the static output:

| URL | Static file |
| --- | --- |
| `/gjipe-boat-tour/` | `out/gjipe-boat-tour/index.html` |
| `/grama-bay-boat-tour/` | `out/grama-bay-boat-tour/index.html` |
| `/private-boat-tour-albania/` | `out/private-boat-tour-albania/index.html` |
| `/sunset-boat-tour/` | `out/sunset-boat-tour/index.html` |
| `/morning-fishing-tour/` | `out/morning-fishing-tour/index.html` |

Each canonical page must include:

- canonical tag without `dlang`
- hreflang `en`, `fr`, `sq`, and `x-default`
- no `NEXT_REDIRECT`
- no public link to `/tours/private/`

## Language Checks

For each canonical tour page:

- `?dlang=en`, `?dlang=fr`, and `?dlang=sq` stay on the same path.
- The template remains the same tour detail template across language variants.
- French visible copy uses `vous`.
- `?dlang=al` and `?lang=al` normalize to `?dlang=sq`.

## Legacy Checks

Legacy routes must stay canonical transition pages:

| URL | Expected behavior |
| --- | --- |
| `/tours/private/` | canonical + instant meta-refresh to `/private-boat-tour-albania/` |
| `/tours/group/` | canonical + instant meta-refresh to `/tours/` |
| `/2026/02/28/hello-world/` | canonical + instant meta-refresh to `/` |
| `/sample-page/` | canonical + instant meta-refresh to `/` |
| `/boutique/` | canonical + instant meta-refresh to `/` |
| `/panier/` | canonical + instant meta-refresh to `/` |
| `/mon-compte/` | canonical + instant meta-refresh to `/` |
| `/commander/` | canonical + instant meta-refresh to `/contact/` |

## Garbage Text Checks

The build must not contain these WordPress/blog artifacts:

- `Partager`
- `J’aime`
- `J'aime`
- `Chargement…`
- `Chargement...`
- `%d`

## Results

Verification run on 2026-05-25:

| Check | Result |
| --- | --- |
| `npm run translations` | PASS - `translations.json` generated |
| `npm run content:guard` | PASS - content, booking and static links protected |
| `npm run lint` | PASS - no warnings |
| `npm run typecheck` | PASS - TypeScript clean |
| `npm run build` | PASS - static export generated, 27 pages |
| `npm run qa:url-canonicals` | PASS - 5 canonical tours, 7 legacy redirects checked |
| `npm run qa:i18n-links` | PASS - 25 HTML files, 465 used i18n keys, 523 translation keys |
| `npm run test:date-format` | PASS |

HTTP 200 check against the fresh `out` export:

| URL | Result |
| --- | --- |
| `/gjipe-boat-tour/` | 200 |
| `/grama-bay-boat-tour/` | 200 |
| `/private-boat-tour-albania/` | 200 |
| `/sunset-boat-tour/` | 200 |
| `/morning-fishing-tour/` | 200 |

Browser language/template check:

| URL family | EN | FR | SQ | Template |
| --- | --- | --- | --- | --- |
| `/gjipe-boat-tour/` | PASS | PASS | PASS | `TourDetailPage` |
| `/grama-bay-boat-tour/` | PASS | PASS | PASS | `TourDetailPage` |
| `/private-boat-tour-albania/` | PASS | PASS | PASS | `TourDetailPage` |
| `/sunset-boat-tour/` | PASS | PASS | PASS | `TourDetailPage` |
| `/morning-fishing-tour/` | PASS | PASS | PASS | `TourDetailPage` |

Additional browser checks:

- `?dlang=fr` keeps the same path and renders French H1 copy.
- `?dlang=sq` keeps the same path and renders Albanian H1 copy.
- `?dlang=al` normalizes to `?dlang=sq`.
- Canonical tags remain query-free.
- No `Partager`, `J’aime`, `Chargement…`, or `%d` fragments appeared in the checked pages.
