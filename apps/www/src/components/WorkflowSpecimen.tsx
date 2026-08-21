type WorkflowStep = {
  label: string;
  detail: string;
};

type WorkflowSpecimenProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  steps: WorkflowStep[];
  boundary: string;
};

export function WorkflowSpecimen({
  id,
  eyebrow,
  title,
  description,
  steps,
  boundary
}: WorkflowSpecimenProps) {
  return (
    <figure
      aria-labelledby={`${id}-title`}
      className="not-prose my-8 border-y border-jb-ink/15 bg-jb-sky/10 py-6"
    >
      <figcaption className="max-w-3xl px-1">
        <p className="text-xs font-semibold uppercase text-jb-blue">{eyebrow}</p>
        <h3 className="mt-2 text-xl font-semibold text-jb-ink" id={`${id}-title`}>
          {title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-jb-ink/76">{description}</p>
      </figcaption>
      <ol className="mt-6 grid gap-px overflow-hidden border border-jb-ink/15 bg-jb-ink/15 sm:grid-cols-2 lg:grid-cols-5">
        {steps.map((step, index) => (
          <li className="min-h-40 bg-white p-4" key={step.label}>
            <span className="text-xs font-semibold text-jb-blue">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-5 text-base font-semibold text-jb-ink">{step.label}</h4>
            <p className="mt-2 text-sm leading-6 text-jb-ink/72">{step.detail}</p>
          </li>
        ))}
      </ol>
      <p className="mt-4 max-w-4xl px-1 text-xs leading-5 text-jb-ink/64">
        <strong className="font-semibold text-jb-ink">Boundary:</strong> {boundary}
      </p>
    </figure>
  );
}
