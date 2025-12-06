import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/post'
import { fetchPost } from '@/services/graphql'
import { Post } from '@/types'

async function fetchData(slug: string): Promise<Post | null> {
  try {
    return await fetchPost(slug)
  } catch {
    return null
  }
}

function RenderPage({ post }: { post: Post }) {
  return <BlogPost post={post} />
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string[] }>
}) {
  const { slug } = await params

  if (slug.length !== 1) {
    return notFound()
  }

  const post = await fetchData(slug[0])

  if (!post) {
    return notFound()
  }

  return <RenderPage post={post} />
}
