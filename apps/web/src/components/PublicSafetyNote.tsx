type PublicSafetyNoteProps = {
  children: React.ReactNode;
};

export function PublicSafetyNote({ children }: PublicSafetyNoteProps) {
  return (
    <div className="rounded-[0.382rem] border-l-4 border-[color:var(--color-grass)] bg-[color:var(--color-soft-green)]/70 p-4 text-sm leading-6">
      <p className="font-bold">Public-safety note</p>
      <div className="mt-1 text-[color:var(--color-ink)]">{children}</div>
    </div>
  );
}
