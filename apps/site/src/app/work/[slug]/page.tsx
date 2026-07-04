import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getAllWorkItems, getWorkItem } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getAllWorkItems()
    .filter((item) => item.meta.slug !== "source-backed-team-memory")
    .map((item) => ({
      slug: item.meta.slug
    }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    return {};
  }

  return pageMetadata({
    title: item.meta.title,
    description: item.meta.summary,
    path: `/work/${item.meta.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item || item.meta.slug === "source-backed-team-memory") {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
