import type { Metadata } from "next";
import { LinkButton } from "@/components/link-button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Jamie Burkart for roles, referrals, consulting conversations, or collaborations.",
};

export default function ContactPage() {
  return (
    <section className="container-reading section-pad">
      <p className="text-sm font-semibold uppercase tracking-wide text-primary">
        Contact
      </p>
      <h1 className="mt-3 text-4xl font-bold md:text-6xl">Contact Jamie</h1>
      <p className="mt-5 text-xl leading-9 text-neutral">
        For roles, referrals, consulting conversations, or collaborations, email
        Jamie at:
      </p>
      <p className="mt-6 text-2xl font-bold">
        <a
          className="link-hover link text-primary"
          href={`mailto:${site.email}`}
        >
          {site.email}
        </a>
      </p>
      <div className="mt-10 rounded-md border border-base-300 bg-base-100 p-5">
        <h2 className="text-2xl font-bold">Best-fit conversations</h2>
        <p className="mt-3 leading-7 text-neutral">
          Technical project management, technical operations, product
          operations, implementation, civic/govtech delivery, documentation,
          knowledge systems, public-facing tools, and source-backed team memory.
        </p>
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <LinkButton href={site.resumePath}>Download resume</LinkButton>
        <LinkButton href={site.githubUrl} variant="ghost">
          GitHub
        </LinkButton>
      </div>
      <p className="mt-8 text-sm text-neutral">{site.location}</p>
    </section>
  );
}
