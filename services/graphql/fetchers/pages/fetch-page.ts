import type { Nullable, WPPage } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

export type PageResponse = {
  page: Nullable<WPPage>
}

const pageQuery = `query Page($slug: ID = "URI") {
  page(id: $slug, idType: URI) {
    databaseId
    date
    modified
    slug
    content(format: RENDERED)
    title
  }
}`

export const fetchPage = async (slug: string): Promise<WPPage> => {
  const response = await fetchGraphQL<PageResponse>({
    query: pageQuery,
    url: getGraphQLUrl(),
    variables: { slug },
  })

  console.log('RESPONSE FROM fetchPage:', response)

  if (!response.page) return Promise.reject(new Error(`No page found for the following slug ${slug}.`))

  return response.page
}
