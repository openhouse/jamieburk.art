type EvidenceMeasure = {
  value: string;
  label: string;
};

function EvidenceFigure({
  eyebrow,
  title,
  measures,
  caption
}: {
  eyebrow: string;
  title: string;
  measures: EvidenceMeasure[];
  caption: string;
}) {
  return (
    <figure className="my-8 border-y border-jb-ink/15 py-6">
      <p className="type-label text-jb-blue">{eyebrow}</p>
      <h3 className="mt-2 type-heading text-2xl text-jb-ink">{title}</h3>
      <dl className="mt-5 grid gap-px bg-jb-ink/15 sm:grid-cols-3">
        {measures.map((measure) => (
          <div key={measure.label} className="bg-jb-paper px-4 py-5">
            <dt className="type-body text-sm text-jb-ink/70">{measure.label}</dt>
            <dd className="mt-2 type-heading text-3xl text-jb-green">{measure.value}</dd>
          </div>
        ))}
      </dl>
      <figcaption className="mt-4 max-w-3xl type-body text-sm leading-6 text-jb-ink/70">
        {caption}
      </figcaption>
    </figure>
  );
}

export function WowlistArchiveSnapshot() {
  return (
    <EvidenceFigure
      eyebrow="July 2017 production snapshot"
      title="Recorded platform scale"
      measures={[
        { value: "1,800+", label: "users" },
        { value: "16,000+", label: "post and event records" },
        { value: "~35", label: "city ecosystems with activity" }
      ]}
      caption="Source: the public-safe WOW List production archive. These are bounded historical corpus measures, not claims that Jamie individually produced every record or caused adoption in every city."
    />
  );
}

export function SundayDinnerOperationsFigure() {
  return (
    <EvidenceFigure
      eyebrow="Protected-record structural review"
      title="A recurring practice left an operating record"
      measures={[
        { value: "2012-21", label: "ledger span" },
        { value: "345", label: "prefixed event columns" },
        { value: "2023", label: "documented residency onboarding template" }
      ]}
      caption="Source: public-safe structural findings from protected project records. The 345 columns support sustained operations; repeated prefixes mean they are not 345 audited, unique, or independently confirmed gatherings. No participant-level data is published."
    />
  );
}
