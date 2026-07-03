import { notFound } from 'next/navigation'; import { getAllWork, getWorkBySlug } from '@/lib/content'; import { CaseStudyLayout } from '@/components/CaseStudyLayout';
export function generateStaticParams(){return getAllWork().map(w=>({slug:w.slug}));}
export default async function WorkDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params; const work=getWorkBySlug(slug); if(!work) notFound(); const Mdx=(await import(`@/content/work/${slug}.mdx`)).default; return <CaseStudyLayout work={work}><Mdx/></CaseStudyLayout>}
