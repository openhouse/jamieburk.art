import type { Metadata } from "next";
import { Section } from "@/components/Section";
import { WorkCard } from "@/components/WorkCard";
import { createMetadata } from "@/lib/seo";
import { getWorkItems } from "@/lib/work";

export const metadata: Metadata = createMetadata({
  title: "Selected Systems",
  description: "Selected public-safe case studies and proof surfaces from Jamie Burkart's portfolio.",
  path: "/work"
});

export default async function WorkPage() {
  const workItems = await getWorkItems();

  return (
    <Section
      eyebrow="Selected systems"
      title="Work"
      intro="Case studies, stubs, and proof surfaces focused on technical project management, product operations, implementation, documentation, and public-facing tools."
    >
      <div className="work-grid">
        {workItems.map((item) => (
          <WorkCard key={item.slug} item={item} />
        ))}
      </div>
    </Section>
  );
}
