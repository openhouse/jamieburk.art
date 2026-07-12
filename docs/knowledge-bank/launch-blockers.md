# Launch Readiness Register

This register separates resolved repository conditions from release-time and
human decisions. A deferred item is not silently complete; its owner and stop
condition remain explicit.

## Resolved In Repository

| Criterion | Status | Basis |
| --- | --- | --- |
| Homepage, resume, and Technical Operations claims map to the knowledge bank | Automated | `npm run knowledge-bank` |
| Strong and metric-bearing work items have `proofBankIds` | Automated | `npm run knowledge-bank` |
| Pending/private claims do not project to public surfaces | Automated | Knowledge-bank and citation validation |
| Careful claims preserve guardrails | Automated plus editorial review | Knowledge-bank warnings remain visible during checks |
| Metrics use approved or bounded wording | Approved with guardrails | `approval-register.md` |
| Collaborator-sensitive claims are collective, approved, or omitted | Approved with guardrails | `approval-register.md` and anti-claims |
| Source-Backed Team Memory omits private collaborator/client context | Automated | `npm run public-safety` |
| Case studies preserve Known / Open / Protected boundaries | Automated | Work-data validation |
| Public-safety scanner passes | Automated | `npm run public-safety` |
| Public email, LinkedIn, GitHub, resume PDF, and phone-in-PDF behavior | Approved | `approval-register.md` |

## Release-Time Gates

| Criterion | Status | Owner / completion condition |
| --- | --- | --- |
| Chad-lens and independent judge review | Evaluated per release candidate | Independent judge reaches the launch-readiness threshold |
| Media rights and consent | Human gate | Jamie or the documented rights holder confirms each displayed asset |
| Collaborator-sensitive names, quotes, or credits | Human gate when applicable | Jamie and affected collaborator confirm before publication |
| Production deployment | Deferred until PR review and merge | Jamie explicitly approves the reviewed commit |

No LLM agent may change a human-gate status to confirmed on its own.
