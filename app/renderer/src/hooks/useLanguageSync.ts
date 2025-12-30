import { useEffect } from "react";
import i18n from "i18next";
import { useAppSelector } from "./storeHooks";
import {
  detectSystemLanguage,
  normalizeLanguageCode,
} from "i18n/languages";

const useLanguageSync = () => {
  const language = useAppSelector((state) => state.settings.language);

  useEffect(() => {
    const resolvedLanguage =
      language === "auto"
        ? detectSystemLanguage()
        : normalizeLanguageCode(language);

    if (i18n.language !== resolvedLanguage) {
      i18n.changeLanguage(resolvedLanguage);
    }
  }, [language]);

  useEffect(() => {
    if (language !== "auto" || typeof window === "undefined") {
      return;
    }

    const handleLanguageChange = () => {
      const resolvedLanguage = detectSystemLanguage();

      if (i18n.language !== resolvedLanguage) {
        i18n.changeLanguage(resolvedLanguage);
      }
    };

    window.addEventListener("languagechange", handleLanguageChange);
    return () =>
      window.removeEventListener(
        "languagechange",
        handleLanguageChange
      );
  }, [language]);
};

export default useLanguageSync;
