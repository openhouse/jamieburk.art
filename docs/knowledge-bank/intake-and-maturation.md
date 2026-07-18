# Intake and maturation

The knowledge bank is a place and a process. It captures broadly, researches
deliberately, claims precisely, protects carefully, and composes selectively.

## Governing distinction

Nothing disappears silently at intake. Not everything is promoted into a
public-facing composition.

Every public-safe fragment receives:

- a stable intake ID;
- a project association;
- a disposition;
- visibility and rights boundaries;
- source, observation, claim, or inquiry relationships;
- a next research action when it is not mature.

The private archive remains outside this public repository. Protected material
may be represented only by safe metadata and opaque locators that are removed
from the public web bundle.

## Canonical progression

```text
intake item
  -> source
  -> atomic observation
  -> research inquiry
  -> claim and evidence relationship
  -> surface-specific projection
  -> page-local citation
```

These are distinct states. A source mention is not a claim. A defensible claim
is not automatically selected for the website. A selected claim is not allowed
to say more than its evidence establishes.

## Independent decisions

- **Epistemic:** captured, extracted, corroborated, verified, contested, or
  superseded.
- **Intake disposition:** captured, triaged, researching, integrated, deferred,
  duplicate, or protected.
- **Source visibility:** public, public-metadata-only, private, or protected.
- **Projection:** active, hold, deprecated, or disallowed.
- **Media:** rights, consent, and public-display status are reviewed separately.

## Agent loop

1. Capture every supplied fragment before deciding whether it is important.
2. Deduplicate it without deleting the incoming record.
3. Close-read public sources into proposition-level observations with locators
   and limitations. Do not store full copyrighted articles.
4. Associate each observation with a claim or research inquiry.
5. Search for corroboration, counterevidence, chronology, collaborators, and
   public records.
6. Mature only the propositions supported by the current evidence.
7. Record anti-claims and what each source does not establish.
8. Select projections according to audience, purpose, reader burden, and Chad's
   lens. Mature but unselected claims remain held in the bank.
9. Generate citations only for active public projections.
10. Run deterministic checks and fresh editorial judges; retain only improving
    iterations.

## Photo feedback

Photographs are evidence-bearing records, not self-interpreting proof.

```text
photo candidate
  -> visible observation
  -> rights and consent review
  -> research question
  -> date, place, person, and project correlation
  -> corroborating source
  -> defensible claim
  -> possible public projection
```

Photo editors may discover placards, prototypes, recurring collaborators,
sequences of activity, or public programs worth researching. Agents must not
infer identity, consent, causation, or ownership from an image alone.

## Social-account archive production

Project social accounts can preserve identity systems, public-service routing,
collaboration, source discovery, official response, and longitudinal project
documentation. Treat them as bounded archival carriers:

- record profile metadata as an accessed-at snapshot, never a stable lifetime
  metric;
- separate project-authored outreach from engagement authored by another
  account;
- verify an official's role on the exact post date before counting the post as
  official engagement;
- retain candidate-era and former-member activity as context without including
  it in sitting-officeholder counts;
- deduplicate by canonical status URL and document search, date, pagination,
  and recovery limits;
- keep shared-account output collective unless individual authorship is
  independently established;
- treat an unrecovered account or post as not recovered, not proof that it
  never existed;
- never retain private messages, security or administrator data, private
  analytics, cookies, resident submissions, or protected participant data in
  the public repository.

## Commands

```bash
npm run check:knowledge-evals
npm run test:knowledge-evals
npm run report:knowledge-evals
```

The eval definition lives at `evals/knowledge-bank/evals.json`.
