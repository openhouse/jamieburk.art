import type { WorkItem } from "@/lib/types";

type VisibilityNoteProps = {
  publicSafety?: WorkItem["publicSafety"];
  whatIsOmitted?: string;
};

export function VisibilityNote({ publicSafety, whatIsOmitted }: VisibilityNoteProps) {
  if (!publicSafety && !whatIsOmitted) {
    return null;
  }

  return (
    <aside className="rounded border border-base-300 bg-base-200 p-4 text-sm leading-6 text-base-content/75">
      {publicSafety ? (
        <p>
          <strong className="text-base-content">{publicSafety.level}:</strong> {publicSafety.note}
        </p>
      ) : null}
      {whatIsOmitted ? <p className="mt-2">{whatIsOmitted}</p> : null}
    </aside>
  );
}
