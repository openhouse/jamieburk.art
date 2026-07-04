import type { Metadata } from "next";
import "./globals.css";
import { GoldenGridOverlay } from "@/components/GoldenGridOverlay";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: {
    default: "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
    template: "%s - Jamie Burkart Portfolio"
  },
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, and public-facing tools.",
  metadataBase: new URL(site.url)
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="jamie">
      <body>
        <a className="skip-link btn btn-primary" href="#main-content">
          Skip to content
        </a>
        <div className="site-shell">
          <SiteHeader />
          <main className="page-frame" id="main-content">
            {children}
          </main>
          <SiteFooter />
        </div>
        <GoldenGridOverlay />
      </body>
    </html>
  );
}
