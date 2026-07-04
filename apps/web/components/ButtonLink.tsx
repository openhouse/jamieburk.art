import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  download?: boolean;
};

const variants = {
  primary:
    "border-primary bg-primary text-primary-content hover:bg-[#084b67] hover:border-[#084b67]",
  secondary:
    "border-secondary bg-secondary text-secondary-content hover:bg-[#224b47] hover:border-[#224b47]",
  ghost:
    "border-base-300 bg-base-200 text-base-content hover:border-primary hover:text-primary"
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  download
}: ButtonLinkProps) {
  const className = `inline-flex min-h-11 items-center justify-center rounded-md border px-4 py-2 text-sm font-bold no-underline transition ${variants[variant]}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a
        className={className}
        href={href}
        rel={href.startsWith("http") ? "noreferrer" : undefined}
        target={href.startsWith("http") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link className={className} download={download} href={href}>
      {children}
    </Link>
  );
}
