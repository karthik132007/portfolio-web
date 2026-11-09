import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";
import { catalog, entries, preservedTerms } from "../src/i18n/catalog.js";
import { translate, voices, isVoice } from "../src/i18n/translate.js";
import { items, groups } from "../src/data/inventory.js";
import { projects } from "../src/data/projects.js";

const preserved = new Set(preservedTerms);
const technicalOrNumeric = (value) =>
  preserved.has(value) || !/[A-Za-z]/.test(value) || /^https?:/.test(value);
function allStrings(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(allStrings);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(allStrings);
  return [];
}

test("every visible copy key and dynamic description has both styled versions", () => {
  const sources = new Set();
  const copyFiles = [
    "../src/App.jsx",
    "../src/i18n/LanguageContext.jsx",
    ...readdirSync(new URL("../src/components/", import.meta.url))
      .filter((name) => name.endsWith(".jsx"))
      .map((name) => `../src/components/${name}`),
  ];
  for (const file of copyFiles) {
    const source = readFileSync(
      new URL(file, import.meta.url),
      "utf8",
    );
    for (const match of source.matchAll(/\bt\(\s*("(?:[^"\\]|\\.)*")/g))
      sources.add(JSON.parse(match[1]).trim());
  }
  for (const source of [
    ...items.map((item) => item.name),
    ...items.map((item) => item.description),
    ...Object.values(groups),
    ...allStrings(projects),
  ])
    sources.add(source.trim());
  const missing = [...sources].filter(
    (source) =>
      !technicalOrNumeric(source) &&
      (!catalog[source]?.shakespeare || !catalog[source]?.pirate),
  );
  assert.deepEqual(missing, []);
});

test("copy variants preserve placeholders and all numerical facts", () => {
  assert.equal(new Set(entries.map(([source]) => source)).size, entries.length);
  for (const [source, ...variants] of entries) {
    for (const variant of variants) {
      assert.ok(variant.trim(), source);
      assert.deepEqual(
        variant.match(/\{\w+\}/g) || [],
        source.match(/\{\w+\}/g) || [],
        source,
      );
      assert.deepEqual(
        variant.match(/\d+(?:[,.]\d+)*/g) || [],
        source.match(/\d+(?:[,.]\d+)*/g) || [],
        source,
      );
    }
  }
});

test("standard English stays intact while styled English interpolates live values", () => {
  assert.equal(
    translate(" Follow the curiosity ", "standard"),
    " Follow the curiosity ",
  );
  assert.equal(
    translate("{count} items", "pirate", { count: 35 }),
    "35 treasures",
  );
  assert.equal(
    translate("Inspect {name}", "shakespeare", { name: "Python" }),
    "Examine Python",
  );
  for (const name of [
    "Python",
    "Go",
    "C++",
    "AI Co-Founder",
    "TripSync AI",
    "OmniMark AI",
  ]) {
    for (const { id } of voices) assert.equal(translate(name, id), name);
  }
});

test("only the three supported voice preferences are accepted", () => {
  assert.deepEqual(
    voices.map((voice) => voice.id),
    ["standard", "shakespeare", "pirate"],
  );
  assert.equal(isVoice("pirate"), true);
  assert.equal(isVoice("unknown"), false);
  assert.equal(isVoice(null), false);
});
