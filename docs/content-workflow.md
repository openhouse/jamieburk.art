# Content Workflow

Work items are defined in `apps/www/src/data/work.ts`. Each item supplies the public metadata used by the Work index, Work cards, case-study shell, sitemap, and status notes.

MDX case studies live in `apps/www/src/content/work`. The MDX filename should match the `slug` in `work.ts`, for example:

```text
apps/www/src/content/work/fair-rent-nyc.mdx
slug: fair-rent-nyc
```

To add a project:

1. Add a complete item to `workItemsInput` in `apps/www/src/data/work.ts`.
2. Create the matching MDX case-study file in `apps/www/src/content/work`.
3. Keep the `What was unclear` and `What became usable` fields specific and public-safe.
4. Choose a visibility value: `public`, `public-safe`, `redacted`, `summary-only`, or `private`.
5. Add artifacts only when the artifact itself is approved or represented safely.
6. Run `npm run public-safety`, then `npm run typecheck`, `npm run lint`, and `npm run build`.

Use `summary-only` or `private` for material that should not expose details. If something needs review, mark it with `TODO: Jamie approval required.` and keep screenshots, names, and documents out until approved.

To update the resume PDF, replace:

```text
apps/www/public/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf
```

Then verify the Resume page and the Download resume buttons.
