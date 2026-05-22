# Design Review

## Direction

Mediterranean boat-tour brand for everyone: cinematic coastline, readable typography, limestone/sand background, deep navy, muted turquoise accents, large real photography, soft Lucide outline icons and direct WhatsApp booking.

## Audit Findings From Old Site

- WordPress/WooCommerce clutter reduced trust and performance.
- Navigation mixed useful tours with plugin/cart residue.
- Hero and cards were functional but did not feel warm or distinctive enough.
- Booking path was present but not persistent enough on mobile.
- SEO had useful content but also weak sitemap hygiene and legacy noise.
- Reviews, FAQ, practical info and prices were valuable and preserved.

## Improvements Made

- Rebuilt the information architecture around user intent: choose a tour, understand destinations, book fast.
- Added sticky mobile booking CTA and floating WhatsApp CTA.
- Preserved clear prices, durations, departure logic and route highlights.
- Added old-route compatibility pages with canonical URLs.
- Improved readability, spacing, image hierarchy and mobile flow.
- Added static SEO foundations and schema.org.
- Optimized images and kept video lazy with metadata preload.
- Added a clear EN / FR / AL language selector for the main conversion interface.
- Added official Instagram and TikTok paths, using real public TikTok media thumbnails and no invented production imagery.
- Added the official Google Maps path and restored the customer review excerpts from the current Dhermi Boat site.
- Added GetYourGuide as a low-emphasis external link for trust without promoting it over direct WhatsApp booking.
- Added `llms.txt` and explicit crawler guidance for better AI/search understanding.
- Replaced upscale wording with a more open, practical tone: clear prices, shared trips and private boats for normal groups.
- Replaced the older local icon assets with Lucide outline icons so every practical cue feels quieter, cleaner and consistent.
- Extended FR/AL language handling on the contact page, booking CTA and footer to avoid mixed-language booking screens.
- Replaced invented tour and review copy with the current `dhermi.boats` base text for excursions, included stops/options, FAQ and customer reviews.
- Extended the same source-copy approach through the selected language state so French and Albanian tour details, FAQ, practical info and CTAs stay aligned with the current site.
- Added a v2 conversion pass: language selector always visible on mobile, language changes reflected in the URL, shorter CTAs and a WhatsApp booking panel on tour detail pages.
- Cleaned visible filler wording from the customer experience while preserving practical source facts, prices and real review excerpts.
- Sorted the owner-provided Google Drive media by use case, then replaced the hero, tours, destinations, gallery and video with real optimized Dhermi Boat assets.

## QA Scores

Initial self-review after first render:

- Design: 8.6 / 10
- Mobile UX: 8.4 / 10
- SEO: 9.2 / 10
- Performance: 9.0 / 10
- Accessibility: 8.8 / 10
- Conversion: 9.1 / 10

Fixes applied:

- Increased hero text contrast with a restrained navy overlay and shadow.
- Shortened hero first viewport so the next section is visible on mobile and desktop.
- Fixed gallery grid row sizing so images cannot collapse to height zero.
- Rechecked mobile menu, FAQ accordion and WhatsApp link generation.
- Removed animation-dependent reveal wrappers so cards and social proof are visible in static captures, crawlers and no-motion environments.
- Added accessible language-switch labels.
- Replaced the icon system with Lucide outlines at a shared 1.75px stroke and verified the contact/social icons in the browser.
- Rechecked the French contact path so the language selector, booking CTA, footer and social links stay coherent.
- Rechecked the static export in browser for FR, AL and EN content and removed visible Google-review rating description copy.
- Rechecked the private-tour page at a 390px mobile viewport: visible language selector, sticky booking CTA, no horizontal overflow and translated French booking panel.
- Rechecked key FR/AL pages after the v2 pass: home, private tour, contact, destinations, FAQ and shared tours.
- Rechecked media choices against the local contact sheets: boat signal in the hero, cove image for Gjipe, cliff/bay image for Grama, Blue Cave image for the cave destination and a lightweight boat video for the homepage.
- Rechecked the static GitHub Pages path at 390px mobile and 1440px desktop after the Drive media pass: no horizontal overflow, EN / FR / AL selector visible, no missing asset URLs.
- Applied a softer v3 visual pass: Lucide icons everywhere, warmer sand palette, more rounded travel cards and glass-style overlays on image cards.
- Browser QA passed on mobile private FR, desktop home FR and mobile contact FR after the Lucide pass: no horizontal overflow, language selector visible, WhatsApp present and zero old icon assets loaded.

Final self-review:

- Design: 9.5 / 10
- Mobile UX: 9.5 / 10
- SEO: 9.5 / 10
- Performance: 9.5 / 10
- Accessibility: 9.3 / 10
- Conversion: 9.6 / 10

## Remaining Intentional Tradeoffs

- One optimized Drive video is used, but it is not autoplayed and only preloads metadata to protect mobile performance.
- The header and footer use a pure text logo; a custom vector mark can still be added later if the brand needs it.
- Instagram media is linked but not mirrored, because the logged-out public page did not expose reliable downloadable post media.
