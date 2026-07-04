type TagListProps = {
  tags: readonly string[];
  tone?: "default" | "proof" | "quiet";
};

export function TagList({ tags, tone = "default" }: TagListProps) {
  const toneClass =
    tone === "proof"
      ? "bg-[color:var(--color-highlight)] text-[color:var(--color-ink)]"
      : tone === "quiet"
        ? "border border-[color:var(--color-line)] text-[color:var(--color-muted)]"
        : "bg-[color:var(--color-soft-blue)]/35 text-[color:var(--color-primary-deep)]";

  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li className={`rounded-[0.382rem] px-2.5 py-1 text-sm font-semibold ${toneClass}`} key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
