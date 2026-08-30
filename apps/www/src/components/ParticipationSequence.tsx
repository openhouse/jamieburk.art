import { FieldPhoto } from "@/components/FieldPhoto";
import { ResponsiveMedia } from "@/components/ResponsiveMedia";
import { portfolioPhotos } from "@/data/photography";

const operatingMoves = [
  ["Align", "Make the shared question and decision visible."],
  ["Translate", "Turn policy and public data into a clear action path."],
  ["Implement", "Build one maintained surface people can use together."],
  ["Sustain", "Carry context across the room, list, sources, and follow-up."]
] as const;

export function ParticipationSequence() {
  const shoestring = portfolioPhotos.nycacShoestringFacilitation;
  const marketHotel = portfolioPhotos.nycacMarketHotelBanner;

  return (
    <section
      aria-labelledby="participation-sequence-title"
      className="not-prose my-12 border-y border-jb-ink/18 py-10"
    >
      <div className="grid gap-5 lg:grid-cols-[0.34fr_0.66fr] lg:items-end">
        <p className="jb-section-label">Public systems / lived participation</p>
        <div>
          <h2
            className="text-3xl font-semibold leading-tight text-jb-ink sm:text-4xl"
            id="participation-sequence-title"
          >
            The website was one part of the room
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-jb-ink/76">
            A shared public surface, a facilitated working session, and a civic
            gathering are three interfaces to the same operating challenge:
            help many people understand the work, coordinate, and participate.
          </p>
        </div>
      </div>

      <div className="mt-8 grid gap-7 lg:grid-cols-2 lg:items-start">
        <figure className="border border-jb-ink/15 bg-jb-paper">
          <a className="block" href="https://letnycdance.nycartc.com/">
            <ResponsiveMedia
              alt="Let NYC Dance campaign homepage announcing the Cabaret Law repeal, naming the grassroots coalition, and playing the mayoral bill-signing video."
              className="aspect-[8/5] w-full object-cover object-top"
              height={900}
              sizes="(min-width: 1024px) 50vw, 100vw"
              src="/artifacts/fair-rent-nyc/let-nyc-dance-public-surface.webp"
              width={1440}
            />
          </a>
          <figcaption className="border-t border-jb-ink/12 p-5">
            <p className="jb-section-label">01 / Shared public surface</p>
            <p className="mt-3 text-sm leading-6 text-jb-ink/76">
              LetNYCDance.com joined an issue explainer, Council contact path,
              public data, progress, coalition credit, and source links in one
              action-oriented campaign interface. The embedded video is shown
              during the mayoral bill signing; this frame was selected from a
              ten-second opening study after the player controls cleared.
              Captured August 13, 2026.
            </p>
          </figcaption>
        </figure>

        <div>
          <p className="jb-section-label mb-3">02 / Working alignment</p>
          <FieldPhoto
            imageClassName="aspect-[3/2]"
            photo={shoestring}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
          <p className="mt-4 text-sm leading-6 text-jb-ink/72">
            Jamie recalls this coalition meeting as the point when participating
            groups aligned around a shared campaign site and email list. The
            retained web histories separately establish his implementation and
            maintenance of the campaign infrastructure; the policy outcome and
            movement remain collective.
          </p>
        </div>
      </div>

      <div className="mt-10">
        <p className="jb-section-label mb-3">03 / The public room</p>
        <FieldPhoto
          imageClassName="aspect-[2400/1483]"
          photo={marketHotel}
          sizes="(min-width: 1280px) 1240px, 100vw"
        />
      </div>

      <ol className="mt-9 grid border-t border-jb-ink/18 sm:grid-cols-2 lg:grid-cols-4">
        {operatingMoves.map(([title, description], index) => (
          <li
            className="border-b border-jb-ink/18 py-5 sm:px-5 sm:odd:border-r lg:border-r lg:last:border-r-0"
            key={title}
          >
            <p className="font-label text-xs font-semibold text-jb-blue">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-jb-ink">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-jb-ink/72">{description}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
