import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { fetchCategory, fetchPostsByCategory } from '@/services/graphql'
import { Post } from '@/types'
import { formatDateAsString } from '@/utils'

type Params = {
  slug: string[]
}

type Props = {
  params: Promise<Params>
}

const Page = async ({ params }: Props) => {
  const paramsData = await params

  const slug = paramsData.slug
  const length = slug.length

  if (length < 1) {
    return (
      <div>
        <h1>No category slug provided</h1>
      </div>
    )
  }

  const categorySlug = slug

  if (length === 1) {
    const categoryData = await fetchCategory(categorySlug[0])
    const categoryPostsData = await fetchPostsByCategory(categorySlug[0])

    if (!categoryData.category) {
      return notFound()
    }

    console.log('categoryPostsData', categoryPostsData)

    const postsData = categoryPostsData.posts?.nodes

    return (
      <main>
        <div>
          <header>
            <section>
              <h1>{categoryData.category.name}</h1>
              <p>{categoryData.category.description}</p>
            </section>
          </header>

          {!postsData ||
            (postsData.length === 0 && (
              <p className="my-10 text-center text-xl md:text-2xl lg:text-3xl">
                No posts found in this category.
              </p>
            ))}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {postsData &&
              postsData.map((post: Post) => (
                <article
                  key={post.slug}
                  className="border-2 border-accent rounded-lg p-4 hover:shadow-lg transition-shadow duration-300"
                >
                  <h2 className="text-on-surface text-xl font-bold mb-2">
                    <Link href={`/post/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="text-on-surface-variant text-sm mb-4">
                    Published on {formatDateAsString(post.date)}
                  </p>
                  <div
                    className="text-on-surface leading-6"
                    dangerouslySetInnerHTML={{ __html: post.excerpt }}
                  />
                </article>
              ))}
          </div>
        </div>
      </main>
    )
  }
}

export default Page
