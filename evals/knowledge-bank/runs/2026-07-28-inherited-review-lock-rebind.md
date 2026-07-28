# Inherited review-lock rebind

Date: 2026-07-28

## Scope

The frozen `feature/photo-knowledge-D` base carried two stale deterministic
review locks even though its semantic, privacy, evidence-closure, projection,
and mutation-resistance checks passed:

- the KC Town Hall shared-public-surface digest; and
- the personal/WOWList Facebook-event proof-content digest.

This review did not change either public surface. It rebound the evaluator to
the already-frozen candidate after an exact diff review.

## KC Town Hall

The shared surfaces now describe Jamie as a co-founder and project manager,
retain collective authorship, preserve the complete Board-to-Council funding
lifecycle, and state that no funds were disbursed and the unused appropriation
returned to the fund. The new proposal rendering is explicitly labeled as an
intended program rather than an as-built record.

The field-practice claims remain held. The public surfaces do not say that the
proposal proves Jamie was general contractor, that Phase One was completed in
2019, or that Jamie caused a municipal funding action.

Digest:

```text
before: 66d49ae7551123c0f548ddf1800d0455c79c9eb19b9c363d10c0e649922e3d87
after:  edd3c3f3fa5ff179ee58fcc0765e4c185abfb2a52385a3310c485d21e4948f84
```

## WOWList

The proof now replaces an unbounded city-adoption formulation with a
source-bounded July 2017 database snapshot: 1,846 users, 16,142 posts/events,
and 35 city-region keys with at least 50 posts. Its guardrail expressly
prohibits interpreting the 35 keys as adoption or official chapters.

The historical identity and motto artworks remain artifacts of the project
surface, not evidence of scale, outcome, adoption, or sole authorship.

Digest:

```text
before: 04bda7a50e53a7c78d4f49b7f139a424514e03d83994c3fbb63cd6fbd25be685
after:  6883581998d93dc7ca09f38da9d914e384014fa3a745307940af5ceac28e3fc1
```

## Verification rule

The rebind is accepted only if the complete knowledge-eval suite and all
count-preserving, checksum-refresh, privacy, role-inflation, attribution, and
projection mutation tests pass without weakening a criterion.
