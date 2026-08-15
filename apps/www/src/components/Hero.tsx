import Image from "next/image";
import Link from "next/link";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

export function Hero() {
  const photo = portfolioPhotos.eastRiver;

  return (
    <section className="jb-hero" aria-labelledby="home-title">
      <div className="jb-hero-image">
        <Image
          alt={photo.alt}
          className="object-cover object-[73%_center] sm:object-center"
          fill
          priority
          sizes="100vw"
          src={photo.src}
        />
      </div>
      <div className="jb-frame jb-hero-content">
        <div>
          <p className="jb-eyebrow text-white/82">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1
            className="mt-5 font-display text-6xl font-medium leading-[0.96] text-white sm:text-7xl"
            id="home-title"
          >
            Jamie Burkart
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {site.heroTagline}
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/84 sm:text-xl">
            I work with public-facing teams to clarify requirements, build
            workflows and tools, carry context through implementation, and
            leave behind documentation people can use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center bg-white px-5 py-3 font-semibold text-jb-ink hover:bg-jb-sky"
              href="/work"
            >
              View selected work
            </Link>
            <Link
              className="inline-flex min-h-11 items-center border border-white/70 px-5 py-3 font-semibold text-white hover:bg-white hover:text-jb-ink"
              href="/resume"
            >
              View resume
            </Link>
          </div>
        </div>
      </div>
      <p className="jb-hero-caption">
        <span className="block">{photo.caption}</span>
        <span className="mt-1 block text-white/92">{photo.credit}</span>
      </p>
    </section>
  );
}
