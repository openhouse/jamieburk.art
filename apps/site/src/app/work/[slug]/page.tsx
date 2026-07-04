import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/case-study-layout";
import { getWorkItem, getWorkItems } from "@/lib/content";
import { pageMetadata } from "@/lib/metadata";

type WorkDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const workItems = await getWorkItems();

  return workItems.map((item) => ({
    slug: item.meta.slug
  }));
}

export async function generateMetadata({ params }: WorkDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  if (!item) {
    return pageMetadata({ title: "Work" });
  }

  return pageMetadata({
    title: item.meta.title,
    description: item.meta.summary,
    pathname: `/work/${item.meta.slug}`
  });
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { slug } = await params;
  const item = await getWorkItem(slug);

  if (!item) {
    notFound();
  }

  return <CaseStudyLayout document={item} />;
}
