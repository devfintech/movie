import { Spin } from "antd"
import { FC } from "react"
import { AiFillCheckCircle, AiFillInfoCircle } from "react-icons/ai"
import { BiErrorCircle } from "react-icons/bi"

import { cn } from "@/utils/classnames"
import { LoadingOutlined } from "@ant-design/icons"
export interface ToastComponentProps {
  message: string
  type: "success" | "error" | "info" | "loading"
  title?: string
}

const toastIcon = {
  success: <AiFillCheckCircle className="text-success-500 text-4xl" />,
  info: <AiFillInfoCircle className="text-4xl text-sky-500" />,
  error: <BiErrorCircle className="text-error-500 text-4xl" />,
  loading: <Spin size="large" indicator={<LoadingOutlined spin className="text-primary-500" />} />,
}

export const ToastComponent: FC<ToastComponentProps> = ({ title, message, type }) => {
  const _title = title || type

  return (
    <div className="flex items-center gap-4">
      {toastIcon[type]}
      <div className="space-y-1">
        <p
          className={cn(
            "text-lg font-medium capitalize leading-none",
            type === "success" && "text-success-500",
            type === "error" && "text-error-500",
            type === "info" && "text-sky-500",
            type === "loading" && "text-primary-500",
          )}
        >
          {_title}
        </p>
        <p className="text-sm text-zinc-400">{message}</p>
      </div>
      <p
        className={cn(
          " absolute bottom-0 left-0 top-0 h-full w-2",
          type === "success" && "bg-success-500",
          type === "error" && "bg-error-500",
          type === "info" && "bg-sky-500",
          type === "loading" && "",
        )}
      ></p>
    </div>
  )
}
