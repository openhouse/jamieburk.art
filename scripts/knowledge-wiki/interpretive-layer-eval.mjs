import { readFileSync } from "node:fs";
import path from "node:path";

import {
  compileWiki,
  defaultRepoRoot,
  queryWiki,
  wikiRecordSchema
} from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.docx\b|\.xlsx\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(
      path.join(repoRoot, "evals/knowledge-wiki/interpretive-layer.json"),
      "utf8"
    )
  );
}

function sameSet(left, right) {
  return left.length === right.length && left.every((item) => right.includes(item));
}

export function evaluateInterpretiveLayer(options = {}) {
  const repoRoot = options.repoRoot ?? defaultRepoRoot;
  const result = options.result ?? compileWiki({ repoRoot });
  const manifest = options.manifest ?? loadManifest(repoRoot);
  const recordOverrides = options.recordOverrides ?? {};
  const sourceOverrides = options.sourceOverrides ?? {};

  const record = (id) => {
    if (Object.hasOwn(recordOverrides, id)) return recordOverrides[id];
    return result.byId.get(id);
  };
  const source = (id) => {
    if (Object.hasOwn(sourceOverrides, id)) return sourceOverrides[id];
    const item = record(id);
    return item ? readFileSync(path.join(repoRoot, item.path), "utf8") : "";
  };
  const normalizedSource = (id) => source(id).replace(/\s+/g, " ");

  const living = record(manifest.livingArchiveId);
  const decisionIndex = record(manifest.decisionIndexId);
  const encounterRecord = record(manifest.sourceEncounterId);
  const encounter = encounterRecord?.source_encounter;
  const pressure = record("index.knowledge-wiki.pressures");
  const peoplePlaces = record("index.knowledge-wiki.people-places-work");
  const lineages = record("index.knowledge-wiki.project-lineages");
  const maintenance = record("method.maintenance-handoff-stewardship");
  const capabilityIds = [
    "capability.civic-cultural-technical-translation",
    "capability.implementation-operational-stewardship"
  ];
  const decisions = manifest.decisionRecordIds.map(record).filter(Boolean);
  const encounteredTargets = encounter?.source_states?.map((item) => item.target) ?? [];
  const usedSourceTargets = encounterRecord?.relations
    ?.filter((relation) => relation.type === "uses_source")
    .map((relation) => relation.target) ?? [];
  const publicRegistry =
    options.publicRegistryOverride ??
    readFileSync(path.join(repoRoot, manifest.publicRegistryPath), "utf8");

  const requiredRecordsMaterialized = manifest.requiredRecords.every(
    ([id, expectedPath]) => {
      const item = record(id);
      return item?.path === expectedPath && item?.canonical_path === expectedPath;
    }
  );

  const livingTargets = living?.relations?.map((relation) => relation.target) ?? [];
  const decisionTargets = decisionIndex?.relations?.map((relation) => relation.target) ?? [];
  const interpretiveNavigationReachable =
    manifest.conceptRecordIds.every((id) => livingTargets.includes(id)) &&
    livingTargets.includes(manifest.sourceEncounterId) &&
    manifest.decisionRecordIds.every((id) => decisionTargets.includes(id)) &&
    manifest.requiredRecords.every(([id]) => result.reachable.has(id));

  const pressureLinks = result.graph.documentLinks
    .filter((link) => link.from === pressure?.id)
    .map((link) => link.to)
    .filter(Boolean);
  const pressureSource = normalizedSource("index.knowledge-wiki.pressures");
  const pressuresPrecedeResponsesWithoutDeficit =
    manifest.pressureProjects.every((id) => pressureLinks.includes(id)) &&
    /situation appears before the response/i.test(pressureSource) &&
    /holders of knowledge and agency/i.test(pressureSource) &&
    /without treating residents, artists, workers, customers, neighborhoods, or collaborators as deficits/i.test(
      pressureSource
    ) &&
    /not a claim to speak for everyone involved/i.test(pressureSource);

  const peoplePlacesSource = normalizedSource("index.knowledge-wiki.people-places-work");
  const peoplePlacesCollectiveCreditBounded =
    peoplePlaces?.relations?.some(
      (relation) => relation.target === "method.collective-credit-protected-absence"
    ) &&
    /not scenery around a deliverable/i.test(peoplePlacesSource) &&
    /collective-credit rule/i.test(peoplePlacesSource) &&
    /not a collaborator directory, private relationship map/i.test(peoplePlacesSource) &&
    /protected absence/i.test(peoplePlacesSource);

  const lineagesSource = normalizedSource("index.knowledge-wiki.project-lineages");
  const projectLineagesNotTeleology =
    /documented inheritance, adaptation, or divergence/i.test(lineagesSource) &&
    /not a claim that every later project was predetermined/i.test(lineagesSource) &&
    /not proof of causation, intent, ownership, or inevitability/i.test(lineagesSource) &&
    (lineages?.relations?.length ?? 0) >= 3;

  const maintenanceSource = normalizedSource("method.maintenance-handoff-stewardship");
  const maintenanceHandoffIsDelivery =
    /part of delivery, not an epilogue/i.test(maintenanceSource) &&
    /future reader who was not in the room/i.test(maintenanceSource) &&
    /not permanent personal ownership/i.test(maintenanceSource) &&
    maintenance?.relations?.some(
      (relation) => relation.target === "capability.implementation-operational-stewardship"
    );

  const capabilitiesCrossProjectAndEvidenceBound = capabilityIds.every((id) => {
    const item = record(id);
    const linkedProjects = item?.relations?.filter((relation) => {
      const target = record(relation.target);
      return ["project", "organization"].includes(target?.kind);
    }) ?? [];
    return (
      item?.kind === "capability" &&
      linkedProjects.length >= 2 &&
      item.relations.some(
        (relation) => relation.target === manifest.sourceEncounterId
      ) &&
      /## Boundary/i.test(source(id))
    );
  });

  const decisionContractComplete =
    decisions.length === manifest.decisionRecordIds.length &&
    decisions.every((item) => {
      const chosen = item.options_considered.filter(
        (option) => option.disposition === "chosen"
      );
      const linkedTargets = item.relations.map((relation) => relation.target);
      return (
        wikiRecordSchema.safeParse(item).success &&
        chosen.length === 1 &&
        item.options_considered.length >= 2 &&
        item.resulting_artifacts.every((id) => linkedTargets.includes(id)) &&
        item.unknowns.length >= 1 &&
        item.anti_claims.length >= 2
      );
    });

  const decisionCreditAndProjectionBounded = decisions.every(
    (item) =>
      item.projection?.status === "hold" &&
      item.projection.surfaces.length === 0 &&
      item.credit_scope &&
      !source(item.id).includes("solely responsible for")
  ) &&
    record("decision.open-house.communal-governance")?.credit_scope === "collective" &&
    record("decision.kc-town-hall.listening-fieldwork")?.credit_scope === "collective";

  const queriedDecisionIds = queryWiki(result, { decisions: true }).records.map(
    (item) => item.id
  );
  const decisionQueryOperational =
    manifest.decisionRecordIds.every((id) => queriedDecisionIds.includes(id)) &&
    queriedDecisionIds.every((id) => result.byId.get(id)?.kind === "decision");

  const interpretiveSourceReturnCurrent =
    encounterRecord?.kind === "research-run" &&
    encounterRecord.last_reviewed === manifest.encounterDate &&
    encounter?.encounter_date === manifest.encounterDate &&
    encounter?.research_authority === "authorized-by-jamie" &&
    encounter?.publication_authority === "separate-human-review" &&
    encounter?.publication_decision === "public-safe-synthesis-only" &&
    sameSet(encounteredTargets, manifest.sourceEncounterTargets) &&
    sameSet(encounteredTargets, usedSourceTargets) &&
    encounter.source_states.every(
      (state) =>
        state.access_state === "reachable" &&
        state.materialization_state !== "not-materialized" &&
        record(state.target)?.kind === "source"
    ) &&
    encounter.changed_interpretations.length >= 4 &&
    encounter.contradictions.length >= 5 &&
    encounter.librarian_requests.length >= 5;

  const protectedSourcesMetadataOnly = manifest.protectedSourceTargets.every((id) => {
    const item = record(id);
    return (
      item?.kind === "source" &&
      item.visibility === "summary-only" &&
      item.public_use_status === "summary-only" &&
      typeof item.opaque_locator === "string" &&
      !item.canonical_url &&
      item.projection?.status !== "active" &&
      !privatePattern.test(source(id))
    );
  });

  const councilSource = record("source.councilstat.fuller-release.2016");
  const callnyc = record("project.callnyc");
  const councilstatSourceGapClosed =
    councilSource?.kind === "source" &&
    councilSource?.source_kind === "government-record" &&
    councilSource?.canonical_url === manifest.councilSourceUrl &&
    callnyc?.relations?.some(
      (relation) =>
        relation.type === "uses_source" &&
        relation.target === "source.councilstat.fuller-release.2016"
    ) &&
    !callnyc?.wanted?.some(
      (item) => item.id === "source.councilstat.fuller-release.2016"
    );

  const interpretivePublicProjectionSelective =
    [...manifest.conceptRecordIds, ...manifest.decisionRecordIds].every(
      (id) => !publicRegistry.includes(id)
    ) &&
    manifest.requiredRecords.every(([id]) => {
      const item = record(id);
      return item?.projection?.status !== "active" && item?.projection_status !== "active";
    });

  const checks = {
    interpretive_records_materialized: requiredRecordsMaterialized,
    interpretive_navigation_reachable: interpretiveNavigationReachable,
    pressures_precede_responses_without_deficit: pressuresPrecedeResponsesWithoutDeficit,
    people_places_collective_credit_bounded: peoplePlacesCollectiveCreditBounded,
    project_lineages_not_teleology: projectLineagesNotTeleology,
    maintenance_handoff_is_delivery: maintenanceHandoffIsDelivery,
    capabilities_cross_project_and_evidence_bound: capabilitiesCrossProjectAndEvidenceBound,
    decision_contract_complete: decisionContractComplete,
    decision_credit_and_projection_bounded: decisionCreditAndProjectionBounded,
    decision_query_operational: decisionQueryOperational,
    interpretive_source_return_current: interpretiveSourceReturnCurrent,
    interpretive_protected_sources_metadata_only: protectedSourcesMetadataOnly,
    councilstat_source_gap_closed: councilstatSourceGapClosed,
    interpretive_public_projection_selective: interpretivePublicProjectionSelective
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      requiredRecords: manifest.requiredRecords.length,
      decisionRecords: manifest.decisionRecordIds.length,
      sourceEncounterTargets: manifest.sourceEncounterTargets.length,
      protectedSourceTargets: manifest.protectedSourceTargets.length
    }
  };
}
