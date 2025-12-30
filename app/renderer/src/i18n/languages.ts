import { LanguageCode } from "store/settings/types";

export const supportedLanguages: Array<{
  code: LanguageCode;
  label: string;
}> = [
  { code: "en", label: "English / English" },
  { code: "es", label: "Spanish / Español" },
  { code: "zh", label: "Chinese / 中文" },
  { code: "ja", label: "Japanese / 日本語" },
];

export const fallbackLanguage: LanguageCode = "en";

export const normalizeLanguageCode = (
  language?: string
): LanguageCode => {
  if (!language) {
    return fallbackLanguage;
  }

  const normalized = language.toLowerCase().split("-")[0];
  const isSupported = supportedLanguages.some(
    (option) => option.code === normalized
  );

  return isSupported ? (normalized as LanguageCode) : fallbackLanguage;
};

export const detectSystemLanguage = (): LanguageCode => {
  if (typeof navigator === "undefined") {
    return fallbackLanguage;
  }

  const [primaryLanguage] = navigator.languages || [];

  return normalizeLanguageCode(primaryLanguage || navigator.language);
};
