import { GovernedImage } from "@/components/GovernedImage";
import Link from "next/link";
import { FieldPhoto } from "@/components/FieldPhoto";
import { portfolioPhotos } from "@/data/photography";

type FieldSystemEvidenceProps = {
  variant: "home" | "fair-rent";
};

const evidence = {
  home: {
    photo: portfolioPhotos.saveNYCSpacesTownHall,
    heading: "The system lives between the screen and the room",
    body:
      "A public tool is useful when it helps people enter, understand, decide, and continue. I build that connective tissue: the invitation and the meeting; the source map and the public action path; the digital surface and the handoff.",
    screenshot: {
      src: "/artifacts/fair-rent-nyc/public-site.png",
      width: 1200,
      height: 800,
      alt: "FairRentNYC campaign homepage with a Commercial Rent Stabilization call to action and public reference library.",
      caption: "FairRentNYC public campaign surface, captured July 2026.",
      href: "https://fairrentnyc.nycartc.com/",
      label: "View the FairRentNYC site"
    }
  },
  "fair-rent": {
    photo: portfolioPhotos.coalitionFacilitationShoestring,
    heading: "Shared infrastructure turns a meeting into momentum",
    body:
      "The field work and the technical work are one practice: make the conversation visible, give participants a common public surface, and leave behind a path that others can keep using.",
    screenshot: {
      src: "/artifacts/fair-rent-nyc/let-nyc-dance-site.png",
      width: 1200,
      height: 713,
      alt: "Let NYC Dance campaign homepage announcing repeal of New York City's Cabaret Law and crediting the participating coalition groups.",
      caption:
        "Let NYC Dance public campaign surface, captured August 2026. The campaign and policy outcome were collective.",
      href: "https://letnycdance.nycartc.com/",
      label: "View the Let NYC Dance site"
    }
  }
} as const;

function EvidenceContent({ variant }: FieldSystemEvidenceProps) {
  const item = evidence[variant];

  return (
    <div>
      <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
        <h2 className="text-3xl leading-tight text-jb-ink sm:text-4xl">
          {item.heading}
        </h2>
        <p className="max-w-3xl text-lg leading-8 text-jb-ink/78">{item.body}</p>
      </div>
      <div className="mt-8 grid gap-8 md:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] md:items-start">
        <div>
          <p className="jb-section-label mb-3">Field context</p>
          <FieldPhoto
            imageClassName="aspect-[3/2] object-cover"
            photo={item.photo}
            sizes="(min-width: 768px) 58vw, 100vw"
          />
        </div>
        <figure className="m-0">
          <p className="jb-section-label mb-3">Public system</p>
          <a
            aria-label={item.screenshot.label}
            className="block overflow-hidden bg-white outline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-jb-blue"
            href={item.screenshot.href}
          >
            <GovernedImage
              alt={item.screenshot.alt}
              className="aspect-[3/2] h-auto w-full object-cover object-top"
              height={item.screenshot.height}
              sizes="(min-width: 768px) 38vw, 100vw"
              src={item.screenshot.src}
              width={item.screenshot.width}
            />
          </a>
          <figcaption className="jb-photo-caption">
            <span>{item.screenshot.caption}</span>
            <a
              className="font-semibold text-jb-blue hover:text-jb-green"
              href={item.screenshot.href}
            >
              {item.screenshot.label} <span aria-hidden="true">↗</span>
            </a>
          </figcaption>
        </figure>
      </div>
      {variant === "home" ? (
        <Link
          className="mt-6 inline-block font-semibold text-jb-blue hover:text-jb-green"
          href="/work/fair-rent-nyc"
        >
          See how the coalition system worked
        </Link>
      ) : null}
    </div>
  );
}

export function FieldSystemEvidence({ variant }: FieldSystemEvidenceProps) {
  if (variant === "home") {
    return (
      <section className="border-y border-jb-ink/15 bg-jb-warm py-16">
        <div className="jb-frame">
          <EvidenceContent variant={variant} />
        </div>
      </section>
    );
  }

  return (
    <section className="not-prose my-12 border-y border-jb-ink/15 py-10">
      <EvidenceContent variant={variant} />
    </section>
  );
}
