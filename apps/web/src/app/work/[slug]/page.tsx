import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchivedPrototypeNote } from "@/components/ArchivedPrototypeNote";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { CollectiveWorkNote } from "@/components/CollectiveWorkNote";
import { getAllWork, getWorkBySlug } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllWork().map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    return buildMetadata({ title: "Work Not Found", path: "/work" });
  }

  return buildMetadata({
    title: item.title,
    description: `Case study on ${item.title}, showing technical project management, product operations, implementation, documentation, and public-facing systems work.`,
    path: `/work/${item.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
    notFound();
  }

  return (
    <>
      <CaseStudyLayout item={item} />
      <div className="page-shell mt-8 grid gap-4 md:grid-cols-2">
        {item.slug.includes("fairrent") || item.slug.includes("196") ? <CollectiveWorkNote /> : null}
        {item.privacyLevel === "archived" ? <ArchivedPrototypeNote /> : null}
      </div>
    </>
  );
}
