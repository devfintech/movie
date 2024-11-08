import plugin from "tailwindcss/plugin"

import { apply } from "./utils"

const antd = {
  ".ant-btn": {
    ...apply("flex items-center justify-center"),
  },
  ".ant-popconfirm-buttons, .ant-modal-confirm-btns": apply("flex items-center justify-end gap-1"),
  ".ant-typography": {
    "& &-copy, & &-copy-success": apply("text-primary-500 hover:text-primary-500 focus:text-primary-500"),
  },
  ".ant-segmented .ant-segmented-item:hover:not(.ant-segmented-item-selected):not(.ant-segmented-item-disabled)::after":
    apply("dark:bg-slate-700/70"),

  ".ant-input-group-wrapper": {
    ".ant-input-wrapper": {
      ...apply("h-full text-inherit"),
      ".ant-input-affix-wrapper": apply("h-full"),
      ".ant-input": apply("h-full text-inherit"),
      ".ant-btn": apply("h-full text-inherit"),
    },
  },

  ".ant-modal-mask + .ant-app-modal-wrap": apply("bg-black/80"),

  ".ant-modal .ant-modal-header": apply("bg-transparent text-content"),

  ".ant-form": {
    ".ant-form-item": apply("mb-0"),
  },

  ".ant-app-modal.ant-modal": {
    ...apply("p-0 text-base"),
    ".ant-modal-content": apply("p-0 w-full rounded-xl"),
    ".ant-modal-confirm-body": apply("flex-col items-center"),
    ".ant-modal-confirm-paragraph": apply("w-full max-w-full flex flex-col items-center"),
    ".ant-modal-confirm-content": apply("w-full"),
    "div > .anticon": apply("text-6xl my-6 mx-0"),
  },
}

module.exports = plugin(({ addUtilities }) => {
  addUtilities([antd])
})
