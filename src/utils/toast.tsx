import { ToastOptions, toast } from "react-toastify"

import { ToastComponent, ToastComponentProps } from "@/libs/ui/toast-component"

export const toastContent = ({ message, type, title }: ToastComponentProps, options?: ToastOptions) => {
  return toast(<ToastComponent type={type} message={message} title={title} />, {
    closeButton: true,
    hideProgressBar: false,
    // className: cn("!bg-component rounded-lg "),
    ...options,
    autoClose: type === "loading" ? false : options?.autoClose,
  })
}
