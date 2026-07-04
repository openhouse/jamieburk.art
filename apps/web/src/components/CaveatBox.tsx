type CaveatBoxProps = {
  children: React.ReactNode;
};

export function CaveatBox({ children }: CaveatBoxProps) {
  return (
    <aside className="callout caveat">
      <h2>Caveat</h2>
      <p>{children}</p>
    </aside>
  );
}
