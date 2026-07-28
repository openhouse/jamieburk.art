import Image from "next/image";
import type { ReactNode } from "react";
import { JBCard } from "@/components/JBCard";
import { TagList } from "@/components/TagList";
import { publicSourcesById } from "@/data/knowledge-bank";
import type { WorkMeta } from "@/types/work";

export function AtAGlance({ item }: { item: WorkMeta }) {
  const rows = [
    ["Role", item.role],
    ["Years", item.years],
    ["Context", item.series],
    ["Status", item.status],
    ["Visibility", item.visibility],
    ["Role fit", item.roleFit]
  ];

  return (
    <section aria-labelledby="at-a-glance" className="rounded-lg bg-jb-blue p-5 text-jb-paper">
      <h2 className="text-xl font-semibold" id="at-a-glance">
        At a glance
      </h2>
      <dl className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-semibold uppercase text-jb-paper">
              {label}
            </dt>
            <dd className="mt-1 leading-6">{value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5">
        <p className="text-xs font-semibold uppercase text-jb-paper">
          Tags
        </p>
        <div className="mt-3">
          <TagList compact tags={item.tags} tone="inverted" />
        </div>
      </div>
    </section>
  );
}

export function ArtifactList({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="artifact-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-list">
        Primary artifacts
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2">
        {item.artifactTypes.map((artifact) => (
          <li
            className="rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-sm font-medium text-jb-ink"
            key={artifact}
          >
            {artifact}
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ArtifactGallery({ item }: { item: WorkMeta }) {
  return (
    <section aria-labelledby="artifact-gallery">
      <h2 className="text-2xl font-semibold text-jb-ink" id="artifact-gallery">
        Artifact gallery
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {item.artifacts.map((artifact, index) => {
          if (artifact.media) {
            return (
              <figure
                className="overflow-hidden rounded-lg border border-jb-ink/15 bg-jb-paper shadow-sm md:col-span-2"
                key={artifact.title}
              >
                <a className="block" href={artifact.media.href}>
                  <Image
                    alt={artifact.media.alt}
                    className={`aspect-[3/2] w-full ${
                      artifact.media.fit === "contain"
                        ? "bg-white object-contain"
                        : "object-cover object-top"
                    }`}
                    height={800}
                    sizes="(min-width: 768px) 66vw, 100vw"
                    src={artifact.media.src}
                    width={1200}
                  />
                </a>
                <figcaption className="border-t border-jb-ink/10 p-5">
                  <p className="text-xs font-semibold uppercase text-jb-blue">
                    {artifact.type} / 0{index + 1}
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-jb-ink">
                    {artifact.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-jb-ink/74">
                    {artifact.description}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-jb-ink/76">
                    {artifact.media.caption}
                  </p>
                  <a
                    className="mt-3 inline-block text-sm font-semibold text-jb-blue hover:text-jb-green"
                    href={artifact.media.href}
                  >
                    View {artifact.media.sourceLabel}
                  </a>
                </figcaption>
              </figure>
            );
          }

          return (
            <JBCard className="jb-artifact-surface min-h-56" key={artifact.title}>
              <p className="text-xs font-semibold uppercase text-jb-blue">
                {artifact.type} / 0{index + 1}
              </p>
              <h3 className="mt-10 text-xl font-semibold text-jb-ink">
                {artifact.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-jb-ink/72">
                {artifact.description}
              </p>
            </JBCard>
          );
        })}
      </div>
    </section>
  );
}

export function KnownOpenProtected({ item }: { item: WorkMeta }) {
  const blocks = [
    ["Known", item.knownOpenProtected.known],
    ["Open", item.knownOpenProtected.open],
    ["Protected", item.knownOpenProtected.protected]
  ] as const;

  return (
    <section aria-labelledby="scope-and-sources">
      <h2 className="text-2xl font-semibold text-jb-ink" id="scope-and-sources">
        Scope and sources
      </h2>
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {blocks.map(([label, text]) => (
          <JBCard key={label}>
            <h3 className="text-lg font-semibold text-jb-blue">{label}</h3>
            <p className="mt-3 text-sm leading-6 text-jb-ink/72">{text}</p>
          </JBCard>
        ))}
      </div>
      {item.sourceLayer ? (
        <p className="mt-5 max-w-4xl text-sm leading-6 text-jb-ink/72">
          <strong className="text-jb-ink">Source basis:</strong> {item.sourceLayer}
        </p>
      ) : null}
      {item.careNote || item.publicSafety?.note ? (
        <details className="mt-4 max-w-4xl border border-jb-ochre/60 bg-jb-lemon/20 px-4 py-3 text-sm text-jb-ink/76">
          <summary className="cursor-pointer font-semibold text-jb-blue">
            Claim and care limits
          </summary>
          <div className="mt-3 space-y-2 leading-6">
            {item.careNote ? <p>{item.careNote}</p> : null}
            {item.publicSafety?.note ? <p>{item.publicSafety.note}</p> : null}
          </div>
        </details>
      ) : null}
    </section>
  );
}

function NoteBlock({
  title,
  children,
  tone = "blue"
}: {
  title: string;
  children: ReactNode;
  tone?: "blue" | "green" | "ochre";
}) {
  const styles = {
    blue: "border-jb-blue/30 bg-jb-sky/15",
    green: "border-jb-green/30 bg-jb-green/[0.08]",
    ochre: "border-jb-ochre/50 bg-jb-lemon/25"
  }[tone];

  return (
    <section className={`rounded-lg border p-5 ${styles}`}>
      <h2 className="text-xl font-semibold text-jb-ink">{title}</h2>
      <div className="mt-3 text-sm leading-6 text-jb-ink/76">{children}</div>
    </section>
  );
}

export function CareNote({ item }: { item: WorkMeta }) {
  if (!item.careNote) return null;
  return (
    <NoteBlock title="Care note / limits" tone="ochre">
      <p>{item.careNote}</p>
    </NoteBlock>
  );
}

export function VisibilityNote({ item }: { item: WorkMeta }) {
  return (
    <NoteBlock title="Visibility" tone="blue">
      <p>
        This page is marked <strong>{item.visibility}</strong>. Current status:
        {" "}
        {item.currentStatus}
      </p>
    </NoteBlock>
  );
}

export function PublicSafetyNote({ item }: { item: WorkMeta }) {
  if (!item.publicSafety?.note) return null;
  return (
    <NoteBlock title="Public-safety note" tone="ochre">
      <p>{item.publicSafety.note}</p>
    </NoteBlock>
  );
}

export function SourceLayer({ item }: { item: WorkMeta }) {
  if (!item.sourceLayer) return null;
  return (
    <NoteBlock title="Source layer" tone="green">
      <p>{item.sourceLayer}</p>
    </NoteBlock>
  );
}

export function CreditsList({ item }: { item: WorkMeta }) {
  if (!item.credits?.length) return null;
  return (
    <section aria-labelledby="credits-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="credits-list">
        Credits
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-6 text-jb-ink/76">
        {item.credits.map((credit) => (
          <li key={credit}>{credit}</li>
        ))}
      </ul>
    </section>
  );
}

export function LinksList({ item }: { item: WorkMeta }) {
  if (!item.links?.length) return null;
  return (
    <section aria-labelledby="links-list">
      <h2 className="text-2xl font-semibold text-jb-ink" id="links-list">
        Public links
      </h2>
      <ul className="mt-3 flex flex-wrap gap-3 text-sm font-semibold">
        {item.links.map((link) => (
          <li key={link.url}>
            <a
              className="inline-flex rounded-lg border border-jb-ink/12 bg-jb-paper px-4 py-3 text-jb-blue hover:border-jb-blue/40 hover:text-jb-green"
              href={link.url}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

const hostingHandoffStages = [
  {
    label: "Observe",
    prompt: "What does this visit or gathering need in order to be possible?"
  },
  {
    label: "Model",
    prompt: "Name responsibilities, access conditions, and points of support."
  },
  {
    label: "Interface",
    prompt: "Prepare invitations, onboarding, arrival cues, and ways to ask for help."
  },
  {
    label: "Use and notice",
    prompt: "Record questions, friction, repeated needs, and what helped participation."
  },
  {
    label: "Revise",
    prompt: "What should change next time, and what remains open?"
  },
  {
    label: "Hand off",
    prompt: "Continue, revise, or stop. What does the next host need to know?"
  }
] as const;

export function HostingHandoffTemplate() {
  return (
    <section
      aria-labelledby="hosting-handoff-template"
      className="my-8 border border-jb-ink/25 bg-jb-paper"
    >
      <header className="border-b border-jb-ink/25 px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase text-jb-blue">
          Public-safe operating specimen
        </p>
        <h3
          className="mt-2 text-xl font-semibold text-jb-ink"
          id="hosting-handoff-template"
        >
          Hosting handoff template
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-jb-ink/76">
          A blank working sheet for turning attention into a repeatable, revisable
          practice of welcome.
        </p>
      </header>

      <ol className="grid list-none gap-px bg-jb-ink/20 p-0 sm:grid-cols-2">
        {hostingHandoffStages.map((stage, index) => (
          <li className="bg-jb-paper p-5 sm:p-6" key={stage.label}>
            <p className="text-xs font-semibold uppercase text-jb-blue">
              0{index + 1} / {stage.label}
            </p>
            <p className="mt-3 text-sm leading-6 text-jb-ink/82">{stage.prompt}</p>
            <div aria-hidden="true" className="mt-6 space-y-3">
              <div className="border-b border-jb-ink/20" />
              <div className="border-b border-jb-ink/20" />
            </div>
          </li>
        ))}
      </ol>

      <footer className="border-t border-jb-ink/25 bg-jb-mist px-5 py-4 text-xs leading-5 text-jb-ink/72 sm:px-6">
        <strong className="text-jb-ink">Publication boundary:</strong> This blank
        derivative never records names, contact information, attendance, addresses,
        access credentials, private correspondence, or unapproved images.
      </footer>
    </section>
  );
}

const sundayDinnerMilestoneSources = [
  publicSourcesById["SRC-FACEBOOK-SUNDAY-DINNER-100-2014"],
  publicSourcesById["SRC-FACEBOOK-SUNDAY-DINNER-200-2016"],
  publicSourcesById["SRC-NYCAC-GREENE-HILL-QA-2017-12-19"]
];

export function SundayDinnerEvidenceMap() {
  return (
    <section
      aria-labelledby="sunday-dinner-evidence-map"
      className="my-8 border border-jb-ink/25 bg-jb-paper"
    >
      <header className="border-b border-jb-ink/25 px-5 py-4 sm:px-6">
        <p className="text-xs font-semibold uppercase text-jb-blue">
          Inspectable proof map
        </p>
        <h3
          className="mt-2 text-xl font-semibold text-jb-ink"
          id="sunday-dinner-evidence-map"
        >
          Recurrence, operating form, and handoff
        </h3>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-jb-ink/76">
          Three bounded records let a reader reconstruct how a living social
          practice became repeatable without exposing the people who inhabited it.
        </p>
      </header>

      <ol className="grid list-none gap-px bg-jb-ink/20 p-0 lg:grid-cols-3">
        <li className="bg-jb-paper p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase text-jb-blue">
            01 / Recurring public use
          </p>
          <h4 className="mt-3 text-lg font-semibold text-jb-ink">
            100th and 200th milestone records
          </h4>
          <p className="mt-3 text-sm leading-6 text-jb-ink/76">
            Public event pages from 2014 and 2016 show the practice returning
            through time. A 2017 community profile separately describes Jamie
            and Julia hosting weekly dinners open to the community and using
            WOW List for community-event publishing.
          </p>
          <ul className="mt-4 space-y-2 text-sm font-semibold text-jb-blue">
            {sundayDinnerMilestoneSources.map((source) => (
              <li key={source.id}>
                <a href={source.canonicalUrl}>{source.title}</a>
              </li>
            ))}
          </ul>
        </li>

        <li className="bg-jb-paper p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase text-jb-blue">
            02 / Residency handoff
          </p>
          <h4 className="mt-3 text-lg font-semibold text-jb-ink">
            Governed 2023 workflow
          </h4>
          <p className="mt-3 text-sm leading-6 text-jb-ink/76">
            A protected acceptance record supports a public-safe sequence:
            proposal review, video-call onboarding, configuring the space around
            an artist&apos;s needs, and independent access for the resident and a
            collaborator.
          </p>
          <ol className="mt-4 border-y border-jb-ink/15 text-sm">
            {[
              ["01", "Proposal review", "acceptance and open questions"],
              ["02", "Orientation", "video-call onboarding"],
              ["03", "Configuration", "space shaped around the practice"],
              ["04", "Access handoff", "independent resident access"]
            ].map(([number, label, value]) => (
              <li
                className="grid grid-cols-[2rem_0.8fr_1.2fr] gap-2 border-b border-jb-ink/15 py-2 last:border-b-0"
                key={number}
              >
                <span className="text-xs font-semibold text-jb-red">{number}</span>
                <strong className="text-jb-ink">{label}</strong>
                <span className="text-jb-ink/70">{value}</span>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-xs leading-5 text-jb-ink/68">
            The person, correspondence, dates, location, and access details stay
            private. The record proves a documented handoff, not an artistic
            outcome or a universal residency procedure.
          </p>
        </li>

        <li className="bg-jb-paper p-5 sm:p-6">
          <p className="text-xs font-semibold uppercase text-jb-blue">
            03 / Recurring operations
          </p>
          <h4 className="mt-3 text-lg font-semibold text-jb-ink">
            Governed 2025 operating schema
          </h4>
          <p className="mt-3 text-sm leading-6 text-jb-ink/76">
            A later working sheet organizes dates and themes, invitations,
            response status, attendance, and follow-up across recurring
            gatherings. Only the field structure informs this public account.
          </p>
          <dl className="mt-4 grid grid-cols-2 gap-px border border-jb-ink/15 bg-jb-ink/15 text-sm">
            {[
              ["Gathering", "date and theme"],
              ["Invitation", "outreach state"],
              ["Response", "reply state"],
              ["Attendance", "private field"],
              ["Follow-up", "next action"],
              ["Review", "what changes next"]
            ].map(([label, value]) => (
              <div className="bg-jb-paper p-3" key={label}>
                <dt className="text-xs font-semibold uppercase text-jb-blue">
                  {label}
                </dt>
                <dd className="mt-1 text-jb-ink/70">{value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-xs leading-5 text-jb-ink/68">
            No participant row, contact detail, private response, or attendance
            value enters the site. The schema shows an operating interface, not
            consent, endorsement, or a causal revision history.
          </p>
        </li>
      </ol>

      <footer className="border-t border-jb-ink/25 bg-jb-mist px-5 py-4 text-sm leading-6 text-jb-ink/74 sm:px-6">
        Together these records make recurring social use, interface design, and
        handoff inspectable. The blank specimen below shows the review questions
        that keep the method revisable; it is a derivative, not a private record.
      </footer>
    </section>
  );
}
