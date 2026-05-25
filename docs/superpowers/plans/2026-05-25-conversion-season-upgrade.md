# Conversion Season Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the Dhermi Boat site feel ready for high season by improving above-the-fold trust, tour choice speed, French tone, WhatsApp booking clarity, and mobile conversion.

**Architecture:** Keep the existing Next.js App Router structure, Tailwind styling, shared tour data, i18n map, and static export workflow. Add content guard rules first, then update shared content and the components that consume it.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS, static export, custom i18n bootstrap, Node content guard.

---

### Task 1: Conversion Guard Rails

**Files:**
- Modify: `scripts/content-guard.mjs`

- [ ] Add checks for the high-season hero copy, 30-second tour choice copy, FR vouvoiement, WhatsApp message fields, richer FAQ objections, WordPress residue, and the mobile sticky bar actions.
- [ ] Run `npm run content:guard` and confirm the new checks fail before content edits.
- [ ] Keep the guard rules narrow so proper names and existing SEO phrases still pass.

### Task 2: Shared Content and i18n

**Files:**
- Modify: `data/content.ts`
- Modify: `lib/i18n.ts`
- Modify: `lib/whatsappMessages.ts`
- Generated: `public/locales/translations.json`

- [ ] Update hero/trust/tour comparison data to guide visitors faster.
- [ ] Add detailed WhatsApp templates with date, adults, children, preferred time, hours, and route fields.
- [ ] Expand FAQ answers around departure, parking, payment, weather, children, life jackets, bags, swim timing, shared/private trips, Gjipe drop-off, and languages.
- [ ] Clean French translations to use `vous` and remove avoidable English route fragments.

### Task 3: Visible Components

**Files:**
- Modify: `components/HeroCinematic.tsx`
- Modify: `components/TourComparison.tsx`
- Modify: `components/StickyBookingBar.tsx`
- Modify: `app/page.tsx`
- Modify: `app/tours/page.tsx`

- [ ] Make the hero subtitle match the booking promise and show trust facts above the fold.
- [ ] Rename the comparison section to "Choose your tour in 30 seconds" and present the "for who / duration / price / CTA" hierarchy.
- [ ] Replace the mobile sticky bar with four compact actions: WhatsApp, Tours, Prices, Call.

### Task 4: Verification and Commit

**Files:**
- Verify all changed files.

- [ ] Run `npm run translations`.
- [ ] Run `npm run content:guard`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Open the local site in a browser and check desktop/mobile hero, comparison, FR locale, and sticky CTA.
- [ ] Commit the finished work on `main`.
