const moments = [
  {
    year: "2017",
    title: "Recurring participation",
    detail:
      "Meetings rotated through cultural spaces, pairing listening with practical safety, legal, and civic pathways."
  },
  {
    year: "2017",
    title: "Safety and public advocacy",
    detail:
      "Fire-code study groups and public testimony connected cultural-space experience with Cabaret Law and nightlife-policy debates."
  },
  {
    year: "2018-2019",
    title: "Public systems and accountability",
    detail:
      "Town halls, campaign sites, Council testimony, and Talks Not Raids carried community-defined problems into public process."
  },
  {
    year: "2020-2023",
    title: "Durable shared infrastructure",
    detail:
      "Collaborators continued using the coalition identity across relief, commercial-rent, and nightlife work; the longer accountability sequence reached the City's 2023 CURE change."
  }
];

export function NYCACOperatingTimeline() {
  return (
    <figure className="my-8 border-y border-jb-ink/15 py-6">
      <figcaption className="text-sm font-semibold uppercase text-jb-blue">
        Source-backed operating sequence
      </figcaption>
      <ol className="mt-5 grid gap-3 p-0 md:grid-cols-2">
        {moments.map((moment, index) => (
          <li
            className="list-none border-l-4 border-jb-ochre bg-jb-warm p-4"
            key={`${moment.year}-${moment.title}`}
          >
            <div className="flex items-baseline justify-between gap-4">
              <span className="text-xs font-semibold text-jb-blue">
                0{index + 1}
              </span>
              <span className="text-sm font-semibold text-jb-ink/66">
                {moment.year}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-jb-ink">
              {moment.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-jb-ink/76">
              {moment.detail}
            </p>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-sm leading-6 text-jb-ink/66">
        The sequence organizes public records; it does not assign sole causality
        for collective programs, legislation, or agency decisions.
      </p>
    </figure>
  );
}
