import type { Metadata } from "next";
import { ContactCTA } from "@/components/ContactCTA";
import { ResumeDownload } from "@/components/ResumeDownload";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Resume",
  description: "Download Jamie Burkart&apos;s resume for technical project management, product operations, implementation, and knowledge systems roles.",
  path: "/resume"
});

const highlights = [
  "Technical Project Manager - Product Operations & Implementation",
  "14+ years building operating structure through THICK ARTS",
  "Public-facing web systems, civic technology, documentation infrastructure, and handoffs",
  "Small-business e-commerce operations, coalition memory, open-data guidance, and community tools"
];

export default function ResumePage() {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_20rem]">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Resume</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            Technical Project Manager - Product Operations & Implementation
          </h1>
          <p className="mt-6 text-lg leading-8 text-[color:var(--color-muted)]">
            Download Jamie Burkart&apos;s resume for Technical Project Manager, Technical Operations,
            Product Operations, Implementation, Business Analysis, Civic Technology, Knowledge
            Systems, and public-sector-adjacent digital delivery roles.
          </p>
          <div className="mt-8">
            <ResumeDownload />
          </div>
          <ul className="mt-10 grid gap-3">
            {highlights.map((highlight) => (
              <li className="surface p-4 font-bold" key={highlight}>
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <ContactCTA />
      </div>
    </section>
  );
}
