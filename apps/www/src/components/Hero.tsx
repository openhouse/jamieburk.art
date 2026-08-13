import Link from "next/link";
import { FieldPhoto } from "@/components/FieldPhoto";
import { portfolioPhotos } from "@/data/photography";

export function Hero() {
  return (
    <section className="jb-product-hero" aria-labelledby="home-title">
      <div className="jb-frame jb-product-hero-grid">
        <div className="jb-product-hero-copy">
          <h1 id="home-title">
            <span className="jb-product-hero-title">
              Product leadership for public-facing systems.
            </span>
          </h1>
          <p className="jb-product-hero-name">Jamie Burkart</p>
          <p className="jb-product-hero-lede">
            I turn ambiguous public problems into services people can navigate—
            from discovery and prototyping through launch, measurement, and handoff.
          </p>
          <p className="jb-product-hero-context">
            Senior product management, technical delivery, and operating structure
            for cross-functional teams.
          </p>
          <div className="jb-product-hero-actions">
            <Link className="jb-action jb-action-primary" href="/work/technical-operations">
              See product delivery
            </Link>
            <Link className="jb-action jb-action-secondary" href="/resume">
              View resume
            </Link>
          </div>
        </div>
        <FieldPhoto
          className="jb-product-hero-photo"
          imageClassName="aspect-[3/2] object-[52%_45%] lg:aspect-[1.2/1]"
          photo={portfolioPhotos.publicWorkConversation}
          priority
          sizes="(max-width: 1023px) 100vw, 48vw"
        />
      </div>
      <div className="jb-product-hero-rail" aria-label="Product delivery lifecycle">
        <div className="jb-frame grid md:grid-cols-3">
          <p><strong>01</strong> Discover <span aria-hidden="true">→</span> define</p>
          <p><strong>02</strong> Prototype <span aria-hidden="true">→</span> launch</p>
          <p><strong>03</strong> Measure <span aria-hidden="true">→</span> hand off</p>
        </div>
      </div>
    </section>
  );
}
