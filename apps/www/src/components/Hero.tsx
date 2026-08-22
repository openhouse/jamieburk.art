import { GovernedImage } from "@/components/GovernedImage";
import { portfolioPhotos } from "@/data/photography";
import { site } from "@/data/site";

export function Hero() {
  const photo = portfolioPhotos.eastRiver;

  return (
    <section className="jb-hero" aria-labelledby="home-title">
      <div className="jb-hero-image">
        <GovernedImage
          alt={photo.alt}
          className="object-cover object-[73%_center] sm:object-center"
          fill
          preload
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
            {site.name}
          </h1>
          <p className="mt-6 max-w-2xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
            {site.heroTagline}
          </p>
          <p className="mt-4 max-w-2xl text-lg leading-7 text-white/84 sm:hidden">
            I clarify requirements, coordinate implementation, and leave
            documentation people can use.
          </p>
          <p className="mt-5 hidden max-w-2xl text-xl leading-8 text-white/84 sm:block">
            I work with public-facing teams to clarify requirements, build
            workflows and tools, carry context through implementation, and
            leave behind documentation people can use.
          </p>
        </div>
      </div>
      <p className="jb-hero-caption">
        <span className="block">{photo.caption}</span>
        <span className="mt-1 block text-white/92">{photo.credit}</span>
      </p>
    </section>
  );
}
