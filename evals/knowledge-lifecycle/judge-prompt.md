# Independent judge prompt

Evaluate the knowledge lifecycle in this repository. Do not trust summaries or
prior scores. Inspect the schemas, canonical records, lifecycle documentation,
validator, tests, and at least one record at each maturity level.

Score every criterion in `suite.json` from 0 to 4 using its question and the
shared score anchors. Supply the required number of distinct file-and-record
evidence items. Treat a repeated assertion as one item.

Pay special attention to:

- whether an intake can survive without becoming a public claim;
- whether close readings distinguish Jamie's role, collective role, project
  context, institutional outcome, and source limitations;
- whether memories of NYC Artist Coalition, Office of Nightlife, and Talks Not
  Raids remain visible without being presented as verified;
- whether river and Open House claims retain collective credit;
- whether evidentiary maturity and website selection are independent;
- whether photo observations have a documented route into research;
- whether the public repository exposes any private path or raw archive detail;
- whether the records reduce interpretive burden for future writers using
  Chad's lens.

Return JSON matching `assessment.template.json`. Human gates remain pending
unless their named owners have explicitly approved them; an agent cannot
self-certify them.
