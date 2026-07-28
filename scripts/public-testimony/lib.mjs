import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import path from "node:path";

import { z } from "zod";

export const defaultRepoRoot = path.resolve(import.meta.dirname, "../..");
export const corpusRelativeRoot =
  "docs/knowledge-bank/data/public-testimony";

const stableIdSchema = z
  .string()
  .regex(/^[a-z0-9]+(?:[.-][a-z0-9]+)*$/);

const turnSchema = z.object({
  ordinal: z.number().int().positive(),
  pageStart: z.number().int().positive(),
  pageEnd: z.number().int().positive(),
  text: z.string().min(1)
});

const speakerSchema = z
  .object({
    id: stableIdSchema,
    displayName: z.string().min(1),
    transcriptLabels: z.array(z.string().min(1)).min(1),
    speakerType: z.enum([
      "public-witness",
      "council-member",
      "administration",
      "hearing-staff",
      "unresolved"
    ]),
    position: z.enum([
      "supportive",
      "supports-in-part",
      "opposed",
      "mixed",
      "out-of-scope",
      "neutral-procedural",
      "unclear"
    ]),
    classificationBasis: z.string().min(1),
    fullTextIncluded: z.boolean(),
    turnCount: z.number().int().nonnegative(),
    wordCount: z.number().int().nonnegative(),
    pageRanges: z.array(z.string().regex(/^\d+(?:-\d+)?$/)),
    turns: z.array(turnSchema),
    attributionNotes: z.array(z.string().min(1)).default([])
  })
  .superRefine((speaker, context) => {
    const shouldInclude =
      speaker.position === "supportive" ||
      speaker.position === "supports-in-part";
    if (speaker.fullTextIncluded !== shouldInclude) {
      context.addIssue({
        code: "custom",
        path: ["fullTextIncluded"],
        message:
          "supportive and supports-in-part speakers require full text; other positions remain census-only"
      });
    }
    if (speaker.fullTextIncluded && speaker.turns.length !== speaker.turnCount) {
      context.addIssue({
        code: "custom",
        path: ["turns"],
        message: "included turn population must match turnCount"
      });
    }
    if (!speaker.fullTextIncluded && speaker.turns.length !== 0) {
      context.addIssue({
        code: "custom",
        path: ["turns"],
        message: "census-only speakers cannot include transcript bodies"
      });
    }
  });

export const testimonyCorpusSchema = z.object({
  schemaVersion: z.literal(1),
  id: stableIdSchema,
  title: z.string().min(1),
  hearingDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  committee: z.string().min(1),
  issue: z.string().min(1),
  source: z.object({
    title: z.string().min(1),
    officialUrl: z.string().url(),
    accessedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    pageCount: z.number().int().positive(),
    sourcePdfSha256: z.string().regex(/^[a-f0-9]{64}$/),
    transcriptSha256: z.string().regex(/^[a-f0-9]{64}$/)
  }),
  transcriptionPolicy: z.string().min(1),
  classificationPolicy: z.string().min(1),
  scopeBoundary: z.string().min(1),
  reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  reviewStatus: z.enum(["complete", "complete-with-open-attribution"]),
  antiClaims: z.array(z.string().min(1)).min(1),
  speakers: z.array(speakerSchema).min(1)
});

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|\/private\/tmp\/|Mobile Documents|Library\/CloudStorage|\.photoslibrary\b)/i;

function cleanLine(rawLine) {
  return rawLine.replace(/^\s*\d{1,2}\s{2,}/, "").trim();
}

function isPageFurniture(line) {
  return (
    !line ||
    /^COMMITTEE ON .+\s+\d+$/i.test(line) ||
    /^(CITY COUNCIL|CITY OF NEW YORK|TRANSCRIPT OF THE MINUTES|Of the)$/i.test(
      line
    ) ||
    /^-+\s*X$/i.test(line) ||
    /^World Wide Dictation/i.test(line) ||
    /^(Phone:|www\.WorldWideDictation)/i.test(line)
  );
}

function appendLine(lines, line) {
  if (!line) return;
  const previous = lines.at(-1);
  if (previous?.endsWith("-") && !previous.endsWith("--")) {
    lines[lines.length - 1] = `${previous}${line}`;
  } else {
    lines.push(line);
  }
}

export function parseOfficialTranscript(source) {
  const turns = [];
  let current = null;

  function flush() {
    if (!current) return;
    const text = current.lines.join(" ").replace(/\s+/g, " ").trim();
    if (text) turns.push({ ...current, text });
    current = null;
  }

  source.split("\f").forEach((page, pageIndex) => {
    const pageNumber = pageIndex + 1;
    for (const rawLine of page.split(/\r?\n/)) {
      const line = cleanLine(rawLine);
      if (isPageFurniture(line)) continue;

      const match = line.match(
        /^([A-Z][A-Z0-9 .,'’()[\]\-]{1,90}):\s*(.*)$/
      );
      if (
        match &&
        !/^(B E F O R E|COUNCIL MEMBERS|HELD AT|START|RECESS)$/i.test(
          match[1].trim()
        )
      ) {
        flush();
        current = {
          transcriptLabel: match[1].trim(),
          pageStart: pageNumber,
          pageEnd: pageNumber,
          lines: []
        };
        appendLine(current.lines, match[2].trim());
      } else if (current) {
        appendLine(current.lines, line);
        current.pageEnd = pageNumber;
      }
    }
  });

  flush();
  return turns.map(({ lines: _lines, ...turn }) => turn);
}

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function ranges(pages) {
  const sorted = [...new Set(pages)].sort((a, b) => a - b);
  const result = [];
  let start = sorted[0];
  let end = sorted[0];
  for (const page of sorted.slice(1)) {
    if (page === end + 1) {
      end = page;
      continue;
    }
    result.push(start === end ? `${start}` : `${start}-${end}`);
    start = page;
    end = page;
  }
  if (start !== undefined) {
    result.push(start === end ? `${start}` : `${start}-${end}`);
  }
  return result;
}

function defaultSpeakerType(label) {
  if (
    /^(CHAIR|COUNCIL|SPEAKER JOHNSON|MAJORITY LEADER|BOROUGH PRESIDENT)/.test(
      label
    )
  ) {
    return "council-member";
  }
  if (
    /^(COMMISSIONER|DEPUTY COMMISSIONER|DEPUTY MAYOR|LINDSAY GREENE|SHIRA GANS|TAMALA BOYD)/.test(
      label
    )
  ) {
    return "administration";
  }
  if (
    /^(CLERK|SERGEANT|LEGAL COUNSEL|COMMITTEE COUNSEL|PANEL MEMBERS)/.test(
      label
    )
  ) {
    return "hearing-staff";
  }
  if (/^(MALE SPEAKER|FEMALE SPEAKER|SPEAKER(?: \d+)?|UNIDENTIFIED)/.test(label)) {
    return "unresolved";
  }
  return "public-witness";
}

export function buildCorpus({ transcript, config }) {
  const parsedTurns = parseOfficialTranscript(transcript);
  const aliasToName = new Map();
  for (const [displayName, labels] of Object.entries(config.aliases ?? {})) {
    for (const label of labels) aliasToName.set(label, displayName);
  }

  const groups = new Map();
  for (const turn of parsedTurns) {
    const displayName =
      aliasToName.get(turn.transcriptLabel) ?? turn.transcriptLabel;
    if (!groups.has(displayName)) {
      groups.set(displayName, {
        displayName,
        transcriptLabels: new Set(),
        turns: []
      });
    }
    const group = groups.get(displayName);
    group.transcriptLabels.add(turn.transcriptLabel);
    group.turns.push(turn);
  }

  const classifications = config.classifications ?? {};
  const speakers = [...groups.values()].map((group) => {
    const classification = classifications[group.displayName] ?? {};
    const speakerType =
      classification.speakerType ??
      defaultSpeakerType([...group.transcriptLabels][0]);
    const position =
      classification.position ??
      config.defaultPositions?.[speakerType] ??
      "unclear";
    const include =
      position === "supportive" || position === "supports-in-part";
    const allPages = group.turns.flatMap((turn) => {
      const pages = [];
      for (let page = turn.pageStart; page <= turn.pageEnd; page += 1) {
        pages.push(page);
      }
      return pages;
    });
    const wordCount = group.turns.reduce(
      (total, turn) => total + turn.text.split(/\s+/).filter(Boolean).length,
      0
    );

    return {
      id: `${config.id}.speaker.${slugify(group.displayName)}`,
      displayName: group.displayName,
      transcriptLabels: [...group.transcriptLabels],
      speakerType,
      position,
      classificationBasis:
        classification.classificationBasis ??
        config.defaultClassificationBasis?.[position] ??
        "Position remains open pending manual close reading.",
      fullTextIncluded: include,
      turnCount: group.turns.length,
      wordCount,
      pageRanges: ranges(allPages),
      turns: include
        ? group.turns.map((turn, index) => ({
            ordinal: index + 1,
            pageStart: turn.pageStart,
            pageEnd: turn.pageEnd,
            text: turn.text
          }))
        : [],
      attributionNotes: classification.attributionNotes ?? []
    };
  });

  return testimonyCorpusSchema.parse({
    schemaVersion: 1,
    id: config.id,
    title: config.title,
    hearingDate: config.hearingDate,
    committee: config.committee,
    issue: config.issue,
    source: {
      ...config.source,
      transcriptSha256: createHash("sha256").update(transcript).digest("hex")
    },
    transcriptionPolicy: config.transcriptionPolicy,
    classificationPolicy: config.classificationPolicy,
    scopeBoundary: config.scopeBoundary,
    reviewedAt: config.reviewedAt,
    reviewStatus: config.reviewStatus,
    antiClaims: config.antiClaims,
    speakers
  });
}

export function evaluateTestimonyCorpora(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const manifest =
    options.manifest ??
    JSON.parse(
      readFileSync(path.join(repoRoot, corpusRelativeRoot, "manifest.json"), "utf8")
    );
  const errors = [];
  const corpora = [];
  const ids = new Set();

  for (const entry of manifest.corpora ?? []) {
    const relativePath = path.join(corpusRelativeRoot, entry.file);
    const source =
      options.sources?.[entry.file] ??
      readFileSync(path.join(repoRoot, relativePath), "utf8");
    if (privatePattern.test(source)) {
      errors.push(`${entry.file}: contains a private path or identifier`);
      continue;
    }
    try {
      const corpus = testimonyCorpusSchema.parse(JSON.parse(source));
      if (corpus.id !== entry.id) {
        errors.push(`${entry.file}: manifest and corpus IDs differ`);
      }
      if (ids.has(corpus.id)) errors.push(`${entry.file}: duplicate corpus ID`);
      ids.add(corpus.id);
      const unresolvedWitnesses = corpus.speakers.filter(
        (speaker) =>
          speaker.speakerType === "public-witness" &&
          speaker.position === "unclear"
      );
      if (unresolvedWitnesses.length) {
        errors.push(
          `${entry.file}: ${unresolvedWitnesses.length} public witnesses remain position-unclear`
        );
      }
      corpora.push(corpus);
    } catch (error) {
      errors.push(
        `${entry.file}: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }

  const supportivePopulation = corpora.reduce(
    (total, corpus) =>
      total +
      corpus.speakers.filter((speaker) => speaker.fullTextIncluded).length,
    0
  );
  return { manifest, corpora, supportivePopulation, errors };
}
