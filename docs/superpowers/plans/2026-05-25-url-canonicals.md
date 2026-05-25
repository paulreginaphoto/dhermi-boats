# URL Canonicals Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the public Dhermi Boat URL architecture coherent, with one modern canonical page per tour and clean language/template behavior.

**Architecture:** Keep the existing Next.js App Router, static export, shared tour data, query-based language switcher, and current visual design. Add a dedicated URL QA script first, then update route ownership, redirects, sitemap, navigation, i18n normalization, and documentation.

**Tech Stack:** Next.js 16, React 19, TypeScript, static export, custom i18n bootstrap, Node QA scripts.

---

### Task 1: URL QA Guard

**Files:**
- Create: `scripts/qa-url-canonicals.mjs`
- Modify: `package.json`

- [ ] Add checks for the five canonical tour URLs, their exported HTML, canonical tags, hreflang tags, and legacy redirect pages.
- [ ] Add checks that public navigation and sitemap do not promote legacy tour duplicates.
- [ ] Run `npm run qa:url-canonicals` and confirm it fails before route fixes.

### Task 2: Canonical Route Ownership

**Files:**
- Modify: `data/content.ts`
- Modify: `components/navigationConfig.ts`
- Modify: `app/page.tsx`
- Modify: `app/sitemap.ts`
- Modify: `app/llms.txt/route.ts`
- Modify: `public/llms.txt`
- Modify: `public/_redirects`
- Modify: `app/tours/private/page.tsx`

- [ ] Point header/footer/menu private links to `/private-boat-tour-albania/`.
- [ ] Make `/tours/private/` a non-indexed legacy redirect to `/private-boat-tour-albania/`.
- [ ] Keep collection pages such as `/tours/`, `/tours/group/`, and `/destinations/` indexable only when they are not duplicate tour templates.
- [ ] Remove legacy tour duplicates from sitemap and public LLM link lists.

### Task 3: Language and Translation Cleanup

**Files:**
- Modify: `components/LocaleBootstrap.tsx`
- Modify: `components/LanguageProvider.tsx`
- Modify: `components/OneMinuteBooking.tsx`
- Modify: `lib/i18n.ts`
- Generated: `public/locales/translations.json`

- [ ] Normalize `?dlang=al` and `?lang=al` to `?dlang=sq` on the client.
- [ ] Ensure language switching changes only the query language and leaves the current path/template intact.
- [ ] Scan French translations for `tu`, `ton`, `ta`, `tes`, and English fallback residue, then keep French in `vous`.

### Task 4: Required Documentation

**Files:**
- Create: `docs/URL_CANONICALS.md`
- Create: `docs/QA_DHERMI_BOATS.md`

- [ ] Document canonical tour URLs, kept collection URLs, legacy redirects, language behavior, sitemap rules, and hreflang policy.
- [ ] Document the exact QA commands and expected results for this structural pass.

### Task 5: Verification and Commit

**Files:**
- Verify all changed files.

- [ ] Run `npm run translations`.
- [ ] Run `npm run qa:url-canonicals`.
- [ ] Run `npm run content:guard`, `npm run qa:i18n-links`, `npm run lint`, `npm run typecheck`, and `npm run build`.
- [ ] Verify all five canonical URLs return 200 on the static output.
- [ ] Commit the finished work on `main` and push to `origin`.
