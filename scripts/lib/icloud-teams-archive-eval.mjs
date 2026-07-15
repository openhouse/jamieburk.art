import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const reportPath = path.join(
  repoRoot,
  "docs/knowledge-bank/projects/icloud-teams-archive-delta-2026-07-15.md"
);

const raftSourceIds = [
  "SRC-WATERWAYS-PITCH-BIG-MUDDY-2007-09-18",
  "SRC-WATERWAYS-PITCH-PART-III-2007-11-12",
  "SRC-WATERWAYS-SOUNDINGS-ROLLIN-2007",
  "SRC-WATERWAYS-KC-STAR-2007-11-15"
];

const expectedPublicUrls = new Map([
  ["SRC-WATERWAYS-PITCH-BIG-MUDDY-2007-09-18", "https://www.thepitchkc.com/big-muddy-adventure/"],
  ["SRC-WATERWAYS-PITCH-PART-III-2007-11-12", "https://www.thepitchkc.com/artists-turned-huck-finn-part-iii/"],
  ["SRC-WATERWAYS-SOUNDINGS-ROLLIN-2007", "https://soundingsonline.com/news/rollin-on-the-river-again/"]
]);

const forbiddenPublicFragments = [
  "/Users/",
  "/Volumes/",
  "Mobile Documents/com~apple~CloudDocs",
  "My-Situation-In-The-Job-Hunt.md"
];

function criterion(id, description, pass, evidence) {
  return { id, description, pass, evidence };
}

export function evaluateIcloudTeamsArchive({
  bank = knowledgeBank,
  reportText = readFileSync(reportPath, "utf8")
} = {}) {
  const intakeById = new Map(bank.intakeItems.map((item) => [item.id, item]));
  const sourceById = new Map(bank.sources.map((item) => [item.id, item]));
  const claimById = new Map(bank.claims.map((item) => [item.id, item]));
  const inquiryById = new Map(bank.researchInquiries.map((item) => [item.id, item]));
  const raftIntake = intakeById.get("INTAKE-WATERWAYS-RAFT-ICLOUD-DELTA-2026");
  const facultyIntake = intakeById.get("INTAKE-SOCIAL-INFO-SPACES-EVALUATION-2006");
  const raftClaim = claimById.get("CLM-WATERWAYS-RAFT-EXPEDITION");
  const facultyClaim = claimById.get("CLM-SOCIAL-INFO-SPACES-PROTOTYPE");
  const raftInquiry = inquiryById.get("INQ-WATERWAYS-RAFT-TERMINUS");
  const facultyInquiry = inquiryById.get("INQ-SOCIAL-INFO-SPACES-PUBLIC-CORROBORATION");
  const kcStar = sourceById.get("SRC-WATERWAYS-KC-STAR-2007-11-15");
  const facultySource = sourceById.get("SRC-SOCIAL-INFO-SPACES-EVALUATION-2006");
  const raftText = JSON.stringify(raftClaim ?? {}).toLowerCase();
  const relevantRecords = JSON.stringify({
    raftIntake,
    facultyIntake,
    sources: [...raftSourceIds, "SRC-SOCIAL-INFO-SPACES-EVALUATION-2006"].map((id) => sourceById.get(id)),
    raftClaim,
    facultyClaim,
    raftInquiry,
    facultyInquiry
  });

  const criteria = [
    criterion(
      "archive-scope",
      "The production note accounts for Jamie Projects History, CRS, and job-hunt.",
      ["Jamie Projects History", "CRS", "job-hunt"].every((name) => reportText.includes(name)),
      "Three required archive names must remain explicit in the public-safe report."
    ),
    criterion(
      "raft-intake",
      "The raft delta retains all four recovered sources and four atomic observations.",
      raftIntake?.sourceIds?.length === 4 && raftIntake?.observationIds?.length === 4,
      `${raftIntake?.sourceIds?.length ?? 0} sources; ${raftIntake?.observationIds?.length ?? 0} observations`
    ),
    criterion(
      "public-source-routes",
      "Every live raft article has the exact recovered canonical URL and an explicit non-establishment boundary.",
      [...expectedPublicUrls].every(([id, url]) => {
        const source = sourceById.get(id);
        return source?.canonicalUrl === url && source.visibility === "public" && source.doesNotEstablish?.length >= 4;
      }),
      `${expectedPublicUrls.size} live source routes checked`
    ),
    criterion(
      "protected-clipping",
      "The local Kansas City Star scan remains protected, opaque, and without a public URL.",
      kcStar?.visibility === "protected" &&
        Boolean(kcStar?.protectedLocatorId) &&
        !kcStar?.canonicalUrl &&
        !kcStar?.archiveUrl,
      kcStar?.protectedLocatorId ?? "missing"
    ),
    criterion(
      "raft-evidence-closure",
      "The governed raft claim cites every recovered delta source and keeps the website projection held.",
      raftSourceIds.every((id) => raftClaim?.evidence?.some((item) => item.sourceId === id)) &&
        raftClaim?.projections?.every((projection) => projection.status === "hold" && projection.surfaces.length === 0),
      `${raftClaim?.evidence?.length ?? 0} total evidence relationships`
    ),
    criterion(
      "raft-route-boundary",
      "The claim treats 1,100 miles as a checkpoint and does not assert a completed Gulf route.",
      raftClaim?.boundaries?.some((item) => item.includes("1,100 miles") && item.includes("checkpoint")) &&
        raftClaim?.antiClaims?.some((item) => item.includes("exact Gulf destination")) &&
        !/(completed|reached|arrived at) (the )?gulf/.test(raftText),
      "Checkpoint language and Gulf anti-claim both required."
    ),
    criterion(
      "collective-credit-and-safety",
      "Collective expedition credit and the Coast Guard modification boundary remain explicit.",
      raftClaim?.boundaries?.some((item) => item.includes("Libby Hendon") && item.includes("Laura Mattingly")) &&
        raftClaim?.antiClaims?.some((item) => item.includes("blanket Coast Guard approval")),
      "Named continuing crew, other collaborators, and bounded safety approval."
    ),
    criterion(
      "faculty-source-protection",
      "The faculty evaluation remains a protected, non-rendered source with no public URL.",
      facultySource?.visibility === "protected" &&
        Boolean(facultySource?.protectedLocatorId) &&
        !facultySource?.canonicalUrl &&
        !facultySource?.archiveUrl &&
        facultyClaim?.evidence?.every((item) => item.renderCitation === false),
      facultySource?.protectedLocatorId ?? "missing"
    ),
    criterion(
      "faculty-claim-boundary",
      "The dated prototype claim remains held and rejects invention, deployment, and sole-authorship overclaims.",
      facultyClaim?.projections?.every((projection) => projection.status === "hold" && projection.surfaces.length === 0) &&
        ["invented structural equivalence", "production-deployed", "solely authored"].every((fragment) =>
          facultyClaim?.antiClaims?.some((item) => item.includes(fragment))
        ),
      `${facultyClaim?.antiClaims?.length ?? 0} anti-claims`
    ),
    criterion(
      "open-inquiries",
      "Route conflicts and public-corroboration gaps remain represented as inquiries rather than erased.",
      raftInquiry?.limitations?.some((item) => item.includes("September 15") && item.includes("September 18")) &&
        facultyInquiry?.limitations?.some((item) => item.includes("No original prototype")),
      "Date discrepancy and missing original artifact both retained."
    ),
    criterion(
      "no-private-paths",
      "Public repository records do not expose private filesystem paths or the source dossier filename.",
      forbiddenPublicFragments.every((fragment) => !relevantRecords.includes(fragment) && !reportText.includes(fragment)),
      `${forbiddenPublicFragments.length} forbidden fragments checked`
    )
  ];

  return {
    pass: criteria.every((item) => item.pass),
    passed: criteria.filter((item) => item.pass).length,
    total: criteria.length,
    criteria
  };
}
