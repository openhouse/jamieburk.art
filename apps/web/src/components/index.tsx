import { goldenGuides, oilPastels } from "@jamie/design";
import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

const contactEmail = "hello@jamieburk.art";
const resumeHref = "/resume/Jamie-Burkart-Resume-Technical-Project-Manager.pdf";

export function SiteHeader() {
  const navItems = [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/resume", label: "Resume" },
    { href: "/contact", label: "Contact" }
  ] as const;

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link className="brand-mark" href="/">
          <strong>Jamie Burkart</strong>
          <span>Technical Project Manager</span>
        </Link>
        <nav aria-label="Primary navigation" className="site-nav">
          {navItems.map((item) => (
            <Link className="nav-link" href={item.href} key={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div>
          <strong>Jamie Burkart</strong>
          <p>
            Technical Project Manager -- Product Operations & Implementation. Public-safe proof
            site for operating structure, documentation, workflows, and durable handoffs.
          </p>
        </div>
        <nav aria-label="Footer navigation" className="footer-links">
          <Link href="/work/technical-operations">Technical Ops</Link>
          <Link href="/lab/source-backed-team-memory">Lab</Link>
          <Link href="/colophon">Colophon</Link>
          <a href="https://github.com/openhouse/jamieburk.art">GitHub</a>
          <a href={`mailto:${contactEmail}`}>Email</a>
        </nav>
      </div>
    </footer>
  );
}

export function CTAButton({
  href,
  children,
  variant = "primary",
  download
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
}) {
  const className =
    variant === "primary"
      ? "btn btn-primary jamie-btn"
      : variant === "secondary"
        ? "btn btn-secondary jamie-btn"
        : "btn btn-outline jamie-btn";

  return (
    <a className={className} download={download} href={href}>
      {children}
    </a>
  );
}

export function Hero() {
  return (
    <section className="hero-section">
      <div className="section-inner hero-grid">
        <div>
          <p className="eyebrow">Technical Project Manager -- Product Operations & Implementation</p>
          <h1 className="hero-title">Jamie Burkart</h1>
          <p className="hero-role">I turn under-structured work into usable systems.</p>
          <p className="hero-copy">
            Requirements, workflows, documentation, decision trails, launch support, onboarding,
            public-facing tools, source-backed memory, and durable handoffs for civic, cultural,
            small-business, community, and public-facing teams.
          </p>
          <p className="hero-copy">
            I make messy public systems easier to enter, remember, and repair.
          </p>
          <div className="action-row">
            <CTAButton href="/work">View selected work</CTAButton>
            <CTAButton download href={resumeHref} variant="secondary">
              Download resume
            </CTAButton>
            <CTAButton href={`mailto:${contactEmail}`} variant="ghost">
              Contact Jamie
            </CTAButton>
          </div>
        </div>
        <GoldenFrame>
          <div aria-label="A public-safe artifact board" className="artifact-board">
            <Image
              alt="Public-safe artifact map showing source maps, decision records, and handoff structures as connected notes"
              className="artifact-map-image"
              height={820}
              priority
              src="/images/work/operating-structure-board.png"
              width={1200}
            />
            <div className="artifact-note" style={noteStyle("#0b5f81")}>
              <strong>Current state</strong>
              Ambiguous work, scattered sources, high-context decisions.
            </div>
            <div className="artifact-note" style={noteStyle("#568e62")}>
              <strong>Desired state</strong>
              Requirements, workflows, decision records, and handoffs people can use.
            </div>
            <div className="artifact-note" style={noteStyle("#d04667")}>
              <strong>Protected</strong>
              Private notes, identities, approvals, and sensitive operational details.
            </div>
          </div>
        </GoldenFrame>
      </div>
    </section>
  );
}

function noteStyle(color: string): CSSProperties {
  return { "--note-color": color } as CSSProperties;
}

export function ProofStrip({ items }: { items: { value: string; label: string }[] }) {
  return (
    <div className="proof-strip">
      {items.map((item) => (
        <div className="proof-item" key={item.label}>
          <strong>{item.value}</strong>
          <span>{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function CapabilityGrid({ items }: { items: string[] }) {
  return (
    <div className="capability-grid">
      {items.map((item) => (
        <div className="capability-item" key={item}>
          {item}
        </div>
      ))}
    </div>
  );
}

export function ContentStateBadge({ state }: { state: string }) {
  return <span className="content-badge">{state}</span>;
}

export function ProjectCard({
  project
}: {
  project: {
    slug: string;
    title: string;
    summary: string;
    role: string;
    dates: string;
    contentState: string;
    tags: string[];
    accentColor?: string;
  };
}) {
  const style = { "--card-color": project.accentColor ?? "#0b5f81" } as CSSProperties;

  return (
    <a className="project-card" href={`/work/${project.slug}`} style={style}>
      <div>
        <div className="meta-row">
          <ContentStateBadge state={project.contentState} />
          <span>{project.dates}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.summary}</p>
      </div>
      <div className="tag-row" aria-label={`${project.title} tags`}>
        {project.tags.slice(0, 4).map((tag) => (
          <span className="badge badge-outline" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </a>
  );
}

export function PublicSafetyNote({ children }: { children: ReactNode }) {
  return (
    <aside className="safety-note">
      <strong>Public-safety note</strong>
      <div>{children}</div>
    </aside>
  );
}

export function KnownOpenProtected({
  known,
  open,
  protectedItems
}: {
  known: string[];
  open: string[];
  protectedItems: string[];
}) {
  const panels = [
    { tone: "known", title: "Known", items: known },
    { tone: "open", title: "Open", items: open },
    { tone: "protected", title: "Protected", items: protectedItems }
  ];

  return (
    <div className="kop-grid">
      {panels.map((panel) => (
        <section className="kop-panel" data-tone={panel.tone} key={panel.title}>
          <h3>{panel.title}</h3>
          <ul>
            {panel.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

export function SourceTrail({ items }: { items: string[] }) {
  return (
    <aside className="source-trail">
      <h3>Source trail</h3>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </aside>
  );
}

export function HandoffSummary({ children }: { children: ReactNode }) {
  return (
    <aside className="handoff-summary">
      <h3>Handoff summary</h3>
      <div>{children}</div>
    </aside>
  );
}

export function ArtifactCard({
  title,
  description
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="artifact-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

export function ArtifactList({
  items
}: {
  items: { title: string; description: string }[];
}) {
  return (
    <div className="grid-2">
      {items.map((item) => (
        <ArtifactCard description={item.description} key={item.title} title={item.title} />
      ))}
    </div>
  );
}

export function GoldenFrame({ children }: { children: ReactNode }) {
  return (
    <div className="golden-frame">
      <GuideOverlay />
      {children}
    </div>
  );
}

export function GuideOverlay() {
  return (
    <div aria-hidden="true" className="guide-overlay">
      {goldenGuides.slice(1, -1).map((guide) => (
        <span key={guide.label} style={{ left: guide.value }} />
      ))}
    </div>
  );
}

export function PaletteSwatch({
  name,
  value,
  use
}: {
  name: string;
  value: string;
  use?: string;
}) {
  const darkText = ["#eeefec", "#f7f1e8", "#fce1d1", "#f7ec86", "#fae367", "#beebc7", "#74c2e5", "#fcf939", "#00ffe1"].includes(
    value.toLowerCase()
  );
  const style = {
    background: value,
    "--swatch-ink": darkText ? "#343435" : "#ffffff"
  } as CSSProperties;

  return (
    <div className="palette-swatch" style={style}>
      <strong>{name}</strong>
      <code>{value}</code>
      {use ? <span>{use}</span> : null}
    </div>
  );
}

export function SwatchStrip() {
  return (
    <div className="swatch-strip">
      {oilPastels.map((swatch) => (
        <PaletteSwatch key={swatch.name} name={swatch.name} use={swatch.use} value={swatch.value} />
      ))}
    </div>
  );
}

export function ResumeDownload() {
  return (
    <section className="resume-panel">
      <h2 className="compact-heading">Resume</h2>
      <p>
        Download the public Technical Project Manager resume. Replace this file when Jamie approves
        the current PDF for launch.
      </p>
      <CTAButton download href={resumeHref}>
        Download resume PDF
      </CTAButton>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="contact-panel">
      <h2 className="compact-heading">Contact</h2>
      <p>
        Best fit: technical operations, implementation, civic/public-interest technology,
        documentation, requirements, launch support, and source-backed team memory.
      </p>
      <CTAButton href={`mailto:${contactEmail}`}>Email Jamie</CTAButton>
    </section>
  );
}

export function ColophonSection({
  title,
  children
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="colophon-section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export const MDXComponents = {
  ArtifactCard,
  ArtifactList,
  HandoffSummary,
  KnownOpenProtected,
  PublicSafetyNote,
  SourceTrail
};
