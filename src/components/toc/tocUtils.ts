export const extractTocIds = (items?: any[]): Set<string> => {
  const ids = new Set<string>()

  const walk = (nodes?: any[]) => {
    if (!nodes) return
    for (const n of nodes) {
      if (n.url?.startsWith("#")) {
        ids.add(n.url.slice(1))
      }
      walk(n.items)
    }
  }

  walk(items)
  return ids
}

// tocUtils.ts
export function filterTocByDepth(
    items: any[] | undefined,
    maxDepth: number,
    currentDepth = 1
): any[] | undefined {
    if (!items) return items
    if (currentDepth > maxDepth) return undefined

    return items.map(item => ({
        ...item,
        items: filterTocByDepth(
            item.items,
            maxDepth,
            currentDepth + 1
        ),
    }))
}