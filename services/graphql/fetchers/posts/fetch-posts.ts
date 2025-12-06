import type { Nullable, Post } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

type PostsResponse = {
  posts: Nullable<{
    nodes: Post[]
    pageInfo: { hasNextPage: boolean; endCursor: Nullable<string> }
  }>
}

const postsQuery = `query FetchPosts {
  posts(
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

export const fetchPosts = async (): Promise<PostsResponse> => {
  const response = await fetchGraphQL<PostsResponse>({
    query: postsQuery,
    url: getGraphQLUrl(),
  })

  return response
}
