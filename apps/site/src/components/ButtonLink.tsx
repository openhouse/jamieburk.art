import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-outline border-accent text-accent hover:bg-accent hover:text-white",
  ghost: "btn-ghost text-accent"
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  return (
    <Link className={`btn ${variants[variant]} rounded-sm`} href={href}>
      {children}
    </Link>
  );
}
