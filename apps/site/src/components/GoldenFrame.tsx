type GoldenFrameProps = {
  children: React.ReactNode;
};

export function GoldenFrame({ children }: GoldenFrameProps) {
  return <div className="golden-frame">{children}</div>;
}
