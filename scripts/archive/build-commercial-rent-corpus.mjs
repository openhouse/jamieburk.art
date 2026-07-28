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
const manifestPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-events-2026-07.json"
);
const transcriptRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-transcripts"
);
const ledgerRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-speakers"
);
const writtenRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-written-support"
);
const sourceRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/commercial-rent-records"
);
const eventRoot = path.join(repoRoot, "docs/knowledge-bank/events");
const indexPath = path.join(
  repoRoot,
  "docs/knowledge-bank/indexes/commercial-rent-stabilization-testimony.md"
);

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

const speakerPattern =
  /^((?:COUNCIL MEMBER|CHAIRPERSON|CHAIRMAN|BOROUGH PRESIDENT|PUBLIC ADVOCATE|SPEAKER|COMMISSIONER|DEPUTY COMMISSIONER|ASSISTANT COMMISSIONER|COMMITTEE COUNSEL|SERGEANT AT ARMS|MAJORITY LEADER|MINORITY LEADER|MR\.|MS\.|DR\.|INTERPRETER|[A-ZÁÉÍÓÚÜÑ])[A-ZÁÉÍÓÚÜÑ .,'’&()?-]{1,90}):\s*(.*)$/u;

const excludedSpeakerLabels = new Set([
  "B E F O R E",
  "COUNCIL MEMBERS",
  "PANEL MEMBERS",
  "HELD AT",
  "CLERK",
  "SPEAKER",
  "UNIDENTIFIED",
  "MALE SPEAKER",
  "FEMALE SPEAKER"
]);

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function yamlString(value) {
  return JSON.stringify(String(value));
}

function titleCaseLabel(value) {
  return value
    .toLowerCase()
    .replace(/(^|[\s.'’ÁÉÍÓÚÜÑ-])\p{L}/gu, (character) =>
      character.toUpperCase()
    );
}

function parseTranscript(sourceText) {
  const pages = sourceText.split("\f").filter((page) => page.trim());
  const turns = [];
  let active = null;

  function finish() {
    if (!active) return;
    const text = active.lines
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();
    if (text) turns.push({ ...active, text });
    active = null;
  }

  for (const [pageIndex, page] of pages.entries()) {
    for (const rawLine of page.split("\n")) {
      const line = rawLine
        .replace(/^\s*\d+\s+/, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!line) continue;
      const match = line.match(speakerPattern);
      if (match) {
        finish();
        active = {
          speakerKey: match[1].trim(),
          transcriptPage: pageIndex + 1,
          lines: match[2] ? [match[2]] : []
        };
      } else if (active) {
        active.lines.push(line);
      }
    }
  }
  finish();

  return { pages, turns };
}

function buildSpeakerLedger(record) {
  const sourceText = readFileSync(
    path.join(transcriptRoot, record.transcriptFile),
    "utf8"
  );
  const { pages, turns } = parseTranscript(sourceText);
  const supportByKey = new Map(
    record.supportSpeakers.map((speaker) => [speaker.speakerKey, speaker])
  );
  const contextByKey = new Map(
    record.contextualPublicOfficials.map((speaker) => [
      speaker.speakerKey,
      speaker
    ])
  );
  const keys = [...new Set(turns.map((turn) => turn.speakerKey))].sort();
  const speakers = keys.map((speakerKey) => {
    const speakerTurns = turns.filter(
      (turn) => turn.speakerKey === speakerKey
    );
    const support = supportByKey.get(speakerKey);
    const context = contextByKey.get(speakerKey);
    return {
      speakerKey,
      displayName:
        support?.displayName ??
        context?.displayName ??
        titleCaseLabel(speakerKey),
      role: support?.role ?? context?.role ?? null,
      publicOfficial:
        Boolean(support?.publicOfficial) || Boolean(context?.role),
      classification:
        support?.position ??
        context?.classification ??
        (excludedSpeakerLabels.has(speakerKey)
          ? "procedural-or-unattributed"
          : "unclassified-complete-record"),
      classificationBasis:
        context?.basis ??
        (support
          ? "Human close reading identified this speaker as explicit support, qualified support, or directly supportive alignment."
          : "No support classification is asserted; the complete attributed turn remains preserved."),
      transcriptPages: [
        ...new Set(speakerTurns.map((turn) => turn.transcriptPage))
      ].sort((left, right) => left - right),
      wordCount: speakerTurns
        .map((turn) => turn.text)
        .join(" ")
        .split(/\s+/)
        .filter(Boolean).length,
      turns: speakerTurns.map(({ lines, ...turn }) => turn)
    };
  });
  const missingSupportSpeakers = record.supportSpeakers.filter(
    (candidate) =>
      !speakers.some((speaker) => speaker.speakerKey === candidate.speakerKey)
  );
  const missingContextOfficials = record.contextualPublicOfficials.filter(
    (candidate) =>
      !speakers.some((speaker) => speaker.speakerKey === candidate.speakerKey)
  );
  const supportSpeakers = speakers.filter((speaker) =>
    supportByKey.has(speaker.speakerKey)
  );
  const supportivePublicOfficials = supportSpeakers.filter(
    (speaker) => speaker.publicOfficial
  );

  const ledger = {
    schemaVersion: 1,
    corpusId: manifest.id,
    event: {
      id: record.id,
      title: record.title,
      date: record.date,
      legislation: record.legislation,
      primeSponsor: record.primeSponsor
    },
    source: {
      organization: "New York City Council",
      officialUrl: record.officialTranscriptUrl,
      transcriptFile: record.transcriptFile,
      extraction: "pdftotext -layout",
      transcriptSha256: sha256(sourceText)
    },
    method: {
      population:
        "Every attributed speaker turn parsed from the complete recovered official transcript text.",
      supportReview:
        "The support roster is a human-reviewed finding aid. Explicit support, qualified support, and supportive alignment remain distinct.",
      publicOfficials:
        "Sponsorship, supportive questioning, and an explicit supporting statement are recorded separately. Sponsorship is never substituted for speech.",
      warning:
        "The ledger is a research aid, not an endorsement claim. Read complete turns and surrounding transcript pages before quotation or public characterization."
    },
    closure: {
      pageCount: pages.length,
      turnCount: turns.length,
      speakerCount: speakers.length,
      reviewedSupportSpeakerCount: supportSpeakers.length,
      supportivePublicOfficialCount: supportivePublicOfficials.length,
      contextualPublicOfficialCount: record.contextualPublicOfficials.length,
      allParsedTurnsAssigned: turns.every((turn) => turn.speakerKey),
      allReviewedSupportSpeakersRecovered:
        missingSupportSpeakers.length === 0,
      allContextualPublicOfficialsRecovered:
        missingContextOfficials.length === 0,
      missingSupportSpeakers,
      missingContextOfficials
    },
    reviewedSupportSpeakers: supportSpeakers.map((speaker) => ({
      speakerKey: speaker.speakerKey,
      displayName: speaker.displayName,
      role: speaker.role,
      publicOfficial: speaker.publicOfficial,
      classification: speaker.classification,
      transcriptPages: speaker.transcriptPages,
      turns: speaker.turns
    })),
    supportivePublicOfficials: supportivePublicOfficials.map((speaker) => ({
      speakerKey: speaker.speakerKey,
      displayName: speaker.displayName,
      role: speaker.role,
      classification: speaker.classification,
      transcriptPages: speaker.transcriptPages,
      turns: speaker.turns
    })),
    contextualPublicOfficials: speakers
      .filter((speaker) => contextByKey.has(speaker.speakerKey))
      .map((speaker) => ({
        speakerKey: speaker.speakerKey,
        displayName: speaker.displayName,
        role: speaker.role,
        classification: speaker.classification,
        classificationBasis: speaker.classificationBasis,
        transcriptPages: speaker.transcriptPages,
        turns: speaker.turns
      })),
    speakers
  };

  writeFileSync(
    path.join(ledgerRoot, record.ledgerFile),
    `${JSON.stringify(ledger, null, 2)}\n`
  );
  return ledger;
}

function buildWrittenSupport(record) {
  if (!record.writtenTestimonyFile) return null;
  const sourceText = readFileSync(
    path.join(transcriptRoot, record.writtenTestimonyFile),
    "utf8"
  );
  const pages = sourceText.split("\f");
  const submissions = record.writtenSupport.map((submission) => {
    const [startPage, endPage] = submission.pages;
    const selectedPages = pages.slice(startPage - 1, endPage);
    const fullText = selectedPages.join("\f").trimEnd();
    const outputFile = `${submission.slug}.txt`;
    writeFileSync(path.join(writtenRoot, outputFile), `${fullText}\n`);
    return {
      ...submission,
      outputFile,
      pageCount: endPage - startPage + 1,
      wordCount: fullText.split(/\s+/).filter(Boolean).length,
      sha256: sha256(fullText)
    };
  });
  const result = {
    schemaVersion: 1,
    corpusId: manifest.id,
    eventId: record.id,
    source: {
      organization: "New York City Council",
      officialUrl: record.officialWrittenTestimonyUrl,
      transcriptFile: record.writtenTestimonyFile,
      extraction: "pdftotext -layout",
      transcriptSha256: sha256(sourceText)
    },
    method: {
      population:
        "Every attributed submission identified by human close reading as explicit support, qualified support, or directly supportive alignment within the recovered official written-testimony attachment.",
      boundary:
        "The complete official attachment is retained separately. Selected page ranges preserve full submission text, including qualifications and recommendations.",
      warning:
        "A supportive-alignment record supports the policy problem or intervention direction without necessarily endorsing every provision of Int. 1796."
    },
    closure: {
      officialAttachmentPageCount: pages.filter((page) => page.trim()).length,
      reviewedSupportSubmissionCount: submissions.length,
      explicitSupportCount: submissions.filter(
        (submission) => submission.position === "explicit-support"
      ).length,
      qualifiedSupportCount: submissions.filter(
        (submission) => submission.position === "qualified-support"
      ).length,
      supportiveAlignmentCount: submissions.filter(
        (submission) => submission.position === "supportive-alignment"
      ).length,
      allRangesWithinAttachment: submissions.every(
        (submission) => submission.pages[1] <= pages.length
      ),
      allSelectedTextNonempty: submissions.every(
        (submission) => submission.wordCount > 0
      )
    },
    submissions
  };
  writeFileSync(
    path.join(
      writtenRoot,
      "commercial-rent-written-support-2021.json"
    ),
    `${JSON.stringify(result, null, 2)}\n`
  );
  return result;
}

function buildSourceRecord(record, ledger, written) {
  const sourceId = `source.${record.id.slice("event.".length)}.official-record`;
  const sourceRelativePath =
    `docs/knowledge-bank/sources/commercial-rent-records/${record.slug}.md`;
  const transcriptLink = record.transcriptFile
    ? `- [Complete extracted official transcript](../../data/commercial-rent-transcripts/${record.transcriptFile})\n- [Complete attributed speaker ledger](../../data/commercial-rent-speakers/${record.ledgerFile})`
    : "- No official spoken-transcript attachment was recovered as of 2026-07-28.";
  const writtenLinks = record.writtenTestimonyFile
    ? `\n- [Complete official written-testimony attachment text](../../data/commercial-rent-transcripts/${record.writtenTestimonyFile})\n- [Reviewed supportive written-submission ledger](../../data/commercial-rent-written-support/commercial-rent-written-support-2021.json)`
    : "";
  const resolutionLinks = record.officialLegislationTextFile
    ? `\n- [Complete official resolution text](../../data/commercial-rent-transcripts/${record.officialLegislationTextFile})\n- [Official agenda text](../../data/commercial-rent-transcripts/${record.officialAgendaFile})\n- [Official minutes text](../../data/commercial-rent-transcripts/${record.officialMinutesFile})`
    : "";
  const coverage = ledger
    ? `The transcript ledger assigns all ${ledger.closure.turnCount} parsed turns to ${ledger.closure.speakerCount} speaker records across ${ledger.closure.pageCount} pages. It identifies ${ledger.closure.reviewedSupportSpeakerCount} reviewed supportive speakers, including ${ledger.closure.supportivePublicOfficialCount} public officials with explicit supporting statements.`
    : "The official agenda, minutes, and full legislative text are preserved. No spoken transcript is inferred.";
  const body = `---
id: ${sourceId}
title: ${yamlString(`${record.title} official record`)}
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: ${sourceRelativePath}
summary: ${yamlString(
    `Complete recovered New York City Council record for ${record.legislation} on ${record.date}.`
  )}
source_kind: government-record
canonical_url: ${record.legislationUrl}
relations:
  - type: documents
    target: ${record.id}
    href: ../../events/${record.slug}.md
---

# ${record.title} official record

## Authority

- [Official legislation record](${record.legislationUrl})
${record.officialTranscriptUrl ? `- [Official Council transcript PDF](${record.officialTranscriptUrl})` : ""}
${transcriptLink}${writtenLinks}${resolutionLinks}

## Coverage

${coverage}

## Public-official boundary

Sponsorship, co-sponsorship, a favorable question, and an explicit statement of
support are different records. This source preserves those distinctions. When a
prime sponsor made no substantive statement in the recovered transcript, the
absence is recorded rather than filled by inference.

## Use boundary

These are public government records, preserved for research and preparation.
Read a speaker's complete turns and surrounding source pages before quoting or
characterizing a position. Presence in the same record does not imply
collaboration with Jamie or endorsement of this portfolio.
`;
  writeFileSync(path.join(repoRoot, sourceRelativePath), body);
  return { sourceId, sourceRelativePath };
}

function buildEventRecord(record, ledger, source) {
  const officialSupport = ledger?.supportivePublicOfficials ?? [];
  const supportLines = officialSupport.length
    ? officialSupport
        .map(
          (speaker) =>
            `- **${speaker.displayName}**, ${speaker.role ?? "public official"}: ${speaker.classification}; complete turns on transcript pages ${speaker.transcriptPages.join(", ")}.`
        )
        .join("\n")
    : record.primeSponsorStatement.position ===
        "sponsorship-and-resolution-support"
      ? `- **${record.primeSponsor}**, prime sponsor: the complete official resolution text is preserved; no spoken statement is inferred.`
      : "- No supportive public-official speech was identified in this recovered transcript.";
  const contextLines = ledger?.contextualPublicOfficials.length
    ? `\n## Contextual public-official speech\n\n${ledger.contextualPublicOfficials
        .map(
          (speaker) =>
            `- **${speaker.displayName}**, ${speaker.role}: ${speaker.classification}. ${speaker.classificationBasis}`
        )
        .join("\n")}\n`
    : "";
  const speakerCoverage = ledger
    ? `The complete speaker ledger preserves ${ledger.closure.turnCount} turns from ${ledger.closure.speakerCount} recorded speakers. The reviewed support finding aid contains ${ledger.closure.reviewedSupportSpeakerCount} speakers.`
    : "No official spoken-transcript attachment was recovered; the agenda, minutes, and complete legislative text are preserved instead.";
  const heteroglossia = ledger
    ? `The [official source record](../sources/commercial-rent-records/${record.slug}.md)
preserves supportive, qualified, contextual, neutral, skeptical, and opposing
speech together. The support roster is a finding aid for research and speech
preparation, not a claim that all speakers agreed with one another or endorse
Jamie's later framing.`
    : `The [official source record](../sources/commercial-rent-records/${record.slug}.md)
preserves the agenda, minutes, and complete legislative text. It does not
preserve a spoken corpus, so this event record makes no claim about the range of
voices or positions expressed in the room.`;
  const body = `---
id: ${record.id}
title: ${yamlString(record.title)}
kind: event
status: maintained
visibility: public-safe
sensitivity: low
created: ${record.date}
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/events/${record.slug}.md
summary: ${yamlString(
    `${record.date} New York City Council record for ${record.legislation}, with complete recovered text and bounded support findings.`
  )}
relations:
  - type: uses_source
    target: ${source.sourceId}
    href: ../sources/commercial-rent-records/${record.slug}.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
---

# ${record.title}

## Orientation

- Date: ${record.date}
- Legislation: ${record.legislation}
- Prime sponsor: ${record.primeSponsor}

${speakerCoverage}

## Supportive public officials

${supportLines}
${contextLines}
## Prime-sponsor record

**${record.primeSponsorStatement.status}.** ${record.primeSponsorStatement.basis}

This record does not use sponsorship as a substitute for spoken testimony.

## Heteroglossia

${heteroglossia}
`;
  writeFileSync(path.join(eventRoot, `${record.slug}.md`), body);
}

mkdirSync(ledgerRoot, { recursive: true });
mkdirSync(writtenRoot, { recursive: true });
mkdirSync(sourceRoot, { recursive: true });

const results = [];
for (const record of manifest.records) {
  const ledger = record.transcriptFile
    ? buildSpeakerLedger(record)
    : null;
  const written = buildWrittenSupport(record);
  const source = buildSourceRecord(record, ledger, written);
  buildEventRecord(record, ledger, source);
  results.push({ record, ledger, written, source });
}

const oralSupportTotal = results.reduce(
  (sum, result) =>
    sum + (result.ledger?.closure.reviewedSupportSpeakerCount ?? 0),
  0
);
const officialSupportTotal = results.reduce(
  (sum, result) =>
    sum + (result.ledger?.closure.supportivePublicOfficialCount ?? 0),
  0
);
const writtenSupportTotal = results.reduce(
  (sum, result) =>
    sum + (result.written?.closure.reviewedSupportSubmissionCount ?? 0),
  0
);
const transcriptPageTotal = results.reduce(
  (sum, result) => sum + (result.ledger?.closure.pageCount ?? 0),
  0
);
const transcriptTurnTotal = results.reduce(
  (sum, result) => sum + (result.ledger?.closure.turnCount ?? 0),
  0
);
const recordRows = results
  .map(({ record, ledger, written }) => {
    const pageCount = ledger?.closure.pageCount ?? "n/a";
    const turnCount = ledger?.closure.turnCount ?? "n/a";
    const supportCount =
      ledger?.closure.reviewedSupportSpeakerCount ?? 0;
    const officialCount =
      ledger?.closure.supportivePublicOfficialCount ??
      (record.primeSponsorStatement.position ===
      "sponsorship-and-resolution-support"
        ? "legislative text"
        : 0);
    const writtenCount =
      written?.closure.reviewedSupportSubmissionCount ?? 0;
    return `| [${record.date}: ${record.legislation}](../events/${record.slug}.md) | ${pageCount} | ${turnCount} | ${supportCount} | ${officialCount} | ${writtenCount} |`;
  })
  .join("\n");
const officialRoster = results
  .flatMap(({ record, ledger }) => {
    const spoken = (ledger?.supportivePublicOfficials ?? []).map(
      (speaker) =>
        `- **${speaker.displayName}** (${record.date}, ${record.legislation}): ${speaker.classification}; [complete event record](../events/${record.slug}.md).`
    );
    if (
      record.primeSponsorStatement.position ===
      "sponsorship-and-resolution-support"
    ) {
      spoken.push(
        `- **${record.primeSponsor}** (${record.date}, ${record.legislation}): prime sponsor of the preserved official resolution text; no spoken transcript is inferred.`
      );
    }
    return spoken;
  })
  .join("\n");
const absenceRoster = results
  .filter(
    ({ record }) =>
      record.primeSponsorStatement.status ===
      "not-recovered-in-official-transcript"
  )
  .map(
    ({ record }) =>
      `- **${record.primeSponsor}**, ${record.legislation}, ${record.date}: ${record.primeSponsorStatement.basis}`
  )
  .join("\n");
const indexBody = `---
id: index.knowledge-wiki.commercial-rent-stabilization-testimony
title: Commercial Rent Stabilization testimony
kind: index
status: governed-open
visibility: public-safe
sensitivity: low
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/indexes/commercial-rent-stabilization-testimony.md
summary: Complete recovered New York City Council records and bounded oral, written, and public-official support findings for Commercial Rent Stabilization, 2019-2026.
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.public-testimony-and-hearing-voices
    href: public-testimony-and-hearing-voices.md
---

# Commercial Rent Stabilization testimony

Commercial Rent Stabilization entered the Council record through different
legislative sessions, sponsors, hearing formats, and coalitions of support. This
index preserves those records without collapsing sponsorship, testimony,
questioning, and collective advocacy into one claim.

## Recovered official population

| Record | Transcript pages | Parsed turns | Reviewed supportive oral speakers | Supportive public officials | Supportive written submissions |
|---|---:|---:|---:|---:|---:|
${recordRows}

Across the transcript-bearing records, the corpus preserves
${transcriptPageTotal} pages and ${transcriptTurnTotal} parsed attributed turns.
The human-reviewed finding aids surface ${oralSupportTotal} supportive oral
speakers, including ${officialSupportTotal} public officials with explicit
supporting speech, plus ${writtenSupportTotal} complete supportive or
support-aligned written submissions from the official 2021 attachment.

## Supportive public officials

${officialRoster}

These are statement-level findings. Co-sponsorship that is not accompanied by a
recovered statement remains in the legislation record but is not counted here
as supportive speech.

## Prime-sponsor absences

${absenceRoster}

For Res. 0496-2026, the complete official resolution text is preserved and
attributed to prime sponsor Tiffany Cabán, but no official spoken-transcript
attachment had been recovered as of July 28, 2026.

## How to use this corpus

1. Start with an event record and its official Council source.
2. Use support rosters as finding aids, then read the complete turns or
   submission.
3. Keep explicit support, qualified support, and supportive alignment distinct.
4. Preserve disagreement and qualification when quoting.
5. Do not infer that a speaker collaborated with Jamie or endorses this
   portfolio.

## Closure boundary

“All” means all attributed supportive records found in the bounded official
sources listed here after a human close-reading pass. It does not mean every
speech ever delivered elsewhere, every future attachment, or every statement
whose source has not yet been recovered. Newly surfaced official records must
re-enter review and update the closure counts.
`;
writeFileSync(indexPath, indexBody);

const failures = results.flatMap(({ record, ledger, written }) => {
  const issues = [];
  if (ledger && !ledger.closure.allParsedTurnsAssigned) {
    issues.push(`${record.id}: an attributed turn lacks a speaker key`);
  }
  if (ledger && !ledger.closure.allReviewedSupportSpeakersRecovered) {
    issues.push(
      `${record.id}: support speakers not recovered: ${JSON.stringify(ledger.closure.missingSupportSpeakers)}`
    );
  }
  if (ledger && !ledger.closure.allContextualPublicOfficialsRecovered) {
    issues.push(
      `${record.id}: contextual officials not recovered: ${JSON.stringify(ledger.closure.missingContextOfficials)}`
    );
  }
  if (written && !written.closure.allRangesWithinAttachment) {
    issues.push(`${record.id}: written range exceeds attachment`);
  }
  if (written && !written.closure.allSelectedTextNonempty) {
    issues.push(`${record.id}: a written support extraction is empty`);
  }
  return issues;
});

console.log(
  JSON.stringify(
    {
      corpus: manifest.id,
      records: results.map(({ record, ledger, written }) => ({
        id: record.id,
        transcript: ledger?.closure ?? null,
        written: written?.closure ?? null
      })),
      failures
    },
    null,
    2
  )
);

if (failures.length) process.exitCode = 1;
