# Launch Blockers

Production indexing should wait until these are resolved or explicitly accepted by Jamie.

| Area | Blocker | Current handling |
| --- | --- | --- |
| Resume | Exact production resume PDF needs approval. | Placeholder or unapproved PDFs must fail production preflight. |
| Contact | Public email, LinkedIn, and GitHub need exact approval. | Keep approval status in the register. |
| Phone | Phone must not appear on website pages. | Phone may appear only in an approved PDF resume. |
| Metrics | 2x revenue growth, 35 ecosystems, 300+ gatherings, and 20+ resident artists need source notes or approval before stronger public use. | Keep metrics out of homepage proof strip unless approved. |
| Collaborators | Named collaborators, quotes, and photos require consent. | Use collective credit by default. |
| Civic materials | Private coalition notes, legal-review materials, stakeholder lists, raw strategy context, and private emails must stay out. | Publish public-safe summaries only. |
| Fonts | Private/proprietary font files must not be committed or served. | Use safe web fonts only. |
| Indexing | Production indexing must be explicit opt-in. | Require production env and `NEXT_PUBLIC_ROBOTS_POLICY=index`. |
