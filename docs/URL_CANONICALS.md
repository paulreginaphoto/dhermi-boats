# Dhermi Boat URL Canonicals

Last updated: 2026-05-25

## Canonical Tour Pages

Each tour has one public, indexable, modern detail page:

| Tour | Canonical URL | Template |
| --- | --- | --- |
| Gjipe Boat Tour | `/gjipe-boat-tour/` | `TourDetailPage` |
| Grama Bay Boat Tour | `/grama-bay-boat-tour/` | `TourDetailPage` |
| Private Boat Tour Albania | `/private-boat-tour-albania/` | `TourDetailPage` |
| Sunset Boat Tour | `/sunset-boat-tour/` | `TourDetailPage` |
| Morning Fishing Tour | `/morning-fishing-tour/` | `TourDetailPage` |

No prices, durations, contact details, WhatsApp details, routes, or business facts were changed for this structural pass.

## Kept Collection Pages

These pages stay public because they are collection or destination-navigation pages, not duplicate tour detail templates:

| URL | Purpose |
| --- | --- |
| `/` | Home and booking entry |
| `/tours/` | Tour comparison and tour list |
| `/tours/group/` | Shared-tour collection |
| `/destinations/` | Destination overview |
| `/destinations/gjipe/` | Gjipe destination context |
| `/destinations/grama-bay/` | Grama Bay destination context |
| `/destinations/blue-cave/` | Blue Cave destination context |
| `/boat-photos/` | Photo gallery |
| `/faq/` | FAQ |
| `/contact/` | Contact |

Destination pages link users back to the canonical tour detail pages for route and price details.

## Legacy Redirects

Legacy or non-booking URLs should not be indexed and should point users to the closest real page.

| Legacy URL | Destination | Notes |
| --- | --- | --- |
| `/tours/private/` | `/private-boat-tour-albania/` | Removed duplicate private-tour template |
| `/20250721_103929/` | `/boat-photos/` | WordPress media attachment artifact |
| `/2026/02/28/hello-world/` | `/` | WordPress blog artifact |
| `/sample-page/` | `/` | WordPress sample artifact |
| `/boutique/` | `/` | WooCommerce artifact |
| `/panier/` | `/` | WooCommerce artifact |
| `/mon-compte/` | `/` | WooCommerce artifact |
| `/commander/` | `/contact/` | WooCommerce checkout artifact |

The static app renders noindex redirect pages for legacy routes. `public/_redirects` also includes 301 rules for hosts that support Netlify or Cloudflare Pages-style redirects.

The old WordPress video URL `/wp-content/uploads/2026/02/20250721_103929.mp4` is also kept as a static media file so Google and users do not hit a 404 while the old attachment result drops out of search.

## Language Routing

The site uses one URL path per page and a language query:

| Language | Query |
| --- | --- |
| English | `?dlang=en` |
| French | `?dlang=fr` |
| Albanian | `?dlang=sq` |

Rules:

- `?dlang` changes language only. It must not change the page template.
- `sq` is the normalized Albanian code.
- `al`, `sq-AL`, and `lang=...` are accepted as legacy inputs and normalized client-side to `dlang=sq`, `dlang=fr`, or `dlang=en`.
- No `/al/` or `/sq/` path routing is used.

## Canonical And Hreflang

Indexable pages expose:

- a canonical tag without `dlang`
- `hreflang="en"` with `?dlang=en`
- `hreflang="fr"` with `?dlang=fr`
- `hreflang="sq"` with `?dlang=sq`
- `hreflang="x-default"` without `dlang`

Noindex legacy redirect pages do not advertise hreflang alternates.

## Sitemap And Navigation

The sitemap includes the five canonical tour detail pages and the kept collection pages. It does not include `/tours/private/` or WordPress/WooCommerce artifacts.

Header, mobile menu, footer, home CTAs, `llms.txt`, and schema-driven public links should point to canonical URLs, not legacy URLs.

## Garbage URL Policy

Robots disallows old WordPress or parameter garbage such as:

- `?add-to-cart=`
- `?section=`
- `?elementor...`
- `?p=`
- `?page_id=`

These parameter URLs should not be promoted, linked, or indexed.
