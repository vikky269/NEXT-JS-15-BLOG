import { Card, CardContent } from '@/components/ui/card';
import { singleBlogCard } from './lib/interface';
import {client, urlFor} from './lib/sanity';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const revalidate = 30

const getData = async () => {
  const query = `*[_type == 'blog'] | order(_createdAt desc) {
     title,
     smallDescription,
     "currentSlug":slug.current,
     titleImage
 }`

  const data = await client.fetch(query)
  return data
}

export default async function Home() {

  const data: singleBlogCard[] = await getData()
  console.log(data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 mt-5 gap-5">
      {data.map((blog, index) => (
        <Card key={index}>
         <Image 
         src={urlFor(blog.titleImage).url()} 
         alt='' 
         width={500} 
         height={500} 
         className='object-cover'
         />
          <CardContent className='mt-5'>
            <h3 className="text-lg font-bold line-clamp-2">{blog.title}</h3>
            <p className='line-clamp-3 mt-3 text-sm text-gray-600 dark:text-gray-300'>{blog.smallDescription}</p>
            <Button asChild className='w-full mt-3'>
               <Link href={`/blog/${blog.currentSlug}`}>
                 Read More
                 </Link>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
