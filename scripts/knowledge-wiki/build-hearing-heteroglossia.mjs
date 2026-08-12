#!/usr/bin/env node

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { parseHearingSpeakerTurns } from "../archive/extract-hearing-speaker-turns.mjs";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const configPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/hearing-heteroglossia.config.json"
);
const corpusPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/hearing-heteroglossia-corpus-2026-07-28.json"
);
const config = JSON.parse(readFileSync(configPath, "utf8"));
const args = process.argv.slice(2);
const checkOnly = args.includes("--check");
const inputDirIndex = args.indexOf("--input-dir");
const inputDir =
  inputDirIndex >= 0
    ? path.resolve(args[inputDirIndex + 1] ?? "")
    : path.join(
        repoRoot,
        "docs/knowledge-bank/data/public-hearing-transcripts"
      );

function pageLabel(pages) {
  if (pages.length === 1) return `p. ${pages[0]}`;
  return `pp. ${pages[0]}-${pages.at(-1)}`;
}

function yamlQuote(value) {
  return JSON.stringify(value);
}

function eventRecord(event, parsed) {
  const byLabel = new Map(parsed.speakers.map((speaker) => [speaker.speaker, speaker]));
  const missingLabels = [];
  const speakers = event.speakers.map((declared) => {
    const matches = declared.labels
      .map((label) => byLabel.get(label))
      .filter(Boolean);
    if (matches.length === 0) missingLabels.push(...declared.labels);
    const turns = matches
      .flatMap((match) =>
        match.turns
          .filter(
            (turn) =>
              !declared.includePages ||
              turn.pages.some((page) => declared.includePages.includes(page))
          )
          .map((turn) => ({
            transcriptLabel: match.speaker,
            pages: turn.pages,
            text: turn.text
          }))
      )
      .sort(
        (left, right) =>
          left.pages[0] - right.pages[0] ||
          left.transcriptLabel.localeCompare(right.transcriptLabel)
      );
    const pages = [...new Set(turns.flatMap((turn) => turn.pages))].sort(
      (left, right) => left - right
    );
    return {
      name: declared.name,
      attribution: declared.attribution,
      stance: declared.stance,
      publicOfficial: Boolean(declared.publicOfficial),
      transcriptLabels: declared.labels,
      pages,
      turnCount: turns.length,
      wordCount: turns.reduce(
        (total, turn) =>
          total + turn.text.split(/\s+/).filter(Boolean).length,
        0
      ),
      transcriptTextState: "protected-source-not-republished"
    };
  });

  if (missingLabels.length > 0) {
    throw new Error(
      `${event.id}: transcript labels not recovered: ${missingLabels.join(", ")}`
    );
  }

  return {
    id: event.id,
    date: event.date,
    title: event.title,
    subject: event.subject,
    sourceId: event.sourceId,
    sourceUrl: event.sourceUrl,
    transcriptBasename: event.transcriptBasename,
    outputPath: event.outputPath,
    sourceSpeakerCount: parsed.speakerCount,
    sourceTurnCount: parsed.turnCount,
    supportiveWitnessCount: speakers.length,
    supportivePublicOfficialCount: speakers.filter(
      (speaker) => speaker.publicOfficial
    ).length,
    supportiveTurnCount: speakers.reduce(
      (total, speaker) => total + speaker.turnCount,
      0
    ),
    speakers
  };
}

function renderEventMarkdown(event) {
  const stableId = `source.heteroglossia.${event.id.replace(/^hearing\./, "")}`;
  const relationHref = path.relative(
    path.dirname(event.outputPath),
    "docs/knowledge-bank/indexes/public-testimony.md"
  );
  const lines = [
    "---",
    `id: ${stableId}`,
    `title: ${yamlQuote(event.title)}`,
    "kind: source",
    "status: governed-open",
    "visibility: public-safe",
    "sensitivity: moderate",
    "last_reviewed: 2026-07-28",
    "review_by: 2026-10-28",
    `canonical_path: ${event.outputPath}`,
    `summary: ${yamlQuote(`Public-safe speaker index and official transcript locators for ${event.supportiveWitnessCount} speakers whose recorded positions supported ${event.subject}.`)}`,
    `event_date: ${event.date}`,
    `source_id: ${event.sourceId}`,
    `source_url: ${yamlQuote(event.sourceUrl)}`,
    "source_kind: public-hearing-supportive-speaker-index",
    "transcription_state: protected-source-not-republished",
    "projection:",
    "  status: hold",
    "  surfaces: []",
    "relations:",
    "  - type: related_to",
    "    target: index.public-testimony",
    `    href: ${relationHref}`,
    "---",
    "",
    `# ${event.title}`,
    "",
    "## Editorial and population note",
    "",
    `This governed research view indexes ${event.supportiveWitnessCount} public officials, invited witnesses, and public witnesses whose recorded positions affirmatively supported ${event.subject}. It includes support stated with amendments or conditions. Presiding remarks, committee questions, opposition, neutral expert analysis, and unresolved stances remain in the official transcript but are outside this supportive-speaker view unless the speaker is the prime sponsor.`,
    "",
    "The public repository preserves attribution, role, stance, recorded labels, page locators, turn counts, and word counts. It does not republish raw third-party transcript text or incidental personal details. The official transcript controls.",
    "",
    `Official source: [New York City Council transcript](${event.sourceUrl})`,
    "",
    `Recovered source population: ${event.sourceSpeakerCount} transcript labels and ${event.sourceTurnCount} speaker turns. Supportive-speaker view: ${event.supportiveWitnessCount} attributed speakers and ${event.supportiveTurnCount} turns.`,
    ""
  ];

  for (const speaker of event.speakers) {
    lines.push(
      `## ${speaker.name}`,
      "",
      `**Attributed role:** ${speaker.attribution}`,
      "",
      `**Speaker class:** \`${speaker.publicOfficial ? "public-official" : "witness-or-invited-speaker"}\``,
      "",
      `**Recorded stance:** \`${speaker.stance}\``,
      "",
      `**Transcript label${speaker.transcriptLabels.length === 1 ? "" : "s"}:** ${speaker.transcriptLabels.map((label) => `\`${label}\``).join(", ")}`,
      "",
      `**Locator:** ${pageLabel(speaker.pages)}`,
      "",
      `**Attributed turn count:** ${speaker.turnCount}`,
      "",
      `**Attributed word count:** ${speaker.wordCount}`,
      "",
      "**Text state:** protected source; consult the official transcript at the recorded pages.",
      ""
    );
  }

  return `${lines.join("\n").trim()}\n`;
}

function checkGenerated() {
  if (!existsSync(corpusPath)) {
    throw new Error(`Missing generated corpus: ${path.relative(repoRoot, corpusPath)}`);
  }
  const corpus = JSON.parse(readFileSync(corpusPath, "utf8"));
  if (corpus.events.length !== config.events.length) {
    throw new Error("Generated event count does not match the configured population.");
  }
  for (const configured of config.events) {
    const event = corpus.events.find((candidate) => candidate.id === configured.id);
    if (!event) throw new Error(`Missing generated event: ${configured.id}`);
    if (event.supportiveWitnessCount !== configured.speakers.length) {
      throw new Error(`${configured.id}: supportive witness count is stale.`);
    }
    const output = path.join(repoRoot, configured.outputPath);
    if (!existsSync(output)) throw new Error(`Missing generated view: ${configured.outputPath}`);
    const markdown = readFileSync(output, "utf8");
    for (const speaker of configured.speakers) {
      if (!markdown.includes(`## ${speaker.name}`)) {
        throw new Error(`${configured.outputPath}: missing ${speaker.name}`);
      }
    }
  }
  console.log(
    `Hearing heteroglossia check passed: ${corpus.summary.eventCount} events, ` +
      `${corpus.summary.supportiveWitnessCount} attributed supportive speakers, ` +
      `${corpus.summary.supportiveTurnCount} transcript turns.`
  );
}

if (checkOnly) {
  checkGenerated();
  process.exit(0);
}

const events = config.events.map((event) => {
  const transcriptPath = path.join(inputDir, event.transcriptBasename);
  if (!existsSync(transcriptPath)) {
    throw new Error(`Missing transcript input: ${transcriptPath}`);
  }
  const parsed = parseHearingSpeakerTurns(
    readFileSync(transcriptPath, "utf8"),
    event.transcriptBasename
  );
  return eventRecord(event, parsed);
});

for (const event of events) {
  const outputPath = path.join(repoRoot, event.outputPath);
  mkdirSync(path.dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, renderEventMarkdown(event));
}

const corpus = {
  version: config.version,
  reviewedAt: config.reviewedAt,
  populationDefinition: config.populationDefinition,
  summary: {
    eventCount: events.length,
    supportiveWitnessCount: events.reduce(
      (total, event) => total + event.supportiveWitnessCount,
      0
    ),
    supportivePublicOfficialCount: events.reduce(
      (total, event) => total + event.supportivePublicOfficialCount,
      0
    ),
    supportiveTurnCount: events.reduce(
      (total, event) => total + event.supportiveTurnCount,
      0
    )
  },
  events
};

writeFileSync(corpusPath, `${JSON.stringify(corpus, null, 2)}\n`);
console.log(
  `Hearing heteroglossia corpus generated: ${corpus.summary.eventCount} events, ` +
    `${corpus.summary.supportiveWitnessCount} speakers, ` +
    `${corpus.summary.supportiveTurnCount} turns.`
);
