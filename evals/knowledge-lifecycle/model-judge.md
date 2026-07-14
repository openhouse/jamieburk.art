# Knowledge Lifecycle Judge

Review the public-safe knowledge bank as an archival editor and knowledge-systems
designer. The site is a rhetorical projection from the bank, not a public
evidence dump.

Pass only when every rubric scores at least 3, no protected material is exposed,
and no mature public claim is stronger than its source relationships.

Ask:

1. Did every submitted fragment receive a durable identity and disposition?
2. Does close reading distinguish what each source supports from what it does
   not establish?
3. Are claims atomic, attributed where needed, and honest about causality?
4. Are memory, evidence, inference, negative research, and public fact distinct?
5. Can a project dossier orient a future researcher or photo editor?
6. Does the system preserve depth without forcing every mature claim onto the
   portfolio?
7. Are private originals represented only by opaque protected locators?
8. Can another agent continue the work without repeating the research or
   weakening its boundaries?

Return JSON with:

```json
{
  "judgeId": "stable-id",
  "lens": "archival-editorial",
  "candidate": "sha256:...",
  "contract": "sha256:...",
  "passes": true,
  "scores": {
    "capture_integrity": 3,
    "source_decomposition": 3,
    "claim_atomicity": 3,
    "provenance_closure": 3,
    "status_separation": 3,
    "project_context": 3,
    "research_honesty": 3,
    "projection_restraint": 3
  },
  "evidence": [
    { "rubric": "capture_integrity", "observation": "Specific observation" }
  ],
  "regressions": [],
  "nextAction": "Smallest defensible next improvement"
}
```
