type TagListProps = {
  tags: string[];
  compact?: boolean;
  tone?: "default" | "inverted";
};

export function TagList({ tags, compact = false, tone = "default" }: TagListProps) {
  const toneClasses = tone === "inverted"
    ? "border-jb-paper/45 bg-jb-paper text-jb-blue"
    : "border-jb-blue/30 bg-jb-sky/15 text-jb-blue";

  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className={`rounded border px-3 py-1 font-medium ${toneClasses}`}
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
