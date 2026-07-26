import Image from "next/image";
import Link from "next/link";
import { portfolioPhotos } from "@/data/photography";

export function Hero() {
  const photo = portfolioPhotos.eastRiver;

  return (
    <section aria-labelledby="home-title" className="jb-hero">
      <div className="jb-hero-image">
        <Image
          alt={photo.alt}
          className="object-cover object-[68%_center] sm:object-center"
          fill
          priority
          sizes="100vw"
          src={photo.src}
        />
      </div>
      <div className="jb-frame jb-hero-content">
        <div className="jb-hero-copy">
          <p className="jb-eyebrow text-white/90">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1
            className="mt-5 font-display text-5xl leading-none text-white sm:text-7xl"
            id="home-title"
          >
            Jamie Burkart
          </h1>
          <p className="mt-6 max-w-3xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
            I create operating structure for complex public-facing teams.
          </p>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-white/90 sm:text-xl">
            I listen for what the work needs, translate it into requirements,
            workflows, tools, and decision records, support implementation, and
            leave people able to continue.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center bg-white px-4 py-3 text-sm font-semibold text-jb-ink hover:bg-jb-sky sm:px-5 sm:text-base"
              href="/work"
            >
              View selected work
            </Link>
            <Link
              className="inline-flex min-h-11 items-center border border-white/80 px-4 py-3 text-sm font-semibold text-white hover:bg-white hover:text-jb-ink sm:px-5 sm:text-base"
              href="/resume"
            >
              View resume
            </Link>
          </div>
        </div>
      </div>
      <p className="jb-hero-caption">
        <span>{photo.caption}</span>{" "}
        <span className="jb-hero-credit">{photo.credit}</span>
      </p>
    </section>
  );
}
