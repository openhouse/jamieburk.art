type PublicSafetyNoteProps = {
  children?: React.ReactNode;
};

export function PublicSafetyNote({ children }: PublicSafetyNoteProps) {
  return (
    <aside className="callout public-safety">
      <h2>Public-safety note</h2>
      <p>
        {children ??
          "Selected public-safe summary. Private notes, raw strategy docs, legal-review materials, contact lists, stakeholder lists, credentials, and unapproved internal materials are not published."}
      </p>
    </aside>
  );
}
