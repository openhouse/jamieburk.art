# Launch Checklist

## Staging

- [ ] Deploy to `staging.jamieburk.art`.
- [ ] Confirm staging noindex headers.
- [ ] Confirm staging robots disallows all.
- [ ] Confirm staging sitemap uses staging URLs only.
- [ ] Confirm canonical URLs use staging URLs only.
- [ ] Confirm `/api/health`.

## Content

- [ ] Proofs bank reviewed for public-safe claim language.
- [ ] Resume page links to approved PDF.
- [ ] Resume PDF has selectable text.
- [ ] Resume PDF contains no home address.
- [ ] Resume PDF contains no phone number unless Jamie explicitly approves.
- [ ] Contact links use approved public values or are omitted.
- [ ] No visible TODO or placeholder language.
- [ ] Metrics, credits, screenshots, and artifacts have Jamie approval or cautious framing.

## Public Safety

- [ ] Public-safety scan has no blockers.
- [ ] Private-material scan has no blockers.
- [ ] Sensitive pages preserve Known / Open / Protected.
- [ ] Public-safety notes appear before artifacts.
- [ ] No private/proprietary font files.

## Accessibility

- [ ] Mobile layout reviewed.
- [ ] Keyboard navigation reviewed.
- [ ] Visible focus states reviewed.
- [ ] Status/visibility badges do not rely on color alone.
- [ ] PDF accessibility considered; HTML resume fallback present.

## Production

- [ ] Jamie approves the reviewed staging commit.
- [ ] Production env set.
- [ ] Production canonical URLs use `https://jamieburk.art`.
- [ ] Production sitemap uses `https://jamieburk.art`.
- [ ] Production indexing opt-in confirmed.
- [ ] TLS enabled.
- [ ] `www` behavior intentional.
- [ ] Soft/unannounced launch complete.
- [ ] Optional 24-48 hour noindex smoke-test window complete if used.

## Rollback

Keep the previous approved SHA/release.

If production has an issue:

1. Set robots policy to noindex immediately if privacy/indexing is involved.
2. Redeploy the previous approved SHA or roll back the Dokku release.
3. Verify `/`, `/robots.txt`, `/sitemap.xml`, `/api/health`, `/resume`, and `/contact`.
4. Record the issue and fix in launch notes.
