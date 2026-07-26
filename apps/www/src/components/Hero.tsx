import Image from "next/image";
import { JBButton } from "@/components/JBButton";
import { photos } from "@/data/photography";

export function Hero() {
  const photo = photos.councilChamber;

  return (
    <section
      className="jb-home-hero border-b-4 jb-rule"
      data-derivative-id={photo.derivativeId}
      data-placement-id={photo.placementIds?.[0]}
      data-wiki-id={photo.wikiId}
    >
      <Image
        alt={photo.alt}
        className="object-cover"
        fill
        priority
        sizes="100vw"
        src={photo.src}
        style={{ objectPosition: photo.objectPosition }}
      />
      <div className="jb-frame relative z-10 flex h-full">
        <div className="jb-home-hero-copy">
          <p className="jb-eyebrow text-jb-blue">
            Technical Project Manager / Product Operations / Implementation
          </p>
          <h1 className="mt-5 text-5xl font-bold leading-none text-jb-ink sm:text-6xl">
            Jamie Burkart
          </h1>
          <p className="mt-5 text-2xl font-semibold leading-snug text-jb-green">
            I create operating structure for complex public-facing teams.
          </p>
          <p className="mt-4 max-w-xl text-lg leading-8 text-jb-ink/82">
            Emerging work becomes requirements, workflows, documentation,
            decision trails, launch support, onboarding, and durable handoffs.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <JBButton href="/work/technical-operations">
              See technical operations
            </JBButton>
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
          </div>
          <p className="mt-5 text-sm font-medium text-jb-ink/68">
            Brooklyn, New York / Civic technology / Knowledge systems /
            Public-facing tools
          </p>
        </div>
      </div>
      <p className="absolute bottom-3 right-4 z-10 hidden bg-white/90 px-2 py-1 text-xs text-jb-ink/72 md:block">
        {photo.caption} / {photo.archiveLabel}
      </p>
    </section>
  );
}
