type AtAGlanceProps = {
  items: Array<{ label: string; value: string | string[] }>;
};

export function AtAGlance({ items }: AtAGlanceProps) {
  return (
    <dl className="grid gap-px overflow-hidden border border-base-content/10 bg-base-content/10 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="bg-base-200 p-4">
          <dt className="font-mono text-xs uppercase text-base-content/55">{item.label}</dt>
          <dd className="mt-2 text-sm leading-relaxed text-base-content/85">
            {Array.isArray(item.value) ? item.value.join(', ') : item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
