import { notFound } from 'next/navigation'

import { fetchCategory } from '@/services/graphql'

type Params = {
  slug: string[]
}

type Props = {
  params: Promise<Params>
}

const Page = async ({ params }: Props) => {
  const paramData = await params

  const slug = paramData.slug
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

    if (!categoryData.category) {
      return notFound()
    }

    return (
      <main>
        <div>
          <header>
            <section>
              <h1>{categoryData.category.name}</h1>
              <p>{categoryData.category.description}</p>
            </section>
          </header>
        </div>
      </main>
    )
  }
}

export default Page
