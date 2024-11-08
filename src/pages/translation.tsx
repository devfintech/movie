import { t } from "i18next"
import { FC } from "react"
import { Trans, useTranslation } from "react-i18next"

import { Container } from "@/components/layouts/container"

interface TranslationPageProps {}

const TranslationPage: FC<TranslationPageProps> = () => {
  useTranslation()

  return (
    <div>
      <Container>
        <div className="space-y-3 text-xl">
          <p className="">Translate with t : {t("Hello World")}</p>
          <p className="">
            Translate with {"<Trans>"} : <Trans>Hello World</Trans>
          </p>
          <p className="">Translate with dynamic params : {t("I'm {{years}} years old", { years: 36 })}</p>
        </div>
      </Container>
    </div>
  )
}

export default TranslationPage
