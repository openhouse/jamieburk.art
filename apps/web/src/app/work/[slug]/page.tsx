import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArtifactList } from "@/components/artifact-list";
import { KnownOpenProtected } from "@/components/known-open-protected";
import { MdxBody } from "@/components/mdx-body";
import { StatusPill } from "@/components/status-pill";
import { TagList } from "@/components/tag-list";
import { VisibilityNote } from "@/components/visibility-note";
import { getWorkBySlug, getWorkSlugs } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

type WorkDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getWorkSlugs()
    .filter((slug) => slug !== "source-backed-team-memory")
    .map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    return createMetadata({ title: "Work" });
  }

  return createMetadata({
    title: entry.title,
    description: entry.summary,
    path: `/work/${entry.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry || entry.slug === "source-backed-team-memory") {
    notFound();
  }

  return (
    <article className="section-y">
      <div className="page-shell">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(18rem,0.8fr)]">
          <div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status={entry.status} />
              <span className="badge rounded border-base-300 bg-base-200 text-xs font-bold">{entry.years}</span>
            </div>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-tight md:text-6xl">
              {entry.title}
            </h1>
            {entry.subtitle ? <p className="mt-4 text-2xl font-black text-primary">{entry.subtitle}</p> : null}
            <p className="mt-6 prose-measure text-lg leading-8 text-base-content/75">{entry.summary}</p>
            <div className="mt-8">
              <TagList tags={entry.tags} />
            </div>
          </div>
          <aside className="grid gap-4 self-start">
            <VisibilityNote publicSafety={entry.publicSafety} whatIsOmitted={entry.whatIsOmitted} />
            <div className="rounded border border-base-300 bg-base-200 p-5">
              <h2 className="text-xl font-black">Artifacts</h2>
              <div className="mt-4">
                <ArtifactList artifacts={entry.artifactTypes} />
              </div>
            </div>
          </aside>
        </div>
        <div className="mt-12">
          <MdxBody source={entry.body} />
        </div>
        <KnownOpenProtected
          known={entry.proof.length ? entry.proof : [entry.whatBecameUsable]}
          open={[entry.futureReaderNote ?? "Add approved screenshots, public links, and artifacts after review."]}
          protectedItems={[entry.whatIsOmitted ?? "Private or consent-dependent materials remain omitted."]}
        />
      </div>
    </article>
  );
}
