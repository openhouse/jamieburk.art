import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { photographs, photoHeroBoundary } from "@/data/photography";

export function Hero() {
  const image = photographs.eastRiver;

  return (
    <section className="jb-photo-hero border-b-4 jb-rule">
      <Image
        alt={image.alt}
        className="jb-photo-hero-media"
        fill
        priority
        sizes="100vw"
        src={image.src}
        style={
          {
            "--jb-photo-position": image.objectPosition,
            "--jb-photo-mobile-position": image.mobileObjectPosition
          } as CSSProperties
        }
      />
      <div aria-hidden="true" className="jb-photo-hero-scrim" />
      <div className="jb-frame jb-photo-hero-content">
        <div className="jb-photo-hero-copy">
          <p className="jb-photo-hero-role text-sm font-semibold uppercase text-white/88">
            Technical Project Manager - Product Operations & Implementation
          </p>
          <h1 className="mt-5 font-display font-bold text-white">
            Jamie Burkart
          </h1>
          <p className="mt-6 max-w-3xl text-2xl font-semibold leading-snug text-white sm:text-3xl">
            I create operating structure for complex public-facing teams.
          </p>
          <p className="jb-photo-hero-detail mt-5 max-w-2xl text-lg leading-8 text-white/86 sm:text-xl">
            I help teams turn ambiguous, stakeholder-heavy work into usable
            systems: requirements, workflows, documentation, decision trails,
            launch support, onboarding, and durable handoffs.
          </p>
          <div className="jb-photo-hero-actions mt-8 flex flex-wrap gap-3">
            <Link
              className="inline-flex min-h-11 items-center rounded border border-white bg-white px-5 py-3 font-semibold text-jb-ink hover:bg-jb-sky"
              href="/work"
            >
              View selected work
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded border border-white px-5 py-3 font-semibold text-white hover:bg-white hover:text-jb-ink"
              href="/resume"
            >
              View resume
            </Link>
            <Link
              className="inline-flex min-h-11 items-center rounded px-5 py-3 font-semibold text-white underline decoration-white/60 underline-offset-4 hover:decoration-white"
              href="/contact"
            >
              Contact Jamie
            </Link>
          </div>
          <p className="jb-photo-hero-location mt-6 text-sm font-medium text-white/72">
            Brooklyn, NY / Civic technology / Product operations / Knowledge
            systems / Public-facing tools
          </p>
          <p className="jb-photo-hero-context">
            {image.caption} {image.credit}. {photoHeroBoundary}
          </p>
        </div>
      </div>
    </section>
  );
}
