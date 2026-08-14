import { FieldPhoto } from "@/components/FieldPhoto";
import { portfolioPhotos } from "@/data/photography";

export function ResidentServiceSequence() {
  const flyer = portfolioPhotos.kcTownHallTiredOfTiresFlyer;
  const before = portfolioPhotos.kcTownHallTiredOfTiresBefore;
  const after = portfolioPhotos.kcTownHallTiredOfTiresAfter;

  return (
    <section
      aria-labelledby="resident-service-sequence-title"
      className="not-prose my-12 border-y border-jb-ink/18 py-10"
    >
      <div className="grid gap-5 lg:grid-cols-[0.36fr_0.64fr] lg:items-end">
        <h2
          className="text-3xl font-semibold leading-tight text-jb-ink sm:text-4xl"
          id="resident-service-sequence-title"
        >
          A service promised, delivered, and documented
        </h2>
        <p className="max-w-3xl leading-7 text-jb-ink/76">
          The outreach design made a recurring resident service usable at
          the curb: who qualified, what residents could request, and when the
          pickup would happen. The matched field photographs show one collection
          site before and after the tires were removed.
        </p>
      </div>

      <div className="mt-8">
        <FieldPhoto
          imageClassName="aspect-[912/500]"
          photo={flyer}
          sizes="(min-width: 1280px) 860px, 100vw"
        />
      </div>

      <div className="mt-8 grid gap-7 sm:grid-cols-2 sm:items-start">
        <FieldPhoto
          imageClassName="aspect-[912/670]"
          photo={before}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
        />
        <FieldPhoto
          imageClassName="aspect-[912/670]"
          photo={after}
          sizes="(min-width: 1024px) 34vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <p className="mt-6 max-w-3xl text-sm leading-6 text-jb-ink/72">
        This sequence documents the project-level service interface and one
        completed collection. It does not publish resident records, an address,
        obsolete contact details, or an audited program total.
      </p>
    </section>
  );
}
