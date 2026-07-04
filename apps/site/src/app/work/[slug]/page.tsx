import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getVisibleWorkItems, getWorkItem } from "@/lib/work";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return getVisibleWorkItems().map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    return {};
  }

  return {
    title: item.title,
    description: `Case study on ${item.title}, showing technical project management, product operations, implementation, documentation, and public-facing systems work.`
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
