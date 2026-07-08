import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's portfolio site.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Bounded public artifacts, careful claims, and source-aware summaries",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla for body/UI text and League Spartan for display headings",
  "No private or proprietary font files are committed or served",
  "Designed with Broadway blue and Jamie's oil-pastel palette",
  "Static deployment with metadata review before production indexing",
  "No invasive tracking in V1"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is built as a small public proof surface. It uses local MDX
          content, bounded public artifacts, and intentionally limited tracking.
          The design uses Broadway blue and Jamie&apos;s oil-pastel palette. Production
          indexing should follow content and metadata review.
        </p>
      </div>
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {details.map((detail) => (
          <JBCard key={detail}>
            <p className="leading-7 text-jb-ink/76">{detail}</p>
          </JBCard>
        ))}
      </div>
    </div>
  );
}
