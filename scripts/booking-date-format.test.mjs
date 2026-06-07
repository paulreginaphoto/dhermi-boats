import assert from "node:assert/strict";
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";
import ts from "typescript";

const require = createRequire(import.meta.url);
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourcePath = path.join(rootDir, "lib", "dateFormats.ts");
const bookingSourcePath = path.join(rootDir, "components", "OneMinuteBooking.tsx");
const source = fs.readFileSync(sourcePath, "utf8");
const compiled = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS,
    target: ts.ScriptTarget.ES2020,
    strict: true
  }
});
const loadedModule = { exports: {} };

vm.runInNewContext(
  compiled.outputText,
  {
    module: loadedModule,
    exports: loadedModule.exports,
    require,
    console
  },
  { filename: sourcePath }
);

const { formatBookingDate, formatDateLong, formatDateShort } = loadedModule.exports;

assert.equal(formatDateShort("2026-01-15"), "15 Janvier 2026");
assert.equal(formatDateShort("2026-01-15", "en"), "15 January 2026");
assert.equal(formatDateShort("2026-01-15", "sq"), "15 Janar 2026");
assert.equal(formatDateShort("2026-12-31"), "31 Décembre 2026");
assert.equal(formatDateShort("2026-09-30", "en"), "30 September 2026");
assert.equal(formatDateShort("2026-09-30", "sq"), "30 Shtator 2026");
assert.equal(formatDateShort("2026-12-31", "en"), "31 December 2026");
assert.equal(formatDateLong("2026-12-31", "fr"), "31 Décembre 2026");
assert.equal(formatDateLong("2026-12-31", "en"), "31 December 2026");
assert.equal(formatDateLong("2026-12-31", "sq"), "31 Dhjetor 2026");
assert.equal(formatBookingDate("2026-12-31", "fr"), "31 Décembre 2026");
assert.equal(formatDateShort("not-a-date"), "not-a-date");
assert.equal(formatDateLong("", "fr"), "");

const bookingSource = fs.readFileSync(bookingSourcePath, "utf8");

assert.match(source, /bookingMonthNamesByLocale/);
assert.match(source, /Janvier/);
assert.match(source, /January/);
assert.match(source, /Shtator/);
assert.match(bookingSource, /formatBookingDate/);
assert.match(bookingSource, /formatDateShort/);
assert.match(bookingSource, /Aucune date sélectionnée/);
assert.match(bookingSource, /bookingMonthNamesByLocale/);
assert.match(bookingSource, /en:\s*\["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"\]/);
assert.match(bookingSource, /fr:\s*\["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"\]/);
assert.match(bookingSource, /calendarWeekStartOffset/);
assert.doesNotMatch(bookingSource, /DD\/MM\/YYYY|JJ\/MM\/AAAA/);
assert.doesNotMatch(bookingSource, /\{shortBookingDate\}\s*·\s*\{formattedBookingDate\}/);

console.log("date-format: OK");
