type CaveatBoxProps = {
  children: React.ReactNode;
};

export function CaveatBox({ children }: CaveatBoxProps) {
  return (
    <div className="rounded-[0.382rem] border border-[color:var(--color-caution)] bg-[color:var(--color-caution)]/35 p-4 text-sm leading-6">
      <p className="font-bold">Caveat</p>
      <div className="mt-1">{children}</div>
    </div>
  );
}
