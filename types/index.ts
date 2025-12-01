export type Nullable<T> = T | null

export enum MenuLocationEnum {
  Footer = 'FOOTER',
  Header = 'HEADER',
  Sidebar = 'SIDEBAR',
}

export type WPMenuItem = {
  key: string
  url: string
  title: string
  order: number
  path: string
  parentId: Nullable<string>
}

export type WPMenu = {
  nodes: WPMenuItem[]
}

export type MenuItem = {
  key: string
  title: string
  order: number
  path: string
  url: string
  parentId: Nullable<string>
  children: MenuItem[]
}

export type NestedMenuItem = MenuItem & {
  children: MenuItem[]
}

type GraphQLNode<T> = {
  node: T
}

type WPInfo = { wordsCount: number }

type WPImage = {
  altText: Nullable<string>
  mediaDetails: {
    height: number
    width: number
  }
  sourceUrl: string
  title: Nullable<string>
}

type WPContent = {
  content: string
  databaseId: number | string
  date: string
  featuredImage?: Nullable<GraphQLNode<WPImage>>
  modified: string
  slug: string
  title: string
}

export type WPPage = WPContent & {
  info: WPInfo
  content: string
}

export type Category = {
  name: string
  description: string
  slug: string
  key: string
}
