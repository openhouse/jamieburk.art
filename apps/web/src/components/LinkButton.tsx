import Link from "next/link";
import type { Route } from "next";

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-outline border-[color:var(--color-primary)] text-[color:var(--color-primary)] hover:bg-[color:var(--color-primary)] hover:text-white",
  ghost: "btn-ghost"
};

export function LinkButton({ href, children, variant = "secondary" }: LinkButtonProps) {
  const className = `btn min-h-11 rounded-[0.382rem] px-5 normal-case ${variants[variant]}`;

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a className={className} href={href}>
        {children}
      </a>
    );
  }

  return (
    <Link className={className} href={href as Route}>
      {children}
    </Link>
  );
}
