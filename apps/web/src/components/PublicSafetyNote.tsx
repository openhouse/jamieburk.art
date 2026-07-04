type PublicSafetyNoteProps = {
  note?: string;
};

export function PublicSafetyNote({ note }: PublicSafetyNoteProps) {
  if (!note) {
    return null;
  }

  return (
    <aside className="border-l-4 border-secondary bg-secondary/10 px-5 py-4 text-sm leading-relaxed text-base-content/80">
      <p className="font-mono text-xs uppercase text-secondary">Public-safe publishing note</p>
      <p className="mt-2">{note}</p>
    </aside>
  );
}
