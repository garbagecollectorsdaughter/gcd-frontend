'use client'

import { useState } from 'react'
import { useToast } from '@/context/ToastContext'
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
  const { addToast } = useToast()

  const loadMore = async () => {
    if (!pageInfo.hasNextPage) return
    if (loading) return

    setLoading(true)

    try {
      const after = pageInfo.endCursor ?? ''
      const res = await fetch(`/api/posts?after=${encodeURIComponent(after)}`)

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`)
      }

      const json = await res.json()

      const newPosts: Post[] = json.posts?.nodes ?? []
      const newPageInfo = json.posts?.pageInfo ?? {}

      setPosts((p) => [...p, ...newPosts])
      setPageInfo(newPageInfo)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err)
      // show a friendly toast and keep the technical details in the console
      addToast({ type: 'error', message: 'Unable to load more posts.' })
      // also log technical details for developer debugging
      // eslint-disable-next-line no-console
      console.error('PostsList loadMore error:', message)
    } finally {
      setLoading(false)
    }
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
          <div aria-live="polite" className="sr-only">
            {loading ? 'Loading more posts…' : ''}
          </div>

          <button
            className="btn inline-flex items-center"
            onClick={loadMore}
            disabled={loading}
            aria-busy={loading}
            aria-disabled={loading}
          >
            {loading ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Loading…
              </>
            ) : (
              'Load more'
            )}
          </button>
        </div>
      ) : null}
    </div>
  )
}
