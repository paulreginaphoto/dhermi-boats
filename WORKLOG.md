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
- Kept the official Instagram profile link and avoided fake Instagram media because the public profile did not expose downloadable posts without a logged-in/session source.
- Ran typecheck, lint, production build, npm audit and static export checks.
- Created GitHub repository `paulreginaphoto/dhermi-boats`, pushed `main`, enabled GitHub Pages and confirmed the Pages deployment workflow passes.
- Browser QA found and fixed two issues:
  - hero text needed stronger contrast and a shorter first viewport on mobile
  - gallery grid rows could collapse to zero height on desktop
- Switched the immediate deployment target to the GitHub Pages project URL while the domain is being recovered: `https://regina.photo/dhermi-boats/`.
- Removed `public/CNAME` for now and configured the workflow for the `/dhermi-boats` base path. DNS for `dhermi.boats` can be connected later.
- Reworked the tone away from upscale positioning toward clear, friendly boat trips for families, friends and everyday travelers.
- Replaced the incomplete previous icon set with local Microsoft Fluent Emoji 3D MIT icons, covering boat, contact, booking, price, people, location and social cues.
- Extended the active-language behavior on the contact page, booking CTA and footer so the FR/AL selection stays consistent through the main booking path.
- Re-ran typecheck, lint, static build, npm audit and local GitHub Pages-style browser QA after the icon and language changes.

## Current Result

The site is a static, image-led booking website with clear prices, direct WhatsApp conversion, mobile sticky CTA, floating desktop WhatsApp CTA, semantic pages, AI-readable SEO files, official social links, real social thumbnails and GitHub Pages deployment.
