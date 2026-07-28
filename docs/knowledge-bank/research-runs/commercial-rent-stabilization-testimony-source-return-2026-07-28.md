---
id: research.commercial-rent-stabilization-testimony.2026-07-28
title: Commercial Rent Stabilization testimony source return, July 28, 2026
kind: research-run
status: maintained
visibility: public
sensitivity: moderate
last_reviewed: 2026-07-28
review_by: 2026-10-28
canonical_path: docs/knowledge-bank/research-runs/commercial-rent-stabilization-testimony-source-return-2026-07-28.md
summary: Reproducible return to city and state legislation, official statements, Council testimony, and public-event transcripts to preserve the attributed Commercial Rent Stabilization support chorus and its boundaries.
relations:
  - type: related_to
    target: project.fair-rent-nyc
    href: ../projects/fair-rent-nyc.md
  - type: related_to
    target: index.knowledge-wiki.commercial-rent-stabilization-testimony
    href: ../indexes/commercial-rent-stabilization-testimony.md
  - type: related_to
    target: index.knowledge-wiki.public-testimony-heteroglossia
    href: ../indexes/public-testimony-heteroglossia.md
---

# Commercial Rent Stabilization testimony source return, July 28, 2026

## Question

Can the Wiki preserve the full recovered city and state support record for
Commercial Rent Stabilization, including public officials and campaign-event
speakers, while distinguishing bills from resolutions, direct support from
related alignment, delivered speech from written statement, and testimony from
verified fact?

## Source return

The pass returned to official New York City Council records for:

1. Int 1796-2019, introduced by Stephen T. Levin;
2. the September 17, 2021 Small Business Committee hearing transcript;
3. the official 237-page hearing-testimony attachment;
4. Int 0093-2022, introduced by Diana I. Ayala;
5. the November 14, 2019 and March 24, 2022 stated-meeting transcripts; and
6. Res 0496-2026, introduced by Tiffany L. Cabán and co-sponsored by ten
   additional Council Members.

The pass also returned to:

7. the active official A5568A and S8319 bill pages and complete sponsor
   memoranda;
8. the official February 17 and April 10, 2026 New York State Senate releases;
9. Jamie's audio-derived transcript of the November 13, 2025 Park Slope event;
10. the February 17, 2026 Friends and Lovers bill-launch transcript;
11. the March 10, 2026 Project X corrected transcript; and
12. the April 10, 2026 Jimmy's Corner rally corrected transcript.

Every locally extracted source text is bound to a SHA-256 digest before
generation.

## Editorial method

- Preserve every recovered oral turn for 35 supportive or qualified-support
  contributors at the 2021 hearing.
- Preserve all 41 attributed written submissions in the official attachment
  that directly support or materially qualify Commercial Rent Stabilization.
- Keep `supportive` and `qualified-support` distinct.
- Preserve complete attributed public-official turns, while distinguishing
  direct bill support, related-measure support, recognition of the policy
  problem, and objections to the mechanism.
- Record opposition, unrelated statements, agency non-endorsement, duplicates,
  and missing transcript attachments in coverage notes.
- Preserve prime-sponsor stated-meeting records even when the only recoverable
  material is procedural or concerns another bill.
- Publish the full official text of Res 0496-2026 as a collectively attributed
  legislative document, not as an inferred individual floor speech.
- Preserve complete official A5568A and S8319 sponsor memoranda without
  representing them as delivered speeches.
- Select public-event statements by exact speaker label and timestamp against
  a hash-bound local transcript.
- Record every speaker's role at the time of the statement. Eon Huntley's
  March 2026 speech is attributed to him as an Assembly candidate; his later
  primary victory remains later context.
- Keep official press quotations distinct from audio-derived transcripts.
- Remove direct contact coordinates from the public derivative corpus.

## Result

- 3 legislation or resolution lifecycle records;
- 2 stated-meeting records containing 4 sponsor or co-sponsor records;
- 35 oral support contributors and 133,833 preserved transcript characters;
- 41 attributed written support or qualified-support submissions and 220,384
  preserved characters;
- 5 public-official scope records containing 64 complete attributed turns;
- 1 full current Council support resolution attributed to 11 sponsors;
- 2 active Albany bill records with complete official sponsor memoranda;
- 18 speaker records containing 45 complete timestamped turns across 4 public
  events;
- 9 complete attributed pro-bill statements from 2 official New York State
  Senate releases;
- 76 public-safety redactions across the derivative collection; and
- 18 hard evaluation criteria plus 10 executable corpus tests.

## Public-official boundary

Stephen T. Levin is the only 2021 hearing official classified as directly
supporting Intro 1796. Eric Dinowitz recognized a deep need to address the rent
crisis without stating a bill position. Helen Rosenthal and Gale A. Brewer
supported a related commercial-tenant bill of rights. Mark Gjonaj recognized
the problem and praised the work while explicitly questioning broad commercial
rent regulation. Kalman Yeger's opposition and the administration's
non-endorsement remain in the coverage ledger and the canonical transcript.

Crystal Hudson and Carlina Rivera gave substantive co-sponsor support at the
2022 stated meeting. Diana I. Ayala's only recoverable statements there are
procedural; the absence of a substantive introduction statement is recorded as
a non-recovery, not filled by inference. The current resolution is preserved in
full because no separate June 11, 2026 transcript attachment is available for
an additional Tiffany Cabán floor statement.

The public-event set retains Shahana Hanif's full November 2025 statement as a
New York City Council Member, Brad Lander's full statement as Comptroller, and
Eon Huntley's full March 2026 statement as an Assembly candidate. The Jimmy's
Corner corpus retains the named rally chorus, including Senator Julia Salazar
and Assembly Members Emily Gallagher, Tony Simone, and Jo Anne Simon.

Both state bills remain in committee as of July 28, 2026. The official bill
pages provide sponsor memoranda but no chamber video or transcript for an
introduction or floor speech. The corpus records that non-recovery rather than
inventing a legislative speech.

## Limits

- The inclusion cohort is a documented editorial classification. The official
  Council records remain the canonical complete sources.
- Testimony assertions are attributed statements, not independently verified
  historical, legal, quantitative, or causal facts.
- Text extraction preserves apparent transcript errors and can disturb spoken
  word order; quotation should be checked against the official PDF and, where
  material, the hearing video.
- This source return does not authorize a portfolio quotation, endorsement
  claim, or causal claim without separate editorial review.
- Council and Albany status and sponsor counts are a July 28, 2026 snapshot
  and require a fresh check before later public use.
- Public-event transcript text may contain automated or corrected-transcript
  errors. Material quotation should be checked against the recording.
- This is an additive source-return pass, not a claim that every statewide
  supportive statement has already been located.

## Reproduction

Maintained derivatives are checked with:

```sh
npm run testimony:heteroglossia:check
npm run testimony:heteroglossia:test
npm run testimony:commercial-rent:check
npm run testimony:commercial-rent:test
```

Local regeneration additionally requires the official extracted transcript and
attachment text, verifies every governed digest, and writes no source-private
path into the repository.
