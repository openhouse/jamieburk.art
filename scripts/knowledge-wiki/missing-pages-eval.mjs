import { readFileSync } from "node:fs";
import path from "node:path";

import { compileWiki, defaultRepoRoot } from "./lib.mjs";

const privatePattern =
  /(?:\/Users\/|\/Volumes\/|Mobile Documents|supporting-materials|Library\/CloudStorage|\.docx\b|\.xlsx\b|BEGIN (?:RSA |OPENSSH )?PRIVATE KEY)/i;

function loadManifest(repoRoot) {
  return JSON.parse(
    readFileSync(path.join(repoRoot, "evals/knowledge-wiki/missing-pages.json"), "utf8")
  );
}

function sameSet(left, right) {
  return left.length === right.length && left.every((item) => right.includes(item));
}

export function evaluateMissingPages(options = {}) {
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

  const root = record("index.knowledge-wiki");
  const living = record(manifest.livingArchiveId);
  const encounterRecord = record(manifest.sourceEncounterId);
  const encounter = encounterRecord?.source_encounter;
  const inquiry = record("research-inquiry.ucsc-installation-title");
  const timeline = record("timeline.jamie-practice.2004-present");
  const projection = record("portfolio.role-fit-referral-map");
  const expectedIds = manifest.priorityRecords.map(([id]) => id);
  const expectedSourceTargets = manifest.sourceEncounterTargets;
  const encounteredTargets = encounter?.source_states?.map((item) => item.target) ?? [];
  const usedSourceTargets = encounterRecord?.relations
    ?.filter((relation) => relation.type === "uses_source")
    .map((relation) => relation.target) ?? [];
  const livingTargets = living?.relations?.map((relation) => relation.target) ?? [];
  const wantedIds = living?.wanted?.map((item) => item.id) ?? [];
  const inquirySource = source("research-inquiry.ucsc-installation-title");
  const timelineSource = source("timeline.jamie-practice.2004-present");
  const encounterSource = source(manifest.sourceEncounterId);
  const methodSource = source("method.situated-source-rereading");
  const livingSource = source(manifest.livingArchiveId);

  const priorityRecordsMaterialized = manifest.priorityRecords.every(([id, expectedPath]) => {
    const item = record(id);
    return item?.canonical_path === expectedPath && item.path === expectedPath;
  });

  const livingArchiveReachable =
    root?.relations?.some((relation) => relation.target === manifest.livingArchiveId) &&
    manifest.livingArchiveTargets.every((id) => livingTargets.includes(id)) &&
    expectedIds.every((id) => result.reachable.has(id));

  const sourceReturnCurrentAndComplete =
    encounterRecord?.kind === "research-run" &&
    encounterRecord?.last_reviewed === manifest.encounterDate &&
    encounter?.encounter_date === manifest.encounterDate &&
    sameSet(encounteredTargets, expectedSourceTargets) &&
    encounter?.records_affected?.every((id) => Boolean(record(id))) &&
    encounter.records_affected.length >= 4;

  const originalSourcesMateriallyReached =
    sameSet(encounteredTargets, usedSourceTargets) &&
    encounter?.source_states?.every(
      (state) =>
        state.access_state === "reachable" &&
        state.materialization_state !== "not-materialized" &&
        record(state.target)?.kind === "source"
    );

  const priorReadingsAndChangesPreserved =
    encounter?.questions?.length >= 3 &&
    encounter?.prior_readings_consulted?.length >= 2 &&
    encounter?.new_observations?.length >= 3 &&
    encounter?.changed_interpretations?.length >= 2 &&
    encounter?.limitations?.length >= 3 &&
    /compare the encounter with earlier readings/i.test(methodSource) &&
    /additive and dated/i.test(methodSource);

  const contradictionsRemainOpen =
    encounter?.contradictions?.length >= 2 &&
    inquiry?.status === "governed-open" &&
    inquiry?.wanted?.some((item) => item.id === "source.ucsc.installation-primary-record.2006") &&
    timeline?.relations?.some(
      (relation) => relation.target === "research-inquiry.ucsc-installation-title"
    ) &&
    inquirySource.includes("`Art is Long`") &&
    inquirySource.includes("`Time is Long`") &&
    !/\b(?:Art is Long|Time is Long)\b/.test(timelineSource);

  const researchAuthorityNotPublication =
    encounter?.research_authority === "authorized-by-jamie" &&
    encounter?.publication_authority === "separate-human-review" &&
    encounter?.publication_decision === "public-safe-synthesis-only" &&
    /authorized research access/i.test(encounterSource) &&
    /publication remain separate decisions/i.test(encounterSource);

  const librarianRequestsActionable =
    encounter?.librarian_requests?.length >= 4 &&
    encounter.librarian_requests.every((request) => request.length >= 40) &&
    /probable\s+collection/i.test(methodSource) &&
    inquiry?.wanted?.length > 0;

  const protectedSourcesMetadataOnly = manifest.protectedSourceTargets.every((id) => {
    const item = record(id);
    const text = source(id);
    return (
      item?.kind === "source" &&
      item.visibility === "summary-only" &&
      item.public_use_status === "summary-only" &&
      typeof item.opaque_locator === "string" &&
      !item.canonical_url &&
      item.projection?.status !== "active" &&
      !privatePattern.test(text)
    );
  });

  const remainingWantsExplicit =
    sameSet(wantedIds, manifest.wantedRecordIds) &&
    living?.wanted?.every((item) => item.reason.length >= 40) &&
    /not claims? that the source never existed/i.test(livingSource);

  const publicProjectionStillSelective =
    projection?.projection_status === "hold" &&
    projection?.projection?.status === "hold" &&
    projection?.projection?.surfaces?.length === 0 &&
    manifest.priorityRecords.every(([id]) => {
      const item = record(id);
      return item?.projection?.status !== "active" && item?.projection_status !== "active";
    });

  const checks = {
    priority_missing_pages_materialized: priorityRecordsMaterialized,
    living_archive_reachable: livingArchiveReachable,
    source_return_current_and_complete: sourceReturnCurrentAndComplete,
    original_sources_materially_reached: originalSourcesMateriallyReached,
    prior_readings_and_changes_preserved: priorReadingsAndChangesPreserved,
    contradictions_remain_open: contradictionsRemainOpen,
    research_authority_not_publication: researchAuthorityNotPublication,
    librarian_requests_actionable: librarianRequestsActionable,
    protected_sources_metadata_only: protectedSourcesMetadataOnly,
    remaining_wants_explicit: remainingWantsExplicit,
    public_projection_still_selective: publicProjectionStillSelective
  };

  return {
    passed: Object.values(checks).every(Boolean),
    checks,
    failures: Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([id]) => id),
    counts: {
      priorityRecords: manifest.priorityRecords.length,
      sourceEncounterTargets: expectedSourceTargets.length,
      protectedSourceTargets: manifest.protectedSourceTargets.length,
      wantedRecords: manifest.wantedRecordIds.length
    }
  };
}
