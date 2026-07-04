import { site } from "@/data/site";

export function ContactCta() {
  return (
    <aside className="rounded-lg border quiet-rule bg-primary p-5 text-primary-content">
      <h2 className="text-xl font-bold">Contact</h2>
      <p className="mt-2 text-sm leading-6 opacity-90">
        For product operations, implementation, civic technology, knowledge systems, or public-facing tool work.
      </p>
      <a className="btn btn-sm mt-4 rounded-lg bg-white text-primary hover:bg-base-200" href={`mailto:${site.email}`}>
        Email Jamie
      </a>
    </aside>
  );
}
