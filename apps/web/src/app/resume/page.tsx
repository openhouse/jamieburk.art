import type { Metadata } from "next";
import Link from "next/link";
import { ResumeCTA } from "@/components/resume-cta";
import { Section } from "@/components/section";
import { getFeaturedWork, getWorkHref } from "@/lib/content";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Resume",
  description: "Resume download and selected impact highlights for Jamie Burkart.",
  path: "/resume"
});

export default function ResumePage() {
  const highlights = getFeaturedWork().slice(0, 5);

  return (
    <Section
      eyebrow="Resume"
      title="Technical Project Manager - Product Operations & Implementation"
      intro="Selected impact highlights paired with a downloadable public resume PDF."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_20rem]">
        <div>
          <h2 className="text-2xl font-black">Selected impact</h2>
          <div className="mt-5 grid gap-3">
            {highlights.map((entry) => (
              <Link
                className="rounded border border-base-300 bg-base-200 p-4 no-underline hover:border-primary/55"
                href={getWorkHref(entry)}
                key={entry.slug}
              >
                <span className="block font-black">{entry.title}</span>
                <span className="mt-1 block text-sm leading-6 text-base-content/75">{entry.proof[0]}</span>
              </Link>
            ))}
          </div>
        </div>
        <ResumeCTA />
      </div>
    </Section>
  );
}
