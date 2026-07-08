import type { Metadata } from "next";
import { JBCard } from "@/components/JBCard";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Colophon - Jamie Burkart",
  description:
    "Colophon for Jamie Burkart's public-safe portfolio.",
  path: "/colophon"
});

const details = [
  "Static-first Next.js App Router site with local MDX content",
  "Public-safe summaries, careful claims, and protected private materials",
  "Accessibility-minded semantic HTML, keyboard focus states, and readable type",
  "Karla for body/UI text and Oswald for compact labels",
  "No private or proprietary font files are committed or served",
  "Designed with Broadway blue and Jamie's oil-pastel palette",
  "No invasive tracking in V1",
  "Production indexing remains an explicit content-approval decision"
];

export default function ColophonPage() {
  return (
    <div className="jb-frame py-12">
      <div className="jb-reading">
        <h1 className="text-5xl font-bold text-jb-ink">Colophon</h1>
        <p className="mt-6 text-xl leading-8 text-jb-ink/76">
          This site is a small public proof surface for work that often touches
          private context, collective memory, and public-facing systems. It uses
          public-safe summaries, careful claim language, accessible markup,
          readable type, and intentionally limited tracking.
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
