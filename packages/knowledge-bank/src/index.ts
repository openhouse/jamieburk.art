import artifactsJson from "./data/artifacts.json" with { type: "json" };
import citationGroupsJson from "./data/citation-groups.json" with { type: "json" };
import claimsJson from "./data/claims.json" with { type: "json" };
import correctionsJson from "./data/corrections.json" with { type: "json" };
import evidenceJson from "./data/evidence.json" with { type: "json" };
import pagePlansJson from "./data/page-plans.json" with { type: "json" };
import researchRunsJson from "./data/research-runs.json" with { type: "json" };
import sourcesJson from "./data/sources.json" with { type: "json" };
import {
  knowledgeBundleSchema,
  type KnowledgeBundle,
  type ResolvedPage,
  type ResolvedReference
} from "./schema.ts";

const privatePathPattern =
  /(?:\/Users\/|\/private\/tmp\/|\/Volumes\/|file:\/\/|Mobile Documents|supporting-materials|[A-Z]:\\)/i;
const privateLocatorPattern = /\b[\w.-]+\.(?:docx|xlsx|mbox)\b/i;
const signedUrlPattern = /[?&](?:x-amz-signature|signature|sig|token|access_token|expires)=/i;
const negativeProofPattern =
  /(?:proves?|establishes?)\s+(?:that\s+)?(?:no|never|nonexistence)|(?:did not|does not) exist/i;

function normalized(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function duplicates(records: { id: string }[], label: string) {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const record of records) {
    if (seen.has(record.id)) repeated.add(record.id);
    seen.add(record.id);
  }
  return [...repeated].map((item) => `${label} has duplicate ID ${item}.`);
}

function resolvePageFromBundle(pageId: string, bundle: KnowledgeBundle): ResolvedPage {
  const plan = bundle.pagePlans.find((item) => item.pageId === pageId);
  if (!plan) throw new Error(`Unknown citation page ${pageId}.`);

  const groupById = new Map(bundle.citationGroups.map((item) => [item.id, item]));
  const claimById = new Map(bundle.claims.map((item) => [item.id, item]));
  const evidenceById = new Map(bundle.evidence.map((item) => [item.id, item]));
  const sourceById = new Map(bundle.sources.map((item) => [item.id, item]));
  const researchById = new Map(bundle.researchRuns.map((item) => [item.id, item]));
  const artifactById = new Map(bundle.artifacts.map((item) => [item.id, item]));
  const groupNumbers = new Map<string, number>();
  const references = new Map<string, ResolvedReference>();
  let nextNumber = 1;

  const occurrences = plan.occurrences.map((occurrence) => {
    const group = groupById.get(occurrence.citationGroupId);
    if (!group) throw new Error(`Unknown citation group ${occurrence.citationGroupId}.`);

    let number = groupNumbers.get(group.id);
    if (!number) {
      number = nextNumber++;
      groupNumbers.set(group.id, number);
    }

    const targetId = `reference-${plan.pageId}-${group.id}`;
    const anchorId = `cite-${plan.pageId}-${occurrence.id}-${number}`;
    const existing = references.get(group.id);

    if (existing) {
      existing.backlinks.push({
        anchorId,
        label: `Return to citation ${number}, occurrence ${existing.backlinks.length + 1}`
      });
    } else {
      references.set(group.id, {
        group,
        claims: group.claimIds.map((item) => {
          const claim = claimById.get(item);
          if (!claim) throw new Error(`Unknown claim ${item}.`);
          return claim;
        }),
        evidence: group.evidenceIds.map((item) => {
          const evidence = evidenceById.get(item);
          if (!evidence) throw new Error(`Unknown evidence ${item}.`);
          return evidence;
        }),
        sources: group.sourceIds.map((item) => {
          const source = sourceById.get(item);
          if (!source) throw new Error(`Unknown source ${item}.`);
          return source;
        }),
        researchRuns: group.researchRunIds.map((item) => {
          const run = researchById.get(item);
          if (!run) throw new Error(`Unknown research run ${item}.`);
          return run;
        }),
        artifacts: group.artifactIds.map((item) => {
          const artifact = artifactById.get(item);
          if (!artifact) throw new Error(`Unknown artifact ${item}.`);
          return artifact;
        }),
        number,
        targetId,
        backlinks: [{ anchorId, label: `Return to citation ${number}` }]
      });
    }

    return { id: occurrence.id, group, number, anchorId, targetId };
  });

  return {
    pageId: plan.pageId,
    route: plan.route,
    heading: plan.heading,
    occurrences,
    references: [...references.values()].sort((a, b) => a.number - b.number)
  };
}

export function validateKnowledgeBundle(input: unknown): KnowledgeBundle {
  const bundle = knowledgeBundleSchema.parse(input);
  const errors = [
    ...duplicates(bundle.sources, "Source"),
    ...duplicates(bundle.claims, "Claim"),
    ...duplicates(bundle.evidence, "Evidence"),
    ...duplicates(bundle.citationGroups, "Citation group"),
    ...duplicates(bundle.pagePlans.map((item) => ({ id: item.pageId })), "Page plan"),
    ...duplicates(bundle.researchRuns, "Research run"),
    ...duplicates(bundle.corrections, "Correction"),
    ...duplicates(bundle.artifacts, "Artifact")
  ];
  const sourceById = new Map(bundle.sources.map((item) => [item.id, item]));
  const claimById = new Map(bundle.claims.map((item) => [item.id, item]));
  const evidenceById = new Map(bundle.evidence.map((item) => [item.id, item]));
  const groupById = new Map(bundle.citationGroups.map((item) => [item.id, item]));
  const researchById = new Map(bundle.researchRuns.map((item) => [item.id, item]));
  const artifactById = new Map(bundle.artifacts.map((item) => [item.id, item]));

  const serialized = JSON.stringify(bundle);
  if (privatePathPattern.test(serialized) || privateLocatorPattern.test(serialized)) {
    errors.push("Knowledge data contains a private path, filename, or protected locator.");
  }

  for (const source of bundle.sources) {
    for (const link of source.links) {
      if (signedUrlPattern.test(link.url)) errors.push(`Source ${source.id} contains a signed URL.`);
    }
    if (source.visibility === "protected" && source.links.length) {
      errors.push(`Protected source ${source.id} exposes public links.`);
    }
    for (const carriedId of source.archivalCarrierFor ?? []) {
      if (!sourceById.has(carriedId)) errors.push(`Source ${source.id} carries unknown source ${carriedId}.`);
    }
    if (
      source.type === "archived-web-capture" &&
      !source.doesNotEstablish.some((item) => /event.*(?:listing|page)/i.test(item))
    ) {
      errors.push(`Archival carrier ${source.id} must reject event-listing status.`);
    }
  }

  for (const evidence of bundle.evidence) {
    const claim = claimById.get(evidence.claimId);
    if (!claim) errors.push(`Evidence ${evidence.id} references unknown claim ${evidence.claimId}.`);

    if (evidence.kind === "source") {
      const source = sourceById.get(evidence.sourceId);
      if (!source) {
        errors.push(`Evidence ${evidence.id} references unknown source ${evidence.sourceId}.`);
        continue;
      }
      if (evidence.publicCitation && source.visibility === "protected") {
        errors.push(`Evidence ${evidence.id} attempts to cite protected source ${source.id}.`);
      }
      if (evidence.supportType === "archival-carrier") {
        if (source.type !== "archived-web-capture") {
          errors.push(`Evidence ${evidence.id} labels a non-archive as an archival carrier.`);
        }
        if (!evidence.limitations.some((item) => /not the event listing/i.test(item))) {
          errors.push(`Archival-carrier evidence ${evidence.id} must reject event-listing status.`);
        }
      }
      const support = normalized(evidence.supportsText);
      for (const rejectedText of source.doesNotEstablish) {
        const rejected = normalized(rejectedText);
        if (support === rejected || (rejected.length > 20 && support.includes(rejected))) {
          errors.push(`Evidence ${evidence.id} asks ${source.id} to establish '${rejectedText}'.`);
        }
      }
    } else if (!researchById.has(evidence.researchRunId)) {
      errors.push(`Evidence ${evidence.id} references unknown research run ${evidence.researchRunId}.`);
    }

    if (evidence.publicCitation && !evidence.publicNote) {
      errors.push(`Public evidence ${evidence.id} lacks a public note.`);
    }
    if (
      evidence.supportType === "negative-search-result" &&
      negativeProofPattern.test(`${evidence.supportsText} ${evidence.publicNote ?? ""}`)
    ) {
      errors.push(`Negative-search evidence ${evidence.id} is worded as proof of nonexistence.`);
    }
  }

  for (const artifact of bundle.artifacts) {
    if (artifact.sourceId && !sourceById.has(artifact.sourceId)) {
      errors.push(`Artifact ${artifact.id} references unknown source ${artifact.sourceId}.`);
    }
    if (artifact.visibility !== "public" && artifact.publicUrl) {
      errors.push(`Non-public artifact ${artifact.id} exposes a public URL.`);
    }
    if (artifact.publicUrl && signedUrlPattern.test(artifact.publicUrl)) {
      errors.push(`Artifact ${artifact.id} contains a signed URL.`);
    }
  }

  for (const run of bundle.researchRuns) {
    if (negativeProofPattern.test(`${run.result} ${run.interpretation}`)) {
      errors.push(`Research run ${run.id} is worded as proof of nonexistence.`);
    }
  }

  for (const group of bundle.citationGroups) {
    for (const claimId of group.claimIds) {
      const claim = claimById.get(claimId);
      if (!claim) errors.push(`Citation group ${group.id} references unknown claim ${claimId}.`);
      if (group.status === "public" && claim && ["open", "protected", "superseded"].includes(claim.status)) {
        errors.push(`Public group ${group.id} contains ${claim.status} claim ${claim.id}.`);
      }
    }
    for (const evidenceId of group.evidenceIds) {
      const evidence = evidenceById.get(evidenceId);
      if (!evidence) {
        errors.push(`Citation group ${group.id} references unknown evidence ${evidenceId}.`);
        continue;
      }
      if (!group.claimIds.includes(evidence.claimId)) {
        errors.push(`Citation group ${group.id} includes evidence ${evidence.id} for an unlisted claim.`);
      }
      if (group.status === "public" && !evidence.publicCitation) {
        errors.push(`Public group ${group.id} includes non-public evidence ${evidence.id}.`);
      }
    }
    for (const sourceId of group.sourceIds) {
      const source = sourceById.get(sourceId);
      if (!source) errors.push(`Citation group ${group.id} references unknown source ${sourceId}.`);
      if (group.status === "public" && source?.visibility === "protected") {
        errors.push(`Public group ${group.id} contains protected source ${sourceId}.`);
      }
      const represented = group.evidenceIds.some((item) => {
        const evidence = evidenceById.get(item);
        return evidence?.kind === "source" && evidence.sourceId === sourceId;
      });
      if (!represented) errors.push(`Citation group ${group.id} lists source ${sourceId} without evidence.`);
    }
    for (const runId of group.researchRunIds) {
      if (!researchById.has(runId)) errors.push(`Citation group ${group.id} references unknown research run ${runId}.`);
    }
    for (const artifactId of group.artifactIds) {
      const artifact = artifactById.get(artifactId);
      if (!artifact) errors.push(`Citation group ${group.id} references unknown artifact ${artifactId}.`);
      if (group.status === "public" && artifact && artifact.visibility !== "public") {
        errors.push(`Public group ${group.id} contains ${artifact.visibility} artifact ${artifact.id}.`);
      }
    }
  }

  for (const page of bundle.pagePlans) {
    const occurrenceIds = new Set<string>();
    for (const occurrence of page.occurrences) {
      if (occurrenceIds.has(occurrence.id)) {
        errors.push(`Page ${page.pageId} has duplicate occurrence ${occurrence.id}.`);
      }
      occurrenceIds.add(occurrence.id);
      const group = groupById.get(occurrence.citationGroupId);
      if (!group) {
        errors.push(`Page ${page.pageId} references unknown group ${occurrence.citationGroupId}.`);
        continue;
      }
      if (group.status !== "public") {
        errors.push(`Page ${page.pageId} references ${group.status} group ${group.id}.`);
      }
      if (!group.allowedSurfaces.includes(page.route)) {
        errors.push(`Group ${group.id} is not allowed on ${page.route}.`);
      }
      for (const claimId of group.claimIds) {
        const claim = claimById.get(claimId);
        if (claim && !claim.allowedSurfaces.includes(page.route)) {
          errors.push(`Claim ${claim.id} is not allowed on ${page.route}.`);
        }
      }
    }
  }

  for (const correction of bundle.corrections) {
    for (const claimId of correction.relatedClaimIds) {
      if (!claimById.has(claimId)) errors.push(`Correction ${correction.id} references unknown claim ${claimId}.`);
    }
  }

  if (!errors.length) {
    for (const page of bundle.pagePlans) {
      const resolved = resolvePageFromBundle(page.pageId, bundle);
      const ids = [
        ...resolved.occurrences.map((item) => item.anchorId),
        ...resolved.references.map((item) => item.targetId)
      ];
      if (new Set(ids).size !== ids.length) errors.push(`Page ${page.pageId} generates duplicate DOM IDs.`);
    }
  }

  if (errors.length) throw new Error(`Knowledge validation failed:\n- ${errors.join("\n- ")}`);
  return bundle;
}

export const rawKnowledgeBundle = {
  sources: sourcesJson,
  claims: claimsJson,
  evidence: evidenceJson,
  citationGroups: citationGroupsJson,
  pagePlans: pagePlansJson,
  researchRuns: researchRunsJson,
  corrections: correctionsJson,
  artifacts: artifactsJson
};

export const knowledgeBundle = validateKnowledgeBundle(rawKnowledgeBundle);

export function resolveCitationPage(pageId: string, bundle: KnowledgeBundle = knowledgeBundle) {
  return resolvePageFromBundle(pageId, bundle);
}

export function validateProofLinks(bundle: KnowledgeBundle, knownProofIds: Iterable<string>) {
  const known = new Set(knownProofIds);
  const unknown = bundle.claims
    .filter((claim) => claim.proofId && !known.has(claim.proofId))
    .map((claim) => `${claim.id} -> ${claim.proofId}`);
  if (unknown.length) throw new Error(`Unknown professional proof links:\n- ${unknown.join("\n- ")}`);
}

export function getCitationOccurrence(pageId: string, occurrenceId: string) {
  const page = resolveCitationPage(pageId);
  const occurrence = page.occurrences.find((item) => item.id === occurrenceId);
  if (!occurrence) throw new Error(`Unknown citation occurrence ${occurrenceId} on ${pageId}.`);
  return occurrence;
}

export * from "./schema.ts";
