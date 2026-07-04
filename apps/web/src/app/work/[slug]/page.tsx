import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getAllWorkItems, getWorkItem } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllWorkItems().map((item) => ({
    slug: item.slug
  }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkItem(slug);

  if (!item) {
    return pageMetadata({
      title: "Work Not Found",
      description: "This work item could not be found.",
      pathname: `/work/${slug}`
    });
  }

  return pageMetadata({
    title: item.title,
    description: `Case study on ${item.title}, showing technical project management, product operations, implementation, documentation, and public-facing systems work.`,
    pathname: `/work/${item.slug}`
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
