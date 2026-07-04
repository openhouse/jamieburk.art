import type { ReactNode } from "react";

type PublicSafetyNoteProps = {
  children: ReactNode;
};

export function PublicSafetyNote({ children }: PublicSafetyNoteProps) {
  return (
    <aside className="public-safety-note">
      <p className="eyebrow">Public-safety note</p>
      <div>{children}</div>
    </aside>
  );
}
