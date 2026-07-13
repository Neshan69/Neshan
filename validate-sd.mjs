import { readFileSync } from "node:fs";
import { getStructuredData } from "./src/lib/structuredData.js";

const html = readFileSync("index.html", "utf8");
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) {
  console.error("FAIL: no JSON-LD script found");
  process.exit(1);
}
const raw = match[1];

// 1. Valid JSON
let parsed;
try {
  parsed = JSON.parse(raw);
} catch (e) {
  console.error("FAIL: invalid JSON ->", e.message);
  process.exit(1);
}
console.log("OK: valid JSON-LD");

// 2. @context + @graph
if (parsed["@context"] !== "https://schema.org" || !Array.isArray(parsed["@graph"])) {
  console.error("FAIL: missing @context or @graph");
  process.exit(1);
}
const graph = parsed["@graph"];

// 3. No undefined / null leakage
if (raw.includes("null") || raw.includes("undefined")) {
  console.error("FAIL: contains null/undefined value");
  process.exit(1);
}
console.log("OK: no null/undefined values");

// 4. Collect defined + referenced @ids
const defined = new Set();
const types = new Set();
const collect = (node) => {
  if (Array.isArray(node)) return node.forEach(collect);
  if (node && typeof node === "object") {
    if (typeof node["@id"] === "string") defined.add(node["@id"]);
    if (node["@type"]) {
      const t = Array.isArray(node["@type"]) ? node["@type"] : [node["@type"]];
      t.forEach((x) => types.add(x));
    }
    Object.values(node).forEach(collect);
  }
};
graph.forEach(collect);

const references = new Set();
const findRefs = (node) => {
  if (Array.isArray(node)) return node.forEach(findRefs);
  if (node && typeof node === "object") {
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === "@id" && typeof node["@id"] === "string") {
      references.add(node["@id"]);
    }
    Object.values(node).forEach(findRefs);
  }
};
graph.forEach(findRefs);

const missing = [...references].filter((r) => !defined.has(r));
if (missing.length) {
  console.error("FAIL: dangling @id references ->", missing);
  process.exit(1);
}
console.log(`OK: ${references.size} @id references all resolve`);

// 5. Required types present
const required = [
  "WebSite",
  "Organization",
  "Person",
  "WebPage",
  "BreadcrumbList",
  "ContactPoint",
  "Collection",
  "SoftwareSourceCode",
  "CreativeWork",
];
const missingTypes = required.filter((t) => !types.has(t));
if (missingTypes.length) {
  console.error("FAIL: missing types ->", missingTypes);
  process.exit(1);
}
console.log("OK: all required types present:", [...types].sort().join(", "));

// 6. Each node has @type
const noType = graph.filter((n) => !(n && n["@type"]));
if (noType.length) {
  console.error("FAIL: nodes without @type ->", noType.length);
  process.exit(1);
}
console.log(`OK: ${graph.length} graph nodes, all have @type`);

// 7. Cross-check against getStructuredData()
const live = JSON.stringify(getStructuredData());
if (JSON.stringify(parsed) !== live) {
  console.error("WARN: index.html JSON-LD differs from getStructuredData() source");
} else {
  console.log("OK: index.html matches getStructuredData() source of truth");
}

console.log("\nVALIDATION PASSED");
