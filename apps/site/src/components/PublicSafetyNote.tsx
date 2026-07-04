type PublicSafetyNoteProps = {
  note?: string;
};

export function PublicSafetyNote({ note }: PublicSafetyNoteProps) {
  if (!note) {
    return null;
  }

  return (
    <div className="surface border-l-4 border-l-primary p-5">
      <p className="eyebrow mb-2">Public-safety note</p>
      <p className="leading-7 text-[color:var(--color-muted)]">{note}</p>
    </div>
  );
}
