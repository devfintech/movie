import { cn } from "@/utils/classnames"

const classes = [
  "ant-progress",
  "ant-segmented",
  "ant-btn",
  "ant-modal",
  "ant-popconfirm-buttons",
  "ant-modal-confirm-btns",
  "ant-typography",
  "ant-input-wrapper",
  "ant-form",
]

export const TailwindClasses = () => {
  return <div className={cn(classes, "invisible hidden h-0 w-0 overflow-hidden")}></div>
}
