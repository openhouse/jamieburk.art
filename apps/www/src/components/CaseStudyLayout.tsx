import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  CreditsList,
  KnownOpenProtected,
  LinksList,
} from "@/components/CaseStudyBlocks";
import { FieldPhoto } from "@/components/FieldPhoto";
import { JBButton } from "@/components/JBButton";
import { References } from "@/components/citations";
import { getCaseStudyPhoto, portfolioPhotos } from "@/data/photography";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const leadPhoto = getCaseStudyPhoto(item.slug);

  return (
    <article className="jb-frame py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
          {leadPhoto ? (
            <FieldPhoto
              className="mt-10"
              crop="aspect-[16/9] object-cover"
              photoId="photo.kc-town-hall-before"
              placementId="placement.kc-town-hall.hero.layout-b"
              photo={leadPhoto}
              priority
              route="/work/kc-town-hall"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
          ) : null}
          <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
            <References pageId={item.slug} />
          </div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <AtAGlance item={item} />
          <div className="flex flex-wrap gap-3">
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </aside>
      </div>
      <div className="mt-14 space-y-12">
        {item.slug === "kc-town-hall" ? (
          <section aria-labelledby="neighborhood-operations">
            <div className="grid gap-8 lg:grid-cols-[0.34fr_0.66fr]">
              <div>
                <p className="jb-section-label">Adjacent field practice</p>
                <h2 className="mt-3 text-3xl text-jb-ink" id="neighborhood-operations">
                  Service became a recurring operation
                </h2>
                <p className="mt-4 leading-7 text-jb-ink/74">
                  Neighborhood intake, collection, coordination with city
                  services, delivery, counting, and public follow-up formed a
                  practical monthly loop.
                </p>
              </div>
              <FieldPhoto
                crop="aspect-[4/3] object-cover"
                photoId="photo.tired-of-tires-load"
                placementId="placement.kc-town-hall.tired-of-tires-load.layout-b"
                photo={portfolioPhotos.tiredOfTiresLoad}
                route="/work/kc-town-hall"
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
            </div>
          </section>
        ) : null}
        <ArtifactList item={item} />
        <ArtifactGallery item={item} />
        <KnownOpenProtected item={item} />
        <LinksList item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}
