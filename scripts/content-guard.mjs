import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ["app", "components", "data", "lib", "public", "scripts"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt"]);
const EXCLUDE_DIRS = new Set([".git", ".next", "out", "node_modules"]);

const FORBIDDEN_DASH = "\u2014";
const EMOJI_CHARACTER = /[\u{1F1E6}-\u{1F1FF}\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
const REPEATED_WORD = /(?:^|\s)([\p{L}\p{M}][\p{L}\p{M}'’-]{1,})\s+\1(?:\s|$)/giu;
const LOCALIZED_OPTION_CONTENT = /<option\b(?:(?!<\/option>)[\s\S])*<LocalizedText\b(?:(?!<\/option>)[\s\S])*<\/option>/g;
const IMAGE_QUALITY_VALUE = /quality=\{(\d+)\}/g;
const MIN_PHRASE_WORDS = 2;
const MAX_PHRASE_WORDS = 6;
const MIN_PHRASE_TEXT_LENGTH = 12;
const GENERIC_VISIBLE_PHRASES = [
  "Good to know",
  "Your first steps are simple",
  "Ready for the sea?",
  "Easy booking",
  "Which boat tour should you choose?",
  "Ready to book?",
  "Quick adventure",
  "Best full trip",
  "Best for groups",
  "Best for couples",
  "Why choose us?",
  "Useful information",
  "Practical info",
  "Tour details",
  "Best for",
  "Who it’s best for",
  "hidden caves",
  "hidden coves",
  "hidden beaches",
  "our most beautiful moments",
  "Blue Cave.",
  "Bon à savoir",
  "Les premiers pas sont simples",
  "Prêt pour la mer ?",
  "Réservation facile",
  "Quel tour en bateau choisir ?",
  "Prêt à réserver ?",
  "plages cachées",
  "Aventure rapide",
  "Meilleur tour complet",
  "Idéal pour les groupes",
  "Idéal pour les couples",
  "Pourquoi nous choisir ?",
  "Informations utiles",
  "Infos pratiques",
  "Détails du tour",
  "Pour qui ce tour est idéal",
  "Grotte Bleue.",
  "Mirë ta dini",
  "Hapat e parë janë të thjeshtë",
  "Gati për detin?",
  "Rezervim i lehtë",
  "Cilin tur me varkë duhet të zgjedhësh?",
  "Gati për rezervim?",
  "plazhet e fshehura",
  "Aventurë e shpejtë",
  "Turi më i plotë",
  "Më i miri për grupe",
  "Më i miri për çifte",
  "Pse të na zgjidhni?",
  "Informacione të dobishme",
  "Informacion praktik",
  "Detajet e turit",
  "Më e mira për",
  "Për kë është më i mirë ky tur",
  "Shpella Blu."
];

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

function isVisibleContentFile(filePath) {
  const relative = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  return /^(app|components|data|lib|public\/locales)\//.test(relative) || relative === "public/llms.txt";
}

function checkLineForForbiddenDash(file, text, lineNumber) {
  if (text.includes(FORBIDDEN_DASH)) {
    addIssue(file, lineNumber, "Le caractère interdit U+2014 est présent.", text);
  }
}

function checkLineForEmoji(file, text, lineNumber) {
  if (isVisibleContentFile(file) && EMOJI_CHARACTER.test(text)) {
    addIssue(file, lineNumber, "Emoji détecté dans du contenu visible; utiliser du texte ou des icônes Lucide.", text);
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

function checkGenericVisiblePhrase(file, text, lineNumber) {
  if (!isVisibleContentFile(file)) return;

  const normalizedLine = text.toLocaleLowerCase();
  const phrase = GENERIC_VISIBLE_PHRASES.find((item) => normalizedLine.includes(item.toLocaleLowerCase()));
  if (phrase) {
    addIssue(
      file,
      lineNumber,
      "Texte visible trop générique détecté; remplacer par une information concrète liée à Dhërmi, au départ ou à la réservation.",
      phrase
    );
  }
}

function scanLine(filePath, text, lineNumber) {
  checkLineForForbiddenDash(filePath, text, lineNumber);
  checkLineForEmoji(filePath, text, lineNumber);
  checkRepeatedWords(filePath, text, lineNumber);
  checkRepeatedPhrase(filePath, text, lineNumber);
  checkGenericVisiblePhrase(filePath, text, lineNumber);
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

  if (!content.includes("href={emailHref}") && !content.includes("href={emailActionHref}")) {
    addIssue(
      filePath,
      1,
      "Le backup email du formulaire rapide doit utiliser un lien mailto validé côté client.",
      "href={emailHref}"
    );
  }

  if (content.includes("bookingFormEndpoint") || content.includes("formsubmit.co")) {
    addIssue(
      filePath,
      1,
      "Le formulaire rapide ne doit pas dépendre de FormSubmit, qui peut renvoyer 521.",
      "bookingFormEndpoint / formsubmit.co"
    );
  }

  for (const snippet of [
    "bookingLinksReady",
    "bookingFallbackHref",
    "whatsappActionHref",
    "emailActionHref",
    "aria-disabled={!bookingLinksReady}"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "Les liens WhatsApp et Email ne doivent pas exposer de message avec date ou nom manquants avant hydratation.",
        snippet
      );
    }
  }
}

function checkBookingCapacityLimits(filePath, content) {
  if (!filePath.endsWith(path.join("components", "OneMinuteBooking.tsx"))) return;

  const requiredSnippets = [
    {
      snippet: "const capacityByTourId",
      message: "Le formulaire rapide doit connaître la capacité réelle de chaque tour."
    },
    {
      snippet: "fishing: 5",
      message: "Le tour pêche doit rester limité à 5 personnes."
    },
    {
      snippet: "function capacityForTour",
      message: "Le formulaire rapide doit appliquer une capacité par tour avant de générer le message."
    },
    {
      snippet: "const activeTourCapacity",
      message: "Le formulaire rapide doit utiliser la capacité du tour actif dans l’interface."
    },
    {
      snippet: "const maxChildrenForTour",
      message: "Le compteur enfants doit rester contraint par la capacité restante."
    },
    {
      snippet: "disabled={!canIncrease}",
      message: "Les boutons de compteur doivent être désactivés quand la capacité est atteinte."
    },
    {
      snippet: "quick.capacity",
      message: "La capacité active doit être visible près des compteurs."
    }
  ];

  for (const { snippet, message } of requiredSnippets) {
    if (!content.includes(snippet)) {
      addIssue(filePath, 1, message, snippet);
    }
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

function checkPageHeroImagePriority(filePath, content) {
  if (!filePath.endsWith(path.join("components", "PageHero.tsx"))) return;

  const imageMarkup = content.match(/<Image\b(?:(?!\/>)[\s\S])*\/>/)?.[0] ?? "";
  if (!imageMarkup.includes("preload") || !imageMarkup.includes("fetchPriority=\"high\"") || !imageMarkup.includes("loading=\"eager\"")) {
    addIssue(
      filePath,
      lineNumberForIndex(content, content.indexOf("<Image")),
      "Le hero photo PageHero doit charger l’image LCP en eager avec preload et fetchPriority high.",
      imageMarkup || "<Image ... />"
    );
  }
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

function checkLocaleSwitcherHydration(filePath, content) {
  if (!filePath.endsWith(path.join("components", "LocaleBootstrap.tsx"))) return;

  if (!content.includes("function applyLocaleSwitchers()")) {
    addIssue(
      filePath,
      1,
      "Le bootstrap doit réappliquer l'état actif du sélecteur de langue après l'hydratation React.",
      "function applyLocaleSwitchers()"
    );
  }

  const applyLocaleText = content.match(/function applyLocaleText\(\) \{[\s\S]*?\n  \}/)?.[0] ?? "";
  if (!applyLocaleText.includes("applyLocaleSwitchers();")) {
    addIssue(
      filePath,
      lineNumberForIndex(content, content.indexOf("function applyLocaleText")),
      "Le sélecteur FR/AL/EN doit être resynchronisé dans le même cycle que les textes localisés.",
      "applyLocaleSwitchers();"
    );
  }
}

function checkArrivalComfortSection(filePath, content) {
  if (!filePath.endsWith(path.join("app", "page.tsx"))) return;

  if (!content.includes("ArrivalComfortBar")) {
    addIssue(
      filePath,
      1,
      "La home doit rassurer les visiteurs dès l’arrivée avec une section courte avant le formulaire.",
      "ArrivalComfortBar"
    );
  }
}

function checkBookingDraftComfort(filePath, content) {
  if (!filePath.endsWith(path.join("components", "OneMinuteBooking.tsx"))) return;

  for (const snippet of [
    "bookingDraftStorageKey",
    "bookingDraftReady",
    "function safeBookingDraft",
    "window.localStorage.setItem(bookingDraftStorageKey"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "Le formulaire doit sauvegarder localement les choix non sensibles pour le confort du visiteur.",
        snippet
      );
    }
  }

  if (!content.includes("name, phone and notes are intentionally not saved")) {
    addIssue(
      filePath,
      1,
      "La sauvegarde locale du formulaire ne doit pas stocker le nom, le téléphone ou les notes.",
      "name, phone and notes are intentionally not saved"
    );
  }
}

function checkExternalTrustLinks(filePath, content) {
  if (content.includes("dhermi-boat-s720012")) {
    addIssue(
      filePath,
      lineNumberForIndex(content, content.indexOf("dhermi-boat-s720012")),
      "L'ancien lien GetYourGuide ne correspond pas au profil fournisseur actuel.",
      "dhermi-boat-s720012"
    );
  }

  if (!filePath.endsWith(path.join("lib", "site.ts"))) return;

  if (!content.includes("https://www.getyourguide.com/dhermi-boat-tours-s702528/")) {
    addIssue(
      filePath,
      1,
      "Le lien GetYourGuide doit pointer vers le profil fournisseur Dhermi Boat Tours vérifié.",
      "https://www.getyourguide.com/dhermi-boat-tours-s702528/"
    );
  }
}

function scanFileContent(filePath, content) {
  checkOptionContent(filePath, content);
  checkImageQualityConfig(filePath, content);
  checkBookingFixedTimeTours(filePath, content);
  checkBookingDateMinimum(filePath, content);
  checkBookingRequiredFields(filePath, content);
  checkBookingCapacityLimits(filePath, content);
  checkPageHeroAltText(filePath, content);
  checkPageHeroImagePriority(filePath, content);
  checkImportantPageHreflang(filePath, content);
  checkLocaleBrowserDetection(filePath, content);
  checkLocaleSwitcherHydration(filePath, content);
  checkArrivalComfortSection(filePath, content);
  checkBookingDraftComfort(filePath, content);
  checkExternalTrustLinks(filePath, content);
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
    "content-guard: blocage de publication",
    "Règles non respectées :"
  ].join("\n");
  const body = issues
    .map((issue) => `- ${issue.file}:${issue.line} -> ${issue.message} | ${issue.excerpt}`)
    .join("\n");
  console.error(`${header}\n${body}`);
  process.exit(1);
}

console.log("content-guard: OK (contenu, booking et liens statiques protégés).");
