# Dhermi Boat URL Canonicals

Last updated: 2026-05-29

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
| `/destinations/` | Destination overview |
| `/destinations/blue-cave/` | Blue Cave destination context |
| `/boat-photos/` | Photo gallery |
| `/faq/` | FAQ |
| `/contact/` | Contact |

Destination pages link users back to the canonical tour detail pages for route and price details.

## Legacy Redirects

Legacy or non-booking URLs should point users and crawlers to the closest real page.

| Legacy URL | Destination | Notes |
| --- | --- | --- |
| `/tours/private/` | `/private-boat-tour-albania/` | Removed duplicate private-tour template |
| `/tours/group/` | `/tours/` | Shared-tour helper duplicate |
| `/boat-tour-dhermi-today/` | `/tours/` | Old availability landing page |
| `/blue-cave-boat-tour-dhermi/` | `/grama-bay-boat-tour/` | Old Blue Cave landing page |
| `/dhermi-to-grama-bay-boat/` | `/grama-bay-boat-tour/` | Old Grama landing page |
| `/family-boat-tour-dhermi/` | `/private-boat-tour-albania/` | Old family/private landing page |
| `/french-speaking-boat-tour-dhermi/` | `/contact/` | Old language/contact landing page |
| `/destinations/gjipe/` | `/gjipe-boat-tour/` | Destination helper duplicate |
| `/destinations/grama-bay/` | `/grama-bay-boat-tour/` | Destination helper duplicate |
| `/20250721_103929/` | `/boat-photos/` | WordPress media attachment artifact |
| `/2026/02/28/hello-world/` | `/` | WordPress blog artifact |
| `/sample-page/` | `/` | WordPress sample artifact |
| `/boutique/` | `/` | WooCommerce artifact |
| `/panier/` | `/` | WooCommerce artifact |
| `/mon-compte/` | `/` | WooCommerce artifact |
| `/commander/` | `/contact/` | WooCommerce checkout artifact |

The static app renders canonical transition pages for legacy routes. They use canonical tags plus instant meta-refresh, without `noindex`, so Search Console does not classify them as noindex exclusions. `public/_redirects` also includes 301 rules for hosts that support Netlify or Cloudflare Pages-style redirects.

The old WordPress video URL `/wp-content/uploads/2026/02/20250721_103929.mp4` is also kept as a static media file so Google and users do not hit a 404 while the old attachment result drops out of search.

## Language Routing

The site uses one canonical URL path per page. The language switcher updates the document language in JavaScript and stores the choice locally; it does not publish crawlable language-query links.

| Language | Runtime code |
| --- | --- |
| English | `en` |
| French | `fr` |
| Albanian | `sq` |

Rules:

- `?dlang` and `lang` are accepted only as legacy inputs and removed from the visible URL client-side.
- `sq` is the normalized Albanian code.
- `al`, `sq-AL`, and `lang=...` are accepted as legacy inputs and normalized client-side to `sq`, `fr`, or `en`.
- No `/al/` or `/sq/` path routing is used.

## Canonical And Hreflang

Indexable pages expose:

- a canonical tag without `dlang`
- `hreflang="x-default"` without `dlang`

Legacy transition pages do not advertise hreflang alternates.

## Sitemap And Navigation

The sitemap includes the five canonical tour detail pages and the kept collection pages. It does not include `/tours/private/` or WordPress/WooCommerce artifacts.

Header, mobile menu, footer, home CTAs, `llms.txt`, and schema-driven public links should point to canonical URLs, not legacy URLs.

## Garbage URL Policy

Production robots allows crawling so Google can see canonicals and transition pages instead of reporting `Blocked by robots.txt`. Old WordPress parameters such as `?add-to-cart=`, `?section=`, `?elementor`, `?p=`, and `?page_id=` must not be promoted or linked.
