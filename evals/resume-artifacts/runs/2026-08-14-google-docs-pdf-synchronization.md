# Google Docs PDF synchronization run — 2026-08-14

## Scope

- Governed opportunity manifest: `evals/resume-hiring-readers/current.json`
- Opportunities evaluated: 4
- Tailored Markdown resumes evaluated: 4
- PDF siblings evaluated: 4
- Artifact manifests evaluated: 4

## Method

Each tailored Markdown resume was composed in a native copy of the
please-read-only resume style source example. The copies retained the source
document's page geometry and Palatino Linotype, Oswald, and Karla typography.
The style source was verified unchanged after the copy workflow. Protected
Google Workspace locators remain outside the repository.

Every PDF was exported from its native Google Doc, bound by SHA-256 to its
Markdown and opportunity source, checked for a tagged one- or two-page US
Letter structure and embedded fonts, rendered at 144 DPI, and visually
inspected page by page.

## Hill climb

The first National Campaigns export exposed literal Markdown emphasis markers
around a publication name. The affected range was replaced with clean text,
native italic formatting was applied, and the PDF was exported and visually
inspected again. The repaired candidate contains no visible Markdown residue.

## Result

PASS — all 8 blocking artifact criteria passed. All 9 mutation tests passed,
including deliberate failures for missing PDFs, changed opportunity briefs,
changed Markdown, changed PDF bytes, incomplete Google Docs lineage,
incomplete visual inspection, protected locators, and orphan resumes.

This automated pass does not replace Jamie's final application review or the
repository's separate human holdout gates.

The aggregate repository check reached and passed the new artifact evals and
their mutation suite, then stopped at the existing professor-lens holdout as
designed. The exact candidate fingerprint reported for fresh independent human
review is `b7905277ffdf00d7d2e728f25f02e940acf7b797d4dd382b20ad86883898d572`;
no holdout receipt was refreshed or simulated in this run.
