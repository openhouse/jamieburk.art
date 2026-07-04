type TagListProps = {
  tags: string[];
};

export function TagList({ tags }: TagListProps) {
  if (tags.length === 0) {
    return null;
  }

  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li className="badge badge-ghost rounded-md" key={tag}>
          {tag}
        </li>
      ))}
    </ul>
  );
}
