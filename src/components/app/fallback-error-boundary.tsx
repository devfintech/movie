import { Result } from "antd"
import { FC } from "react"
import { FallbackProps } from "react-error-boundary"
import { AiFillHome } from "react-icons/ai"
import { BiReset } from "react-icons/bi"
import { TfiReload } from "react-icons/tfi"

import { Button } from "@/libs/ui/button"
import { routePath } from "@/routes/routes"
import { Container } from "../layouts/container"

export const FallbackErrorBoundary: FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  const handleResetError = () => {
    resetErrorBoundary()
    // localStorage.clear()
    // sessionStorage.clear()
  }

  return (
    <Container className="flex min-h-screen w-full flex-col items-center justify-center ">
      <Result
        className=" max-sm:p-4"
        status={500}
        title={<h1 className="text-error-500 font-bold max-sm:text-3xl">Error</h1>}
        subTitle={
          <div className="space-y-3 max-sm:max-w-[90vw]">
            <p className=" text-error-400 text-center text-xl max-sm:break-words max-sm:text-lg">
              {error?.message || "Something went wrong!"}
            </p>
            <p className="text-content max:sm-text-xs text-center text-sm max-sm:break-words">
              {error?.stack || "Please try again"}
            </p>
          </div>
        }
        extra={
          <div className=" !mx-auto w-full max-w-[500px] space-y-4">
            <div className="flex w-full items-center gap-4">
              <Button
                className="text-content w-full bg-transparent"
                type="default"
                size="small"
                icon={<TfiReload />}
                onClick={() => window.location.reload()}
              >
                Reload Page
              </Button>
              <Button
                className="w-full border"
                size="small"
                type="primary"
                icon={<BiReset />}
                onClick={handleResetError}
              >
                Reset Error
              </Button>
            </div>

            <a href={routePath.home} className="block">
              <Button className="border" block size="small" type="primary" icon={<AiFillHome />}>
                Back to home page
              </Button>
            </a>
          </div>
        }
      />
    </Container>
  )
}
