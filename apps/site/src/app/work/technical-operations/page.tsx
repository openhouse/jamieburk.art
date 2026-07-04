import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseStudyLayout } from "@/components/CaseStudyLayout";
import { getWorkItem } from "@/lib/work";

export const metadata: Metadata = {
  title: "Technical Operations & Implementation",
  description:
    "A proof page for Jamie Burkart's technical project management, product operations, implementation, and documentation work."
};

export default function TechnicalOperationsPage() {
  const item = getWorkItem("technical-operations");

  if (!item) {
    notFound();
  }

  return <CaseStudyLayout item={item} />;
}
