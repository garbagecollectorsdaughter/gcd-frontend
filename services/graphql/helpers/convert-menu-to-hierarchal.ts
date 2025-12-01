import { MenuItem, NestedMenuItem, Nullable, WPMenuItem } from '@/types'

type ConvertedMenu = (MenuItem | NestedMenuItem)[]

/**
 * Convert a flat array of menu items to a hierarchical structure
 * @param data - flat array of menu items
 * @param idKey - key to use for the unique identifier
 * @param parentKey - key to use for the parent identifier
 * @param childrenKey - key to use for the children
 * @returns hierarchical structure of menu items
 */
export function convertMenuToHierarchal(
  data: WPMenuItem[] = [],
  { idKey = 'key', parentKey = 'parentId', childrenKey = 'children' } = {}
): ConvertedMenu {
  const itemMap: Record<string, NestedMenuItem> = {}

  // Create a map of items by their ID
  data.forEach((item) => {
    const id = item[idKey as keyof WPMenuItem] as string
    // Use a type assertion to tell TypeScript the `childrenKey` exists
    itemMap[id] = { ...item, [childrenKey]: [] } as NestedMenuItem
  })

  const tree: ConvertedMenu = []

  // Build the tree by linking parent and child items
  data.forEach((item) => {
    const id = item[idKey as keyof WPMenuItem] as string
    const parentId =
      (item[parentKey as keyof WPMenuItem] as Nullable<string>) || null

    if (parentId && itemMap[parentId]) {
      // Explicitly cast to NestedMenuItem to ensure `childrenKey` is recognized
      const parentItem = itemMap[parentId] as NestedMenuItem
      ;(
        parentItem[childrenKey as keyof NestedMenuItem] as NestedMenuItem[]
      ).push(itemMap[id])
    } else {
      tree.push(itemMap[id])
    }
  })

  return tree
}
