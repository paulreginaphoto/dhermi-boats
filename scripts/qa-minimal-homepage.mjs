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

const expectedSections = ["hero", "social-proof", "skipper", "tours", "gallery", "contact"];

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
  "v2.hero.title",
  "v2.hero.text",
  "v2.social.title",
  "v2.skipper.title",
  "v2.tours.title",
  "v2.gallery.title",
  "v2.contact.title",
  "minimal.contact.form.tour",
  "minimal.contact.form.tourUnsure",
  "minimal.contact.form.name",
  "minimal.contact.form.date",
  "minimal.contact.form.people",
  "v2.contact.form.message",
  "minimalAvailabilityFormScript"
]) {
  if (!appSource.includes(fragment)) fail(`app/page.tsx missing V2 homepage fragment: ${fragment}`);
}

const heroIndex = appSource.indexOf('data-home-section="hero"');
const socialIndex = appSource.indexOf('data-home-section="social-proof"');
const skipperIndex = appSource.indexOf('data-home-section="skipper"');
const toursIndex = appSource.indexOf('data-home-section="tours"');
if (!(heroIndex >= 0 && socialIndex > heroIndex && skipperIndex > socialIndex && toursIndex > skipperIndex)) {
  fail("homepage sections must be ordered hero, social-proof, skipper, tours");
}

for (const obsoleteRailFragment of [
  "data-tour-rail",
  "data-tour-track",
  "data-tour-progress",
  "tourRailScrollScript"
]) {
  if (appSource.includes(obsoleteRailFragment)) fail(`V2 homepage should not keep old horizontal tour rail fragment: ${obsoleteRailFragment}`);
}

if (!appSource.includes('name="message"')) {
  fail("V2 booking form must include a name=\"message\" textarea/input");
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

  for (const fragment of [
    "Boat tours from Dh",
    "Meet Isuf",
    "French-speaking skipper",
    "Send booking request on WhatsApp",
    "name=\"message\""
  ]) {
    if (!html.includes(fragment)) fail(`out/index.html missing V2 rendered fragment: ${fragment}`);
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
