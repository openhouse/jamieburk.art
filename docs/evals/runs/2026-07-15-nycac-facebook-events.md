# NYC Artist Coalition Facebook Events Eval Run

Date: 2026-07-15

Decision: `stop_human_blocked`

The candidate must satisfy the event-population, archival-governance,
knowledge-lifecycle, public-safety, claim, citation, projection, and production
checks below. Production deployment and indexing remain blocked on Jamie's
explicit approval of the exact candidate.

## Population Accounting

An authenticated same-day host control displayed 34 past-event slots. Repeated
scrolling exposed 66 links representing two links for each of 33 unique event
identities. The result is therefore **34 = 33 recovered identities + 1
unresolved control slot**: 100 percent control-slot accounting, not 100 percent
historical content recovery and not a native Meta owner export.

The public-safe corpus retains event metadata, organizer relationships, bounded
response displays, mission classifications, source routes, and protected-link
category counts. It excludes raw descriptions, attendee identities, comments,
contacts, access credentials, private working links, account-administration
data, and authenticated-session state.

## Archival Findings

- 33 recovered identities span 2017 through 2021: 17 in 2017, three in 2018,
  six in 2019, six in 2020, and one in 2021.
- 24 event cards displayed NYC Artist Coalition as organizer; nine were allied
  or cohosted listings.
- A deterministic title-and-relationship rule identifies 12 recurring
  coalition meetings: ten at ten distinct physical cultural spaces and two
  virtual meetings.
- The corpus classifies 29 participatory convenings, 15 government interfaces,
  12 cultural-planning events, 12 safety-and-compliance events, 11 Cabaret Law
  repeal events, ten commercial-rent/displacement events, and bounded smaller
  mission categories.
- Seven event descriptions routed readers to source articles from the New York
  Post, WNYC, Metro, The New Yorker, The Baffler, Curbed, and Gothamist.
- The public-safe metadata names interfaces with cultural spaces, cultural and
  advocacy organizations, and city government. Appearance in event metadata is
  not attendance, endorsement, or evidence of a continuing partnership.
- Thirty-two pages retain response labels; 19 are at or above 100, seven at or
  above 500, and three at or above 1,000. These are event-level interface
  signals, not attendance, unique people, reach, participation, endorsement,
  conversion, mandate, or impact. No cross-event people total is retained.

## Recursive Corrections

The first focused eval scored 90/100 because the topic-count comparison was
order-sensitive. Replacing it with key-based comparison brought the focused
criterion to 100 while preserving the underlying counts.

The full lifecycle suite then found campaign press sources attached too broadly
to Jamie's personal-role claim. Those articles moved to a dedicated
article-close-reading inquiry, leaving Jamie's role supported by first-person
attribution, the public-safe event census, and specific public corroboration.

The first independent adversarial review rejected the candidate for weak
privacy semantics, stakeholder prose beyond the graph, a hard-coded recurrence
list, and a misleading summed response estimate. The hill climb removed the
sum, added a bounded stakeholder claim, brought corpus-resolved stakeholder
names into the graph, added exact-key schema validation, and moved recurrence
classification into the corpus.

The second independent review correctly rejected the remaining implementation:
the recurrence list was still a curated answer, selected aggregate fields were
not derived, and semantically private values could bypass the shape validator.
The repaired gate now regenerates recurrence from event relationship and title,
derives all aggregate response fields, reconciles display labels with point
estimates, validates exact manifest and corpus shapes, enforces public value
taxonomies and host allowlists, and rejects adversarial private prose, email and
phone formats, machine-local paths, meeting-access URLs, unknown topics,
recurrence contradictions, aggregate contradictions, and response-display
contradictions.

The third independent review found additional semantic bypasses: common
participant prose and formatted phones, Slack and GitHub tokens, credential
query parameters and URL user information, common local paths, Webex and Jitsi
meeting links, contradictory response components, and substitutions among real
event IDs. That repair added contextual metadata checks, reconciled
response component ranges at Facebook's displayed precision, validated real
dates and derived date labels, bound every event ID to its date and title with a
manifest-pinned identity digest, and put the stakeholder, attendance, and
endorsement boundary directly on the public case study.

The fourth independent review showed that the preceding repair was incomplete.
Encoded sensitive values could still ride inside allowlisted URL parameters;
additional secret and personal-narrative forms passed; and organizer relations
and event-to-article routes were internally consistent without remaining bound
to the reviewed archival facts. The next repair decodes and inspects URL paths,
queries, and fragments contextually; rejects credential parameters, nested
meeting links, broader secret forms, and sensitive personal prose; preserves
legitimate long numeric article paths; enforces direct-versus-allied organizer
semantics; and pins the reviewed organizer relationships and all seven article
routes independently of the whole-corpus hash.

The fifth independent review reproduced a deeper set of fail-open cases inside
otherwise approved outbound-resource hosts: collaboration and payment tokens,
cloud credential parameters, international phone formatting, additional
sensitive medical and housing prose, nested base64 contact and meeting data,
and local paths outside the first path list. It also showed that literal
adversarial fixtures tripped the repository's own public-safety scanner and
that title mutations could be rejected by the reviewed-record digest without
proving the semantic detector worked. The repaired gate now recursively
expands URL and base64 layers, checks every layer for private data and meeting
access, recognizes the wider credential and path families, constructs test
credentials at runtime, and exercises the bypasses through outbound resources
that are not covered by the reviewed-record digest. The focused checker, eval,
and repository-wide public-safety gate all pass on the repaired candidate.

The sixth independent review then moved recursively encoded payloads from
query values into URL paths and fragments and expanded the short-form and
alternate-format probe set. It found short base64 emails, international trunk
and `00` phone forms, short bearer and additional platform-token families,
medical and housing language, private relative paths, and encoded meeting URLs
that the preceding repair still admitted. The next repair applies one bounded,
fail-closed decoder to path segments, query values, and fragments; broadens the
explicit privacy taxonomies; and adds direct, repeated URL, repeated base64,
path, and fragment regressions. A separate outbound-resource replay rejected
every then-reproduced bypass while confirming that every mutation remained
outside the reviewed event-record digest.

The seventh independent review expanded that replay to 484 mutations and found
39 remaining omissions: phones decoded from path segments, ordinary receiving-
chemo, has-cancer, and facing-housing-loss language, and private- or secret-token
query keys. It also found that two ledger rows supplied a venue name not bound
to the canonical corpus. The next repair enables phone checks after path
decoding while preserving legitimate raw numeric article paths, expands the
sensitive-language and credential-key taxonomies, exercises every sensitive
payload through eight encoding and placement modes, and projects the canonical
street value for those two venue rows.

The eighth independent review passed a 488-case baseline matrix but found 18
adjacent fail-open cases: five medical or housing phrases in two placements and
four credential-key families in two recursively encoded forms. It also compared
all 33 ledger rows with the corpus and found 16 readability edits that lacked a
declared transformation rule. The next repair recursively decodes query keys,
adds every adjacent phrase and credential-key placement to the permanent
outbound-resource matrix, projects literal canonical venue values in all 33
ledger rows, and makes that exact ledger join part of the blocking checker and
focused eval.

The ninth independent review passed the 488-case baseline, the 52-case repaired
adjacency suite, all 33 literal ledger joins, and every corpus, graph, and route
invariant. Its wider probes found 31 fail-open variants across punctuation-
separated and inflected personal narratives, plural credential-key families,
and empty credential parameters. One malformed `outboundResources` value also
threw instead of returning a controlled validation failure. The next repair
normalizes punctuation separators before sensitive-language matching,
recognizes credential key families across recursively decoded forms regardless
of whether a value is present, guards malformed resource collections, and adds
all of those cases to the permanent checker and focused eval. The review's
production build was separately inconclusive because its read-only audit
sandbox denied Next.js access to `.next/trace`; writable production preflights
remain part of the final verification contract.

The tenth independent review reproduced the complete archival and graph
accounting and passed every focused and repository-wide read-only gate. Its
wider public-data-redaction matrix nevertheless exposed additional semantic
variants in encoded query keys, camel-cased or inflected medical and housing
prose, participant-list language, plural credential keys, and malformed record
shapes. It also identified one legitimate sentence about the treatment of
artists under law that the validator rejected too broadly. The repair now
normalizes Unicode punctuation and camel case, checks every recursively decoded
query key as content, recognizes the remaining participant and credential-key
families, returns controlled failures for malformed events and resource values,
and narrows treatment matching to medical context. Every reproduced case and
the legitimate sentence now live in both blocking test matrices; the next
independent review must accept the unchanged repaired candidate.

The eleventh independent review again reproduced every archival, ledger,
lifecycle, citation, registry, and projection invariant, but rejected the
candidate on a fresh redaction matrix. Unicode-obscured contacts, additional
participant-list and personal health or housing phrases, camel-cased credential
keys, two local-path families, and a one-element article URL array remained
fail-open; two ordinary editorial sentences were false positives. It also
identified a reusable short proof wording that had dropped the required
first-person attribution. The next repair validates canonical Unicode before
separator removal, decodes printable Unicode, distinguishes named or listed
participants from ordinary participation language, expands bounded sensitive
and credential taxonomies, requires article URLs to be strings, and preserves
attribution in short copy. The complete reproduced set and benign controls now
live in both blocking matrices; a fresh independent judge must accept the
unchanged repair.

The twelfth independent review confirmed that the archival accounting,
lifecycle graph, selected projection, attribution, and repository gates were
sound, but rejected the candidate because its fresh public-data matrix exposed
37 fail-open variants, one uncontrolled malformed-record exception, and two
benign template-language false positives. The repair removes Unicode default-
ignorable characters before matching, decodes line-wrapped base64, recognizes
additional participant-list, sensitive-personal-data, credential-key, local-
path, formatted-phone, and meeting-access forms, and returns a controlled
digest mismatch for non-JSON record values. The resulting 41-case unsafe set,
six malformed shapes, and 15 ordinary-language controls now share one fixture
module used by both the blocking checker and the scored eval. The next
independent review must accept this unchanged candidate.

The thirteenth independent review passed the archival, lifecycle, citation,
projection, attribution, and static-code gates, but rejected the candidate on
the fixture's 41-versus-42 count mismatch and a new generalization matrix. It
found eight roster synonyms, seven explicit personal shelter, health,
disability, foreclosure, or housing disclosures, one contextual unformatted
phone path, and one compound credential key that failed open; cyclic and very
deep malformed values could also overflow recursive traversal. The next repair
adds all 17 redaction cases, uses bounded cycle-aware object inspection, and
expands the shared permanent matrix to 58 unsafe cases, eight malformed shapes,
and 15 benign civic/editorial controls. A fresh independent judge must accept
the unchanged repair.

The fourteenth independent review reproduced every archival, lifecycle,
citation, projection, attribution, and static-code invariant. Its fresh matrix
nevertheless found 13 adjacent fail-open cases: six named roster forms, one
recursively encoded roster, five explicit personal disability, shelter,
medical-treatment, or housing disclosures, and one compound client credential
key. All 15 ordinary civic/editorial controls remained accepted. The repair
promotes every material case, expands the permanent matrix to 71 unsafe cases,
eight malformed shapes, and 15 benign controls, and leaves the public corpus
and website projection unchanged. A fresh independent judge must accept this
unchanged repair.

The fifteenth independent review again reproduced every corpus hash, all 33
ledger joins, the seven article joins, the lifecycle graph, the selected
projection, and the attribution boundary. It rejected the candidate after a
new 51-case matrix found 50 fail-open variants: encoded or obfuscated contacts,
additional named-record forms, person-level treatment and housing disclosures,
compound session and meeting credential keys, meeting-join routes, and local
browser-session paths. All 20 new ordinary civic/editorial controls passed,
and cyclic and over-depth objects failed safely. The repair generalizes encoded
text expansion, credential classification, participant-record and sensitive-
narrative detection, meeting-route detection, and local-path handling; it
promotes all 51 unsafe probes and all 20 benign controls. The permanent matrix
now contains 122 unsafe cases, eight malformed shapes, and 35 benign controls.
A fresh independent judge must accept the unchanged repaired candidate.

The sixteenth independent review reproduced the same archival, graph,
projection, attribution, and permanent-matrix evidence. Its 48 new unsafe and
30 new benign probes found 22 fail-open cases across prefixed credential keys,
named attendance-record synonyms, and explicit person-level health or housing
disclosures; every benign control passed. It also found that the repository
public-safety scanner correctly rejected a literal synthetic private-key header
inside the adversarial fixture. The repair uses bounded suffix classification
for credential keys, expands named-record and personal-disclosure patterns,
constructs the private-key probe at runtime without storing a prohibited
literal, and promotes the complete fresh matrix. The permanent suite now holds
170 unsafe cases, eight malformed shapes, and 65 benign controls. A fresh
independent judge must accept the unchanged repaired candidate.

The seventeenth independent review again reproduced the full archival census,
all pinned hashes and joins, the lifecycle graph, citations, selected website
projection, and repository gates. It then discarded its first exploratory
matrix because some controls were too close to earlier fixtures and ran a
mechanically zero-overlap suite of 45 unsafe probes and 30 benign controls. Two
in-scope forms failed open: `calendar_join_pin` as a compound credential key and
an `attendance register` followed by a hyphen or typographic dash. The repair
recognizes credential-bearing code, ID, and PIN suffixes after embedded meeting
or join terms; treats colons, hyphens, en dashes, and em dashes consistently for
named attendance records; and promotes all encoded credential-key and roster
separator variants plus neighboring benign controls. The permanent suite now
holds 176 unsafe cases, eight malformed shapes, and 67 benign controls. A fresh
independent judge must accept the unchanged repaired candidate.

The eighteenth independent review independently reproduced the archival,
ledger, graph, citation, projection, attribution, and repository evidence. Its
mechanically zero-overlap suite added 42 unsafe probes and 24 ordinary civic or
editorial controls. All benign controls passed without throws, while 22 unsafe
cases failed open across a recursively encoded session credential key, named
attendance-record families, explicit person-level health or housing
disclosures, local browser/session path families, and quoted-printable contact
encoding. The repair promotes the entire fresh suite, adds bounded
quoted-printable expansion, classifies embedded session-key suffixes, replaces
the narrow roster list with named-record families, adds explicit resident or
patient disclosure families, and broadens local-path handling without rejecting
the ordinary controls. The permanent suite now holds 218 unsafe cases, eight
malformed shapes, and 91 benign controls. A fresh independent judge must accept
the unchanged repaired candidate.

The nineteenth independent review reproduced the population, ledger, graph,
citation, projection, attribution, and repository evidence under Node 26.4.0.
Its mechanically zero-overlap suite added 42 unsafe probes, seven in each of
the six required categories, and 25 ordinary civic or editorial controls. One
named-record form failed open: a dash-delimited `Crew manifest` containing
personal names. The repair adds crew manifests to the separator-aware named
attendance-record family and promotes the complete fresh suite, including all
controls. The permanent suite now holds 260 unsafe cases, eight malformed
shapes, and 116 benign controls. A fresh independent judge must accept the
unchanged repaired candidate.

The twentieth independent review reproduced the archival census, every ledger
and article join, the lifecycle graph, the selected attributed projection, the
permanent matrix, and the relevant repository gates. Its mechanically
zero-overlap suite added 48 unsafe probes, eight in each required category, and
31 adjacent benign controls. Seven dash-delimited roster families failed open,
while one neighborhood-scale aggregate sentence about housing instability was
incorrectly treated as a person-level disclosure. The repair applies the same
separator contract across the roster taxonomy, narrows generic housing-loss
matching, adds an explicitly named housing-instability rule, and promotes the
complete fresh suite. The permanent suite now holds 308 unsafe cases, eight
malformed shapes, and 147 benign controls. A fresh independent judge must accept
the unchanged repaired candidate.

## Projection Decision

One attributed, collective-credit-preserving role claim projects to the
FairRentNYC case study: Jamie reports that he helped establish and produce the
recurring participation system. Response thresholds, stakeholder aggregates,
and the democracy-lab interpretation remain in the knowledge bank because they
add archival depth without improving the job-application page enough to justify
their ambiguity or visual weight.

## Verification Contract

- NYCAC Facebook events eval criterion: 100/100.
- Corpus checker must independently reproduce population, chronology,
  relationships, recurrence, taxonomy, aggregates, article routes, hashes, and
  adversarial rejection.
- Knowledge-lifecycle and citation graph tests must pass.
- TypeScript, ESLint, production build, knowledge-bank, public-safety, route,
  and production-policy checks must pass.
- Two consecutive production preflights must pass on the unchanged candidate.
- A fresh independent read-only adversarial judge must return `ACCEPT` with no
  release-blocking finding after this record and the repaired validators exist.

The final human decision remains whether this exact candidate is approved for
production deployment and indexing.
