import Image from "next/image";
import Link from "next/link";
import { portfolioPhotos } from "@/data/photography";

export function Hero() {
  const photo = portfolioPhotos.civicFieldExchange;

  return (
    <section className="jb-product-hero" aria-labelledby="home-title">
      <div className="jb-product-hero-photo">
        <Image
          alt={photo.alt}
          className="object-cover object-[58%_center]"
          fill
          priority
          sizes="(max-width: 899px) 100vw, 58vw"
          src={photo.src}
        />
      </div>
      <div className="jb-product-hero-copy">
        <h1 id="home-title">
          Jamie Burkart
          <span>turns public problems into products people can use.</span>
        </h1>
        <p className="jb-product-role">
          Senior Product Manager · Civic technology · Public-interest delivery
        </p>
        <p className="jb-product-deck">
          I lead ambiguous, stakeholder-heavy work from discovery through
          implementation, launch, adoption, and durable handoff.
        </p>
        <div className="jb-product-actions">
          <Link className="jb-product-primary" href="#product-proof">
            See the product proof
          </Link>
          <Link className="jb-product-secondary" href="/resume">
            Resume
          </Link>
        </div>
        <dl className="jb-product-signal" aria-label="Product practice signal">
          <div>
            <dt>Product</dt>
            <dd>discovery through stewardship</dd>
          </div>
          <div>
            <dt>Delivery</dt>
            <dd>tools, launches, adoption</dd>
          </div>
          <div>
            <dt>Context</dt>
            <dd>people, policy, systems, delivery</dd>
          </div>
        </dl>
      </div>
      <p className="jb-product-hero-caption">
        <span>{photo.caption}</span>
        <span>{photo.credit}</span>
      </p>
    </section>
  );
}
