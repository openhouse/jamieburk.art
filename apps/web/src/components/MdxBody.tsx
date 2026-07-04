import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { mdxComponents } from '@/mdx-components';

type MdxBodyProps = {
  source: string;
};

export function MdxBody({ source }: MdxBodyProps) {
  return (
    <div className="prose-body">
      <MDXRemote
        source={source}
        components={mdxComponents}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm]
          }
        }}
      />
    </div>
  );
}

