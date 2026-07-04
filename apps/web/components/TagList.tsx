type TagListProps = {
  tags: string[];
  tone?: "blue" | "warm";
};

export function TagList({ tags, tone = "blue" }: TagListProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Tags">
      {tags.map((tag) => (
        <li
          className={
            tone === "warm"
              ? "tag border-[#a55237]/25 bg-[#ffa77f]/20 text-[#764c42]"
              : "tag"
          }
          key={tag}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}
