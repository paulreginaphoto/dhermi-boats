import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ["app", "components", "data", "lib", "public", "scripts"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt"]);
const EXCLUDE_DIRS = new Set([".git", ".next", "out", "node_modules"]);

const FORBIDDEN_DASH = "\u2014";
const REPEATED_WORD = /(?:^|\s)([\p{L}\p{M}][\p{L}\p{M}'’-]{1,})\s+\1(?:\s|$)/giu;
const LOCALIZED_OPTION_CONTENT = /<option\b(?:(?!<\/option>)[\s\S])*<LocalizedText\b(?:(?!<\/option>)[\s\S])*<\/option>/g;
const IMAGE_QUALITY_VALUE = /quality=\{(\d+)\}/g;
const MIN_PHRASE_WORDS = 2;
const MAX_PHRASE_WORDS = 6;
const MIN_PHRASE_TEXT_LENGTH = 12;

/** @type {Array<{file:string,line:number,message:string,excerpt:string}>} */
const issues = [];

function shouldScanFile(filePath) {
  if (!FILE_EXTENSIONS.has(path.extname(filePath))) return false;
  return true;
}

function addIssue(file, lineNumber, message, excerpt) {
  issues.push({
    file: file.replace(/\\/g, "/"),
    line: lineNumber,
    message,
    excerpt: excerpt.trim().slice(0, 160)
  });
}

function checkLineForForbiddenDash(file, text, lineNumber) {
  if (text.includes(FORBIDDEN_DASH)) {
    addIssue(file, lineNumber, "Le caractère interdit U+2014 est présent.", text);
  }
}

function checkRepeatedWords(file, text, lineNumber) {
  if (/[<>]/.test(text)) return;
  if (!/[\p{L}\p{M}]/u.test(text)) return;

  const matches = text.matchAll(REPEATED_WORD);
  for (const match of matches) {
    addIssue(file, lineNumber, "Mot répété deux fois d’affilée dans le même morceau de texte.", match[0]);
    break;
  }
}

function checkRepeatedPhrase(file, text, lineNumber) {
  if (/[<>]/.test(text)) return;
  if (!/[\p{L}\p{M}]/u.test(text)) return;

  const normalized = text
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[^\p{L}\p{N}\s'-]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
  const words = normalized.split(" ").filter(Boolean);

  if (words.length < MIN_PHRASE_WORDS * 2) return;

  for (let size = MIN_PHRASE_WORDS; size <= MAX_PHRASE_WORDS; size++) {
    for (let i = 0; i + size * 2 <= words.length; i++) {
      const left = words.slice(i, i + size).join(" ");
      const right = words.slice(i + size, i + size * 2).join(" ");
      if (left.length >= MIN_PHRASE_TEXT_LENGTH && left === right) {
        addIssue(
          file,
          lineNumber,
          "Phrase répétée consécutivement (texte répétitif détecté).",
          `${left} ... ${right}`
        );
        return;
      }
    }
  }
}

function scanLine(filePath, text, lineNumber) {
  checkLineForForbiddenDash(filePath, text, lineNumber);
  checkRepeatedWords(filePath, text, lineNumber);
  checkRepeatedPhrase(filePath, text, lineNumber);
}

function lineNumberForIndex(content, index) {
  return content.slice(0, index).split(/\r?\n/).length;
}

function configuredImageQualities() {
  const configPath = path.join(ROOT_DIR, "next.config.mjs");
  if (!fs.existsSync(configPath)) return new Set([75]);

  const config = fs.readFileSync(configPath, "utf8");
  const match = config.match(/qualities:\s*\[([^\]]+)\]/);
  if (!match) return new Set([75]);

  return new Set(
    match[1]
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isInteger(value))
  );
}

const allowedImageQualities = configuredImageQualities();

function checkOptionContent(filePath, content) {
  if (path.extname(filePath) !== ".tsx") return;

  for (const match of content.matchAll(LOCALIZED_OPTION_CONTENT)) {
    addIssue(
      filePath,
      lineNumberForIndex(content, match.index ?? 0),
      "Ne pas rendre LocalizedText dans une balise option: React génère un span invalide et une erreur d’hydratation.",
      match[0].replace(/\s+/g, " ")
    );
  }
}

function checkImageQualityConfig(filePath, content) {
  if (![".tsx", ".ts", ".jsx", ".js"].includes(path.extname(filePath))) return;

  for (const match of content.matchAll(IMAGE_QUALITY_VALUE)) {
    const value = Number(match[1]);
    if (!allowedImageQualities.has(value)) {
      addIssue(
        filePath,
        lineNumberForIndex(content, match.index ?? 0),
        `La qualité next/image ${value} doit être listée dans images.qualities de next.config.mjs.`,
        match[0]
      );
    }
  }
}

function checkBookingFixedTimeTours(filePath, content) {
  if (!filePath.endsWith(path.join("components", "OneMinuteBooking.tsx"))) return;

  if (!content.includes("fixedTimeByTourId")) {
    addIssue(
      filePath,
      1,
      "Le formulaire rapide doit contraindre les tours à horaire fixe pour éviter des messages WhatsApp incohérents.",
      "Missing fixedTimeByTourId"
    );
    return;
  }

  for (const [tourId, timeValue] of [
    ["sunset", "Sunset"],
    ["fishing", "FishingMorning"]
  ]) {
    const fixedTimePattern = new RegExp(`${tourId}:\\s*"${timeValue}"`);
    if (!fixedTimePattern.test(content)) {
      addIssue(
        filePath,
        1,
        `Le tour ${tourId} doit être associé à l’horaire fixe ${timeValue}.`,
        `${tourId}: ${timeValue}`
      );
    }
  }
}

function checkBookingDateMinimum(filePath, content) {
  if (!filePath.endsWith(path.join("components", "OneMinuteBooking.tsx"))) return;

  const requiredSnippets = [
    {
      snippet: "function todayInputValue()",
      message: "Le formulaire rapide doit calculer la date locale minimale pour éviter les réservations dans le passé."
    },
    {
      snippet: "const [minimumDate, setMinimumDate]",
      message: "Le formulaire rapide doit stocker la date minimale côté client sans casser l’export statique."
    },
    {
      snippet: "min={minimumDate || undefined}",
      message: "Le champ date du formulaire rapide doit refuser les dates passées."
    },
    {
      snippet: "onInput={(event) => selectDate(event.currentTarget.value)}",
      message: "Le champ date du formulaire rapide doit corriger une saisie manuelle passée avant l’envoi WhatsApp."
    }
  ];

  for (const { snippet, message } of requiredSnippets) {
    if (!content.includes(snippet)) {
      addIssue(filePath, 1, message, snippet);
    }
  }
}

function inputMarkupById(content, id) {
  const match = content.match(new RegExp(`<input\\b(?:(?!\\/>)[\\s\\S])*id="${id}"(?:(?!\\/>)[\\s\\S])*\\/>`));
  return match ? match[0] : "";
}

function checkBookingRequiredFields(filePath, content) {
  if (!filePath.endsWith(path.join("components", "OneMinuteBooking.tsx"))) return;

  for (const [id, label] of [
    ["quick-date", "date"],
    ["quick-name", "nom"]
  ]) {
    const inputMarkup = inputMarkupById(content, id);
    if (!inputMarkup.includes("required")) {
      addIssue(
        filePath,
        lineNumberForIndex(content, content.indexOf(`id="${id}"`) >= 0 ? content.indexOf(`id="${id}"`) : 0),
        `Le champ ${label} du formulaire rapide doit être requis avant WhatsApp ou email.`,
        inputMarkup || id
      );
    }
  }

  const guardedMessageLinks = content.match(/onClick=\{handleMessageLinkClick\}/g) ?? [];
  if (!content.includes("function handleMessageLinkClick") || guardedMessageLinks.length < 2) {
    addIssue(
      filePath,
      1,
      "Les liens WhatsApp et Email app du formulaire rapide doivent vérifier date et nom avant de partir.",
      "handleMessageLinkClick"
    );
  }

  if (!content.includes("onSubmit={handleEmailSubmit}")) {
    addIssue(
      filePath,
      1,
      "Le bouton FormSubmit du formulaire rapide doit vérifier date et nom avant envoi.",
      "onSubmit={handleEmailSubmit}"
    );
  }
}

function checkPageHeroAltText(filePath, content) {
  if (![".tsx", ".jsx"].includes(path.extname(filePath))) return;
  if (filePath.endsWith(path.join("components", "PageHero.tsx"))) return;
  if (!content.includes("<PageHero")) return;
  if (content.includes("imageAlt=")) return;

  addIssue(
    filePath,
    lineNumberForIndex(content, content.indexOf("<PageHero")),
    "Les pages avec un hero photo doivent transmettre imageAlt quand l’image est informative.",
    "<PageHero ... imageAlt={...}"
  );
}

function checkImportantPageHreflang(filePath, content) {
  if (!filePath.endsWith(path.join("page.tsx"))) return;
  if (!content.includes("export const metadata")) return;
  if (!content.includes("alternates:")) return;
  if (content.includes("robots: { index: false")) return;
  if (content.includes("languageAlternates(")) return;

  addIssue(
    filePath,
    lineNumberForIndex(content, content.indexOf("alternates:")),
    "Les pages indexables doivent exposer les alternates hreflang EN/FR/SQ/x-default.",
    "alternates: { canonical: canonical(\"/.../\"), languages: languageAlternates(\"/.../\") }"
  );
}

function checkLocaleBrowserDetection(filePath, content) {
  const targetFiles = [
    path.join("components", "LocaleBootstrap.tsx"),
    path.join("components", "LanguageProvider.tsx"),
    path.join("components", "OneMinuteBooking.tsx")
  ];

  if (!targetFiles.some((target) => filePath.endsWith(target))) return;

  if (!content.includes("navigator.languages")) {
    addIssue(
      filePath,
      1,
      "La langue doit tomber sur la langue du navigateur avant le fallback anglais.",
      "navigator.languages"
    );
  }

  if (!content.includes("sq-AL")) {
    addIssue(
      filePath,
      1,
      "La détection de langue doit accepter l’albanais via sq-AL.",
      "sq-AL"
    );
  }
}

function scanFileContent(filePath, content) {
  checkOptionContent(filePath, content);
  checkImageQualityConfig(filePath, content);
  checkBookingFixedTimeTours(filePath, content);
  checkBookingDateMinimum(filePath, content);
  checkBookingRequiredFields(filePath, content);
  checkPageHeroAltText(filePath, content);
  checkImportantPageHreflang(filePath, content);
  checkLocaleBrowserDetection(filePath, content);
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (EXCLUDE_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkDir(full);
      continue;
    }
    if (entry.isFile() && shouldScanFile(full)) {
      const content = fs.readFileSync(full, "utf8");
      scanFileContent(full, content);
      const lines = content.split(/\r?\n/);
      lines.forEach((line, index) => scanLine(full, line, index + 1));
    }
  }
}

for (const target of TARGET_DIRS) {
  const absTarget = path.join(ROOT_DIR, target);
  if (fs.existsSync(absTarget)) {
    walkDir(absTarget);
  }
}

if (issues.length > 0) {
  const header = [
    "❌ content-guard: blocage de publication",
    "Règles non respectées :"
  ].join("\n");
  const body = issues
    .map((issue) => `- ${issue.file}:${issue.line} -> ${issue.message} | ${issue.excerpt}`)
    .join("\n");
  console.error(`${header}\n${body}`);
  process.exit(1);
}

console.log("✅ content-guard: OK (pas de tiret long U+2014 ni de répétitions évidentes détectées).");
