import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One-line entry for make.fun's "Dad Joke Showdown" bounty. The
// program writes a single dad joke to /output/entry.txt (or
// $OUTPUT_DIR/entry.txt).
// Pass 2 (final): the moon joke. A son asks why the moon keeps
// changing shape, and his dad reassures him with the straightest
// face at the table: it is just going through a phase. The last
// word carries both meanings at once — a lunar phase and the phase
// every parent of a teenager jokes about — so the pun lands on the
// first read, at the very end, in a framing no barbecue regular has
// heard a thousand times. It replaces the pass-1 sync/sink joke,
// whose homophone was clean but whose format circulates widely.
// buildEntryLine() is the single source of truth for the exact text;
// nothing below duplicates the line.
const JOKE_BEATS = [
  "My son asked why the moon keeps changing shape.",
  "I told him not to worry — it's just going through a phase.",
] as const;

export function buildEntryLine(): string {
  return JOKE_BEATS.join(" ");
}

export const ENTRY_LINE = buildEntryLine();

const MAX_CHARS = 200;

export function charCount(text: string): number {
  return [...text].length;
}

export function isValidEntry(text: string): boolean {
  const length = charCount(text);
  return length >= 1 && length <= MAX_CHARS && text.trim().length > 0;
}

if (!isValidEntry(ENTRY_LINE)) {
  throw new Error(
    `entry line must be 1–${MAX_CHARS} characters, got ${charCount(ENTRY_LINE)}`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY_LINE, "utf8");
