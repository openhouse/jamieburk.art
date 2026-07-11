#!/usr/bin/env node

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPageCitationScope, getPublicReferences } from "./projectors/public-page.ts";
import { callNYCKnowledgeBank } from "./records/callnyc.ts";
import { knowledgeBankSchema, type KnowledgeBank } from "./schemas.ts";

export type ValidationResult = {
  ok: boolean;
  failures: string[];
  warnings: string[];
};

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../../..");
const restrictedPattern =
  /(?:\/private\/|\/tmp\/|\/Users\/|\/Volumes\/|file:\/\/|Mobile Documents|supporting-materials|civic-hall-wayback-research|otter|iCloud|Drive private|token|secret)/i;
const manualCitationPattern = /\[(?:[1-9][0-9]*)\]/;
const nonexistenceClaimPattern = /(?:never existed|ever existed|does not exist|did not exist|no .* exists)/i;
const affirmativeRelations = new Set([
  "supports",
  "corroborates",
  "preserves",
  "contextualizes",
  "qualifies"
]);

function read(relativePath: string) {
  return readFileSync(path.join(repoRoot, relativePath), "utf8");
}

function duplicateValues(values: string[]) {
  return [...new Set(values.filter((value, index) => values.indexOf(value) !== index))];
}

function hasPageAccess(record: { allowedPages?: string[]; prohibitedPages?: string[] }, pageId: string) {
  if (record.prohibitedPages?.includes(pageId)) return false;
  if (record.allowedPages?.length && !record.allowedPages.includes(pageId)) return false;
  return true;
}

function publicBundleHasRestrictedMaterial(value: unknown) {
  return restrictedPattern.test(JSON.stringify(value));
}

function publicBundleHasManualCitation(value: unknown) {
  return manualCitationPattern.test(JSON.stringify(value));
}

export function validateKnowledgeBank(input: KnowledgeBank = callNYCKnowledgeBank): ValidationResult {
  const failures: string[] = [];
  const warnings: string[] = [];
  const parsed = knowledgeBankSchema.safeParse(input);

  if (!parsed.success) {
    for (const issue of parsed.error.issues) {
      failures.push(`Schema issue at ${issue.path.join(".") || "root"}: ${issue.message}`);
    }
    return { ok: false, failures: [...new Set(failures)], warnings: [] };
  }

  const bank = parsed.data;
  const sourceIds = new Set(bank.sources.map((source) => source.id));
  const artifactIds = new Set(bank.artifacts.map((artifact) => artifact.id));
  const claimIds = new Set(bank.claims.map((claim) => claim.id));
  const edgeIds = new Set(bank.evidenceEdges.map((edge) => edge.id));
  const groupIds = new Set(bank.citationGroups.map((group) => group.id));
  const runIds = new Set(bank.researchRuns.map((run) => run.id));
  const correctionIds = new Set(bank.corrections.map((correction) => correction.id));
  const projectionIds = new Set(bank.pageProjections.map((projection) => projection.id));

  const idsByKind = {
    source: bank.sources.map((source) => source.id),
    artifact: bank.artifacts.map((artifact) => artifact.id),
    claim: bank.claims.map((claim) => claim.id),
    "evidence-edge": bank.evidenceEdges.map((edge) => edge.id),
    "citation-group": bank.citationGroups.map((group) => group.id),
    "research-run": bank.researchRuns.map((run) => run.id),
    correction: bank.corrections.map((correction) => correction.id),
    "page-projection": bank.pageProjections.map((projection) => projection.id),
    occurrence: bank.pageProjections.flatMap((projection) =>
      projection.occurrences.map((occurrence) => occurrence.occurrenceId)
    )
  };

  for (const [kind, ids] of Object.entries(idsByKind)) {
    const duplicates = duplicateValues(ids);
    if (duplicates.length) failures.push(`Duplicate ${kind} IDs: ${duplicates.join(", ")}`);
  }

  for (const source of bank.sources) {
    if (publicBundleHasRestrictedMaterial(source)) {
      failures.push(`${source.id} exposes a private path, token, or restricted marker`);
    }
    if (publicBundleHasManualCitation(source)) {
      failures.push(`${source.id} stores a manual visible citation number`);
    }
    if (source.publicLinkable && !source.url && !source.archiveUrl) {
      failures.push(`${source.id} is publicLinkable without a public URL`);
    }
    if (source.visibility === "private-primary-evidence" && !source.publicDescription) {
      warnings.push(`${source.id} is private evidence without a public-safe description`);
    }
    if (source.publicLinkable && source.url && !source.archiveUrl) {
      warnings.push(`${source.id} has a live URL and no archive URL`);
    }
    if (!source.rights?.holder) {
      warnings.push(`${source.id} has no explicit rights holder`);
    }
  }

  for (const artifact of bank.artifacts) {
    if (publicBundleHasRestrictedMaterial(artifact)) {
      failures.push(`${artifact.id} exposes a private path, token, or restricted marker`);
    }
    if (artifact.sourceId && !sourceIds.has(artifact.sourceId)) {
      failures.push(`${artifact.id} references unknown source ${artifact.sourceId}`);
    }
    if (artifact.rights.permissionStatus !== "approved-for-publication" && artifact.publicAssetUrl) {
      failures.push(`${artifact.id} is summary-only or restricted but exposes a public asset`);
    }
    for (const claimId of artifact.supports ?? []) {
      if (!claimIds.has(claimId)) failures.push(`${artifact.id} supports unknown claim ${claimId}`);
    }
  }

  for (const claim of bank.claims) {
    const publicClaimBundle = {
      approvedPublicText: claim.approvedPublicText,
      guardrails: claim.guardrails,
      antiClaims: claim.antiClaims
    };

    if (publicBundleHasRestrictedMaterial(publicClaimBundle)) {
      failures.push(`${claim.id} exposes a private path, token, or restricted marker`);
    }
    if (publicBundleHasManualCitation(publicClaimBundle)) {
      failures.push(`${claim.id} stores a manual visible citation number`);
    }
    for (const edgeId of claim.evidenceEdgeIds) {
      if (!edgeIds.has(edgeId)) failures.push(`${claim.id} references missing edge ${edgeId}`);
    }
    for (const correctionId of claim.correctionIds ?? []) {
      if (!correctionIds.has(correctionId)) {
        failures.push(`${claim.id} references missing correction ${correctionId}`);
      }
    }
    if (claim.status === "not-recovered") {
      const claimEdges = bank.evidenceEdges.filter((edge) => claim.evidenceEdgeIds.includes(edge.id));
      const hasResearchRun = claimEdges.some((edge) => edge.target.kind === "research-run");
      if (!hasResearchRun) {
        failures.push(`${claim.id} is not-recovered but has no documented research run edge`);
      }
      if (nonexistenceClaimPattern.test(claim.approvedPublicText)) {
        failures.push(`${claim.id} turns a bounded negative search into a nonexistence claim`);
      }
    }
  }

  for (const edge of bank.evidenceEdges) {
    if (!claimIds.has(edge.claimId)) failures.push(`${edge.id} references unknown claim ${edge.claimId}`);
    const claim = bank.claims.find((candidate) => candidate.id === edge.claimId);
    if (claim && !claim.evidenceEdgeIds.includes(edge.id)) {
      failures.push(`${edge.id} is not listed by its claim ${claim.id}`);
    }
    if (edge.target.kind === "source" && !sourceIds.has(edge.target.id)) {
      failures.push(`${edge.id} references unknown source ${edge.target.id}`);
    }
    if (edge.target.kind === "artifact" && !artifactIds.has(edge.target.id)) {
      failures.push(`${edge.id} references unknown artifact ${edge.target.id}`);
    }
    if (edge.target.kind === "research-run" && !runIds.has(edge.target.id)) {
      failures.push(`${edge.id} references unknown research run ${edge.target.id}`);
    }
  }

  for (const group of bank.citationGroups) {
    if (publicBundleHasRestrictedMaterial(group) || publicBundleHasManualCitation(group)) {
      failures.push(`${group.id} exposes restricted material or stores a manual citation number`);
    }
    for (const claimId of group.claimIds) {
      if (!claimIds.has(claimId)) failures.push(`${group.id} references unknown claim ${claimId}`);
    }
    for (const edgeId of group.evidenceEdgeIds) {
      if (!edgeIds.has(edgeId)) failures.push(`${group.id} references unknown edge ${edgeId}`);
    }
    for (const claimId of group.claimIds) {
      const claimEdges = bank.evidenceEdges.filter((edge) => {
        return group.evidenceEdgeIds.includes(edge.id) && edge.claimId === claimId;
      });
      if (!claimEdges.some((edge) => affirmativeRelations.has(edge.relation))) {
        failures.push(`${group.id} has no affirmative support for ${claimId}`);
      }
      if (claimEdges.length && claimEdges.every((edge) => edge.relation === "does-not-support")) {
        failures.push(`${group.id} counts does-not-support edges as affirmative support`);
      }
    }
    if (group.claimIds.length === 1) warnings.push(`${group.id} relies on one claim`);
  }

  for (const run of bank.researchRuns) {
    const publicRunBundle = {
      publicSummary: run.publicSummary,
      finding: run.finding,
      limitation: run.limitation,
      scope: run.scope
    };
    if (publicBundleHasRestrictedMaterial(publicRunBundle)) {
      failures.push(`${run.id} exposes a private path, token, or restricted marker`);
    }
    if (nonexistenceClaimPattern.test(run.finding)) {
      failures.push(`${run.id} turns a bounded negative search into a nonexistence claim`);
    }
    if (!/not recovered within/i.test(`${run.finding} ${run.limitation}`)) {
      warnings.push(`${run.id} should preserve the 'not recovered within this search' boundary`);
    }
  }

  for (const correction of bank.corrections) {
    if (!claimIds.has(correction.targetClaimId)) {
      failures.push(`${correction.id} references missing target claim ${correction.targetClaimId}`);
    }
    const target = bank.claims.find((claim) => claim.id === correction.targetClaimId);
    if (target?.status === "retired" && correction.status === "applied") {
      failures.push(`${correction.id} applies to retired claim ${target.id}`);
    }
    for (const edgeId of correction.evidenceEdgeIds) {
      if (!edgeIds.has(edgeId)) failures.push(`${correction.id} references unknown edge ${edgeId}`);
    }
  }

  for (const projection of bank.pageProjections) {
    const occurrenceDuplicates = duplicateValues(
      projection.occurrences.map((occurrence) => occurrence.occurrenceId)
    );
    if (occurrenceDuplicates.length) {
      failures.push(`${projection.id} has duplicate occurrence IDs: ${occurrenceDuplicates.join(", ")}`);
    }

    const projectedGroups = new Set(projection.occurrences.map((item) => item.citationGroupId));
    for (const occurrence of projection.occurrences) {
      if (!groupIds.has(occurrence.citationGroupId)) {
        failures.push(`${projection.id} references unknown citation group ${occurrence.citationGroupId}`);
      }
    }

    for (const groupId of projectedGroups) {
      const group = bank.citationGroups.find((candidate) => candidate.id === groupId);
      if (!group) continue;
      for (const claimId of group.claimIds) {
        const claim = bank.claims.find((candidate) => candidate.id === claimId);
        if (claim && !hasPageAccess(claim, projection.id)) {
          failures.push(`${claim.id} is not allowed on ${projection.id}`);
        }
      }
      for (const edgeId of group.evidenceEdgeIds) {
        const edge = bank.evidenceEdges.find((candidate) => candidate.id === edgeId);
        if (edge?.target.kind === "artifact") {
          const artifact = bank.artifacts.find((candidate) => candidate.id === edge.target.id);
          if (artifact && !hasPageAccess(artifact, projection.id)) {
            failures.push(`${artifact.id} is not allowed on ${projection.id}`);
          }
        }
      }
    }

    for (const claim of bank.claims) {
      if (
        claim.reviewStatus === "approved-public" &&
        claim.citationRequired &&
        hasPageAccess(claim, projection.id)
      ) {
        const projectedClaim = [...projectedGroups].some((groupId) => {
          return bank.citationGroups.find((group) => group.id === groupId)?.claimIds.includes(claim.id);
        });
        if (!projectedClaim) {
          failures.push(`${claim.id} is citation-required but not projected on ${projection.id}`);
        }
      }
    }

    try {
      const scope = getPageCitationScope(projection.id, bank);
      const duplicateRefIds = duplicateValues(scope.occurrences.map((occurrence) => occurrence.refId));
      if (duplicateRefIds.length) {
        failures.push(`${projection.id} has duplicate DOM reference IDs: ${duplicateRefIds.join(", ")}`);
      }
      const publicProjection = scope.references.map((reference) => ({
        note: reference.citationGroup.publicNote,
        caveat: reference.citationGroup.publicCaveat,
        claims: reference.claims.map((claim) => claim.approvedPublicText),
        targets: reference.targets.map((target) => ({
          description: target.description,
          links: target.links
        }))
      }));
      if (publicBundleHasRestrictedMaterial(publicProjection)) {
        failures.push(`${projection.id} public projection exposes restricted material`);
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  for (const pageId of projectionIds) {
    try {
      for (const reference of getPublicReferences(pageId, bank)) {
        for (const target of reference.targets) {
          if (
            target.kind === "artifact" &&
            target.rightsState !== "approved-for-publication" &&
            target.links.length
          ) {
            failures.push(`${target.id} is rights-restricted but rendered as a public link`);
          }
        }
      }
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }

  const callNYCPage = read("apps/www/src/content/work/callnyc.mdx");
  const workData = read("apps/www/src/data/work.ts");
  const callNYCStart = workData.indexOf('title: "CallNYC.org"');
  const callNYCEnd = workData.indexOf('title: "WOWList.org"', callNYCStart);
  const callNYCWorkBlock = workData.slice(callNYCStart, callNYCEnd);
  const publicCallNYC = `${callNYCWorkBlock}\n${callNYCPage}`;

  if (!/years:\s*"2016"/.test(callNYCWorkBlock)) {
    failures.push('CallNYC work metadata must use years: "2016"');
  }
  if (/2014\s*[-–]\s*2015/.test(publicCallNYC)) {
    failures.push("CallNYC public copy still exposes the old 2014-2015 year range");
  }
  if (/first civic-data hackathon/i.test(publicCallNYC)) {
    failures.push("CallNYC public copy still says first civic-data hackathon");
  }
  if (!/first CouncilStat hackathon/.test(publicCallNYC)) {
    failures.push("CallNYC public copy does not include first CouncilStat hackathon");
  }
  if (publicBundleHasRestrictedMaterial(publicCallNYC)) {
    failures.push("CallNYC public copy exposes restricted material");
  }
  if (manualCitationPattern.test(callNYCPage)) {
    failures.push("CallNYC MDX contains manual citation numbers");
  }

  const citeTags = [...callNYCPage.matchAll(/<Cite\s+[\s\S]*?\/>/g)].map((match) => match[0]);
  const usedGroups = citeTags
    .map((tag) => /citationGroupId="([^"]+)"/.exec(tag)?.[1])
    .filter(Boolean) as string[];
  const usedOccurrences = citeTags
    .map((tag) => /occurrenceId="([^"]+)"/.exec(tag)?.[1])
    .filter(Boolean) as string[];
  const callNYCProjection = bank.pageProjections.find((page) => page.id === "work.callnyc");
  if (!callNYCProjection) failures.push("CallNYC page projection is missing");
  if (callNYCProjection) {
    for (const occurrence of callNYCProjection.occurrences) {
      if (!usedOccurrences.includes(occurrence.occurrenceId)) {
        failures.push(`CallNYC MDX does not render occurrence ${occurrence.occurrenceId}`);
      }
      if (!usedGroups.includes(occurrence.citationGroupId)) {
        failures.push(`CallNYC MDX does not render citation group ${occurrence.citationGroupId}`);
      }
    }
  }

  const componentPaths = [
    "apps/www/src/components/citations/Cite.tsx",
    "apps/www/src/components/citations/References.tsx"
  ];
  for (const componentPath of componentPaths) {
    if (!existsSync(path.join(repoRoot, componentPath))) failures.push(`${componentPath} is missing`);
  }
  const componentSource = componentPaths
    .filter((componentPath) => existsSync(path.join(repoRoot, componentPath)))
    .map(read)
    .join("\n");
  for (const required of ['role="doc-noteref"', 'role="doc-endnotes"', 'role="doc-backlink"']) {
    if (!componentSource.includes(required)) {
      failures.push(`Citation components are missing accessibility contract: ${required}`);
    }
  }
  if (/role=["']doc-endnote["']|role=["']doc-biblioentry["']/.test(componentSource)) {
    failures.push("Citation components use deprecated DPUB-ARIA roles");
  }

  if (!read("AGENTS.md").includes("docs/citational-care.md")) {
    failures.push("AGENTS.md is missing citational-care guidance");
  }
  if (!existsSync(path.join(repoRoot, "docs/citational-care.md"))) {
    failures.push("docs/citational-care.md is missing");
  }

  for (const correction of bank.corrections) {
    if (publicCallNYC.includes(correction.priorPublicText)) {
      warnings.push(`${correction.id} prior wording may still appear in public CallNYC copy`);
    }
  }

  return {
    ok: failures.length === 0,
    failures: [...new Set(failures)],
    warnings: [...new Set(warnings)]
  };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const result = validateKnowledgeBank();

  if (result.warnings.length) {
    console.warn("Citation warnings:");
    for (const warning of result.warnings) console.warn(`- ${warning}`);
  }

  if (!result.ok) {
    console.error("Citation check failed:");
    for (const failure of result.failures) console.error(`- ${failure}`);
    process.exit(1);
  }

  console.log(
    `Citation check passed: ${callNYCKnowledgeBank.sources.length} sources, ${callNYCKnowledgeBank.artifacts.length} artifacts, ${callNYCKnowledgeBank.claims.length} claims, ${callNYCKnowledgeBank.evidenceEdges.length} evidence edges, ${callNYCKnowledgeBank.citationGroups.length} citation groups, ${callNYCKnowledgeBank.corrections.length} corrections, ${callNYCKnowledgeBank.pageProjections.length} page projection.`
  );
}
