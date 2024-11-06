// =====================================================================
// ====== for installing i18next  react translation  lybrary  ==========
// npm install i18next react-i18next i18next-browser-languagedetector


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "welcome": "Welcome",
      

    }
  },
  ka: {
    translation: {
      "welcome": "კეთილი იყოს თქვენი მობრძანება",

    }
  },
  ru: {
    translation: {
      "welcome": "Добро пожаловать",

    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'ka', // fallback language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;