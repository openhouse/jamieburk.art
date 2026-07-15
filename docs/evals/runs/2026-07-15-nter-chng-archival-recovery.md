# NTER CHNG Archival Recovery - 2026-07-15

## Decision

NTER CHNG is mature enough for a bounded historical knowledge-bank claim.
Archived project, video, exhibition, and protected contemporaneous working
sources establish its co-creators, January 2010 presentation window,
software-and-architecture framing, participatory interaction, Cocoon Gallery
presentation, and later inclusion in America: Now and Here's Kansas City
program.

The archive-note projection is active only in the historical knowledge bank.
About, resume, website, and media projections remain held.

## Recovered Sources

### NTER CHNG project website

The January 28, 2011 Wayback capture identifies NTER CHNG as an interactive
texting installation by Drew Bolton, Jamie Burkart, and Garrett Fuselier and
places it at Arts Incubator's Cocoon Gallery in Kansas City.

The Wayback index returned two successful HTML captures, from 2011 and 2013.
The later capture embeds a 50-second Vimeo project video. The site's linked
press release was not captured in the reviewed Wayback corpus.

### Project video

Surviving Vimeo metadata, published March 23, 2011, repeats the three
co-creator credits. It also credits Mary Nichols with helping engineer and
construct the wall and names Megan Mantia and Elisha Stetson as actors.

The video and thumbnail remain metadata-only pending rights and consent review.

### America: Now and Here

A Wayback index of the exhibition's own `americanowandhere.org` site recovered
the June 22, 2011 article "I Text, Therefore I Am" in its Kansas City category.
The article documents visitors sending text messages to a displayed number and
seeing them projected as moving thought clouds on an angled floor-to-ceiling
gauze screen.

This is direct institutional evidence that NTER CHNG appeared within America:
Now and Here's Kansas City program. It does not name the creators or specify
the installation's exact venue and dates.

### Nerman Museum context

The Nerman Museum page republishes contemporaneous Kansas City Star reporting
on America: Now and Here's Kansas City launch, its public-dialogue mission, and
its inclusion of Kansas City artists alongside national participants. It also
documents the Barbara Kruger truck's May 11-12 museum stop.

The page does not name NTER CHNG. It cannot support a claim that the installation
appeared at the Nerman Museum stop.

### Contemporaneous working documents

Two Google Docs supplied by Jamie were reviewed through authenticated Drive
access and represented only by protected locators and public-safe summaries.
The underlying links and sensitive content are not stored in the repo.

The first, created in April 2011, is a planning document for a May 2011
America: Now and Here restaging. It identifies Leedy-Voulkos as the intended
installation site and inventories wall reconstruction, projectors, display
computers, wiring, displayed phone numbers, and server-side and wall-side
software work. Because it is a plan, it establishes intended implementation,
not the completed venue or final as-built system.

The second preserves January 2010 exhibit information. It records a January
8-29 window and describes NTER CHNG as equal parts software application and
architectural installation. Visitors communicated in real time through both
faces of a digital wall, shifting one-to-one texting into a public many-to-many
exchange. It is a project-authored account rather than independent criticism.

Both originals contain material excluded from the public repo, including
phone numbers, text-message material, residential or travel
logistics, and infrastructure details.

## Lifecycle Result

- Added 2 matured intake records: one public-safe and one protected summary.
- Added 4 public and 2 protected source records.
- Added 1 confirmed-with-boundary claim with 6 evidence relationships.
- Added 1 partially recovered inquiry covering contribution split, technical
  architecture, exact exhibition placement, participation scale, and media
  rights.
- Added an active historical archive note and held About and photo-brief
  projections.
- Added explicit collective-credit, location, scale, privacy, and rights
  anti-claims.

The resulting lifecycle contains 34 intake records, 86 sources, 26 claims, and
16 research inquiries. Fifteen mature claims are intentionally held from the
website.

## Hill Climb

1. **Authorship:** Replaced a Jamie-only memory frame with the three documented
   co-creators and fuller production credits.
2. **Exhibition proof:** Recovered America: Now and Here's own NTER CHNG article
   instead of relying on thematic proximity to the Nerman page.
3. **Interaction:** Preserved the actual user flow, text submission to moving
   projected thought clouds, rather than the generic phrase interactive art.
4. **Location discipline:** Separated Kansas City program inclusion from the
   unsupported inference that NTER CHNG appeared at the Nerman stop.
5. **Technical recovery:** Recovered the creators' software-and-architecture
   framing and planned wall, projection, computer, wiring, and software layers
   without mistaking a plan for the as-built system.
6. **Venue discipline:** Recorded Leedy-Voulkos as intended in the plan while
   keeping the completed 2011 venue and dates open.
7. **Privacy transformation:** Converted the documents into protected source
   records and excluded phone numbers, text-message material, residential and
   travel details, infrastructure identifiers, and direct quotations.
8. **Media care:** Kept participant messages, images, video, and thumbnails out
   of publication pending privacy, rights, and consent review.
9. **Composition:** Retained the accomplishment in the historical bank without
   increasing the current hiring site's reading burden.

## Verification

- `npm run test:knowledge-lifecycle`: 29/29 tests pass.
- `npm run generate:citations`: public registry remains current and redacted.
- `npm run report:knowledge-lifecycle`: lifecycle report regenerated.
- `npm run check` on Node 26.5.0: citation validation and 10/10 tests,
  portfolio-eval validation and 8/8 tests, lifecycle validation and 29/29
  tests, TypeScript, ESLint, production build, knowledge-bank checks,
  public-safety checks, and route checks pass.
- `npm run preflight:staging`: passes with explicit noindex policy.
- `npm run preflight:production`: passes with explicit index policy.
- `git diff --check`: passes.
- Public-safety diff review: no local archive paths, participant messages,
  private records, downloaded captures, video, thumbnails, or images are
  included.
