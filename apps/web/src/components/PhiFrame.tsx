import type { ReactNode } from "react";

type PhiFrameProps = {
  children: ReactNode;
  className?: string;
};

export function PhiFrame({ children, className = "" }: PhiFrameProps) {
  return <div className={`jb-frame ${className}`}>{children}</div>;
}
