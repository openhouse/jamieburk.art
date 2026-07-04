# Content Workflow

Work pages live in `apps/web/src/content/work` as MDX files with frontmatter.

Each work item should answer:

- What was unclear?
- What became usable?
- What did Jamie actually do?
- What artifact, tool, workflow, documentation, or handoff existed afterward?
- What is known, open, and protected?

## Required Frontmatter

Use the content model in `packages/content-model/src/work.ts`.

The safest defaults for sensitive work are:

```yaml
contentState: "Public-safe summary"
privacyLevel: "public-safe"
caveat: "Selected public-safe materials available on request."
```

Draft/private content should use:

```yaml
contentState: "Draft / private"
privacyLevel: "private"
```

Private content is filtered from production routes.

## Public-Safe Editing

Do not paste raw notes, private emails, legal-review material, raw transcripts, unapproved collaborator quotes, internal analytics, contact lists, or credentials into MDX files.

When a screenshot, quote, or artifact is not approved, use a recreated diagram or write `TODO: Jamie approval required`.
