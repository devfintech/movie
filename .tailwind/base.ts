import plugin from "tailwindcss/plugin"
import { apply } from "./utils"

export default plugin(({ addBase, theme }) => {
  addBase({
    html: apply(
      "antialiased text-content",
      "touch-manipulation",
      "subpixel-antialiased",
      "scroll-smooth",
      "min-h-full",
      "bg-body",
    ),
    "::selection": apply("text-content bg-primary-500"),
    body: {
      "@apply bg-body transition-all font-sans": {},
      position: "relative",
      minHeight: "100%",
      fontFeatureSettings: "'kern'",
    },
    a: apply("text-inherit no-underline hover:text-inherit"),

    "img, video": apply("max-w-full h-auto"),

    "img,svg,video,canvas,audio,iframe, embed,object": apply("block align-middle"),

    "*": apply("m-0 p-0 box-border"),

    "*,::before,::after": {
      ...apply("border-0 border-solid"),
      borderColor: theme("borderColor.DEFAULT", "currentColor"),
    },
    ".google-map *": apply("border-none"),
    button: apply("enabled:cursor-pointer bg-transparent text-content font-sans"),

    "blockquote, dl, dd, h1, h2, h3, h4, h5, h6, hr, figure, p, pre": {
      margin: "0",
    },

    "h1, h2, h3, h4, h5, h6": {
      fontSize: "inherit",
      fontWeight: "inherit",
    },

    "::-webkit-scrollbar": apply("w-2 h-2"),
    /* Track */
    "::-webkit-scrollbar-track": apply("rounded-md bg-gray-300 dark:bg-neutral-600 shadow-inner"),
    /* Handle */
    "::-webkit-scrollbar-thumb": apply("bg-primary-500 rounded-md"),
    /* Handle on hover */
    "::-webkit-scrollbar-thumb:hover": apply("bg-primary-700"),

    ".text-overflow-1": {
      display: "-webkit-box",
      textOverflow: "ellipsis",
      overflow: "hidden",
      WebkitLineClamp: "1",
      WebkitBoxOrient: "vertical",
      overflowWrap: "break-word",
      wordBreak: "break-all",
    },
    ".text-overflow-2": {
      "@apply text-overflow-1": {},
      WebkitLineClamp: "2",
    },
    ".text-overflow-3": {
      "@apply text-overflow-1": {},
      WebkitLineClamp: "3",
    },
  })
})
