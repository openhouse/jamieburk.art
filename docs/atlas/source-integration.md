# Atlas source-centered ingestion

Atlas ingests a source into one canonical dossier. The dossier is organized by
source identity and artifact fixity, not by the number or origin of processing
attempts.

## Native component formats and protocols

1. **Canonical source.** Bibliographic identity, publication context, source
   type, and stable public locator where appropriate.
2. **Artifact.** One SHA-256 identity plus byte count, page count, media type,
   extraction fingerprint, and protected-custody posture.
3. **Atomic observations.** Bounded propositions with source locator,
   attribution, confidence, and public-safety status.
4. **Epistemic components.** Claims, anti-claims, and source limitations remain
   distinct and independently inspectable.
5. **Independent corroborators.** Other publications retain their own identity,
   relationship, supported observations, and explicit non-establishments.
6. **Governance.** Rights, consent, public-use, protected custody, collective
   credit, and correction boundaries are structured data.
7. **Contextual projection decisions.** Every claim is covered by a named hold,
   project, or rejection decision for a specific audience and surface.
8. **Evaluation evidence.** Machine runs, independent certifications, human
   gates, mutations, failures, repairs, and stopping decisions are situated
   knowledge about the dossier without becoming source provenance.
9. **Human synthesis.** A Markdown page permits close reading and ordinary Git
   review of the meaningful change.

`publicUse: internal-only` means public-safe repository knowledge that must not
project onto the website without a separate decision. It does not imply access
control in this public repository.

## Reconciliation rule

Repeated processing may discover different observations or boundaries. Atlas
retains the reconciled atomic knowledge and evaluation evidence needed to
audit the accepted result. It does not create multiple canonical source,
artifact, ingestion, or interpretation identities for the same PDF. A repeated
reading is neither an independent source nor corroboration.

If a proposed reconciliation would discard a supported knowledge form, Atlas
must evolve its schema and evals before accepting the source. Unknowns remain
unknown; non-recovery must not become a claim of nonexistence.

## Legacy migration fixture

The existing feature-evals catalog and frozen source-object inventory remain an
internal migration fixture while older knowledge is checked for native parity
and portable recovery. New consumers use canonical records, source dossiers,
semantic pages, and content-addressed source objects. Consumer-facing compiled
graphs and services do not expose processing-tree associations.

## Verification

```bash
node --test packages/atlas/test/source-dossier.test.mjs
npm run atlas:generate
npm run atlas:test
npm run atlas:check
npm run check
```

`atlas dossier --id ATLAS-SOURCE-KCSTAR-GO-WITH-FLOW-2007` retrieves the
canonical dossier. `atlas knowledge` searches source dossiers. Branch/path
artifact lookup is deprecated.
