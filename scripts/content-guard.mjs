import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ["app", "components", "data", "lib", "public", "scripts"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".css", ".json", ".md", ".txt"]);
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
const WORDPRESS_RESIDUE_FRAGMENTS = [
  "Partager",
  "J’aime ça",
  "J'aime ça",
  "Chargement…",
  "Chargement...",
  "Share this:",
  "Like this:",
  "%d"
];
const REMOVED_MEDIA_FRAGMENTS = [
  "gallery-boat-beach.webp",
  "gallery-cave-entrance.webp"
];
const FRENCH_TONE_AND_ROUTE_RESIDUE = [
  "Choisis ton",
  "choisis ton",
  "Réserve ton",
  "réserve ton",
  "ton tour",
  "Tu as une autre question",
  "contacte-nous",
  "BEST SELLER",
  "LONGER ROUTE",
  "MOST FLEXIBLE",
  "Morning Fishing Tour",
  "Pigeon Cave",
  "Blue Cave",
  "Gjipe Beach"
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
  if (file.endsWith(path.join("components", "Analytics.tsx"))) return;
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

function checkWordPressResidue(file, text, lineNumber) {
  if (!isVisibleContentFile(file)) return;

  const residue = WORDPRESS_RESIDUE_FRAGMENTS.find((item) => text.includes(item));
  if (residue) {
    addIssue(
      file,
      lineNumber,
      "Résidu WordPress visible détecté; le site doit rester une page de réservation propre.",
      residue
    );
  }
}

function checkRemovedMediaResidue(file, text, lineNumber) {
  if (file.endsWith(path.join("scripts", "content-guard.mjs"))) return;

  const residue = REMOVED_MEDIA_FRAGMENTS.find((item) => text.includes(item));
  if (residue) {
    addIssue(
      file,
      lineNumber,
      "Média supprimé détecté; ces photos ne doivent pas revenir sur le site.",
      residue
    );
  }
}

function scanLine(filePath, text, lineNumber) {
  checkLineForForbiddenDash(filePath, text, lineNumber);
  checkLineForEmoji(filePath, text, lineNumber);
  checkRepeatedWords(filePath, text, lineNumber);
  checkRepeatedPhrase(filePath, text, lineNumber);
  checkGenericVisiblePhrase(filePath, text, lineNumber);
  checkWordPressResidue(filePath, text, lineNumber);
  checkRemovedMediaResidue(filePath, text, lineNumber);
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

function parseLocaleTranslations(locale) {
  const i18nPath = path.join(ROOT_DIR, "lib", "i18n.ts");
  if (!fs.existsSync(i18nPath)) return {};

  const source = fs.readFileSync(i18nPath, "utf8");
  const start = source.indexOf(`  ${locale}: {`);
  if (start < 0) return {};

  const end = source.indexOf("\n  },", start);
  if (end < 0) return {};

  const block = source.slice(start, end);
  const entries = {};
  const pattern = /^\s*"([^"]+)":\s*"((?:\\"|[^"])*)",?\s*$/gm;
  let match = pattern.exec(block);

  while (match) {
    entries[match[1]] = match[2].replace(/\\"/g, "\"");
    match = pattern.exec(block);
  }

  return entries;
}

const englishTranslations = parseLocaleTranslations("en");
const frenchTranslations = parseLocaleTranslations("fr");

function normalizeFallbackText(value) {
  return value.replace(/\s+/g, " ").trim();
}

function checkLocalizedTextFallback(filePath, content) {
  if (![".tsx", ".jsx"].includes(path.extname(filePath))) return;

  const pattern = /<LocalizedText\s+id="([^"]+)"[^>]*>([\s\S]*?)<\/LocalizedText>/g;
  for (const match of content.matchAll(pattern)) {
    const key = match[1];
    const fallbackContent = match[2];
    if (!Object.hasOwn(englishTranslations, key)) continue;
    if (/[<>{}]/.test(fallbackContent)) continue;

    const fallback = normalizeFallbackText(fallbackContent);
    const expected = normalizeFallbackText(englishTranslations[key]);
    if (fallback && fallback !== expected) {
      addIssue(
        filePath,
        lineNumberForIndex(content, match.index ?? 0),
        "Le fallback visible de LocalizedText doit correspondre à la traduction EN pour éviter une copie statique obsolète avant hydratation.",
        `${key}: "${fallback}" -> "${expected}"`
      );
    }
  }
}

function checkDynamicTourBookingFallback(filePath, content) {
  if (![".tsx", ".jsx"].includes(path.extname(filePath))) return;

  const dynamicBookFallbacks = [
    /<LocalizedText\s+id=\{[^}]*bookKey[^}]*\}[^>]*>\s*Book this tour\s*<\/LocalizedText>/g,
    /<LocalizedText\s+id=\{[^}]*tour\.private\.book[^}]*\}[^>]*>\s*Book this tour\s*<\/LocalizedText>/g
  ];

  for (const pattern of dynamicBookFallbacks) {
    for (const match of content.matchAll(pattern)) {
      addIssue(
        filePath,
        lineNumberForIndex(content, match.index ?? 0),
        "Les CTA de réservation dynamiques doivent fournir le fallback EN propre au tour, sinon private/sunset/fishing retombent sur un libellé générique avant hydratation.",
        match[0].replace(/\s+/g, " ")
      );
    }
  }
}

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
    "bookingSummaryKey",
    "quick.summary.pending",
    "quick.summary.ready",
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
  if (content.includes("LegacyRedirectPage")) return;
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

  for (const snippet of [
    'attributeFilter: ["data-i18n"]',
    "attributes: true",
    "characterData: true"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        lineNumberForIndex(content, content.indexOf("observer.observe")),
        "Le bootstrap i18n doit observer les changements React dynamiques de clés et textes data-i18n.",
        snippet
      );
    }
  }
}

function checkArrivalComfortSection(filePath, content) {
  if (!filePath.endsWith(path.join("app", "page.tsx"))) return;

  for (const snippet of [
    'data-home-section="hero"',
    'data-home-section="social-proof"',
    'data-home-section="skipper"',
    'data-home-section="tours"',
    'data-home-section="gallery"',
    'data-home-section="contact"',
    "minimal.reassurance",
    "minimalAvailabilityFormScript"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "La home V2 doit garder hero, avis, skipper, tours, galerie, réassurance et formulaire WhatsApp.",
        snippet
      );
    }
  }
}

function checkHighSeasonHeroCopy(filePath, content) {
  if (!filePath.endsWith(path.join("components", "HeroCinematic.tsx"))) return;

  for (const snippet of [
    "hero.title",
    "hero.text",
    "hero.trust.${index}",
    "hero.reassurance.payment",
    "hero.reassurance.meeting"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "Le hero doit vendre en 5 secondes avec la promesse et les preuves visibles au-dessus du pli.",
        snippet
      );
    }
  }
}

function checkTourChoiceIn30Seconds(filePath, content) {
  const relative = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const requirements = {
    "components/TourComparison.tsx": [
      "comparison.title",
      "comparison.audience",
      "comparison.ctaLabel"
    ],
    "app/tours/page.tsx": [
      "page.tours.matrixTitle",
      "tour_matrix"
    ]
  };
  const snippets = requirements[relative];
  if (!snippets) return;

  for (const snippet of snippets) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "La comparaison des tours doit aider le visiteur à choisir en 30 secondes avec audience, durée, prix et CTA.",
        snippet
      );
    }
  }
}

function checkWhatsappMessageTemplates(filePath, content) {
  const relative = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  if (relative !== "lib/whatsappMessages.ts" && relative !== "data/content.ts") return;

  for (const snippet of [
    "Tour:",
    "Date:",
    "Adults:",
    "Children:",
    "Preferred time",
    "Questions:"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "Les messages WhatsApp doivent être préremplis avec les champs nécessaires selon le tour.",
        snippet
      );
    }
  }
}

function checkFaqHighSeasonObjections(filePath, content) {
  if (!filePath.endsWith(path.join("data", "content.ts"))) return;

  for (const snippet of [
    "Is parking possible",
    "Can I pay cash or card",
    "Which tour is best value",
    "Are life jackets included",
    "Can I bring bags and towels",
    "How long is the swim stop",
    "Is the tour private or shared",
    "Can I be dropped off at Gjipe",
    "Which languages does the skipper speak"
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "La FAQ doit répondre aux objections concrètes avant réservation en haute saison.",
        snippet
      );
    }
  }
}

function checkStickyMobileConversionBar(filePath, content) {
  if (!filePath.endsWith(path.join("components", "StickyBookingBar.tsx"))) return;

  for (const snippet of [
    "data-sticky-booking-bar",
    "minimal.cta.whatsapp",
    "minimal.reassurance",
    "whatsappHrefForKey(\"default\")",
    "placement: \"sticky_mobile\""
  ]) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "La barre mobile minimaliste doit garder un CTA WhatsApp permanent avec réassurance.",
        snippet
      );
    }
  }
}

function checkFrenchToneAndRouteResidue() {
  const i18nPath = path.join(ROOT_DIR, "lib", "i18n.ts");
  if (!fs.existsSync(i18nPath)) return;

  const source = fs.readFileSync(i18nPath, "utf8");

  for (const [key, value] of Object.entries(frenchTranslations)) {
    const residue = FRENCH_TONE_AND_ROUTE_RESIDUE.find((item) => value.includes(item));
    if (!residue) continue;

    const keyIndex = source.indexOf(`"${key}"`);
    addIssue(
      i18nPath,
      keyIndex >= 0 ? lineNumberForIndex(source, keyIndex) : 1,
      "La version française doit rester premium, en vouvoiement, sans restes anglais évitables.",
      `${key}: ${residue}`
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
  if (content.includes("dhermi-boat-tours-s702528")) {
    addIssue(
      filePath,
      lineNumberForIndex(content, content.indexOf("dhermi-boat-tours-s702528")),
      "L'ancien lien GetYourGuide ne correspond pas au profil fournisseur actuel.",
      "dhermi-boat-tours-s702528"
    );
  }

  if (!filePath.endsWith(path.join("lib", "site.ts"))) return;

  if (!content.includes("https://www.getyourguide.com/dhermi-boat-s720012/")) {
    addIssue(
      filePath,
      1,
      "Le lien GetYourGuide doit pointer vers le profil fournisseur Dhermi Boat Tours vérifié.",
      "https://www.getyourguide.com/dhermi-boat-s720012/"
    );
  }
}

function checkMobileHeaderControls(filePath, content) {
  const normalizedPath = filePath.replace(/\\/g, "/");

  if (normalizedPath.endsWith("app/globals.css")) {
    if (/\.language-switcher-compact\s*\{[^}]*display:\s*none/i.test(content)) {
      addIssue(
        filePath,
        lineNumberForIndex(content, content.indexOf(".language-switcher-compact")),
        "Le sélecteur de langue compact doit rester visible dans la topbar mobile.",
        ".language-switcher-compact { display: none; }"
      );
    }
  }

  if (normalizedPath.endsWith("components/Header.tsx")) {
    if (content.includes("absolute right-2 top-1/2")) {
      addIssue(
        filePath,
        lineNumberForIndex(content, content.indexOf("absolute right-2 top-1/2")),
        "Les contrôles mobiles de la topbar doivent participer au layout flex pour éviter les chevauchements.",
        "absolute right-2 top-1/2"
      );
    }
  }

  if (normalizedPath.endsWith("components/MobileNav.tsx")) {
    for (const snippet of ["<details", "<summary", "aria-label=\"Navigation menu\"", "group-open:hidden", "group-open:block"]) {
      if (!content.includes(snippet)) {
        addIssue(
          filePath,
          1,
          "Le menu mobile doit rester natif, accessible et sans hydratation React pour préserver PageSpeed.",
          snippet
        );
      }
    }

    if (content.includes("\"use client\"") || content.includes("useState")) {
      addIssue(
        filePath,
        1,
        "Le menu mobile ne doit pas réintroduire de JavaScript client dans l'en-tête.",
        "use client / useState"
      );
    }
  }
}

function parsePng(filePath) {
  const buffer = fs.readFileSync(filePath);
  const signature = "89504e470d0a1a0a";
  if (buffer.subarray(0, 8).toString("hex") !== signature) {
    throw new Error("signature PNG invalide");
  }

  let offset = 8;
  let width = 0;
  let height = 0;
  let bitDepth = 0;
  let colorType = 0;
  const idatChunks = [];

  while (offset < buffer.length) {
    const length = buffer.readUInt32BE(offset);
    const type = buffer.subarray(offset + 4, offset + 8).toString("ascii");
    const data = buffer.subarray(offset + 8, offset + 8 + length);

    if (type === "IHDR") {
      width = data.readUInt32BE(0);
      height = data.readUInt32BE(4);
      bitDepth = data.readUInt8(8);
      colorType = data.readUInt8(9);
    }

    if (type === "IDAT") {
      idatChunks.push(data);
    }

    if (type === "IEND") break;
    offset += length + 12;
  }

  return {
    width,
    height,
    bitDepth,
    colorType,
    inflated: () => zlib.inflateSync(Buffer.concat(idatChunks))
  };
}

function unfilterPngRows(png, bytesPerPixel) {
  const raw = png.inflated();
  const stride = png.width * bytesPerPixel;
  const rows = [];
  let offset = 0;

  for (let y = 0; y < png.height; y += 1) {
    const filter = raw[offset];
    offset += 1;
    const row = Buffer.from(raw.subarray(offset, offset + stride));
    offset += stride;
    const previous = rows[y - 1];

    for (let x = 0; x < row.length; x += 1) {
      const left = x >= bytesPerPixel ? row[x - bytesPerPixel] : 0;
      const up = previous ? previous[x] : 0;
      const upLeft = previous && x >= bytesPerPixel ? previous[x - bytesPerPixel] : 0;

      if (filter === 1) row[x] = (row[x] + left) & 0xff;
      if (filter === 2) row[x] = (row[x] + up) & 0xff;
      if (filter === 3) row[x] = (row[x] + Math.floor((left + up) / 2)) & 0xff;
      if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        const predictor = pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft;
        row[x] = (row[x] + predictor) & 0xff;
      }
    }

    rows.push(row);
  }

  return rows;
}

function rgbaAlphaAt(rows, width, x, y) {
  const row = rows[y];
  const index = x * 4 + 3;
  if (!row || index >= width * 4) return 255;
  return row[index];
}

function checkRoundFaviconAssets() {
  const iconPaths = ["favicon-32.png", "icon-192.png", "icon-512.png"].map((file) => path.join(ROOT_DIR, "public", file));

  for (const filePath of iconPaths) {
    if (!fs.existsSync(filePath)) {
      addIssue(filePath, 1, "Le favicon rond doit exister dans les tailles publiques attendues.", path.basename(filePath));
      continue;
    }

    try {
      const png = parsePng(filePath);
      if (png.width !== png.height || png.bitDepth !== 8 || png.colorType !== 6) {
        addIssue(
          filePath,
          1,
          "Le favicon rond doit être un PNG RGBA carré pour garder des coins transparents.",
          `${png.width}x${png.height}, bitDepth=${png.bitDepth}, colorType=${png.colorType}`
        );
        continue;
      }

      const rows = unfilterPngRows(png, 4);
      const corners = [
        rgbaAlphaAt(rows, png.width, 0, 0),
        rgbaAlphaAt(rows, png.width, png.width - 1, 0),
        rgbaAlphaAt(rows, png.width, 0, png.height - 1),
        rgbaAlphaAt(rows, png.width, png.width - 1, png.height - 1)
      ];
      const center = rgbaAlphaAt(rows, png.width, Math.floor(png.width / 2), Math.floor(png.height / 2));

      if (corners.some((alpha) => alpha > 8) || center < 200) {
        addIssue(
          filePath,
          1,
          "Le favicon rond doit avoir les coins transparents et un centre opaque.",
          `corners=${corners.join(",")} center=${center}`
        );
      }
    } catch (error) {
      addIssue(filePath, 1, "Impossible de vérifier le favicon rond.", error instanceof Error ? error.message : String(error));
    }
  }
}

function checkRemovedMediaAssets() {
  for (const file of REMOVED_MEDIA_FRAGMENTS) {
    const imagePath = path.join(ROOT_DIR, "public", "images", file);
    if (fs.existsSync(imagePath)) {
      addIssue(
        imagePath,
        1,
        "Média supprimé encore présent dans public/images.",
        file
      );
    }
  }
}

function checkSEOFocus(filePath, content) {
  const relative = path.relative(ROOT_DIR, filePath).replace(/\\/g, "/");
  const requirements = [
    {
      file: "app/layout.tsx",
      snippets: ["Dhermi boat tour", "boat tour Dhermi", "localBusinessSchema()", "websiteSchema()"]
    },
    {
      file: "app/page.tsx",
      snippets: ["absolute: \"Dhërmi Boat Tours", "homePageSchema()"]
    },
    {
      file: "app/tours/page.tsx",
      snippets: ["Dhermi Boat Tours", "tourCollectionSchema()", "touristTripSchema(tour)"]
    },
    {
      file: "lib/seo.ts",
      snippets: ["hasOfferCatalog", "touristTripSchema", "breadcrumbSchema", "Dhermi boat tour"]
    },
    {
      file: "lib/i18n.ts",
      snippets: ["Dhermi boat tours from Dhërmi", "Compare Dhermi boat tours by route and price"]
    }
  ];

  const requirement = requirements.find((item) => item.file === relative);
  if (!requirement) return;

  for (const snippet of requirement.snippets) {
    if (!content.includes(snippet)) {
      addIssue(
        filePath,
        1,
        "Le focus SEO `dhermi boat tour` doit rester explicite dans les métadonnées, textes visibles et schema.",
        snippet
      );
    }
  }
}

function scanFileContent(filePath, content) {
  checkLocalizedTextFallback(filePath, content);
  checkDynamicTourBookingFallback(filePath, content);
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
  checkHighSeasonHeroCopy(filePath, content);
  checkTourChoiceIn30Seconds(filePath, content);
  checkWhatsappMessageTemplates(filePath, content);
  checkFaqHighSeasonObjections(filePath, content);
  checkStickyMobileConversionBar(filePath, content);
  checkBookingDraftComfort(filePath, content);
  checkExternalTrustLinks(filePath, content);
  checkMobileHeaderControls(filePath, content);
  checkSEOFocus(filePath, content);
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

checkRoundFaviconAssets();
checkRemovedMediaAssets();
checkFrenchToneAndRouteResidue();

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
