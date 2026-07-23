type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "inverted";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const toneClasses = tone === "inverted"
    ? "border-white/45 text-white"
    : "border-jb-blue/35 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`border px-2 py-1 font-medium ${toneClasses}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
