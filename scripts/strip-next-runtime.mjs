#!/usr/bin/env node

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative, resolve } from "node:path";

const outDir = resolve(process.cwd(), "out");
const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();
const googleAdsId = "AW-18050141389";
const googleAdsContactSendTo = "AW-18050141389/5E84COKT_5EcEM2Z_Z5D";

function scriptValue(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

function collectHtmlFiles(directory) {
  const entries = readdirSync(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectHtmlFiles(fullPath));
      continue;
    }
    if (entry.isFile() && entry.name.endsWith(".html")) {
      files.push(fullPath);
    }
  }

  return files;
}

function stripRuntime(html) {
  return html
    .replace(/<link\s+rel="preload"\s+as="script"[^>]*href="[^"]*\/_next\/static\/chunks\/[^"]+\.js"[^>]*\/?>/g, "")
    .replace(/<script[^>]+src="[^"]*\/_next\/static\/chunks\/[^"]+\.js"[^>]*><\/script>/g, "")
    .replace(/<script>(?:(?!<\/script>)[\s\S])*self\.__next_f(?:(?!<\/script>)[\s\S])*<\/script>/g, "");
}

function isContactPage(filePath) {
  return relative(outDir, filePath).replace(/\\/g, "/") === "contact/index.html";
}

function googleAdsHeadMarkup(filePath) {
  const ga4Config =
    gaMeasurementId && gaMeasurementId !== googleAdsId
      ? `\ngtag("config",${scriptValue(gaMeasurementId)},{"send_page_view":true});`
      : "";
  const contactConversion = isContactPage(filePath)
    ? `\n<!-- Event snippet for Contact conversion page -->\n<script id="google-ads-contact-conversion">gtag("event","conversion",{"send_to":${scriptValue(googleAdsContactSendTo)}});</script>`
    : "";

  return `<!-- Google tag (gtag.js) -->\n<script async src="https://www.googletagmanager.com/gtag/js?id=${googleAdsId}"></script>\n<script id="google-ads-tag">window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=window.gtag||gtag;gtag("js",new Date());gtag("config",${scriptValue(googleAdsId)});${ga4Config}</script>${contactConversion}`;
}

function injectGoogleAds(html, filePath) {
  if (html.includes(`gtag/js?id=${googleAdsId}`)) return html;
  return html.replace(/<head([^>]*)>/i, `<head$1>\n${googleAdsHeadMarkup(filePath)}`);
}

if (!statSync(outDir, { throwIfNoEntry: false })?.isDirectory()) {
  console.error("strip-next-runtime: missing out directory");
  process.exit(1);
}

let strippedFiles = 0;
let injectedFiles = 0;

for (const filePath of collectHtmlFiles(outDir)) {
  const source = readFileSync(filePath, "utf8");
  const stripped = stripRuntime(source);
  const next = injectGoogleAds(stripped, filePath);
  if (next !== source) {
    writeFileSync(filePath, next);
    if (stripped !== source) strippedFiles += 1;
    if (next !== stripped) injectedFiles += 1;
  }
}

console.log(`strip-next-runtime: stripped ${strippedFiles} HTML files, injected Google Ads into ${injectedFiles} HTML files`);
