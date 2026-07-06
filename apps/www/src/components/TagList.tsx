type TagListProps = {
  tags: string[];
  compact?: boolean;
};

export function TagList({ tags, compact = false }: TagListProps) {
  return (
    <ul className={`flex flex-wrap gap-2 ${compact ? "text-xs" : "text-sm"}`}>
      {tags.map((tag) => (
        <li
          className="rounded-full border border-jb-blue/20 bg-jb-sky/10 px-3 py-1 font-medium text-jb-blue/82"
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
