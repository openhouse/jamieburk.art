const steps = [
  "Approved source",
  "Structured record",
  "Source-linked draft",
  "Ideas / decisions / open questions",
  "Trust / privacy check",
  "Accepted team memory"
] as const;

export function SourceToMemoryLoop() {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {steps.map((step, index) => (
        <li
          className={`surface relative p-4 ${index === steps.length - 1 ? "bg-[color:var(--color-pale-green)]" : ""}`}
          key={step}
        >
          <span className="text-sm font-black text-[color:var(--color-broadway-blue)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <p className="mt-2 font-bold">{step}</p>
        </li>
      ))}
    </ol>
  );
}
