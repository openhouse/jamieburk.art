import type { Metadata } from 'next'; import { Karla } from 'next/font/google'; import './globals.css'; import { SiteHeader } from '@/components/SiteHeader'; import { SiteFooter } from '@/components/SiteFooter'; import { site } from '@/data/site';
const karla = Karla({ subsets: ['latin'], variable: '--font-karla' });
export const metadata: Metadata = { metadataBase: new URL(site.url), title: { default: `${site.name} — ${site.role}`, template: `%s — ${site.name}` }, description: site.description };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" data-theme="jamie"><body className={karla.className}><SiteHeader/><main className="mx-auto max-w-6xl px-4 py-10">{children}</main><SiteFooter/></body></html>}
