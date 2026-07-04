type CareNoteProps = {
  note?: string;
};

export function CareNote({ note }: CareNoteProps) {
  if (!note) {
    return null;
  }

  return (
    <div className="rounded-md border border-[color:var(--color-line)] bg-base-200 p-5">
      <p className="font-black">Care note</p>
      <p className="mt-2 leading-7 text-[color:var(--color-muted)]">{note}</p>
    </div>
  );
}
