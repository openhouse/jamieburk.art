# Opportunity application-instruction run — 2026-08-14

## Scope

- Governed opportunities evaluated: 4
- Tailored Markdown resumes evaluated: 4
- PDF siblings evaluated: 4
- Application guides evaluated: 4
- Unique SmartRecruiters screenshots supplied for OTI: 8

The two supplied screenshot groups contained the same eight unique images. The
observed SmartRecruiters surface covers Easy Apply, personal information,
optional experience and education containers, profile links, the required
resume upload, the optional hiring-team message, and the `Next` control. It
does not show any page after `Next`.

## Application states

- NYC OTI Senior Product Manager 782366: ready for Jamie's review; every
  observed field has an exact action and the unseen later pages fail closed.
- ACLU Senior Project Manager, National Campaigns: ready for Jamie's review;
  the live Greenhouse fields and required cover letter are covered.
- ACLU Senior Project Manager, Learning and Project Solutions: blocked until a
  required public-safe writing sample is selected and reviewed.
- Benepass Product Operations Manager: blocked because the official Ashby URL
  returned `Job not found` on August 14, 2026.

## Hill climb

The initial artifact eval maintained Markdown and PDF siblings but did not
require a submission guide. The new blocking criterion makes each opportunity
a four-part packet and binds every guide to the exact current Markdown and PDF
digests. Mutation tests now fail for a missing guide, a stale digest, missing
field instructions, an unnamed blocker, protected data, and loss of Jamie's
final-submit gate.

During the first implementation run, the front-matter parser allowed an empty
`blocker:` value to consume the following line. The parser was narrowed to one
line and the blocked-guide mutation test now proves the failure is caught.

The public guide also avoids duplicating contact details already present in the
resume. It directs Jamie to the exact current PDF contact line and never stores
optional demographic, disability, veteran, pronoun, or other protected-category
answers.

## Result

PASS — all 10 blocking artifact criteria passed. All 18 mutation tests passed.
The evaluator reports four opportunities, four Markdown resumes, four PDFs,
four artifact manifests, and four application guides.

The automated pass does not establish the contents of an unseen application
page, choose a protected-category response, select the outstanding ACLU writing
sample, reopen the withdrawn Benepass listing, deploy the portfolio, or submit
an application. Those remain explicit human or external-state gates.
