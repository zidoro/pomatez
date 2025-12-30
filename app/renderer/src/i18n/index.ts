import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getFromStorage } from "utils";
import {
  detectSystemLanguage,
  fallbackLanguage,
  normalizeLanguageCode,
  supportedLanguages,
} from "./languages";
import { en } from "./translations/en";
import { es } from "./translations/es";
import { zh } from "./translations/zh";
import { ja } from "./translations/ja";

const resources = {
  en: { translation: en },
  es: { translation: es },
  zh: { translation: zh },
  ja: { translation: ja },
};

const storedState = getFromStorage("state");
const storedLanguage = storedState?.settings?.language;
const initialLanguage = storedLanguage
  ? storedLanguage === "auto"
    ? detectSystemLanguage()
    : normalizeLanguageCode(storedLanguage)
  : detectSystemLanguage();

i18n.use(initReactI18next).init({
  resources,
  lng: initialLanguage,
  fallbackLng: fallbackLanguage,
  supportedLngs: supportedLanguages.map((lang) => lang.code),
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
