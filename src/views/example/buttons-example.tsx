import { useCopyToClipboard } from "@/hooks/render/use-copy-to-clipboard"
import { Button } from "@/libs/ui/button"
import { SearchOutlined } from "@ant-design/icons"
import { Tooltip } from "antd"
import { FC } from "react"

import { useErrorBoundary } from "react-error-boundary"

interface ButtonsExampleProps {}

const ButtonsExample: FC<ButtonsExampleProps> = () => {
  const { showBoundary } = useErrorBoundary()

  const handleThrowError = async () => {
    showBoundary({ message: "Opps. App has error", stack: "App has error in page..." })
  }

  const { copy } = useCopyToClipboard()

  return (
    <div className="">
      <div className="flex flex-wrap items-center gap-4">
        <Button className="" type="primary" size="large">
          Primary Button
        </Button>
        <Button className="" type="default" size="middle">
          Default Button
        </Button>
        <Button type="dashed">Dashed Button</Button>
        <Button type="danger">Secondary Button</Button>
        <Button onClick={() => copy("Copied Text")}>Copy to clipboard</Button>
        <Button className="" type="primary" disabled>
          Disabled Button
        </Button>
        <Tooltip title="search">
          <Button shape="circle" type="primary" icon={<SearchOutlined />} />
        </Tooltip>
        <Button type="primary" icon={<SearchOutlined />}>
          Search
        </Button>
        <Button type="primary" loading>
          Loading
        </Button>
        <Button type="ghost">Ghost</Button>
        <Button type="danger" onClick={handleThrowError}>
          Throw error
        </Button>
      </div>
    </div>
  )
}

export default ButtonsExample
