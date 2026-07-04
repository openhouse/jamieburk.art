import Link from "next/link";
import { site } from "@/lib/site";

export function ContactCTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "mt-8" : "site-shell py-16"}>
      <div className="paper-panel p-6">
        <p className="eyebrow">Contact</p>
        <h2 className="mt-2 text-2xl font-semibold">Looking for technical project management, product operations, implementation, civic technology, or knowledge-systems support?</h2>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn bg-[var(--color-accent)] text-white hover:bg-[#08445d]" href={`mailto:${site.email}`}>
            Email Jamie
          </a>
          <Link className="btn btn-outline border-[var(--color-accent)] text-[var(--color-accent)]" href="/resume">
            Download resume
          </Link>
        </div>
      </div>
    </section>
  );
}
