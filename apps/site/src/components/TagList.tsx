type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li className="badge badge-outline" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
