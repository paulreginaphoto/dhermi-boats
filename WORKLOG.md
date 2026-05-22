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
- Added GitHub Pages deployment workflow, `CNAME`, `robots.txt`, `sitemap.xml` and SEO JSON-LD.
- Ran typecheck, lint, production build, npm audit and static export checks.
- Browser QA found and fixed two issues:
  - hero text needed stronger contrast and a shorter first viewport on mobile
  - gallery grid rows could collapse to zero height on desktop

## Current Result

The site is a static, premium, image-led booking website with direct WhatsApp conversion, mobile sticky CTA, floating desktop WhatsApp CTA, semantic pages and GitHub Pages deployment.

