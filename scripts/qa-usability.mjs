#!/usr/bin/env node

import fs from "node:fs";
import http from "node:http";
import path from "node:path";
import process from "node:process";
import { chromium } from "playwright";

const root = process.cwd();
const outDir = path.join(root, "out");
const failures = [];

const publicRoutes = [
  "/",
  "/tours/",
  "/gjipe-boat-tour/",
  "/grama-bay-boat-tour/",
  "/private-boat-tour-albania/",
  "/sunset-boat-tour/",
  "/morning-fishing-tour/",
  "/boat-photos/",
  "/destinations/",
  "/destinations/blue-cave/",
  "/faq/",
  "/contact/"
];

const viewports = [
  { name: "desktop", width: 1440, height: 900, isMobile: false },
  { name: "mobile-320", width: 320, height: 740, isMobile: true },
  { name: "mobile-390", width: 390, height: 844, isMobile: true },
  { name: "mobile-430", width: 430, height: 932, isMobile: true }
];

const mimeTypes = new Map([
  [".avif", "image/avif"],
  [".css", "text/css; charset=utf-8"],
  [".html", "text/html; charset=utf-8"],
  [".ico", "image/x-icon"],
  [".js", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".mp4", "video/mp4"],
  [".png", "image/png"],
  [".txt", "text/plain; charset=utf-8"],
  [".webp", "image/webp"],
  [".xml", "application/xml; charset=utf-8"]
]);

function fail(message) {
  failures.push(message);
}

function fileForUrl(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]).replace(/^\/+/, "");
  const candidates = cleanPath
    ? [path.join(outDir, cleanPath), path.join(outDir, cleanPath, "index.html")]
    : [path.join(outDir, "index.html")];

  return candidates.find((candidate) => {
    const resolved = path.resolve(candidate);
    return resolved.startsWith(path.resolve(outDir)) &&
      fs.existsSync(resolved) &&
      fs.statSync(resolved).isFile();
  });
}

function localTargetExists(href) {
  const cleanHref = href.split("#")[0].split("?")[0] || "/";
  if (!cleanHref.startsWith("/")) return true;
  return Boolean(fileForUrl(cleanHref));
}

function serveOutDir() {
  const server = http.createServer((request, response) => {
    const requestUrl = new URL(request.url || "/", "http://127.0.0.1");
    const filePath = fileForUrl(requestUrl.pathname);

    if (!filePath) {
      response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
      response.end("not found");
      return;
    }

    response.writeHead(200, {
      "content-type": mimeTypes.get(path.extname(filePath).toLowerCase()) || "application/octet-stream"
    });
    fs.createReadStream(filePath).pipe(response);
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => resolve(server));
  });
}

async function collectPageMetrics(page) {
  return page.evaluate(() => {
    const visible = (element) => {
      const style = window.getComputedStyle(element);
      const rect = element.getBoundingClientRect();
      return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
    };
    const all = (selector) => Array.from(document.querySelectorAll(selector));
    const text = (element) => (element?.textContent || "").replace(/\s+/g, " ").trim();
    const doc = document.documentElement;

    return {
      title: document.title,
      h1Count: all("h1").filter((item) => text(item)).length,
      horizontalOverflow: doc.scrollWidth > doc.clientWidth + 2,
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      brokenImages: all("img")
        .filter((image) => image.complete && image.naturalWidth === 0)
        .map((image) => image.currentSrc || image.src)
        .slice(0, 8),
      imagesWithoutAlt: all("img")
        .filter((image) => !image.hasAttribute("alt"))
        .map((image) => image.currentSrc || image.src)
        .slice(0, 8),
      unlabeledControls: all("input, select, textarea")
        .filter((control) => visible(control))
        .filter((control) => {
          if (control.closest("label")) return false;
          if (control.getAttribute("aria-label")) return false;
          const id = control.getAttribute("id");
          return !id || !document.querySelector(`label[for="${id}"]`);
        })
        .map((control) => `${control.tagName.toLowerCase()}[name="${control.getAttribute("name") || ""}"]`),
      blankTargetsWithoutRel: all('a[target="_blank"]')
        .filter((link) => !(link.getAttribute("rel") || "").includes("noreferrer"))
        .map((link) => link.href)
        .slice(0, 8),
      internalLinks: all("a[href]")
        .map((link) => link.getAttribute("href"))
        .filter((href) => href && href.startsWith("/")),
      languageTargets: all(".language-switcher-compact .language-option")
        .filter(visible)
        .map((link) => {
          const rect = link.getBoundingClientRect();
          return {
            label: text(link),
            width: Math.round(rect.width),
            height: Math.round(rect.height)
          };
        }),
      stickyBar: (() => {
        const bar = document.querySelector("[data-sticky-booking-bar]");
        if (!bar || !visible(bar)) return null;
        const rect = bar.getBoundingClientRect();
        return {
          bottom: Math.round(rect.bottom),
          height: Math.round(rect.height),
          links: bar.querySelectorAll("a").length,
          reliefActive: document.body.hasAttribute("data-sticky-booking-relief"),
          viewportHeight: window.innerHeight
        };
      })()
    };
  });
}

async function verifyRoute(baseUrl, browser, route, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    isMobile: viewport.isMobile
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("response", (response) => {
    if (response.url().startsWith(baseUrl) && response.status() >= 400) {
      failedRequests.push(`${response.status()} ${response.url().replace(baseUrl, "")}`);
    }
  });

  await page.goto(`${baseUrl}${route}`, { waitUntil: "networkidle", timeout: 15000 });
  const metrics = await collectPageMetrics(page);

  for (const item of [
    ...consoleErrors.map((message) => `console error: ${message}`),
    ...pageErrors.map((message) => `page error: ${message}`),
    ...failedRequests.map((message) => `request failed: ${message}`)
  ]) {
    fail(`${viewport.name} ${route} ${item}`);
  }

  if (!metrics.title) fail(`${viewport.name} ${route} missing document title`);
  if (!metrics.h1Count) fail(`${viewport.name} ${route} missing h1`);
  if (metrics.horizontalOverflow) {
    fail(`${viewport.name} ${route} horizontal overflow ${metrics.scrollWidth}/${metrics.clientWidth}`);
  }
  for (const src of metrics.brokenImages) fail(`${viewport.name} ${route} broken image ${src}`);
  for (const src of metrics.imagesWithoutAlt) fail(`${viewport.name} ${route} image missing alt ${src}`);
  for (const control of metrics.unlabeledControls) fail(`${viewport.name} ${route} unlabeled control ${control}`);
  for (const href of metrics.blankTargetsWithoutRel) fail(`${viewport.name} ${route} target blank without noreferrer ${href}`);
  for (const href of metrics.internalLinks) {
    if (!localTargetExists(href)) fail(`${viewport.name} ${route} missing internal target ${href}`);
  }

  if (viewport.isMobile) {
    for (const target of metrics.languageTargets) {
      if (target.width < 44 || target.height < 44) {
        fail(`${viewport.name} ${route} language target too small: ${target.label} ${target.width}x${target.height}`);
      }
    }

    const menuButton = page.locator("summary").first();
    await menuButton.click();
    const panelBox = await page.locator("#mobile-navigation-panel").evaluate((panel) => {
      const rect = panel.getBoundingClientRect();
      return {
        visible: rect.width > 0 && rect.height > 0,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        bottom: rect.bottom,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight
      };
    });
    if (!panelBox.visible || panelBox.left < 0 || panelBox.right > panelBox.viewportWidth || panelBox.bottom > panelBox.viewportHeight) {
      fail(`${viewport.name} ${route} mobile menu panel is outside the viewport`);
    }

    if (!metrics.stickyBar) {
      fail(`${viewport.name} ${route} sticky booking bar missing`);
    } else if (
      metrics.stickyBar.links !== 4 ||
      (!metrics.stickyBar.reliefActive && metrics.stickyBar.bottom > metrics.stickyBar.viewportHeight + 1)
    ) {
      fail(`${viewport.name} ${route} sticky booking bar layout invalid`);
    }
  }

  await context.close();
}

async function verifyHomeInteractions(baseUrl, browser) {
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
  const page = await context.newPage();

  await page.goto(`${baseUrl}/?dlang=en`, { waitUntil: "networkidle", timeout: 15000 });
  await page.locator("[data-gallery-open]").first().click();
  const galleryOpen = await page.locator('[data-gallery-modal][aria-hidden="false"]').count();
  if (!galleryOpen) fail("home gallery modal did not open");
  await page.keyboard.press("Escape");

  await page.locator('[data-minimal-booking-form] select[name="tour"]').selectOption("private");
  await page.locator('[data-minimal-booking-form] input[name="name"]').fill("Audit Home");
  await page.locator('[data-minimal-booking-form] input[name="date"]').fill("2026-06-21");
  await page.locator('[data-minimal-booking-form] input[name="people"]').fill("4");
  const href = await page.locator("[data-minimal-booking-action]").getAttribute("href");
  const body = href?.startsWith("https://wa.me/")
    ? new URL(href).searchParams.get("text") || ""
    : "";

  if (!body.includes("Preferred tour: Private tour") || !body.includes("Name: Audit Home") || !body.includes("Date: 21/06/2026") || !body.includes("People: 4")) {
    fail("home minimal booking message is missing tour, name, DD/MM/YYYY date or people");
  }

  await context.close();
}

async function verifyContactForms(baseUrl, browser) {
  for (const locale of ["en", "fr", "sq"]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });
    const page = await context.newPage();
    const name = `Audit ${locale.toUpperCase()}`;

    await page.goto(`${baseUrl}/contact/?dlang=${locale}`, { waitUntil: "networkidle", timeout: 15000 });
    await page.locator("[data-booking-form]").scrollIntoViewIfNeeded();
    await page.locator('button[data-booking-tour-option][data-tour-id="private"]').click();
    await page.locator("#quick-date").fill("2026-06-21");
    await page.locator("#quick-name").fill(name);
    await page.locator("#quick-phone").fill("+33600000000");
    await page.locator("#quick-notes").fill("Audit availability check");

    const action = page.locator('[data-booking-action="whatsapp"]');
    const href = await action.getAttribute("href");
    const tourId = await action.getAttribute("data-tour-id");
    const disabled = await action.getAttribute("aria-disabled");
    const body = href?.startsWith("https://wa.me/")
      ? new URL(href).searchParams.get("text") || ""
      : "";
    const summary = await page.locator("[data-booking-summary-message]").innerText();

    if (tourId !== "private" || disabled !== "false" || !body.includes(name) || !body.includes("21/06/2026") || !body.includes("+33600000000")) {
      fail(`contact ${locale} WhatsApp action is incomplete`);
    }
    if (!summary.includes(name) || !summary.includes("21/06/2026") || !summary.includes("Audit availability check")) {
      fail(`contact ${locale} summary is incomplete`);
    }

    await context.close();
  }
}

if (!fs.existsSync(outDir)) {
  fail("out directory is missing; run npm run build first");
}

const server = failures.length ? null : await serveOutDir();
const baseUrl = server ? `http://127.0.0.1:${server.address().port}` : "";
const browser = server ? await chromium.launch({ headless: true }) : null;

try {
  if (browser) {
    for (const route of publicRoutes) {
      for (const viewport of viewports) {
        await verifyRoute(baseUrl, browser, route, viewport);
      }
    }
    await verifyHomeInteractions(baseUrl, browser);
    await verifyContactForms(baseUrl, browser);
  }
} finally {
  if (browser) await browser.close();
  if (server) server.close();
}

if (failures.length) {
  console.error("Usability QA failed:");
  for (const failure of failures.slice(0, 120)) console.error(`- ${failure}`);
  if (failures.length > 120) console.error(`- and ${failures.length - 120} more`);
  process.exit(1);
}

console.log(`Usability QA passed (${publicRoutes.length} routes, ${viewports.length} viewport profiles).`);
