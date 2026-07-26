# Living Photographic Knowledge

> **Artists choose. Archival production supports. The Knowledge Wiki remembers.
> Rights govern. The portfolio composes. Jamie decides what becomes public.**

This directory teaches the governed path from Jamie Burkart's private photo
archive to one exact public occurrence. It implements the first canary from
[RFC 0003](../../rfcs/0003-living-photographic-knowledge-loop.md) without
turning the portfolio into an archive browser.

## Three questions

- **Metadata:** Why might this photograph be relevant?
- **Visible evidence:** What can an editor actually see?
- **Provenance:** What can we responsibly claim?

No one answer substitutes for the others.

## Five records

1. **Asset:** the public-safe semantic record for a consequential photograph.
2. **Public derivative:** one exact, stripped file permitted for public Git.
3. **Proposal and decision:** the artist-led reading and the human editorial
   choice remain separate.
4. **Public occurrence:** one derivative, crop, caption, credit, route, and
   release state.
5. **Portfolio edition:** a dated set of occurrences, not the archive's final
   meaning.

## Start here

Read [the East River canary](./east-river-canary.md). A new teammate should then
be able to answer:

- where the private original remains;
- why private source identity is absent from Git;
- which public derivative is governed;
- who made the photograph and how that attribution is supported;
- what permission covers and does not cover;
- which placement and edition use the photograph;
- which human gates remain open;
- how to correct, withdraw, or revoke the occurrence.

## Working documents

- [Curatorial studio](./curatorial-studio.md)
- [Rights and permission](./rights-and-permission.md)
- [Source binding](./source-binding.md)
- [Portfolio editions](./portfolio-editions.md)
- [Recollection and correction](./recollection-and-correction.md)
- [Contributor pull-request template](./contributor-pull-request-template.md)

## Commands

```bash
npm run photos:check
npm run photos:test
npm run photos:eval
npm run photos:report
```

The first three are non-mutating. `photos:report` regenerates public-safe usage,
impact, placement, permission, and health reports. Passing automation is
verification evidence only. It cannot grant rights, consent, dignity clearance,
production approval, indexing approval, or Jamie's exact-use approval.
