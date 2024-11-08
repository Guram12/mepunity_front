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
      "Click on image to update profile data": "Click on image to update profile data",

      //Projects component
      "Completed Projects": "Completed Projects",

      //calculate component
      "Select the desired service": "Select the desired service",
      "electricity": "Electric",
      "Mechanical": "Mechanical",
      "plumbing": "Plumbing",
      "Area": "Area ( m² )",
      "Anter area": "Anter area",
      "Clear": "Clear",
      "Total price": "Total price : ",

      // file upload component
      "File upload wait massage": "Please wait for the files to upload. This may take a couple of minutes.",
      "Files are sent successfully": "Files are sent successfully!",
      "drag and drop": "Drag & Drop files here or click to select files",
      "File size:": "File size: ",
      "(Maximum size 2G)": "(Maximum size 2G)",
      "Enter Username": "  Enter Username", // registration component also uses this key
      "Enter company name": "  Enter Company Name", // registration component also uses this key
      "Enter Email": "  Enter Email", // registration component also uses this key
      "Enter Subject": "  Enter Subject",
      "Enter Description": " Enter Description",
      "Send": "Send",

      //footer component
      "About Us": "About Us",
      "Contact": "Contact",

      //registration component
      "Register": "Register",
      "Enter Phone Number": "  Enter Phone Number",
      "Enter Password": "  Enter Password",
      "Confirm Password": "  Confirm Password",
      "* Password must be minimum 8 characters.": "* Password must be minimum 8 characters.",
      "* Minimum one numeric character.": "* Minimum one numeric character.",
      "* Must not be entirely numeric.": "* Must not be entirely numeric.",
      "* Passwords must match.": "* Passwords must match.",
      "Show Password": "Show Password",
      "Return to login": "Return to login",

      //login component
      "No Account? Register": "No Account? Register",
      "Forgot Password ?": "Forgot Password ?",
      "Continue without registering": "Continue without registering",

      //password reset component
      "Reset Password": "Reset Password",
      "Enter your email": "  Enter your email",
      "Send Password Reset Email": "Send Password Reset Email",

      //profile complite component
      "Enter your name": "  Enter your name",
      "Enter Company Name": "  Enter Company Name",
      "Complete Profile": "Complete Profile",

      //selectedproject cmponent
      "Description": "Description",
      
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
      "Click on image to update profile data": "დააწკაპუნეთ სურათზე პროფილის მონაცემების განახლებისთვის",

      //Projects component
      "Completed Projects": "დასრულებული პროექტები",

      //calculate component
      "Select the desired service": "აირჩიეთ სასურველი სერვისი",
      "electricity": "ელექტროობა",
      "Mechanical": "მექანიკური",
      "plumbing": "სანტექნიკა",
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
      "Enter Username": "  სახელი",
      "Enter company name": "  კომპანიის სახელი",
      "Enter Email": "  ელ. ფოსტა",
      "Enter Subject": "  თემა",
      "Enter Description": " აღწერა",
      "Send": "გაგზავნა",

      //footer component
      "About Us": "ჩვენს შესახებ",
      "Contact": "კონტაქტი",

      //registration component
      "Register": "რეგისტრაცია",
      "Enter Phone Number": " ტელეფონს ნომერი",
      "Enter Password": "  პაროლი",
      "Confirm Password": "  დაადასტურე პაროლი",
      "* Password must be minimum 8 characters.": "* პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს.",
      "* Minimum one numeric character.": "* მინიმუმ ერთი ციფრი.",
      "* Must not be entirely numeric.": "* არ შეიცავდეს მხოლოდ ციფრებს.",
      "* Passwords must match.": "* პაროლები უნდა ემთხვევდეს.",
      "Show Password": "პაროლის ჩვენება",
      "Return to login": "შესვლის გვერდზე დაბრუნება",

      //login component
      "No Account? Register": " რეგისტრაცია",
      "Forgot Password ?": "დაგავიწყდა პაროლი?",
      "Continue without registering": "რეგისტრაციის გარეშე შესვლა",

      //password reset component
      "Reset Password": "პაროლის განახლება",
      "Enter your email": "  ელ. ფოსტა",
      "Send Password Reset Email": "გაგზავნა",

      //profile complite component
      "Enter your name": "  სახელი",
      "Enter Company Name": " კომპანიის სახელი",
      "Complete Profile": "პროფილის დასრულება",

      //selectedproject cmponent
      "Description": "აღწერა",
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