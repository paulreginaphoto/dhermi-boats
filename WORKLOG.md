# Worklog

## 2026-05-22

- Audited the existing WordPress site at `https://dhermi.boats`.
- Preserved useful business content: tour names, durations, prices, capacity, highlights, FAQ, reviews, WhatsApp booking logic, phone, email and Instagram.
- Identified useful pages: home, photos, Gjipe, Grama Bay, private, sunset and fishing.
- Removed WordPress/WooCommerce noise from the new information architecture.
- Downloaded and optimized selected existing images and one video clip.
- Built a new static Next.js + TypeScript + Tailwind site.
- Added pages for home, tours, private tour, shared tours, destinations, Gjipe, Grama Bay, Blue Cave, FAQ and contact.
- Added legacy route pages for old useful URLs: `/gjipe-boat-tour/`, `/grama-bay-boat-tour/`, `/private-boat-tour-albania/`, `/sunset-boat-tour/`, `/morning-fishing-tour/`.
- Added GitHub Pages deployment workflow, domain-ready config, `robots.txt`, `sitemap.xml` and SEO JSON-LD.
- Added `llms.txt` and explicit AI crawler guidance in `robots.txt`.
- Added a persistent language selector for the main booking interface: English, French and Albanian.
- Added the official TikTok profile link and real public TikTok thumbnail media from `@dhermi.boat`.
- Added the official Google Maps profile link and restored the customer review excerpts from the current Dhermi Boat site.
- Added the official GetYourGuide supplier page as a secondary link only, keeping WhatsApp as the primary booking path.
- Kept the official Instagram profile link and avoided fake Instagram media because the public profile did not expose downloadable posts without a logged-in/session source.
- Ran typecheck, lint, production build, npm audit and static export checks.
- Created GitHub repository `paulreginaphoto/dhermi-boats`, pushed `main`, enabled GitHub Pages and confirmed the Pages deployment workflow passes.
- Browser QA found and fixed two issues:
  - hero text needed stronger contrast and a shorter first viewport on mobile
  - gallery grid rows could collapse to zero height on desktop
- Switched the immediate deployment target to the GitHub Pages project URL while the domain is being recovered: `https://regina.photo/dhermi-boats/`.
- Removed `public/CNAME` for now and configured the workflow for the `/dhermi-boats` base path. DNS for `dhermi.boats` can be connected later.
- Reworked the tone away from upscale positioning toward clear, friendly boat trips for families, friends and everyday travelers.
- Replaced the local 3D icon system with Lucide outline icons across practical cues, contact cards, tour facts and booking elements.
- Applied a cleaner Lucide-only design pass with 1.75px outline icons, warmer sand/limestone tones, softer card radii and glass-style photo overlays.
- Extended the active-language behavior on the contact page, booking CTA and footer so the FR/AL selection stays consistent through the main booking path.
- Re-ran typecheck, lint, static build, npm audit and local GitHub Pages-style browser QA after the icon and language changes.
- Revisited the current `https://dhermi.boats` site and restored the base tour text, prices, durations, included stops/options, FAQ wording, "Why choose us", "Useful information" and customer review excerpts from that source.
- Extended the source-copy restoration across the selected language state so EN / FR / AL tour cards, FAQ answers, inclusions and practical information no longer fall back to invented text.
- Browser QA passed on the static GitHub Pages-style export for FR, AL and EN source-copy checks, with no visible Google-review description copy.
- Built a conversion-focused v2 pass: visible mobile language selector, shorter booking CTAs, URL-synced language state, a tour-page WhatsApp booking panel and cleaner mobile hero sizing.
- Removed visible customer-facing filler wording while keeping practical tour prices, inclusions and real review excerpts.
- Browser QA passed for mobile private-tour booking, FR/AL page localization, language switching and horizontal overflow.
- Audited the Google Drive folder `Photo & Videos Bateau`, separated photos and videos, generated local contact sheets for review, and selected real Dhermi Boat media for the site.
- Replaced the hero, tour cards, destination images, gallery images and the homepage sea video with optimized Drive media only.
- Kept the Drive intake folder local and out of git; committed only lightweight WebP/MP4 assets needed by the static site.
- Fixed the French mobile hero and compact header after browser QA so long translated titles do not create horizontal overflow and the EN / FR / AL selector remains visible.
- Browser QA passed after the Lucide pass on mobile private FR, desktop home FR and mobile contact FR: no horizontal overflow, language selector visible, WhatsApp present and no old icon assets loaded.
- Rechecked the live `https://dhermi.boats` source against the replacement site: tour prices, durations, capacity, inclusions, FAQ, reviews, WhatsApp number, email, Instagram, photos page copy, legacy tour URLs, robots rules and sitemap continuity are aligned. Kept earlier friendly wording where the original used upscale positioning.
- Restored the original Photos entry into the main navigation, mobile navigation and footer with EN / FR / AL labels.
- Audited the current media set visually and technically, then upgraded the tour card images from the best real intake assets: Gjipe aerial beach, Grama Bay aerial water, private cave boat scene, sunset bow and fishing rods at sunrise.
- Curated the visible gallery down to the strongest real sea, cave, cove and sunset images, and rebuilt the video module as a lazy-loaded muted loop with a visible play / pause control.
- Refined photo overlays and hero typography so French mobile titles stay inside the viewport while the photography remains visible.
- Verified mobile media rendering at 390px: no horizontal overflow, selected tour images load at 960 x 720, gallery images load at 640 x 480, and the video source loads only when it is near the viewport.
- Added a one-minute booking tunnel on the home and contact pages: tour choice, date, time, people, name, phone, notes, generated WhatsApp message and email fallback.
- Added a static-compatible email route through `bookingFormEndpoint` with FormSubmit and documented the GitHub Pages limitation: no private backend can run directly on GitHub Pages.
- Improved the locale bootstrap so translated labels inside hydrated client components are translated after they appear in the DOM.
- Replaced the illustrative sea-route maps with real OpenStreetMap tile maps for Gjipe, Grama Bay and Blue Cave.
- Added public GPS coordinates for Dhërmi beach area, Pirates Cave, Gjipe, Pigeon Cave, Blue Cave and Grama Bay, plus visible coordinate lists and OpenStreetMap attribution.
- Optimized the real route map cards for mobile with readable markers, offset close points on Grama Bay and EN / FR / AL labels.
- Fixed internal navigation paths for the GitHub Pages `/dhermi-boats` base path so nav links, tour cards, destination cards and CTA buttons stay inside the deployed site.
- Audited all selected-language states again for EN / FR / AL, then fixed remaining mixed-language labels in booking CTAs, footer text, quick booking labels and tour-specific WhatsApp messages.
- Added a static QA script for exported HTML that checks translation key coverage, GitHub Pages base-path links, missing route targets and legacy redirect output.
- Reworked legacy WordPress noise routes to render static noindex pages with client-side fallback redirects instead of exporting `NEXT_REDIRECT` payloads.
- Reduced the PageSpeed media payload by recompressing the main tour images, hero image variants and the homepage MP4, then changed the video module so the MP4 source is not present until the visitor taps play.
- Replaced the hero image renderer with a static responsive `picture` element so mobile uses the lightweight AVIF hero and desktop keeps the larger image.
- Raised text contrast in dark photo and footer areas, removed false `aria-current` states, and added accessible labels to the booking stepper controls.

## Current Result

The site is a static, image-led booking website with clear prices, a one-minute WhatsApp booking tunnel, email backup, mobile sticky CTA, floating desktop WhatsApp CTA, semantic pages, search-readable SEO files, official social links, real social thumbnails, sorted Drive media, real mobile GPS maps, localized WhatsApp flows and GitHub Pages-safe navigation.
