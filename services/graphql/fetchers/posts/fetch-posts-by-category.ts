import type { Nullable, Post } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

type PostsResponse = {
  posts: Nullable<{
    nodes: Post[]
    pageInfo: { hasNextPage: boolean; endCursor: Nullable<string> }
  }>
}

const postsQuery = `query FetchPostsByCategory($categorySlug: String) {
  posts(
    where: {
      orderby: { field: DATE, order: DESC },
      categoryName: $categorySlug
    }
  ) {
    nodes {
      key: id
      author {
        node {
          name
          slug
          avatar {
            url
          }
        }
      }
      title
      slug
      date
      excerpt
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`

export const fetchPostsByCategory = async (categorySlug: string): Promise<PostsResponse> => {
  const response = await fetchGraphQL<PostsResponse>({
    query: postsQuery,
    url: getGraphQLUrl(),
    variables: { categorySlug },
  })

  return response
}
