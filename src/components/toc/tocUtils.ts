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
