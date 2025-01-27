import { FullBlog } from '@/app/lib/interface';
import { client, urlFor } from '../../lib/sanity';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';

export const revalidate = 30

// Fetch the data from Sanity
async function getData(slug: string) {
  const query = `
    *[_type == 'blog' && slug.current == $slug][0] {
      "currentSlug": slug.current,
      title,
      content,
      titleImage
    }
  `;

  const data = await client.fetch(query, { slug });
  return data;
}

// Adjust props interface to match Next.js requirements
const BlogArticle = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const resolvedParams = await params; // Resolve the params if they are a Promise
  const data: FullBlog = await getData(resolvedParams.slug);

  return (
    <div className="mt-8">
      <h1>
        <span className="block text-base text-center text-primary font-semibold tracking-wide uppercase">
          Jan Marshall - Blog
        </span>
        <span className="mt-2 block text-3xl text-center leading-8 font-bold tracking-tight sm:text-4xl">
          {data.title}
        </span>
      </h1>

      <Image
        src={urlFor(data.titleImage).url()}
        alt=""
        width={800}
        height={800}
        priority
        className="object-cover mt-8 rounded-lg"
      />

      <div className="mt-16 prose prose-blue prose-lg dark:prose-invert prose-headings:underline">
        <PortableText value={data.content} />
      </div>
    </div>
  );
};

export default BlogArticle;
