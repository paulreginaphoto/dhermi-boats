# Final Release SEO Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Finalize technical SEO, performance hygiene, analytics readiness, and release QA for dhermi.boats without changing commercial facts.

**Architecture:** Keep the static Next.js export and add automated release checks that read both source and generated `out/` HTML. SEO changes stay declarative in metadata, sitemap, robots and JSON-LD helpers; analytics is added as an environment-driven script that reads existing `data-analytics-event` attributes.

**Tech Stack:** Next.js static export, React Server Components, inline analytics bootstrap, Node QA scripts.

---

### Task 1: Release QA Guard

**Files:**
- Create: `scripts/qa-final-release.mjs`
- Modify: `package.json`

- [x] **Step 1: Add QA checks**

Create a script that checks generated public pages for unique title/meta, canonical tags, hreflang tags, LocalBusiness JSON-LD, visible FAQ JSON-LD, safe TouristTrip schema, sitemap contents, robots exclusions, raw image dimensions, tracking event coverage and final checklist existence.

- [x] **Step 2: Run QA red**

Run: `npm run qa:final-release`

Expected: fail before implementation because `docs/FINAL_RELEASE_CHECKLIST.md`, sitewide analytics support and some tracking/performance/source checks are missing.

### Task 2: SEO And Indexing

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/tours/group/page.tsx`
- Modify: `app/destinations/gjipe/page.tsx`
- Modify: `app/destinations/grama-bay/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `components/TourDetailPage.tsx`

- [x] **Step 1: Add sitewide LocalBusiness JSON-LD**

Render LocalBusiness and WebSite schema from the layout so every public page has business data.

- [x] **Step 2: Keep duplicate pages out of index surfaces**

Remove duplicate helper pages from sitemap and mark them noindex with canonical to the strongest canonical route.

- [x] **Step 3: Make FAQ JSON-LD match visible FAQs**

Use only FAQs rendered in the visible FAQ groups and add FAQPage schema to tour detail FAQ sections.

### Task 3: Analytics Readiness

**Files:**
- Create: `components/Analytics.tsx`
- Modify: `app/layout.tsx`
- Modify: external CTA components/pages with missing event names

- [x] **Step 1: Add env-driven GA4/GTM support**

Support `NEXT_PUBLIC_GA_MEASUREMENT_ID` and `NEXT_PUBLIC_GTM_ID`, rendering external scripts only when values exist.

- [x] **Step 2: Track click events**

Install a click listener that sends `data-analytics-event` clicks to `dataLayer` and `gtag`, including URL, text, tour and placement metadata.

- [x] **Step 3: Add missing event attributes**

Ensure phone, email, maps, Instagram, TikTok and GetYourGuide links have event names.

### Task 4: Performance And Accessibility Hygiene

**Files:**
- Modify: `components/HeroCinematic.tsx`
- Modify: `components/SeaRouteMap.tsx`
- Modify: `components/VideoFeature.tsx`

- [x] **Step 1: Add raw image dimensions**

Add `width` and `height` to the remaining raw `<img>` elements.

- [x] **Step 2: Keep heavy media below fold or lazy**

Keep social media previews as static lazy images and set videos to `preload="none"` with a poster.

### Task 5: Final Checklist And Verification

**Files:**
- Create: `docs/FINAL_RELEASE_CHECKLIST.md`

- [x] **Step 1: Document public URL status**

Add a table for the requested public URLs with pass/fail/redirect/manual-check status.

- [x] **Step 2: Run final commands**

Run build, lint, typecheck, content guard, URL/i18n/conversion/final QA, and browser QA.
