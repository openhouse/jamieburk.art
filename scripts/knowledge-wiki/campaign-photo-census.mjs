#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import {
  existsSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../.."
);
const outputPath = path.join(
  repoRoot,
  "docs/knowledge-bank/data/campaign-site-image-census-2026-07.json"
);

const imageExtensions = new Set([
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".webp"
]);
const textExtensions = new Set([
  ".css",
  ".hbs",
  ".html",
  ".js",
  ".json",
  ".md",
  ".scss",
  ".ts"
]);
const skippedDirectories = new Set([
  ".git",
  "bower_components",
  "coverage",
  "dist",
  "node_modules",
  "-node_modules",
  "tmp",
  "vendor"
]);

export const sites = [
  {
    id: "nyc-artist-coalition",
    title: "NYC Artist Coalition",
    liveUrl: "https://nycartc.com/",
    localRoot: "com.nycartc/artghost",
    publicSubtree: null,
    sitemapUrls: [
      "https://nycartc.com/sitemap-pages.xml",
      "https://nycartc.com/sitemap-posts.xml"
    ],
    historicalNote:
      "Current Ghost publication retains posts and page-level image locators from 2017 onward."
  },
  {
    id: "fair-rent-nyc-2019",
    title: "Fair Rent NYC 2019",
    liveUrl: "https://fairrentnyc.nycartc.com/",
    localRoot: "com.fairrentnyc/fairrentnyc",
    publicSubtree: "public",
    sitemapUrls: [],
    structuredPhotoFile: "public/sheets.json",
    historicalNote:
      "Retained Ember source is the primary 2019 snapshot; Wayback is supplementary rather than the only surviving source."
  },
  {
    id: "fair-rent-nyc-current",
    title: "Fair Rent NYC current",
    liveUrl: "https://fairrentnyc.nycartc.com/",
    localRoot: null,
    publicSubtree: null,
    sitemapUrls: [
      "https://fairrentnyc.nycartc.com/sitemap-pages.xml",
      "https://fairrentnyc.nycartc.com/sitemap-posts.xml"
    ],
    historicalNote:
      "Current Ghost publication is inventoried separately from the retained 2019 Ember application."
  },
  {
    id: "talks-not-raids",
    title: "Talks Not Raids",
    liveUrl: "https://talksnotraids.com/",
    localRoot: "com.talksnotraids/talks-not-raids",
    publicSubtree: "public",
    sitemapUrls: [],
    historicalNote:
      "Retained Ember source and the live single-page campaign are both available."
  },
  {
    id: "let-nyc-dance",
    title: "Let NYC Dance",
    liveUrl: "https://letnycdance.nycartc.com/",
    localRoot: "com.letnycdance/letnycdance",
    publicSubtree: "public",
    sitemapUrls: [],
    historicalNote:
      "Retained Ember source and the live single-page campaign are both available."
  },
  {
    id: "save-nyc-spaces",
    title: "Save NYC Spaces",
    liveUrl: "https://savenycspaces.nycartc.com/",
    localRoot: "com.savenycspaces/advocacy-platform",
    publicSubtree: "public",
    sitemapUrls: [],
    historicalNote:
      "Retained Ember source and the live single-page campaign are both available."
  }
];

function walkFiles(root) {
  const files = [];
  if (!root || !existsSync(root)) return files;

  const visit = (directory) => {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
      const absolute = path.join(directory, entry.name);
      if (entry.isDirectory()) visit(absolute);
      else if (entry.isFile()) files.push(absolute);
    }
  };
  visit(root);
  return files;
}

function normalizeLocator(value) {
  return value
    .replace(/^url\(["']?/, "")
    .replace(/["']?\)$/, "")
    .replace(/^http:\/\//, "https://")
    .replace(/\/content\/images\/size\/w\d+\//, "/content/images/");
}

function stableId(siteId, locator) {
  const digest = createHash("sha256").update(locator).digest("hex").slice(0, 14);
  return `campaign-image.${siteId}.${digest}`;
}

function derivativeFamily(locator) {
  const extension = path.extname(locator);
  return path
    .basename(locator, extension)
    .toLowerCase()
    .replace(/[a-f0-9]{20,}$/i, "")
    .replace(/(?:--?web|--?thumb|--?thumbnail|--?uncompressed)$/i, "")
    .replace(/(?:--?crop(?:-\d+)?|--?\d+x\d+|--?\d{3,4})$/i, "")
    .replace(/[-_.]+$/g, "");
}

export function classifyCampaignImage(locator) {
  const value = locator.toLowerCase();
  const extension = path.extname(value);
  const rasterGraphic = extension === ".png" || extension === ".gif";

  if (
    /(?:^|\/)(?:favicon|apple-icon|android-icon|ms-icon)/.test(value) ||
    /(?:^|[-_/])icon(?:[-_.\/]|$)/.test(value)
  ) {
    return { kind: "interface-asset", photoLike: false };
  }
  if (value.includes("press/logos/") || value.includes("logos/press/")) {
    return { kind: "publisher-mark", photoLike: false };
  }
  if (value.includes("/logos/") || /(?:^|[-_/])logo(?:[-_.\/]|$)/.test(value)) {
    return { kind: "organization-mark", photoLike: false };
  }
  if (value.includes("city-council/images/headshots/")) {
    return { kind: "public-official-reference-portrait", photoLike: true };
  }
  if (value.includes("council-districts/thumbnails/")) {
    return { kind: "map-reference", photoLike: false };
  }
  if (value.includes("press/photos/")) {
    return { kind: "press-reference-reproduction", photoLike: true };
  }
  if (value.includes("/testimony/") || value.includes("/testimonials/")) {
    return { kind: "campaign-testimony-portrait", photoLike: true };
  }
  if (
    value.includes("/photos/") ||
    /(?:meeting|town-hall|group-photo|steps|storefront|vacant|rally|espinal|cabaretlaw|signing-group|joe-conzo|flickr|_[a-f0-9]{8,}_o\.)/.test(
      value
    )
  ) {
    return { kind: "campaign-photograph", photoLike: true };
  }
  if (
    /(?:map|diagram|chart|collage|social-share|4x6|call-script|report|license|detail)/.test(
      value
    )
  ) {
    return { kind: "campaign-graphic-or-document", photoLike: false };
  }
  if (rasterGraphic) {
    return { kind: "unresolved-raster", photoLike: false };
  }
  return { kind: "candidate-photograph", photoLike: true };
}

function textCorpus(root, publicRoot) {
  if (!root) return [];
  return walkFiles(root)
    .filter((file) => {
      const extension = path.extname(file).toLowerCase();
      return (
        textExtensions.has(extension) &&
        (!publicRoot || !file.startsWith(publicRoot) || extension !== ".json")
      );
    })
    .map((file) => ({
      path: path.relative(root, file).split(path.sep).join("/"),
      text: readFileSync(file, "utf8")
    }));
}

function sourceReferences(corpus, publicPath) {
  const basename = path.basename(publicPath);
  return corpus
    .filter((entry) => entry.text.includes(publicPath) || entry.text.includes(basename))
    .map((entry) => entry.path)
    .sort();
}

function localEntries(site, sitesRoot) {
  if (!site.localRoot || !site.publicSubtree) return [];
  const root = path.join(sitesRoot, site.localRoot);
  const publicRoot = path.join(root, site.publicSubtree);
  const corpus = textCorpus(root, publicRoot);

  return walkFiles(publicRoot)
    .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
    .map((file) => {
      const publicPath = path.relative(publicRoot, file).split(path.sep).join("/");
      const classification = classifyCampaignImage(publicPath);
      return {
        id: stableId(site.id, `local:${publicPath}`),
        siteId: site.id,
        sourceClass: "retained-local-public-tree",
        locator: publicPath,
        kind: classification.kind,
        photoLike: classification.photoLike,
        derivativeFamily: derivativeFamily(publicPath),
        sourceReferences: sourceReferences(corpus, publicPath),
        publicationHistory: "published-or-shipped-with-campaign-source",
        portfolioReuse: "human-review-required",
        applePhotosBinding: "not-yet-reconciled"
      };
    })
    .sort((a, b) => a.locator.localeCompare(b.locator, "en"));
}

function structuredFlickrEntries(site, sitesRoot) {
  if (!site.structuredPhotoFile || !site.localRoot) return [];
  const sourcePath = path.join(
    sitesRoot,
    site.localRoot,
    site.structuredPhotoFile
  );
  if (!existsSync(sourcePath)) return [];
  const data = JSON.parse(readFileSync(sourcePath, "utf8"));
  const rows = Array.isArray(data.photos) ? data.photos : [];

  return rows
    .filter((row) => row.flickrId && row.photoUrl)
    .map((row) => ({
      id: `campaign-image.${site.id}.flickr-${row.flickrId}`,
      siteId: site.id,
      sourceClass: "structured-public-flickr-corpus",
      locator: normalizeLocator(row.photoUrl),
      kind: "campaign-photograph",
      photoLike: true,
      derivativeFamily: `flickr-${row.flickrId}`,
      context: {
        borough: row.borough || null,
        neighborhood: row.neighborhood || null,
        publicQuote: row.quoteMd || row.quoteSm || row.quoteXs || null,
        flags: [
          row.activeSmallBusiness ? "active-small-business" : null,
          row.vacant ? "vacant" : null,
          row.personInPhoto ? "person-in-photo" : null,
          row.gif ? "gif-derivative-recorded" : null
        ].filter(Boolean)
      },
      sourceReferences: [site.structuredPhotoFile],
      publicationHistory: "published-in-2019-fair-rent-map-corpus",
      portfolioReuse: "human-review-required",
      applePhotosBinding: "not-yet-reconciled"
    }))
    .sort((a, b) => a.locator.localeCompare(b.locator, "en"));
}

function curl(url) {
  return execFileSync(
    "curl",
    ["-L", "--silent", "--show-error", "--max-time", "30", url],
    { encoding: "utf8", maxBuffer: 20 * 1024 * 1024 }
  );
}

function extractSitemapUrls(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) =>
    normalizeLocator(match[1].trim())
  );
}

function decodeBasicEntities(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'");
}

function extractHtmlMedia(html, pageUrl) {
  const media = [];
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    const tag = match[0];
    const src =
      tag.match(/\b(?:src|data-src)=["']([^"']+)["']/i)?.[1] || null;
    if (!src) continue;
    const alt = tag.match(/\balt=["']([^"']*)["']/i)?.[1] || "";
    media.push({ locator: src, alt: decodeBasicEntities(alt) });
  }
  for (const match of html.matchAll(
    /<meta\b[^>]*(?:property|name)=["'](?:og:image|twitter:image)["'][^>]*>/gi
  )) {
    const content = match[0].match(/\bcontent=["']([^"']+)["']/i)?.[1];
    if (content) media.push({ locator: content, alt: "" });
  }
  for (const match of html.matchAll(/url\((["']?)([^)"']+)\1\)/gi)) {
    media.push({ locator: match[2], alt: "" });
  }

  return media
    .map((item) => {
      try {
        return {
          locator: normalizeLocator(new URL(item.locator, pageUrl).href),
          alt: item.alt.trim()
        };
      } catch {
        return null;
      }
    })
    .filter(Boolean)
    .filter((item) =>
      imageExtensions.has(path.extname(new URL(item.locator).pathname).toLowerCase())
    );
}

function liveEntries(site) {
  const pages = new Set([site.liveUrl]);
  for (const sitemapUrl of site.sitemapUrls) {
    try {
      for (const url of extractSitemapUrls(curl(sitemapUrl))) pages.add(url);
    } catch {
      // The committed census records source gaps; refresh is not a silent proof
      // that a remote sitemap was complete.
    }
  }

  const records = new Map();
  for (const pageUrl of [...pages].sort()) {
    let html;
    try {
      html = curl(pageUrl);
    } catch {
      continue;
    }
    for (const item of extractHtmlMedia(html, pageUrl)) {
      const classification = classifyCampaignImage(item.locator);
      const key = normalizeLocator(item.locator);
      const existing = records.get(key) || {
        id: stableId(site.id, `live:${key}`),
        siteId: site.id,
        sourceClass: "live-public-page",
        locator: key,
        kind: classification.kind,
        photoLike: classification.photoLike,
        derivativeFamily: derivativeFamily(key),
        occurrences: [],
        altTexts: [],
        publicationHistory: "observed-on-live-public-campaign-site",
        portfolioReuse: "human-review-required",
        applePhotosBinding: "not-yet-reconciled"
      };
      if (!existing.occurrences.includes(pageUrl)) existing.occurrences.push(pageUrl);
      if (item.alt && !existing.altTexts.includes(item.alt)) {
        existing.altTexts.push(item.alt);
      }
      records.set(key, existing);
    }
  }
  return [...records.values()].sort((a, b) =>
    a.locator.localeCompare(b.locator, "en")
  );
}

function summarize(entries) {
  const byKind = {};
  const bySite = {};
  for (const entry of entries) {
    byKind[entry.kind] = (byKind[entry.kind] || 0) + 1;
    bySite[entry.siteId] = (bySite[entry.siteId] || 0) + 1;
  }
  return {
    totalImageEntries: entries.length,
    photoLikeEntries: entries.filter((entry) => entry.photoLike).length,
    unresolvedRasterEntries: entries.filter(
      (entry) => entry.kind === "unresolved-raster"
    ).length,
    byKind: Object.fromEntries(Object.entries(byKind).sort()),
    bySite: Object.fromEntries(Object.entries(bySite).sort())
  };
}

export function validateCensus(data) {
  const errors = [];
  if (data.version !== 1) errors.push("version must be 1");
  if (!Array.isArray(data.entries) || data.entries.length === 0) {
    errors.push("entries must be a non-empty array");
  }
  const ids = new Set();
  for (const entry of data.entries || []) {
    if (!entry.id || ids.has(entry.id)) errors.push(`duplicate or missing id: ${entry.id}`);
    ids.add(entry.id);
    if (!entry.siteId || !entry.locator || !entry.kind) {
      errors.push(`incomplete entry: ${entry.id}`);
    }
    if (/\/Users\/|\/Volumes\/|Mobile Documents|Library\/Photos/i.test(entry.locator)) {
      errors.push(`private locator leaked: ${entry.id}`);
    }
    if (entry.portfolioReuse !== "human-review-required") {
      errors.push(`portfolio reuse must stay human-gated: ${entry.id}`);
    }
  }
  if (
    data.summary?.totalImageEntries !== (data.entries || []).length ||
    data.summary?.photoLikeEntries !==
      (data.entries || []).filter((entry) => entry.photoLike).length
  ) {
    errors.push("summary counts do not match entries");
  }
  return errors;
}

function buildCensus({ sitesRoot, includeLive }) {
  const entries = [];
  for (const site of sites) {
    entries.push(...localEntries(site, sitesRoot));
    entries.push(...structuredFlickrEntries(site, sitesRoot));
    if (includeLive) entries.push(...liveEntries(site));
  }

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    scope: {
      statement:
        "All raster files in the declared retained public trees, all structured FairRentNYC Flickr photo rows, and all media locators reachable from the declared current live pages and Ghost sitemaps at refresh time.",
      completenessBoundary:
        "Complete against declared snapshots and successful live retrievals, not a claim of complete internet history or creator-rights clearance.",
      siteCount: sites.length,
      sites: sites.map(
        ({ localRoot, publicSubtree, structuredPhotoFile, ...publicSite }) => ({
          ...publicSite,
          localSource: localRoot
            ? `private-source-alias:${path.posix.join(localRoot, publicSubtree || "")}`
            : null,
          structuredPhotoSource: structuredPhotoFile || null
        })
      )
    },
    summary: summarize(entries),
    entries
  };
}

function parseArgs(argv) {
  return {
    refresh: argv.includes("--refresh"),
    includeLive: argv.includes("--live"),
    check: argv.length === 0 || argv.includes("--check")
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const options = parseArgs(process.argv.slice(2));
  if (options.refresh) {
    const sitesRoot = process.env.JAMIE_CAMPAIGN_SITES_ROOT;
    if (!sitesRoot) {
      throw new Error(
        "Set JAMIE_CAMPAIGN_SITES_ROOT to the private parent of the retained campaign repositories."
      );
    }
    const census = buildCensus({
      sitesRoot,
      includeLive: options.includeLive
    });
    const errors = validateCensus(census);
    if (errors.length > 0) throw new Error(errors.join("\n"));
    writeFileSync(outputPath, `${JSON.stringify(census, null, 2)}\n`);
    console.log(
      `Wrote ${census.entries.length} image entries (${census.summary.photoLikeEntries} photo-like).`
    );
  } else {
    const census = JSON.parse(readFileSync(outputPath, "utf8"));
    const errors = validateCensus(census);
    if (errors.length > 0) {
      console.error(errors.join("\n"));
      process.exitCode = 1;
    } else {
      console.log(
        `Campaign image census PASS: ${census.entries.length} entries, ${census.summary.photoLikeEntries} photo-like.`
      );
    }
  }
}
