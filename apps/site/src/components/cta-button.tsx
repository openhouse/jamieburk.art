import type { Route } from "next";
import Link from "next/link";

type CtaButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "quiet";
};

const variantClasses = {
  primary: "btn-primary",
  secondary: "btn-outline",
  quiet: "btn-ghost"
} as const;

export function CtaButton({ href, children, variant = "primary" }: CtaButtonProps) {
  return (
    <Link className={`btn ${variantClasses[variant]} rounded-lg`} href={href as Route}>
      {children}
    </Link>
  );
}
