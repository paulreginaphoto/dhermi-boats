#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const appSource = fs.readFileSync(path.join(root, "app", "page.tsx"), "utf8");
const htmlPath = path.join(root, "out", "index.html");
const failures = [];

function fail(message) {
  failures.push(message);
}

const expectedSections = ["hero", "tours", "gallery", "reviews", "contact"];

for (const section of expectedSections) {
  if (!appSource.includes(`data-home-section="${section}"`)) {
    fail(`app/page.tsx missing data-home-section="${section}"`);
  }
}

const obsoleteHomepageBlocks = [
  "SeasonAvailabilityStrip",
  "ArrivalComfortBar",
  "HighSeasonOfferLadder",
  "SocialFeed",
  "DestinationCard",
  "LazyOneMinuteBooking",
  "BookingCTA"
];

for (const block of obsoleteHomepageBlocks) {
  if (appSource.includes(block)) {
    fail(`app/page.tsx still imports or renders old homepage block: ${block}`);
  }
}

for (const fragment of [
  "minimal.hero.title",
  "minimal.hero.text",
  "minimal.tours.title",
  "minimal.gallery.title",
  "minimal.reviews.title",
  "minimal.contact.title",
  "minimal.contact.form.tour",
  "minimal.contact.form.tourUnsure",
  "minimal.contact.form.name",
  "minimal.contact.form.date",
  "minimal.contact.form.people",
  "minimal.faq.trigger",
  "minimalAvailabilityFormScript"
]) {
  if (!appSource.includes(fragment)) {
    fail(`app/page.tsx missing minimal homepage fragment: ${fragment}`);
  }
}

const formActionSourceLine = appSource
  .split(/\r?\n/)
  .find((line) => line.includes("data-minimal-booking-action"));
if (!formActionSourceLine) {
  fail("app/page.tsx missing data-minimal-booking-action");
} else if (formActionSourceLine.includes("data-whatsapp-key")) {
  fail("minimal booking form action must not use data-whatsapp-key because locale bootstrap rewrites those static links");
}

if (!fs.existsSync(htmlPath)) {
  fail("out/index.html missing; run npm run build first");
} else {
  const html = fs.readFileSync(htmlPath, "utf8");
  const sectionCount = (html.match(/data-home-section=/g) || []).length;
  if (sectionCount !== expectedSections.length) {
    fail(`out/index.html should expose ${expectedSections.length} home sections, found ${sectionCount}`);
  }

  for (const section of expectedSections) {
    if (!html.includes(`data-home-section="${section}"`)) {
      fail(`out/index.html missing data-home-section="${section}"`);
    }
  }

  if (!html.includes("data-minimal-booking-form")) {
    fail("out/index.html missing static minimal booking form");
  }

  const formActionHtml = html.match(/<a[^>]*data-minimal-booking-action[^>]*>/);
  if (!formActionHtml) {
    fail("out/index.html missing data-minimal-booking-action");
  } else if (formActionHtml[0].includes("data-whatsapp-key")) {
    fail("minimal booking form action in out/index.html must not use data-whatsapp-key");
  }

  if (!html.includes("data-gallery-zoom")) {
    fail("out/index.html missing no-JS gallery zoom affordance");
  }
}

if (failures.length) {
  console.error("Minimal homepage QA failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Minimal homepage QA passed.");
