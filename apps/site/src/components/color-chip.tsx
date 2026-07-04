type ColorChipProps = {
  name: string;
  value: string;
};

export function ColorChip({ name, value }: ColorChipProps) {
  return (
    <div className="flex items-center gap-3 text-sm">
      <span
        aria-hidden="true"
        className="h-5 w-5 rounded-full border border-base-300"
        style={{ backgroundColor: value }}
      />
      <span className="font-medium">{name}</span>
      <span className="text-neutral">{value}</span>
    </div>
  );
}
