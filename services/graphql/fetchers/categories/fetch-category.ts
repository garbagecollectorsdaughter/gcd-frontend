import type { Category, Nullable } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

type CategoryResponse = {
  category: Nullable<Category>
}

const categoryQuery = `query Category($slug: ID!) {
  category(id: $slug, idType: SLUG) {
    key: id
    description
    slug
    name
  }
}`

export const fetchCategory = async (slug: string) => {
  const response = await fetchGraphQL<CategoryResponse>({
    query: categoryQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  })

  if (response.category) {
    return { category: response.category }
  }

  return { error: true }
}
