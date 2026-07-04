import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { ResumeDownload } from "@/components/ResumeDownload";
import { site } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description: "Contact Jamie Burkart for roles, referrals, consulting, and collaboration.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <section className="section-pad">
      <div className="container-page grid gap-10 md:grid-cols-[1fr_20rem]">
        <div className="max-w-3xl">
          <p className="eyebrow mb-3">Contact</p>
          <h1 className="text-4xl font-black leading-tight md:text-6xl">
            For roles, referrals, consulting, or collaboration
          </h1>
          <div className="mt-8 grid gap-4 text-lg leading-8">
            <a className="surface flex items-center gap-3 p-5 font-black" href={`mailto:${site.email}`}>
              <Mail aria-hidden="true" size={22} />
              {site.email}
            </a>
            <p className="surface p-5 font-bold">{site.location}</p>
          </div>
          <p className="mt-8 text-lg leading-8 text-[color:var(--color-muted)]">
            Best-fit conversations: technical project management, product operations,
            implementation, documentation systems, civic technology, govtech, knowledge systems,
            and public-facing tools.
          </p>
        </div>
        <aside className="grid content-start gap-4">
          <div className="surface p-5">
            <h2 className="text-xl font-black">Materials</h2>
            <div className="mt-5">
              <ResumeDownload />
            </div>
            <a className="link mt-5 inline-block" href={site.repoUrl}>
              GitHub repository
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
