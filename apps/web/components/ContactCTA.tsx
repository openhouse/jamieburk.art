import Link from "next/link";
import { siteMetadata } from "@/lib/metadata";

export function ContactCTA() {
  return (
    <section className="section bg-base-200/86">
      <div className="main-field">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
          <div className="measure">
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-broadway-blue">
              Contact
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-jamie-ink">
              Have a role, system, or handoff that needs structure?
            </h2>
            <p className="mt-4 leading-7 text-jamie-muted">
              Send the context, the constraint, and what needs to become usable next.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a className="btn btn-primary" href={`mailto:${siteMetadata.email}`}>
              Email Jamie
            </a>
            <Link className="btn btn-outline" href="/work/technical-operations">
              Technical proof
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
