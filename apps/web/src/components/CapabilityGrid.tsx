import { capabilities } from '@/data/capabilities';

export function CapabilityGrid() {
  return (
    <section className="golden-shell py-16">
      <div className="golden-aside-layout">
        <div>
          <p className="eyebrow">What I do</p>
          <h2 className="mt-3 text-3xl font-semibold md:text-4xl">Operating structure for work that has outgrown improvisation.</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {capabilities.map((capability) => (
            <article key={capability.title} className="rounded-lg border border-base-content/10 bg-base-200 p-5">
              <h3 className="text-xl font-semibold">{capability.title}</h3>
              <p className="mt-3 text-base-content/75">{capability.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

