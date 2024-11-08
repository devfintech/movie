import { Dropdown, MenuProps } from "antd"
import { FC } from "react"
import { useTranslation } from "react-i18next"
import { BiChevronDown } from "react-icons/bi"
import { BsCheckLg } from "react-icons/bs"
import { LiaLanguageSolid } from "react-icons/lia"

import { LANGUAGES_OPTIONS } from "@/configs/languages/languages.config"
import { Button } from "@/libs/ui/button"

export const LanguageSelector: FC = () => {
  const { i18n } = useTranslation()

  const currentLanguage = LANGUAGES_OPTIONS.find((language) => i18n.language === language.locale)

  const items: MenuProps["items"] = LANGUAGES_OPTIONS.map((language) => {
    return {
      key: language.locale,
      label: (
        <div className="flex items-center gap-2">
          {language.name}
          {currentLanguage?.locale === language.locale && <BsCheckLg className="text-success-500" />}
        </div>
      ),
      icon: <LiaLanguageSolid />,
      className: "",
      onClick: () => {
        if (currentLanguage?.locale === language.locale) return
        i18n.changeLanguage(language.locale)
      },
    }
  })

  return (
    <Dropdown menu={{ items }}>
      <Button className="gap-2 px-2" type="default">
        <LiaLanguageSolid />
        {currentLanguage?.name}
        <BiChevronDown className="text-xl" />
      </Button>
    </Dropdown>
  )
}
