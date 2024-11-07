// =====================================================================
// ====== for installing i18next  react translation  lybrary  ==========
// npm install i18next react-i18next i18next-browser-languagedetector


import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // header component
      "home": "Home",
      "projects": "Projects",
      "calculate price": "Calculate Price",
      "upload file": "Upload File",
      "discount": "Discount",
      "guest": "Guest",
      "log out": "Log Out",
      "log in": "Log In",
      "Discount": "Discount:",

      //Projects component
      "Completed Projects": "Completed Projects",

      //calculate component
      "Select the desired service": "Select the desired service",
      "electricity": "Electric",
      "Mechanical"  : "Mechanical",
      "plumbing" : "Plumbing",
      "Area": "Area ( m² )",
      "Anter area": "Anter area",
      "Clear": "Clear",
      "Total price": "Total price : ",
      
      // file upload component
      "File upload wait massage": "Please wait for the files to upload. This may take a couple of minutes.",
      "Files are sent successfully": "Files are sent successfully!" ,
      "drag and drop": "Drag & Drop files here or click to select files",
      "File size:": "File size: ",
      "(Maximum size 2G)": "(Maximum size 2G)",
      "Enter Username": "  Enter Username",
      "Enter company name": "  Enter Company Name",
      "Enter Email": "  Enter Email",
      "Enter Subject": "  Enter Subject",
      "Enter Description": " Enter Description",
      "Send": "Send",

      //footer component
      "About Us": "About Us",
      "Contact": "Contact",
    }
  },
  ka: {
    translation: {
      // header component
      "home": "მთავარი",
      "projects": "პროექტები",
      "calculate price": "ფასის გამოთვლა",
      "upload file": "ფაილის ატვირთვა",
      "discount": "ფასდაკლება",
      "guest": "სტუმარი",
      "log out": "გასვლა",
      "log in": "შესვლა",
      "Discount": "ფასდაკლება:",

      //Projects component
      "Completed Projects": "დასრულებული პროექტები",

      //calculate component
      "Select the desired service": "აირჩიეთ სასურველი სერვისი",
      "electricity": "ელექტროობა",
      "Mechanical"  : "მექანიკური",
      "plumbing" : "სანტექნიკა",
      "Area": "ფართობი ( მ² )",
      "Anter area": "შეიყვანე ფართობი",
      "Clear": "გასუფთავება",
      "Total price": "სრული ფასი : ",

      // file upload component
      "File upload wait massage": "გთხოვთ, დაელოდოთ ფაილების ატვირთვას. ამას შეიძლება რამდენიმე წუთი დასჭირდეს.",
      "Files are sent successfully": "ფაილები წარმატებით გაიგზავნა!",
      "drag and drop": "ჩააგდეთ ფაილები აქ ან დააწკაპუნეთ ასარჩევად",
      "File size:": "ფაილის ზომა: ",
      "(Maximum size 2G)": "(მაქსიმალური ზომა 2G)",
      "Enter Username": "  შეიყვანე სახელი",
      "Enter company name": "  შეიყვანე კომპანიის სახელი",
      "Enter Email": "  შეიყვანე ელ. ფოსტა",
      "Enter Subject": "  შეიყვანე თემა",
      "Enter Description": " შეიყვანე აღწერა",
      "Send": "გაგზავნა",

      //footer component
      "About Us": "ჩვენს შესახებ",
      "Contact": "კონტაქტი",

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