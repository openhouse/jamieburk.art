# Reader-facing language checks

The public site should help a visitor understand Jamie's work and choose a next
step. Instructions to its publishers belong in the governed data and review
records, not in page copy, metadata, accessible names, or download instructions.

## Existing gates, extended

- `npm run evals:public-language` checks app routes, components, content, top-level
  data files, the explicit public claim projection, and maintained hiring copy.
- `npm run test:public-language` exercises the scanner on positive and negative
  cases. Historical run counts do not determine today's result.
- `node scripts/check-rendered-public-language.mjs` scans every built HTML file,
  including nested and newly added routes. The app's build already runs this
  check. A missing or empty build is an error, not a clean result.

The rendered gate applies all configured phrase rules as well as standalone-term
rules to prose, document titles, metadata `content`, `title`, `alt`, placeholders,
and accessible descriptions/labels, plus the labels on submit/button/reset inputs.
It joins inline prose across formatting tags and line breaks, handles numeric and
common whitespace entities, and keeps block elements and attribute values apart.
Application scripts, styles, comments, CSS classes, URLs, and other non-reader
attributes are not editorial copy.

## Keep the evidence; change its presentation

The `work.ts` field `publicSafety.note` contains publisher instructions. Source
scanning exempts only that field's parsed initializer; neighboring descriptions,
care notes, and public text remain checked. The rendered gate has no field
exemption: rendering these instructions fails even though storing them does not.
The internal photography workflow-state exemption likewise masks only its exact
field match, not everything else on the line.

The page-owner registry is review configuration and stays outside the source-copy
census. Nested knowledge data enters through its explicit public projection and
the resulting rendered pages. These exclusions do not authorize publishing any
internal fields.

There is no blanket ban on **public**, **approved**, **artifact**, privacy
explanations, collective-credit limits, or descriptions of Jamie's documentation
work. For example, “Start from approved material,” “This prototype is not a current
City service,” and “Private participant records remain private” are legitimate
visitor-facing context. Known publisher directives such as “Use only public-safe
claims” and “Collective-work language is required” are not visitor guidance.

## Scope and remaining review

Source scanning is a heuristic, not a full JavaScript execution or data-flow
analysis. The build check is the decisive check for the phrases actually emitted
as static HTML, including text that source syntax splits across inline markup.
It is not a browser DOM or CSS visibility implementation, a full HTML entity
parser, a semantic detector for every awkward sentence, or a scan of downloadable
PDF contents. Runtime-only copy, unusual encodings, new instruction paraphrases,
visual hierarchy, and mobile composition still need browser and editorial review.

When a new class of leakage is observed, add a failing behavioral case before
extending the rules. Include a nearby legitimate sentence that must remain
allowed. Do not weaken claim, consent, rights, or exact-candidate review gates to
make an editorial score pass. A green terminology gate is not editorial approval,
human review, or release permission.
