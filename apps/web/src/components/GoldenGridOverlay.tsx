export function GoldenGridOverlay() {
  if (process.env.NEXT_PUBLIC_SHOW_GRID !== "true") {
    return null;
  }

  return (
    <div className="golden-grid" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}
