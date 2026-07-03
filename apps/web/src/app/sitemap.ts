import { site } from '@/data/site'; import { getAllWork } from '@/lib/content';
export default function sitemap(){const routes=['','/work','/work/technical-operations','/about','/resume','/contact','/colophon']; return [...routes.map(r=>({url:`${site.url}${r}`,lastModified:new Date()})),...getAllWork().map(w=>({url:`${site.url}/work/${w.slug}`,lastModified:new Date()}))];}
