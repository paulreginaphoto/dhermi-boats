import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const failures = [];

const publicUrls = [
  "/",
  "/tours/",
  "/boat-photos/",
  "/gjipe-boat-tour/",
  "/grama-bay-boat-tour/",
  "/private-boat-tour-albania/",
  "/sunset-boat-tour/",
  "/morning-fishing-tour/",
  "/destinations/",
  "/destinations/blue-cave/",
  "/faq/",
  "/contact/"
];

const sitemapUrls = [
  ...publicUrls,
  "/destinations/blue-cave/"
].filter((value, index, list) => list.indexOf(value) === index);

const excludedSitemapUrls = [
  "/boat-tour-dhermi-today/",
  "/blue-cave-boat-tour-dhermi/",
  "/dhermi-to-grama-bay-boat/",
  "/family-boat-tour-dhermi/",
  "/french-speaking-boat-tour-dhermi/",
  "/tours/group/",
  "/tours/private/",
  "/destinations/gjipe/",
  "/destinations/grama-bay/",
  "/2026/02/28/hello-world/",
  "/sample-page/",
  "/boutique/",
  "/commander/",
  "/panier/",
  "/mon-compte/"
];

const googleAdsId = "AW-18050141389";
const googleAdsContactSendTo = "AW-18050141389/5E84COKT_5EcEM2Z_Z5D";

function fail(message) {
  failures.push(message);
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function htmlPath(routePath) {
  const cleanPath = routePath === "/" ? "index.html" : `${routePath.replace(/^\/|\/$/g, "")}/index.html`;
  return path.join(outDir, cleanPath);
}

function stripTags(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHead(html) {
  return html.match(/<head[^>]*>([\s\S]*?)<\/head>/i)?.[1] || "";
}

function extractJsonLd(html) {
  return [...html.matchAll(/<script[^>]+type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)]
    .map((match) => {
      try {
        return JSON.parse(match[1].replace(/\\u003c/g, "<"));
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .flatMap((item) => Array.isArray(item) ? item : [item]);
}

function flattenSchemas(schemas) {
  const flattened = [];
  for (const schema of schemas) {
    if (Array.isArray(schema)) {
      flattened.push(...flattenSchemas(schema));
    } else if (schema && typeof schema === "object") {
      flattened.push(schema);
    }
  }
  return flattened;
}

if (!exists("docs/FINAL_RELEASE_CHECKLIST.md")) {
  fail("docs/FINAL_RELEASE_CHECKLIST.md is missing");
}

if (!exists("components/Analytics.tsx")) {
  fail("components/Analytics.tsx is missing");
} else {
  const analytics = read("components/Analytics.tsx");
  for (const snippet of [
    "NEXT_PUBLIC_GTM_ID",
    "dataLayer",
    "data-analytics-event",
    "gtag"
  ]) {
    if (!analytics.includes(snippet)) fail(`components/Analytics.tsx missing ${snippet}`);
  }
}

const staticExportSource = read("scripts/strip-next-runtime.mjs");
for (const snippet of [
  "NEXT_PUBLIC_GA_MEASUREMENT_ID",
  googleAdsId,
  googleAdsContactSendTo,
  `gtag/js?id=\${googleAdsId}`,
  "google-ads-contact-conversion"
]) {
  if (!staticExportSource.includes(snippet)) fail(`scripts/strip-next-runtime.mjs missing ${snippet}`);
}

const layout = read("app/layout.tsx");
for (const snippet of ["<Analytics />", "localBusinessSchema()", "websiteSchema()", "<SEOJsonLd"]) {
  if (!layout.includes(snippet)) fail(`app/layout.tsx missing ${snippet}`);
}

if (fs.existsSync(outDir)) {
  const titles = new Map();
  const descriptions = new Map();

  for (const routePath of publicUrls) {
    const filePath = htmlPath(routePath);
    if (!fs.existsSync(filePath)) {
      fail(`${routePath} missing generated HTML`);
      continue;
    }

    const html = fs.readFileSync(filePath, "utf8");
    const head = extractHead(html);
    const title = html.match(/<title>([^<]+)<\/title>/i)?.[1]?.trim();
    const description = html.match(/<meta name="description" content="([^"]+)"/i)?.[1]?.trim();
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
    const hreflangs = [...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/gi)].map((match) => ({
      lang: match[1],
      href: match[2]
    }));

    if (!title) fail(`${routePath} missing title`);
    if (!description) fail(`${routePath} missing meta description`);
    if (title && titles.has(title)) fail(`${routePath} duplicate title with ${titles.get(title)}: ${title}`);
    if (description && descriptions.has(description)) fail(`${routePath} duplicate description with ${descriptions.get(description)}: ${description}`);
    if (title) titles.set(title, routePath);
    if (description) descriptions.set(description, routePath);
    if (!canonical?.endsWith(routePath)) fail(`${routePath} canonical mismatch: ${canonical || "missing"}`);
    if (!head.includes(`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`)) {
      fail(`${routePath} missing Google Ads tag in <head>`);
    }
    if (!head.includes(`gtag("config",${JSON.stringify(googleAdsId)}`)) {
      fail(`${routePath} missing Google Ads config in <head>`);
    }
    if (routePath === "/contact/") {
      if (!head.includes(googleAdsContactSendTo) || !head.includes(`gtag("event","conversion"`)) {
        fail("/contact/ missing Contact conversion event snippet in <head>");
      }
    } else if (head.includes(googleAdsContactSendTo)) {
      fail(`${routePath} should not include the Contact conversion event snippet`);
    }
    for (const { lang, href } of hreflangs) {
      if (!["en", "fr", "sq", "x-default"].includes(lang)) fail(`${routePath} exposes unsupported hreflang ${lang}`);
      if (href.includes("?dlang=")) fail(`${routePath} exposes query-based hreflang ${href}`);
    }
    if (!hreflangs.some((item) => item.lang === "x-default")) fail(`${routePath} missing hreflang x-default`);
    for (const lang of ["en", "fr", "sq"]) {
      if (hreflangs.some((item) => item.lang === lang)) fail(`${routePath} should not expose client-side ${lang} hreflang`);
    }
    if (/href="[^"]*\?dlang=/.test(html)) {
      fail(`${routePath} exposes crawlable language query links`);
    }

    const schemas = flattenSchemas(extractJsonLd(html));
    if (!schemas.some((schema) => schema["@type"] === "LocalBusiness")) {
      fail(`${routePath} missing LocalBusiness JSON-LD`);
    }
    if (routePath.includes("tour") && routePath !== "/tours/") {
      if (!schemas.some((schema) => schema["@type"] === "TouristTrip")) {
        fail(`${routePath} missing TouristTrip JSON-LD`);
      }
    }
    if (routePath === "/" || routePath === "/faq/" || routePath.includes("tour")) {
      const bodyText = stripTags(html);
      for (const schema of schemas.filter((item) => item["@type"] === "FAQPage")) {
        for (const question of schema.mainEntity || []) {
          if (question?.name && !bodyText.includes(question.name)) {
            fail(`${routePath} FAQPage includes non-visible question: ${question.name}`);
          }
        }
      }
    }
  }

  const sitemap = fs.existsSync(path.join(outDir, "sitemap.xml")) ? fs.readFileSync(path.join(outDir, "sitemap.xml"), "utf8") : "";
  for (const routePath of sitemapUrls) {
    if (!sitemap.includes(`https://dhermi.boats${routePath}`)) fail(`sitemap missing ${routePath}`);
  }
  for (const routePath of excludedSitemapUrls) {
    if (sitemap.includes(`https://dhermi.boats${routePath}`)) fail(`sitemap includes duplicate/legacy URL ${routePath}`);
  }
}

const sitemapSource = read("app/sitemap.ts");
for (const routePath of excludedSitemapUrls.slice(0, 4)) {
  if (sitemapSource.includes(`path: "${routePath}"`)) fail(`app/sitemap.ts includes excluded URL ${routePath}`);
}

const robotsSource = read("app/robots.ts");
for (const snippet of ["/*?section=", "/*?*section=", "/*?elementor", "/*?page_id=", "/*?p="]) {
  if (robotsSource.includes(snippet)) fail(`app/robots.ts must not block legacy query URLs in production: ${snippet}`);
}

for (const relativePath of [
  "app/tours/group/page.tsx",
  "app/destinations/gjipe/page.tsx",
  "app/destinations/grama-bay/page.tsx"
]) {
  const source = read(relativePath);
  if (!source.includes("LegacyRedirectPage")) fail(`${relativePath} must remain a canonical legacy transition page`);
  if (source.includes("robots: { index: false")) fail(`${relativePath} must not trigger Search Console noindex exclusions`);
  if (source.includes("languageAlternates(")) fail(`${relativePath} legacy duplicate should not emit hreflang alternates`);
}

for (const [relativePath, snippets] of Object.entries({
  "components/HeroCinematic.tsx": ["width={1600}", "height={1000}"],
  "components/SeaRouteMap.tsx": ["width={tileSize}", "height={tileSize}"],
  "components/VideoFeature.tsx": ["preload=\"none\"", "poster="],
  "components/SocialFeed.tsx": ["below-fold", "loading=\"lazy\"", "fetchPriority=\"low\""]
})) {
  const source = read(relativePath);
  for (const snippet of snippets) {
    if (!source.includes(snippet)) fail(`${relativePath} missing performance marker ${snippet}`);
  }
}

const trackingSource = [
  read("lib/conversion.ts"),
  read("components/Footer.tsx"),
  read("components/ConversionTrustBlock.tsx"),
  read("components/SocialFeed.tsx"),
  read("app/contact/page.tsx"),
  read("app/page.tsx"),
  read("app/boat-photos/page.tsx")
].join("\n");
for (const eventName of [
  "whatsapp_click_",
  "call_click",
  "email_click",
  "maps_click",
  "instagram_click",
  "tiktok_click",
  "getyourguide_click"
]) {
  if (!trackingSource.includes(eventName)) fail(`tracking event missing in source: ${eventName}`);
}

const globals = read("app/globals.css");
if (!globals.includes(".skip-link") || !globals.includes("focus-visible")) {
  fail("skip link and visible focus styles must remain in app/globals.css");
}

if (failures.length) {
  console.error("Final release QA failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Final release QA passed (${publicUrls.length} public URLs checked).`);
