import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CaseStudyLayout } from '@/components/CaseStudyLayout';
import { getPublicWorkEntries, getWorkEntryBySlug } from '@/lib/content';
import { pageTitle } from '@/lib/seo';

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getPublicWorkEntries().map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({ params }: WorkPageProps): Promise<Metadata> {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    return {
      title: pageTitle('Work')
    };
  }

  return {
    title: entry.title,
    description: entry.summary
  };
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const entry = getWorkEntryBySlug(slug);

  if (!entry) {
    notFound();
  }

  return <CaseStudyLayout entry={entry} />;
}

