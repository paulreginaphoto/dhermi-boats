import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const locales = ["en", "fr", "sq"];
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const siteOrigin = (process.env.NEXT_PUBLIC_SITE_ORIGIN || "https://dhermi.boats").replace(/\/$/, "");
const expectedCanonicalBase = (
  process.env.NEXT_PUBLIC_CANONICAL_ORIGIN || `${siteOrigin}${basePath}`
).replace(/\/$/, "");
const outDir = path.join(root, "out");
const i18nPath = path.join(root, "lib", "i18n.ts");

function readLocaleBlock(source, locale) {
  const start = source.indexOf(`  ${locale}: {`);
  if (start < 0) throw new Error(`Missing locale block: ${locale}`);

  const nextStarts = locales
    .filter((item) => item !== locale)
    .map((item) => source.indexOf(`  ${item}: {`, start + 1))
    .filter((index) => index > start);
  const end = nextStarts.length ? Math.min(...nextStarts) : source.indexOf("\n};", start);

  if (end < 0) throw new Error(`Cannot find locale block end: ${locale}`);
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

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

function targetForInternalPath(href) {
  const cleanHref = href.split("#")[0].split("?")[0];
  const withoutBase = basePath && cleanHref.startsWith(`${basePath}/`)
    ? cleanHref.slice(basePath.length + 1)
    : cleanHref.replace(/^\//, "");

  if (!withoutBase) return path.join(outDir, "index.html");
  return cleanHref.endsWith("/")
    ? path.join(outDir, withoutBase, "index.html")
    : path.join(outDir, withoutBase);
}

function fail(label, items) {
  if (!items.length) return;

  console.error(`\n${label}`);
  for (const item of items.slice(0, 80)) {
    console.error(typeof item === "string" ? `- ${item}` : `- ${JSON.stringify(item)}`);
  }
  if (items.length > 80) console.error(`- and ${items.length - 80} more`);
}

const source = fs.readFileSync(i18nPath, "utf8");
const dictionaries = Object.fromEntries(locales.map((locale) => [locale, parseLocale(source, locale)]));
const allTranslationKeys = new Set(locales.flatMap((locale) => Object.keys(dictionaries[locale])));
const localeKeyGaps = locales.flatMap((locale) =>
  [...allTranslationKeys]
    .filter((key) => !(key in dictionaries[locale]))
    .map((key) => `${locale}:${key}`)
);

const htmlFiles = walk(outDir).filter((file) => file.endsWith(".html"));
const usedI18nKeys = new Set();
const badInternalHrefs = [];
const missingInternalTargets = [];
const nextRedirectPages = [];
const badCanonicalHrefs = [];
const badSitemapLocs = [];

function absoluteUrlUsesExpectedCanonicalBase(url) {
  return url === expectedCanonicalBase ||
    url.startsWith(`${expectedCanonicalBase}/`) ||
    url.startsWith(`${expectedCanonicalBase}?`);
}

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const relativeFile = path.relative(root, file);

  for (const match of html.matchAll(/data-i18n="([^"]+)"/g)) {
    usedI18nKeys.add(match[1]);
  }

  if (html.includes("NEXT_REDIRECT")) {
    nextRedirectPages.push(relativeFile);
  }

  for (const match of html.matchAll(/<link\b[^>]*>/g)) {
    const tag = match[0];
    const rel = tag.match(/\brel="([^"]+)"/)?.[1];
    const href = tag.match(/\bhref="([^"]+)"/)?.[1]?.replaceAll("&amp;", "&");
    if (!rel || !href || !/^https?:/.test(href)) continue;
    if (!/(^|\s)(canonical|alternate)(\s|$)/.test(rel)) continue;
    if (!absoluteUrlUsesExpectedCanonicalBase(href)) {
      badCanonicalHrefs.push({ file: relativeFile, rel, href, expectedCanonicalBase });
    }
  }

  for (const match of html.matchAll(/\shref="([^"]+)"/g)) {
    const href = match[1].replaceAll("&amp;", "&");
    if (/^(https?:|mailto:|tel:|#|\?|data:)/.test(href)) continue;
    if (!href.startsWith("/")) continue;

    if (basePath && !href.startsWith(`${basePath}/`)) {
      badInternalHrefs.push({ file: relativeFile, href });
      continue;
    }

    const target = targetForInternalPath(href);
    if (!fs.existsSync(target)) {
      missingInternalTargets.push({ file: relativeFile, href, target: path.relative(root, target) });
    }
  }
}

const missingUsedKeys = [...usedI18nKeys]
  .filter((key) => locales.some((locale) => !(key in dictionaries[locale])))
  .sort();

fail("Missing translation keys across locale dictionaries:", localeKeyGaps);
fail("Used data-i18n keys missing from at least one locale:", missingUsedKeys);
fail("Internal hrefs missing the configured base path:", badInternalHrefs);
fail("Internal href targets missing from out:", missingInternalTargets);
fail("Static pages still exporting NEXT_REDIRECT:", nextRedirectPages);
fail("Canonical and hreflang URLs using the wrong public base:", badCanonicalHrefs);

const sitemapPath = path.join(outDir, "sitemap.xml");
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
    const loc = match[1];
    if (!absoluteUrlUsesExpectedCanonicalBase(loc)) {
      badSitemapLocs.push({ loc, expectedCanonicalBase });
    }
  }
}

fail("Sitemap URLs using the wrong public base:", badSitemapLocs);

const failureCount =
  localeKeyGaps.length +
  missingUsedKeys.length +
  badInternalHrefs.length +
  missingInternalTargets.length +
  nextRedirectPages.length +
  badCanonicalHrefs.length +
  badSitemapLocs.length;

if (failureCount > 0) {
  process.exit(1);
}

console.log(
  `qa-i18n-links: OK (${htmlFiles.length} html files, ${usedI18nKeys.size} used i18n keys, ${allTranslationKeys.size} translation keys)`
);
