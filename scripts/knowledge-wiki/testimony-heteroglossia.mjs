#!/usr/bin/env node

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const manifestPath = path.join(
  root,
  "docs/knowledge-bank/data/public-testimony-heteroglossia-manifest.json",
);
const dataPath = path.join(
  root,
  "docs/knowledge-bank/data/public-testimony-heteroglossia.json",
);
const sourceDir = path.join(
  root,
  "docs/knowledge-bank/sources/testimony-heteroglossia",
);
const args = new Set(process.argv.slice(2));
const check = args.has("--check");
const ingestIndex = process.argv.indexOf("--ingest-raw-dir");
const rawDir =
  ingestIndex >= 0 ? path.resolve(process.argv[ingestIndex + 1] || "") : null;

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

function cleanTranscriptLine(value) {
  return value
    .replace(/\f/g, "")
    .replace(
      /COMMITTEE ON (?:CONSUMER AFFAIRS|CULTURAL AFFAIRS, LIBRARIES AND INTERNATIONAL INTERGROUP RELATIONS|SMALL BUSINESS|JUSTICE SYSTEM)\s+\d*/gi,
      "",
    )
    .replace(/\s+/g, " ")
    .trim();
}

function parseTranscript(raw) {
  const labelPattern =
    /^([A-Z][A-Za-z0-9 .&’'()[\]/-]{1,90}):\s*(.*)$/;
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
    /(?<!\d)(?:\+?1[\s.-]*)?\(?\d{3}\)?\s*[-.]?\s*\d{3}\s*[-.]\s*\d{4}(?!\d)/g,
    () => {
      redactions += 1;
      return "[public-safety redaction: phone]";
    },
  );
  return { text, redactions };
}

function ingest() {
  if (!rawDir || !fs.existsSync(rawDir)) {
    throw new Error("--ingest-raw-dir must point to the local transcript text directory");
  }

  const hearings = manifest.hearings.map((hearing) => {
    const rawPath = path.join(rawDir, `${hearing.date}-raw.txt`);
    const raw = fs.readFileSync(rawPath, "utf8");
    const actualHash = sha256(raw);
    if (actualHash !== hearing.raw_text_sha256) {
      throw new Error(
        `${hearing.date}: raw transcript hash ${actualHash} does not match manifest`,
      );
    }

    const parsed = parseTranscript(raw);
    const selectedLabels = new Set(
      hearing.speakers.flatMap((speaker) =>
        speaker.labels.map((label) => normalizeLabel(label)),
      ),
    );
    const contributors = hearing.speakers.map((speaker) => {
      const wanted = new Set(speaker.labels.map((label) => normalizeLabel(label)));
      const selectedTurns = parsed
        .filter((turn) => wanted.has(turn.label))
        .sort((a, b) => a.order - b.order);
      if (selectedTurns.length === 0) {
        throw new Error(
          `${hearing.date}: no transcript turns found for ${speaker.name}`,
        );
      }

      let redactionCount = 0;
      const turns = selectedTurns.map((turn) => {
        const result = publicSafetyRedact(turn.text);
        redactionCount += result.redactions;
        return {
          official_label: turn.official_label,
          text: result.text,
        };
      });

      return {
        name: speaker.name,
        official_labels: [...new Set(selectedTurns.map((turn) => turn.official_label))],
        role: speaker.role || "public witness",
        position: speaker.position || "supportive",
        issue_scope: speaker.issue_scope || hearing.default_issue_scope,
        turn_count: turns.length,
        transcript_character_count: turns.reduce(
          (total, turn) => total + turn.text.length,
          0,
        ),
        redaction_count: redactionCount,
        turns,
      };
    });

    const unselectedLabels = [...new Set(parsed.map((turn) => turn.label))]
      .filter((label) => !selectedLabels.has(label))
      .sort();
    const positionCounts = Object.fromEntries(
      [...new Set(contributors.map((speaker) => speaker.position))]
        .sort()
        .map((position) => [
          position,
          contributors.filter((speaker) => speaker.position === position).length,
        ]),
    );

    return {
      date: hearing.date,
      title: hearing.title,
      committee: hearing.committee,
      source_url: hearing.source_url,
      source_text_sha256: actualHash,
      project_id: hearing.project_id,
      project_href: hearing.project_href,
      scope: hearing.default_issue_scope,
      contributor_count: contributors.length,
      position_counts: positionCounts,
      transcript_character_count: contributors.reduce(
        (total, speaker) => total + speaker.transcript_character_count,
        0,
      ),
      redaction_count: contributors.reduce(
        (total, speaker) => total + speaker.redaction_count,
        0,
      ),
      parsed_speaker_label_count: new Set(parsed.map((turn) => turn.label)).size,
      unselected_labels: unselectedLabels,
      contributors,
    };
  });

  return {
    version: 1,
    generated_at: "2026-07-28",
    corpus_scope: manifest.scope,
    transcript_fidelity:
      "Derived from official Council transcript text. Speaker wording, bracketed notation, spelling, and apparent transcription errors are retained after line reflow and removal of page furniture. Direct email addresses and phone numbers are redacted if encountered.",
    classification_boundary:
      "Inclusion records issue alignment, not agreement on every bill or detail. Qualified and mechanism-opposing positions remain explicit. Unselected labels are retained as a coverage ledger and the official transcript remains the complete event record.",
    hearings,
    totals: {
      hearing_count: hearings.length,
      contributor_count: hearings.reduce(
        (total, hearing) => total + hearing.contributor_count,
        0,
      ),
      transcript_character_count: hearings.reduce(
        (total, hearing) => total + hearing.transcript_character_count,
        0,
      ),
      redaction_count: hearings.reduce(
        (total, hearing) => total + hearing.redaction_count,
        0,
      ),
    },
  };
}

function yamlScalar(value) {
  return String(value).replace(/"/g, '\\"');
}

function wrapQuote(text) {
  const words = text.split(/\s+/);
  const lines = [];
  let line = "> ";
  for (const word of words) {
    if (line.length + word.length + 1 > 94) {
      lines.push(line.trimEnd());
      line = `> ${word} `;
    } else {
      line += `${word} `;
    }
  }
  if (line.trim() !== ">") lines.push(line.trimEnd());
  return lines.join("\n");
}

function renderHearing(hearing) {
  const id = `source.nycc.heteroglossia.${hearing.date}`;
  const title = `${hearing.title}: supportive and aligned testimony`;
  const table = hearing.contributors
    .map(
      (speaker) =>
        `| ${speaker.name} | ${speaker.role} | ${speaker.position} | ${speaker.turn_count} |`,
    )
    .join("\n");
  const transcripts = hearing.contributors
    .map((speaker) => {
      const labels = speaker.official_labels.map((label) => `\`${label}\``).join(", ");
      const turns = speaker.turns
        .map(
          (turn) =>
            `> **${turn.official_label}:**\n>\n${wrapQuote(turn.text)}`,
        )
        .join("\n>\n> * * *\n>\n");
      return `## ${speaker.name}\n\n- **Official transcript label(s):** ${labels}\n- **Role:** ${speaker.role}\n- **Position:** \`${speaker.position}\`\n- **Issue scope:** ${speaker.issue_scope}\n\n${turns}`;
    })
    .join("\n\n");

  return `---
id: ${id}
title: "${yamlScalar(title)}"
kind: source
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/testimony-heteroglossia/${hearing.date}.md
summary: "Full, attributed official transcript text for ${hearing.contributor_count} speakers who supported, qualified, or materially developed the aligned issue at this hearing."
source_kind: official-public-transcript-derived-corpus
source_date: ${hearing.date}
source_url: ${hearing.source_url}
public_use_status: public
relations:
  - type: documents
    target: ${hearing.project_id}
    href: ${hearing.project_href}
  - type: related_to
    target: index.knowledge-wiki.public-testimony
    href: ../../indexes/public-testimony.md
  - type: related_to
    target: index.knowledge-wiki.public-testimony-heteroglossia
    href: ../../indexes/public-testimony-heteroglossia.md
---

# ${title}

**Committee:** ${hearing.committee}

**Date:** ${hearing.date}

**Canonical source:** [New York City Council official transcript](${hearing.source_url})

## Inclusion ledger

| Speaker | Role | Position | Included turns |
| --- | --- | --- | ---: |
${table}

Positions are deliberately not collapsed. \`supportive\` records clear support;
\`qualified-support\` records support with material qualifications;
\`aligned-goal-opposes-mechanism\` records agreement with the problem while
opposing the bill as written; and \`aligned-goal-no-position\` records aligned
substantive evidence without a position on the bill.

## Full attributed transcript text

The text below preserves all recovered turns under each included speaker label,
not only prepared opening statements. Page furniture is removed and line breaks
are reflowed. Wording, bracketed notation, spelling, and apparent transcription
errors remain those of the official transcript.

${transcripts}

## Coverage and boundaries

- ${hearing.parsed_speaker_label_count} distinct speaker labels were parsed from
  the complete event transcript; ${hearing.contributor_count} named contributors
  are included in this aligned cohort.
- Unselected labels remain enumerated in
  \`docs/knowledge-bank/data/public-testimony-heteroglossia.json\`; they include
  chairs, Council Members, agency witnesses, procedural labels, opposition, and
  speakers outside this issue-bounded cohort.
- Inclusion does not imply that Jamie, the NYC Artist Coalition, or every
  included speaker agreed on every mechanism.
- Statements remain attributed testimony. The corpus does not independently
  verify each factual, quantitative, or causal assertion.
- The official Council transcript, not this reflowed research corpus, remains
  the canonical complete event record.
`;
}

function renderAll(data) {
  return new Map(
    data.hearings.map((hearing) => [
      path.join(sourceDir, `${hearing.date}.md`),
      renderHearing(hearing),
    ]),
  );
}

function writeOrCheck(target, content) {
  if (check) {
    const existing = fs.existsSync(target) ? fs.readFileSync(target, "utf8") : "";
    if (existing !== content) {
      throw new Error(`Generated testimony corpus is stale: ${path.relative(root, target)}`);
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
  `${check ? "Checked" : "Rendered"} ${data.totals.contributor_count} attributed contributors across ${data.totals.hearing_count} hearings.`,
);
