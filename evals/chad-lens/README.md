# Chad Lens Eval

This focused eval turns the repository's Chad lens into one compound criterion:
minimize reader burden, make Jamie visible as the actor, explain what became
usable and for whom, translate specialized language, and preserve collective
credit.

Run the deterministic validator:

```bash
npm run evals:chad-lens
```

An LLM driver starts with the fixture's incumbent candidate, then alternates a
generator with independent evidence and hiring-reader judges. A candidate earns
a score of 5 only when all five dimensions pass together. The run stops after
two consecutive independent passes or at eight iterations.

The paragraph may use up to four short sentences within the 75-word ceiling.
This keeps the collective boundary visible without forcing every responsibility,
audience, and use into overloaded compound sentences.

Committed run artifacts live under `runs/<date>-<branch>/`. Historical winners
remain immutable evaluation records; the newest completed winning candidate
must enter the Knowledge Bank before it is projected onto the site. The
deterministic checker verifies that newest candidate exactly on its declared site
surfaces and verifies that every supporting claim ID exists in both the
structured and human-readable Knowledge Bank.
