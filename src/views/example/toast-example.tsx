import { Button } from "@/libs/ui/button"
import { toastContent } from "@/utils/toast"
import { FC } from "react"
import { toast } from "react-toastify"

interface ToastExampleProps {}

export const ToastExample: FC<ToastExampleProps> = () => {
  return (
    <div className="space-y-2">
      <h2 className="">Toast Example</h2>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="success" onClick={() => toast.success("Successfully")}>
          Toast Success
        </Button>
        <Button type="info" onClick={() => toast.info("Information")}>
          Toast Info
        </Button>
        <Button type="warning" onClick={() => toast.warn("Warning")}>
          Toast Warning
        </Button>
        <Button type="danger" onClick={() => toast.error("Failed")}>
          Toast Error
        </Button>
        <Button onClick={() => toastContent({ message: "This is custom toastify", type: "success" })}>
          Custom Toast
        </Button>
        <Button onClick={() => toastContent({ message: "Processing", type: "loading" })}>Custom Toast Loading</Button>
        <Button type="dashed" onClick={() => toast.loading("Action is processing...")}>
          Toast Pending
        </Button>
        <Button type="default" onClick={() => toast.dismiss()}>
          Toast dissmiss
        </Button>
      </div>
    </div>
  )
}
