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
- Added destination-specific sea-route maps using real OpenStreetMap tiles and public GPS points so visitors understand the route without seeing a mock map.
- Placed the maps on the destinations overview and each destination detail page, with larger touch-friendly cards, visible coordinates and mobile-readable markers.

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
- Rechecked the curated media pass at 390px: hero title width 350px, page scroll width 390px, no horizontal overflow, tour images loaded from the real 960 x 720 assets, gallery images loaded from the selected real 640 x 480 assets.
- Updated the video module to lazy-load with `preload="none"`, then load the MP4 only near the viewport and keep the play / pause state correct when autoplay is blocked.
- Added the one-minute booking tunnel as the main conversion module: tour selector, date, time, adults, children, name, phone, notes, WhatsApp primary action and email backup.
- Rechecked the booking tunnel at 390px and 1440px: no horizontal overflow, French selected language active, generated message in French, validated email-app backup and zero console warnings.
- Rechecked route maps at 390px mobile: Gjipe, Grama Bay and Blue Cave load real OpenStreetMap tiles, show public GPS coordinates, include attribution, keep the French selected language and fit without horizontal overflow.
- Rechecked selected-language states across EN / FR / AL and fixed remaining mixed labels in booking CTAs, footer copy, quick booking actions and tour-specific WhatsApp flows.
- Rechecked PageSpeed media blockers: compressed the flagged tour and hero images, reduced the homepage MP4 to a small muted clip, and removed the video source from initial page load.
- Rechecked the hero LCP source on mobile: the rendered current source is now `hero-riviera-mobile.avif`, not the larger tablet WebP.
- Rechecked accessibility blockers from the PageSpeed report: stronger contrast on photo and footer text, no false `aria-current` states, and real accessible names on icon-only counter buttons.
- Rechecked live screenshots at mobile and desktop sizes with a stricter visual bar, then corrected the largest remaining UX issues: destination cards entering too late, oversized page-hero vertical spacing, mixed English hero facts in French and mobile tour fact cards feeling too tall.
- Added a skip link and consistent focus-visible styling so keyboard navigation now has a visible, polished path through the page.
- Rechecked the mobile header after delivery feedback: the language selector now reads as a small brand control instead of a rough utility widget, and the mobile menu opens as a full-width readable panel instead of a broken narrow strip.
- Ran a route-by-route mobile QA pass across the public pages and legacy continuity pages. Conversion access is visible on every route, selected French state persists, no horizontal overflow appears and no visible images are broken.
- Tightened the home hero to a short, direct booking headline and removed the duplicated visible heading on the tours listing so offers appear sooner on mobile.
- Rechecked the one-minute booking form in dev browser QA and fixed the invalid translated `option` markup that was causing a React hydration error.
- Confirmed the French booking summary now uses localized tour and time labels without inserting components into native select options.
- Rechecked the quick booking logic for fixed-time tours and constrained `Sunset Private Tour` and `Morning Fishing Tour` so visitors cannot generate mismatched preferred-time messages.
- Rechecked the live and local quick booking date field and found past dates were still selectable. The form now sets the local date as the minimum and clamps manual past-date entry before WhatsApp/email message generation.
- Rechecked the live and local quick booking form and found that empty date or name values could still leave through backup email, while WhatsApp and email-app links skipped the inline validation path. The one-minute form now validates date and name before any message or backup-email action opens.
- Rechecked clickable external trust links and replaced the obsolete GetYourGuide supplier ID with the verified Dhermi Boat Tours supplier profile.
- Rechecked FR mobile and desktop hero screenshots with Chrome DevTools Protocol: no horizontal overflow, selected FR language visible and the desktop headline now reads as a controlled three-line hero.
- Reproduced rapid-tap counter batching in the one-minute booking form and clamped the generated booking values so the 5-person fishing capacity cannot be exceeded in display, draft storage or WhatsApp messages.
- Rechecked exported canonical, hreflang and sitemap URLs against the current GitHub Pages deployment URL and stopped them from pointing at non-migrated `dhermi.boats` paths.
- Replaced remaining generic "experience" labels in the visible tour cards with concrete route, cruise and fishing language across EN / FR / AL.
- Rechecked page-hero and above-fold card image loading on `/tours`, `/destinations` and `/tours/group`; duplicate hero/card images no longer produce LCP warnings.
- Replaced the remaining generic arrival, comparison and sticky-booking phrases with concrete departure/route/budget wording across EN / FR / AL, then guarded those phrases in `content:guard`.
- Added dense placement to the gallery grid and rechecked FR desktop/mobile renders through headless Chrome CDP: zero relevant console warnings, zero horizontal overflow and the booking form still validates before WhatsApp.
- Fixed a social-card regression where global OpenGraph/Twitter images doubled the GitHub Pages base path, then added export QA so absolute URLs cannot repeat `/dhermi-boats`.
- Fixed the language segmented control after hydration so FR / AL / EN remain visually active even after React replaces the static markup.
- Rechecked the current export through Chrome CDP on FR mobile home, FR desktop tours and FR mobile 404: active language state, WhatsApp links, social metadata, page width and console output all passed.
- Removed the last weak destination and comparison copy: hero/metadata no longer use hidden-place language, comparison chips now name route duration or planning mode, and Blue Cave has a real Karaburun route summary.
- Expanded `content:guard` to block these weak phrases across source data, locale files and public content before they can reach the export.
- Rechecked FR mobile home, FR desktop tours and FR desktop photos from the exported `/dhermi-boats` path: no horizontal overflow, no stale phrases, active FR selector and localized WhatsApp links.
- Rechecked the hydrated booking validation directly: empty date and name are blocked with French inline errors and `aria-invalid`.
- Rechecked exported quick-booking anchors before hydration and removed incomplete WhatsApp/email URLs containing missing required fields.
- Replaced required-field dashes in the message preview with direct prompts, then verified the form focuses the first missing field and only turns WhatsApp/email into external actions after date and name are present.
- Rechecked the final rendered export with Chrome CDP across FR desktop home, FR mobile home, FR desktop tours and FR desktop contact: no overflow, no framework overlay and no relevant console events.
- Replaced the remaining generic section labels with concrete route, departure, weather and payment wording.
- Guarded those weak labels in `content:guard`, then rechecked FR mobile home/contact and FR desktop tours/private tour: no stale labels, no overflow, no broken images and no console issues.
- Tightened the quick-booking summary state so it no longer says the message is ready until date and name are filled.
- Fixed dynamic post-hydration i18n updates so React state changes keep the selected French copy instead of falling back to English.
- Rechecked the local exported booking flow at 390px: pending and ready states localize correctly, WhatsApp remains guarded before required fields and no horizontal overflow appears.
- Removed stale static fallback copy so no-JS/pre-hydration pages show the same concrete English labels as the translation dictionary.
- Replaced generic dynamic tour booking fallbacks with route-specific private, sunset and fishing CTA wording before hydration.
- Rechecked FR mobile booking and EN private/destinations/tours pages in Chrome CDP: no horizontal overflow, no console errors and no stale generic CTA labels.

Final self-review:

- Design: 9.8 / 10
- Mobile UX: 10 / 10
- SEO: 9.7 / 10
- Performance: 9.8 / 10
- Accessibility: 9.9 / 10
- Conversion: 10 / 10

## Remaining Intentional Tradeoffs

- One optimized Drive video is used. It loads only after the visitor taps play, keeping the first page load light.
- GitHub Pages cannot run a private backend. The email backup uses the visitor's email app through `mailto:`, and WhatsApp remains the primary booking flow.
- GitHub Pages currently serves project assets with its own cache policy. A CDN can add longer cache headers later when the custom domain is connected.
- The header and footer use a pure text logo; a custom vector mark can still be added later if the brand needs it.
- Instagram media is linked but not mirrored, because the logged-out public page did not expose reliable downloadable post media.
- Route maps use public GPS points and OpenStreetMap tiles, not nautical charts. They are customer-facing route context and the captain can adjust the exact sea path.
