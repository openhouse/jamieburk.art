import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { createMetadata } from "@/lib/seo";
import { getWorkItem, getWorkSlugs } from "@/lib/work";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getWorkSlugs();
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  if (!item) {
    return createMetadata({ title: "Work", path: "/work" });
  }

  return createMetadata({
    title: `${item.title} Portfolio`,
    description: `Case study on ${item.title}, showing technical project management, product operations, implementation, documentation, and public-facing systems work.`,
    path: `/work/${item.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  if (!item) {
    notFound();
  }

  const { Content, ...workItem } = item;

  return (
    <CaseStudyLayout item={workItem}>
      <Content />
    </CaseStudyLayout>
  );
}
