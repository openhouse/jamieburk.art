#!/usr/bin/env node

import { createHash } from "node:crypto";
import {
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");
const mediaDataPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/campaign-site-media-index.json"
);
const photoDataPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/campaign-site-photo-index.json"
);
const outputRoot = path.join(
  repoRoot,
  "docs/knowledge-bank/assets/photographs/campaign-sites"
);
const sourceId = "source.nycac.campaign-site-media-census.2026-07";
const sourceHref = "../../../sources/nycac-campaign-site-media-census-2026-07.md";
const sourcePath =
  "docs/knowledge-bank/sources/nycac-campaign-site-media-census-2026-07.md";

function loadJson(filePath) {
  return JSON.parse(readFileSync(filePath, "utf8"));
}

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .replace(/[\u0000-\u001f\u007f]/g, "")
    .trim();
}

function yamlString(value) {
  return JSON.stringify(cleanText(value));
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function recordSlug(item) {
  const suffix = item.id.replace(/^campaign-photo-/, "");
  if (!/^[a-f0-9]{16}$/.test(suffix)) {
    throw new Error(`Invalid campaign photo id: ${item.id}`);
  }
  return suffix;
}

function imageTitle(item) {
  const occurrence = item.occurrences.find((entry) => cleanText(entry.alt));
  if (occurrence) return cleanText(occurrence.alt).slice(0, 140);
  const filename = decodeURIComponent(
    path.basename(new URL(item.url).pathname)
  ).replace(/\.[a-z0-9]+$/i, "");
  return filename.replace(/[-_]+/g, " ").replace(/\s+/g, " ").trim().slice(0, 140);
}

function recordFor(item) {
  const slug = recordSlug(item);
  const baseTitle = imageTitle(item) || "Campaign-site photograph";
  const title = `${baseTitle} — campaign-site image ${slug}`;
  const recordId = `asset.photo.campaign-site.${slug}`;
  const canonicalPath =
    `docs/knowledge-bank/assets/photographs/campaign-sites/${slug}.md`;
  const sourceContexts = item.occurrences
    .slice(0, 8)
    .map((entry) => ({
      page_url: entry.page_url,
      page_title: cleanText(entry.page_title),
      heading: cleanText(entry.heading),
      alt: cleanText(entry.alt)
    }));
  const contextsYaml = sourceContexts.flatMap((entry) => [
    `  - page_url: ${yamlString(entry.page_url)}`,
    `    page_title: ${yamlString(entry.page_title)}`,
    `    heading: ${yamlString(entry.heading)}`,
    `    alt: ${yamlString(entry.alt)}`
  ]);
  const contextRows = sourceContexts.map((entry) =>
    `| [${entry.page_title || "Campaign page"}](${entry.page_url}) | ` +
    `${entry.heading || "No recovered heading"} | ${entry.alt || "No recovered alt text"} |`
  );
  const overflowNote =
    item.occurrences.length > sourceContexts.length
      ? `\n${item.occurrences.length - sourceContexts.length} additional occurrence(s) remain in the machine-readable census.\n`
      : "";

  return `---
id: ${recordId}
title: ${yamlString(title)}
kind: asset
status: governed-open
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: ${canonicalPath}
summary: ${yamlString(
    `Metadata-only record for a ${item.media_class.replaceAll("-", " ")} used on one or more public NYC Artist Coalition project or campaign pages.`
  )}
media_type: photograph
media_class: ${item.media_class}
source_url: ${yamlString(item.url)}
source_occurrence_count: ${item.occurrences.length}
source_contexts:
${contextsYaml.join("\n")}
apple_photos_match:
  state: ${item.apple_photos.match_state}
  candidate_count: ${item.apple_photos.match_count}
  network_upload: false
rights_state: permission-needed
consent_state: review-needed
public_display_status: hold
relations:
  - type: uses_source
    target: ${sourceId}
    href: ${sourceHref}
    context: Public campaign-site occurrence census and local-only Apple Photos filename matching.
projection:
  status: hold
  surfaces: []
---

# ${title}

> Generated from the governed campaign-site media census. Do not edit this
> record by hand; update the source data and regenerate it.

## Public occurrence

The image appeared on ${item.occurrences.length} recovered public campaign-page
occurrence(s). The page context can establish how the campaign used the image;
it does not establish creator, every person shown, event identity, or Jamie's
individual authorship.

| Page | Nearby heading | Recovered alt text |
| --- | --- | --- |
${contextRows.join("\n")}
${overflowNote}
## Apple Photos return

The local-only comparison reported **${item.apple_photos.match_state}** with
**${item.apple_photos.match_count}** candidate asset(s). No pixels, private
identifiers, People associations, coordinates, or archive paths entered Git.
A filename or Flickr-ID match is a retrieval lead, not final identity proof.

## Publication boundary

The archive owner authorized research and portfolio consideration of
campaign-site imagery. Public hosting or archive custody does not establish
creator rights. This record remains metadata-only and held because the exact
derivative, creator permission, credit, represented-person dignity, consent,
crop, caption, destination, and production approval have not all been bound to
one public occurrence.
`;
}

export function compileCampaignPhotoRecords() {
  if (!existsSync(mediaDataPath) || !existsSync(photoDataPath)) {
    throw new Error("Campaign media data files are missing.");
  }
  const media = loadJson(mediaDataPath);
  const photos = loadJson(photoDataPath);
  if (media.schema_version !== 1 || photos.schema_version !== 1) {
    throw new Error("Unsupported campaign media schema version.");
  }
  if (photos.private_identifiers_included !== false || photos.network_upload !== false) {
    throw new Error("Public photo index must exclude private identifiers and network uploads.");
  }
  const publicUrls = new Set(
    media.captures.flatMap((capture) =>
      capture.pages.flatMap((page) => page.images.map((image) => image.url))
    )
  );
  const ids = new Set();
  const records = new Map();
  for (const item of photos.items) {
    if (ids.has(item.id)) throw new Error(`Duplicate photo id: ${item.id}`);
    ids.add(item.id);
    if (!publicUrls.has(item.url)) {
      throw new Error(`Photo URL is absent from occurrence census: ${item.url}`);
    }
    if (!["photograph", "photograph-candidate", "portrait"].includes(item.media_class)) {
      throw new Error(`Unsupported photo class: ${item.media_class}`);
    }
    if (!Array.isArray(item.occurrences) || item.occurrences.length === 0) {
      throw new Error(`Photo has no public occurrence: ${item.id}`);
    }
    const slug = recordSlug(item);
    records.set(`${slug}.md`, recordFor(item));
  }
  return {
    records,
    summary: {
      pages: media.captures.reduce((sum, capture) => sum + capture.pages.length, 0),
      occurrences: media.captures.reduce(
        (sum, capture) =>
          sum +
          capture.pages.reduce((pageSum, page) => pageSum + page.images.length, 0),
        0
      ),
      uniqueImages: publicUrls.size,
      photoEntries: photos.items.length,
      matchedEntries: photos.items.filter(
        (item) => item.apple_photos.match_count > 0
      ).length,
      matchedLocalCandidates: photos.items.reduce(
        (sum, item) => sum + item.apple_photos.match_count,
        0
      ),
      mediaSha256: sha256(readFileSync(mediaDataPath)),
      photoSha256: sha256(readFileSync(photoDataPath))
    }
  };
}

export function writeCampaignPhotoRecords() {
  const { records, summary } = compileCampaignPhotoRecords();
  mkdirSync(outputRoot, { recursive: true });
  for (const name of readdirSync(outputRoot)) {
    if (name.endsWith(".md") && !records.has(name)) {
      rmSync(path.join(outputRoot, name));
    }
  }
  for (const [name, content] of records) {
    writeFileSync(path.join(outputRoot, name), content);
  }
  return summary;
}

export function checkCampaignPhotoRecords() {
  const { records, summary } = compileCampaignPhotoRecords();
  const issues = [];
  for (const [name, content] of records) {
    const filePath = path.join(outputRoot, name);
    if (!existsSync(filePath) || readFileSync(filePath, "utf8") !== content) {
      issues.push(name);
    }
  }
  const unexpected = existsSync(outputRoot)
    ? readdirSync(outputRoot).filter(
        (name) => name.endsWith(".md") && !records.has(name)
      )
    : [];
  return { pass: issues.length === 0 && unexpected.length === 0, issues, unexpected, summary };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const mode = process.argv[2] ?? "check";
  if (mode === "write") {
    console.log(JSON.stringify(writeCampaignPhotoRecords(), null, 2));
  } else if (mode === "check") {
    const result = checkCampaignPhotoRecords();
    if (!result.pass) {
      console.error(JSON.stringify(result, null, 2));
      process.exitCode = 1;
    } else {
      console.log(JSON.stringify(result.summary, null, 2));
    }
  } else {
    throw new Error(`Unknown mode: ${mode}`);
  }
}

export const campaignPhotoSource = { id: sourceId, path: sourcePath };
