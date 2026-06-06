#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appSource = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
const contentSource = fs.readFileSync(path.join(root, "data", "content.ts"), "utf8");
const i18nSource = fs.readFileSync(path.join(root, "lib", "i18n.ts"), "utf8");
const htmlPath = path.join(root, "out", "index.html");
const failures = [];

function fail(message) {
  failures.push(message);
}

for (const id of ["gjipe", "grama", "private", "sunset", "fishing"]) {
  if (!appSource.includes(`"${id}"`)) {
    fail(`app/page.tsx should include tour id "${id}" in the featured homepage tours`);
  }
}

if (!appSource.includes('const homepageTourOrder = ["sunset", "private", "gjipe", "grama", "fishing"] as const;')) {
  fail("homepage should put sunset and private tours first in the visible tour comparison");
}

if (!contentSource.includes('export const tourDisplayOrder = ["sunset", "private", "gjipe", "grama", "fishing"] as const;')) {
  fail("global tour display order should put sunset and private tours first");
}

for (const fragment of [
  "data-tour-comparison",
  "data-tour-card",
  "v2.tours.badge",
  "v2.tours.price",
  "v2.tours.duration",
  "v2.tours.bestFor",
  "v2.tours.viewRoute",
  "v2.tours.book"
]) {
  if (!appSource.includes(fragment)) {
    fail(`app/page.tsx missing V2 five-tour comparison fragment: ${fragment}`);
  }
}

for (const obsoleteRailFragment of ["data-tour-rail", "data-tour-track", "data-tour-progress", "tourRailScrollScript"]) {
  if (appSource.includes(obsoleteRailFragment)) {
    fail(`homepage tours should no longer render the old scroll rail: ${obsoleteRailFragment}`);
  }
}

for (const fragment of [
  'shortTitle: "Sunset Lovers Tour"',
  'bestFor: "Couples, proposals and quiet evenings"',
  '"tour.sunset.shortTitle": "Sunset Lovers Tour"',
  '"tour.sunset.bestFor": "Couples, proposals and quiet evenings"',
  '"tour.sunset.shortTitle": "Sunset tour"',
  '"tour.sunset.bestFor": "Couples, demandes et soirées calmes"'
]) {
  const source = fragment.startsWith("shortTitle") || fragment.startsWith("bestFor") ? contentSource : i18nSource;
  if (!source.includes(fragment)) {
    fail(`missing sunset lovers copy: ${fragment}`);
  }
}

if (!fs.existsSync(htmlPath)) {
  fail("out/index.html missing; run npm run build first");
} else {
  const html = fs.readFileSync(htmlPath, "utf8");
  for (const fragment of ["data-tour-comparison", "data-tour-card"]) {
    if (!html.includes(fragment)) {
      fail(`out/index.html missing built comparison fragment: ${fragment}`);
    }
  }
  for (const id of ["gjipe", "grama", "private", "sunset", "fishing"]) {
    if (!html.includes(`data-tour-id="${id}"`)) {
      fail(`out/index.html missing built tour card id: ${id}`);
    }
  }
}

if (failures.length) {
  console.error("Five-tour rail QA failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Five-tour rail QA passed.");
