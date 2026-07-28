---
id: research.public-testimony-source-return.2026-07-28
title: Public testimony source return, July 28, 2026
kind: research-run
status: maintained
visibility: public-safe
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/research-runs/public-testimony-source-return-2026-07-28.md
summary: Full-population speaker parsing and position-aware transcription pass across nine official Council transcripts connected to NYC Artist Coalition and Commercial Rent Stabilization work.
human_review: requested
relations:
  - type: related_to
    target: index.public-testimony-and-heteroglossia
    href: ../indexes/public-testimony-and-heteroglossia.md
  - type: related_to
    target: project.nyc-artist-coalition
    href: ../projects/nyc-artist-coalition-2017.md
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
source_encounter:
  encounter_date: 2026-07-28
  reader: Codex, an AI assistant working with Jamie Burkart
  research_authority: authorized-by-jamie
  publication_authority: separate-human-review
  source_states:
    - target: source.nycc.transcript.cabaret-oversight.2017-06-19
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 229-page Council transcript.
    - target: source.nycc.transcript.cabaret-repeal.2017-09-14
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 143-page Council transcript.
    - target: source.nycc.transcript.cultural-affairs-budget.2018-03-16
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 169-page Council transcript.
    - target: source.nycc.transcript.sbjsa.2018-10-22
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 404-page Council transcript.
    - target: source.nycc.transcript.march-transparency.2019-02-11
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 106-page Council transcript.
    - target: source.nycc.transcript.small-business-package.2019-03-18
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 149-page Council transcript.
    - target: source.nycc.transcript.commercial-rent-stated.2019-11-14
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 109-page stated-meeting transcript.
    - target: source.nycc.transcript.commercial-rent.2021-09-17
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 327-page Committee on Small Business transcript.
    - target: source.nycc.transcript.commercial-rent-stated.2022-03-24
      access_state: reachable
      materialization_state: remote-materialized
      version_note: Official 68-page stated-meeting transcript.
  questions:
    - Which attributable speakers affirmatively supported the issues Jamie and his collaborators championed?
    - How can full public testimony remain useful without turning every assertion into verified fact?
    - Which prime-sponsor and stated-meeting statements are actually present in the official record?
  prior_readings_consulted:
    - Existing NYC Artist Coalition Knowledge Wiki records and claim boundaries.
    - Official Council legislative-detail pages linked to each transcript.
    - Existing FairRentNYC and Commercial Rent Stabilization chronology.
  new_observations:
    - The nine transcripts contain 433 normalized speaker records after alias reconciliation.
    - Complete attributed turn populations are retained for 227 supportive or partly supportive speakers.
    - The 2021 Commercial Rent Stabilization hearing contains 38 supportive or partly supportive full-text speaker records.
    - The 2022 stated-meeting transcript preserves supportive statements by Crystal Hudson and Carlina Rivera.
    - Supportive public officials are included under the same attributable-statement rule as public witnesses.
  changed_interpretations:
    - Public testimony is most useful as a speaker-aware corpus rather than a folder of undifferentiated PDFs.
    - Multi-bill hearings require an out-of-scope disposition so support for one measure is not silently transferred to another.
    - Sponsor metadata and legislative prose must remain distinct from attributable oral statements.
  contradictions:
    - Official reporter spellings sometimes differ from independently known names; transcript labels remain preserved alongside editorial display names.
    - A bill's official introduction record may exist even when the stated-meeting transcript contains no sponsor speech about it.
  records_affected:
    - index.public-testimony-and-heteroglossia
    - project.nyc-artist-coalition
    - project.fair-rent-nyc
  limitations:
    - Transcript normalization is not audio certification.
    - Position classification is editorial metadata and requires Jamie's review before consequential quotation or public argument.
    - Generic and isolated speaker labels remain unresolved rather than guessed.
    - The corpus does not ingest every separately submitted written-testimony attachment.
  librarian_requests:
    - Locate any official audio or video needed to resolve high-value transcript uncertainty.
    - Identify separately submitted written testimony that materially differs from the official oral transcript.
    - Confirm preferred display names and organizational affiliations before publication outside the research corpus.
  publication_decision: public-safe-synthesis-only
---

# Public Testimony Source Return, July 28, 2026

This pass converts nine official Council transcripts into a governed,
speaker-aware reference corpus. Every detected speaker remains in the census.
Only speakers whose attributable turns affirmatively support the scoped issue
receive transcript bodies in the supportive collection. That rule includes
supportive public officials; sponsorship, presence, or a favorable vote does
not substitute for a supportive statement.

## Method

The parser removes repeating page furniture and line numbers, joins visible
line-wrap hyphenation, preserves reporter uncertainty, groups transcript labels
through explicit aliases, and records page ranges. Source PDF and normalized
transcript hashes bind each corpus to the reviewed representation.

Every public witness receives a reviewed disposition. A check fails if a
public witness remains position-unclear. The full-text population must equal
the complete parsed turn count for each included speaker.

## Boundary

The work preserves public speech; it does not adjudicate every factual claim.
It does not turn support into consensus, testimony into independent
verification, or collective advocacy into sole authorship. Jamie's editorial
approval remains required before using any passage in an application, speech,
or public portfolio projection.
