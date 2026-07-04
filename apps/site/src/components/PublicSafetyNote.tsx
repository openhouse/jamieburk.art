import type { ReactNode } from "react";

type PublicSafetyNoteProps = {
  children?: ReactNode;
};

export function PublicSafetyNote({ children }: PublicSafetyNoteProps) {
  return (
    <aside className="public-safety-note">
      <strong>Public-safe summary</strong>
      <p>
        {children ??
          "This page summarizes relational, civic, client, or cultural work without exposing private notes, unapproved names, raw records, or sensitive materials."}
      </p>
    </aside>
  );
}
