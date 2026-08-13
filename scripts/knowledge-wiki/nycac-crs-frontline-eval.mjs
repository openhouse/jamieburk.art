import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

import { knowledgeBank as canonicalKnowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const claimIds = [
  "CLM-NYCAC-CRS-REPORT-REVIEW-2026-07",
  "CLM-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026-07",
  "CLM-NYCAC-CRS-GOVERNMENT-ALIGNMENT-2026-08"
];

const sourceIds = [
  "SRC-NYCAC-CRS-SBU-REPORT-2026-07-28",
  "SRC-NYCAC-CRS-ACTION-LAB-EVENT-2026-07-29",
  "SRC-NYCAC-CRS-ACTION-LAB-SOCIAL-2026-08-11",
  "SRC-NYCAC-CRS-PARTNER-CORRESPONDENCE-2026-07",
  "SRC-NYCAC-CRS-EVENT-RECORD-2026-07-29",
  "SRC-NYCAC-CRS-OFFICE-CORRESPONDENCE-2026-07-08"
];

const wikiIds = [
  "index.knowledge-wiki.commercial-rent-public-support",
  "project.fair-rent-nyc",
  "source.commercial-rent.empty-storefronts-high-rents.2026-07",
  "event.commercial-rent.empty-storefronts-report-launch.2026-07-29",
  "claim.nycac.crs-frontline-advocacy.2026-07-08",
  "research.nycac.crs-frontline-source-return.2026-08-13",
  "evaluation.nycac.crs-frontline-source-return.2026-08-13"
];

const privatePayloadPattern =
  /(?:\/(?:Users|Volumes)\/|Mobile Documents|Library\/CloudStorage|drive\.google\.com|mail\.google\.com|otter\.ai|@(?:gmail|icloud|me)\.com|\b(?:mobile|cell|phone)\s*(?:number|:)\b)/i;

export function evaluateNycacCrsFrontline(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const knowledgeBank = options.knowledgeBank ?? canonicalKnowledgeBank;
  const result = options.result ?? compileWiki({ repoRoot });
  const claims = claimIds.map((id) =>
    knowledgeBank.claims.find((claim) => claim.id === id)
  );
  const sources = sourceIds.map((id) =>
    knowledgeBank.sources.find((source) => source.id === id)
  );
  const protectedSources = sources.filter(
    (source) => source?.visibility === "protected"
  );
  const corpus = [
    readFileSync(
      path.join(
        repoRoot,
        "apps/www/src/data/knowledge-bank/nycac-crs-frontline-2026-08.ts"
      ),
      "utf8"
    ),
    ...wikiIds
      .map((id) => result.byId.get(id))
      .filter(Boolean)
      .map((record) => readFileSync(path.join(repoRoot, record.path), "utf8"))
  ].join("\n");

  const reportClaim = claims[0];
  const speakingClaim = claims[1];
  const alignmentClaim = claims[2];
  const scheduledObservation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-CRS-STATE-STAFF-ALIGNMENT-SCHEDULED"
  );
  const mediaObservation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-CRS-MEDIA-REQUEST-INCOMPLETE"
  );
  const socialObservation = knowledgeBank.observations.find(
    (item) => item.id === "OBS-NYCAC-CRS-SOCIAL-COLLABORATION-NOT-ESTABLISHED"
  );
  const eventRecord = knowledgeBank.sources.find(
    (item) => item.id === "SRC-NYCAC-CRS-EVENT-RECORD-2026-07-29"
  );
  const agencyRelation = knowledgeBank.agencyRelations.find(
    (item) => item.id === "AGENCY-NYCAC-CRS-PRESS-CONFERENCE-SPEAKING-2026"
  );
  const reportSource = sources[0];

  const checks = {
    bounded_source_window_declared:
      /July 14 through August 13, 2026/.test(corpus) &&
      /July 14-August 13, 2026/.test(corpus),

    public_report_is_canonical:
      reportSource?.visibility === "public" &&
      reportSource?.canonicalUrl ===
        "https://smallbizunited.com/reports/260728_SBU_FinalReport.pdf" &&
      reportSource?.publishedAt === "2026-07-28" &&
      /thoughtful and careful(?: draft)? review/i.test(reportSource?.publicNote ?? ""),

    evidence_classes_remain_distinct:
      sources.filter(Boolean).length === 6 &&
      sources.filter((source) => source?.visibility === "public").length === 3 &&
      protectedSources.length === 3 &&
      /different evidence classes and remain separately typed/i.test(corpus),

    report_credit_remains_bounded:
      reportClaim?.status === "confirmed-with-boundary" &&
      reportClaim.antiClaims.some((item) => /author|data analysis/i.test(item)) &&
      reportClaim.boundaries.some((item) => /final report.*public credit/i.test(item)) &&
      reportSource?.doesNotEstablish.some((item) => /authorship|data analysis/i.test(item)),

    report_method_limits_preserved:
      reportSource?.doesNotEstablish.includes("causation") &&
      /asking, executed, and net-effective rent/i.test(corpus) &&
      /landlord motive/i.test(corpus),

    prepared_and_delivered_remain_distinct:
      speakingClaim?.antiClaims.some((item) => /prepared remarks.*delivered/i.test(item)) &&
      eventRecord?.doesNotEstablish.some((item) => /audio-certified/i.test(item)) &&
      /prepared.*delivered.*separate source objects/i.test(corpus),

    media_request_fails_closed:
      speakingClaim?.antiClaims.some(
        (item) => /footage request.*delivery.*coverage/i.test(item)
      ) &&
      /does not establish footage delivery/i.test(mediaObservation?.text ?? ""),

    government_contact_fails_closed:
      alignmentClaim?.antiClaims.some((item) => /City Council office.*endorsed/i.test(item)) &&
      alignmentClaim?.antiClaims.some(
        (item) => /commits an elected official.*passage|passage.*implementation/i.test(item)
      ) &&
      alignmentClaim?.boundaries.some((item) => /not policy authority/i.test(item)),

    scheduled_is_not_occurred:
      /scheduled.*August 26, 2026/i.test(scheduledObservation?.text ?? "") &&
      !/\bheld\b.*August 26, 2026/i.test(scheduledObservation?.text ?? "") &&
      scheduledObservation?.limitations.some((item) => /had not occurred/i.test(item)),

    social_distribution_fails_closed:
      /did not list NYC Artist Coalition/i.test(socialObservation?.text ?? "") &&
      alignmentClaim?.antiClaims.some((item) => /became a collaborator/i.test(item)),

    protected_sources_fail_closed:
      protectedSources.every(
        (source) =>
          source &&
          !source.canonicalUrl &&
          !source.archiveUrl &&
          !source.assetUrl &&
          Boolean(source.protectedLocatorId)
      ) &&
      claims
        .flatMap((claim) => claim?.evidence ?? [])
        .filter((evidence) => protectedSources.some((source) => source?.id === evidence.sourceId))
        .every(
          (evidence) =>
            evidence.relationship === "private-support" && evidence.renderCitation === false
        ),

    public_safe_corpus_withholds_private_payload:
      !privatePayloadPattern.test(corpus) &&
      /locators withheld|locator withheld/i.test(corpus) &&
      /Raw email, private documents, audio, transcripts/i.test(corpus),

    projections_remain_held:
      claims.every(
        (claim) =>
          claim &&
          claim.projections.length === 1 &&
          claim.projections[0].status === "hold" &&
          claim.projections[0].surfaces.length === 0
      ),

    agency_is_typed_and_collective:
      agencyRelation?.action === "spoke-at" &&
      agencyRelation.creditScope === "shared" &&
      agencyRelation.actorIds.includes("ENT-JAMIE-BURKART") &&
      agencyRelation.boundaries.some((item) => /Co-presence does not establish endorsement/i.test(item)),

    wiki_update_map_is_materialized:
      wikiIds.every((id) => result.byId.has(id)) &&
      wikiIds.every((id) => result.reachable.has(id)) &&
      /commercial-rent-stabilization-public-support/.test(corpus) &&
      /jamie-burkart-public-record/.test(corpus) &&
      /materialize-graph-packets/.test(corpus),

    no_public_archive_route_added:
      !existsSync(path.join(repoRoot, "apps/www/src/app/knowledge-bank")) &&
      !existsSync(path.join(repoRoot, "apps/www/src/app/public-claims")) &&
      !existsSync(path.join(repoRoot, "apps/www/src/app/crs-source-return"))
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    result
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const evaluation = evaluateNycacCrsFrontline();
  for (const [name, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
  if (!evaluation.passed) process.exit(1);
}
