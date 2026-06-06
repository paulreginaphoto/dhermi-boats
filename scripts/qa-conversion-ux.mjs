import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const failures = [];

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function fail(message) {
  failures.push(message);
}

function expectFileContains(relativePath, fragments) {
  const source = read(relativePath);
  for (const fragment of fragments) {
    if (!source.includes(fragment)) {
      fail(`${relativePath} missing ${fragment}`);
    }
  }
  return source;
}

function expectFileDoesNotContain(relativePath, fragments) {
  const source = read(relativePath);
  for (const fragment of fragments) {
    if (source.includes(fragment)) {
      fail(`${relativePath} still contains ${fragment}`);
    }
  }
  return source;
}

const tourIds = ["default", "gjipe", "grama", "private", "sunset", "fishing"];
const localeMarkers = {
  en: ["Tour:", "Date:", "Adults:", "Children:", "Preferred time:", "Questions:"],
  fr: ["Tour :", "Date :", "Adultes :", "Enfants :", "Horaire souhaité :", "Questions :"],
  sq: ["Turi:", "Data:", "Të rritur:", "Fëmijë:", "Ora e preferuar:", "Pyetje:"]
};

if (!exists("docs/CONVERSION_AUDIT_FIXES.md")) {
  fail("docs/CONVERSION_AUDIT_FIXES.md is missing");
}

const whatsappMessages = read("lib/whatsappMessages.ts");
for (const tourId of tourIds) {
  if (!whatsappMessages.includes(`${tourId}: {`)) {
    fail(`WhatsApp message key missing: ${tourId}`);
  }
}
for (const [locale, markers] of Object.entries(localeMarkers)) {
  for (const marker of markers) {
    if (!whatsappMessages.includes(marker)) {
      fail(`WhatsApp ${locale} templates missing marker: ${marker}`);
    }
  }
}

if (!exists("lib/conversion.ts")) {
  fail("lib/conversion.ts is missing");
} else {
  expectFileContains("lib/conversion.ts", [
    "whatsapp_click_{tour}_{language}_{placement}",
    "conversionEvent",
    "conversionAttrs"
  ]);
}

expectFileContains("components/ButtonLink.tsx", [
  "analyticsPlacement",
  "analyticsTour",
  "conversionAttrs"
]);

expectFileContains("lib/bookingLinks.ts", [
  "centralizedBookingHref",
  'sitePath("/contact/#book")'
]);

expectFileDoesNotContain("lib/bookingLinks.ts", [
  "?tour=",
  "encodeURIComponent(key)"
]);

expectFileDoesNotContain("app/page.tsx", [
  'bookingFormBase',
  '?tour=" + encodeURIComponent'
]);

expectFileDoesNotContain("components/StickyBookingBar.tsx", [
  "tel:",
  "call_click_mobile_sticky"
]);

expectFileDoesNotContain("components/BookingCTA.tsx", [
  "tel:",
  "call_click"
]);

expectFileContains("components/LocaleBootstrap.tsx", [
  "applyAnalyticsEvents",
  "data-analytics-event-template",
  "data-analytics-tour",
  "data-analytics-placement"
]);

if (!exists("components/ConversionTrustBlock.tsx")) {
  fail("components/ConversionTrustBlock.tsx is missing");
} else {
  expectFileContains("components/ConversionTrustBlock.tsx", [
    "trust.local.title",
    "trust.languages.title",
    "trust.reviews.title",
    "googleMapsUrl",
    "getYourGuideUrl"
  ]);
}

expectFileContains("app/boat-photos/page.tsx", [
  "GalleryGrid priorityFirst",
  "VideoFeature",
  "ConversionTrustBlock",
  "analyticsPlacement=\"photos_hero"
]);

expectFileContains("components/GalleryGrid.tsx", [
  "data-gallery-grid"
]);

expectFileDoesNotContain("app/boat-photos/page.tsx", [
  "photoConversionGroups",
  "photos.conversion",
  "photos.group"
]);

expectFileContains("app/destinations/page.tsx", [
  "href={tour.href}",
  "analyticsPlacement=\"destination"
]);

expectFileContains("components/DestinationDetailPage.tsx", [
  "analyticsPlacement=\"destination_detail",
  "href={primaryTour.href}"
]);

expectFileContains("components/TourDetailPage.tsx", [
  "analyticsPlacement=\"tour_hero\"",
  "analyticsPlacement=\"tour_panel\"",
  "whatsappKey={tour.id}"
]);

const filesWithCtas = [
  "components/Header.tsx",
  "components/MobileNav.tsx",
  "components/Footer.tsx",
  "components/StickyBookingBar.tsx",
  "components/WhatsAppFloatingButton.tsx",
  "components/BookingCTA.tsx",
  "components/TourCard.tsx",
  "components/TourComparison.tsx",
  "app/tours/page.tsx",
  "app/contact/page.tsx",
  "app/faq/page.tsx",
  "app/not-found.tsx",
  "app/page.tsx"
];

for (const relativePath of filesWithCtas) {
  const source = read(relativePath);
  if (source.includes("data-whatsapp-key") || source.includes("whatsappKey=") || source.includes("primaryWhatsappHref") || source.includes("whatsappHrefForKey") || source.includes("whatsappUrl(")) {
    if (!source.includes("analyticsPlacement") && !source.includes("conversionAttrs") && !source.includes("conversionEvent(")) {
      fail(`${relativePath} has WhatsApp CTA code without placement-specific analytics`);
    }
  }
}

const disallowedGenericPatterns = [
  'analyticsEvent="whatsapp_click"',
  'data-analytics-event="whatsapp_click"',
  'data-analytics-event="comparison_book_click"',
  'data-analytics-event="tour_card_book_click"',
  'data-analytics-event="destination_whatsapp_click"',
  'data-analytics-event="sticky_mobile_cta_click"',
  'data-analytics-event="faq_whatsapp_click"',
  'data-analytics-event="photos_whatsapp_click"'
];

for (const relativePath of filesWithCtas) {
  const source = read(relativePath);
  for (const pattern of disallowedGenericPatterns) {
    if (source.includes(pattern)) {
      fail(`${relativePath} still contains generic WhatsApp analytics pattern ${pattern}`);
    }
  }
}

if (failures.length) {
  console.error("Conversion UX QA failed:");
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Conversion UX QA passed.");
