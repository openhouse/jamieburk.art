type SourceLayerProps = {
  items: string[];
};

export function SourceLayer({ items }: SourceLayerProps) {
  return (
    <div className="rounded border border-base-300 bg-base-200 p-5">
      <h3 className="text-lg font-black">Source layer</h3>
      <ol className="mt-4 grid gap-3 text-sm leading-6 text-base-content/75">
        {items.map((item, index) => (
          <li className="flex gap-3" key={item}>
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded bg-primary text-xs font-black text-primary-content">
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}
