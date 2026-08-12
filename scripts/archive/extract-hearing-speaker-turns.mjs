#!/usr/bin/env node

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const speakerPattern =
  /^([A-Z][A-Z0-9 .,'’()/?&-]{1,80}?)(?::|\?\s{2,})(.*)$/;

function pageNumberFor(chunk, fallback) {
  const header = chunk.split(/\r?\n/).slice(0, 8);
  for (const line of header) {
    const match = line.match(/\s(\d{1,3})\s*$/);
    if (match) return Number(match[1]);
  }
  return fallback;
}

function cleanLine(line) {
  return line
    .replace(/^\s*\d{1,2}\s+/, "")
    .replace(/\s+$/u, "")
    .trim();
}

export function parseHearingSpeakerTurns(raw, transcriptLabel = "transcript.txt") {
  const pageChunks = raw.split("\f");
  const turns = [];
  let current = null;

  for (let pageIndex = 0; pageIndex < pageChunks.length; pageIndex += 1) {
    const chunk = pageChunks[pageIndex];
    const page = pageNumberFor(chunk, pageIndex + 1);

    for (const sourceLine of chunk.split(/\r?\n/)) {
      const line = cleanLine(sourceLine);
      if (/^C E R T I F I C A T E/.test(line)) {
        current = null;
        continue;
      }
      if (
        !line ||
        /^COMMITTEE ON /.test(line) ||
        /^INTERNATIONAL INTERGROUP RELATIONS/.test(line) ||
        /^A P P E A R A N C E S/.test(line) ||
        /^World Wide Dictation/.test(line)
      ) {
        continue;
      }

      const match = line.match(speakerPattern);
      if (match) {
        current = {
          speaker: match[1].replace(/\s+/g, " ").trim(),
          pages: new Set([page]),
          text: match[2].trim()
        };
        turns.push(current);
        continue;
      }

      if (current) {
        current.pages.add(page);
        current.text = `${current.text} ${line}`.replace(/\s+/g, " ").trim();
      }
    }
  }

  const grouped = new Map();
  for (const turn of turns) {
    if (!grouped.has(turn.speaker)) {
      grouped.set(turn.speaker, {
        speaker: turn.speaker,
        pages: new Set(),
        turns: []
      });
    }
    const group = grouped.get(turn.speaker);
    for (const page of turn.pages) group.pages.add(page);
    group.turns.push({
      pages: [...turn.pages].sort((a, b) => a - b),
      text: turn.text
    });
  }

  return {
    transcript: transcriptLabel,
    turnCount: turns.length,
    speakerCount: grouped.size,
    speakers: [...grouped.values()]
      .map((group) => ({
        speaker: group.speaker,
        pages: [...group.pages].sort((a, b) => a - b),
        turns: group.turns
      }))
      .sort((a, b) => a.pages[0] - b.pages[0] || a.speaker.localeCompare(b.speaker))
  };
}

export function publicSpeakerIndex(parsed) {
  return {
    transcriptKey: parsed.transcript,
    turnCount: parsed.turnCount,
    speakerCount: parsed.speakerCount,
    transcriptTextState: "protected-source-not-republished",
    speakers: parsed.speakers.map((speaker) => ({
      speaker: speaker.speaker,
      pages: speaker.pages,
      turnCount: speaker.turns.length,
      wordCount: speaker.turns.reduce(
        (total, turn) =>
          total + turn.text.split(/\s+/).filter(Boolean).length,
        0
      )
    }))
  };
}

const isMain = path.resolve(process.argv[1] ?? "") === fileURLToPath(import.meta.url);
if (isMain) {
  const transcriptPath = process.argv[2];
  const outputPath = process.argv[3];
  const publicIndex = process.argv.includes("--public-index");

  if (!transcriptPath) {
    console.error(
      "Usage: node scripts/archive/extract-hearing-speaker-turns.mjs <pdftotext-layout.txt> [output.json]"
    );
    process.exit(1);
  }

  const raw = readFileSync(path.resolve(transcriptPath), "utf8");
  const parsed = parseHearingSpeakerTurns(raw, path.basename(transcriptPath));
  const output = publicIndex ? publicSpeakerIndex(parsed) : parsed;
  const serialized = `${JSON.stringify(output, null, 2)}\n`;
  if (outputPath) {
    writeFileSync(path.resolve(outputPath), serialized);
    console.log(
      `Extracted ${output.turnCount} turns from ${output.speakerCount} speakers to ${outputPath}.`
    );
  } else {
    process.stdout.write(serialized);
  }
}
