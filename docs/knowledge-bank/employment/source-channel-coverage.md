---
id: note.employment-source-channel-coverage
title: Source-channel coverage
kind: note
status: active
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-18
review_by: 2026-08-18
relations:
  - type: governed_by
    target: policy.knowledge-wiki-authoring
  - type: governed_by
    target: policy.knowledge-wiki-schema
---

# Source-Channel Coverage

This is a public-safe coverage map, not an archive inventory. Protected source
channels use opaque identifiers and report only the state needed to plan
research. Raw content, private identities, local paths, credentials, and
relationship graphs remain outside Git.

| Channel ID | Channel | Coverage date | Access / normalization state | Known gap | Public-use boundary |
| --- | --- | --- | --- | --- | --- |
| `channel.official-web` | Official public web | 2026-07-18 | Active; role pages verified | Live pages can change or close | Quote sparingly; store URL, date, and bounded facts |
| `channel.press` | Public press | 2026-07-18 | Selective project coverage | Uneven across projects and eras | Public citation with attribution |
| `channel.public-repos` | Public repositories | 2026-07-18 | Selective code/history review | Authorship and outcome need separate tests | Public metadata and defensible code findings |
| `channel.project-code` | Mixed-custody project code | 2026-07-18 | Project-by-project review | Rights and collaborator context vary | Publish only approved aggregate findings |
| `channel.public-data` | Government and public datasets | 2026-07-18 | Selective civic-project review | Freshness and interpretation vary | Preserve dataset provenance and limitations |
| `vault.channel.gmail` | Gmail | 2026-07-18 | Protected; searchable in private runtime | Identity resolution and thread context vary | Public-safe summary only after review |
| `vault.channel.apple-messages` | Apple Messages | 2026-07-18 | Protected; private-runtime access | Partial identity resolution | No raw messages or contact graph in Git |
| `vault.channel.instagram` | Instagram exports | 2026-07-18 | Protected; export normalization available | Account and timestamp reconciliation | Aggregate public-safe findings only |
| `vault.channel.drive` | Google Drive | 2026-07-18 | Protected; mixed synced and authenticated access | Materialization and rights vary | Opaque source metadata or approved summary only |
| `vault.channel.otter` | Otter transcripts | 2026-07-18 | Protected; selected transcripts reviewed | Speaker correction and consent | No transcript publication by default |
| `vault.channel.photos` | Photographs | 2026-07-18 | Protected; large corpus, selective review | Rights, consent, caption, and identification | Metadata-only until image-specific clearance |
| `vault.channel.collaborators` | Collaborator confirmation | 2026-07-18 | Human process, not automated | Availability and collective-credit review | Quote or attribution only with explicit permission |

The source vault is evidence infrastructure, not a public browsing surface.
An accessible source is not automatically normalized, corroborated, approved,
or projectable.
