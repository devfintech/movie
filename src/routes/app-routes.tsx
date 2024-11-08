import { FC } from "react"
import { RouteObject, useRoutes } from "react-router-dom"

import { DefaultLayout } from "@/layouts/default-layout"
import { EmptyLayout } from "@/layouts/empty-layout"
import HomePage from "@/pages/home"
import NotFoundPage from "@/pages/not-found"
import TestPage from "@/pages/test"
import TranslationPage from "@/pages/translation"
import { routePath } from "./routes"

interface AppRoutesProps {}

const routes: RouteObject[] = [
  // Routes with default layout
  {
    element: <DefaultLayout />,
    children: [
      { path: routePath.home, element: <HomePage /> },
      { path: routePath.translation, element: <TranslationPage /> },
      { path: routePath.test, element: <TestPage /> },
    ],
  },

  // Routes with empty layout
  {
    element: <EmptyLayout />,
    children: [{ path: routePath.notFound, element: <NotFoundPage /> }],
  },
]

export const AppRoutes: FC<AppRoutesProps> = () => {
  const appRoutes = useRoutes(routes)

  return appRoutes
}

// Or
// const AppRoutes: FC<AppRoutesProps> = () => {
//   return (
//     <Routes>
//       {/* Routes with default layout */}
//       <Route element={<DefaultLayout />}>
//         <Route path={routePath.home} element={<HomePage />} />
//         <Route path={routePath.translation} element={<TranslationPage />} />
//       </Route>

//       {/* Routes with empty layout */}
//       <Route element={<EmptyLayout />}>
//         <Route path={routePath.notFound} element={<NotFoundPage />} />
//       </Route>
//     </Routes>
//   )
// }
