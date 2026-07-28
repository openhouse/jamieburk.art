#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const manifestPath = path.join(
  root,
  "docs/knowledge-bank/data/commercial-rent-stabilization-testimony-manifest.json",
);
const dataPath = path.join(
  root,
  "docs/knowledge-bank/data/commercial-rent-stabilization-testimony.json",
);
const sourceDir = path.join(
  root,
  "docs/knowledge-bank/sources/commercial-rent-stabilization",
);
const indexPath = path.join(
  root,
  "docs/knowledge-bank/indexes/commercial-rent-stabilization-testimony.md",
);
const args = process.argv.slice(2);
const check = args.includes("--check");
const rawDirIndex = args.indexOf("--ingest-raw-dir");
const rawDir =
  rawDirIndex >= 0 ? path.resolve(args[rawDirIndex + 1] || "") : null;
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));

function sha256(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeLabel(value) {
  return value
    .replace(/[’]/g, "'")
    .replace(/\s+/g, " ")
    .trim()
    .toUpperCase();
}

function publicSafetyRedact(value) {
  let redactions = 0;
  let text = value.replace(
    /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi,
    () => {
      redactions += 1;
      return "[public-safety redaction: email]";
    },
  );
  text = text.replace(
    /(?<!\d)(?:\+?1[\s.-]*)?\(?\d{3}\)?\s*[-.]?\s*\d{3}\s*[-.]\s*\d{4}(?:\s*(?:x|ext\.?)\s*\d+)?(?!\d)/gi,
    () => {
      redactions += 1;
      return "[public-safety redaction: phone]";
    },
  );
  text = text.replace(
    /\bP\.?\s*O\.?\s+Box\s+\d+\b/gi,
    () => {
      redactions += 1;
      return "[public-safety redaction: postal address]";
    },
  );
  text = text.replace(
    /\b\d{1,5}(?:-\d{1,5})?\s+[A-Za-z0-9.'’ -]{1,48}\s(?:Street|St\.?|Avenue|Ave\.?|Road|Rd\.?|Boulevard|Blvd\.?|Place|Pl\.?|Drive|Dr\.?|Lane|Ln\.?|Court|Ct\.?|Parkway|Pkwy\.?)\b(?:[^,\n]{0,40},?\s*(?:New York|Brooklyn|Bronx|Queens|Staten Island|NYC|NY))?(?:,?\s*NY\s*\d{5})?/gi,
    () => {
      redactions += 1;
      return "[public-safety redaction: street address]";
    },
  );
  return { text, redactions };
}

function cleanWrittenPage(value) {
  return value
    .replace(/\u0000/g, "")
    .split(/\r?\n/)
    .map((line) => line.replace(/\s+$/g, ""))
    .filter((line) => !/^\s*\d+\s*$/.test(line))
    .join("\n")
    .replace(/\n{4,}/g, "\n\n\n")
    .trim();
}

function cleanTranscriptLine(value) {
  return value
    .replace(/\f/g, "")
    .replace(/(?:NEW YORK CITY COUNCIL )?STATED MEETING\s+\d*/gi, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTranscript(raw) {
  const labelPattern = /^([A-Z][A-Za-z0-9 .&’'()[\]/-]{1,90}):\s*(.*)$/;
  const ignoredLabelPattern =
    /^(HELD AT|B E F O R E|COUNCIL MEMBERS|A P P E A R A N C E S)/;
  const standaloneNoise = [
    /^\d+$/,
    /^CITY COUNCIL$/,
    /^CITY OF NEW YORK$/,
    /^TRANSCRIPT OF THE MINUTES$/,
    /^Of the$/,
    /^-+ X$/,
    /^C E R T I F I C A T E$/,
  ];
  const turns = [];
  let current = null;
  let order = 0;

  for (const rawLine of raw.split(/\r?\n/)) {
    const line = cleanTranscriptLine(rawLine);
    const match = line.match(labelPattern);
    if (match && !ignoredLabelPattern.test(match[1])) {
      if (current) turns.push(current);
      current = {
        label: normalizeLabel(match[1]),
        official_label: match[1].replace(/\s+/g, " ").trim(),
        parts: match[2] ? [match[2].trim()] : [],
        order: order++,
      };
      continue;
    }
    if (!current || !line || standaloneNoise.some((pattern) => pattern.test(line))) {
      continue;
    }
    current.parts.push(line);
  }
  if (current) turns.push(current);

  return turns
    .map((turn) => ({
      ...turn,
      text: turn.parts.join(" ").replace(/\s+/g, " ").trim(),
    }))
    .filter((turn) => turn.text);
}

function decodeHtml(value) {
  return value
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");
}

function htmlToText(value) {
  return decodeHtml(
    value
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/p>|<\/div>|<\/li>|<\/h\d>/gi, "\n")
      .replace(/<[^>]+>/g, ""),
  )
    .replace(/\r/g, "")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function parsePublicEventTranscript(raw, parser) {
  const turns = [];
  let current = null;
  let order = 0;
  const flush = () => {
    if (!current) return;
    current.text = current.parts.join("\n").trim();
    if (current.text) turns.push(current);
    current = null;
  };

  for (const rawLine of raw.split(/\r?\n/)) {
    let match = null;
    if (parser === "otter") {
      match = rawLine.match(
        /^(.{1,140}?)\s{1,2}((?:\d{1,2}:)?\d{1,2}:\d{2})\s*$/,
      );
    } else if (parser === "corrected-bracketed") {
      match = rawLine.match(
        /^\[((?:\d{1,2}:)?\d{2}:\d{2})\]\s+(.{1,160}?):\s*$/,
      );
      if (match) match = [match[0], match[2], match[1]];
    } else {
      throw new Error(`Unsupported public-event parser: ${parser}`);
    }

    if (match) {
      flush();
      current = {
        label: normalizeLabel(match[1]),
        official_label: match[1].trim(),
        timestamp: match[2],
        parts: [],
        order: order++,
      };
      continue;
    }
    if (current) current.parts.push(rawLine);
  }
  flush();
  return turns;
}

function extractSponsorMemo(raw, parser) {
  let parts = [];
  if (parser === "nysenate") {
    const start = raw.indexOf("<!-- Sponsor Memo -->");
    const end = raw.indexOf("<!-- Full Text -->", start);
    if (start < 0 || end < 0) {
      throw new Error("Official Senate sponsor-memo section was not found");
    }
    parts = [...raw.slice(start, end).matchAll(/<pre[^>]*>([\s\S]*?)<\/pre>/gi)]
      .map((match) => htmlToText(match[1]));
  } else if (parser === "nyassembly") {
    const match = raw.match(/<PRE WIDTH="80">([\s\S]*?)<\/pre>/i);
    if (!match) {
      throw new Error("Official Assembly sponsor memorandum was not found");
    }
    parts = [htmlToText(match[1])];
  } else {
    throw new Error(`Unsupported sponsor-memo parser: ${parser}`);
  }
  const text = parts.filter(Boolean).join("\n\n").trim();
  if (!text.includes("PURPOSE OR GENERAL IDEA OF BILL") || !text.includes("JUSTIFICATION")) {
    throw new Error("Sponsor memorandum is missing required sections");
  }
  return text;
}

function readVerifiedRaw(filename, expectedHash) {
  if (!rawDir || !fs.existsSync(rawDir)) {
    throw new Error("--ingest-raw-dir must point to the local transcript text directory");
  }
  const target = path.join(rawDir, filename);
  const raw = fs.readFileSync(target, "utf8");
  const actualHash = sha256(raw);
  if (actualHash !== expectedHash) {
    throw new Error(
      `${filename}: raw transcript hash ${actualHash} does not match manifest`,
    );
  }
  return raw;
}

function ingestStateLegislation(record) {
  const raw = readVerifiedRaw(record.raw_filename, record.raw_text_sha256);
  const memo = publicSafetyRedact(extractSponsorMemo(raw, record.parser));
  return {
    bill: record.bill,
    chamber: record.chamber,
    prime_sponsor: record.prime_sponsor,
    introduced: record.introduced,
    status: record.status,
    status_date: record.status_date,
    current_committee: record.current_committee,
    source_url: record.source_url,
    co_sponsors: record.co_sponsors,
    source_text_sha256: record.raw_text_sha256,
    sponsor_memo: memo.text,
    transcript_character_count: memo.text.length,
    redaction_count: memo.redactions,
    scope_note: record.scope_note,
  };
}

function ingestPublicEvent(event) {
  const raw = readVerifiedRaw(event.raw_filename, event.raw_text_sha256);
  const parsed = parsePublicEventTranscript(raw, event.parser);
  const speakers = event.speakers.map((speaker) => {
    const labels = new Set(speaker.labels.map(normalizeLabel));
    const matching = parsed.filter((turn) => labels.has(turn.label));
    const timestamps = new Set(speaker.timestamps);
    const selected = matching.filter((turn) => timestamps.has(turn.timestamp));
    if (selected.length !== timestamps.size) {
      const found = selected.map((turn) => turn.timestamp).join(", ");
      throw new Error(
        `${event.date}: ${speaker.name} expected ${timestamps.size} timestamped turns; found ${selected.length} (${found})`,
      );
    }
    let redactionCount = 0;
    const turns = selected
      .sort((a, b) => a.order - b.order)
      .map((turn) => {
        const redacted = publicSafetyRedact(turn.text);
        redactionCount += redacted.redactions;
        return {
          official_label: turn.official_label,
          timestamp: turn.timestamp,
          text: redacted.text,
        };
      });
    return {
      name: speaker.name,
      role_at_event: speaker.role_at_event,
      current_context: speaker.current_context,
      position: speaker.position,
      scope_note: speaker.scope_note,
      selected_turn_count: turns.length,
      transcript_character_count: turns.reduce(
        (total, turn) => total + turn.text.length,
        0,
      ),
      redaction_count: redactionCount,
      turns,
    };
  });
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    venue: event.venue,
    source_kind: event.source_kind,
    source_url: event.source_url,
    source_text_sha256: event.raw_text_sha256,
    scope_note: event.scope_note,
    coverage_notes: event.coverage_notes,
    speakers,
    speaker_count: speakers.length,
    selected_turn_count: speakers.reduce(
      (total, speaker) => total + speaker.selected_turn_count,
      0,
    ),
    transcript_character_count: speakers.reduce(
      (total, speaker) => total + speaker.transcript_character_count,
      0,
    ),
    redaction_count: speakers.reduce(
      (total, speaker) => total + speaker.redaction_count,
      0,
    ),
  };
}

function ingestOfficialStateStatementSource(source) {
  const records = source.records.map((record) => {
    const redacted = publicSafetyRedact(record.text);
    return {
      name: record.name,
      role_at_statement: record.role_at_statement,
      position: record.position,
      text: redacted.text,
      transcript_character_count: redacted.text.length,
      redaction_count: redacted.redactions,
    };
  });
  return {
    id: source.id,
    title: source.title,
    date: source.date,
    source_url: source.source_url,
    source_kind: source.source_kind,
    records,
    record_count: records.length,
    transcript_character_count: records.reduce(
      (total, record) => total + record.transcript_character_count,
      0,
    ),
    redaction_count: records.reduce(
      (total, record) => total + record.redaction_count,
      0,
    ),
    scope_note: source.scope_note,
  };
}

function ingestStatedMeeting(meeting) {
  const raw = readVerifiedRaw(meeting.raw_filename, meeting.raw_text_sha256);
  const parsed = parseTranscript(raw);
  const speakers = meeting.speakers.map((speaker) => {
    const wanted = new Set(speaker.labels.map((label) => normalizeLabel(label)));
    const selected = parsed
      .filter((turn) => wanted.has(turn.label))
      .sort((a, b) => a.order - b.order);
    if (selected.length === 0 && !speaker.recorded_responses) {
      throw new Error(`${meeting.date}: no turns found for ${speaker.name}`);
    }
    let redactionCount = 0;
    const sourceTurns = speaker.recorded_responses
      ? speaker.recorded_responses.map((response) => ({
          official_label: response.official_label,
          text: response.text,
          source_locator: response.source_locator,
        }))
      : selected;
    const turns = sourceTurns.map((turn) => {
      const redacted = publicSafetyRedact(turn.text);
      redactionCount += redacted.redactions;
      return {
        official_label: turn.official_label,
        text: redacted.text,
        ...(turn.source_locator ? { source_locator: turn.source_locator } : {}),
      };
    });
    return {
      name: speaker.name,
      role: speaker.role,
      position: speaker.position,
      scope_note: speaker.scope_note,
      official_labels: [
        ...new Set(sourceTurns.map((turn) => turn.official_label)),
      ],
      turn_count: turns.length,
      transcript_character_count: turns.reduce(
        (total, turn) => total + turn.text.length,
        0,
      ),
      redaction_count: redactionCount,
      turns,
    };
  });
  return {
    date: meeting.date,
    bill: meeting.bill,
    prime_sponsor: meeting.prime_sponsor,
    source_url: meeting.source_url,
    pdf_sha256: meeting.pdf_sha256,
    source_text_sha256: meeting.raw_text_sha256,
    speakers,
    speaker_count: speakers.length,
    transcript_character_count: speakers.reduce(
      (total, speaker) => total + speaker.transcript_character_count,
      0,
    ),
    redaction_count: speakers.reduce(
      (total, speaker) => total + speaker.redaction_count,
      0,
    ),
  };
}

function ingestPublicOfficialStatements(source) {
  const raw = readVerifiedRaw(source.raw_filename, source.raw_text_sha256);
  const parsed = parseTranscript(raw);
  const records = source.records.map((record) => {
    const wanted = new Set(record.labels.map((label) => normalizeLabel(label)));
    const matching = parsed
      .filter((turn) => wanted.has(turn.label))
      .sort((a, b) => a.order - b.order);
    if (matching.length === 0) {
      throw new Error(`${source.date}: no public-official turns found for ${record.name}`);
    }
    const requestedNumbers =
      record.selection === "all"
        ? matching.map((_, index) => index + 1)
        : record.turn_numbers;
    if (!Array.isArray(requestedNumbers) || requestedNumbers.length === 0) {
      throw new Error(`${record.name}: public-official turn selection is empty`);
    }

    let redactionCount = 0;
    const turns = requestedNumbers.map((turnNumber) => {
      const turn = matching[turnNumber - 1];
      if (!turn) {
        throw new Error(
          `${record.name}: requested turn ${turnNumber}; only ${matching.length} turns exist`,
        );
      }
      const redacted = publicSafetyRedact(turn.text);
      redactionCount += redacted.redactions;
      return {
        official_label: turn.official_label,
        turn_number_for_label: turnNumber,
        text: redacted.text,
      };
    });
    return {
      name: record.name,
      role: record.role,
      position: record.position,
      scope_note: record.scope_note,
      official_labels: [...new Set(matching.map((turn) => turn.official_label))],
      selected_turn_count: turns.length,
      available_turn_count: matching.length,
      transcript_character_count: turns.reduce(
        (total, turn) => total + turn.text.length,
        0,
      ),
      redaction_count: redactionCount,
      turns,
    };
  });

  return {
    date: source.date,
    bill: source.bill,
    source_url: source.source_url,
    source_text_sha256: source.raw_text_sha256,
    records,
    record_count: records.length,
    selected_turn_count: records.reduce(
      (total, record) => total + record.selected_turn_count,
      0,
    ),
    transcript_character_count: records.reduce(
      (total, record) => total + record.transcript_character_count,
      0,
    ),
    redaction_count: records.reduce(
      (total, record) => total + record.redaction_count,
      0,
    ),
    coverage_notes: source.coverage_notes,
  };
}

function ingestOfficialSupportDocument(document) {
  const raw = readVerifiedRaw(document.raw_filename, document.raw_text_sha256);
  const start = raw.indexOf("Res. No.");
  const end = raw.search(/\n{2,}LS #/);
  if (start < 0) {
    throw new Error(`${document.file}: official resolution body was not found`);
  }
  const extracted = raw
    .slice(start, end > start ? end : undefined)
    .replace(/\n\.\.Title\s*\n/g, "\n")
    .replace(/\n\.\.Body\s*\n/g, "\n")
    .replace(/[ \t]+$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const redacted = publicSafetyRedact(extracted);
  return {
    file: document.file,
    date: document.date,
    title: document.title,
    source_url: document.source_url,
    legislation_url: document.legislation_url,
    attachment_sha256: document.attachment_sha256,
    source_text_sha256: document.raw_text_sha256,
    attributed_sponsors: document.attributed_sponsors,
    position: document.position,
    scope_note: document.scope_note,
    text: redacted.text,
    transcript_character_count: redacted.text.length,
    redaction_count: redacted.redactions,
  };
}

function ingestWrittenTestimony(source) {
  const raw = readVerifiedRaw(source.raw_filename, source.raw_text_sha256);
  const pages = raw.split("\f");
  if (pages.length < source.total_pages) {
    throw new Error(
      `Written testimony has ${pages.length} extracted pages; expected at least ${source.total_pages}`,
    );
  }

  const documents = source.documents.map((document) => {
    const selectedPages = document.pages.map((pageNumber) => {
      const page = pages[pageNumber - 1];
      if (page === undefined) {
        throw new Error(`${document.name}: missing extracted page ${pageNumber}`);
      }
      return cleanWrittenPage(page);
    });
    const joined = selectedPages.join("\n\n[Official attachment page break]\n\n");
    const redacted = publicSafetyRedact(joined);
    return {
      name: document.name,
      organization: document.organization,
      pages: document.pages,
      position: document.position,
      text: redacted.text,
      transcript_character_count: redacted.text.length,
      redaction_count: redacted.redactions,
    };
  });

  return {
    date: source.date,
    bill: source.bill,
    source_url: source.source_url,
    pdf_sha256: source.pdf_sha256,
    source_text_sha256: source.raw_text_sha256,
    official_attachment_page_count: source.total_pages,
    documents,
    document_count: documents.length,
    transcript_character_count: documents.reduce(
      (total, document) => total + document.transcript_character_count,
      0,
    ),
    redaction_count: documents.reduce(
      (total, document) => total + document.redaction_count,
      0,
    ),
    coverage_notes: source.coverage_notes,
  };
}

function ingest() {
  const statedMeetings = manifest.stated_meetings.map(ingestStatedMeeting);
  const publicOfficialStatements = ingestPublicOfficialStatements(
    manifest.oral_public_official_statements,
  );
  const officialSupportDocuments =
    manifest.official_support_documents.map(ingestOfficialSupportDocument);
  const writtenTestimony = ingestWrittenTestimony(manifest.written_testimony);
  const stateLegislation = manifest.state_legislation.map(
    ingestStateLegislation,
  );
  const publicEvents = manifest.public_events.map(ingestPublicEvent);
  const officialStateStatements = manifest.official_state_statements.map(
    ingestOfficialStateStatementSource,
  );
  return {
    version: 2,
    generated_at: "2026-07-28",
    corpus_scope: manifest.scope,
    transcript_fidelity:
      "Derived from official New York City Council and New York State legislative records, official public statements, and locally retained transcripts of public events. Speaker wording, bracketed notation, spelling, and apparent transcription errors are retained after page-furniture removal or line reflow. Direct email addresses, phone numbers, postal boxes, and street addresses are redacted.",
    legislation: manifest.legislation,
    state_legislation: stateLegislation,
    stated_meetings: statedMeetings,
    oral_public_official_statements: publicOfficialStatements,
    official_support_documents: officialSupportDocuments,
    written_testimony: writtenTestimony,
    public_events: publicEvents,
    official_state_statements: officialStateStatements,
    coverage_notes: manifest.coverage_notes,
    totals: {
      legislation_record_count: manifest.legislation.length,
      state_legislation_record_count: stateLegislation.length,
      stated_meeting_count: statedMeetings.length,
      stated_speaker_count: statedMeetings.reduce(
        (total, meeting) => total + meeting.speaker_count,
        0,
      ),
      public_official_record_count: publicOfficialStatements.record_count,
      public_official_statement_turn_count:
        publicOfficialStatements.selected_turn_count,
      official_support_document_count: officialSupportDocuments.length,
      written_document_count: writtenTestimony.document_count,
      public_event_count: publicEvents.length,
      public_event_speaker_count: publicEvents.reduce(
        (total, event) => total + event.speaker_count,
        0,
      ),
      public_event_turn_count: publicEvents.reduce(
        (total, event) => total + event.selected_turn_count,
        0,
      ),
      official_state_statement_record_count: officialStateStatements.reduce(
        (total, source) => total + source.record_count,
        0,
      ),
      transcript_character_count:
        writtenTestimony.transcript_character_count +
        publicOfficialStatements.transcript_character_count +
        stateLegislation.reduce(
          (total, record) => total + record.transcript_character_count,
          0,
        ) +
        publicEvents.reduce(
          (total, event) => total + event.transcript_character_count,
          0,
        ) +
        officialStateStatements.reduce(
          (total, source) => total + source.transcript_character_count,
          0,
        ) +
        officialSupportDocuments.reduce(
          (total, document) => total + document.transcript_character_count,
          0,
        ) +
        statedMeetings.reduce(
          (total, meeting) => total + meeting.transcript_character_count,
          0,
        ),
      redaction_count:
        writtenTestimony.redaction_count +
        publicOfficialStatements.redaction_count +
        stateLegislation.reduce(
          (total, record) => total + record.redaction_count,
          0,
        ) +
        publicEvents.reduce(
          (total, event) => total + event.redaction_count,
          0,
        ) +
        officialStateStatements.reduce(
          (total, source) => total + source.redaction_count,
          0,
        ) +
        officialSupportDocuments.reduce(
          (total, document) => total + document.redaction_count,
          0,
        ) +
        statedMeetings.reduce(
          (total, meeting) => total + meeting.redaction_count,
          0,
        ),
    },
  };
}

function yamlScalar(value) {
  return String(value).replace(/"/g, '\\"');
}

function blockquote(value) {
  return value
    .split(/\r?\n/)
    .map((line) => (line ? `> ${line}` : ">"))
    .join("\n");
}

function renderLineage(data) {
  const rows = data.legislation
    .map(
      (record) =>
        `| [${record.file}](${record.source_url}) | ${record.prime_sponsor} | ${record.introduced} | ${record.status} | ${record.sponsor_count} |`,
    )
    .join("\n");
  return `---
id: source.nycc.commercial-rent-stabilization-legislative-lineage
title: "NYC Council commercial-rent-stabilization legislative lineage"
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/legislative-lineage.md
summary: "Official Council lifecycle records for Int 1796-2019, Int 0093-2022, and the current state-legislation resolution Res 0496-2026."
source_kind: official-public-legislation-record
public_use_status: public
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# NYC Council commercial-rent-stabilization legislative lineage

| File | Prime sponsor | Introduced | Status | Council sponsors |
| --- | --- | --- | --- | ---: |
${rows}

## Record notes

${data.legislation
  .map(
    (record) =>
      `### ${record.file}\n\n${record.summary}\n\nThe official record reports \`${record.status}\` as of ${record.status_date}.`,
  )
  .join("\n\n")}

## Boundaries

- Int 1796-2019 and Int 0093-2022 were municipal bills and were filed at the
  ends of their respective Council sessions. This corpus does not claim either
  became law.
- Res 0496-2026 is a Council resolution calling for state action. It is part of
  the current policy lineage, but it is not a reintroduction of the municipal
  bills and is not counted as one.
- Statuses are a 2026-07-28 snapshot and require refresh before later public use.
`;
}

function renderStatedMeeting(meeting) {
  const id = `source.nycc.commercial-rent-stabilization-stated.${meeting.date}`;
  const sections = meeting.speakers
    .map((speaker) => {
      const turns = speaker.turns
        .map(
          (turn) =>
            `> **${turn.official_label}:**${turn.source_locator ? ` _(${turn.source_locator})_` : ""}\n>\n${blockquote(turn.text)}`,
        )
        .join("\n>\n> * * *\n>\n");
      return `## ${speaker.name}\n\n- **Role:** ${speaker.role}\n- **Position:** \`${speaker.position}\`\n- **Record note:** ${speaker.scope_note}\n\n${turns}`;
    })
    .join("\n\n");
  return `---
id: ${id}
title: "${yamlScalar(`${meeting.bill}: stated-meeting sponsor record, ${meeting.date}`)}"
kind: source
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/stated-${meeting.date}.md
summary: "All recovered transcript turns for the prime sponsor and identified supporting co-sponsors at the ${meeting.date} stated meeting."
source_kind: official-public-transcript-derived-corpus
source_date: ${meeting.date}
source_url: ${meeting.source_url}
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# ${meeting.bill}: stated-meeting sponsor record, ${meeting.date}

**Prime sponsor:** ${meeting.prime_sponsor}

**Canonical source:** [New York City Council stated-meeting transcript](${meeting.source_url})

The complete recovered turns for the selected sponsor and co-sponsor labels
appear below. The record notes deliberately distinguish substantive
commercial-rent-stabilization remarks from procedural or unrelated remarks.

${sections}

## Boundary

The official transcript remains the canonical complete meeting record. A
missing substantive introduction statement is recorded as a non-recovery, not
as evidence that no such statement was made elsewhere.
`;
}

function renderPublicOfficialStatements(source) {
  const sections = source.records
    .map((record) => {
      const turns = record.turns
        .map(
          (turn) =>
            `> **${turn.official_label}, attributed turn ${turn.turn_number_for_label}:**\n>\n${blockquote(turn.text)}`,
        )
        .join("\n>\n> * * *\n>\n");
      return `## ${record.name}

- **Role:** ${record.role}
- **Classification:** \`${record.position}\`
- **Selection:** ${record.selected_turn_count} of ${record.available_turn_count} attributed turns
- **Scope note:** ${record.scope_note}

${turns}`;
    })
    .join("\n\n");
  return `---
id: source.nycc.commercial-rent-stabilization-public-officials.2021-09-17
title: "Commercial rent hearing: supportive public-official statements, 2021-09-17"
kind: source
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/public-officials-2021-09-17.md
summary: "Complete official transcript turns in which public officials supported Intro 1796, a related commercial-tenant measure, or the need to address the commercial-rent crisis, with exact scope boundaries."
source_kind: official-public-transcript-derived-corpus
source_date: ${source.date}
source_url: ${source.source_url}
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# Commercial rent hearing: supportive public-official statements, 2021-09-17

**Canonical source:** [New York City Council hearing transcript](${source.source_url})

**Selected public officials:** ${source.record_count}

**Complete attributed turns retained:** ${source.selected_turn_count}

This source-return layer separates direct support for Intro 1796 from support
for a related measure and recognition of the policy problem. A sympathetic
statement is never silently promoted into bill endorsement.

${sections}

## Coverage ledger

${source.coverage_notes.map((note) => `- ${note}`).join("\n")}

## Boundary

The official transcript remains the canonical complete hearing record.
Selections are complete attributed turns, identified against a hash-bound
source transcript. Classifications describe only the scope stated above.
`;
}

function renderOfficialSupportDocument(document) {
  return `---
id: source.nycc.commercial-rent-stabilization-resolution.0496-2026
title: "Res 0496-2026: full official support text"
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/resolution-0496-2026.md
summary: "Full official text of the Council resolution calling for state passage of the New York City Small Business Rent Stabilization Act."
source_kind: official-public-legislation-text
source_date: ${document.date}
source_url: ${document.source_url}
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# Res 0496-2026: full official support text

**Official attachment:** [Res. No. 496](${document.source_url})

**Legislation record:** [NYC Council file ${document.file}](${document.legislation_url})

**Attributed sponsors:** ${document.attributed_sponsors.join(", ")}

**Classification:** \`${document.position}\`

${document.scope_note}

## Full official text

${blockquote(document.text)}

## Boundary

This is the full recovered text of the official resolution attachment, not an
individually delivered floor speech by every sponsor. The official meeting
record does not provide a transcript attachment for an additional prime-sponsor
statement, so no such speech is inferred.
`;
}

function renderWrittenTestimony(source) {
  const ledger = source.documents
    .map(
      (document) =>
        `| ${document.name} | ${document.organization} | ${document.position} | ${document.pages.join(", ")} |`,
    )
    .join("\n");
  const sections = source.documents
    .map(
      (document) => `## ${document.name}

- **Attribution / organization:** ${document.organization}
- **Position:** \`${document.position}\`
- **Official attachment pages:** ${document.pages.join(", ")}

${blockquote(document.text)}`,
    )
    .join("\n\n");
  return `---
id: source.nycc.commercial-rent-stabilization-written.2021-09-17
title: "Intro 1796: full attributed written support testimony, 2021-09-17"
kind: source
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/written-2021-09-17.md
summary: "Full recovered text of ${source.document_count} attributed written submissions supporting or materially qualifying commercial rent stabilization in the official Council attachment."
source_kind: official-public-written-testimony-derived-corpus
source_date: 2021-09-17
source_url: ${source.source_url}
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# Intro 1796: full attributed written support testimony, 2021-09-17

**Canonical source:** [New York City Council hearing-testimony attachment](${source.source_url})

**Official attachment:** ${source.official_attachment_page_count} pages

**Included support cohort:** ${source.document_count} attributed submissions

## Inclusion ledger

| Contributor | Organization | Position | Official pages |
| --- | --- | --- | ---: |
${ledger}

\`supportive\` records direct support. \`qualified-support\` records support for
commercial rent stabilization with material amendments, cautions, or a
different preferred implementation.

## Full attributed written testimony

The text below reproduces the complete recovered page ranges for every included
submission. Page order is preserved. Direct email addresses, phone numbers,
postal boxes, and street addresses are redacted; the official attachment
remains available at the canonical source.

${sections}

## Coverage and boundaries

${source.coverage_notes.map((note) => `- ${note}`).join("\n")}
- Statements remain attributed testimony. The corpus does not independently
  verify each factual, quantitative, legal, or causal assertion.
`;
}

function renderStateLegislation(data) {
  const sections = data.state_legislation
    .map(
      (record) => `## ${record.bill}

- **Chamber:** ${record.chamber}
- **Prime sponsor:** ${record.prime_sponsor}
- **Introduced:** ${record.introduced}
- **Status:** ${record.status} as of ${record.status_date}
- **Committee:** ${record.current_committee}
- **Co-sponsors:** ${record.co_sponsors.join(", ")}
- **Official record:** [${record.bill}](${record.source_url})

${record.scope_note}

### Full official sponsor memorandum

${blockquote(record.sponsor_memo)}`,
    )
    .join("\n\n");
  return `---
id: source.nys.commercial-rent-stabilization-legislation.2025-2026
title: "A5568A and S8319: official bill records and sponsor memoranda"
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/state-legislation-2025-2026.md
summary: "Current official Albany records and complete sponsor memoranda for the New York City Small Business Rent Stabilization Act."
source_kind: official-public-state-legislation-record
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# A5568A and S8319: official bill records and sponsor memoranda

These are the active same-as Assembly and Senate bills in the 2025-2026
session. Sponsor memoranda are official written legislative statements, not
delivered chamber speeches.

${sections}

## Chamber-speech non-recovery

The official bill pages place both bills in committee and provide no chamber
video or transcript for an introduction or floor speech. No floor speech is
inferred. The sponsor memoranda and the legislators' separately published
public statements are the recoverable introduction record.
`;
}

function renderPublicEvents(data) {
  const events = data.public_events
    .map((event) => {
      const speakers = event.speakers
        .map((speaker) => {
          const turns = speaker.turns
            .map(
              (turn) =>
                `> **${turn.official_label}, ${turn.timestamp}:**\n>\n${blockquote(turn.text)}`,
            )
            .join("\n>\n> * * *\n>\n");
          return `### ${speaker.name}

- **Role at event:** ${speaker.role_at_event}
- **Current context:** ${speaker.current_context}
- **Classification:** \`${speaker.position}\`
- **Scope note:** ${speaker.scope_note}

${turns}`;
        })
        .join("\n\n");
      return `## ${event.title}

- **Date:** ${event.date}
- **Venue:** ${event.venue}
- **Source:** [${event.source_kind}](${event.source_url})
- **Included speakers:** ${event.speaker_count}
- **Included attributed turns:** ${event.selected_turn_count}
- **Scope note:** ${event.scope_note}

${speakers}

### Coverage notes

${event.coverage_notes.map((note) => `- ${note}`).join("\n")}`;
    })
    .join("\n\n");
  return `---
id: source.public-events.commercial-rent-stabilization.2025-2026
title: "Commercial Rent Stabilization: full supportive public-event speeches, 2025-2026"
kind: source
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/public-events-2025-2026.md
summary: "Complete recovered, timestamp-bound speeches supporting Commercial Rent Stabilization at four public events."
source_kind: public-event-audio-transcript-derived-corpus
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
  - type: related_to
    target: method.transcript-linked-event-photography
    href: ../../methods/transcript-linked-event-photography.md
---

# Commercial Rent Stabilization: full supportive public-event speeches, 2025-2026

This corpus preserves complete recovered speaker turns from public events.
Each selection is bound to the local source transcript by SHA-256 and to exact
speaker timestamps. Apparent transcription errors remain visible. The source
recording remains canonical.

These timestamps can seed a private return to Jamie's simultaneous documentary
photography through the
[transcript-linked event photography method](../../methods/transcript-linked-event-photography.md).
That association is a research lead, not publication clearance.

${events}

## Attribution boundary

Public-event participation does not imply agreement with every bill provision
or every other speaker. Eon Huntley spoke as an Assembly candidate in March
2026; his later primary victory is recorded as later context, not retroactive
officeholder status.
`;
}

function renderOfficialStateStatements(data) {
  const sections = data.official_state_statements
    .map((source) => {
      const records = source.records
        .map(
          (record) => `### ${record.name}

- **Role at statement:** ${record.role_at_statement}
- **Classification:** \`${record.position}\`

${blockquote(record.text)}`,
        )
        .join("\n\n");
      return `## ${source.title}

**Date:** ${source.date}

**Official source:** [New York State Senate press release](${source.source_url})

${source.scope_note}

${records}`;
    })
    .join("\n\n");
  return `---
id: source.nys.commercial-rent-stabilization-public-statements.2026
title: "Commercial Rent Stabilization: official Albany public statements, 2026"
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-stabilization/official-state-statements-2026.md
summary: "Complete attributed pro-bill statements published in two official New York State Senate releases."
source_kind: official-public-state-press-statements
public_use_status: public
relations:
  - type: documents
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../../indexes/commercial-rent-stabilization-testimony.md
---

# Commercial Rent Stabilization: official Albany public statements, 2026

These are full attributed quotations as published by the New York State
Senate. They are official written public statements, not necessarily verbatim
transcripts of delivered speeches.

${sections}
`;
}

function renderIndex(data) {
  const oral = data.stated_meetings
    .map(
      (meeting) =>
        `- [${meeting.bill}: stated meeting, ${meeting.date}](../sources/commercial-rent-stabilization/stated-${meeting.date}.md)`,
    )
    .join("\n");
  return `---
id: index.knowledge-wiki.commercial-rent-stabilization-testimony
title: "Commercial rent stabilization testimony"
kind: index
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/indexes/commercial-rent-stabilization-testimony.md
summary: "Legislation lineage and full attributed Council testimony supporting New York City commercial rent stabilization."
public_use_status: public
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.public-testimony
    href: public-testimony.md
---

# Commercial rent stabilization testimony

This collection preserves the city and state record across legislation,
Council hearings, official public statements, and complete recovered speeches
from public campaign events.

## Collection

- [Legislative lineage](../sources/commercial-rent-stabilization/legislative-lineage.md)
${oral}
- [Full attributed oral support testimony, 2021-09-17](../sources/testimony-heteroglossia/2021-09-17.md)
- [Supportive public-official statements, 2021-09-17](../sources/commercial-rent-stabilization/public-officials-2021-09-17.md)
- [Full attributed written support testimony, 2021-09-17](../sources/commercial-rent-stabilization/written-2021-09-17.md)
- [Full official text of Res 0496-2026](../sources/commercial-rent-stabilization/resolution-0496-2026.md)
- [A5568A and S8319: official bill records and sponsor memoranda](../sources/commercial-rent-stabilization/state-legislation-2025-2026.md)
- [Full supportive public-event speeches, 2025-2026](../sources/commercial-rent-stabilization/public-events-2025-2026.md)
- [Official Albany public statements, 2026](../sources/commercial-rent-stabilization/official-state-statements-2026.md)

## Corpus totals

- ${data.totals.legislation_record_count} legislation or resolution records
- ${data.totals.state_legislation_record_count} active Albany bill records with full sponsor memoranda
- ${data.totals.stated_meeting_count} stated meetings
- ${data.totals.stated_speaker_count} selected sponsor/co-sponsor records
- ${data.totals.public_official_record_count} public-official scope records containing ${data.totals.public_official_statement_turn_count} complete attributed turns
- ${data.totals.official_support_document_count} full official support document
- ${data.totals.written_document_count} attributed written support submissions
- ${data.totals.public_event_speaker_count} speaker records across ${data.totals.public_event_count} public events, containing ${data.totals.public_event_turn_count} complete timestamped turns
- ${data.totals.official_state_statement_record_count} full attributed statements from official New York State releases
- ${data.totals.transcript_character_count.toLocaleString("en-US")} preserved transcript characters in this collection
- ${data.totals.redaction_count} public-safety redactions

## Use boundary

This is a public research corpus, not a claim that every speaker agreed on every
provision. Before quoting, return to the attributed source page, preserve the
speaker's position and qualification, and cite the corresponding official or
public-event source.
`;
}

function renderAll(data) {
  const files = new Map([
    [path.join(sourceDir, "legislative-lineage.md"), renderLineage(data)],
    [
      path.join(sourceDir, "public-officials-2021-09-17.md"),
      renderPublicOfficialStatements(data.oral_public_official_statements),
    ],
    [
      path.join(sourceDir, "resolution-0496-2026.md"),
      renderOfficialSupportDocument(data.official_support_documents[0]),
    ],
    [
      path.join(sourceDir, "written-2021-09-17.md"),
      renderWrittenTestimony(data.written_testimony),
    ],
    [
      path.join(sourceDir, "state-legislation-2025-2026.md"),
      renderStateLegislation(data),
    ],
    [
      path.join(sourceDir, "public-events-2025-2026.md"),
      renderPublicEvents(data),
    ],
    [
      path.join(sourceDir, "official-state-statements-2026.md"),
      renderOfficialStateStatements(data),
    ],
    [indexPath, renderIndex(data)],
  ]);
  for (const meeting of data.stated_meetings) {
    files.set(
      path.join(sourceDir, `stated-${meeting.date}.md`),
      renderStatedMeeting(meeting),
    );
  }
  return files;
}

function writeOrCheck(target, content) {
  if (check) {
    const existing = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    if (existing !== content) {
      throw new Error(
        `Generated commercial-rent testimony corpus is stale: ${path.relative(root, target)}`,
      );
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

let data;
if (rawDir) {
  data = ingest();
  writeOrCheck(dataPath, `${JSON.stringify(data, null, 2)}\n`);
} else {
  data = JSON.parse(fs.readFileSync(dataPath, "utf8"));
}

for (const [target, content] of renderAll(data)) {
  writeOrCheck(target, content);
}

console.log(
  `${check ? "Checked" : "Rendered"} ${data.totals.written_document_count} written submissions, ${data.totals.stated_speaker_count} stated-meeting speaker records, and ${data.totals.public_official_statement_turn_count} public-official turns.`,
);
