import type { Nullable, Post } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

type PostsResponse = {
  posts: Nullable<{
    nodes: Post[]
    pageInfo: { hasNextPage: boolean; endCursor: Nullable<string> }
  }>
}

const postsQuery = `query FetchPosts($first: Int, $after: String) {
  posts(
    first: $first,
    after: $after,
    where: {
      orderby: { field: DATE, order: DESC }
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
      uri
      date
      excerpt
      categories {
        nodes {
          name
          uri
        }
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`

export const fetchPosts = async (
  first: number = 10,
  after?: string
): Promise<PostsResponse> => {
  const variables: Record<string, unknown> = { first }
  if (after) variables.after = after

  const response = await fetchGraphQL<PostsResponse>({
    query: postsQuery,
    url: getGraphQLUrl(),
    variables,
  })

  return response
}
