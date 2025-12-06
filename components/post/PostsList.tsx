'use client'

import { useState } from 'react'
import type { Post } from '@/types'

type PageInfo = {
  endCursor?: string | null
  hasNextPage?: boolean
}

export default function PostsList({
  initialPosts,
  initialPageInfo,
}: {
  initialPosts: Post[]
  initialPageInfo?: PageInfo
}) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [pageInfo, setPageInfo] = useState<PageInfo>(initialPageInfo ?? {})
  const [loading, setLoading] = useState(false)

  const loadMore = async () => {
    if (!pageInfo.hasNextPage) return
    setLoading(true)

    const after = pageInfo.endCursor ?? ''
    const res = await fetch(`/api/posts?after=${encodeURIComponent(after)}`)
    const json = await res.json()

    const newPosts: Post[] = json.posts?.nodes ?? []
    const newPageInfo = json.posts?.pageInfo ?? {}

    setPosts((p) => [...p, ...newPosts])
    setPageInfo(newPageInfo)
    setLoading(false)
  }

  return (
    <div>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.key}>
            <article>
              <header>
                <h3 className="text-xl font-semibold">
                  <a href={`/post/${post.slug}`}>{post.title}</a>
                </h3>
                <div className="text-sm text-gray-600">{post.date}</div>
              </header>
              <section
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.excerpt }}
              />
            </article>
          </li>
        ))}
      </ul>

      {pageInfo.hasNextPage ? (
        <div className="mt-6">
          <button className="btn" onClick={loadMore} disabled={loading}>
            {loading ? 'Loading…' : 'Load more'}
          </button>
        </div>
      ) : null}
    </div>
  )
}
