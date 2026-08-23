import Link from "next/link";
import { FieldPhoto } from "@/components/FieldPhoto";
import { ResponsiveMedia } from "@/components/ResponsiveMedia";
import { portfolioPhotos } from "@/data/photography";

const fairRentPublicSurface = {
  src: "/artifacts/fair-rent-nyc/public-site.png",
  width: 1200,
  height: 800,
  alt: "FairRentNYC campaign homepage with a Commercial Rent Stabilization call to action and public reference library.",
  caption: "FairRentNYC public campaign surface, captured July 2026.",
  href: "https://fairrentnyc.nycartc.com/"
} as const;

export function HomeFieldSystemEvidence() {
  return (
    <section
      aria-labelledby="screen-room-title"
      className="border-y border-jb-ink/15 bg-jb-warm py-16"
    >
      <div className="jb-frame">
        <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
          <h2
            className="text-3xl leading-tight text-jb-ink sm:text-4xl"
            id="screen-room-title"
          >
            The system lives between the screen and the room
          </h2>
          <p className="max-w-3xl text-lg leading-8 text-jb-ink/78">
            A public tool is useful when it helps people enter, understand,
            decide, and continue. I build that connective tissue: the invitation
            and the meeting; the source map and the public action path; the
            digital surface and the handoff.
          </p>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:items-start">
          <div>
            <p className="jb-section-label mb-3">Field context</p>
            <FieldPhoto
              imageClassName="aspect-[3/2] object-cover"
              photo={portfolioPhotos.nycacShoestringFacilitation}
              sizes="(min-width: 768px) 58vw, 100vw"
            />
          </div>
          <figure className="m-0">
            <p className="jb-section-label mb-3">Public system</p>
            <a
              aria-label="View the FairRentNYC public site"
              className="block overflow-hidden bg-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-jb-blue"
              href={fairRentPublicSurface.href}
            >
              <ResponsiveMedia
                alt={fairRentPublicSurface.alt}
                className="aspect-[3/2] h-auto w-full object-cover object-top"
                height={fairRentPublicSurface.height}
                sizes="(min-width: 768px) 38vw, 100vw"
                src={fairRentPublicSurface.src}
                width={fairRentPublicSurface.width}
              />
            </a>
            <figcaption className="jb-photo-caption">
              <span>{fairRentPublicSurface.caption}</span>
              <a
                className="font-semibold text-jb-blue hover:text-jb-green"
                href={fairRentPublicSurface.href}
              >
                View the FairRentNYC site <span aria-hidden="true">↗</span>
              </a>
            </figcaption>
          </figure>
        </div>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            className="font-semibold text-jb-blue hover:text-jb-green"
            href="/work/technical-operations"
          >
            See role-fit evidence
          </Link>
          <Link
            className="font-semibold text-jb-blue hover:text-jb-green"
            href="/work/fair-rent-nyc"
          >
            See how the coalition system worked
          </Link>
        </div>
      </div>
    </section>
  );
}
