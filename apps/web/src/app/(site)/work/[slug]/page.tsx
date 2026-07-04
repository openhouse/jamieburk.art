import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { workItems } from "@/data/work";
import { getWorkItemBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

type WorkPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return workItems
    .filter((item) => item.route.startsWith("/work/"))
    .map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item) {
    return pageMetadata("Work not found");
  }

  return pageMetadata(item.shortTitle, item.summary);
}

export default async function WorkSlugPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const item = getWorkItemBySlug(slug);

  if (!item || !item.route.startsWith("/work/")) {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
