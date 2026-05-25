# SEO Checklist

## Technical SEO

- [x] Static HTML export for GitHub Pages.
- [x] Semantic headings and page structure.
- [x] Unique page titles and descriptions.
- [x] Canonical URLs.
- [x] OpenGraph metadata.
- [x] `robots.txt` (`app/robots.ts`).
- [x] `llms.txt`.
- [x] `sitemap.xml` (`app/sitemap.ts`).
- [x] `public/CNAME` restored for `dhermi.boats` and GitHub Pages HTTPS enforcement enabled.
- [x] Optimized local WebP images with descriptive alt text.
- [x] Owner-provided Drive media selected, cropped and compressed locally.
- [x] Real OpenStreetMap route maps with public GPS points and visible attribution on destination pages.
- [x] No WordPress, WooCommerce or plugin bloat.
- [x] Explicit AI crawler allowances for useful indexing agents.
- [x] Official Instagram and TikTok profile links.
- [x] Official Google Maps profile link.
- [x] Official GetYourGuide supplier link added as a secondary trust/contact link.
- [x] Persistent language selector updates the document language for EN / FR / AL users.
- [x] Language switcher remains visible on mobile and desktop, and updates the `dlang` URL parameter.
- [x] Legacy WordPress tour/gallery paths still resolve to live pages (`/gjipe-boat-tour/`, `/grama-bay-boat-tour/`, `/private-boat-tour-albania/`, `/sunset-boat-tour/`, `/morning-fishing-tour/`, `/boat-photos/`) via canonical mapping.
- [x] Legacy WordPress noise paths render static noindex fallback pages and redirect visitors without leaking `NEXT_REDIRECT` into exported HTML.
- [x] Legacy WordPress media attachment `/20250721_103929/` noindexes and sends visitors to `/boat-photos/`; the old MP4 upload URL is kept so Google no longer sees a 404.
- [x] Export QA checks missing translation keys, broken internal links and GitHub Pages base-path mistakes before deploy.
- [x] Tour-specific WhatsApp booking links are localized from the active EN / FR / AL language state.
- [x] PageSpeed-flagged hero, tour and gallery images have been recompressed, and the homepage MP4 is click-to-load.
- [x] `next/image` custom quality values are configured and guarded before deploy.

## Structured Data

- [x] `LocalBusiness` on home.
- [x] `LocalBusiness` includes official profile links, map, contact point, offer catalog and Dhermi boat tour topics.
- [x] `TouristTrip` for every main tour with canonical URL, image, provider, itinerary and EUR offer data.
- [x] `WebSite`, `WebPage`, `CollectionPage`, `ItemList` and breadcrumb schema reinforce the home, tours index and tour detail pages.
- [x] `FAQPage` on home and FAQ.
- [x] `sameAs` includes official Instagram, TikTok, Google Maps and GetYourGuide profiles.
- [x] `LocalBusiness` includes Google Maps `hasMap`; review cards show the source review excerpts without invented rating copy.

## Keyword Coverage

- [x] Dhermi boat tour
- [x] Dhermi boat tours
- [x] boat tour Dhermi
- [x] Dhërmi boat tours
- [x] Albania boat tours
- [x] Riviera Albania tours
- [x] Gjipe boat tour
- [x] Blue Cave Albania
- [x] Grama Bay tour
- [x] private boat Albania

## Useful Pages

- [x] Home
- [x] Tours
- [x] Private tour
- [x] Group/shared tours
- [x] Destinations
- [x] Gjipe
- [x] Grama Bay
- [x] Blue Cave
- [x] FAQ
- [x] Contact

## Avoided

- [x] No thin spam pages.
- [x] No generated location pages without real content.
- [x] No dependency on old WordPress media URLs.
