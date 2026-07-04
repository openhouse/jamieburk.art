type ContentBodyProps = {
  body: string;
};

export function ContentBody({ body }: ContentBodyProps) {
  const blocks = body
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean);

  return (
    <div className="prose-jamie">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return <h2 key={block}>{block.replace(/^## /, "")}</h2>;
        }

        if (block.startsWith("### ")) {
          return <h3 key={block}>{block.replace(/^### /, "")}</h3>;
        }

        if (block.startsWith("- ")) {
          return (
            <ul className="list-disc space-y-2 pl-5" key={block}>
              {block.split("\n").map((line) => (
                <li key={line}>{line.replace(/^- /, "")}</li>
              ))}
            </ul>
          );
        }

        return <p key={block}>{block}</p>;
      })}
    </div>
  );
}
