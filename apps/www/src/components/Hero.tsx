import Image from "next/image";
import { JBButton } from "@/components/JBButton";
import { photos } from "@/data/photography";

export function Hero() {
  return (
    <>
      <section className="jb-home-hero">
        <Image
          alt={photos.raftDeltaQueen.alt}
          className="object-cover"
          fill
          priority
          sizes="100vw"
          src={photos.raftDeltaQueen.src}
          style={{ objectPosition: photos.raftDeltaQueen.objectPosition }}
        />
        <div aria-hidden="true" className="jb-home-hero-overlay" />
        <div className="jb-frame relative z-10 flex h-full items-end pb-8 pt-20 md:pb-12">
          <div className="max-w-3xl text-white">
            <p className="jb-eyebrow text-white/88">
              Technical Project Manager / Product Operations / Implementation
            </p>
            <h1 className="mt-4 text-5xl font-bold leading-none sm:text-6xl">
              Jamie Burkart
            </h1>
            <p className="mt-5 max-w-2xl text-2xl font-semibold leading-snug text-white">
              I create operating structure for complex public-facing teams.
            </p>
            <p className="mt-4 max-w-2xl text-lg leading-7 text-white/88 sm:text-xl sm:leading-8">
              I turn ambiguous, stakeholder-heavy work into usable systems,
              shared memory, public tools, and durable handoffs.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <JBButton href="/work">View selected work</JBButton>
              <JBButton href="/resume" variant="inverted">
                View resume
              </JBButton>
            </div>
          </div>
        </div>
      </section>
      <div className="jb-home-hero-context">
        <div className="jb-frame">
          <p>{photos.raftDeltaQueen.caption}</p>
          <p className="jb-home-hero-credit">{photos.raftDeltaQueen.credit}</p>
        </div>
      </div>
    </>
  );
}
