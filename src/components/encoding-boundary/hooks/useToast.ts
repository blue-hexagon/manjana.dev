import * as React from "react"

export function useToast() {
  const [toast, setToast] = React.useState<string | null>(null)
  const open = (msg: string) => setToast(msg)
  const close = () => setToast(null)
  return { toast, open, close }
}
