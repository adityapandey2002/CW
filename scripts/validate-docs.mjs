#!/usr/bin/env node
/**
 * Documentation validation script (no external dependencies).
 *
 * Checks performed:
 *  1. Every relative Markdown link resolves to an existing file.
 *  2. Code fences are balanced in every Markdown file.
 *  3. Mermaid blocks start with a known diagram type and have balanced
 *     brackets/parens with no unquoted special characters in node labels.
 *  4. No documentation file is empty or trivially short.
 *
 * Usage:  node scripts/validate-docs.mjs
 * Exit code: 0 when all checks pass, 1 otherwise.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set(["node_modules", ".git", ".next", "dist", "build", "coverage"]);
const FENCE = "`".repeat(3);
const DIAGRAM_TYPES =
  /^(flowchart|graph|sequenceDiagram|stateDiagram-v2|stateDiagram|classDiagram|erDiagram|journey|gantt|pie|mindmap|timeline|gitGraph)\b/;

const files = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith(".md")) files.push(full);
  }
}
walk(root);

const problems = [];
let mermaidBlocks = 0;
let checkedLinks = 0;

for (const file of files) {
  const relative = path.relative(root, file);
  const text = fs.readFileSync(file, "utf8");

  if (text.trim().length < 300 && relative !== "CLAUDE.md") {
    problems.push(`${relative}: file is empty or too short to be useful`);
  }

  const fences = (text.match(new RegExp(FENCE, "g")) || []).length;
  if (fences % 2 !== 0) problems.push(`${relative}: unbalanced code fences`);

  const linkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  // Links inside fenced code blocks are examples, not live references.
  const withoutCodeBlocks = text.replace(new RegExp(`${FENCE}[\\s\\S]*?${FENCE}`, "g"), "");
  let match;
  while ((match = linkPattern.exec(withoutCodeBlocks)) !== null) {
    const href = match[1].split("#")[0];
    if (!href || /^(https?:|mailto:|tel:)/.test(href)) continue;
    checkedLinks++;
    const target = path.resolve(path.dirname(file), href);
    if (!fs.existsSync(target)) problems.push(`${relative}: broken link -> ${match[1]}`);
  }

  const parts = text.split(FENCE + "mermaid");
  for (let i = 1; i < parts.length; i++) {
    mermaidBlocks++;
    const lines = parts[i]
      .split(FENCE)[0]
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (!DIAGRAM_TYPES.test(lines[0] || "")) {
      problems.push(`${relative}: mermaid block ${i} has an unknown diagram type "${lines[0]}"`);
    }

    lines.forEach((line, index) => {
      const withoutStrings = line.replace(/"[^"]*"/g, '""');
      const openSquare = (withoutStrings.match(/\[/g) || []).length;
      const closeSquare = (withoutStrings.match(/\]/g) || []).length;
      const openParen = (withoutStrings.match(/\(/g) || []).length;
      const closeParen = (withoutStrings.match(/\)/g) || []).length;
      if (openSquare !== closeSquare) problems.push(`${relative}: mermaid block ${i} line ${index + 1}: unbalanced []`);
      if (openParen !== closeParen) problems.push(`${relative}: mermaid block ${i} line ${index + 1}: unbalanced ()`);
      const label = withoutStrings.match(/\[([^\][]*)\]/);
      if (label && /[;:()]/.test(label[1])) {
        problems.push(`${relative}: mermaid block ${i} line ${index + 1}: unquoted special characters in label`);
      }
    });
  }
}

console.log(`Markdown files scanned : ${files.length}`);
console.log(`Relative links checked : ${checkedLinks}`);
console.log(`Mermaid blocks scanned : ${mermaidBlocks}`);

if (problems.length > 0) {
  console.log("\nProblems found:");
  for (const problem of problems) console.log(`  - ${problem}`);
  process.exit(1);
}

console.log("\nAll documentation checks passed.");
