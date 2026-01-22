import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


import az from '../ui/locales/az.json';
import en from '../ui/locales/en.json';
import ru from '../ui/locales/ru.json';

const resources = {
  az: { translation: az },
  en: { translation: en },
  ru: { translation: ru }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "az",
    lng: "az",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false, 
    },
  });

export default i18n;