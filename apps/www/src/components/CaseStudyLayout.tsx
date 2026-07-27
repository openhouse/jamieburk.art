import Image from "next/image";
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
import { References } from "@/components/citations";
import {
  getPhotoOccurrenceId,
  photoDisplayBoundary,
  workVisuals
} from "@/data/photography";
import { StatusBadge } from "@/components/StatusBadge";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const visual = workVisuals[item.slug];
  const occurrenceId = visual
    ? getPhotoOccurrenceId(visual, "case-study.hero")
    : undefined;

  return (
    <article>
      <header className="jb-frame py-12">
        <div className="max-w-4xl">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
        </div>
      </header>
      {visual ? (
        <figure
          className="border-y border-jb-ink/10 bg-jb-warm"
          data-photo-occurrence={occurrenceId}
        >
          <div className="jb-frame py-4">
            <div className="jb-case-visual">
              <Image
                alt={visual.alt}
                fill
                priority
                sizes="(min-width: 1100px) 1100px, 100vw"
                src={visual.src}
                style={{
                  objectFit: visual.kind === "project-artifact" ? "contain" : "cover",
                  objectPosition: visual.objectPosition
                }}
              />
            </div>
            <figcaption className="mt-3 grid gap-1 text-sm leading-6 text-jb-ink/72 md:grid-cols-[1fr_auto]">
              <span>{visual.caption}</span>
              <span>{visual.credit}</span>
            </figcaption>
          </div>
        </figure>
      ) : null}
      <div className="jb-frame grid gap-10 py-12 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
          <div className="prose max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
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
        <div className="col-span-full mt-6 space-y-12">
          <ArtifactList item={item} />
          <ArtifactGallery item={item} />
          <KnownOpenProtected item={item} />
          {visual?.kind === "photograph" ? (
            <p className="max-w-4xl border-l-4 border-jb-ochre bg-jb-warm px-4 py-3 text-sm leading-6 text-jb-ink/74">
              <strong className="text-jb-ink">Image boundary:</strong>{" "}
              {photoDisplayBoundary}
            </p>
          ) : null}
          <LinksList item={item} />
          <CreditsList item={item} />
        </div>
      </div>
    </article>
  );
}
