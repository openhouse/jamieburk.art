import type { ReactNode } from "react";
import {
  AtAGlance,
  ArtifactGallery,
  ArtifactList,
  CreditsList,
  KnownOpenProtected,
  LinksList
} from "@/components/CaseStudyBlocks";
import { JBButton } from "@/components/JBButton";
import { PhotoEssay, PhotoFigure } from "@/components/PhotoFigure";
import { References } from "@/components/citations";
import { StatusBadge } from "@/components/StatusBadge";
import { projectLeadPhotos, projectPhotoEssays } from "@/data/photography";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const leadPhoto = projectLeadPhotos[item.slug];
  const photoEssay = projectPhotoEssays[item.slug];

  return (
    <article>
      <header className="border-b border-jb-ink/15 bg-jb-warm py-12">
        <div className="jb-frame grid gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-end">
          <div className="min-w-0">
            <StatusBadge status={item.status} visibility={item.visibility} />
            <p className="jb-section-index mt-5">{item.series}</p>
            <h1 className="mt-3 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
              {item.title}
            </h1>
            <p className="mt-3 text-xl font-semibold text-jb-green">
              {item.subtitle}
            </p>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-jb-ink/78">
              {item.summary}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            <JBButton href="/resume" variant="secondary">
              View resume
            </JBButton>
            <JBButton href="/contact" variant="ghost">
              Contact Jamie
            </JBButton>
          </div>
        </div>
      </header>

      {leadPhoto ? (
        <div className="jb-frame py-8">
          <PhotoFigure
            imageClassName="aspect-[16/8]"
            photo={leadPhoto}
            priority
            sizes="(min-width: 1100px) 1100px, 100vw"
          />
        </div>
      ) : null}

      <div className="jb-frame grid gap-12 py-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(280px,0.3fr)]">
        <div className="min-w-0">
          <div className="prose max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
            <References pageId={item.slug} />
          </div>
        </div>
        <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
          <AtAGlance item={item} />
        </aside>
      </div>

      {photoEssay?.length ? (
        <section className="border-y border-jb-ink/15 bg-jb-warm py-12">
          <div className="jb-frame">
            <div className="mb-8 max-w-2xl">
              <p className="jb-section-index">Scenes of collective work</p>
              <h2 className="mt-3 text-3xl font-bold text-jb-ink">
                Public identity, participation, and institutional passage
              </h2>
              <p className="mt-4 leading-7 text-jb-ink/74">
                These photographs document settings where many people shaped
                the work. They support collective context; they do not assign
                campaign outcomes to one person.
              </p>
            </div>
            <PhotoEssay photos={photoEssay} />
          </div>
        </section>
      ) : null}

      <div className="jb-frame space-y-12 py-14">
        <ArtifactList item={item} />
        <ArtifactGallery item={item} />
        <KnownOpenProtected item={item} />
        <LinksList item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}
