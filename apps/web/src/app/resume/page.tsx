import type { Metadata } from "next";
import { ResumeDownload } from "@/components/ResumeDownload";
import { SectionHeading } from "@/components/SectionHeading";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Resume",
  description: "Resume page for Jamie Burkart, Technical Project Manager focused on product operations, implementation, civic technology, and knowledge systems.",
  path: "/resume"
});

const highlights = [
  "Technical Project Manager - Product Operations & Implementation.",
  "14+ years across web systems, e-commerce, civic technology, documentation, and public-facing tools.",
  "Contributing to 2x revenue growth for a legacy e-commerce business.",
  "30+ pages of civic campaign-memory infrastructure.",
  "Public-safe documentation, onboarding, launch support, and handoff systems."
];

export default function ResumePage() {
  return (
    <div className="page-shell py-14">
      <SectionHeading
        eyebrow="Resume"
        title="Resume"
        body="Download Jamie Burkart's resume for Technical Project Manager, Technical Operations, Product Operations, Implementation, Business Analysis, Civic Technology, Knowledge Systems, and public-sector-adjacent digital delivery roles."
      />
      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
        <section>
          <h2 className="text-2xl font-bold">Selected impact highlights</h2>
          <ul className="mt-5 space-y-3 leading-7 text-[color:var(--color-muted)]">
            {highlights.map((highlight) => (
              <li className="border-l-2 border-[color:var(--color-primary)] pl-4" key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        </section>
        <ResumeDownload />
      </div>
    </div>
  );
}
