# Approval Register

This register is public-safe as a repo document, but it is not a website page. It records decisions Jamie or collaborators should review before production indexing.

Do not put private details into this table.

| Item | Type | Current state | Required approval | Where used | Blocker? |
| --- | --- | --- | --- | --- | --- |
| Resume PDF | file | present for review | Jamie approves exact PDF and phone-in-PDF scope | `/resume`, download path | yes |
| Public contact email | contact | env-driven | Jamie approves exact public presentation | Contact, footer, resume page | yes |
| LinkedIn URL | contact | optional env value | Jamie approves exact URL | Contact, resume page | yes if shown |
| GitHub URL | contact | optional env value | Jamie approves exact URL | Contact, resume page | yes if shown |
| Phone number | contact | PDF-only | Jamie approves whether phone remains PDF-only | Resume PDF | yes |
| 14+ years | metric | approved for reviewed branch | Jamie approves production wording | Homepage, resume, Technical Ops | yes if exact |
| 2x revenue growth | metric | approved with contribution wording | Jamie approves production wording | Homepage, HJE, resume | yes if exact |
| 30+ CRS pages | metric | approved with guardrails | Jamie approves production wording | Homepage, FairRentNYC | yes if exact |
| 35+ active scenes / city ecosystems | metric | approved as aggregate | Jamie approves production wording | Homepage, WOWList | yes if exact |
| 300+ gatherings / 20+ artists | metric | approved as aggregate | Jamie approves production wording | Homepage, 196 | yes if exact |
| KC Town Hall funding recommendation | metric | approved as process proof | Jamie approves final wording | KC page, Technical Ops | yes if exact |
| Screenshots / artifacts | media | mostly withheld | Jamie plus relevant collaborators approve | Case studies | yes if shown |
| Collaborator names / quotes / photos | consent | mostly withheld | named person and Jamie approve | Case studies | yes if shown |
| CallNYC Politico citation | citation | open | exact public source confirmed | CallNYC page | no if omitted |
| Production indexing | release | blocked | Jamie approves exact reviewed commit | production deploy | yes |

## Review Rule

If an item is unresolved, do not publish the unresolved version in public UI. Use safe wording, omit the item, or keep it in this register.
