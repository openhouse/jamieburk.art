type PublicSafetyNoteProps = {
  children: React.ReactNode;
};

export function PublicSafetyNote({ children }: PublicSafetyNoteProps) {
  return (
    <aside className="border-l-4 border-primary bg-base-200 p-5 text-sm text-muted">
      <p className="font-black text-base-content">Public-safety note</p>
      <div className="mt-2">{children}</div>
    </aside>
  );
}
