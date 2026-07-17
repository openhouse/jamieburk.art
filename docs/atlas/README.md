# Atlas

Atlas is the canonical private application package for Jamie's public-safe
personal-professional knowledge universe. It joins complete atomic records, a
semantic Markdown wiki, source-centered dossiers, queries, evals, and a
clean-room portable export without exposing the private archive or turning the
portfolio into a claims database.

Markdown pages live in [`pages/`](pages/). Every page has a stable Atlas ID,
typed reciprocal relations, authority and consent posture, review ownership,
and, for projects, a deterministic slice of the canonical record store.

Source dossiers live in [`sources/`](sources/). One source dossier represents
one canonical publication or source and one preservation artifact. It contains
the reconciled union of atomic observations, separately governed claims,
anti-claims and source limitations, independent corroborators, custody and
rights controls, contextual projection decisions, evaluation history, and a
human-readable Markdown synthesis. Processing implementations are not source
identity and do not appear as dossier provenance.

## Sources of authority

`records/canonical.json` is authoritative for lifecycle records and proof
claims. `sources/*.json` is authoritative for source dossiers. `pages/*.md` and
each source dossier's synthesis page are the human semantic composition layer.
The generated graph in `generated/atlas.graph.json` is disposable.

The former typed bank and generated feature-evals catalog remain frozen,
deprecated migration fixtures while final parity and portable recovery are
maintained. They are not authoring surfaces, consumer APIs, or the protocol for
new source ingestion. See [`source-integration.md`](source-integration.md).

The ontology, record dispositions, variant policy, machine suite, grounded
tasks, run lineage, and human-review contracts make correction, negative
knowledge, temporal precision, rights, credit, editorial limits, and
epistemic boundaries testable without pretending social interpretation can be
fully automated.

## Source-centered operating sequence

1. Identify one canonical source and fingerprint one artifact without copying
   protected bytes or locators into the public repository.
2. Reconcile atomic observations at the smallest useful proposition level.
3. Write claims, anti-claims, and source limitations as separate components.
4. Represent corroborating publications independently; do not count repeated
   processing of the same artifact as corroboration.
5. Record rights, consent, public-use, custody, credit, and contextual
   projection decisions.
6. Write or update the human-readable synthesis page.
7. Run focused source-dossier evals, mutations, the complete Atlas suite, and
   the repository check. Record failures, repairs, and the stopping decision.
8. Leave independent certifications and human gates pending until named people
   actually review them. An implementation agent cannot self-certify.
9. Materialize and verify a clean-room package when portability is in scope.
10. Project onto the portfolio only after the separate contextual decision.

There is intentionally no `/atlas`, `/knowledge-bank`, `/proofs`, or
`/public-claims` application route.
