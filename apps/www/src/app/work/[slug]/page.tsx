import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { workItems } from "@/data/work";
import { createMetadata } from "@/lib/metadata";
import {
  getWorkBySlug,
  workContentBySlug,
  type WorkContentSlug
} from "@/lib/work";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workItems.filter((item) => !item.href).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item || item.href) {
    return createMetadata({ title: "Work Not Found - Jamie Burkart", path: "/work" });
  }

  return createMetadata({
    title: `${item.title} - Jamie Burkart`,
    description: item.summary,
    path: `/work/${item.slug}`
  });
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getWorkBySlug(slug);
  const Content = workContentBySlug[slug as WorkContentSlug];

  if (!item || item.href || !Content) {
    notFound();
  }

  return (
    <CaseStudyLayout item={item}>
      <Content />
    </CaseStudyLayout>
  );
}
