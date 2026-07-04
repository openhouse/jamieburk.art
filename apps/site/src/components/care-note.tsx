type CareNoteProps = {
  note?: string;
};

export function CareNote({ note }: CareNoteProps) {
  if (!note) {
    return null;
  }

  return (
    <aside className="rounded-lg border border-secondary/30 bg-secondary/10 p-5">
      <h2 className="text-lg font-bold">Care note / limits</h2>
      <p className="mt-2 text-sm leading-6 text-base-content/75">{note}</p>
    </aside>
  );
}
