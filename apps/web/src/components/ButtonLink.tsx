import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
};

export function ButtonLink({ href, children, variant = "primary" }: ButtonLinkProps) {
  const classes = {
    primary: "btn btn-primary",
    secondary: "btn btn-outline",
    ghost: "btn btn-ghost"
  };

  return (
    <Link className={classes[variant]} href={href}>
      {children}
    </Link>
  );
}
