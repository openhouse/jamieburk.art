type GoldenFrameProps = {
  children: React.ReactNode;
  aside?: React.ReactNode;
};

export function GoldenFrame({ children, aside }: GoldenFrameProps) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1.618fr)_minmax(18rem,1fr)] lg:items-start">
      <div>{children}</div>
      {aside ? <div className="lg:pt-2">{aside}</div> : null}
    </div>
  );
}
