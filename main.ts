// Two Days of Quiet Dread — entry program.
//
// Writes one code review comment that approves a pull request while
// carrying quiet existential dread to /output/entry.txt. Deterministic,
// no network, no randomness.
//
// Outside the grader, MAKEFUN_OUTPUT_DIR stands in for /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The entry text. The judge brief weighs, in order: (1) a single-line
// comment that approves the PR and carries quiet existential dread;
// (2) funny on the first read, with the laugh coming from the dread
// itself; (3) the dread kept quiet — understatement and a flat tone,
// not melodrama; (4) reads like a comment a tired engineer would really
// paste before clicking approve; (5) a fresh turn of phrase.
//
// Candidates weighed:
//  - "LGTM. The code works, the tests pass, and none of it will matter
//    when the heat death of the universe arrives, but sure, ship it."
//    The dread is cosmic, but "heat death of the universe" is the stock
//    line the brief's criterion 5 penalizes, and the line sprawls.
//  - "Approved. It compiles, it passes, and in three years someone will
//    read this diff the way archaeologists read a warning on a tomb."
//    Fresh image, but literary rather than tired-engineer; it reads
//    like a writer showing off, not a paste before approve. Loses on
//    criterion 4.
//  - Picked: the dread comes from the reviewer, not the universe —
//    present me is too tired to question the diff, so future me gets to
//    discover it. The approval is real ("LGTM — merging now"), the tone
//    is flat, the laugh is the dread itself, and the whole thing is
//    something a tired engineer would actually type.
const ENTRY =
  "LGTM — merging now so future me can discover what present me was too tired to question.";

// Competition rules: 1 to 140 characters, counted as Unicode code points,
// and not only white space. Enforce it here so a bad edit fails loudly.
const codePoints = [...ENTRY].length;
if (codePoints < 1 || codePoints > 140) {
  throw new Error(`entry must be 1-140 code points, got ${codePoints}`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
// The rules require a single line: reject any line break outright, so a
// bad edit that introduces one fails loudly instead of shipping a
// two-line entry to a one-line judge.
if (/[\r\n]/.test(ENTRY)) {
  throw new Error("entry must be a single line, got a line break");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, ENTRY, "utf8");
console.log(`wrote ${codePoints} code points to ${outPath}`);
