#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const manifestPath = path.resolve(
  process.argv[2] ??
    path.join(
      repoRoot,
      "docs/knowledge-bank/data/public-hearing-events-2026-07.json"
    )
);
const transcriptRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/public-hearing-transcripts"
);
const outputRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/public-hearing-speakers"
);
const sourceRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/public-hearing-transcripts"
);
const eventRoot = path.join(repoRoot, "docs/knowledge-bank/events");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const aliases = new Map([
  ["JAIME BURKHART", "Jamie Burkart"],
  ["JAMIE BURART", "Jamie Burkart"],
  ["JAMIE BURKHART", "Jamie Burkart"],
  ["JAMIE BURKART", "Jamie Burkart"],
  ["MR. JAMIE BURKHART", "Jamie Burkart"],
  ["OLYMPIA KAZI", "Olympia Kazi"],
  ["OLYMPIA COZZI", "Olympia Kazi"],
  ["MS. OLYMPIA COZZI", "Olympia Kazi"],
  ["ROB BOOKMAN", "Robert Bookman"],
  ["MR. ROB BOOKMAN", "Robert Bookman"],
  ["MR. BOB BOOKMAN", "Robert Bookman"],
  ["MARBA BARBEL", "Marva Babel"],
  ["MR. LAURA SEAWELL", "Laura Sewell"],
  ["MR. WILLIAM SPECIK", "William Specik"],
  ["MS. JULIAN HILL", "Julian Hill"],
  ["MS. TAYLER KAYBERRY", "Taylor Kayberry"],
  ["MR. ANDREW RIGGIE", "Andrew Rigie"],
  ["MR. ANDREW RIGG", "Andrew Rigie"]
]);

const excludedLabels = new Set([
  "B E F O R E",
  "COUNCIL MEMBERS",
  "HELD AT",
  "PANEL MEMBERS",
  "SERGEANT-AT-ARMS",
  "CLERK",
  "LEGAL COUNSEL",
  "CHIEF",
  "SPEAKER",
  "SPEAKER LAWYER",
  "MALE SPEAKER",
  "FEMALE SPEAKER",
  "UNIDENTIFIED"
]);

const genericSupportSignals = [
  "i support",
  "we support",
  "strongly support",
  "urge the council to pass",
  "urge you to pass",
  "ask the council to pass",
  "should be repealed",
  "must be repealed"
];

const genericOppositionSignals = [
  "i oppose",
  "we oppose",
  "do not support",
  "does not support",
  "cannot support",
  "should not pass"
];

const caveatSignals = [
  "however",
  "but ",
  "concern",
  "recommend",
  "amend",
  "question",
  "provided that",
  "with the exception"
];

const speakerPattern =
  /^((?:MR\.|MS\.|DR\.|CHAIR(?:MAN|PERSON)?|COUNCIL MEMBER|COMMISSIONER|DEPUTY COMMISSIONER|ASSISTANT COMMISSIONER|JAMIE|OLYMPIA|[A-Z])[A-Z .,'’&()?-]{1,70}):\s*(.*)$/;

const projectByEvent = {
  "event.nycc.consumer-affairs.cabaret-law-2017-06-19": {
    id: "project.nyc-artist-coalition",
    title: "NYC Artist Coalition",
    href: "../projects/nyc-artist-coalition-2017.md"
  },
  "event.nycc.consumer-affairs.cabaret-law-2017-09-14": {
    id: "project.let-nyc-dance",
    title: "Let NYC Dance",
    href: "../projects/let-nyc-dance.md"
  },
  "event.nycc.cultural-affairs.preliminary-budget-2018-03-16": {
    id: "project.nyc-artist-coalition",
    title: "NYC Artist Coalition",
    href: "../projects/nyc-artist-coalition-2017.md"
  },
  "event.nycc.small-business.sbjsa-2018-10-22": {
    id: "project.fair-rent-nyc",
    title: "Fair Rent NYC",
    href: "../projects/fair-rent-nyc.md"
  },
  "event.nycc.public-safety.march-2019-02-11": {
    id: "project.talks-not-raids",
    title: "Talks Not Raids",
    href: "../projects/talks-not-raids.md"
  },
  "event.nycc.small-business.open-data-2019-03-18": {
    id: "project.nyc-artist-coalition",
    title: "NYC Artist Coalition",
    href: "../projects/nyc-artist-coalition-2017.md"
  }
};

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function normalizeSpeaker(rawSpeaker) {
  if (aliases.has(rawSpeaker)) return aliases.get(rawSpeaker);
  return rawSpeaker
    .toLowerCase()
    .replace(/(^|[\s.'’-])\p{L}/gu, (character) => character.toUpperCase());
}

function shouldSkipLine(line) {
  return (
    /^(?:CITY COUNCIL|CITY OF NEW YORK|TRANSCRIPT OF THE MINUTES|World Wide Dictation|Phone:|www\.WorldWideDictation|A P P E A R A N C E S)/i.test(
      line
    ) ||
    /^(?:COMMITTEE ON|CULTURAL AFFAIRS, LIBRARIES|INTERNATIONAL INTERGROUP RELATIONS)\b.*\d+$/.test(
      line
    )
  );
}

function parseTurns(sourceText) {
  const pages = sourceText.split("\f").filter((page) => page.trim());
  const turns = [];
  let active = null;

  function finish() {
    if (!active) return;
    const text = active.lines
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text) {
      turns.push({
        transcriptLabel: active.transcriptLabel,
        speaker: active.speaker,
        transcriptPage: active.transcriptPage,
        text
      });
    }
    active = null;
  }

  for (const [pageIndex, page] of pages.entries()) {
    for (const rawLine of page.split("\n")) {
      const line = rawLine
        .replace(/^\s*\d+\s+/, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!line || shouldSkipLine(line)) continue;

      const match = line.match(speakerPattern);
      if (match) {
        finish();
        const transcriptLabel = match[1].trim();
        active = {
          transcriptLabel,
          speaker: normalizeSpeaker(transcriptLabel),
          transcriptPage: pageIndex + 1,
          lines: match[2] ? [match[2]] : []
        };
        continue;
      }

      if (active) active.lines.push(line);
    }
  }
  finish();

  return { pageCount: pages.length, turns };
}

function matchingSignals(text, signals) {
  const lower = text.toLowerCase();
  return signals.filter((signal) => lower.includes(signal.toLowerCase()));
}

function classifySpeaker(event, speakerTurns) {
  const text = speakerTurns.map((turn) => turn.text).join(" ");
  const labels = [...new Set(speakerTurns.map((turn) => turn.transcriptLabel))];

  if (labels.every((label) => excludedLabels.has(label))) {
    return {
      position: "procedural-or-unattributed",
      basis: "The transcript label is procedural or does not identify a person.",
      supportSignals: [],
      oppositionSignals: [],
      caveatSignals: []
    };
  }

  const supportSignals = matchingSignals(text, [
    ...genericSupportSignals,
    ...event.supportSignals
  ]);
  const oppositionSignals = matchingSignals(text, [
    ...genericOppositionSignals,
    ...event.oppositionSignals
  ]);
  const caveats = matchingSignals(text, caveatSignals);

  if (supportSignals.length && oppositionSignals.length) {
    return {
      position: "mixed-or-multiple-issues",
      basis:
        "Automatic high-precision scan found both favorable and opposing language; human issue-by-issue review is required.",
      supportSignals,
      oppositionSignals,
      caveatSignals: caveats
    };
  }
  if (supportSignals.length) {
    return {
      position: caveats.length
        ? "explicit-support-with-caveat"
        : "explicit-support",
      basis:
        "Automatic high-precision scan found explicit favorable language tied to at least one championed issue. This is a research classification, not an endorsement claim.",
      supportSignals,
      oppositionSignals: [],
      caveatSignals: caveats
    };
  }
  if (oppositionSignals.length) {
    return {
      position: "explicit-opposition",
      basis:
        "Automatic high-precision scan found explicit opposing language tied to at least one championed issue.",
      supportSignals: [],
      oppositionSignals,
      caveatSignals: caveats
    };
  }

  const issueTerms = matchingSignals(
    text,
    event.championedIssues.flatMap((issue) =>
      issue
        .toLowerCase()
        .split(/[^a-z0-9.]+/)
        .filter((term) => term.length >= 5)
    )
  );
  return {
    position: issueTerms.length ? "alignment-review-needed" : "context",
    basis: issueTerms.length
      ? "The testimony discusses issue terms but does not match the deliberately narrow explicit-position rules."
      : "No explicit position on the bounded championed issues was detected.",
    supportSignals: [],
    oppositionSignals: [],
    caveatSignals: caveats
  };
}

function buildLedger(event) {
  const transcriptPath = path.join(transcriptRoot, event.transcriptFile);
  const sourceText = readFileSync(transcriptPath, "utf8");
  const { pageCount, turns } = parseTurns(sourceText);
  const speakerNames = [...new Set(turns.map((turn) => turn.speaker))].sort();
  const speakers = speakerNames.map((speaker) => {
    const speakerTurns = turns.filter((turn) => turn.speaker === speaker);
    const position = classifySpeaker(event, speakerTurns);
    return {
      speaker,
      transcriptLabels: [
        ...new Set(speakerTurns.map((turn) => turn.transcriptLabel))
      ],
      attributionStatus: speakerTurns.some(
        (turn) => aliases.get(turn.transcriptLabel) === speaker
      )
        ? "normalized-from-transcript-label"
        : "transcript-label",
      transcriptPages: [
        ...new Set(speakerTurns.map((turn) => turn.transcriptPage))
      ].sort((left, right) => left - right),
      wordCount: speakerTurns
        .map((turn) => turn.text)
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length,
      turnCount: speakerTurns.length,
      ...position,
      transcriptTextState: "protected-source-not-republished"
    };
  });

  const jamie = speakers.find((speaker) => speaker.speaker === "Jamie Burkart");
  const supportPositions = new Set([
    "explicit-support",
    "explicit-support-with-caveat"
  ]);
  return {
    schemaVersion: 1,
    corpusId: manifest.id,
    event: {
      id: event.id,
      title: event.title,
      date: event.date,
      committee: event.committee,
      championedIssues: event.championedIssues
    },
    source: {
      organization: "New York City Council",
      officialUrl: event.officialUrl,
      protectedTranscriptKey: event.transcriptFile,
      extraction: "pdftotext -layout",
      transcriptSha256: sha256(sourceText),
      publicRepositoryState:
        "Official source link, checksum, population counts, page locators, and speaker index only; raw transcript text is not republished."
    },
    method: {
      population:
        "Every attributed speaker turn parsed from the complete official transcript text.",
      attribution:
        "Speaker labels are preserved from the official transcript. A small alias map normalizes obvious recorded variants while retaining every original label.",
      position:
        "High-precision phrase matching identifies explicit positions. Context and review-needed records remain in the public-safe speaker index; the official transcript remains the authority.",
      warning:
        "Position fields are research aids, not quotations, endorsements, or substitutes for human close reading. Transcript text remains outside the public repository."
    },
    closure: {
      pageCount,
      turnCount: turns.length,
      speakerCount: speakers.length,
      explicitSupportSpeakerCount: speakers.filter((speaker) =>
        supportPositions.has(speaker.position)
      ).length,
      alignmentReviewNeededCount: speakers.filter(
        (speaker) => speaker.position === "alignment-review-needed"
      ).length,
      jamieTranscriptRecovered: Boolean(jamie),
      allParsedTurnsAssignedToSpeaker: turns.every((turn) => turn.speaker)
    },
    explicitSupportSpeakers: speakers
      .filter((speaker) => supportPositions.has(speaker.position))
      .map((speaker) => ({
        speaker: speaker.speaker,
        position: speaker.position,
        transcriptPages: speaker.transcriptPages,
        basis: speaker.basis,
        supportSignals: speaker.supportSignals
      })),
    speakers
  };
}

mkdirSync(outputRoot, { recursive: true });
mkdirSync(sourceRoot, { recursive: true });
mkdirSync(eventRoot, { recursive: true });
const report = [];
for (const event of manifest.events) {
  const ledger = buildLedger(event);
  writeFileSync(
    path.join(outputRoot, event.ledgerFile),
    `${JSON.stringify(ledger, null, 2)}\n`
  );
  report.push({
    event: event.id,
    ...ledger.closure
  });

  const sourceId = `source.${event.id.slice("event.".length)}.official-transcript`;
  const sourceRelativePath = `docs/knowledge-bank/sources/public-hearing-transcripts/${event.slug}.md`;
  const ledgerRelativePath = `../../data/public-hearing-speakers/${event.ledgerFile}`;
  const sourceBody = `---
id: ${sourceId}
title: ${yamlString(`${event.title} official transcript`)}
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: ${sourceRelativePath}
summary: ${yamlString(
    `Official source record and public-safe attributed speaker index for the ${event.date} New York City Council transcript.`
  )}
source_kind: government-record
canonical_url: ${event.officialUrl}
raw_text_state: protected-source-not-republished
relations:
  - type: documents
    target: ${event.id}
    href: ../../events/${event.slug}.md
---

# ${event.title} official transcript

## Public record

- Date: ${event.date}
- Committee: ${event.committee}
- [Official Council transcript PDF](${event.officialUrl})
- [Public-safe attributed speaker and position index](${ledgerRelativePath})
- Extracted with: \`pdftotext -layout\`
- Extracted text SHA-256: \`${ledger.source.transcriptSha256}\`

## Coverage

The official Council transcript remains the complete public record. The
public repository does not republish its raw text. The index accounts for all
${ledger.closure.turnCount} parsed attributed turns to
${ledger.closure.speakerCount} speaker records across
${ledger.closure.pageCount} transcript pages while preserving recorded speaker
labels, page locators, turn counts, and bounded position classifications.

The ledger's ${ledger.closure.explicitSupportSpeakerCount} explicit-support
records are conservative research aids produced by phrase matching. They are
not endorsements, and they are not a complete human interpretation of every
speaker's position. ${ledger.closure.alignmentReviewNeededCount} speaker
records remain queued for issue-by-issue close reading.

## Attribution and interpretation boundary

The New York City Council transcript is the authority for recorded labels and
words. Obvious name variants are normalized only in the ledger, where every
original label remains visible. Consult the official source before quoting or
characterizing a speaker. Raw third-party testimony, incidental personal
details, and complete speech derivatives belong in the protected research
layer rather than public Git.
`;
  writeFileSync(path.join(repoRoot, sourceRelativePath), sourceBody);

  const project = projectByEvent[event.id];
  const championedList = event.championedIssues
    .map((issue) => `- ${issue}`)
    .join("\n");
  const eventBody = `---
id: ${event.id}
title: ${yamlString(event.title)}
kind: event
status: maintained
visibility: public-safe
sensitivity: low
created: ${event.date}
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/events/${event.slug}.md
summary: ${yamlString(
    `${event.date} New York City Council hearing indexed as an attributed, public-safe multi-speaker record with an authoritative official source link.`
  )}
relations:
  - type: uses_source
    target: ${sourceId}
    href: ../sources/public-hearing-transcripts/${event.slug}.md
  - type: related_to
    target: ${project.id}
    href: ${project.href}
---

# ${event.title}

## Orientation

On ${event.date}, the ${event.committee} convened this public hearing. Jamie
Burkart's testimony appears in the complete official record alongside public
officials, advocates, operators, artists, residents, experts, and other
speakers.

The issues Jamie championed in this hearing context included:

${championedList}

## Heteroglossia

This event record intentionally does not reduce the hearing to Jamie's
testimony. The [official transcript source record](../sources/public-hearing-transcripts/${event.slug}.md)
links the authoritative Council transcript and a complete public-safe speaker
index. Favorable, qualified, ambiguous, contextual, and opposing positions
remain represented in the event population without republishing raw testimony
or incidental personal details.

The high-precision support list is a finding aid, not a claim that every
supportive speaker has already been identified or that any person endorses
Jamie's later portfolio framing.
`;
  writeFileSync(
    path.join(eventRoot, `${event.slug}.md`),
    eventBody
  );
}

const totalPages = report.reduce((sum, event) => sum + event.pageCount, 0);
const totalTurns = report.reduce((sum, event) => sum + event.turnCount, 0);
const totalSpeakers = report.reduce((sum, event) => sum + event.speakerCount, 0);
const totalSupport = report.reduce(
  (sum, event) => sum + event.explicitSupportSpeakerCount,
  0
);
const totalReview = report.reduce(
  (sum, event) => sum + event.alignmentReviewNeededCount,
  0
);
const eventRows = manifest.events
  .map((event) => {
    const closure = report.find((entry) => entry.event === event.id);
    return `| [${event.date}: ${event.title}](../events/${event.slug}.md) | ${closure.pageCount} | ${closure.turnCount} | ${closure.speakerCount} | ${closure.explicitSupportSpeakerCount} |`;
  })
  .join("\n");
const indexBody = `---
id: index.knowledge-wiki.public-testimony-and-hearing-voices
title: Public testimony and hearing voices
kind: index
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/indexes/public-testimony-and-hearing-voices.md
summary: Complete official transcript text and attributed speaker ledgers for the six presently recovered New York City Council hearings containing Jamie Burkart testimony.
---

# Public testimony and hearing voices

Public testimony is collective civic speech. This index situates Jamie's
delivered testimony inside complete recorded hearings by preserving the
official sources, event populations, attributed speaker identities, page
locators, and bounded position classifications.

## Current recovered official-hearing population

| Event | Pages | Parsed turns | Speakers | Explicit-support finding aids |
|---|---:|---:|---:|---:|
${eventRows}
| **Total** | **${totalPages}** | **${totalTurns}** | **${totalSpeakers}** | **${totalSupport}** |

Speaker totals are event-level and are not deduplicated across hearings.
Every index counts all parsed turns without republishing their raw text. All
six indexes recovered Jamie's attributed testimony, and every parsed turn is
assigned to a speaker record.

## How to use this corpus

1. Begin with an event page and official source record.
2. Use the explicit-support list only as a conservative finding aid.
3. Read the speaker's words and surrounding pages in the official transcript
   before characterizing a position or quoting.
4. Preserve the Council's recorded label, noting normalized variants.
5. Keep collective credit visible; presence in a shared hearing does not
   establish collaboration, agreement on every issue, or endorsement.

## Open work

${totalReview} event-level speaker records mention issue terms without matching
the narrow explicit-position rules. They remain a close-reading queue rather
than being silently classified. Raw transcript derivatives and incidental
personal details remain in the protected research layer. Additional public
speeches may enter this corpus only when their event, source authority,
attribution, delivery status, rights boundary, and population boundary are
recorded.
`;
writeFileSync(
  path.join(
    repoRoot,
    "docs/knowledge-bank/indexes/public-testimony-and-hearing-voices.md"
  ),
  indexBody
);

console.log(JSON.stringify({ corpus: manifest.id, events: report }, null, 2));
