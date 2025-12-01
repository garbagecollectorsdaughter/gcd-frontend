import { CONFIG } from '@/config'
import { Nullable } from '@/types'

/**
 * Retrieve the API url from settings
 * @returns {string} The API url
 */
export const getGraphQLUrl = (): string => {
  if (!CONFIG.api.url) throw new Error('You forgot to set the API URL!')

  return CONFIG.api.url
}

export type GraphQLData<T> = Record<string, Nullable<T>>
type GraphQLResponse<T extends GraphQLData<unknown>> = {
  data: T
  errors?: Array<{ message: string }>
}

export type FetchGraphQLConfig = {
  headers?: HeadersInit
  query: string
  url: string
  variables?: Record<string, unknown>
}

/**
 * Retrieve GraphQL data using fetch.
 *
 * @template T - The expected data type.
 * @param {FetchGraphQLConfig} config - A configuration object.
 * @returns {Promise<T>} The data.
 */
export const fetchGraphQL = async <
  T extends GraphQLData<unknown> = GraphQLData<unknown>,
>({
  headers,
  query,
  url,
  variables,
}: FetchGraphQLConfig): Promise<T> => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      ...headers,
      'content-type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify({
      query,
      variables,
    }),
    next: {
      tags: ['graphql'],
    },
  })

  const { data, errors }: GraphQLResponse<T> = await response.json()

  if (!response.ok || errors?.length) {
    const error = new Error(
      errors?.map((e) => e.message).join('\n') ?? 'Network response was not ok'
    )

    return Promise.reject(error)
  }

  return data
}
