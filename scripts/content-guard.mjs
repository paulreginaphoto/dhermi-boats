import fs from "node:fs";
import path from "node:path";

const ROOT_DIR = process.cwd();
const TARGET_DIRS = ["app", "components", "data", "lib", "public", "scripts"];
const FILE_EXTENSIONS = new Set([".ts", ".tsx", ".js", ".jsx", ".json", ".md", ".txt"]);
const EXCLUDE_DIRS = new Set([".git", ".next", "out", "node_modules"]);

const FORBIDDEN_DASH = "\u2014";
const REPEATED_WORD = /(?:^|\s)([\p{L}\p{M}][\p{L}\p{M}'’-]{1,})\s+\1(?:\s|$)/giu;
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
