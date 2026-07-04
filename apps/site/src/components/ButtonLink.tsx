import Link from "next/link";
import type { Route } from "next";
import { ArrowRight, Download, Mail } from "lucide-react";

type ButtonLinkProps = {
  href: string | URL;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  icon?: "arrow" | "download" | "mail";
};

const variants = {
  primary: "btn-primary",
  secondary: "btn-secondary",
  ghost: "btn-outline"
} as const;

export function ButtonLink({ href, children, variant = "primary", icon = "arrow" }: ButtonLinkProps) {
  const Icon = icon === "download" ? Download : icon === "mail" ? Mail : ArrowRight;

  return (
    <Link className={`btn ${variants[variant]} rounded-md`} href={href as Route}>
      <span>{children}</span>
      <Icon aria-hidden="true" size={18} strokeWidth={2.2} />
    </Link>
  );
}
