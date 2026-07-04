import { CareNote } from "@/components/CareNote";
import { ContactCTA } from "@/components/ContactCTA";
import { KnownOpenProtected } from "@/components/KnownOpenProtected";
import { MetadataPanel } from "@/components/MetadataPanel";
import { PublicSafetyNote } from "@/components/PublicSafetyNote";
import { SourceLayer } from "@/components/SourceLayer";
import { TagList } from "@/components/TagList";
import { renderBlockKey } from "@/lib/mdx";
import type { WorkContent } from "@/lib/types";

type CaseStudyLayoutProps = {
  item: WorkContent;
};

export function CaseStudyLayout({ item }: CaseStudyLayoutProps) {
  return (
    <article>
      <header className="section-pad source-map">
        <div className="container-page grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-start">
          <div>
            <p className="eyebrow mb-4">Selected system</p>
            <h1 className="text-4xl font-black leading-tight md:text-6xl">{item.meta.title}</h1>
            <p className="mt-5 text-xl font-bold text-[color:var(--color-broadway-blue)]">
              {item.meta.subtitle}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[color:var(--color-muted)]">
              {item.meta.summary}
            </p>
            <div className="mt-6">
              <TagList tags={item.meta.tags} />
            </div>
          </div>
          <MetadataPanel meta={item.meta} />
        </div>
      </header>
      <div className="section-pad section-rule">
        <div className="container-page grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="grid gap-8">
            <PublicSafetyNote note={item.meta.publicSafety?.note} />
            <CareNote note={item.meta.careNote} />
            {item.sections.map((section) => (
              <section className="prose max-w-none" key={section.title}>
                <h2 className="text-2xl font-black">{section.title}</h2>
                <div className="mt-4 grid gap-4 leading-7 text-[color:var(--color-muted)]">
                  {section.blocks.map((block, index) => {
                    if (block.type === "list") {
                      return (
                        <ul className="list-disc pl-6" key={renderBlockKey(section, block, index)}>
                          {block.items.map((listItem) => (
                            <li className="my-2" key={listItem}>
                              {listItem}
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    return <p key={renderBlockKey(section, block, index)}>{block.text}</p>;
                  })}
                </div>
              </section>
            ))}
            <KnownOpenProtected data={item.meta.knownOpenProtected} />
            <SourceLayer credits={item.meta.credits} sourceLayer={item.meta.sourceLayer} />
          </div>
          <aside className="grid content-start gap-4">
            <ContactCTA />
          </aside>
        </div>
      </div>
    </article>
  );
}
