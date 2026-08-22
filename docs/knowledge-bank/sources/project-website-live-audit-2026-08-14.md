---
id: source.project-websites.live-audit.2026-08-14
title: Live project-website audit and restored-surface close reading
kind: source
source_kind: public-web-audit
status: maintained
visibility: public-safe
sensitivity: low
last_reviewed: 2026-08-14
review_by: 2026-09-14
canonical_path: docs/knowledge-bank/sources/project-website-live-audit-2026-08-14.md
summary: Dated rendered-page and HTTP audit of the three restored sites and the broader tracked project-site inventory, with currentness and implementation credit kept separate.
relations:
  - type: related_to
    target: project.kc-town-hall
    href: ../projects/kc-town-hall-orientation.md
  - type: related_to
    target: project.wowlist
    href: ../projects/wowlist-orientation.md
  - type: related_to
    target: project.callnyc
    href: ../projects/callnyc.md
---

# Live project-website audit and restored-surface close reading

**Audit time:** August 14, 2026, 21:57 UTC
**Method:** Rendered Chromium close reading of KC Town Hall, WOW List, and
CallNYC after page load and stabilization; internal-link sampling from each
homepage; and direct HTTP checks of every tracked public project URL. A `200`
response establishes reachability at the audit time. It does not establish
that a service is current, every dependency works, the content is complete, or
Jamie individually authored the surface.

The machine-readable state of record is
[`project-website-live-inventory-2026-08-14.json`](../data/project-website-live-inventory-2026-08-14.json).

## Count and attribution boundary

At the audit time, **10 distinct project websites** in the tracked knowledge
wiki ecosystem returned HTTP `200`. **Eight** have direct source-backed
evidence of Jamie's implementation, co-build, or bounded web-infrastructure
work. KC Town Hall is retained as a shared project surface without page-level
individual authorship, and Save NYC Spaces remains an open individual-site
implementation inquiry. Jamie's portfolio is an eleventh live associated web
property, counted separately because it is not one of the project sites.

| Project site | Public state at audit | Jamie relationship state | Currentness / credit boundary |
| --- | --- | --- | --- |
| [Harry J. Epstein Company](https://www.harryepstein.com/) | Live current site | Direct web-systems evidence | Does not assign sole authorship of every page or business outcome. |
| [NYC Artist Coalition](https://nycartc.com/) | Live current coalition site | Direct repository-level implementation | Coalition positions, content, participation, and outcomes remain collective. |
| [FairRentNYC](https://fairrentnyc.nycartc.com/) | Live current campaign site | Direct repository-level implementation | Web implementation is not sole campaign or policy authorship. |
| [Talks Not Raids](https://talksnotraids.com/) | Live historical campaign site | Direct repository-level implementation | Surviving content is not proof every condition remains current. |
| [Let NYC Dance](https://letnycdance.nycartc.com/) | Live historical campaign site | Direct repository-level implementation | Implementation is one contribution inside collective repeal work. |
| [CallNYC](https://callnyc.org/) | Live archived prototype | Direct implementation | Unofficial and non-current; historical contacts are not current resident guidance. |
| [WOW List](https://wowlist.org/) | Live noindex tester threshold | Direct shared co-build evidence | Jamie and Richard Caceres co-built the platform; this is not the restored community calendar. |
| [KC Spaces Fund](https://kcspacesfund.com/) | Live historical campaign site | Direct bounded web-infrastructure evidence | Does not establish organizer, publisher, grantmaker, or fundraising authority. |
| [KC Town Hall](https://kctownhall.com/) | Live restored historical project site | Shared project context | Jamie's project role is documented; page-level authorship is not. Historical pickup dates are not a current service schedule. |
| [Save NYC Spaces](https://savenycspaces.nycartc.com/) | Live historical coalition campaign | Individual implementation open | Coalition campaign and Jamie's public role are documented; site implementation credit remains open. |

Separately, [jamieburk.art](https://jamieburk.art/) returned `200` as Jamie's
portfolio. NTER CHNG's former domain did not resolve and remains archive-only.
No standalone current URL is presently recorded for Office of Nightlife Town
Halls, Sunday Dinner / 196 Artists Residency, or Waterways.

## KC Town Hall close reading

The restored homepage presents the building itself as the central public
object: a full-width photograph of the structure gives way to a hand-drawn
future storefront, an invitation to join, and a sequence of concrete project
and service entries. COVID-19 relief, Tired of Tires, the neighborhood survey,
hoops, temporary electricity, and dumped-paint reporting make the site read as
a neighborhood point of contact rather than only a real-estate prospectus.

The most useful portfolio connection is between the public interface and the
field practice it coordinated. The Tired of Tires page preserves the recurring
service design, while the survey page and proposal imagery show how encounters
could become planning inputs. That makes the site strong evidence of a
resident-facing service and listening surface. It does not establish that
pickup continues now. The page still displays 2022 dates and a historical
savings statement, so any portfolio link must frame the site as restored
historical evidence rather than current scheduling information.

All ten sampled internal routes returned `200`, and the homepage produced no
console or request errors in the audit. The homepage had no semantic `h1`, its
canonical and sitemap references used `http`, and some deeper pages retained
old font or video dependencies. The project is indexable. Historical personal
contact details visible on the restored site are not reproduced in this wiki.

## WOW List close reading

The landing page has a concise, recognizable proposition: “Being there changes
everything,” followed by a simple way to find and share real-life things to do.
The hero image and historical wordmark make the return feel continuous with
the project's earlier identity. The purpose-limited tester invitation is
explicit about what an email address is for, which gives the small surface an
unusually clear consent boundary.

The About page supplies the relational origin that the landing page only
implies: WOW List grew from calendars at Sunday Dinner, was co-built by Richard
Caceres and Jamie Burkart, and connected members across nine cities. “Find
life in the wild” and “coming back, one step at a time” make the present state
legible as a deliberate return rather than a false claim that the full
calendar has already resumed.

The site is intentionally noindex through an HTTP `X-Robots-Tag` and a
disallowing `robots.txt`. It is therefore a live tester threshold, not a public
search launch. The audit found no material page-load error; three aborted Next
prefetch requests were non-blocking. One image lacked an `alt` attribute and
the compact surface could benefit from explicit navigation and footer
landmarks before a broader launch.

## CallNYC close reading

CallNYC opens with the necessary boundary: “Archived project demo (snapshot).
Not official, not current.” Under that label, the restored interface still
makes its product decision visible. A resident can begin with a recognizable
issue category, move into a public-service pathway, and see district-office
context without first learning the structure of the CouncilStat dataset. The
taxonomy and office profiles remain a strong example of translating
administrative records into a legible resident-facing product.

Twelve sampled internal issue and project pages returned `200`. The interface
also shows visible archive decay: 49 images lacked `alt` attributes, old
`http://fonts.googleapis.com` calls were blocked as mixed content, and some
portrait or map dependencies no longer resolved. The original information
architecture survives, but those dependencies should be treated as an archive
maintenance backlog rather than silently mistaken for a fully current service.

The site is indexable by default because `/robots.txt` currently falls through
to homepage HTML rather than serving a robots policy. Historical officeholder
names, statistics, categories, and telephone numbers remain archival content,
not present-day resident guidance. The portfolio should link to the site only
with “archived,” “unofficial,” and “not current” close at hand.

## Editorial rule for direct project links

Link a project name directly when the destination adds useful, public-safe
evidence and the label communicates its state. Current project surfaces can use
the project name. Historical or bounded surfaces should use labels such as
“Visit archived CallNYC” or “Restored KC Town Hall site.” Keep an internal case
study as the primary route when it carries essential attribution, currentness,
privacy, or collective-credit context that the project site does not.

Recheck reachability, currentness, and authorship independently. A successful
HTTP response cannot update a current-service claim, and a public project URL
cannot resolve individual authorship by itself.
