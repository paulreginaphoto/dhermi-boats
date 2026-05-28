# Dhermi Scroll Polish Report

Date: 2026-05-28

## Result

Self-score after visual QA: 9.5 / 10.

The 5-tour homepage rail now behaves as a clean vertical-triggered horizontal section on mobile and desktop:

- Mobile shows one full tour card at a time.
- Desktop large screens show three full cards at a time.
- The rail moves in stable snap steps instead of leaving half text cards on screen.
- Tour CTAs stay visible inside the viewport.
- The mobile sticky booking bar hides while the rail is active so it does not cover card buttons.
- Short mobile viewports were tuned with a compact rail layout.

## Main changes

- Rebuilt `tourRailScrollScript` to measure real card/window widths and calculate snap steps.
- Reworked rail CSS for mobile, tablet and desktop card counts.
- Reduced rail card height with panoramic images and tighter copy hierarchy.
- Added small-height mobile rules so cards and CTAs stay visible on short screens.
- Shortened rail card CTAs to `Détails` / `WhatsApp` across EN / FR / AL.

## Files touched

- `app/page.tsx`
- `app/globals.css`
- `lib/i18n.ts`
- `public/locales/translations.json`
- `DHERMI_SCROLL_POLISH_REPORT.md`
- `docs/screenshots/scroll-polish-final/*`

## Verification

- `npm run lint`
- `npm run typecheck`
- `npm run content:guard`
- `npm run build`
- `npm run qa:minimal-homepage`
- `npm run qa:conversion-ux`
- `npm run qa:five-tour-rail`
- `npm run qa:i18n-links`
- `npm run qa:url-canonicals`
- `npm run qa:final-release`
- `npm run test:date-format`
- Browser runtime check on `http://127.0.0.1:4173/`: 0 console errors, 5 rail cards, no document horizontal overflow.

## Final screenshots

- `docs/screenshots/scroll-polish-final/mobile-rail-gjipe.png`
- `docs/screenshots/scroll-polish-final/mobile-rail-private.png`
- `docs/screenshots/scroll-polish-final/mobile-short-rail-private.png`
- `docs/screenshots/scroll-polish-final/desktop-rail-start.png`
- `docs/screenshots/scroll-polish-final/desktop-rail-mid.png`
- `docs/screenshots/scroll-polish-final/desktop-rail-end.png`
- `docs/screenshots/scroll-polish-final/mobile-home.png`
- `docs/screenshots/scroll-polish-final/mobile-tours.png`
- `docs/screenshots/scroll-polish-final/desktop-home.png`
- `docs/screenshots/scroll-polish-final/desktop-tours.png`

## Remaining notes

- The rail intentionally snaps for cleanliness. This avoids visible truncated text during stable scroll positions.
- False positives in the broad overflow script came from `sr-only`, font metric rounding and footer negative-margin hover affordances; document width stayed within viewport.
