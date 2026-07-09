# Release Checklist

## Build Checks

- [ ] `npm ci`
- [ ] `npm run typecheck`
- [ ] `npm run lint`
- [ ] `npm run build`
- [ ] `npm run check:public-safety`
- [ ] `npm run check:routes`
- [ ] `npm run check:production`

## Content Checks

- [ ] Contact page has real public email.
- [ ] LinkedIn and GitHub links work.
- [ ] Resume PDF is final, selectable, linked, and not placeholder.
- [ ] No visible TODOs.
- [ ] No placeholder resume language.
- [ ] Homepage hero uses "I turn loosely defined work into usable systems."
- [ ] Technical Operations page includes role-fit mapping.
- [ ] Source-Backed Team Memory page includes the AI drafts / humans review sentence.
- [ ] Proof metrics are strong but not overclaiming.
- [ ] Case-study pages use representative artifact language.
- [ ] Known / Open / Protected explanation appears where appropriate.

## Accessibility Checks

- [ ] Mobile 320px, 375px, 768px, desktop.
- [ ] Keyboard navigation.
- [ ] Skip link.
- [ ] Visible focus states.
- [ ] One H1 per page.
- [ ] Sensible heading order.
- [ ] Links make sense out of context.
- [ ] Reduced motion respected.
- [ ] Broadway blue contrast acceptable.
- [ ] Resume PDF text is selectable.

## Staging Checks

- [ ] `https://staging.jamieburk.art` serves reviewed commit.
- [ ] Staging `robots.txt` disallows crawling.
- [ ] Staging pages noindex.
- [ ] Staging sitemap, if present, uses staging URLs only.
- [ ] Staging `/api/health` reports staging and noindex.

## Production Checks

- [ ] Same reviewed commit deployed to production.
- [ ] `https://jamieburk.art` returns 200.
- [ ] `www.jamieburk.art` redirects to `jamieburk.art` if configured.
- [ ] Production `robots.txt` allows approved public pages.
- [ ] Production sitemap uses production URLs.
- [ ] Canonical URLs use `https://jamieburk.art`.
- [ ] OpenGraph URLs use `https://jamieburk.art`.
- [ ] Contact links work.
- [ ] Resume PDF works.
- [ ] No noindex headers on approved public pages.
- [ ] `/api/health` noindex or minimal public output only.
