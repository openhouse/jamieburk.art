# Composite hill-climb log

This log records material candidate and contract revisions. The machine-readable
run chain retains scores and judgments; this page explains why the system moved.

## Candidate 74df775e, contract 2.0.0

Two deterministic passes succeeded. Two independent blind holdouts rejected the
candidate. One scored 4.26 but failed the Sack governance floor at 2. The other
scored 4.02 and failed both evidence and Sack floors at 3.

The reviews found that candidate identity, criterion completeness, score floors,
required commands, reviewer independence, and external gates were insufficiently
validated. They also found Unicode bypasses in private-path and held-projection
checks, weak URL deduplication, intake collision risk, and no direct evidence path
from homepage proof points.

## Candidate 8e529b9c, contract 2.1.0

The hill climb added Git-backed candidate verification, governed judge prompts,
score recomputation, complete command requirements, output provenance, a chained
run history, Unicode-safe guards, canonical URL comparison, serialized intake,
and quiet project-evidence links.

The canonical runner denied its first preflight before executing the suite. A
generated TypeScript build-info file was inside the governed working tree but not
the committed tree. The contract was corrected rather than weakening the clean
candidate gate.

## Contract 2.2.0

Contract 2.1.0 is archived. Version 2.2.0 classifies
`apps/www/tsconfig.tsbuildinfo` as generated output and restarts the pass streak.
No 2.1.0 result is counted as a certifying pass.

## Candidate ee45f8f8, contract 2.2.0

Two canonical deterministic passes succeeded and were followed by two fresh
holdout rejections, each scoring 3.76. Both found the role clear and the emerging
work humane. They rejected unevenly inspectable homepage evidence and a composite
governor that did not retain command logs, could overrule a human hold, ignored
blocking findings, and did not carry the launch suite's full decision record.

The evaluation-engineering holdout also recovered encoded private-path and
whitespace duplicate-intake bypasses. The editorial holdout identified mutable
repository citations and a proof-coverage bridge that existed but was not
enforced by the public projection check.

## Contract 2.3.0

Contract 2.2.0 is archived. Version 2.3.0 binds command digests to retained logs,
adds a nonrecursive structural history check, preserves human refusals, rejects
accepted records with blockers, resets acceptance after a later rejection, and
requires the complete decision and authority record. Holdout prompts are
versioned. Public repository evidence is pinned to an immutable snapshot, proof
coverage is validated against the canonical bank, and homepage proof points now
favor inspectable support over protected metrics.
