import Link from "next/link";
import { MediaImage } from "@/components/MediaImage";
import { homeIdentity } from "@/data/home-identity";
import { portfolioPhotos } from "@/data/photography";

export function Hero() {
  const photo = portfolioPhotos.eastRiver;

  return (
    <section className="jb-hero" aria-labelledby="home-title">
      <div className="jb-hero-image">
        <MediaImage
          alt={photo.alt}
          className="object-cover object-[73%_center] sm:object-center"
          fill
          priority
          sizes="100vw"
          src={photo.src}
        />
      </div>
      <div className="jb-frame jb-hero-content">
        <div className="jb-hero-copy">
          <p className="jb-eyebrow text-white/82">
            {homeIdentity.role}
          </p>
          <h1
            className="mt-4 font-identity text-5xl font-normal leading-[0.96] text-white sm:mt-5 sm:text-7xl"
            id="home-title"
          >
            {homeIdentity.name}
          </h1>
          <p className="mt-4 max-w-2xl text-2xl font-semibold leading-snug text-white sm:mt-6 sm:text-3xl">
            {homeIdentity.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-white/84 sm:mt-5 sm:text-xl sm:leading-8">
            I clarify requirements, build workflows and tools, carry context
            through implementation, and leave documentation people can use.
          </p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            <Link
              className="inline-flex min-h-11 items-center bg-white px-4 py-3 font-semibold text-jb-ink hover:bg-jb-sky sm:px-5"
              href="/work/technical-operations"
            >
              See role-fit evidence
            </Link>
            <Link
              className="inline-flex min-h-11 items-center border border-white/70 px-4 py-3 font-semibold text-white hover:bg-white hover:text-jb-ink sm:px-5"
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
