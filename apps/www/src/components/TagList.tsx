type TagListProps = {
  tags: string[];
  compact?: boolean;
};

export function TagList({ tags, compact = false }: TagListProps) {
  return (
    <ul
      className={`font-condensed flex flex-wrap gap-2 tracking-wide ${compact ? "text-xs" : "text-sm"}`}
    >
      {tags.map((tag) => (
        <li
          className="rounded-full border border-jb-blue/30 bg-jb-sky/15 px-3 py-1 font-medium text-jb-blue"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
