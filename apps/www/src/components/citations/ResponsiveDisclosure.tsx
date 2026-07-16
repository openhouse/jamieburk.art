"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ResponsiveDisclosureProps = {
  children: ReactNode;
  summary: string;
};

export function ResponsiveDisclosure({ children, summary }: ResponsiveDisclosureProps) {
  const disclosureRef = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const disclosure = disclosureRef.current;

    if (!disclosure) return undefined;

    const containsHashTarget = () => {
      if (!window.location.hash) return false;
      try {
        const target = document.querySelector(window.location.hash);
        return Boolean(target && disclosure.contains(target));
      } catch {
        return false;
      }
    };

    const openHashTarget = () => {
      if (containsHashTarget()) disclosure.open = true;
    };

    openHashTarget();
    window.addEventListener("hashchange", openHashTarget);

    return () => {
      window.removeEventListener("hashchange", openHashTarget);
    };
  }, []);

  return (
    <details className="jb-endnotes-disclosure" ref={disclosureRef}>
      <summary>{summary}</summary>
      {children}
    </details>
  );
}
