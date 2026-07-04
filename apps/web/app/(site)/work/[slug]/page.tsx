import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleBody } from "@/components/ArticleBody";
import { AtAGlance } from "@/components/AtAGlance";
import { CareNote } from "@/components/CareNote";
import { CreditsList } from "@/components/CreditsList";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { SourceLayer } from "@/components/SourceLayer";
import { StatusPill } from "@/components/StatusPill";
import { TagList } from "@/components/TagList";
import { getAllWork, getWorkBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllWork().map((work) => ({
    slug: work.slug
  }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: work.summary,
    alternates: {
      canonical: `/work/${work.slug}`
    }
  };
}

export default async function WorkDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <>
      <section className="section border-b hairline bg-base-100/80">
        <div className="main-field grid gap-8 lg:grid-cols-[1fr_22rem]">
          <div className="measure">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
                {work.series}
              </p>
              <StatusPill>{work.status}</StatusPill>
            </div>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-jamie-ink">
              {work.title}
            </h1>
            <p className="mt-4 text-xl font-medium text-jamie-ink">{work.subtitle}</p>
            <p className="mt-5 text-lg leading-8 text-jamie-muted">{work.summary}</p>
            <div className="mt-6">
              <TagList tags={work.tags} />
            </div>
          </div>
          <AtAGlance work={work} />
        </div>
      </section>
      <section className="section">
        <div className="main-field grid gap-8 lg:grid-cols-[1fr_22rem]">
          <article>
            <div className="grid gap-5 md:grid-cols-2">
              <div className="system-card p-5">
                <h2 className="text-lg font-semibold text-jamie-ink">What was unclear</h2>
                <p className="mt-3 leading-7 text-jamie-muted">{work.whatWasUnclear}</p>
              </div>
              <div className="system-card p-5">
                <h2 className="text-lg font-semibold text-jamie-ink">What became usable</h2>
                <p className="mt-3 leading-7 text-jamie-muted">{work.whatBecameUsable}</p>
              </div>
            </div>
            <div className="mt-8">
              <ArticleBody body={work.body} />
            </div>
          </article>
          <aside className="grid content-start gap-5">
            <CareNote note={work.careNote} />
            <SourceLayer sourceLayer={work.sourceLayer} />
            <KnownOpenProtected work={work} />
            <CreditsList credits={work.credits} />
          </aside>
        </div>
      </section>
    </>
  );
}
