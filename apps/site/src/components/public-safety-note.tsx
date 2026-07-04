export function PublicSafetyNote() {
  return (
    <aside className="rounded-md border border-base-300 bg-base-100 p-5 text-sm leading-6 text-neutral">
      <p className="font-semibold text-base-content">Public-safe by default</p>
      <p className="mt-2">
        Case studies use public facts, approved links, redacted examples, or
        recreated diagrams. Private notes, raw transcripts, contact lists,
        internal analytics, and consent-dependent materials stay out of the
        public repo.
      </p>
    </aside>
  );
}
