import { site } from "@/data/site";

export function ResumeDownload() {
  return (
    <div className="surface p-5">
      <h2 className="text-xl font-bold">Resume PDF</h2>
      <p className="mt-3 leading-7 text-[color:var(--color-muted)]">
        The site is scaffolded for a resume download at <code>{site.resumePath}</code>. Add Jamie&apos;s current approved PDF before production launch.
      </p>
      <a className="btn btn-primary mt-5 min-h-11 rounded-[0.382rem] normal-case" href={`mailto:${site.email}?subject=Resume%20request`}>
        Request current resume
      </a>
    </div>
  );
}
