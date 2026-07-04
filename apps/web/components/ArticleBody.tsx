function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={part}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export function ArticleBody({ body }: { body: string }) {
  const blocks = body.split(/\n{2,}/).filter(Boolean);

  return (
    <div className="measure text-base leading-7 text-jamie-muted">
      {blocks.map((block) => {
        if (block.startsWith("## ")) {
          return (
            <h2 className="mt-10 text-2xl font-semibold text-jamie-ink" key={block}>
              {block.replace("## ", "")}
            </h2>
          );
        }

        if (block.startsWith("- ")) {
          const items = block.split("\n").map((line) => line.replace(/^- /, ""));

          return (
            <ul className="mt-4 list-disc space-y-2 pl-6" key={block}>
              {items.map((item) => (
                <li key={item}>{renderInline(item)}</li>
              ))}
            </ul>
          );
        }

        return (
          <p className="mt-4" key={block}>
            {renderInline(block)}
          </p>
        );
      })}
    </div>
  );
}
