import { readFileSync } from "node:fs";
import path from "node:path";

import { knowledgeBank } from "../../apps/www/src/data/knowledge-bank/records.ts";
import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const protectedPayloadPattern =
  /(?:\/(?:Users|Volumes|private\/tmp)\/|Mobile Documents|drive\.google\.com|docs\.google\.com\/document\/d\/|otter\.ai|@(?:gmail|icloud|ohai)\.\w+|\b\d{3}[-.) ]\d{3}[-. ]\d{4}\b)/i;

function readJson(repoRoot, relativePath) {
  return JSON.parse(readFileSync(path.join(repoRoot, relativePath), "utf8"));
}

export function evaluateNycacFrontlineAdvocacy(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const manifest = options.manifest ?? readJson(
    repoRoot,
    "evals/knowledge-bank/nycac-frontline-advocacy.json"
  );
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};

  const record = (id) =>
    Object.hasOwn(recordOverrides, id) ? recordOverrides[id] : result.byId.get(id);
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };
  const read = (relativePath) =>
    Object.hasOwn(sourceOverrides, relativePath)
      ? sourceOverrides[relativePath]
      : readFileSync(path.join(repoRoot, relativePath), "utf8");

  const claimId = "claim.nycac.frontline-advocacy.2026-08";
  const reportSourceId = "source.sbu.empty-storefronts-high-rents.2026-07-28";
  const protectedSourceId = "source.nycac.frontline-advocacy.2026-08";
  const eventId = "event.nyc.sbu-report-launch.2026-07-29";
  const runId = "research.nycac.frontline-advocacy.2026-08-12";
  const registryClaim = knowledgeBank.claims.find(
    (item) => item.id === manifest.registryClaimId
  );
  const registrySources = manifest.registrySourceIds.map((id) =>
    knowledgeBank.sources.find((item) => item.id === id)
  );
  const observations = knowledgeBank.observations.filter((item) =>
    item.claimIds.includes(manifest.registryClaimId)
  );

  const claimSource = source(claimId);
  const reportSource = source(reportSourceId);
  const protectedSource = source(protectedSourceId);
  const eventSource = source(eventId);
  const projectSource = source("project.fair-rent-nyc");
  const runSource = source(runId);
  const indexSource = source("index.knowledge-wiki.commercial-rent-public-support");
  const normalized = (value) => value.replace(/\s+/g, " ");
  const claimText = normalized(claimSource);
  const reportText = normalized(reportSource);
  const protectedText = normalized(protectedSource);
  const eventText = normalized(eventSource);
  const projectText = normalized(projectSource);
  const runText = normalized(runSource);
  const indexText = normalized(indexSource);
  const publicSafeCorpus = [
    ...manifest.recordIds.map(source),
    read("apps/www/src/data/knowledge-bank/nycac-frontline-advocacy-2026-08.ts"),
    JSON.stringify(manifest)
  ].join("\n");

  const checks = {
    bounded_population_declared:
      manifest.reviewWindow?.start === "2026-07-13" &&
      manifest.reviewWindow?.end === "2026-08-12" &&
      manifest.reviewWindow?.completeness === "bounded-query-family-not-universal-census" &&
      /not a universal census/i.test(protectedText + runText),

    records_materialized_and_reachable:
      manifest.recordIds.every((id) => Boolean(record(id))) &&
      manifest.recordIds
        .filter((id) => record(id)?.kind !== "source")
        .every((id) => result.reachable.has(id)),

    exact_report_edition_bound:
      manifest.reportEdition?.pages === 20 &&
      manifest.reportEdition?.sha256 ===
        "a864510ba1d5cf961659b536c08ff581146bfc081a7c621fc206baf4473dbe2f" &&
      reportSource.includes(`pages: ${manifest.reportEdition.pages}`) &&
      reportSource.includes(`sha256: ${manifest.reportEdition.sha256}`),

    source_classes_and_registry_graph_preserved:
      registrySources.every(Boolean) &&
      registrySources.some((item) => item.visibility === "public") &&
      registrySources.some((item) => item.visibility === "public-metadata-only") &&
      registrySources.filter((item) => item.visibility === "protected").length === 2 &&
      observations.length === 6 &&
      new Set(observations.map((item) => item.sourceId)).size >= 4,

    review_credit_not_authorship:
      manifest.claimStates?.reportContribution ===
        "bounded-review-publicly-acknowledged" &&
      manifest.claimStates?.reportAuthorship === "not-established" &&
      /bounded prepublication review/i.test(claimText) &&
      /It is not authorship/i.test(reportText) &&
      !/co-authorship of the report|Jamie (?:authored|co-authored) the report/i.test(
        claimText + reportText
      ) &&
      registryClaim?.antiClaims?.some((item) => /authored or co-authored/i.test(item)),

    public_statement_and_officeholder_roles_exact:
      manifest.claimStates?.publicStatement === "confirmed-protected-transcript" &&
      manifest.claimStates?.councilMemberSpeaking === "not-in-recovered-transcript" &&
      /State Senator Julia Salazar and Assembly Member Emily Gallagher/i.test(eventText) &&
      /Council Member Marte did not speak/i.test(eventText) &&
      /does not establish that another speaker endorses Jamie/i.test(eventText),

    time_and_officeholder_states_are_exact:
      manifest.claimStates?.cityOffice === "event-information-handoff" &&
      manifest.claimStates?.monthlyCoordination === "scheduled-not-yet-occurred" &&
      /scheduled future state-office coordination cadence/i.test(claimText) &&
      /first meeting still in the future/i.test(claimText) &&
      registryClaim?.antiClaims?.some((item) => /scheduled August meeting/i.test(item)),

    historical_attachments_remain_historical:
      manifest.claimStates?.historicalFieldAttachments ===
        "historical-2019-context-not-current-window-activity" &&
      /historical 2019 campaign context, not new field activity during the review window/i.test(
        protectedText + runText
      ) &&
      registrySources
        .find((item) => item.id === "SRC-NYCAC-FRONTLINE-ADVOCACY-CORRESPONDENCE-2026-08")
        ?.doesNotEstablish?.some((item) => /current-window canvassing/i.test(item)),

    city_state_lanes_remain_distinct:
      /City and state lanes remain aligned but not interchangeable/i.test(claimText) &&
      /City and state lanes remain aligned but not interchangeable/i.test(projectText) &&
      /city lane/i.test(claimText) &&
      /state lane/i.test(claimText),

    media_request_not_coverage:
      manifest.claimStates?.mediaCoverage ===
        "request-recovered-publication-not-recovered" &&
      /A request is a lead, not coverage/i.test(eventText) &&
      registryClaim?.antiClaims?.some((item) => /published Jamie's remarks/i.test(item)),

    descriptive_findings_not_causal_proof:
      /does not by itself establish landlord motive, deliberate warehousing, or a financing mechanism/i.test(
        reportText
      ) &&
      /stronger causal language/i.test(indexText + runText + reportText) &&
      registryClaim?.boundaries?.some((item) => /descriptive findings/i.test(item)),

    social_credit_state_is_observed_not_inferred:
      manifest.claimStates?.instagramCollaboratorCredit ===
        "invited-and-accepted-credit-not-observed" &&
      /did not include NYCArtC/i.test(runText) &&
      registryClaim?.antiClaims?.some((item) => /completed collaborator credit/i.test(item)),

    protected_payload_withheld:
      !protectedPayloadPattern.test(publicSafeCorpus) &&
      /does not contain raw email bodies/i.test(protectedText) &&
      registrySources
        .filter((item) => item.visibility === "protected")
        .every((item) =>
          item.preservationStatus === "private" &&
          !item.canonicalUrl &&
          !item.archiveUrl &&
          !item.assetUrl &&
          Boolean(item.protectedLocatorId)
        ),

    human_projection_gate_preserved:
      record(claimId)?.projection?.status === "hold" &&
      record(claimId)?.projection?.surfaces?.length === 0 &&
      registryClaim?.projections?.every(
        (projection) => projection.status === "hold" && projection.surfaces.length === 0
      ) &&
      manifest.claimStates?.portfolioProjection === "hold" &&
      record(runId)?.source_encounter?.publication_authority ===
        "separate-human-review" &&
      /A passing eval does not supply those approvals/i.test(claimText)
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    result,
    manifest
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const evaluation = evaluateNycacFrontlineAdvocacy();
  for (const [name, passed] of Object.entries(evaluation.checks)) {
    console.log(`${passed ? "PASS" : "FAIL"} ${name}`);
  }
  if (!evaluation.passed) process.exit(1);
}
