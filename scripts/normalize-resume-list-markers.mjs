import { mkdtempSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

const NUMBER = String.raw`(?:\d+(?:\.\d*)?|\.\d+)`;
const TRANSFORM = new RegExp(`(${NUMBER})\\s+0\\s+0\\s+(${NUMBER})\\s+(?:[-+]?${NUMBER}\\s+){2}cm`, "g");
const FONT = new RegExp(`/([A-Za-z0-9]+)\\s+(${NUMBER})\\s+Tf`, "g");

function runQpdf(args) {
  const result = spawnSync("qpdf", args, { encoding: "utf8" });
  if (![0, 3].includes(result.status)) {
    throw new Error(result.stderr || result.stdout || `qpdf exited ${result.status}`);
  }
}

function formatNumber(value) {
  return value.toFixed(6).replace(/0+$/u, "").replace(/\.$/u, "");
}

function normalizeQdf(source) {
  let cursor = 0;
  let output = "";
  let updated = 0;
  while (cursor < source.length) {
    const listStart = source.indexOf("/LI <</MCID", cursor);
    if (listStart < 0) {
      output += source.slice(cursor);
      break;
    }
    const nextList = source.indexOf("/LI <</MCID", listStart + 1);
    const windowEnd = nextList < 0 ? Math.min(source.length, listStart + 1800) : Math.min(nextList, listStart + 1800);
    const prefix = source.slice(Math.max(0, listStart - 700), listStart);
    const transforms = [...prefix.matchAll(TRANSFORM)];
    const scale = Number.parseFloat(transforms.at(-1)?.[2] ?? "1");
    const window = source.slice(listStart, windowEnd);
    const fonts = [...window.matchAll(FONT)].map((match) => ({
      family: match[1],
      rawSize: Number.parseFloat(match[2]),
      index: match.index ?? 0,
      match: match[0]
    }));
    const marker = fonts[0];
    const text = marker && fonts.find(({ family }) => family !== marker.family);
    if (!marker || !text || !Number.isFinite(scale) || scale <= 0) {
      throw new Error(`Could not resolve list marker and body typography near QDF offset ${listStart}.`);
    }
    const desiredRawSize = text.rawSize - (1 / scale);
    if (desiredRawSize <= 0) throw new Error(`Invalid one-point marker size near QDF offset ${listStart}.`);
    const replacement = `/${marker.family} ${formatNumber(desiredRawSize)} Tf`;
    const markerStart = listStart + marker.index;
    output += source.slice(cursor, markerStart) + replacement;
    cursor = markerStart + marker.match.length;
    updated += 1;
  }
  if (updated < 1) throw new Error("No tagged PDF list items were found.");
  return { source: output, updated };
}

function normalizePdf(pdfPath) {
  const absolute = path.resolve(pdfPath);
  const work = mkdtempSync(path.join(tmpdir(), "resume-list-markers-"));
  const qdf = path.join(work, "source.qdf.pdf");
  const normalizedQdf = path.join(work, "normalized.qdf.pdf");
  const output = path.join(work, "normalized.pdf");
  try {
    runQpdf(["--qdf", "--object-streams=disable", absolute, qdf]);
    const normalized = normalizeQdf(readFileSync(qdf, "latin1"));
    writeFileSync(normalizedQdf, normalized.source, "latin1");
    runQpdf(["--object-streams=disable", "--stream-data=compress", normalizedQdf, output]);
    renameSync(output, absolute);
    return { file: pdfPath, listItemsUpdated: normalized.updated };
  } finally {
    rmSync(work, { recursive: true, force: true });
  }
}

const paths = process.argv.slice(2);
if (paths.length < 1) {
  process.stderr.write("Usage: node scripts/normalize-resume-list-markers.mjs <resume.pdf> [...]\n");
  process.exitCode = 1;
} else {
  for (const pdfPath of paths) process.stdout.write(`${JSON.stringify(normalizePdf(pdfPath))}\n`);
}
