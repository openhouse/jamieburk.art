import { notFound } from "next/navigation";
import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getWorkItemBySlug } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

const item = getWorkItemBySlug("source-backed-team-memory");

export const metadata = pageMetadata(
  "Source-Backed Team Memory",
  "A restrained lab page for Jamie Burkart's source-backed, human-reviewed team memory practice."
);

export default function SourceBackedTeamMemoryPage() {
  if (!item) {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
