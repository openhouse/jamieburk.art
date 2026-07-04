import type { Metadata } from "next";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { site } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Jamie Burkart - Technical Project Manager | Product Operations & Implementation",
    template: "%s - Jamie Burkart Portfolio",
  },
  description:
    "Brooklyn-based technical project manager creating operating structure across product operations, implementation, documentation, civic technology, web systems, and public-facing tools.",
  openGraph: {
    title: "Jamie Burkart - Technical Project Manager",
    description: "Operating structure for complex public-facing teams.",
    url: site.url,
    siteName: "Jamie Burkart Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="jamie">
      <body>
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main-content">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
