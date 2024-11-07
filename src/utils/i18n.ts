// =====================================================================
// ====== for installing i18next  react translation  lybrary  ==========
// npm install i18next react-i18next i18next-browser-languagedetector


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // header
      "home": "Home",
      "projects": "Projects",
      "calculate price": "Calculate Price",
      "upload file": "Upload File",
      "discount": "Discount",
      "guest": "Guest",
      "log out": "Log Out",
      "log in": "Log In",
    }
  },
  ka: {
    translation: {
      // header 
      "home": "მთავარი",
      "projects": "პროექტები",
      "calculate price": "ფასის გამოთვლა",
      "upload file": "ფაილის ატვირთვა",
      "discount": "ფასდაკლება",
      "guest": "სტუმარი",
      "log out": "გასვლა",
      "log in": "შესვლა",
    }
  },

};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'ka', // default language
    fallbackLng: 'en', // fallback language
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;