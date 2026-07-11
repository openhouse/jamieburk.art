import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { createCitationComponents } from "@/components/citations/createCitationComponents";
import { workItems, type WorkSlug } from "@/data/work";
import { createMetadata } from "@/lib/metadata";
import { getWorkBySlug, workContentBySlug } from "@/lib/work";
import { resolveCitationPage } from "@/lib/knowledge-bank/resolve-page-citations";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return workItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getWorkBySlug(slug);

  if (!item) {
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
  const content = workContentBySlug[slug as WorkSlug];

  if (!item || !content) {
    notFound();
  }

  const { Content, citationRoute } = content;
  const citationComponents = citationRoute
    ? createCitationComponents(resolveCitationPage(citationRoute))
    : undefined;

  return (
    <CaseStudyLayout item={item}>
      <Content components={citationComponents} />
    </CaseStudyLayout>
  );
}
