import {ToCItem} from "./ToCList"
export const extractTocIds = (items?: ToCItem[]): Set<string> => {
  const ids = new Set<string>()

  const walk = (nodes?: ToCItem[]) => {
    if (!nodes) return

    for (const node of nodes) {
      if (node.url?.startsWith("#")) {
        ids.add(node.url.substring(1))
      }

      if (node.items?.length) {
        walk(node.items)
      }
    }
  }

  walk(items)
  return ids
}

export function filterTocByDepth(
  items: ToCItem[] | undefined,
  maxDepth: number,
  currentDepth = 1
): ToCItem[] | undefined {
  if (!items) return undefined
  if (currentDepth > maxDepth) return undefined

  return items
    .map(item => {
      const filteredChildren = filterTocByDepth(
        item.items,
        maxDepth,
        currentDepth + 1
      )

      return {
        ...item,
        items: filteredChildren,
      }
    })
}
