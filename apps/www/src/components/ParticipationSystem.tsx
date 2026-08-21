import { MediaImage } from "@/components/MediaImage";
import { participationMedia } from "@/data/participationMedia";
import type { ParticipationMedia } from "@/data/participationMedia";

function EvidenceFigure({
  eager = false,
  media,
  imageClassName = "",
  sizes
}: {
  eager?: boolean;
  media: ParticipationMedia;
  imageClassName?: string;
  sizes: string;
}) {
  const image = (
    <MediaImage
      alt={media.alt}
      className={`h-auto w-full bg-jb-paper object-cover ${imageClassName}`}
      height={media.height}
      loading={eager ? "eager" : "lazy"}
      sizes={sizes}
      src={media.src}
      width={media.width}
    />
  );

  return (
    <figure className="m-0">
      <div className="overflow-hidden bg-jb-paper">
        {media.href ? (
          <a
            aria-label={`View source for ${media.caption}`}
            className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-jb-blue"
            href={media.href}
          >
            {image}
          </a>
        ) : (
          image
        )}
      </div>
      <figcaption className="jb-photo-caption">
        <span className="max-w-2xl">{media.caption}</span>
        <span>{media.credit}</span>
      </figcaption>
    </figure>
  );
}

export function ParticipationSystem() {
  const shoestring = participationMedia.shoestringFacilitation;
  const campaign = participationMedia.letNycDanceSurface;
  const townHall = participationMedia.marketHotelTownHall;

  return (
    <section
      aria-labelledby="participation-system-title"
      className="not-prose my-14 border-y border-jb-ink/20 py-10"
      data-testid="participation-system"
    >
      <div className="max-w-3xl">
        <h2
          className="text-3xl font-semibold leading-tight text-jb-ink sm:text-4xl"
          id="participation-system-title"
        >
          From the room to the public surface
        </h2>
        <p className="mt-4 text-lg leading-8 text-jb-ink/78">
          The operating system moved between facilitated meetings, a shared
          public interface, and collective moments where people could see and
          join the work. Jamie helped produce that sequence and implemented the
          campaign surfaces that carried it.
        </p>
      </div>

      <div className="mt-10 grid items-start gap-6 md:grid-cols-[minmax(0,1.45fr)_minmax(15rem,0.55fr)]">
        <EvidenceFigure
          media={shoestring}
          sizes="(min-width: 1024px) 48vw, (min-width: 768px) 55vw, 100vw"
        />
        <div className="border-t-4 border-jb-green pt-4 md:mt-12">
          <h3 className="text-2xl font-semibold text-jb-ink">
            Facilitate the room
          </h3>
          <p className="mt-3 leading-7 text-jb-ink/76">
            Listening became visible, priorities could be compared, and groups
            could find the work they were prepared to share.
          </p>
        </div>
      </div>

      <div className="my-10 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-jb-ink/20" />
        <span className="h-2 w-2 rotate-45 bg-jb-ochre" />
        <span className="h-px flex-1 bg-jb-ink/20" />
      </div>

      <div className="grid items-end gap-6 md:grid-cols-[minmax(15rem,0.58fr)_minmax(0,1.42fr)]">
        <div className="order-2 border-t-4 border-jb-blue pt-4 md:order-1 md:mb-12">
          <h3 className="text-2xl font-semibold text-jb-ink">
            Build the shared surface
          </h3>
          <p className="mt-3 leading-7 text-jb-ink/76">
            Jamie implemented and maintained public campaign websites that
            turned decisions into legible invitations, resources, and calls to
            action.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <EvidenceFigure
            imageClassName="object-top"
            media={campaign}
            sizes="(min-width: 1024px) 48vw, (min-width: 768px) 55vw, 100vw"
          />
        </div>
      </div>

      <div className="my-10 flex items-center gap-4" aria-hidden="true">
        <span className="h-px flex-1 bg-jb-ink/20" />
        <span className="h-2 w-2 rotate-45 bg-jb-ochre" />
        <span className="h-px flex-1 bg-jb-ink/20" />
      </div>

      <div>
        <EvidenceFigure
          eager
          imageClassName="object-center"
          media={townHall}
          sizes="(min-width: 1024px) 65vw, 100vw"
        />
        <div className="ml-auto mt-6 max-w-2xl border-t-4 border-jb-ochre pt-4">
          <h3 className="text-2xl font-semibold text-jb-ink">
            Make participation public
          </h3>
          <p className="mt-3 leading-7 text-jb-ink/76">
            At the town hall, the interface met the room: artists,
            cultural-space workers, residents, and public leaders could see the
            coalition and its shared asks. Being there changed what the system
            could make possible.
          </p>
        </div>
      </div>
    </section>
  );
}
