# Premium V2 Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create the premium V2 homepage redesign for Dhermi Boat by Isuf on `v2-premium-redesign`, with no main commits and no push.

**Architecture:** Keep the existing Next.js App Router, Tailwind tokens, static export, localized text bootstrap, and WhatsApp helpers. Replace the current minimal homepage rail with a conversion-first page order: hero, social proof, local skipper, one five-tour comparison, gallery, contact booking form.

**Tech Stack:** Next.js 16, React 19, Tailwind CSS 3, TypeScript, existing static QA scripts.

---

### Task 1: Git safety and test gates

**Files:**
- Modify: `scripts/qa-minimal-homepage.mjs`
- Modify: `scripts/qa-five-tour-rail.mjs`

- [x] **Step 1: Verify branch**

Run: `git branch --show-current`
Expected: `v2-premium-redesign`.

- [ ] **Step 2: Write failing homepage QA**

Assert `app/page.tsx` and `out/index.html` expose the V2 sections, social proof directly after hero, a `Meet Isuf` section, one tour comparison section, no old tour rail JavaScript, and a booking message field.

- [ ] **Step 3: Run QA and confirm failure**

Run: `npm run qa:minimal-homepage`
Expected: FAIL before implementation because V2 sections and message field are missing.

### Task 2: Premium homepage implementation

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/Header.tsx`
- Modify: `app/globals.css`

- [ ] **Step 1: Replace homepage sections**

Implement the V2 page order with existing assets and native text controls: hero, reviews, skipper, tours, gallery, contact.

- [ ] **Step 2: Preserve conversion behavior**

Keep `data-whatsapp-key`, analytics attributes, WhatsApp message generation, gallery viewer, and sticky mobile CTA behavior working.

- [ ] **Step 3: Remove obsolete rail behavior**

Remove `data-tour-rail`, `tourRailScrollScript`, `data-tour-track`, and related sticky horizontal rail expectations from the homepage.

### Task 3: Multilingual copy

**Files:**
- Modify: `lib/i18n.ts`
- Generate: `public/locales/translations.json`

- [ ] **Step 1: Add EN/FR/SQ V2 copy keys**

Add clean localized strings for hero, trust, social proof, skipper, tour card labels, gallery captions, and booking form message copy.

- [ ] **Step 2: Generate locale bundle**

Run: `npm run translations`
Expected: `public/locales/translations.json` updates from `lib/i18n.ts`.

### Task 4: Verification and finish

**Files:**
- Existing repo files only unless screenshots are produced under `docs/screenshots/`.

- [ ] **Step 1: Run checks**

Run: `npm run lint`, `npm run typecheck`, `npm run build`, `npm run qa:minimal-homepage`, `npm run qa:five-tour-rail`, `npm run qa:whatsapp-messages`, and targeted content guard if needed.

- [ ] **Step 2: Browser verify**

Run the local dev server, inspect desktop and mobile, fill the booking form, verify WhatsApp preview and links.

- [ ] **Step 3: Commit locally**

Run: `git add ... && git commit -m "Create premium V2 redesign"` on `v2-premium-redesign`.
Expected: local commit only, no push.
