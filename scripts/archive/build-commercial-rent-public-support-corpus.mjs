#!/usr/bin/env node

import {
  createHash,
} from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const repoRoot = path.resolve(path.dirname(scriptPath), "../..");
const manifestPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-public-events-2026-07.json"
);
const speechRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/data/commercial-rent-public-support-speeches"
);
const sourceRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/commercial-rent-public-events"
);
const eventRoot = path.join(repoRoot, "docs/knowledge-bank/events");
const indexPath = path.join(
  repoRoot,
  "docs/knowledge-bank/indexes/commercial-rent-public-support-speeches.md"
);
const stateSourcePath = path.join(
  repoRoot,
  "docs/knowledge-bank/sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md"
);
const writeMode = process.argv.includes("--write");
const refreshManifest = process.argv.includes("--refresh-manifest");

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function yamlString(value) {
  return JSON.stringify(value);
}

function readManifest() {
  return JSON.parse(readFileSync(manifestPath, "utf8"));
}

function speechPath(speaker) {
  return path.join(speechRoot, speaker.transcriptFile);
}

function normalizeSpeechText(text) {
  return `${text.replace(/[ \t\r\n]+$/u, "")}\n`;
}

function enrichManifest(manifest) {
  return {
    ...manifest,
    events: manifest.events.map((event) => {
      const speakers = event.speakers.map((speaker) => {
        const filePath = speechPath(speaker);
        if (!existsSync(filePath)) {
          throw new Error(`Missing speech transcript: ${filePath}`);
        }
        const sourceText = readFileSync(filePath, "utf8");
        const text = normalizeSpeechText(sourceText);
        if (writeMode && sourceText !== text) {
          writeFileSync(filePath, text);
        } else if (!writeMode && sourceText !== text) {
          throw new Error(
            `Speech transcript has trailing whitespace or blank lines: ${filePath}`
          );
        }
        return {
          ...speaker,
          transcriptSha256: sha256(text),
          transcriptCharacters: text.length,
        };
      });
      const publicSnapshotSha256 = sha256(
        speakers
          .map(
            (speaker) =>
              `${speaker.slug}:${speaker.transcriptSha256}:${speaker.turnCount}`
          )
          .sort()
          .join("\n")
      );
      const { sourceTextSha256: _obsolete, ...rest } = event;
      return {
        ...rest,
        publicSnapshotSha256,
        speakers,
      };
    }),
  };
}

function validateManifest(manifest) {
  if (manifest.schemaVersion !== 1 || manifest.events.length !== 4) {
    throw new Error("Unexpected Commercial Rent public-event manifest shape.");
  }

  const allSpeakers = manifest.events.flatMap((event) => event.speakers);
  if (allSpeakers.length !== 23) {
    throw new Error(`Expected 23 speech records, found ${allSpeakers.length}.`);
  }

  const requiredNames = [
    "Brad Lander",
    "Shahana Hanif",
    "Emily Gallagher",
    "Julia Salazar",
    "Eon Huntley",
    "Tony Simone",
    "Jo Anne Simon",
  ];
  for (const name of requiredNames) {
    if (!allSpeakers.some((speaker) => speaker.speaker === name)) {
      throw new Error(`Missing required supportive speaker: ${name}`);
    }
  }

  const publicOfficialOccurrences = allSpeakers.filter(
    (speaker) => speaker.publicOfficial
  );
  if (publicOfficialOccurrences.length !== 10) {
    throw new Error(
      `Expected 10 public-official speech occurrences, found ${publicOfficialOccurrences.length}.`
    );
  }

  for (const event of manifest.events) {
    if (!/^[a-f0-9]{64}$/.test(event.publicSnapshotSha256)) {
      throw new Error(`Invalid public snapshot hash for ${event.slug}.`);
    }
    for (const speaker of event.speakers) {
      const text = readFileSync(speechPath(speaker), "utf8");
      if (sha256(text) !== speaker.transcriptSha256) {
        throw new Error(`Speech hash drift for ${speaker.slug}.`);
      }
      if (
        speaker.turnCount < 1 ||
        speaker.transcriptCharacters < 500 ||
        !text.includes("human audio review still required before quotation") ||
        !text.includes("## Full recovered text") ||
        text.includes("[object Object]") ||
        text.includes("/Users/") ||
        text.includes("otter.ai/u/")
      ) {
        throw new Error(`Unsafe or incomplete speech record: ${speaker.slug}`);
      }
    }
  }
}

function stateSource(manifest) {
  return `---
id: source.nys.small-business-rent-stabilization.2025-2026
title: ${yamlString("New York State Small Business Rent Stabilization bill and announcement records, 2025-2026")}
kind: source
status: maintained
visibility: public-safe
sensitivity: low
created: 2026-07-28
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md
summary: ${yamlString("Official state bill records and announcement sources for A5568A and S8319, with speech and nomenclature boundaries.")}
source_kind: government-record
canonical_url: ${manifest.legislation.assembly.officialUrl}
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
---

# New York State Small Business Rent Stabilization records

## Authority

- [Assembly bill ${manifest.legislation.assembly.bill}](${manifest.legislation.assembly.officialUrl}), sponsored by ${manifest.legislation.assembly.sponsor}
- [Senate bill ${manifest.legislation.senate.bill}](${manifest.legislation.senate.officialUrl}), sponsored by ${manifest.legislation.senate.sponsor}
- [Official February 17, 2026 introduction announcement](${manifest.legislation.officialAnnouncement.url})

The Assembly record includes the complete bill text and sponsor memorandum. The
official announcement preserves attributed written statements from Julia
Salazar, Emily Gallagher, Olympia Kazi, and Small Business United. Those
statements are linked at the authoritative source and are not mislabeled here as
spoken chamber testimony.

## Recovery boundary

No separate Assembly or Senate floor speech accompanying introduction was
recovered in this pass. The February 17 public-event corpus preserves recovered
public speeches by Emily Gallagher and Eon Huntley on the same policy and date;
it does not convert those event speeches into legislative-floor statements.

## Nomenclature

${manifest.legislation.nomenclatureNote}

## Use boundary

Legislative sponsorship, a written press statement, a speech at a public event,
and a chamber-floor statement are separate evidence classes. Read the official
source before quoting or characterizing the current bill.
`;
}

function sourceRecord(event, manifest) {
  const authorityLinks = [
    event.publicEventUrl
      ? `- [Public event listing](${event.publicEventUrl})`
      : null,
    event.officialPressReleaseUrl
      ? `- [Official New York State Senate event release](${event.officialPressReleaseUrl})`
      : null,
    "- Source audio and private working locator remain in Jamie Burkart's custody.",
  ]
    .filter(Boolean)
    .join("\n");
  const speechLinks = event.speakers
    .map(
      (speaker) =>
        `- [${speaker.speaker}](../../data/commercial-rent-public-support-speeches/${speaker.transcriptFile}) - ${speaker.role}; ${speaker.classification}; ${speaker.turnCount} recovered turn${speaker.turnCount === 1 ? "" : "s"}`
    )
    .join("\n");

  return `---
id: source.crs.public-event.${event.slug}
title: ${yamlString(`${event.title} public-event recording and transcript set`)}
kind: source
status: maintained
visibility: public-safe
sensitivity: low
created: 2026-07-28
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/sources/commercial-rent-public-events/${event.slug}.md
summary: ${yamlString(`Public-safe speaker-specific transcript set for ${event.title} on ${event.date}.`)}
source_kind: public-event-recording
relations:
  - type: documents
    target: ${event.id}
    href: ../../events/${event.slug}.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../../projects/fair-rent-nyc.md
---

# ${event.title} source record

## Event

- Date: ${event.date}
- Place: ${event.venue}
- Source class: ${event.sourceClass}
- Public snapshot SHA-256: \`${event.publicSnapshotSha256}\`

## Authority and custody

${authorityLinks}

## Complete recovered formal-speaker reading copies

${speechLinks}

## Transcript boundary

Each linked file is a public-safe working transcript of the complete recovered
selected-speaker turns. Private setup conversation was excluded. The reading
copies require audio review before quotation and do not expose a private source
path, Otter meeting locator, or signed URL.
`;
}

function eventRecord(event, manifest) {
  const publicOfficials = event.speakers.filter(
    (speaker) => speaker.publicOfficial
  );
  const officialLines = publicOfficials.length
    ? publicOfficials
        .map(
          (speaker) =>
            `- **${speaker.speaker}**, ${speaker.role}: [full recovered text](../data/commercial-rent-public-support-speeches/${speaker.transcriptFile})`
        )
        .join("\n")
    : "- No elected public official with a recovered speech is classified for this event.";
  const allLines = event.speakers
    .map(
      (speaker) =>
        `- **${speaker.speaker}**, ${speaker.role}: ${speaker.classification}; [full recovered text](../data/commercial-rent-public-support-speeches/${speaker.transcriptFile})`
    )
    .join("\n");
  const absences = [
    ...(event.expectedSpeakerAbsences ?? []).map(
      (entry) => `- **${entry.displayName}:** ${entry.basis}`
    ),
    ...(event.nonSpokenSupport ?? []).map(
      (entry) =>
        `- **${entry.displayName}**, ${entry.role}: ${entry.basis}`
    ),
  ];
  const laterContext = event.speakers
    .filter((speaker) => speaker.currentContext)
    .map(
      (speaker) =>
        `- **${speaker.speaker}:** ${speaker.currentContext}${
          speaker.currentContextSource
            ? ` [Official source](${speaker.currentContextSource})`
            : ""
        }`
    );

  return `---
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
summary: ${yamlString(`${event.date} public event with recovered supportive Commercial Rent Stabilization speech.`)}
relations:
  - type: uses_source
    target: source.crs.public-event.${event.slug}
    href: ../sources/commercial-rent-public-events/${event.slug}.md
  - type: uses_source
    target: source.nys.small-business-rent-stabilization.2025-2026
    href: ../sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
---

# ${event.title}

## Orientation

- Date: ${event.date}
- Place: ${event.venue}
- Recovered formal speakers: ${event.speakers.length}
- Evidence class: public-event recording and working transcript

## Supportive public officials with recovered speech

${officialLines}

## Recovered supportive voices

${allLines}

## Recorded absences and non-spoken support

${absences.length ? absences.join("\n") : "- No additional named absence or non-spoken support record is asserted."}

## Later context

${laterContext.length ? laterContext.join("\n") : "- No later role context is needed for the speakers in this event."}

## Reading boundary

This page preserves heteroglossia without turning participation into endorsement
of Jamie or this portfolio. Role labels are event-time labels. Candidate Eon
Huntley's later primary result does not retroactively make him an elected
official at the February event. Every transcript remains a working text pending
audio verification before quotation.
`;
}

function indexRecord(manifest) {
  const allSpeakers = manifest.events.flatMap((event) =>
    event.speakers.map((speaker) => ({ ...speaker, event }))
  );
  const officialOccurrences = allSpeakers.filter(
    (speaker) => speaker.publicOfficial
  );
  const eventLines = manifest.events
    .map(
      (event) =>
        `- [${event.title}](../events/${event.slug}.md) - ${event.date}; ${event.speakers.length} recovered formal-speaker reading copies`
    )
    .join("\n");
  const officialLines = officialOccurrences
    .map(
      (speaker) =>
        `- **${speaker.speaker}**, ${speaker.role}, at [${speaker.event.title}](../events/${speaker.event.slug}.md): [full recovered text](../data/commercial-rent-public-support-speeches/${speaker.transcriptFile})`
    )
    .join("\n");
  const allLines = allSpeakers
    .map(
      (speaker) =>
        `- **${speaker.speaker}** at ${speaker.event.date}: [${speaker.transcriptFile}](../data/commercial-rent-public-support-speeches/${speaker.transcriptFile})`
    )
    .join("\n");

  return `---
id: index.crs.public-support-speeches
title: ${yamlString("Commercial Rent Stabilization public support speeches")}
kind: index
status: maintained
visibility: public-safe
sensitivity: low
created: 2026-07-28
last_reviewed: ${manifest.reviewedAt}
review_by: 2027-01-28
canonical_path: docs/knowledge-bank/indexes/commercial-rent-public-support-speeches.md
summary: ${yamlString("Finding aid for recovered public-event speeches supporting Commercial Rent Stabilization, with public-official and transcript boundaries.")}
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: uses_source
    target: source.nys.small-business-rent-stabilization.2025-2026
    href: ../sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md
---

# Commercial Rent Stabilization public support speeches

## Scope

This finding aid preserves ${allSpeakers.length} speaker-specific reading
copies from ${manifest.events.length} recovered public events. It does not claim
to be every supportive statement ever made. It records the recovered population,
explicit absences, and the source-return queue needed to broaden that population.

## Events

${eventLines}

## Supportive public-official speech occurrences

${officialLines}

## All recovered formal-speaker reading copies

${allLines}

## Albany legislation

See the [official state bill and announcement record](../sources/commercial-rent-public-events/state-small-business-rent-stabilization-2025-2026.md)
for A5568A, S8319, the sponsor memorandum, the February 17, 2026 written
announcement statements, nomenclature differences, and the unrecovered
chamber-floor-speech boundary.

## Open recovery queue

- Search official Assembly and Senate chamber video and transcript records for
  any substantive sponsor speech accompanying introduction or amendment.
- Audio-check every working transcript before publishing quotations.
- Seek event programs, video, or corrected transcripts for speakers whose turns
  remain unattributed in the source recordings.
- Continue source discovery beyond these four Jamie-recorded events; do not
  convert a named supporter or sponsor into a spoken statement without evidence.

## Human gates

No speech is a testimonial for Jamie. Publication of quotations still requires
audio review, contextual review, and ordinary editorial judgment.
`;
}

function expectedOutputs(manifest) {
  const outputs = new Map();
  outputs.set(stateSourcePath, stateSource(manifest));
  outputs.set(indexPath, indexRecord(manifest));
  for (const event of manifest.events) {
    outputs.set(path.join(sourceRoot, `${event.slug}.md`), sourceRecord(event, manifest));
    outputs.set(path.join(eventRoot, `${event.slug}.md`), eventRecord(event, manifest));
  }
  return outputs;
}

function writeOrCheck(outputs) {
  const stale = [];
  for (const [filePath, content] of outputs) {
    if (writeMode) {
      mkdirSync(path.dirname(filePath), { recursive: true });
      writeFileSync(filePath, content);
      continue;
    }
    if (!existsSync(filePath) || readFileSync(filePath, "utf8") !== content) {
      stale.push(path.relative(repoRoot, filePath));
    }
  }
  if (stale.length) {
    throw new Error(
      `Commercial Rent public-support outputs are stale:\n${stale.join("\n")}\nRun with --write.`
    );
  }
}

let manifest = enrichManifest(readManifest());
if (refreshManifest) {
  writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
  manifest = readManifest();
}
validateManifest(manifest);
writeOrCheck(expectedOutputs(manifest));

const speakers = manifest.events.flatMap((event) => event.speakers);
const publicOfficialOccurrences = speakers.filter(
  (speaker) => speaker.publicOfficial
).length;
console.log(
  `Commercial Rent public-support corpus: ${manifest.events.length} events, ${speakers.length} speech records, ${publicOfficialOccurrences} public-official speech occurrences.`
);
