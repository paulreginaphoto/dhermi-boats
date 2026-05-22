import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const i18nPath = path.join(ROOT_DIR, "lib", "i18n.ts");
const translationsOutDir = path.join(ROOT_DIR, "public", "locales");
const translationsOutPath = path.join(translationsOutDir, "translations.json");

const source = fs.readFileSync(i18nPath, "utf-8");
const marker = "export const translations";
const markerIndex = source.indexOf(marker);

if (markerIndex < 0) {
  throw new Error(`Marker '${marker}' not found in lib/i18n.ts`);
}

const jsonStart = source.indexOf("{", markerIndex);
if (jsonStart < 0) {
  throw new Error("Failed to find JSON start in translations definition");
}

let depth = 0;
let inString = false;
let escape = false;
let jsonEnd = -1;

for (let i = jsonStart; i < source.length; i++) {
  const char = source[i];

  if (escape) {
    escape = false;
    continue;
  }

  if (inString) {
    if (char === "\\") {
      escape = true;
      continue;
    }

    if (char === '"') {
      inString = false;
    }
    continue;
  }

  if (char === '"') {
    inString = true;
    continue;
  }

  if (char === "{") {
    depth++;
    continue;
  }

  if (char === "}") {
    depth--;
    if (depth === 0) {
      jsonEnd = i;
      break;
    }
  }
}

if (jsonEnd < 0) {
  throw new Error("Could not locate end of translations object");
}

const rawJson = source.slice(jsonStart, jsonEnd + 1);

let translations;
try {
  const asJs = `(${rawJson});`;
  translations = new Function(`return ${asJs}`)();
} catch (error) {
  const message = error && typeof error === "object" && "message" in error ? error.message : "unknown";
  throw new Error(`Failed to parse translations object: ${message}`);
}

fs.mkdirSync(translationsOutDir, { recursive: true });
fs.writeFileSync(translationsOutPath, JSON.stringify(translations));
console.log(`translations.json generated -> ${translationsOutPath}`);
