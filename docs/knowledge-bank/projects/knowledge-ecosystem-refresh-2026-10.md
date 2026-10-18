---
id: project.knowledge-ecosystem-refresh.2026-10
title: Knowledge ecosystem implementation review
kind: project
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-10-18
review_by: 2026-11-18
canonical_path: docs/knowledge-bank/projects/knowledge-ecosystem-refresh-2026-10.md
summary: >
  A bounded reading of recent public branches distinguishes implemented reference
  tools from proposed protocols, then repairs demonstrated publication checks.
relations:
  - type: related_to
    target: method.source-backed-team-memory
    href: ../methods/source-backed-team-memory.md
---

# Knowledge ecosystem implementation review

## Scope and what was read

The October 18 GitHub inventory enumerated all 291 branches in this public
repository. Four heads had tip commits on or after September 1; selected
governance, implementation, evaluation and site files on those heads were read.
The 287 older heads were inventoried, not comprehensively reread. Inventory is
not content coverage, and a recent commit is not proof of a current deployment.

| Branch | Exact edition | Reading and disposition |
| --- | --- | --- |
| work/2026-09-03-A | [2441779](https://github.com/openhouse/jamieburk.art/tree/2441779a40812a477576f24103dc3ff98e621291) | IRL runtime, bounded transcript and packet-preparation contracts. Retain as distinct implementations; no wholesale runtime merge. |
| work/2026-09-03-B | [6118a99](https://github.com/openhouse/jamieburk.art/tree/6118a99b49bbe2b771ed6c8a48b938d7035e5b15) | Current site, canonical claim records, reader-return prototype and public-language checks. Update the public explanation of implemented behavior. |
| work/2026-09-03-C | [3178c51](https://github.com/openhouse/jamieburk.art/tree/3178c51fb4c94561935e667bbc095dffd5bca63c) | Public-language repair, IRL/runtime boundaries and transcript-person returns. Adapt the demonstrated publication-check fix only. |
| work/2026-09-01-A | [e53158b](https://github.com/openhouse/jamieburk.art/tree/e53158bfe87f281e0b2020c11e0f020fa95174bc) | Changed-file census; opportunity/source-channel work, not a newer architecture implementation. |

## What changed in the understanding

The August graph proposal is not the whole account anymore. B contains a
[synthetic reader-return implementation](https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/scripts/rfcs/knowledge-reading.mjs)
and [executable tests](https://github.com/openhouse/jamieburk.art/blob/6118a99b49bbe2b771ed6c8a48b938d7035e5b15/scripts/rfcs/knowledge-reading.test.mjs).
It requires exact source identities, retains earlier disagreements and refuses
to turn a reference-only fragment into an action. The canonical source,
observation and claim records now support that narrow implementation account.

The larger shared-memory proposition remains held. Synthetic tests do not
establish human comprehension, semantic accuracy, useful collaboration, client
adoption, or permission to act. A known fact may still be protected.

## Bounded system improvement

B's existing policy prohibited an unqualified raw-user-count claim, but its
checks missed the same phrase in rendered HTML, across source lines, and on a
line containing an unrelated exempt metadata field. C's
[source checker](https://github.com/openhouse/jamieburk.art/blob/3178c51fb4c94561935e667bbc095dffd5bca63c/scripts/check-public-language.mjs)
and [rendered checker](https://github.com/openhouse/jamieburk.art/blob/3178c51fb4c94561935e667bbc095dffd5bca63c/scripts/check-rendered-public-language.mjs)
provide a bounded repair within the existing policy.

The hill climb uses failing regressions first, then repairs text extraction,
pattern coverage and exemption scope. Valid technical metadata remains valid;
an empty rendered corpus cannot pass. These are development controls, not a
measured rate of real-world claim accuracy.

## Deliberate non-adoptions

- A and C contain different temporal runtimes. Their stores and authority
  models are not silently combined by this review.
- An RFC number alone is not identity: A's RFC 0017 concerns opportunity packets;
  B's RFC 0017 concerns situated reading. Repository, commit, path and meaning
  must travel together.
- A's live-route checker is useful follow-on work; the current bounded repair
  does not claim every live/dynamic route was inspected.
- A passing component check is not a complete suite, human approval, merge,
  deployment or adoption. Historical review receipts remain historical when
  candidate bytes change.

## Public projection

The [method page](../methods/source-backed-team-memory.md) links this review.
The existing lab page adds one source-cited prototype section with its limits
beside the claim. No private repository inventory or source locator is needed
to explain the method. The [blind-spot controls](blind-spot-evaluation-controls.md)
continue to distinguish governed gaps from missing evidence actually recovered.
