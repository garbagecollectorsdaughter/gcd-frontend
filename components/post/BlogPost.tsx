import Image from 'next/image'
import Link from 'next/link'
import { Post } from '@/types'
import { formatDateAsString } from '@/utils'
import rainbows from '~/images/dividers/rainbows.gif'

export function BlogPost({ post }: { post: Post }) {
  return (
    <div className="my-12 mx-auto">
      <section className="post">
        <header className="text-center mb-8 mt-10">
          <Link
            href={post.categories.nodes[0].uri}
            className="lowercase tracking-wider align-baseline text-on-accent text-2xl font-cursive mt-2.5 mb-4 hover:text-on-surface-variant"
          >
            {post.categories.nodes[0].name}
          </Link>
          <h1 className="mt-0 mr-0 mb-1.5 ml-0 block font-serif text-4xl wrap-break-word font-light">
            {post.title}
          </h1>
          <ul className="clear-both overflow-hidden text-base tracking-wider m-0 list-none uppercase font-mono leading-4">
            <li className="inline-block my-0 mx-1.5 leading-8">
              <span>{formatDateAsString(post.date)}</span>
            </li>
            <li className="inline-block my-0 mx-1.5 leading-8">
              by <span>{post.author.node.name}</span>
            </li>
          </ul>
          <div className="flex justify-center mb-4 mt-2.5">
            <Image src={rainbows} alt="" />
          </div>
        </header>
        {post.featuredImage && (
          <figure className="featured-image">
            <Image
              src={post.featuredImage.node.sourceUrl}
              alt={post.featuredImage.node.altText || ''}
              width={post.featuredImage.node.mediaDetails.width}
              height={post.featuredImage.node.mediaDetails.height}
            />
          </figure>
        )}

        <article dangerouslySetInnerHTML={{ __html: post.content }} />
      </section>
    </div>
  )
}
