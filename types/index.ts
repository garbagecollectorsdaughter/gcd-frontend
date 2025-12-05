import { Url } from "url"

export type Nullable<T> = T | null

export type WPCommentStatus = 'APPROVE' | 'HOLD' | 'SPAM' | 'TRASH'

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

type GraphQLNodes<T> = {
  nodes: T[]
}

export type GraphQLEdge<T> = GraphQLNode<T> & {
  cursor: string
}

export type GraphQLPageInfo = {
  endCursor: Nullable<string>
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor: Nullable<string>
  total: number
}

export type GraphQLConnection<T> = {
  edges: GraphQLEdge<T>[]
  pageInfo: GraphQLPageInfo
}

export type GraphQLEdgesInput = {
  after?: Nullable<string>
  before?: Nullable<string>
  first?: number
  last?: number
}

export type GraphQLPostWhere = {
  authorName?: string
  search?: string
  title?: string
}

export type Log = {
  date: string
  databaseId: number | string
  content: string
  slug: string
  title: string
}

export type Author = {
  name: string
  slug: string
  avatar: {
    url: string
  }
}

export type Term = {
  name: string
  slug: string
}

export type Comment = {
  databaseId: number
  commentedOn: number
  parentDatabaseId: number
  content: string
  date: string
  status: WPCommentStatus
  author: {
    name: string
    url: Nullable<string>
    node: {
      avatar: {
        url: string
        width: number
        height: number
      }
    }
  }
  replies?: Comment[]
}

export type Post = {
  key: string
  databaseId: number
  author: { node: Author }
  date: string
  content: string
  slug: string
  title: string
  uri: string
  excerpt: string
  commentCount: Nullable<number>
  categories: GraphQLNodes<Category>
  tags: { edges: { node: Term }[] }
  comments: { nodes: Comment[] }
  featuredImage?: {
    node: {
      altText: Nullable<string>
      caption: Nullable<string>
      mediaDetails: {
        height: number
        width: number
      }
      sourceUrl: string
    }
  }
}

export type WPLog = WPContent

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
  uri: Url
}
