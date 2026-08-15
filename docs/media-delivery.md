# Governed media delivery

Cloudinary accelerates approved public raster derivatives. The repository
remains authoritative; Cloudinary does not replace the Knowledge Wiki, Jamie's
archive, or human publication authority.

## Priorities, in order

1. Preserve truth, consent, credit, and the recorded public-use boundary.
2. Keep the reviewed local derivative and its SHA-256 digest authoritative.
3. Deliver responsive, immutable Cloudinary URLs with `c_limit`, `f_auto`, and
   content-sensitive `q_auto` settings.
4. Keep first-party fallbacks so a provider outage or account change cannot
   erase the portfolio.
5. Keep image-search discovery synchronized with the visible page context.
6. Never send a private original, protected locator, PDF, font, credential, or
   application bundle to the media CDN.

## Mechanism

`apps/www/src/data/media-delivery.json` binds each approved source derivative to
its checksum, public context, stable Cloudinary public ID, and immutable upload
version. `MediaImage` uses that binding only when
`NEXT_PUBLIC_MEDIA_DELIVERY=cloudinary`; otherwise the exact local source is
served directly. The global Next.js loader creates responsive CDN URLs without
the Dokku process performing runtime image work.

Run a signed, deterministic synchronization from the repository root:

```sh
CLOUDINARY_CREDENTIALS_FILE=/path/to/mode-600-credentials.json \
  node scripts/cloudinary/sync-public-media.mjs
```

The credential file is local-only and must never enter Git. The upload script
uses explicit public IDs, overwrites only those IDs, records the returned
Cloudinary version, and never uses an unsigned upload preset or browser widget.

Run the blocking contract before release:

```sh
npm run evals:media-delivery
npm run test:media-delivery
```

The image sitemap is additive; the canonical HTML page remains the primary SEO
surface. Open Graph generation, resume PDFs, fonts, CSS, JavaScript, icons, and
raw Apple Photos originals remain first-party and out of this pipeline.

Staging remains `noindex`. Production publication and indexing still require
Jamie's exact-candidate approval; a passing automated score never grants it.
