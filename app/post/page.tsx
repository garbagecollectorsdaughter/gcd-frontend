import Link from 'next/link'
import PostsList from '@/components/post/PostsList'
import { fetchPosts } from '@/services/graphql'
import type { Post } from '@/types'

type Props = {}

export default async function PostIndex(_props: Props) {
  const data = await fetchPosts(10)
  const posts: Post[] = data.posts?.nodes ?? []
  const pageInfo = data.posts?.pageInfo ?? { hasNextPage: false }

  return (
    <main>
      <header className="py-6">
        <h1 className="text-3xl font-bold">Posts</h1>
        <p className="text-muted-foreground">Latest posts from the site</p>
      </header>

      {posts.length === 0 ? (
        <p className="my-10 text-center text-xl">No posts found.</p>
      ) : (
        <div>
          <PostsList initialPosts={posts} initialPageInfo={pageInfo} />
        </div>
      )}
    </main>
  )
}
