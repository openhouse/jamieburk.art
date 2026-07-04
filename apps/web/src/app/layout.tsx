import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  metadataBase: new URL("https://jamieburk.art"),
  title: {
    default: "Jamie Burkart | Technical Project Manager",
    template: "%s | Jamie Burkart"
  },
  description:
    "Public-safe portfolio for Jamie Burkart, a technical project manager and implementation lead who turns under-structured public-facing work into usable systems.",
  alternates: {
    canonical: "/"
  },
  openGraph: {
    title: "Jamie Burkart | Technical Project Manager",
    description:
      "Operating structure, documentation, workflows, public-facing tools, and durable handoffs.",
    url: "https://jamieburk.art",
    siteName: "Jamie Burkart Portfolio",
    type: "website"
  }
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#0b5f81"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html data-theme="jamie" lang="en">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main className="site-main" id="main-content">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
