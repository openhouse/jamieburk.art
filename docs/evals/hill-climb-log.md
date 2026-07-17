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
