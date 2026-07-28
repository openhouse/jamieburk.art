import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../..");
const scopePath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/supportive-testimony-scope-2026-07.json",
);
const outputPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/supportive-public-testimony-corpus-2026-07.json",
);
const readingCopyPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/supportive-public-testimony-corpus-2026-07.md",
);

const structuralLabelPattern =
  /^(?:B E F O R E$|HELD AT$|COUNCIL MEMB(?:ER|EER)|COUNCIL MEMBERS$|CHAIR|CLERK$|CHIEF$|COM[A-Z]*(?:ONER|INER)|DEPUTY COMMISSIONER|LEGAL COUNSEL$|PANEL MEMBERS$|SERGEANT-AT-ARMS$|SPEAKER JOHNSON|SPEAKER$|MALE SPEAKER$|FEMALE SPEAKER$|UNIDENTIFIED$)/;

function normalizeWhitespace(value) {
  return value.replace(/\s+/g, " ").trim();
}

function detectPage(rawLine) {
  const line = rawLine.replace(/\f/g, "").trim();
  if (!/(?:COMMITTEE|SUBCOMMITTEE|STATED MEETING)/.test(line)) return null;
  const match = line.match(/\s(\d{1,4})\s*$/);
  return match ? Number(match[1]) : null;
}

function parseTranscript(source) {
  const segments = [];
  const labels = new Set();
  let currentPage = null;
  let currentSegment = null;

  for (const rawLine of source.split(/\r?\n/)) {
    const page = detectPage(rawLine);
    if (page !== null) {
      currentPage = page;
      continue;
    }

    const line = rawLine
      .replace(/\f/g, "")
      .replace(/^\s*\d+\s+/, "")
      .trim();

    if (
      !line ||
      /^\d+$/.test(line) ||
      /^(?:CITY COUNCIL|CITY OF NEW YORK|TRANSCRIPT OF THE MINUTES|A P P E A R A N C E S|World Wide Dictation|Phone:)/.test(
        line,
      )
    ) {
      continue;
    }

    const speakerMatch = line.match(/^([A-Z][A-Z .’'\-()]+):\s*(.*)$/);
    if (speakerMatch) {
      const label = speakerMatch[1].trim();
      labels.add(label);
      currentSegment = {
        label,
        page_start: currentPage,
        page_end: currentPage,
        parts: [],
      };
      segments.push(currentSegment);
      if (speakerMatch[2]) currentSegment.parts.push(speakerMatch[2]);
      continue;
    }

    if (currentSegment) {
      currentSegment.page_end = currentPage ?? currentSegment.page_end;
      currentSegment.parts.push(line);
    }
  }

  return {
    labels: [...labels].sort(),
    segments: segments
      .map((segment) => ({
        transcript_label: segment.label,
        page_start: segment.page_start,
        page_end: segment.page_end,
        text: normalizeWhitespace(segment.parts.join(" ")),
      }))
      .filter((segment) => segment.text),
  };
}

function labelSet(entries) {
  return new Set(entries.flatMap((entry) => entry.labels));
}

function classifyEvent(event, parsed) {
  const selectedLabels = labelSet(event.speakers);
  const excludedLabels = labelSet(event.excluded);
  const classifiedLabels = new Set([...selectedLabels, ...excludedLabels]);
  const unclassified = parsed.labels.filter(
    (label) =>
      !classifiedLabels.has(label) && !structuralLabelPattern.test(label),
  );

  const speakers = event.speakers.map((speaker) => {
    const contributions = parsed.segments
      .filter((segment) => speaker.labels.includes(segment.transcript_label))
      .map((segment) => ({
        transcript_label: segment.transcript_label,
        source_pages:
          segment.page_start === segment.page_end
            ? `${segment.page_start}`
            : `${segment.page_start}-${segment.page_end}`,
        text: segment.text,
      }));
    const pages = contributions
      .flatMap((contribution) =>
        contribution.source_pages
          .split("-")
          .map((value) => Number(value))
          .filter(Number.isFinite),
      )
      .sort((left, right) => left - right);
    const fullText = contributions.map((entry) => entry.text).join(" ");

    return {
      display_name: speaker.display_name,
      official_transcript_labels: speaker.labels,
      attribution_status:
        speaker.attribution_status ?? "official-transcript-supported",
      ...(speaker.attribution_note
        ? { attribution_note: speaker.attribution_note }
        : {}),
      position: speaker.position ?? event.default_position,
      source_page_span: pages.length
        ? `${pages[0]}-${pages.at(-1)}`
        : "not-recovered",
      word_count: fullText.split(/\s+/).filter(Boolean).length,
      contributions,
    };
  });

  return {
    id: event.id,
    date: event.date,
    title: event.title,
    committee: event.committee,
    source_url: event.source_url,
    corpus_boundary:
      "Official stenographic transcript; line breaks mechanically normalized; apparent stenographic errors retained.",
    supportive_contributor_count: speakers.length,
    supportive_transcript_label_count: selectedLabels.size,
    speakers,
    exclusion_ledger: event.excluded,
    unclassified_substantive_labels: unclassified,
  };
}

function validateScope(scope) {
  const errors = [];
  if (scope.schema_version !== 1) errors.push("scope schema_version must be 1");
  if (!Array.isArray(scope.events) || scope.events.length !== 5) {
    errors.push("scope must declare exactly five events");
  }
  for (const event of scope.events ?? []) {
    const allLabels = [
      ...event.speakers.flatMap((speaker) => speaker.labels),
      ...event.excluded.flatMap((entry) => entry.labels),
    ];
    const duplicates = allLabels.filter(
      (label, index) => allLabels.indexOf(label) !== index,
    );
    if (duplicates.length) {
      errors.push(`${event.id}: duplicate classified labels: ${duplicates.join(", ")}`);
    }
  }
  return errors;
}

export function validateCorpus(corpus) {
  const errors = [];
  if (corpus.schema_version !== 1) errors.push("schema_version must be 1");
  if (corpus.events.length !== 5) errors.push("expected five events");
  if (corpus.summary.supportive_contributors < 100) {
    errors.push("expected at least 100 supportive contributors");
  }
  if (corpus.summary.unclassified_substantive_labels !== 0) {
    errors.push("every substantive transcript label must be classified");
  }

  for (const event of corpus.events) {
    if (event.unclassified_substantive_labels.length) {
      errors.push(
        `${event.id}: unclassified labels: ${event.unclassified_substantive_labels.join(", ")}`,
      );
    }
    for (const speaker of event.speakers) {
      if (!speaker.contributions.length || speaker.word_count === 0) {
        errors.push(`${event.id}: no recovered words for ${speaker.display_name}`);
      }
      if (speaker.source_page_span.includes("null")) {
        errors.push(`${event.id}: missing page locator for ${speaker.display_name}`);
      }
    }
  }

  const serialized = JSON.stringify(corpus);
  if (/\/(?:Users|Volumes|private|tmp)\//.test(serialized)) {
    errors.push("public corpus must not contain local filesystem paths");
  }
  return errors;
}

export function buildCorpus({ transcriptRoot }) {
  const scope = JSON.parse(fs.readFileSync(scopePath, "utf8"));
  const scopeErrors = validateScope(scope);
  if (scopeErrors.length) throw new Error(scopeErrors.join("\n"));

  const events = scope.events.map((event) => {
    const transcriptPath = path.join(transcriptRoot, event.source_file);
    if (!fs.existsSync(transcriptPath)) {
      throw new Error(`Missing declared transcript: ${event.source_file}`);
    }
    return classifyEvent(
      event,
      parseTranscript(fs.readFileSync(transcriptPath, "utf8")),
    );
  });

  return {
    schema_version: 1,
    generated_on: "2026-07-28",
    title: "Supportive public testimony corpus, 2017-2019",
    declared_scope: scope.declared_scope,
    classification_rule: scope.classification_rule,
    publication_boundary:
      "This public-safe research corpus is a reading resource, not an endorsement, causal proof, or authorization to project every contribution onto the portfolio. Exact quotation and reuse remain editorial decisions.",
    transcription_rule:
      "Text is drawn from official Council stenographic transcripts. Mechanical line reflow does not correct apparent transcription errors. Canonical names are supplied only where the scope ledger records an attribution basis.",
    summary: {
      events: events.length,
      supportive_contributors: events.reduce(
        (total, event) => total + event.supportive_contributor_count,
        0,
      ),
      supportive_transcript_labels: events.reduce(
        (total, event) => total + event.supportive_transcript_label_count,
        0,
      ),
      contributions: events.reduce(
        (total, event) =>
          total +
          event.speakers.reduce(
            (speakerTotal, speaker) =>
              speakerTotal + speaker.contributions.length,
            0,
          ),
        0,
      ),
      words: events.reduce(
        (total, event) =>
          total +
          event.speakers.reduce(
            (speakerTotal, speaker) => speakerTotal + speaker.word_count,
            0,
          ),
        0,
      ),
      unclassified_substantive_labels: events.reduce(
        (total, event) =>
          total + event.unclassified_substantive_labels.length,
        0,
      ),
    },
    events,
  };
}

export function renderCorpusMarkdown(corpus) {
  const lines = [
    "# Supportive public testimony corpus, 2017-2019",
    "",
    "> Generated from the governed scope ledger and official New York City Council",
    "> stenographic transcripts. Line wrapping is normalized; apparent",
    "> stenographic errors remain. Inclusion records support in the named event,",
    "> not endorsement of every coalition position or independent verification of",
    "> every assertion.",
    "",
    `**Population:** ${corpus.summary.supportive_contributors} contributors; ${corpus.summary.contributions} speaking turns; ${corpus.summary.words} words across ${corpus.summary.events} events.`,
    "",
  ];

  for (const event of corpus.events) {
    lines.push(
      `## ${event.date}: ${event.title}`,
      "",
      `**Committee:** ${event.committee}`,
      `**Official transcript:** ${event.source_url}`,
      `**Included contributors:** ${event.supportive_contributor_count}`,
      "",
    );

    for (const speaker of event.speakers) {
      lines.push(
        `### ${speaker.display_name}`,
        "",
        `**Position in this event:** ${speaker.position}`,
        `**Official transcript label(s):** ${speaker.official_transcript_labels.join(", ")}`,
        `**Source page span:** ${speaker.source_page_span}`,
        `**Attribution status:** ${speaker.attribution_status}`,
      );
      if (speaker.attribution_note) {
        lines.push("", `**Attribution note:** ${speaker.attribution_note}`);
      }
      lines.push("");
      for (const contribution of speaker.contributions) {
        lines.push(
          `#### ${contribution.transcript_label}, transcript ${contribution.source_pages.includes("-") ? "pages" : "page"} ${contribution.source_pages}`,
          "",
          contribution.text,
          "",
        );
      }
    }
  }

  lines.push(
    "## Exclusion and uncertainty ledger",
    "",
    "The complete classification ledger, including opposition, neutrality,",
    "conditional or unresolved positions, agency question-and-answer, and",
    "fragments, is preserved in",
    "[supportive-testimony-scope-2026-07.json](supportive-testimony-scope-2026-07.json).",
    "",
  );
  return `${lines.join("\n").replace(/\n+$/, "")}\n`;
}

function main() {
  const refresh = process.argv.includes("--refresh");
  if (refresh) {
    const transcriptRoot = process.env.COUNCIL_TRANSCRIPT_ROOT;
    if (!transcriptRoot) {
      console.error(
        "COUNCIL_TRANSCRIPT_ROOT is required for --refresh and must point to the local official transcript reading copies.",
      );
      process.exit(1);
    }
    const corpus = buildCorpus({ transcriptRoot });
    const errors = validateCorpus(corpus);
    if (errors.length) {
      console.error(errors.join("\n"));
      process.exit(1);
    }
    fs.writeFileSync(outputPath, `${JSON.stringify(corpus, null, 2)}\n`);
    fs.writeFileSync(readingCopyPath, renderCorpusMarkdown(corpus));
    console.log(
      `Wrote ${corpus.summary.supportive_contributors} contributors and ${corpus.summary.words} words across ${corpus.summary.events} events.`,
    );
    return;
  }

  if (!fs.existsSync(outputPath)) {
    console.error("Committed supportive testimony corpus is missing.");
    process.exit(1);
  }
  if (!fs.existsSync(readingCopyPath)) {
    console.error("Committed supportive testimony Markdown reading copy is missing.");
    process.exit(1);
  }
  const corpus = JSON.parse(fs.readFileSync(outputPath, "utf8"));
  const errors = validateCorpus(corpus);
  const expectedReadingCopy = renderCorpusMarkdown(corpus);
  const committedReadingCopy = fs.readFileSync(readingCopyPath, "utf8");
  if (committedReadingCopy !== expectedReadingCopy) {
    errors.push("committed Markdown reading copy is stale");
  }
  if (errors.length) {
    console.error(errors.join("\n"));
    process.exit(1);
  }
  console.log(
    `Supportive testimony corpus PASS: ${corpus.summary.supportive_contributors} contributors, ${corpus.summary.words} words, ${corpus.summary.unclassified_substantive_labels} unclassified labels.`,
  );
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
