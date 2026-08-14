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
import { StatusBadge } from "@/components/StatusBadge";
import { getWorkCover } from "@/data/work-covers";
import type { WorkMeta } from "@/types/work";

type CaseStudyLayoutProps = {
  item: WorkMeta;
  children: ReactNode;
};

export function CaseStudyLayout({ item, children }: CaseStudyLayoutProps) {
  const cover = getWorkCover(item.slug);

  return (
    <article className="jb-frame py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(280px,0.28fr)]">
        <div className="min-w-0">
          <StatusBadge status={item.status} visibility={item.visibility} />
          <h1 className="mt-5 text-4xl font-bold leading-tight text-jb-ink sm:text-5xl">
            {item.title}
          </h1>
          <p className="mt-3 text-xl font-semibold text-jb-green">{item.subtitle}</p>
          <p className="mt-5 text-xl leading-8 text-jb-ink/78">{item.summary}</p>
          <figure className="mt-8">
            <Image
              alt={cover.alt}
              className={`aspect-[3/2] w-full bg-jb-ink/5 ${
                cover.fit === "contain" ? "object-contain" : "object-cover"
              }`}
              height={cover.height}
              priority
              sizes="(min-width: 1024px) 68vw, 100vw"
              src={cover.src}
              style={{ objectPosition: cover.objectPosition }}
              width={cover.width}
            />
            <figcaption className="mt-3 text-sm leading-6 text-jb-ink/64">
              <span>{cover.caption}</span>{" "}
              <span className="font-medium text-jb-ink/72">{cover.credit}</span>
            </figcaption>
          </figure>
          <section aria-labelledby={`${item.slug}-first-read`} className="mt-8 border-y border-jb-ink/18">
            <h2 className="py-4 text-2xl font-semibold text-jb-ink" id={`${item.slug}-first-read`}>
              What to know first
            </h2>
            <dl className="divide-y divide-jb-ink/12 border-t border-jb-ink/12">
              <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-jb-blue">My responsibility</dt>
                <dd className="leading-7 text-jb-ink/76">{item.role}</dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-jb-blue">What became usable</dt>
                <dd className="leading-7 text-jb-ink/76">{item.whatBecameUsable}</dd>
              </div>
              <div className="grid gap-2 py-4 sm:grid-cols-[10rem_1fr]">
                <dt className="font-semibold text-jb-blue">Evidence to inspect</dt>
                <dd>
                  <ul className="space-y-2 leading-7 text-jb-ink/76">
                    {item.evidence.slice(0, 2).map((evidence) => (
                      <li key={evidence}>{evidence}</li>
                    ))}
                  </ul>
                  <a
                    className="mt-3 inline-block font-semibold text-jb-blue hover:text-jb-green"
                    href="#artifact-gallery"
                  >
                    Jump to artifacts
                  </a>
                </dd>
              </div>
            </dl>
          </section>
          <div className="mt-8 lg:hidden">
            <AtAGlance headingId={`${item.slug}-at-a-glance-mobile`} item={item} />
          </div>
          <div className="prose mt-10 max-w-none prose-headings:text-jb-ink prose-p:text-jb-ink/82 prose-a:text-jb-blue prose-strong:text-jb-ink">
            {children}
            <References pageId={item.slug} />
          </div>
        </div>
        <aside className="hidden space-y-5 lg:sticky lg:top-28 lg:block lg:self-start">
          <AtAGlance headingId={`${item.slug}-at-a-glance-desktop`} item={item} />
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
        <ArtifactList item={item} />
        <ArtifactGallery item={item} />
        <KnownOpenProtected item={item} />
        <LinksList item={item} />
        <CreditsList item={item} />
      </div>
    </article>
  );
}
