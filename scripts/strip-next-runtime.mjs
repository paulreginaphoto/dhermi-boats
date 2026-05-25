#!/usr/bin/env node

import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";

const outDir = resolve(process.cwd(), "out");

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

if (!statSync(outDir, { throwIfNoEntry: false })?.isDirectory()) {
  console.error("strip-next-runtime: missing out directory");
  process.exit(1);
}

let strippedFiles = 0;

for (const filePath of collectHtmlFiles(outDir)) {
  const source = readFileSync(filePath, "utf8");
  const next = stripRuntime(source);
  if (next !== source) {
    writeFileSync(filePath, next);
    strippedFiles += 1;
  }
}

console.log(`strip-next-runtime: stripped ${strippedFiles} HTML files`);
