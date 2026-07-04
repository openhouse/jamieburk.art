type CaveatBoxProps = {
  children: React.ReactNode;
};

export function CaveatBox({ children }: CaveatBoxProps) {
  return (
    <aside className="rounded-md border border-[#a55237]/30 bg-[#ffa77f]/16 p-5 text-sm">
      <p className="font-black text-[#764c42]">Caveat</p>
      <div className="mt-2 text-base-content">{children}</div>
    </aside>
  );
}
