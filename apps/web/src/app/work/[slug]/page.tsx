import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ContentStateBadge } from "../../../components";
import { getWorkBySlug, workEntries } from "../../../lib/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workEntries.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    return {
      title: "Work not found"
    };
  }

  return {
    title: entry.title,
    description: entry.summary,
    alternates: {
      canonical: `/work/${entry.slug}`
    },
    openGraph: {
      title: entry.title,
      description: entry.summary,
      type: "article",
      url: `https://jamieburk.art/work/${entry.slug}`
    }
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const entry = getWorkBySlug(slug);

  if (!entry) {
    notFound();
  }

  const WorkContent = entry.Component;

  return (
    <article className="case-article">
      <Link className="quiet-link" href="/work">
        Back to selected work
      </Link>
      <div className="meta-row" style={{ marginTop: "1rem" }}>
        <ContentStateBadge state={entry.contentState} />
        <span>{entry.role}</span>
        <span>{entry.dates}</span>
      </div>
      <p className="case-summary">{entry.summary}</p>
      <WorkContent />
    </article>
  );
}
