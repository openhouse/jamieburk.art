import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  CreditsList,
  KnownOpenProtected,
  LinksList,
} from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { PhotoFigure } from "@/components/PhotoFigure";
import { References } from "@/components/citations";
import { StatusBadge } from "@/components/StatusBadge";
import { fairRentPhotoEssay, projectLeadPhotos } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const leadPhoto = projectLeadPhotos[item.slug];

  return (
    <article>
      <header className="jb-case-header">
        <div className="jb-frame py-10 md:py-14">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <p className="jb-eyebrow mt-5 text-jb-blue">{item.series} / {item.years}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 max-w-3xl text-xl leading-8 text-jb-ink/78">{item.summary}</p>
        </div>
      </header>
      {leadPhoto ? (
        <div className="jb-case-lead">
          <PhotoFigure mode="wide" photo={leadPhoto} priority />
        </div>
      ) : null}
      <div className="jb-frame grid gap-10 py-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
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
      {item.slug === "fair-rent-nyc" ? (
        <section aria-labelledby="photo-lineage" className="jb-photo-essay">
          <div className="jb-frame">
            <p className="jb-eyebrow text-jb-blue">Listening / making / public action</p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold text-jb-ink" id="photo-lineage">
              A campaign lineage carried through rooms, materials, and streets
            </h2>
            <p className="mt-4 max-w-3xl leading-7 text-jb-ink/74">
              These photographs do not assign sole authorship. They show some of
              the collective situations Jamie helped organize, document, and
              support through public identity and operating infrastructure.
            </p>
            <div className="jb-photo-sequence mt-8">
              {fairRentPhotoEssay.map((photo) => (
                <PhotoFigure
                  key={photo.id}
                  photo={photo}
                  sizes="(min-width: 768px) 50vw, 100vw"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}
      <div className="jb-frame mt-14 space-y-12">
        <ArtifactList item={item} />
        <ArtifactGallery item={item} />
        <KnownOpenProtected item={item} />
        <LinksList item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}
