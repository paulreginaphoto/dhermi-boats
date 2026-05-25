# Conversion UX Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Improve booking conversion cues and WhatsApp tracking across the public Dhermi Boat pages without changing prices, tour facts, routes, durations, contacts, or real reviews.

**Architecture:** Keep the existing static Next.js structure and add small conversion helpers instead of redesigning components. WhatsApp links remain static for crawlability, then the locale bootstrap updates their message and analytics language when `?dlang` changes.

**Tech Stack:** Next.js static export, React Server Components, client-side locale bootstrap, Node QA scripts.

---

### Task 1: Conversion QA Guard

**Files:**
- Create: `scripts/qa-conversion-ux.mjs`
- Modify: `package.json`

- [ ] **Step 1: Write the failing QA script**

Create a Node script that checks:
- `docs/CONVERSION_AUDIT_FIXES.md` exists.
- WhatsApp templates include tour/date/adults/children/preferred time/questions.
- Analytics-ready WhatsApp events use `whatsapp_click_{tour}_{language}_{placement}` through `data-analytics-event-template`.
- Locale bootstrap rewrites analytics language after `?dlang` changes.
- Trust block and photo conversion captions exist.
- Main generic WhatsApp events are removed from CTA components.

- [ ] **Step 2: Run the QA script to verify it fails**

Run: `npm run qa:conversion-ux`

Expected: FAIL because current CTA events are generic and the conversion audit doc does not exist.

### Task 2: WhatsApp Messages And Analytics Helpers

**Files:**
- Create: `lib/conversion.ts`
- Modify: `lib/whatsappMessages.ts`
- Modify: `lib/site.ts`
- Modify: `components/ButtonLink.tsx`
- Modify: `components/LocaleBootstrap.tsx`

- [ ] **Step 1: Add conversion event helpers**

Add `conversionEvent()` and `conversionAttrs()` so every WhatsApp CTA can emit a stable source event such as `whatsapp_click_gjipe_en_tour_hero`, while exposing `data-analytics-event-template="whatsapp_click_{tour}_{language}_{placement}"`.

- [ ] **Step 2: Standardize message templates**

Update each WhatsApp template to include tour name, date, adults, children, preferred time, and questions in English, French, and Albanian.

- [ ] **Step 3: Update locale bootstrap**

When active locale changes, update both WhatsApp `href` and `data-analytics-event` language from `data-analytics-tour` and `data-analytics-placement`.

### Task 3: Shared CTA Components

**Files:**
- Modify: `components/BookingCTA.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/MobileNav.tsx`
- Modify: `components/Footer.tsx`
- Modify: `components/StickyBookingBar.tsx`
- Modify: `components/WhatsAppFloatingButton.tsx`
- Modify: `components/LazyOneMinuteBooking.tsx`
- Modify: `components/OneMinuteBooking.tsx`

- [ ] **Step 1: Convert shared WhatsApp CTAs**

Pass `analyticsPlacement` and `analyticsTour` through `ButtonLink` or `conversionAttrs()` for header, footer, mobile menu, sticky mobile bar, floating desktop button, fallback booking, and generated booking form.

- [ ] **Step 2: Keep calls and emails unchanged**

Retain existing phone and email destinations and only keep their non-WhatsApp analytics names.

### Task 4: Page And Tour Conversion Blocks

**Files:**
- Create: `components/ConversionTrustBlock.tsx`
- Modify: `components/HeroCinematic.tsx`
- Modify: `components/TourDetailPage.tsx`
- Modify: `components/TourCard.tsx`
- Modify: `components/TourComparison.tsx`
- Modify: `app/page.tsx`
- Modify: `app/tours/page.tsx`
- Modify: `app/tours/group/page.tsx`
- Modify: `app/faq/page.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/not-found.tsx`

- [ ] **Step 1: Add consistent trust block**

Add a reusable trust block using existing facts only: local skipper, Albanian/French/good English, real reviews, Google Maps link, GetYourGuide link.

- [ ] **Step 2: Standardize above-the-fold CTAs**

Ensure main pages and tour pages have a visible primary action near the hero, using placement-specific WhatsApp events where the primary action is WhatsApp.

### Task 5: Tours, Photos, And Destinations

**Files:**
- Modify: `app/tours/page.tsx`
- Modify: `app/boat-photos/page.tsx`
- Modify: `app/destinations/page.tsx`
- Modify: `components/DestinationDetailPage.tsx`
- Modify: `lib/i18n.ts`

- [ ] **Step 1: Make `/tours/` a faster choice page**

Keep existing tour data and labels for best value, most complete, private/family, sunset/couple, and fishing/morning.

- [ ] **Step 2: Make `/boat-photos/` conversional**

Add real photo captions tied to canonical tour pages and contextual WhatsApp CTA links.

- [ ] **Step 3: Link destinations to tours**

Make destination cards and detail pages clearly link to the relevant tour pages, while keeping destination detail URLs available.

### Task 6: Documentation And Verification

**Files:**
- Create: `docs/CONVERSION_AUDIT_FIXES.md`

- [ ] **Step 1: Document CTA templates and events**

List every WhatsApp template, language, and placement family added.

- [ ] **Step 2: Run full verification**

Run:
- `npm run qa:conversion-ux`
- `npm run qa:i18n-links`
- `npm run qa:url-canonicals`
- `npm run content:guard`
- `npm run lint`
- `npm run typecheck`
- `npm run build`

- [ ] **Step 3: Browser QA**

Open the exported site locally and check desktop and mobile widths for `/`, `/tours/`, `/boat-photos/`, `/destinations/`, and each canonical tour page. Confirm sticky mobile CTA appears, WhatsApp links are populated, and there is no obvious overflow.
