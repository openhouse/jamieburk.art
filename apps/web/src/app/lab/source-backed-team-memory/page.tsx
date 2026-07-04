import type { Metadata } from "next";
import { ContactCTA } from "../../../components";
import { getWorkBySlug } from "../../../lib/work";

export const metadata: Metadata = {
  title: "Source-Backed Team Memory",
  description:
    "A lab note on human-reviewed, source-backed knowledge systems for teams."
};

export default function SourceBackedTeamMemoryPage() {
  const entry = getWorkBySlug("source-backed-team-memory");

  if (!entry) {
    return null;
  }

  const LabContent = entry.Component;

  return (
    <article className="case-article">
      <p className="eyebrow">Lab note</p>
      <LabContent />
      <ContactCTA />
    </article>
  );
}
