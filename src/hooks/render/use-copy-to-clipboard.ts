import { useState } from "react"
import { toast } from "react-toastify"

type CopiedValue = string | null
type CopyFn = (text?: string, message?: string) => Promise<boolean> // Return success

export const useCopyToClipboard = (): { copiedText: CopiedValue; copy: CopyFn } => {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null)

  const copy: CopyFn = async (text, message = "Copy to clipboard successfully") => {
    if (!text) return false
    // Try to save to clipboard then save it in the state if worked
    try {
      if (!navigator?.clipboard || !navigator.permissions) {
        const ele = document.createElement("textarea")
        ele.value = text
        document.body.appendChild(ele)
        ele.select()
        document.execCommand("copy")
        document.body.removeChild(ele)

        if (message) {
          toast.success(message)
        }

        return false
      }

      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      if (message) {
        toast.success(message)
      }
      return true
    } catch (error) {
      toast.error("Copy to clipboard failed")
      setCopiedText(null)
      return false
    }
  }

  return { copiedText, copy }
}
