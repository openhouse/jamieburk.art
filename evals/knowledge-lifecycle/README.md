# Knowledge lifecycle evals

This suite tests whether the knowledge bank can preserve a fragment, turn it
into researchable structure, mature it into a defensible claim, and leave
publication to a separate editorial decision.

The lifecycle is:

```text
private archive or public fragment
  -> public-safe intake record
  -> source and close reading
  -> atomic propositions
  -> claim candidate and evidence relationships
  -> corroboration, boundaries, and anti-claims
  -> public-ready claim
  -> explicit publish, defer, retire, or disallow decision
  -> optional website projection
```

The public repository is not the private archive. Raw email, transcripts,
photographs, private filenames, and local paths stay outside it. The intake
ledger preserves only enough public-safe metadata to keep the lead findable and
route future work.

Run:

```bash
npm run check:knowledge-lifecycle
npm run test:knowledge-lifecycle
npm run eval:knowledge-lifecycle
npm run eval:knowledge-lifecycle:gate
```

Use `agent-loop.md` for recursive improvement and `judge-prompt.md` for the
independent qualitative pass. Deterministic checks cannot approve claims,
collaborator credit, or publication rights.

`gate` requires a current independent assessment, verifies the cited files and
record identifiers, and enforces the score and critical floors. The assessment
must also identify the exact candidate commit, governed-content fingerprint,
and suite fingerprint returned by `npm run eval:candidate:snapshot`. A stale
assessment fails even when its scores were previously high. Human approval is
intentionally outside this agent-run tool.
