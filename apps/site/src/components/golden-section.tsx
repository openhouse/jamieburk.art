import type { ReactNode } from "react";

type GoldenSectionProps = {
  children: ReactNode;
  aside?: ReactNode;
};

export function GoldenSection({ children, aside }: GoldenSectionProps) {
  return (
    <section className="golden-split">
      <div>{children}</div>
      {aside ? <aside>{aside}</aside> : null}
    </section>
  );
}
