import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/case-study-layout";
import { caseStudyDescription } from "@/lib/seo";
import { getAllWorkSlugs, getWorkBySlug } from "@/lib/content";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const slugs = await getAllWorkSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    return {};
  }

  return {
    title: work.title,
    description: caseStudyDescription(work.title),
  };
}

export default async function WorkDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const work = await getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return <CaseStudyLayout work={work} />;
}
