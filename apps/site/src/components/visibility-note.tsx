type VisibilityNoteProps = {
  note?: string;
};

export function VisibilityNote({ note }: VisibilityNoteProps) {
  if (!note) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-primary/30 bg-primary/10 p-5">
      <h2 className="text-lg font-bold">Public-safety note</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/75">{note}</p>
    </aside>
  );
}
