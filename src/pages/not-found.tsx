import { Result } from "antd"
import { FC } from "react"
import { AiFillHome } from "react-icons/ai"
import { Link } from "react-router-dom"

import { Container } from "@/components/layouts/container"
import { MetaHead } from "@/components/layouts/metahead"
import { Button } from "@/libs/ui/button"
import { routePath } from "@/routes/routes"

interface NotFoundPageProps {}

const NotFoundPage: FC<NotFoundPageProps> = () => {
  return (
    <>
      <MetaHead title="404 - Not found" />
      <Container className="flex min-h-screen items-center justify-center">
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          className="flex flex-col items-center"
          extra={
            <Link to={routePath.home}>
              <Button className="border" size="small" type="primary" icon={<AiFillHome />}>
                Back to home page
              </Button>
            </Link>
          }
        />
      </Container>
    </>
  )
}

export default NotFoundPage
