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
- Added a static-compatible email-app fallback and documented the GitHub Pages limitation: no private backend can run directly on GitHub Pages.
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

## 2026-05-23

- Ran a hard visual QA pass from live and local screenshots across mobile destinations, mobile home, mobile private tour, desktop home and desktop destinations.
- Found that the destinations overview had too much empty dark space before useful card content, and fixed the section blend, card height, overlay density and spacing.
- Found that the desktop hero headline was visually heavy and reduced its largest breakpoint size while preserving the cinematic image lead.
- Localized the hero price and capacity facts so French visitors see `200 € / heure` and `15 pers.` instead of mixed English values.
- Added a keyboard skip link and global focus-visible outlines for cleaner accessibility without changing the visual brand.
- Tightened mobile tour detail fact cards so duration, price, capacity and departure scan faster above the main booking panel.
- Reproduced the mobile menu bug: the open panel was only 34px wide because it was absolutely positioned inside the 44px menu control.
- Rebuilt the mobile menu as a viewport-width panel with an opaque readable surface, stronger backdrop, clean hamburger / close state and touch-friendly navigation rows.
- Redesigned the language selector into a cleaner compact segmented control and updated language links so they preserve the current path, query and hash.
- Ran a complete mobile audit across all exported useful pages and legacy continuity pages, checking 22 routes for HTTP status, horizontal overflow, visible booking access, selected language, broken visible images, internal base-path links and forbidden copy.
- Tightened the home hero into a clearer conversion headline, reduced its mobile height, removed the repeated Tours heading on the tours listing and added the missing visible H1 on the photos page.
- Found a React hydration error in the one-minute booking form caused by translated components inside native `option` elements.
- Reworked the booking form options to render plain text, kept FR / AL / EN labels coherent in the generated WhatsApp message and added a content guard so this cannot regress silently.
- Added the custom Next image quality values to `next.config.mjs` and extended the content guard to catch unconfigured `next/image` quality values before deployment.
- Found a booking-quality issue in the one-minute form: fixed-time tours could still generate WhatsApp messages with incompatible preferred times.
- Constrained `Sunset Private Tour` to the sunset option and `Morning Fishing Tour` to the existing 5 AM to 8 AM source time, then added a content guard so those fixed-time mappings cannot disappear silently.
- Audited local and live mobile booking again and found that the one-minute date field accepted past dates.
- Added a client-side local minimum date and manual-entry clamp so a past date cannot appear in the generated WhatsApp booking message, then guarded the behavior in `content:guard`.
- Audited local and live mobile booking again and found that the one-minute form could still send without a date or name, and the WhatsApp / email-app links bypassed the inline validation path.
- Added required date and name checks across WhatsApp and email-app actions, kept phone optional for fast WhatsApp contact, and extended `content:guard` so the booking-quality guard cannot silently regress.

## 2026-05-24

- Audited the homepage copy for repeated section labels, vague sales language and visible emoji use.
- Replaced repeated labels such as duplicate tour, social, destination and experience headings with concrete route and booking copy across EN / FR / AL.
- Removed visible emojis from Albanian language copy and social card metadata, then added a `content:guard` rule to block future visible emoji regressions.
- Found that the quick booking counters could exceed the real tour capacity, especially the 5-person fishing tour.
- Added per-tour capacity limits, disabled counter controls at the limit and a visible tour capacity line in the booking form.
- Found that the FormSubmit backup endpoint currently returns 521, so the email fallback could send visitors to an unavailable service.
- Replaced the FormSubmit action with a validated `mailto:` backup using the generated booking message, and updated docs to match the current static behavior.
- Verified internal base-path links, clickable external links, no-slop content guard, typecheck, lint and production builds.
- Audited clickable external links again and found the GetYourGuide supplier URL used an obsolete supplier ID.
- Replaced the GetYourGuide constant with the verified `dhermi-boat-tours-s702528` supplier profile and added a content guard so the old ID cannot return.
- Rechecked local FR mobile and desktop renders with Chrome DevTools Protocol: no horizontal overflow, FR active, mobile menu visible and the corrected GetYourGuide href present.
- Tightened the desktop hero typography so the long French headline fits as a clean three-line hero instead of a broken tall stack.
- Reproduced a rapid-tap booking bug where the fishing tour counters could temporarily exceed the 5-person capacity under batched React updates.
- Clamped derived booking values for display, saved drafts and generated messages, then rechecked the mobile booking flow: invalid date/name sends are blocked and fishing remains capped at 5.
- Audited all exported external URLs and found canonical, hreflang and sitemap links still pointed to `https://dhermi.boats` while the custom domain has not migrated; several of those live URLs returned 404.
- Changed canonical generation to default to the deployed public URL (`NEXT_PUBLIC_SITE_ORIGIN` + `NEXT_PUBLIC_BASE_PATH`) unless an explicit canonical override is provided, then added QA coverage and a GitHub Pages workflow step to prevent regressions.
- Rechecked all exported external URLs after rebuild: 74 checked, no hard failures, and GitHub Pages canonical paths returned 200.
- Replaced a few visible generic "experience" labels with concrete route/cruise/fishing wording across EN / FR / AL.
- Removed the Next image `priority` prop on page heroes in favor of `preload`, and prioritized above-fold duplicate card images on destinations and shared tours so they no longer trigger LCP warnings when they reuse the hero photo.
- Captured fresh FR mobile and desktop screenshots and ran a headless Chromium booking flow: no mobile overflow, required date/name errors show, fishing capacity stays 5, WhatsApp/email messages include the selected date and name, and `/tours`, `/destinations` and `/tours/group` show zero LCP warnings.
- Audited the delivered export again and found one remaining PageHero LCP warning plus generic arrival/comparison/sticky copy in EN / FR / AL.
- Added `content:guard` coverage for PageHero eager loading and a multilingual visible-copy blocklist for generic phrases.
- Replaced the generic labels with concrete booking/departure copy, added dense gallery placement and rechecked 80 generated external URLs: 79 returned 200 and only GetYourGuide returned an expected bot-block 403.
- Rechecked FR desktop `/tours/` and mobile home booking with headless Chrome CDP: no framework overlay, no relevant console errors or LCP warnings, no horizontal overflow, validation works and fishing capacity remains capped at 5.
- Audited the current export again and found global OpenGraph/Twitter image metadata resolving to `https://regina.photo/dhermi-boats/dhermi-boats/images/hero-riviera.webp`; changed the social image URL to a canonical absolute asset URL and added export QA for duplicated base paths.
- Rechecked rendered FR pages and found the locale bootstrap translated text after hydration but did not reapply the active FR state to the language selector; resynced the switcher in the same observer cycle as localized text.
- Rechecked the final export with HTTP and Chrome CDP: 101 generated external URLs had no hard failures, FR mobile home / desktop tours / mobile 404 had no overflow, no console issues, working social image metadata and active FR controls.

- Re-audited visible copy for remaining generic delivery phrases and replaced `hidden caves`, `hidden coves`, `hidden beaches`, vague comparison labels and the bare `Blue Cave.` destination summary with concrete route, duration and Karaburun wording across EN / FR / AL.
- Extended `content:guard` so those weak phrases cannot return in app, component, data, locale or public content.
- Rechecked the GitHub Pages-style export in headless Chrome CDP: FR mobile home, FR desktop tours and FR desktop photos have no horizontal overflow, no old phrases, active FR state, localized WhatsApp links and no relevant console events.
- Rechecked the quick booking action by triggering the hydrated WhatsApp link directly: empty date and name now show the French inline errors and set `aria-invalid`.
- Rechecked 101 generated external URLs after the copy pass: 100 returned OK and only GetYourGuide returned the expected bot-protection 403.
- Re-audited the exported booking form links and found the static HTML still exposed pre-hydration WhatsApp and email actions with `Date: -` and `Name: -` in the message body.
- Guarded exported booking action links and visible required-field placeholders in `qa:i18n-links`, then changed the form so WhatsApp and email stay on the missing field until date and name are filled.
- Rechecked the exported `/dhermi-boats` path with Chrome CDP on FR desktop home, FR mobile home, FR desktop tours and FR desktop contact: no overflow, no framework overlay, no console issues, guarded form links, French validation errors and ready WhatsApp/email links after date/name entry.
- Rechecked 100 generated external HTTP URLs after the booking-link fix: 99 returned OK and only GetYourGuide returned the expected bot-protection 403.
- Re-audited remaining generic labels such as route detail, best-fit and practical-info headings across EN / FR / AL.
- Added a red `content:guard` blocklist for those weak labels, then replaced them with concrete route, departure, weather and payment wording.
- Rechecked the exported `/dhermi-boats` path with Chrome CDP on FR mobile home, FR mobile contact, FR desktop tours and FR desktop private tour: no overflow, active FR state, no stale labels, no broken images and no relevant console events.
- Rechecked generated external HTTP URLs after the label pass: 99 OK, GetYourGuide expected 403, zero hard failures.
- Re-audited the one-minute booking summary and found it still said the message was ready before required date and name were present.
- Split the summary into pending and ready states across EN / FR / AL, then guarded the two-state behavior in `content:guard`.
- Found that dynamic React `data-i18n` key changes could re-render in English after hydration; updated the locale bootstrap observer to catch data-i18n attributes and text mutations.
- Rechecked the exported FR booking flow locally through Chrome CDP: pending summary says `Date et nom à ajouter`, WhatsApp stays on `#quick-date`, filled date/name switch the summary to `Message prêt`, the generated WhatsApp URL is French and there are no relevant console events.
- Re-audited static English fallbacks and found several no-JS/pre-hydration labels still using stale generic copy such as duplicate reviews, generic photo labels and "Choose your tour".
- Added `content:guard` coverage so simple `LocalizedText` fallbacks must match the EN dictionary, then corrected the stale fallbacks on photos, destinations, tours, shared tours, home reviews and destination detail pages.
- Found dynamic tour booking CTAs could still render "Book this tour" before hydration for private, sunset and fishing offers; added a guard and centralized tour booking CTA keys/fallbacks.
- Rechecked the GitHub Pages-style export: internal i18n links passed, 95 external URLs had no hard failures, and Chrome CDP passed FR mobile booking plus EN private/destinations/tours fallback checks with no overflow or console issues.

## Current Result

The site is a static, image-led booking website with clear prices, a one-minute WhatsApp booking tunnel, guarded pre-hydration booking links, explicit pending/ready booking summary states, required date and name checks, email backup, fixed-time tour constraints, mobile sticky CTA, floating desktop WhatsApp CTA, semantic pages, search-readable SEO files, valid social-card image metadata, official social links, real social thumbnails, sorted Drive media, real mobile GPS maps, localized WhatsApp flows, hydration-safe language controls, GitHub Pages-safe navigation, guarded route-specific visible copy and guarded no-JS English fallbacks.

## 2026-05-25 Custom Domain Reconnection

- Switched the GitHub Pages workflow from `https://regina.photo/dhermi-boats/` to `https://dhermi.boats/` with an empty `NEXT_PUBLIC_BASE_PATH`.
- Restored `public/CNAME` for `dhermi.boats`.
- Updated `llms.txt`, deployment notes and DNS notes so production URLs use the custom domain root.
- Confirmed the GitHub Pages repository setting already has `dhermi.boats` configured, the certificate is approved and HTTPS enforcement is enabled.

## 2026-05-25 SEO Technical Audit For Dhermi Boat Tour

- Audited indexable metadata, sitemap, robots, hreflang, legacy WordPress routes, visible headings, internal tour links and JSON-LD schema against the target query cluster around `dhermi boat tour`.
- Tightened homepage, tours, destination, FAQ, contact and photo metadata so the exact non-accented query and route-specific variants appear naturally in titles and descriptions.
- Expanded structured data with reusable LocalBusiness, WebSite, WebPage, TouristTrip, CollectionPage, ItemList, Offer and breadcrumb schema across home, tours and detail pages.
- Strengthened visible copy and internal CTA labels around route, price, local skipper, WhatsApp booking, Gjipe, Grama Bay, Blue Cave and private Dhermi boat tours without adding thin SEO-only pages.

## 2026-05-25 Search Console 404 Fix

- Reproduced the new Search Console 404 pattern against the live site: old WordPress attachment `/20250721_103929/` and media file `/wp-content/uploads/2026/02/20250721_103929.mp4` returned 404.
- Added a static noindex fallback for `/20250721_103929/` that canonicalizes and redirects visitors to `/boat-photos/`.
- Restored the old MP4 upload path as a static file so crawlers and users no longer hit a missing resource while the old WordPress result drops out of search.
- Extended URL canonical QA to check legacy media attachment routes and restored media files after every export.
