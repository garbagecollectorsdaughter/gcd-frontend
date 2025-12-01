import type { MenuLocationEnum, WPMenu } from '@/types'
import { fetchGraphQL, getGraphQLUrl } from '@/utils'

export type MenuResponse = {
  menu: WPMenu
}

const menuQuery = `query fetchMenu($location: MenuLocationEnum!) {
  menu: menuItems(where: {location: $location }, first: 100) {
    nodes {
      key: id
      order
      parentId
      path
      title: label
      url
    }
  }
}`

export const fetchMenu = async (location: MenuLocationEnum) => {
  const response = await fetchGraphQL<MenuResponse>({
    query: menuQuery,
    url: getGraphQLUrl(),
    variables: { location },
  })

  if (!response?.menu) {
    return Promise.reject(new Error(`No menu found for location: ${location}`))
  }

  return response.menu
}
