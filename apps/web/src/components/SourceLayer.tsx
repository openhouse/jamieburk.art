import type { ReactNode } from "react";

type SourceLayerProps = {
  children: ReactNode;
};

export function SourceLayer({ children }: SourceLayerProps) {
  return (
    <aside className="source-layer">
      <p className="eyebrow">Source layer</p>
      <div>{children}</div>
    </aside>
  );
}
