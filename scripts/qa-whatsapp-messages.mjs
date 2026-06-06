#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const OUT_DIR = path.join(ROOT_DIR, "out");
const WHATSAPP_NUMBER = "355693921356";
const BAD_WHATSAPP_SYMBOLS = /[\uFFFD\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const REQUIRED_MARKERS = ["Tour", "Date", "Language", "Questions"];
const TEXT_EXTENSIONS = new Set([".html", ".txt"]);

/** @type {Array<string>} */
const failures = [];

function decodeHtmlAttribute(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, "\"");
}

function collectFiles(directory) {
  const files = [];
  const entries = fs.readdirSync(directory, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...collectFiles(full));
      continue;
    }
    if (entry.isFile() && TEXT_EXTENSIONS.has(path.extname(entry.name))) {
      files.push(full);
    }
  }
  return files;
}

if (!fs.existsSync(OUT_DIR)) {
  console.error("qa-whatsapp-messages: missing out directory; run npm run build first.");
  process.exit(1);
}

let checkedLinks = 0;

for (const filePath of collectFiles(OUT_DIR)) {
  const relative = path.relative(OUT_DIR, filePath).replace(/\\/g, "/");
  const content = fs.readFileSync(filePath, "utf8");
  const matches = content.matchAll(new RegExp(`https://wa\\.me/${WHATSAPP_NUMBER}\\?text=([^"\\s<>]+)`, "g"));

  for (const match of matches) {
    checkedLinks += 1;
    let decoded = "";
    try {
      decoded = decodeURIComponent(decodeHtmlAttribute(match[1]));
    } catch {
      failures.push(`${relative}: WhatsApp href cannot be decoded`);
      continue;
    }

    if (BAD_WHATSAPP_SYMBOLS.test(decoded)) {
      failures.push(`${relative}: WhatsApp message contains emoji/replacement character -> ${decoded.slice(0, 120)}`);
    }

    if (decoded.includes("__")) {
      failures.push(`${relative}: WhatsApp message still contains blank placeholders -> ${decoded.slice(0, 120)}`);
    }

    if (!decoded.includes("\n\n")) {
      failures.push(`${relative}: WhatsApp message is missing the blank line after greeting`);
    }

    for (const marker of REQUIRED_MARKERS) {
      if (!decoded.includes(marker)) {
        failures.push(`${relative}: WhatsApp message is missing marker "${marker}"`);
      }
    }
  }
}

if (failures.length > 0) {
  console.error(["qa-whatsapp-messages: failed", ...failures.slice(0, 40)].join("\n- "));
  process.exit(1);
}

console.log(`qa-whatsapp-messages: OK (${checkedLinks} exported direct WhatsApp links checked).`);
