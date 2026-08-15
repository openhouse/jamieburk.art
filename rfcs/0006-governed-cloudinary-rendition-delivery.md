---
rfc: 6
title: Governed Cloudinary Rendition Delivery
stage: implementing
start_date: 2026-08-15
authors:
  - Jamie Burkart
  - Codex, AI-assisted draft
champion: Jamie Burkart
decision_owner: Jamie Burkart
review_areas:
  - public-portfolio
  - privacy-governance
  - deployment
  - accessibility
  - developer-experience
implementation: https://github.com/openhouse/jamieburk.art/pull/281
supersedes: []
superseded_by: null
---

# Governed Cloudinary Rendition Delivery

> **Authorization boundary**
>
> Jamie Burkart authorized the bounded staging implementation on August 15,
> 2026. This records an implementation decision for the named canary; it does
> not approve production delivery, indexing, new assets, or a broader archive
> migration.

## Summary

Use Cloudinary as a rendition CDN for a small manifest of already-public,
approved portfolio derivatives. Keep the repository and Knowledge Wiki as the
source of truth. Bind each remote asset to an exact checked-in SHA-256, semantic
public ID, immutable upload version, media class, publication boundary, and
release state. Enable the canary on staging, keep production local by default,
and retain an explicit local-delivery rollback.

## Motivation

The portfolio's photographic evidence is central to its credibility, but the
application server currently proxies responsive renditions and caches them for
only four hours. Direct CDN delivery can remove that hop and lengthen immutable
browser caching. A migration must not turn access into publication permission,
make Cloudinary an ungoverned archive, weaken photo credit, expose credentials,
or accept a large first-view byte regression.

## Goals

- Deliver bounded responsive renditions directly from Cloudinary on staging.
- Preserve exact-byte identity between approved repository derivatives and
  Cloudinary originals.
- Keep alt text, captions, credits, intrinsic dimensions, and layout behavior.
- Use semantic, immutable URLs and a bounded width allowlist.
- Measure transfer size and visual quality before retaining a transform policy.
- Make rollback to the existing local optimizer one configuration value.

## Non-goals

- Do not move Apple Photos originals, private archives, or a full DAM into
  Cloudinary.
- Do not move resumes, Open Graph render inputs or output, fonts, icons,
  JavaScript, or CSS.
- Do not add client-side upload, unsigned presets, auto-upload URLs, or a public
  upload widget.
- Do not approve production or indexing.
- Do not remove checked-in public derivatives during the canary.

## Terminology

**Governed derivative**
: An exact public-safe file whose rights, credit, occurrence, and release state
  are represented in the repository's photo and knowledge records.

**Rendition CDN**
: A delivery surface that resizes and encodes an approved derivative. It is not
  the archive, evidentiary source, or permission authority.

**Immutable binding**
: The tuple of local path, SHA-256, Cloudinary cloud name, public ID, and upload
  version used to prevent silent asset substitution.

## Detailed design

The staging canary contains five governed photographs and one public-site
screenshot. `apps/www/src/data/cloudinary-assets.mjs` records their exact local
checksums, remote identities, media class, binding method, verification date,
release state, and public-use boundary. The remote original of every binding is
downloaded once and compared to the local checksum before the binding passes.

`GovernedImage` preserves the existing `next/image` interface. On staging it
uses the Cloudinary loader only when the source appears in the manifest. An
unbound image fails closed to the local optimizer. Production defaults local.
`NEXT_PUBLIC_MEDIA_DELIVERY=local` is the explicit rollback; an explicit
`cloudinary` value may enable a separately approved environment.

Responsive widths are limited to 384, 640, 750, 828, 1080, 1200, 1600, and
1920 pixels with `c_limit`, so renditions do not upscale. The measured staging
policy uses WebP quality 30 for photographs and WebP quality 35 for screenshots.
The screenshot policy retains slightly more interface-text detail. The first
`f_auto/q_auto:best` candidate was rejected because its representative hero
rendition was 3.56 times the current byte baseline. The retained candidates are
within 15 percent of matched-width baselines and gain direct CDN delivery plus
a 30-day immutable browser cache.

The stable social-preview renderer remains local. Public IDs are semantic, but
an image sitemap and production indexing remain later decisions.

Cloudinary's current optimization and transformation references are:

- <https://cloudinary.com/documentation/image_optimization>
- <https://cloudinary.com/documentation/transformation_reference>

## Security and privacy

No Cloudinary API key, secret, signed preset, credential, protected source URL,
private locator, or private metadata enters the public repository. The public
delivery host, cloud name, version, and public ID are necessarily encoded so the
browser can request an approved rendition; none is a credential. Uploading an
approved derivative is a separate publication event and requires Jamie's
authorization even when the same bytes already exist in public Git or on
staging.

The manifest allowlist is the only path into CDN rendering. The application has
no upload endpoint. Remote similarity, matching filenames, dimensions, or
visible content cannot replace checksum verification.

## Publication workflow

1. Confirm the local derivative is public-safe and approved for its exact
   portfolio occurrence.
2. Obtain Jamie's separate approval for Cloudinary public delivery.
3. Upload or reuse a remote original without overwriting a different asset.
4. Download the immutable remote original and verify its SHA-256.
5. Add the binding with production and indexing still open.
6. Run deterministic delivery tests, a staging build, visual inspection,
   matched-width transfer comparison, public-safety checks, and live staging
   verification.
7. Jamie separately decides whether to approve production and indexing.

## Rollout plan

Phase one is the six-asset staging canary in pull request 281. Observe live
desktop and mobile crops, transfer sizes, cache headers, console errors, broken
images, and accessibility. Roll back with local delivery if a hard gate fails.

Phase two, only after an explicit decision, may expand the manifest to other
approved screenshots. Production remains local until Jamie authorizes the
exact candidate. Local files remain in Git through the observation period.

## Decision gates

- **Staging canary:** authorized by Jamie on August 15, 2026.
- **Exact remote binding:** deterministic SHA-256 check must pass for every
  asset.
- **Transform retention:** representative byte ratio must remain at or below
  1.15 and visual inspection must pass.
- **Production:** open; Jamie approval required.
- **Indexing and image sitemap:** open; Jamie approval required.
- **Archive expansion or local-file removal:** new decision required.

## Drawbacks

The system adds an external dependency, a second public copy, a small client
wrapper, transform accounting, and a manifest that must be maintained. The
shared Cloudinary hostname is less brand-specific than a custom CNAME. Fixed
WebP policies are deliberately conservative and may need revisiting as browser
support, source media, or Cloudinary behavior changes.

## Alternatives

- **Keep the Next.js optimizer only.** Simpler and already byte-efficient, but
  retains the app-server proxy hop and shorter cache.
- **Use `next-cloudinary`.** Richer helpers, but adds package and client
  complexity that the bounded canary does not need.
- **Use Cloudinary fetch/auto-upload.** Rejected because it weakens the explicit
  manifest and publication gate.
- **Move every static asset.** Rejected because PDFs, social render inputs,
  fonts, scripts, and styles have different stability, SEO, and governance
  needs.
- **Use `f_auto/q_auto:best`.** Recommended in general documentation but
  rejected for this corpus after measured byte regressions.

## Unresolved questions

- Whether a custom delivery hostname is worth a paid plan after production
  observation.
- Whether a future `<picture>` implementation should negotiate AVIF and WebP
  while preserving the current governance and byte budgets.
- Whether production should add an image sitemap once its exact asset set is
  approved for indexing.
- How long the local fallback files should remain after a successful production
  observation period.
