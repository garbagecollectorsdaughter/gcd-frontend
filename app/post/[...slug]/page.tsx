import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BlogPost } from '@/components/post'
import { fetchPost } from '@/services/graphql'
import { Post } from '@/types'

async function fetchData(slug: string) {
  let post = undefined

  post = await fetchPost(slug)

  if (post) {
    return { post: post }
  }

  return { error: 'No data found' }
}

function RenderPage({ post }: { post: Post }) {
  return (
    <div className="prose lg:prose-lg xl:prose-xl 2xl:prose-2xl mx-auto my-10">
      <BlogPost post={post} />
    </div>
  )
}

export default async function BlogPostPage(props: {
  params: Promise<{ slug: string[] }>
}) {
  const params = await props.params
  const { slug } = params

  if (slug.length !== 1) {
    return notFound()
  }

  const { post, error } = await fetchData(slug[0])

  if (error) {
    return notFound()
  }

  return <RenderPage post={post} />
}
