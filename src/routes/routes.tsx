import { BaseRoute } from "@/types/core.type"

export const routePath = {
  home: "/",
  translation: "/translation",
  comingSoon: "/coming-soon",
  test: "/test",
  notFound: "*",
} as const

export const routes: BaseRoute[] = [
  { label: "Home", to: routePath.home },
  { label: "Translation", to: routePath.translation },
  { label: "Test", to: routePath.test },
]
