import { FC, ReactNode } from "react"
import { I18nextProvider } from "react-i18next"
import { SWRConfig } from "swr"

import { isEnabledLocalDevMode } from "@/configs/env.config"
import { TailwindClasses } from "@/configs/generate-tailwind-classes"
import i18next from "@/configs/languages/i18next.config"
import { swrConfig } from "@/configs/swr.config"
import { ComingSoonPageWrapper } from "../layouts/coming-soon-page-wrapper"
import { LocalDevMode } from "../local-dev-mode"
import { AntProvider } from "./ant-provider"
import { GlobalHooks } from "./global-hooks"
import { GlobalModal } from "./global-modal"
import { ToastContainer } from "./toast-container"
import { Web3Provider } from "./web3-provider"

interface ProviderProps {
  children: ReactNode
}

export const Provider: FC<ProviderProps> = ({ children }) => {
  return (
    <Web3Provider>
      <SWRConfig value={swrConfig}>
        <I18nextProvider i18n={i18next} defaultNS={"translation"}>
          <ToastContainer />
          <AntProvider>
            <GlobalHooks />
            <TailwindClasses />

            {/* Hide Global Modal for landing page */}
            <GlobalModal />

            <ComingSoonPageWrapper>{children}</ComingSoonPageWrapper>

            {isEnabledLocalDevMode && <LocalDevMode />}
          </AntProvider>
        </I18nextProvider>
      </SWRConfig>
    </Web3Provider>
  )
}
