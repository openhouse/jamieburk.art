import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const suitePath = ".agents/evals/source-return.json";

const recordIds = {
  run: "research.photography.kcth-dcla-source-return.2026-07-26",
  dclaSource: "source.nycac.dcla-formation-materials.2017",
  dclaRecollection: "source.recollection.nycac-dcla-meeting.2026-07",
  dclaAsset: "asset.photo.dcla-diy-spaces-meeting.layout-a",
  dclaSet: "index.photo-set.nycac.dcla-meeting.2017",
  dclaOccurrence: "projection.photo.layout-a.technical-operations.dcla-meeting",
  dclaInquiry: "research-inquiry.photography.dcla-diy-spaces-meeting.2017",
  councilAsset: "asset.photo.jamie-council-chamber.layout-a",
  councilRecollection: "source.recollection.jamie-council-chamber-photo.2026-07",
  councilEventSource: "source.nycc.open-data-week-event-records.2026-03",
  councilInquiry: "research-inquiry.photography.layout-a.council-chamber",
  kcSource: "source.recollection.kc-town-hall-photos.2026-07",
  kcSet: "index.photo-set.kc-town-hall.phase-one-source-return",
  kcInquiry: "research-inquiry.photography.kc-town-hall.phase-one",
  proposalAsset: "asset.kc-town-hall.proposal-excerpts.2019",
  proposalProjection: "projection.kc-town-hall.proposal-artifacts"
};

const governedSourceReturnPaths = [
  "docs/knowledge-bank/assets/kc-town-hall-proposal-excerpts-2019.md",
  "docs/knowledge-bank/assets/photographs/dcla-diy-spaces-meeting-layout-a.md",
  "docs/knowledge-bank/indexes/photo-sets/dcla-diy-spaces-meeting-2017.md",
  "docs/knowledge-bank/indexes/photo-sets/kc-town-hall-phase-one-source-return.md",
  "docs/knowledge-bank/methods/photographic-oral-history-return.md",
  "docs/knowledge-bank/projects/kc-town-hall-orientation.md",
  "docs/knowledge-bank/projects/nyc-artist-coalition-2017.md",
  "docs/knowledge-bank/projections/kc-town-hall-proposal-artifacts.md",
  "docs/knowledge-bank/projections/photography/layout-a-technical-operations-dcla-meeting.md",
  "docs/knowledge-bank/research-inquiries/photography/dcla-diy-spaces-meeting-2017.md",
  "docs/knowledge-bank/research-inquiries/photography/kc-town-hall-phase-one-source-return.md",
  "docs/knowledge-bank/research-runs/photographic-source-return-kcth-dcla-2026-07-26.md",
  "docs/knowledge-bank/sources/nycac-dcla-formation-materials-2017.md",
  "docs/knowledge-bank/sources/nycc-open-data-week-event-records-2026.md",
  "docs/knowledge-bank/sources/permissions/layout-a-dcla-meeting-permission-status-2026-07.md",
  "docs/knowledge-bank/sources/recollections/jamie-council-chamber-photo-2026-07.md",
  "docs/knowledge-bank/sources/recollections/kc-town-hall-photo-oral-histories-2026-07.md",
  "docs/knowledge-bank/sources/recollections/nycac-dcla-meeting-source-return-2026-07.md"
];

function read(repoRoot, relativePath, overrides = {}) {
  return overrides[relativePath] ??
    readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function sha256(bytes) {
  return createHash("sha256").update(bytes).digest("hex");
}

function criterion(id, pass, detail) {
  return { id, pass, detail };
}

export function evaluateSourceReturn(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const sourceOverrides = options.sourceOverrides ?? {};
  const recordOverrides = options.recordOverrides ?? {};
  const suite = JSON.parse(read(repoRoot, suitePath, sourceOverrides));
  const compiled = options.result ?? compileWiki({ repoRoot });
  const record = (id) => {
    if (Object.hasOwn(recordOverrides, id)) return recordOverrides[id];
    return compiled.byId.get(id);
  };
  const source = (id) => {
    const item = record(id);
    if (!item) return "";
    return read(repoRoot, item.path, sourceOverrides);
  };

  const run = record(recordIds.run);
  const dclaSource = record(recordIds.dclaSource);
  const dclaRecollection = record(recordIds.dclaRecollection);
  const dclaAsset = record(recordIds.dclaAsset);
  const dclaSet = record(recordIds.dclaSet);
  const dclaOccurrence = record(recordIds.dclaOccurrence);
  const dclaInquiry = record(recordIds.dclaInquiry);
  const councilAsset = record(recordIds.councilAsset);
  const councilRecollection = record(recordIds.councilRecollection);
  const councilEventSource = record(recordIds.councilEventSource);
  const councilInquiry = record(recordIds.councilInquiry);
  const kcSource = record(recordIds.kcSource);
  const kcSet = record(recordIds.kcSet);
  const kcInquiry = record(recordIds.kcInquiry);
  const proposalAsset = record(recordIds.proposalAsset);
  const proposalProjection = record(recordIds.proposalProjection);

  const packageManifest = JSON.parse(read(repoRoot, "package.json", sourceOverrides));
  const rootReadme = read(repoRoot, "README.md", sourceOverrides);
  const agentGuide = read(repoRoot, "AGENTS.md", sourceOverrides);
  const wikiReadme = read(
    repoRoot,
    "docs/knowledge-bank/README.md",
    sourceOverrides
  );
  const photographyManifest = read(
    repoRoot,
    "apps/www/src/data/photography.ts",
    sourceOverrides
  );
  const workSource = read(repoRoot, "apps/www/src/data/work.ts", sourceOverrides);
  const kcPage = read(
    repoRoot,
    "apps/www/src/content/work/kc-town-hall.mdx",
    sourceOverrides
  );
  const councilPhoto = photographyManifest.match(
    /councilChamber:\s*\{([\s\S]*?)\n  \},/
  )?.[1] ?? "";
  const dclaPhoto = photographyManifest.match(
    /dclaMeeting:\s*\{([\s\S]*?)\n  \},/
  )?.[1] ?? "";

  const proposalDerivativesValid =
    proposalAsset?.public_derivatives?.length === 2 &&
    proposalAsset.public_derivatives.every((derivative) => {
      const absolute = path.join(repoRoot, derivative.path);
      if (!existsSync(absolute)) return false;
      const bytes = readFileSync(absolute);
      return (
        sha256(bytes) === derivative.checksum &&
        derivative.metadata_stripped === true &&
        derivative.status === "branch-review" &&
        !bytes.includes(Buffer.from("Exif\0\0")) &&
        !bytes.includes(Buffer.from("GPSInfo"))
      );
    });

  const publicSourceReturn = governedSourceReturnPaths
    .map((relativePath) => read(repoRoot, relativePath, sourceOverrides))
    .join("\n");
  const privatePattern =
    /\/(?:Users|Volumes)\/|Mobile Documents|Library\/CloudStorage|jamie(?:\.burkart)?@(?:gmail\.com|ohai\.us)|\b(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]\d{3}[-.\s]\d{4}\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY/i;
  const rawMaterialPattern =
    /\b(?:IMG|DSC|PXL)[-_]?\d{3,}\.(?:jpe?g|heic|png)\b|[A-F0-9]{8}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{12}\.(?:jpe?g|heic|png)\b/i;

  const checks = [
    criterion(
      "SOURCE-RETURN-001",
      /^## Knowledge Wiki$/m.test(rootReadme) &&
        /^## Knowledge Wiki$/m.test(agentGuide) &&
        /^# Knowledge Wiki$/m.test(wikiReadme) &&
        packageManifest.scripts["knowledge-wiki"] ===
          "node scripts/check-knowledge-bank.mjs" &&
        packageManifest.scripts["knowledge-bank"] ===
          packageManifest.scripts["knowledge-wiki"] &&
        packageManifest.scripts.check.includes("npm run knowledge-wiki") &&
        !packageManifest.scripts.check.includes("npm run knowledge-bank") &&
        /compatibility alias/i.test(rootReadme) &&
        /compatibility paths/i.test(agentGuide),
      "Knowledge Wiki is primary in operator guidance and checks; historical paths and the legacy command remain explicit compatibility surfaces."
    ),
    criterion(
      "SOURCE-RETURN-002",
      run?.kind === "research-run" &&
        run?.source_encounter?.source_states?.length === 6 &&
        run.source_encounter.publication_authority === "separate-human-review" &&
        run.source_encounter.contradictions.length >= 3 &&
        run.source_encounter.limitations.length >= 3 &&
        run.source_encounter.librarian_requests.length >= 3 &&
        run.source_encounter.publication_decision ===
          "public-safe-synthesis-only",
      "The source encounter records six source states, contradictions, limits, librarian requests, and separate publication authority."
    ),
    criterion(
      "SOURCE-RETURN-003",
      dclaSource?.source_class === "mixed-contemporaneous-record" &&
        dclaSource?.anti_claims?.length >= 3 &&
        /January 26, 2017/i.test(source(recordIds.dclaSource)) &&
        /two-person ranking sheet/i.test(source(recordIds.dclaSource)) &&
        /February 3/i.test(source(recordIds.dclaSource)) &&
        /February 4/i.test(source(recordIds.dclaSource)) &&
        /press/i.test(source(recordIds.dclaSource)) &&
        dclaRecollection?.source_class === "first-person-recollection" &&
        dclaRecollection?.projection?.status === "hold" &&
        /not\s+yet\s+been\s+recovered/i.test(
          source(recordIds.dclaRecollection)
        ),
      "The formation record keeps dated contemporary materials, later recollection, press reuse, and anti-claims distinct."
    ),
    criterion(
      "SOURCE-RETURN-004",
      dclaAsset?.photo_knowledge_version === 1 &&
        dclaAsset?.private_source_binding?.status ===
          "pending-private-verification" &&
        dclaAsset?.rights_state === "permission-needed" &&
        dclaAsset?.consent_state === "review-needed" &&
        dclaSet?.public_members?.includes(dclaAsset.id) &&
        /multi-frame|multiple\s+frames/i.test(source(recordIds.dclaSet)) &&
        dclaOccurrence?.asset === dclaAsset.id &&
        dclaOccurrence?.projection_status === "pending" &&
        dclaOccurrence?.approval?.production === "open" &&
        dclaOccurrence?.approval?.indexing === "open" &&
        dclaPhoto.includes(`wikiId: "${dclaAsset.id}"`) &&
        dclaPhoto.includes(`"${dclaOccurrence.id}"`),
      "The DCLA frame is bound as one exact pending occurrence and one member of a multi-frame cluster."
    ),
    criterion(
      "SOURCE-RETURN-005",
      councilRecollection?.source_class === "first-person-recollection" &&
        councilRecollection?.projection?.status === "hold" &&
        councilRecollection?.anti_claims?.length >= 4 &&
        councilEventSource?.source_class ===
          "contemporaneous-third-party-record" &&
        councilEventSource?.projection?.status === "hold" &&
        councilEventSource?.anti_claims?.length >= 3 &&
        councilAsset?.relations?.some(
          (relation) => relation.target === councilRecollection.id
        ) &&
        councilAsset?.relations?.some(
          (relation) => relation.target === councilEventSource.id
        ) &&
        councilInquiry?.relations?.some(
          (relation) => relation.target === councilRecollection.id
        ) &&
        councilInquiry?.relations?.some(
          (relation) => relation.target === councilEventSource.id
        ) &&
        councilAsset?.public_derivatives?.[0]?.checksum ===
          "9ed636cbeefeb3812825081601f8e5bce4771b4fb1b536ef4351f2f214de14a3" &&
        /opaque record retained outside public Git/i.test(
          source(recordIds.councilRecollection)
        ) &&
        !/\b[a-f0-9]{64}\b/i.test(source(recordIds.councilRecollection)) &&
        /same frame/i.test(source(recordIds.councilRecollection)) &&
        /From Data to Policy: How the NYC Council Turns City Data Into Action/i.test(
          source(recordIds.councilEventSource)
        ) &&
        /March 26, 2026/i.test(source(recordIds.councilEventSource)) &&
        /registration and logistics records do not by themselves prove attendance/i.test(
          source(recordIds.councilEventSource)
        ) &&
        /do(?:es)? not establish that either surfaced file is the exact packet/i.test(
          source(recordIds.councilEventSource)
        ) &&
        /Open Data Week 2026/i.test(councilPhoto) &&
        /coalition participation materials and public-data research/i.test(
          councilPhoto
        ) &&
        dclaPhoto.includes(
          "A participant addresses a crowded meeting of cultural-space participants seated and standing in a large room."
        ) &&
        dclaPhoto.includes(
          "A 2017 Department of Cultural Affairs and DIY-spaces meeting, held as a container for listening across a crowded room."
        ) &&
        !/\b(?:adopted|accepted|endorsed|implemented)\b/i.test(councilPhoto),
      "The Council return separates visible scene, later oral history, contemporary event corroboration, source manifestations, and unresolved outcomes while supporting a bounded caption."
    ),
    criterion(
      "SOURCE-RETURN-006",
      kcSource?.source_class === "first-person-recollection" &&
        kcSource?.projection?.status === "hold" &&
        kcSource?.anti_claims?.length >= 4 &&
        Array.isArray(kcSet?.public_members) &&
        kcSet.public_members.length === 0 &&
        kcInquiry?.unknowns?.length >= 5 &&
        /Earl Brown/i.test(source(recordIds.kcSource)) &&
        /Harold Mason/i.test(source(recordIds.kcSource)) &&
        !/hard-hat-photo|Jamie-Burkart-Harold-Mason/i.test(workSource) &&
        !/\bphotographer was\b/i.test(`${workSource}\n${kcPage}`),
      "The KC oral histories preserve craft and people while both construction portraits remain held from the public site."
    ),
    criterion(
      "SOURCE-RETURN-007",
      proposalDerivativesValid &&
        proposalProjection?.projection_status === "pending" &&
        proposalProjection?.projection?.surfaces?.includes("/work/kc-town-hall") &&
        workSource.includes("/artifacts/kc-town-hall/neighborhood-survey.png") &&
        workSource.includes("/artifacts/kc-town-hall/engine-of-opportunity.png") &&
        /not resident responses or a consensus result/i.test(workSource) &&
        /not evidence of constructed work/i.test(workSource),
      "Both proposal excerpts are checksum-bound, metadata-stripped, and projected with participation and implementation boundaries."
    ),
    criterion(
      "SOURCE-RETURN-008",
      !privatePattern.test(publicSourceReturn) &&
        !rawMaterialPattern.test(publicSourceReturn),
      "The governed source-return layer contains no private locator, account address, phone number, or raw-source leakage."
    ),
    criterion(
      "SOURCE-RETURN-009",
      /role:\s*"Co-Founder & Project Manager"/.test(workSource) &&
        /multi-trade Phase One scope/i.test(kcPage) &&
        /neighborhood survey/i.test(kcPage) &&
        /daily field coordination remains first-person/i.test(kcPage) &&
        !/\bserved as general contractor\b/i.test(kcPage) &&
        /Co-founder and project-manager attribution/i.test(workSource),
      "The public KC page names Jamie's supported role and concrete work while holding the stronger contractor title and completion claims."
    ),
    criterion(
      "SOURCE-RETURN-010",
      dclaInquiry?.unknowns?.some((item) => /audio/i.test(item)) &&
        /not\s+proof\s+that\s+the\s+recording\s+does\s+not\s+exist/i.test(
          source(recordIds.dclaInquiry)
        ) &&
        kcSource?.anti_claims?.some((item) => /rights/i.test(item)) &&
        dclaOccurrence?.approval?.photographer_rights === "open" &&
        dclaOccurrence?.approval?.represented_people === "open" &&
        dclaOccurrence?.approval?.caption_credit_crop === "open" &&
        dclaOccurrence?.approval?.staging === "open" &&
        dclaOccurrence?.approval?.production === "open" &&
        dclaOccurrence?.approval?.indexing === "open",
      "Missing audio and every downstream rights, consent, release, and indexing gate remain explicit and open."
    )
  ];

  return {
    pass:
      suite.criteria.reduce((sum, item) => sum + item.weight, 0) === 100 &&
      checks.every((item) => item.pass),
    suite,
    checks,
    failures: checks.filter((item) => !item.pass).map((item) => item.id)
  };
}

function printResult(result) {
  console.log(
    `Source-return eval: ${result.pass ? "PASS" : "FAIL"} ` +
      `(${result.checks.filter((item) => item.pass).length}/${result.checks.length})`
  );
  for (const item of result.checks) {
    console.log(`- ${item.pass ? "PASS" : "FAIL"} ${item.id}: ${item.detail}`);
  }
  if (!result.pass) process.exitCode = 1;
}

const isMain =
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);

if (isMain) {
  printResult(evaluateSourceReturn());
}
