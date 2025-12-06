import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types'
import { formatDateAsString } from '@/utils'
import rainbows from '~/images/dividers/rainbows.gif'

export function BlogPost({ post }: { post: Post }) {
  return (
    <section className="p-2 max-w-full lg:max-w-[80%] mx-auto">
      <header className="flex flex-col items-center gap-1.5 mb-10">
        <Link
          href={post.categories.nodes[0].uri}
          className="badge badge-accent"
        >
          {post.categories.nodes[0].name}
        </Link>
        <h1 className="py-2.5 font-sans text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
          {post.title}
        </h1>
        <ul className="list-none flex gap-1 mb-4 text-sm">
          <li className="">
            <span>{formatDateAsString(post.date)}</span>
          </li>
          <li className="">
            by <span>{post.author.node.name}</span>
          </li>
        </ul>
        <div className="">
          <Image src={rainbows} alt="" />
        </div>
      </header>
      {post.featuredImage && (
        <figure className="">
          <Image
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || ''}
            width={post.featuredImage.node.mediaDetails.width}
            height={post.featuredImage.node.mediaDetails.height}
          />
        </figure>
      )}

      <article
        className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </section>
  )
}
