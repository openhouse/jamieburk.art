# Approval Register

This register records the current publishing decision for claim families and
surfaces. It is intentionally conservative for the website while preserving
stronger claim language in the knowledge bank.

| Area | Decision | Public website surface | Notes |
| --- | --- | --- | --- |
| Current resume PDF | Approved for repo/site PDF surface. | `/resume` and PDF download. | Phone number is approved for the resume PDF, not general site contact pages. |
| Public contact email | Env-gated. | `/contact` only when `NEXT_PUBLIC_CONTACT_EMAIL` is set. | Required for production preflight. |
| LinkedIn / GitHub | Env-gated. | `/contact` only when approved env URLs are set. | Omitted by default. |
| Homepage proof strip | Softened. | Homepage. | Uses `recommendedPublicWording` from `apps/www/src/data/claims.ts`. |
| HJE 2x growth contribution | Approved in resume; use with care on site. | Resume page and HJE case study. | Contribution language only. |
| CRS 30+ pages | Approved in resume; softened on proof strip. | Resume page and CRS case study with care. | No private notes or legal-review material. |
| NYC Artist Coalition co-founder role | Use with care. | Work card and case study. | Do not imply sole leadership or official coalition position. |
| WOWList roughly 35 city ecosystems | Approved in resume; softened on proof strip. | Resume page and WOWList case study with care. | No raw archive records. |
| WOWList detailed archive counts | Pending. | Internal docs only. | Requires explicit approval before website use. |
| Sunday Dinner 300+ / 20+ | Approved in resume; softened on proof strip. | Resume page and case study with care. | Summary-only, no private records. |
| KC Town Hall public funding recommendation | Use with care. | KC case study and resume page if wording is recommendation-specific. | Do not imply unrestricted grant receipt or solo credit. |
| CallNYC Politico New York coverage | Verified public source. | CallNYC case study and resume page. | Miranda Neubauer, "Website provides new information about council members' focus," March 14, 2016. Keep archived/unofficial status visible. |
| Source-Backed Team Memory | Approved as lab/method framing. | Lab page. | Do not say production SaaS, autonomous AI, or private archive browser. |
| AI Evals certificate | Approved as completion proof. | Resume/about/internal docs. | Do not inflate beyond course completion. |

## Production Approval Gates

- Final staging-reviewed SHA approved by Jamie.
- Production robots set to `index` only after public content approval.
- Public email approved and set in production env.
- Exact metrics either approved on their target surface or softened.
- Collaborator names, screenshots, artifacts, photos, and quotes approved or
  omitted.
- `npm run check:production` passes with production env vars.
- Route check passes against staging before production promotion.
