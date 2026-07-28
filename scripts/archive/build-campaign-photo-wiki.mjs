#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  mkdirSync,
  readFileSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const inputPath = path.resolve(process.argv[2] ?? "");

if (!process.argv[2]) {
  console.error(
    "Usage: node scripts/archive/build-campaign-photo-wiki.mjs <inventory.json>"
  );
  process.exit(1);
}

const inventory = JSON.parse(readFileSync(inputPath, "utf8"));
const reviewedAt = "2026-07-28";
const reviewBy = "2026-08-28";
const dataRelativePath =
  "docs/knowledge-bank/data/campaign-site-photo-inventory-2026-07.json";
const assetRelativeRoot = "docs/knowledge-bank/assets/campaign-sites";
const sourceRelativeRoot = "docs/knowledge-bank/sources/campaign-photo-sites";

const projectBySite = {
  nycartc: {
    id: "project.nyc-artist-coalition",
    href: "../../projects/nyc-artist-coalition-2017.md"
  },
  "fairrent-2019": {
    id: "project.fair-rent-nyc",
    href: "../../projects/fair-rent-nyc.md"
  },
  "fairrent-current": {
    id: "project.fair-rent-nyc",
    href: "../../projects/fair-rent-nyc.md"
  },
  letnycdance: {
    id: "project.let-nyc-dance",
    href: "../../projects/let-nyc-dance.md"
  },
  talksnotraids: {
    id: "project.talks-not-raids",
    href: "../../projects/talks-not-raids-orientation.md"
  },
  savenycspaces: {
    id: "project.save-nyc-spaces",
    href: "../../projects/save-nyc-spaces.md"
  }
};

function yamlString(value) {
  return JSON.stringify(String(value));
}

function stableToken(value) {
  return createHash("sha256").update(value).digest("hex").slice(0, 16);
}

function redactProtectedAssetToken(value) {
  return String(value ?? "").replace(
    /\b[0-9A-F]{8}(?:-[0-9A-F]{4}){3}-[0-9A-F]{12}\b/gi,
    "[public-asset-id]"
  );
}

function cleanContext(value) {
  return redactProtectedAssetToken(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/[\[\]_*`#]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function filenameFromReference(reference) {
  const cleaned = decodeURIComponent(String(reference).split(/[?#]/)[0]);
  return (
    redactProtectedAssetToken(
      path.basename(cleaned).replace(/\.[^.]+$/, "")
    ) || "untitled"
  );
}

function titleForAsset(asset) {
  const contexts = asset.occurrences
    .map((occurrence) => cleanContext(occurrence.context))
    .filter(
      (context) =>
        context.length >= 8 &&
        context.length <= 100 &&
        !context.startsWith("http")
    );
  const context = contexts[0];
  if (context) return `${asset.siteTitles[0]} photograph: ${context}`;
  return `${asset.siteTitles[0]} photograph: ${filenameFromReference(
    asset.occurrences[0].normalizedReference
  )}`;
}

function routeUrl(site, route) {
  if (site.id === "fairrent-2019") return site.publicUrl;
  return new URL(route.replace(/^\/+/, ""), site.publicUrl).toString();
}

function publicAssetUrl(site, occurrence) {
  const reference = occurrence.normalizedReference;
  if (/^https?:\/\//i.test(reference)) return reference;
  if (site.id === "fairrent-2019") return null;
  try {
    return new URL(reference.replace(/^\/+/, ""), site.publicUrl).toString();
  } catch {
    return null;
  }
}

const siteById = new Map(inventory.sites.map((site) => [site.id, site]));
const photoOccurrences = inventory.sites.flatMap((site) =>
  site.occurrences
    .filter((occurrence) =>
      ["photograph", "official-headshot"].includes(occurrence.mediaClass)
    )
    .map((occurrence) => ({
      ...occurrence,
      occurrencePageUrl: routeUrl(site, occurrence.route),
      publicAssetUrl: publicAssetUrl(site, occurrence)
    }))
);

const assetsByIdentity = new Map();
for (const occurrence of photoOccurrences) {
  const identity = occurrence.assetSha256
    ? `sha256:${occurrence.assetSha256}`
    : `url:${occurrence.siteId}:${occurrence.normalizedReference}`;
  const existing = assetsByIdentity.get(identity) ?? {
    identity,
    assetSha256: occurrence.assetSha256,
    occurrences: [],
    siteIds: new Set(),
    siteTitles: new Set()
  };
  existing.occurrences.push(occurrence);
  existing.siteIds.add(occurrence.siteId);
  existing.siteTitles.add(siteById.get(occurrence.siteId).title);
  assetsByIdentity.set(identity, existing);
}

const assets = [...assetsByIdentity.values()]
  .map((asset) => ({
    ...asset,
    siteIds: [...asset.siteIds].sort(),
    siteTitles: [...asset.siteTitles].sort(),
    occurrences: asset.occurrences.sort((a, b) =>
      `${a.siteId}|${a.route}|${a.normalizedReference}`.localeCompare(
        `${b.siteId}|${b.route}|${b.normalizedReference}`
      )
    )
  }))
  .sort((a, b) => a.identity.localeCompare(b.identity));

const sanitizedSites = inventory.sites.map((site) => ({
  id: site.id,
  title: site.title,
  publicUrl: site.publicUrl,
  sourceType: site.sourceType,
  sourceRevision: site.sourceRevision,
  closure: site.closure,
  occurrences: site.occurrences.map(
    ({
      localAsset,
      ...occurrence
    }) => ({
      ...occurrence,
      context: redactProtectedAssetToken(occurrence.context),
      reference: redactProtectedAssetToken(occurrence.reference),
      normalizedReference: redactProtectedAssetToken(
        occurrence.normalizedReference
      )
    })
  )
}));

const publicInventory = {
  schemaVersion: 2,
  id: inventory.id,
  generatedAt: inventory.generatedAt,
  reviewedAt,
  authority: inventory.authority,
  scope: inventory.scope,
  exclusions: inventory.exclusions,
  populationContract: {
    denominator:
      "Every image reference in rendered published Ghost HTML plus featured-image fields; every image reference in deployed Ember application source; and every image reference in the complete current Fair Rent public sitemap crawl.",
    ghostRepresentationRule:
      "Rendered HTML is canonical when present; stored Markdown is used only when rendered HTML is absent.",
    responsiveImageRule:
      "Responsive size variants normalize to the underlying content-image path.",
    deduplicationRule:
      "Recovered files deduplicate by SHA-256 across sites. Unrecovered public images deduplicate by site and normalized public reference.",
    outsideDenominator: [
      "dependency directories",
      "build output",
      "temporary files",
      "unreferenced storage",
      "private source paths",
      "Apple Photos private metadata"
    ]
  },
  totals: {
    sites: sanitizedSites.length,
    candidateOccurrences: sanitizedSites.reduce(
      (sum, site) => sum + site.closure.candidateOccurrenceCount,
      0
    ),
    photographOccurrences: photoOccurrences.length,
    distinctPhotographs: assets.length,
    recoveredPhotographs: assets.filter((asset) => asset.assetSha256).length,
    unrecoveredPublicPhotographs: assets.filter(
      (asset) => !asset.assetSha256
    ).length
  },
  sites: sanitizedSites,
  photographs: assets.map((asset) => ({
    id: `asset.campaign-photo.${stableToken(asset.identity)}`,
    identityKind: asset.assetSha256 ? "sha256" : "public-reference",
    assetSha256: asset.assetSha256,
    siteIds: asset.siteIds,
    title: titleForAsset(asset),
    occurrenceCount: asset.occurrences.length,
    occurrences: asset.occurrences.map((occurrence) => ({
      siteId: occurrence.siteId,
      route: occurrence.route,
      occurrencePageUrl: occurrence.occurrencePageUrl,
      publicAssetUrl: occurrence.publicAssetUrl,
      sourceField: occurrence.sourceField,
      occurrenceRole: occurrence.occurrenceRole,
      normalizedReference: redactProtectedAssetToken(
        occurrence.normalizedReference
      ),
      context: cleanContext(occurrence.context)
    }))
  }))
};

mkdirSync(path.join(repoRoot, path.dirname(dataRelativePath)), {
  recursive: true
});
mkdirSync(path.join(repoRoot, assetRelativeRoot), { recursive: true });
mkdirSync(path.join(repoRoot, sourceRelativeRoot), { recursive: true });
writeFileSync(
  path.join(repoRoot, dataRelativePath),
  `${JSON.stringify(publicInventory, null, 2)}\n`
);

for (const site of sanitizedSites) {
  const sourceId = `source.campaign-site-photo-census.${site.id}.2026-07`;
  const project = projectBySite[site.id];
  const relativePath = `${sourceRelativeRoot}/${site.id}.md`;
  const revisionLine = site.sourceRevision
    ? `- Source revision: \`${site.sourceRevision}\``
    : "- Source revision: live public crawl captured July 28, 2026";
  const body = `---
id: ${sourceId}
title: ${yamlString(`${site.title} campaign-site photograph census`)}
kind: source
status: maintained
visibility: public
sensitivity: low
last_reviewed: ${reviewedAt}
review_by: ${reviewBy}
canonical_path: ${relativePath}
summary: ${yamlString(
    `Complete bounded census of photograph occurrences on the inspected ${site.title} publication surface.`
  )}
source_kind: public-campaign-site-photo-census
canonical_url: ${site.publicUrl}
relations:
  - type: documents
    target: ${project.id}
    href: ${project.href}
---

# ${site.title} campaign-site photograph census

This source record preserves the complete bounded population used to create
individual photographic asset entries. It indexes publication occurrences;
it does not itself identify photographers, depicted people, or event details.

## Closure

- Candidate image occurrences: \`${site.closure.candidateOccurrenceCount}\`
- Photograph occurrences: \`${site.closure.photographOccurrenceCount}\`
- Recovered occurrences: \`${site.closure.recoveredOccurrenceCount}\`
- Unrecovered public occurrences: \`${site.closure.unrecoveredOccurrenceCount}\`
${revisionLine}
- Population and deduplication contract:
  [campaign-site-photo-inventory-2026-07.json](../../data/campaign-site-photo-inventory-2026-07.json)

## Publication boundary

Jamie authorized portfolio research and use of this campaign-site image
population. Every specific image still requires exact credit, represented-
person consent review, caption and crop review, editorial selection,
deployment approval, and indexing approval before a new public occurrence.
`;
  writeFileSync(path.join(repoRoot, relativePath), body);
}

for (const asset of publicInventory.photographs) {
  const token = asset.id.split(".").at(-1);
  const relativePath = `${assetRelativeRoot}/${token}.md`;
  const sourceRelations = asset.siteIds
    .map(
      (siteId) => `  - type: uses_source
    target: source.campaign-site-photo-census.${siteId}.2026-07
    href: ../../sources/campaign-photo-sites/${siteId}.md`
    )
    .join("\n");
  const occurrenceLines = asset.occurrences
    .map((occurrence) => {
      const context = occurrence.context
        ? ` — ${occurrence.context}`
        : "";
      return `- [${occurrence.siteId}: ${occurrence.route}](${occurrence.occurrencePageUrl}) — \`${occurrence.occurrenceRole}\`${context}`;
    })
    .join("\n");
  const publicReferenceLines = [
    ...new Set(
      asset.occurrences
        .map((occurrence) => occurrence.publicAssetUrl)
        .filter(Boolean)
    )
  ]
    .map((url) => `- ${url}`)
    .join("\n");
  const identityLine = asset.assetSha256
    ? `Recovered public-file SHA-256: \`${asset.assetSha256}\`.`
    : "The public pixels were not recovered into the local source census; this entry is bound to its normalized public reference and occurrence pages.";

  const body = `---
id: ${asset.id}
title: ${yamlString(asset.title)}
kind: asset
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: ${reviewedAt}
review_by: ${reviewBy}
canonical_path: ${relativePath}
summary: ${yamlString(
    `Metadata-only campaign-site photograph entry with ${asset.occurrenceCount} recovered publication occurrence${asset.occurrenceCount === 1 ? "" : "s"}.`
  )}
authority: archival-intake
media_type: photograph
rights_state: cleared
consent_state: review-needed
public_display_status: metadata-only
permission_scope: Jamie authorized research and portfolio use for the campaign-site image population; no broader license, syndication, or third-party reuse is inferred.
projection:
  status: hold
  surfaces: []
relations:
${sourceRelations}
---

# ${asset.title}

${identityLine}

## Recovered publication occurrences

${occurrenceLines}

${publicReferenceLines ? `## Public image references\n\n${publicReferenceLines}\n\n` : ""}## What this entry establishes

The photograph appeared in the declared campaign-site population at the
routes above. Page context is a research lead, not a verified caption.

## Human gates

Jamie has authorized portfolio use of this historical campaign-site image
population. Before this photograph receives a new public occurrence, record
the exact creator credit, represented-person consent or applicable public-
event boundary, checked caption, intentional crop, editorial selection,
deployment approval, and indexing approval. Metadata-only indexing is not
publication clearance.
`;
  writeFileSync(path.join(repoRoot, relativePath), body);
}

const indexRelations = sanitizedSites
  .map(
    (site) => `  - type: uses_source
    target: source.campaign-site-photo-census.${site.id}.2026-07
    href: ../sources/campaign-photo-sites/${site.id}.md`
  )
  .join("\n");
const siteRows = sanitizedSites
  .map(
    (site) =>
      `| [${site.title}](${site.publicUrl}) | ${site.closure.candidateOccurrenceCount} | ${site.closure.photographOccurrenceCount} |`
  )
  .join("\n");
const indexBody = `---
id: index.knowledge-wiki.campaign-site-photographs
title: Campaign-site photographic index
kind: index
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: ${reviewedAt}
review_by: ${reviewBy}
canonical_path: docs/knowledge-bank/indexes/campaign-site-photographs.md
summary: Bounded, occurrence-complete index of photographs published across six NYC Artist Coalition and campaign-site surfaces.
relations:
${indexRelations}
---

# Campaign-site photographic index

This index returns to the project sites as composed photographic records.
It preserves every photograph occurrence in the declared population and
creates one metadata-only Wiki asset entry per distinct recovered image.

## Population

| Publication surface | Candidate images | Photograph occurrences |
|---|---:|---:|
${siteRows}
| **Total** | **${publicInventory.totals.candidateOccurrences}** | **${publicInventory.totals.photographOccurrences}** |

The ${publicInventory.totals.photographOccurrences} photograph occurrences
resolve to ${publicInventory.totals.distinctPhotographs} distinct
metadata-only asset entries: ${publicInventory.totals.recoveredPhotographs}
with recovered public-file hashes and
${publicInventory.totals.unrecoveredPublicPhotographs} bound to normalized
public references.

## Method and exclusions

The canonical denominator and all occurrence rows are in
[the public inventory](../data/campaign-site-photo-inventory-2026-07.json).
Rendered Ghost HTML supersedes stored Markdown to avoid double counting.
Responsive sizes normalize to one source image. Dependencies, build output,
temporary files, unreferenced storage, and private Apple Photos metadata are
outside the denominator.

## What happens next

These records support photo-family discovery in Apple Photos and later oral
history. They do not silently promote any photograph to the portfolio.
Specific creator credit, consent, caption, crop, editorial, deployment, and
indexing decisions remain separate human gates.
`;
writeFileSync(
  path.join(
    repoRoot,
    "docs/knowledge-bank/indexes/campaign-site-photographs.md"
  ),
  indexBody
);

console.log(
  JSON.stringify(
    {
      candidateOccurrences: publicInventory.totals.candidateOccurrences,
      photographOccurrences: publicInventory.totals.photographOccurrences,
      distinctPhotographs: publicInventory.totals.distinctPhotographs,
      recoveredPhotographs: publicInventory.totals.recoveredPhotographs,
      unrecoveredPublicPhotographs:
        publicInventory.totals.unrecoveredPublicPhotographs
    },
    null,
    2
  )
);
