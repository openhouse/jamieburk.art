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
9. For KC Town Hall, are Jamie's presenter role, the four-member CCED Board
   recommendation, the Council's September 26, 2019 adoption and appropriation,
   and the later unused-funds record represented as separate sourced stages?
10. Does the KC Town Hall composition say $490,539 appropriation directly while
    refusing unsupported claims of Council unanimity, executed agreement,
    disbursement, receipt, expenditure, completion, or individual withdrawal
    causality?
11. Does Jamie's first-party recollection of transitioning project stewardship
    to a mission-aligned organization remain a deferred research lead pending
    public-safe corroboration, while the later municipal disposition remains
    mature but editorially unused?
12. Does the iCloud Teams archival-production pass preserve all three required
    archive scopes, opaque private-source locators, collective credit, and the
    difference between authored plans or proposals and completed outcomes?
13. Do complete current X populations reconcile to displayed profile counts
    while partial CallNYC and NYC Artist Coalition retrievals remain explicit
    gaps rather than population-wide findings?
14. Does the @urbanhermit record function as a source-discovery index rather
    than independent proof, a total historical record, or an impact metric?
15. Does Council-member amplification remain bounded to recovered quote-posts
    and direct shares, without becoming formal endorsement, adoption, offline
    use, constituent outcome, or a complete engagement roster?
16. Do Google Drive records preserve opaque private locators, blocked or held
    audiovisual material, participant and access privacy, and the difference
    between stored asset counts and event counts?

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
