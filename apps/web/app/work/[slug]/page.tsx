import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { createMetadata } from "@/lib/seo";
import { getWorkItem, workItems } from "@/lib/work";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return workItems.map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({
  params
}: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    return createMetadata({
      title: "Work",
      path: "/work"
    });
  }

  return createMetadata({
    title: item.title,
    description: `Case study on ${item.title}, showing technical project management, product operations, implementation, documentation, and public-facing systems work.`,
    path: `/work/${item.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
