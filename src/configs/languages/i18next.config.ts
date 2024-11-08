import i18next from "i18next"
import LanguageDetector from "i18next-browser-languagedetector"
import { initReactI18next } from "react-i18next"

import { supportedLanguages } from "./languages.config"
import en from "./translations/en.json"
import jp from "./translations/jp.json"
import zh from "./translations/zh.json"

i18next
  .use(LanguageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    detection: {
      order: ["querystring", "localStorage", "sessionStorage", "navigator", "htmlTag", "path", "subdomain"],
      lookupQuerystring: "lng",
      lookupLocalStorage: "i18nextLng",
      lookupSessionStorage: "i18nextLng",
      lookupFromPathIndex: 0,
      lookupFromSubdomainIndex: 0,
      caches: ["localStorage"],
      htmlTag: document.documentElement,
    },
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: {
      en: {
        translation: en,
      },
      zh: {
        translation: zh,
      },
      jp: {
        translation: jp,
      },
    },

    fallbackLng: "en",

    supportedLngs: supportedLanguages,

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18next
