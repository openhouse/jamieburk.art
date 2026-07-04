export function GuideFrame() {
  if (process.env.NODE_ENV === "production") {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-y-0 left-1/2 z-40 hidden w-px bg-primary/20 md:block"
    />
  );
}
