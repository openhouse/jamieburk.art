import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const configPath = path.join(repoRoot, "docs/knowledge-bank/data/project-site-photograph-census.config.json");
const dataPath = path.join(repoRoot, "docs/knowledge-bank/data/project-site-photograph-census-2026-07-28.json");
const assetsDir = path.join(repoRoot, "docs/knowledge-bank/assets/photographs/project-sites");
const sourcePath = path.join(repoRoot, "docs/knowledge-bank/sources/archives/nycac-project-site-photograph-census-2026-07.md");
const indexPath = path.join(repoRoot, "docs/knowledge-bank/indexes/photo-sets/nycac-project-sites-2017-2026.md");

function parseMappings(values) {
  return Object.fromEntries(values.map((value) => {
    const separator = value.indexOf("=");
    if (separator < 1) throw new Error(`Expected key=path mapping, received: ${value}`);
    return [value.slice(0, separator), path.resolve(value.slice(separator + 1))];
  }));
}

function parseArgs(argv) {
  const args = { cdx: [], html: [], check: false };
  for (let index = 0; index < argv.length; index += 1) {
    const value = argv[index];
    if (value === "--cdx") args.cdx.push(argv[++index]);
    else if (value === "--html") args.html.push(argv[++index]);
    else if (value === "--check") args.check = true;
    else throw new Error(`Unknown argument: ${value}`);
  }
  return { cdx: parseMappings(args.cdx), html: parseMappings(args.html), check: args.check };
}

function slug(value) {
  return value
    .toLowerCase()
    .replace(/^https?:\/\//, "")
    .replace(/\?.*$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 72);
}

function normalizeOriginalUrl(value) {
  let normalized = value
    .replace(/^https?:\/\/web\.archive\.org\/web\/\d+(?:id_|im_)?\//, "")
    .replace(/&amp;/g, "&")
    .trim();
  if (normalized.startsWith("//")) normalized = `https:${normalized}`;
  return normalized;
}

function classificationFor(url, mimetype) {
  const value = decodeURIComponent(url).toLowerCase();
  const pathname = value.replace(/^https?:\/\/[^/]+/, "").split("?")[0];
  const basename = pathname.split("/").pop() || "";

  const exclusions = [
    ["interface-icon", /(?:^|\/)(?:apple-icon|android-icon|ms-icon|favicon|marker|layers(?:-2x)?|sprite)[^/]*\.(?:png|gif|jpe?g|svg)$/],
    ["logo", /(?:^|\/)(?:logos?|press\/logos?|graphics\/logo)(?:\/|$)|logo|(?:^|[-_.])(amny|atlantic|crains|curbed|dailynews|gothamist|newvill|nytimes|thebaffler|village-voice|villagvoice)[a-z0-9-]*(?:[-_.]|$)/],
    ["map-or-data-graphic", /(?:^|[-_/])(map|chart|graph|district-vacancy|whiteness-map)(?:[-_.\/]|$)/],
    ["print-or-campaign-graphic", /(?:handout|postcard|flier|flyer|sponsors?-card|4x6|social-share|preview|og-image|cover-\d|rentclosesspaces|call-script|dcla-recs|nightmayorrecs|nowhere-legal|passsbjsa|vote-cta|weekly-bulletin|fair-rent-pink|calendar-banner)/],
    ["tile-derivative", /(?:^|\/)(?:tiles?|thumbnails?)(?:\/|$)/],
    ["font-or-vector", /\.(?:svg|ico)(?:\?|$)/]
  ];
  for (const [disposition, pattern] of exclusions) {
    if (pattern.test(pathname)) return { disposition: "excluded", category: disposition };
  }

  const explicitPhoto =
    /(?:^|\/)(?:photos?|testimony|headshots?|slideshow)(?:\/|$)/.test(pathname) ||
    /(?:meeting|hearing|rally|group-photo|group\b|town-?hall|cabaretlawrepeal|joe-conzo|funkrust|kurtis-blow|portrait|workinggroup|dcla(?:meeting|mtg)|vacant|storefront|finkelpearl|frankie|olympia|nola|rachel|diana|house-of-yes|madiba|sbjsaphoto|signing-group|circle)/.test(basename) ||
    /(?:^|\/)\d{8,}_[a-f0-9]+_[a-z0-9-]*\.(?:jpe?g|png)$/.test(pathname);

  if (explicitPhoto) return { disposition: "photograph", category: "photograph" };
  if (mimetype === "image/jpeg" || /\.jpe?g$/.test(pathname)) {
    return { disposition: "photograph", category: "probable-photograph" };
  }
  if (mimetype === "image/gif" && /(?:dance|spaces|people|event|action)/.test(basename)) {
    return { disposition: "photograph", category: "animated-photograph" };
  }
  return { disposition: "excluded", category: "non-photographic-raster" };
}

function familyHintFor(url) {
  return slug(
    path.basename(new URL(url).pathname)
      .replace(/\.(?:jpe?g|png|gif|webp)$/i, "")
      .replace(/(?:-|_)(?:thumb|small|medium|large|web|full|crop)(?:-|_)?\d*$/i, "")
      .replace(/-[a-f0-9]{16,}$/i, "")
  );
}

function readCdx(file) {
  const rows = JSON.parse(readFileSync(file, "utf8"));
  if (!Array.isArray(rows) || rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index]])));
}

function sha256File(file) {
  return createHash("sha256").update(readFileSync(file)).digest("hex");
}

function visibleTextNear(html, needle) {
  const lower = html.toLowerCase();
  const index = lower.indexOf(needle.toLowerCase());
  if (index < 0) return "";
  return html
    .slice(Math.max(0, index - 500), Math.min(html.length, index + needle.length + 500))
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 360);
}

function contextMapFromHtmlDir(directory) {
  if (!directory || !existsSync(path.join(directory, "manifest.json"))) return new Map();
  const manifest = JSON.parse(readFileSync(path.join(directory, "manifest.json"), "utf8"));
  const contexts = new Map();
  for (const page of manifest.pages.filter((entry) => entry.status === "recovered")) {
    const html = readFileSync(path.join(directory, page.filename), "utf8");
    const candidates = [];
    for (const match of html.matchAll(/(?:src|content|data-src)=["']([^"']+\.(?:jpe?g|png|gif|webp)(?:\?[^"']*)?)["']/gi)) {
      candidates.push(match[1]);
    }
    for (const match of html.matchAll(/url\((?:["']?)([^)"']+\.(?:jpe?g|png|gif|webp)(?:\?[^)"']*)?)(?:["']?)\)/gi)) {
      candidates.push(match[1]);
    }
    for (const candidate of candidates) {
      const normalized = normalizeOriginalUrl(candidate);
      const key = normalized.split("?")[0];
      const occurrence = {
        pageUrl: page.original,
        archiveUrl: page.archiveUrl,
        archivedAt: page.timestamp,
        nearbyPublicText: visibleTextNear(html, candidate)
      };
      if (!contexts.has(key)) contexts.set(key, []);
      const existing = contexts.get(key);
      if (!existing.some((item) => item.pageUrl === occurrence.pageUrl)) existing.push(occurrence);
    }
  }
  return contexts;
}

function recordMarkdown(entry, config) {
  const relatedProjectRelations = entry.projectIds
    .map((projectId) => {
      const hrefByProject = {
        "project.nyc-artist-coalition": "../../../projects/nyc-artist-coalition-2017.md",
        "project.fair-rent-nyc": "../../../projects/fair-rent-nyc.md",
        "project.talks-not-raids": "../../../projects/talks-not-raids-orientation.md",
        "project.let-nyc-dance": "../../../projects/let-nyc-dance.md",
        "project.save-nyc-spaces": "../../../projects/save-nyc-spaces.md"
      };
      return hrefByProject[projectId]
        ? `  - type: related_to\n    target: ${projectId}\n    href: ${hrefByProject[projectId]}`
        : null;
    })
    .filter(Boolean)
    .join("\n");
  const publicUrls = entry.originalUrls.map((url) => `  - ${JSON.stringify(url)}`).join("\n");
  const archiveUrls = entry.archiveUrls.slice(0, 8).map((url) => `  - ${JSON.stringify(url)}`).join("\n");
  const contexts = entry.contexts.length > 0
    ? entry.contexts.slice(0, 12).map((context) =>
        `  - page: ${JSON.stringify(context.pageUrl)}\n    archive: ${JSON.stringify(context.archiveUrl)}\n    archived_at: ${context.archivedAt}`
      ).join("\n")
    : "  - state: not-recovered";

  return `---
id: ${entry.id}
title: ${JSON.stringify(entry.title)}
kind: asset
status: governed-open
visibility: summary-only
sensitivity: moderate
last_reviewed: ${config.reviewedAt}
review_by: 2026-10-28
canonical_path: ${entry.canonicalPath}
summary: ${JSON.stringify(`Held project-site photograph record recovered from ${entry.siteLabels.join(", ")}; page context and archive provenance are preserved while creator, rights, dignity, and exact-use review remain open.`)}
media_type: photograph
source_population: archived-project-site-census
archive_digest: ${entry.archiveDigest}
family_hint: ${JSON.stringify(entry.familyHint)}
rights_state: permission-needed
creator_state: unresolved
consent_state: review-needed
represented_person_review: review-needed
apple_photos_match_state: unresolved
public_display_status: hold
projection:
  status: hold
  surfaces: []
original_public_urls:
${publicUrls}
archived_evidence_urls:
${archiveUrls}
page_occurrences:
${contexts}
interpretation_boundary: The source page can support event and campaign context; the image alone does not establish identity, authorship, consent, exact date, individual remarks, endorsement, outcome, or Jamie's sole credit.
relations:
  - type: related_to
    target: ${config.indexRecordId}
    href: ../../../indexes/photo-sets/nycac-project-sites-2017-2026.md
  - type: uses_source
    target: ${config.sourceRecordId}
    href: ../../../sources/archives/nycac-project-site-photograph-census-2026-07.md
${relatedProjectRelations}
---

# ${entry.title}

## Source return

This record preserves a photograph or photographic derivative that appeared in
the recovered public image population for ${entry.siteLabels.join(", ")}.
The census groups exact Wayback payload digests while retaining every recovered
public URL and page occurrence.

## Context

${entry.contexts.length > 0
  ? `The Wayback return linked this image to ${entry.contexts.length} recovered public page occurrence${entry.contexts.length === 1 ? "" : "s"}. Those occurrences preserve context, not blanket publication clearance.`
  : "No archived HTML occurrence was recovered. The image remains in the census because the Wayback image population preserves it as a successfully archived site resource."}

## Hold

No pixel derivative is committed here. Creator, rights, exact credit, depicted
people, dignity, caption, crop, and destination review remain open. Jamie's
authorization to research the project sites and Apple Photos library does not
erase third-party rights or represented-person review.
`;
}

function build(config, args) {
  const htmlMaps = Object.fromEntries(
    Object.entries(args.html).map(([key, directory]) => [key, contextMapFromHtmlDir(directory)])
  );
  const censusRows = [];

  for (const site of config.sites) {
    const cdxPath = args.cdx[site.cdxKey];
    if (!cdxPath) throw new Error(`Missing --cdx ${site.cdxKey}=FILE`);
    for (const row of readCdx(cdxPath)) {
      const original = normalizeOriginalUrl(row.original);
      const classification = classificationFor(original, row.mimetype);
      const contextMap = htmlMaps[site.cdxKey] || new Map();
      const contexts =
        contextMap.get(original.split("?")[0]) ||
        contextMap.get(original.replace(/^http:/, "https:").split("?")[0]) ||
        contextMap.get(original.replace(/^https:/, "http:").split("?")[0]) ||
        [];
      censusRows.push({
        siteId: site.id,
        siteLabel: site.label,
        projectIds: site.projectIds,
        domain: site.domain,
        timestamp: row.timestamp,
        originalUrl: original,
        archiveUrl: `https://web.archive.org/web/${row.timestamp}id_/${original}`,
        mimetype: row.mimetype,
        archiveDigest: row.digest,
        archivedLength: Number(row.length || 0),
        familyHint: familyHintFor(original),
        disposition: classification.disposition,
        dispositionCategory: classification.category,
        contexts
      });
    }
  }

  const grouped = new Map();
  for (const row of censusRows.filter((item) => item.disposition === "photograph")) {
    const key = row.archiveDigest || createHash("sha256").update(row.originalUrl).digest("hex");
    if (!grouped.has(key)) {
      grouped.set(key, {
        archiveDigest: key,
        originalUrls: new Set(),
        archiveUrls: new Set(),
        siteIds: new Set(),
        siteLabels: new Set(),
        projectIds: new Set(),
        timestamps: [],
        mimeTypes: new Set(),
        familyHints: new Set(),
        contexts: []
      });
    }
    const entry = grouped.get(key);
    entry.originalUrls.add(row.originalUrl);
    entry.archiveUrls.add(row.archiveUrl);
    entry.siteIds.add(row.siteId);
    entry.siteLabels.add(row.siteLabel);
    row.projectIds.forEach((projectId) => entry.projectIds.add(projectId));
    entry.timestamps.push(row.timestamp);
    entry.mimeTypes.add(row.mimetype);
    entry.familyHints.add(row.familyHint);
    for (const context of row.contexts) {
      if (!entry.contexts.some((existing) => existing.pageUrl === context.pageUrl)) entry.contexts.push(context);
    }
  }

  const entries = [...grouped.values()]
    .map((group) => {
      const siteSlug = [...group.siteIds].sort().join("-");
      const familyHint = [...group.familyHints].sort()[0] || "photograph";
      const identifier = `${siteSlug}-${familyHint}-${group.archiveDigest.toLowerCase().slice(0, 10)}`;
      return {
        id: `asset.photo.project-site.${slug(identifier)}`,
        title: `${[...group.siteLabels].sort().join(" / ")}: ${familyHint.replaceAll("-", " ")} [${group.archiveDigest.toLowerCase().slice(0, 8)}]`,
        siteIds: [...group.siteIds].sort(),
        siteLabels: [...group.siteLabels].sort(),
        projectIds: [...group.projectIds].sort(),
        archiveDigest: group.archiveDigest,
        familyHint,
        originalUrls: [...group.originalUrls].sort(),
        archiveUrls: [...group.archiveUrls].sort(),
        firstArchivedAt: group.timestamps.sort()[0],
        lastArchivedAt: group.timestamps.sort().at(-1),
        mimeTypes: [...group.mimeTypes].sort(),
        contexts: group.contexts.sort((a, b) => a.pageUrl.localeCompare(b.pageUrl)),
        rightsState: "review-needed",
        publicDisplayStatus: "hold",
        applePhotosMatchState: "unresolved",
        canonicalPath: `docs/knowledge-bank/assets/photographs/project-sites/${slug(identifier)}.md`
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));

  const dispositions = {};
  for (const row of censusRows) dispositions[row.dispositionCategory] = (dispositions[row.dispositionCategory] || 0) + 1;
  const sites = config.sites.map((site) => {
    const rows = censusRows.filter((row) => row.siteId === site.id);
    return {
      id: site.id,
      label: site.label,
      domain: site.domain,
      archivedImageUrls: rows.length,
      photographUrls: rows.filter((row) => row.disposition === "photograph").length,
      excludedImageUrls: rows.filter((row) => row.disposition === "excluded").length,
      heldPhotoFamilies: entries.filter((entry) => entry.siteIds.includes(site.id)).length
    };
  });

  return {
    version: 1,
    generatedAt: `${config.reviewedAt}T11:00:00-04:00`,
    populationDefinition: "Every status-200 image resource in the collapsed Wayback CDX URL population for the five named NYC Artist Coalition project and campaign domains. Each row receives a photograph or explicit non-photo disposition; exact payload digests form held photograph records.",
    completenessBoundary: "This is complete for the recovered Wayback URL populations named here, not proof that Wayback captured every historical network request or every private/local source asset. HTML occurrence recovery is reported separately.",
    privacyBoundary: "No private Apple Photos identifier, filesystem path, face label, coordinate, pixel derivative, or unpublished source is stored.",
    inputReceipt: {
      ...config.inputReceipt,
      sites: config.sites.map((site) => ({
        id: site.id,
        domain: site.domain,
        ...site.captureReceipt
      }))
    },
    sites,
    dispositions,
    archivedImageUrlPopulation: censusRows.length,
    photographUrlPopulation: censusRows.filter((row) => row.disposition === "photograph").length,
    excludedImageUrlPopulation: censusRows.filter((row) => row.disposition === "excluded").length,
    undispositionedImageUrlPopulation: censusRows.filter((row) => !["photograph", "excluded"].includes(row.disposition)).length,
    heldPhotoFamilyPopulation: entries.length,
    photoFamiliesWithPageContext: entries.filter((entry) => entry.contexts.length > 0).length,
    entries,
    excludedRows: censusRows
      .filter((row) => row.disposition === "excluded")
      .map(({ contexts, ...row }) => row)
  };
}

function writeOutputs(census, config) {
  mkdirSync(assetsDir, { recursive: true });
  for (const filename of readdirSync(assetsDir)) {
    if (filename.endsWith(".md")) rmSync(path.join(assetsDir, filename));
  }
  writeFileSync(dataPath, `${JSON.stringify(census, null, 2)}\n`);
  for (const entry of census.entries) {
    writeFileSync(path.join(repoRoot, entry.canonicalPath), recordMarkdown(entry, config));
  }

  const siteRows = census.sites
    .map((site) => `| ${site.label} | ${site.archivedImageUrls} | ${site.photographUrls} | ${site.excludedImageUrls} | ${site.heldPhotoFamilies} |`)
    .join("\n");
  writeFileSync(sourcePath, `---
id: ${config.sourceRecordId}
title: NYC Artist Coalition project-site photograph census
kind: source
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: ${config.reviewedAt}
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/sources/archives/nycac-project-site-photograph-census-2026-07.md
summary: A deterministic full-population disposition of recovered Wayback image URLs from five NYC Artist Coalition project and campaign domains.
source_kind: public-web-archive-census
public_use: metadata-and-bounded-context-only
reproduction_rights: unresolved
relations:
  - type: related_to
    target: ${config.indexRecordId}
    href: ../../indexes/photo-sets/nycac-project-sites-2017-2026.md
---

# NYC Artist Coalition project-site photograph census

## Population

The census accounts for all ${census.archivedImageUrlPopulation} status-200
image URLs in the collapsed Wayback CDX populations for the five named domains.
${census.photographUrlPopulation} URL records were classified as photographs
and grouped into ${census.heldPhotoFamilyPopulation} exact archived-payload
families. ${census.excludedImageUrlPopulation} image URLs received explicit
non-photo dispositions. Nothing was silently discarded.

| Site | Archived image URLs | Photo URLs | Explicit exclusions | Held photo families |
| --- | ---: | ---: | ---: | ---: |
${siteRows}

## Method

The census uses Wayback CDX URL populations collapsed by URL key, deterministic
path-based classification, exact archived payload digests, and archived HTML
occurrence recovery where available. A family hint groups related filenames
for later editorial work but does not assert that two different digests are the
same camera exposure.

The checked-in source-manifest directory preserves the exact image and HTML CDX
rows used for every domain, the query and capture time for each population, and
a SHA-256 receipt for every recovered HTML page. The machine-readable census
repeats those input receipts so a later pass can verify the population without
depending on this working session.

## Completeness boundary

The result is complete for the recovered CDX populations, not for every network
request that ever occurred. Wayback omissions, blocked resources, JavaScript
loads, and uncrawled variants remain possible. The local project repositories
and Apple Photos archive are corroborating research surfaces for future
matching, not hidden additions to the public count.

## Rights boundary

The census preserves public URLs and context only. It does not republish pixels
or clear creator rights, exact credit, depicted-person dignity, consent, crop,
caption, or destination. Every photograph family remains held by default.
`);

  writeFileSync(indexPath, `---
id: ${config.indexRecordId}
title: NYC Artist Coalition project-site photographs, 2017-2026
kind: index
status: governed-open
visibility: summary-only
sensitivity: moderate
last_reviewed: ${config.reviewedAt}
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/indexes/photo-sets/nycac-project-sites-2017-2026.md
summary: A held index of ${census.heldPhotoFamilyPopulation} exact archived photograph families recovered from five project and campaign sites.
projection:
  status: hold
  surfaces: []
relations:
  - type: uses_source
    target: ${config.sourceRecordId}
    href: ../../sources/archives/nycac-project-site-photograph-census-2026-07.md
  - type: related_to
    target: project.nyc-artist-coalition
    href: ../../projects/nyc-artist-coalition-2017.md
---

# NYC Artist Coalition project-site photographs, 2017-2026

This index gives each recovered photograph family a governed Wiki entry while
keeping public portfolio projection selective. It preserves the site context
that made the photographs meaningful: meetings, testimony, collective action,
campaign explanation, and the people and places through which the work moved.

## Current state

- ${census.archivedImageUrlPopulation} archived image URL records received a disposition.
- ${census.photographUrlPopulation} photograph URLs resolve to ${census.heldPhotoFamilyPopulation} exact payload families.
- ${census.photoFamiliesWithPageContext} families currently have recovered archived HTML page context.
- ${census.entries.filter((entry) => entry.applePhotosMatchState === "unresolved").length} Apple Photos matches remain unresolved.
- Every family remains held pending creator, rights, credit, dignity, consent, caption, crop, and destination review.

The machine-readable census is
\`docs/knowledge-bank/data/project-site-photograph-census-2026-07-28.json\`.
`);
}

function normalizedJson(value) {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const config = JSON.parse(readFileSync(configPath, "utf8"));
  if (args.check) {
    if (!existsSync(dataPath)) throw new Error("Photo census data is missing.");
    const census = JSON.parse(readFileSync(dataPath, "utf8"));
    const failures = [];
    if (census.undispositionedImageUrlPopulation !== 0) failures.push("undispositioned image rows remain");
    if (census.archivedImageUrlPopulation !== census.photographUrlPopulation + census.excludedImageUrlPopulation) {
      failures.push("photo and exclusion counts do not reconcile to the source population");
    }
    if (census.entries.length !== census.heldPhotoFamilyPopulation) failures.push("family count mismatch");
    if (census.inputReceipt?.sites?.length !== config.sites.length) {
      failures.push("input-receipt site count does not match the configured census");
    }
    for (const site of config.sites) {
      const receipt = site.captureReceipt;
      const censusSite = census.sites.find((entry) => entry.id === site.id);
      const censusReceipt = census.inputReceipt?.sites?.find((entry) => entry.id === site.id);
      if (!receipt || !censusReceipt) {
        failures.push(`missing capture receipt: ${site.id}`);
        continue;
      }

      for (const receiptPath of [
        receipt.imageCdxPath,
        receipt.htmlCdxPath,
        receipt.htmlManifestPath
      ]) {
        if (!receiptPath || !existsSync(path.join(repoRoot, receiptPath))) {
          failures.push(`missing checked-in source manifest: ${site.id}:${receiptPath || "unset"}`);
        }
      }
      if (failures.some((failure) => failure.startsWith(`missing checked-in source manifest: ${site.id}:`))) {
        continue;
      }

      const imageCdxPath = path.join(repoRoot, receipt.imageCdxPath);
      const htmlCdxPath = path.join(repoRoot, receipt.htmlCdxPath);
      const htmlManifestPath = path.join(repoRoot, receipt.htmlManifestPath);
      const htmlManifest = JSON.parse(readFileSync(htmlManifestPath, "utf8"));
      const recoveredPages = htmlManifest.pages.filter((page) => page.status === "recovered");

      if (sha256File(imageCdxPath) !== receipt.imageCdxSha256) {
        failures.push(`image CDX checksum mismatch: ${site.id}`);
      }
      if (sha256File(htmlCdxPath) !== receipt.htmlCdxSha256) {
        failures.push(`HTML CDX checksum mismatch: ${site.id}`);
      }
      if (sha256File(htmlManifestPath) !== receipt.htmlManifestSha256) {
        failures.push(`HTML manifest checksum mismatch: ${site.id}`);
      }
      if (readCdx(imageCdxPath).length !== receipt.imageRowCount) {
        failures.push(`image CDX row-count mismatch: ${site.id}`);
      }
      if (readCdx(htmlCdxPath).length !== receipt.htmlPageCount) {
        failures.push(`HTML CDX row-count mismatch: ${site.id}`);
      }
      if (
        htmlManifest.sourceCdxSha256 !== receipt.htmlCdxSha256 ||
        htmlManifest.population !== receipt.htmlPageCount ||
        htmlManifest.pages.length !== receipt.htmlPageCount
      ) {
        failures.push(`HTML manifest population receipt mismatch: ${site.id}`);
      }
      for (const page of recoveredPages) {
        if (
          !/^https:\/\/web\.archive\.org\/web\/\d+id_\//.test(page.archiveUrl || "") ||
          !/^[a-f0-9]{64}$/.test(page.sha256 || "")
        ) {
          failures.push(`invalid recovered-page receipt: ${site.id}:${page.original || "unknown"}`);
        }
      }
      if (censusSite?.archivedImageUrls !== receipt.imageRowCount) {
        failures.push(`census/source image population mismatch: ${site.id}`);
      }
      for (const [key, value] of Object.entries(receipt)) {
        if (censusReceipt[key] !== value) {
          failures.push(`census input receipt drift: ${site.id}:${key}`);
        }
      }
    }
    for (const entry of census.entries) {
      if (!existsSync(path.join(repoRoot, entry.canonicalPath))) failures.push(`missing asset record: ${entry.id}`);
      if (entry.publicDisplayStatus !== "hold") failures.push(`non-held census entry: ${entry.id}`);
      if (entry.applePhotosMatchState !== "unresolved") failures.push(`unexpected private archive binding: ${entry.id}`);
    }
    if (failures.length > 0) throw new Error(failures.join("\n"));
    console.log(`Project-site photo census PASS: ${census.archivedImageUrlPopulation} URLs, ${census.heldPhotoFamilyPopulation} held families.`);
    return;
  }
  const census = build(config, args);
  writeOutputs(census, config);
  process.stdout.write(normalizedJson({
    archivedImageUrlPopulation: census.archivedImageUrlPopulation,
    photographUrlPopulation: census.photographUrlPopulation,
    excludedImageUrlPopulation: census.excludedImageUrlPopulation,
    heldPhotoFamilyPopulation: census.heldPhotoFamilyPopulation,
    photoFamiliesWithPageContext: census.photoFamiliesWithPageContext
  }));
}

main();
