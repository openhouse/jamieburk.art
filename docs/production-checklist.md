# Production Checklist

Use this checklist before promoting `staging.jamieburk.art` to production.

## Content And Public Safety

- [x] Resume placeholder replaced with supplied current resume PDF.
- [x] Contact info approved or public-safe: email, location, GitHub, LinkedIn.
- [x] Metrics approved or softened with contribution language.
- [x] Visible TODOs removed from public pages.
- [ ] Screenshots/artifacts approved by Jamie.
- [ ] Collaborator names, photos, quotes, and artifacts approved where shown.
- [x] Privacy/public-safety review completed for this pass.

## Technical Verification

- [ ] `npm ci` passes under Node 26.
- [ ] `npm run typecheck` passes under Node 26.
- [ ] `npm run lint` passes under Node 26.
- [ ] `npm run build` passes under Node 26.
- [ ] `npm run check` passes under Node 26.
- [ ] Docker build passes.
- [ ] Docker run serves the site.
- [ ] `/api/health` returns expected environment and robots state.
- [ ] `/robots.txt` verified.
- [ ] `/sitemap.xml` verified.

## Accessibility And Usability

- [ ] One H1 per page checked.
- [ ] Logical heading order checked.
- [ ] Skip link works.
- [ ] Keyboard navigation works.
- [ ] Visible focus states checked.
- [ ] Broadway blue links have sufficient contrast.
- [ ] Proof strip has sufficient contrast.
- [ ] Mobile layout works at 320px.
- [ ] Sticky sidebars do not break mobile.
- [ ] Links do not rely on color alone.
- [ ] Reduced-motion support exists.

## Deployment

- [ ] Staging env values checked.
- [ ] Production env values checked.
- [ ] Build-time Docker args checked for metadata, sitemap, and robots values.
- [ ] Production DNS, TLS, and Dokku app config confirmed.
- [ ] `www.jamieburk.art` redirects to `https://jamieburk.art`.
- [ ] Production indexing enabled only after Jamie approves content.
