import Link from 'next/link'
import { fetchPosts } from '@/services/graphql'
import type { Post } from '@/types'
import { formatDateAsString } from '@/utils'

type Props = {}

export default async function PostIndex(_props: Props) {
  const data = await fetchPosts()
  const posts: Post[] = data.posts?.nodes ?? []

  return (
    <main>
      <header className="py-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <p className="text-muted-foreground">Latest posts from the site</p>
      </header>

      {posts.length === 0 ? (
        <p className="my-10 text-center text-xl">No posts found.</p>
      ) : (
        <ul className="space-y-8">
          {posts.map((post: Post) => (
            <li key={post.key} className="">
              <article>
                <header className="mb-2">
                  <h2 className="text-2xl font-semibold">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <div className="text-sm text-gray-600">
                    <time dateTime={post.date}>
                      {formatDateAsString(post.date)}
                    </time>
                    {' — '}
                    {post.categories?.nodes?.[0] && (
                      <Link
                        href={post.categories.nodes[0].uri}
                        className="ml-2 badge badge-accent"
                      >
                        {post.categories.nodes[0].name}
                      </Link>
                    )}
                  </div>
                </header>

                <section
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
