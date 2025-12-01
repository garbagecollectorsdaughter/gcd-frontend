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
