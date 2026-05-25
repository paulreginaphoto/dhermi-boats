import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const outDir = path.join(root, "out");
const canonicalOrigin = (process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || "https://dhermi.boats").replace(/\/$/, "");
const locales = ["en", "fr", "sq"];

const canonicalTourPaths = [
  "/gjipe-boat-tour/",
  "/grama-bay-boat-tour/",
  "/private-boat-tour-albania/",
  "/sunset-boat-tour/",
  "/morning-fishing-tour/"
];

const legacyRedirects = new Map([
  ["/tours/private/", "/private-boat-tour-albania/"],
  ["/2026/02/28/hello-world/", "/"],
  ["/sample-page/", "/"],
  ["/boutique/", "/"],
  ["/panier/", "/"],
  ["/mon-compte/", "/"],
  ["/commander/", "/contact/"]
]);

const publicFilesWithoutLegacyTourLinks = [
  "data/content.ts",
  "components/navigationConfig.ts",
  "app/page.tsx",
  "app/sitemap.ts",
  "app/llms.txt/route.ts",
  "public/llms.txt"
];

const visibleGarbageFragments = ["Partager", "J’aime", "J'aime", "Chargement…", "Chargement...", "%d"];
const criticalFrenchKeys = [
  "hero.title",
  "hero.text",
  "booking.title",
  "booking.text",
  "page.tours.heroText",
  "tour.gjipe.title",
  "tour.gjipe.subtitle",
  "tour.grama.title",
  "tour.grama.subtitle",
  "tour.private.title",
  "tour.private.subtitle",
  "tour.sunset.title",
  "tour.fishing.title",
  "footer.tagline",
  "contact.hero.text"
];

/** @type {Array<string>} */
const issues = [];

function relative(file) {
  return path.relative(root, file).replace(/\\/g, "/");
}

function read(file) {
  return fs.readFileSync(path.join(root, file), "utf8");
}

function exists(file) {
  return fs.existsSync(path.join(root, file));
}

function fail(message) {
  issues.push(message);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function htmlPathForRoute(routePath) {
  const normalized = routePath.replace(/^\//, "").replace(/\/$/, "");
  return normalized ? path.join(outDir, normalized, "index.html") : path.join(outDir, "index.html");
}

function canonicalUrl(routePath) {
  return `${canonicalOrigin}${routePath}`;
}

function hasHreflang(html, locale, href) {
  return html.includes(`hrefLang="${locale}" href="${href}"`) || html.includes(`hreflang="${locale}" href="${href}"`);
}

function assertIncludes(file, content, snippet, message) {
  if (!content.includes(snippet)) {
    fail(`${file}: ${message} (${snippet})`);
  }
}

function assertNotIncludes(file, content, snippet, message) {
  if (content.includes(snippet)) {
    fail(`${file}: ${message} (${snippet})`);
  }
}

function readLocaleBlock(source, locale) {
  const start = source.indexOf(`  ${locale}: {`);
  if (start < 0) {
    fail(`lib/i18n.ts: missing locale block ${locale}`);
    return "";
  }

  const nextStarts = locales
    .filter((item) => item !== locale)
    .map((item) => source.indexOf(`  ${item}: {`, start + 1))
    .filter((index) => index > start);
  const end = nextStarts.length ? Math.min(...nextStarts) : source.indexOf("\n};", start);

  if (end < 0) {
    fail(`lib/i18n.ts: cannot find locale block end for ${locale}`);
    return "";
  }

  return source.slice(start, end);
}

function parseLocale(source, locale) {
  const block = readLocaleBlock(source, locale);
  const entries = {};
  const pattern = /^\s*"([^"]+)":\s*"((?:\\"|[^"])*)",?\s*$/gm;
  let match = pattern.exec(block);

  while (match) {
    entries[match[1]] = match[2].replace(/\\"/g, "\"");
    match = pattern.exec(block);
  }

  return entries;
}

function checkCanonicalTourSources() {
  for (const routePath of canonicalTourPaths) {
    const file = `app${routePath}page.tsx`;
    if (!exists(file)) {
      fail(`${file}: canonical tour page is missing`);
      continue;
    }

    const content = read(file);
    assertIncludes(file, content, "TourDetailPage", "canonical tour page must render the modern tour detail template");
    assertIncludes(file, content, `canonical("${routePath}")`, "canonical tag must point to the canonical tour URL");
    assertIncludes(file, content, `languageAlternates("${routePath}")`, "hreflang must use the canonical tour URL");
  }
}

function checkLegacyRedirectSources() {
  const redirects = exists("public/_redirects") ? read("public/_redirects") : "";
  if (!redirects) {
    fail("public/_redirects: file is missing");
  }

  for (const [from, to] of legacyRedirects) {
    const normalizedRule = `${from} ${to} 301`;
    if (!redirects.includes(normalizedRule)) {
      fail(`public/_redirects: missing redirect rule ${normalizedRule}`);
    }
  }

  const privateLegacy = exists("app/tours/private/page.tsx") ? read("app/tours/private/page.tsx") : "";
  assertIncludes("app/tours/private/page.tsx", privateLegacy, "LegacyRedirectPage", "legacy private URL must render a redirect page");
  assertIncludes("app/tours/private/page.tsx", privateLegacy, "robots: { index: false, follow: true }", "legacy private URL must be noindex");
  assertIncludes("app/tours/private/page.tsx", privateLegacy, 'destination="/private-boat-tour-albania/"', "legacy private URL must redirect to the canonical private tour");
  assertNotIncludes("app/tours/private/page.tsx", privateLegacy, "TourDetailPage", "legacy private URL must not render the tour template");
  assertNotIncludes("app/tours/private/page.tsx", privateLegacy, "languageAlternates(", "legacy private URL must not advertise hreflang alternates");
}

function checkPublicLinks() {
  for (const file of publicFilesWithoutLegacyTourLinks) {
    if (!exists(file)) {
      fail(`${file}: expected public architecture file is missing`);
      continue;
    }

    const content = read(file);
    assertNotIncludes(file, content, "/tours/private/", "public links must point to /private-boat-tour-albania/");
    assertNotIncludes(file, content, "legacyHref", "tour data must not carry legacy duplicate tour hrefs");
  }

  const navContent = read("data/content.ts");
  for (const routePath of canonicalTourPaths) {
    assertIncludes("data/content.ts", navContent, `href: sitePath("${routePath}")`, `tour data must expose ${routePath}`);
  }

  const sitemap = read("app/sitemap.ts");
  for (const routePath of canonicalTourPaths) {
    assertIncludes("app/sitemap.ts", sitemap, `{ path: "${routePath}"`, `sitemap must include ${routePath}`);
  }
}

function checkLanguageRouting() {
  const site = read("lib/site.ts");
  assertIncludes("lib/site.ts", site, "sq: canonical(`${path}?dlang=sq`)", "hreflang must use sq for Albanian");
  assertNotIncludes("lib/site.ts", site, "al: canonical", "hreflang must not expose mixed al/sq Albanian URLs");

  for (const file of ["components/LocaleBootstrap.tsx", "components/LanguageProvider.tsx", "components/OneMinuteBooking.tsx"]) {
    const content = read(file);
    assertIncludes(file, content, "sq-AL", "language normalization must accept sq-AL");
    assertIncludes(file, content, "normalized === \"al\"", "language normalization must map al to sq");
  }

  const bootstrap = read("components/LocaleBootstrap.tsx");
  assertIncludes("components/LocaleBootstrap.tsx", bootstrap, "normalizeUrlLocale()", "bootstrap must canonicalize legacy language query params");
  assertIncludes("components/LocaleBootstrap.tsx", bootstrap, 'searchParams.set("dlang", locale)', "bootstrap must write the normalized dlang query");
  assertIncludes("components/LocaleBootstrap.tsx", bootstrap, 'searchParams.delete("lang")', "bootstrap must remove mixed lang query behavior");

  const switcher = read("components/LanguageSwitcher.tsx");
  assertNotIncludes("components/LanguageSwitcher.tsx", switcher, "dlang=al", "language switcher must not link to al");
}

function checkFrenchTranslations() {
  const source = read("lib/i18n.ts");
  const en = parseLocale(source, "en");
  const fr = parseLocale(source, "fr");
  const singularFrench = /\b(?:tu|ton|ta|tes|toi)\b/i;

  for (const [key, value] of Object.entries(fr)) {
    if (singularFrench.test(value)) {
      fail(`lib/i18n.ts: French must use vous, singular form found in ${key}: ${value}`);
    }
  }

  for (const key of criticalFrenchKeys) {
    if (!fr[key]) {
      fail(`lib/i18n.ts: missing critical French translation ${key}`);
      continue;
    }

    if (fr[key] === en[key]) {
      fail(`lib/i18n.ts: critical French translation still matches English for ${key}`);
    }
  }
}

function checkRobotsAndGarbagePolicy() {
  const robots = read("app/robots.ts");
  for (const snippet of ["/*?section=", "/*?elementor", "/*?p=", "/*?page_id="]) {
    assertIncludes("app/robots.ts", robots, snippet, "robots must disallow public garbage query URLs");
  }
}

function checkExportedHtml() {
  if (!fs.existsSync(outDir)) {
    fail("out: build output is missing; run npm run build before final QA");
    return;
  }

  const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));

  for (const routePath of canonicalTourPaths) {
    const file = htmlPathForRoute(routePath);
    const routeLabel = relative(file);
    if (!fs.existsSync(file)) {
      fail(`${routeLabel}: exported canonical route is missing`);
      continue;
    }

    const html = fs.readFileSync(file, "utf8");
    assertIncludes(routeLabel, html, `rel="canonical" href="${canonicalUrl(routePath)}"`, "exported page must have canonical tag");
    for (const locale of locales) {
      if (!hasHreflang(html, locale, canonicalUrl(`${routePath}?dlang=${locale}`))) {
        fail(`${routeLabel}: exported page must have ${locale} hreflang`);
      }
    }
    if (!hasHreflang(html, "x-default", canonicalUrl(routePath))) {
      fail(`${routeLabel}: exported page must have x-default hreflang`);
    }
    assertNotIncludes(routeLabel, html, "NEXT_REDIRECT", "canonical route must not be a Next redirect shell");
  }

  for (const [from, to] of legacyRedirects) {
    const file = htmlPathForRoute(from);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, "utf8");
    assertIncludes(relative(file), html, `noindex`, "legacy redirect page must be noindex");
    assertIncludes(relative(file), html, to, `legacy redirect page must point to ${to}`);
  }

  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    for (const fragment of visibleGarbageFragments) {
      if (html.includes(fragment)) {
        fail(`${relative(file)}: visible garbage fragment remains: ${fragment}`);
      }
    }

    if (html.includes('href="/tours/private/"') || html.includes(`href="${canonicalUrl("/tours/private/")}`)) {
      fail(`${relative(file)}: exported public HTML still links to legacy private tour URL`);
    }

    if (html.includes("?dlang=al") || html.includes("hreflang=\"al\"") || html.includes("hrefLang=\"al\"")) {
      fail(`${relative(file)}: exported HTML exposes mixed al/sq language URL`);
    }
  }
}

checkCanonicalTourSources();
checkLegacyRedirectSources();
checkPublicLinks();
checkLanguageRouting();
checkFrenchTranslations();
checkRobotsAndGarbagePolicy();
checkExportedHtml();

if (issues.length) {
  console.error("qa-url-canonicals: failed");
  for (const issue of issues.slice(0, 120)) {
    console.error(`- ${issue}`);
  }
  if (issues.length > 120) {
    console.error(`- and ${issues.length - 120} more`);
  }
  process.exit(1);
}

console.log(
  `qa-url-canonicals: OK (${canonicalTourPaths.length} canonical tours, ${legacyRedirects.size} legacy redirects checked)`
);
