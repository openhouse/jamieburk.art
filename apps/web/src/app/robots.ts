import { site } from '@/data/site'; export default function robots(){return {rules:{userAgent:'*',allow:'/'}, sitemap:`${site.url}/sitemap.xml`};}
