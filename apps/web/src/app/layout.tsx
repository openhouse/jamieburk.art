import type { Metadata, Viewport } from 'next';
import { Karla } from 'next/font/google';
import { GoldenGridOverlay } from '@/components/GoldenGridOverlay';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { site } from '@/data/site';
import { absoluteUrl } from '@/lib/seo';
import './globals.css';

const karla = Karla({
  subsets: ['latin'],
  variable: '--font-karla',
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.name,
    template: `%s | ${site.name}`
  },
  description: site.description,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${site.name} portfolio`
      }
    ],
    locale: 'en_US',
    type: 'website'
  },
  robots: {
    index: true,
    follow: true
  }
};

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#eeefec',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-theme="jamie" data-contrast="standard">
      <body className={karla.variable}>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <GoldenGridOverlay />
      </body>
    </html>
  );
}

