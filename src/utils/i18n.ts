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
      "For custom discount, please log in or register": "For custom discount, please log in or register",

      //Projects component
      "Completed Projects": "Completed Projects",

      //calculate component
      "Select the desired service": "Select the desired building type and service.",
      "electricity": "Electric",
      "Mechanical": "Mechanical",
      "plumbing": "Plumbing",
      "Area": "Area ( m² )",
      "Anter area": "Anter area",
      "Clear": "Clear",
      "Total price": "Total price : ",
      "Hotel": "Hotel",
      "Residential": "Residential",
      "Enterprise": "Enterprise and other specialized facilities",


      // file upload component
      "File upload wait massage": "Please wait for the files to upload. This may take a couple of minutes.",
      "Files are sent successfully": "Files are sent successfully!",
      "drag and drop": "Drag & Drop files here or click to select files",
      "File size:": "File size: ",
      "(Maximum size 2G)": "(Maximum size 2G)",
      "Enter Username": "Enter Username", // registration component also uses this key
      "Enter company name": "Enter Company Name", // registration component also uses this key
      "Enter Email": "Enter Email", // registration component also uses this key
      "Enter Subject": "Enter Subject",
      "Enter Description": "Enter Description",
      "Send": "Send",

      //footer component
      "About Us": "About Us",
      "Contact": "Contact",
      "about_us_1": "Our company is an experienced project management firm focused on providing innovative and effective solutions across various industries. Our goal is to create high-quality projects that have a positive impact on our clients and partners. ",
      "about_us_2": 'Our team consists of highly qualified specialists who ensure full project management – from concept development and planning to design and final implementation of buildings or systems. We can handle projects of all sizes, from small-scale to large-scale endeavors. ',
      'about_us_3': 'The success of our company is based on quality, professionalism, and transparency. We work individually on each project, aiming to find the most efficient and cost-effective solutions. ',


      //registration component
      "Register": "Register",
      "Enter Phone Number": "Enter Phone Number",
      "Enter Password": "Enter Password",
      "Confirm Password": "Confirm Password",
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

      //password reset request component
      "Reset Password": "Reset Password",
      "Enter your email": "Enter your email",
      "Send Password Reset Email": "Send Password Reset Email",

      //password reset component 
      "Password has chenged successfully!": "Password has chenged successfully!",
      "Redirecting to login in": "Redirecting to login in ",
      "seconds": "seconds",

      //profile complite component
      "Enter your name": "Enter your name",
      "Enter Company Name": "Enter Company Name",
      "Complete Profile": "Complete Profile",

      //selectedproject cmponent
      "Description": "Description",

      //profile update component
      "Profile Update": "Profile Update",
      "Change Profile Picture": "Change Profile Picture",
      "Update Profile": "Update Profile",

      //mainpage copmponent
      "mainpage header": "Electric and Mechanical Projects with the highest quality standards",

      //mainpage copmponent
      "electric": "Electric",
      "mechanical": "Mechanical",
      "plumbing_2": "Plumbing",
      "second_header_part": "Projects with the highest quality standards",

      "Why Choose Us?": "Why Choose Us?",
      "Experience": "Experience: ",
      'Experience_text': 'Extensive experience in a wide range of project types. ',
      'Client Engagement': 'Client Engagement: ',
      'Client Engagement_text': "Continuous communication and consideration of client needs. ",
      "Innovative Approaches": "Innovative Approaches: ",
      "Innovative Approaches_text": "Use of modern technologies and techniques. ",
      "High Quality": "High Quality: ",
      "High Quality_text": "Strict adherence to quality and durability standards. ",
      "Time and Budget Management": "Time and Budget Management: ",
      "Time and Budget Management_text": 'We ensure projects are completed on time and within the allocated budget. ',
      "Goal": "Our aim is to help our clients achieve success and facilitate the growth of their businesses or projects in the most effective way. ",



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
      "For custom discount, please log in or register": "ინდივიდუალური ფასდაკლებისთვის გთხოვთ შეხვიდეთ სისტემაში ან დარეგისტრირდეთ",

      //Projects component
      "Completed Projects": "დასრულებული პროექტები",

      //calculate component
      "Select the desired service": "აირჩიეთ სასურველი შენობა-ნაგებობის ტიპი და სერვისი",
      "electricity": "ელექტროობა",
      "Mechanical": "მექანიკა",
      "plumbing": "სანტექნიკა",
      "Area": "ფართობი ( მ² )",
      "Anter area": "შეიყვანე ფართობი",
      "Clear": "გასუფთავება",
      "Total price": "სრული ფასი : ",
      "Hotel": "სასტუმრო",
      "Residential": "საცხოვრებელი",
      "Enterprise": "საწარმო და სხვა სპეციალიზირებული ობიექტები",

      // file upload component
      "File upload wait massage": "გთხოვთ, დაელოდოთ ფაილების ატვირთვას. პროცესი შეიძლება რამდენიმე წუთი გაგრძელდეს.",
      "Files are sent successfully": "ფაილები წარმატებით გაიგზავნა!",
      "drag and drop": "ჩააგდეთ ფაილები აქ ან დააწკაპუნეთ ასარჩევად",
      "File size:": "ფაილის ზომა: ",
      "(Maximum size 2G)": "(მაქსიმალური ზომა 2G)",
      "Enter Username": "სახელი",
      "Enter company name": "კომპანიის სახელი",
      "Enter Email": "ელ. ფოსტა",
      "Enter Subject": "თემა",
      "Enter Description": "აღწერა",
      "Send": "გაგზავნა",

      //footer component
      "About Us": "ჩვენს შესახებ",
      "Contact": "კონტაქტი",
      "about_us_1": 'ჩვენი კომპანია არის გამოცდილი პროექტების მართვაში, რომელიც ორიენტირებულია ინოვაციური და ეფექტური გადაწყვეტილებების მიწოდებაზე სხვადასხვა ინდუსტრიაში. ჩვენი მიზანია შევქმნათ მაღალი ხარისხის პროექტები, რომლებიც დადებითად აისახება ჩვენს კლიენტებსა და პარტნიორებზე. ',
      "about_us_2": 'ჩვენი გუნდი შედგება მაღალკვალიფიციური სპეციალისტებისგან, რომლებიც უზრუნველყოფენ პროექტის სრულ მენეჯმენტს – კონცეფციის შემუშავებას,  შენობის დაგეგმვას ან სისტემების დიზაინისა და საბოლოო დანერგვას. ჩვენ შეგვიძლია გავუმკლავდეთ როგორც მცირე ასევე ფართომასშტაბიან პროექტებს. ',
      "about_us_3": 'ჩვენი კომპანიის წარმატება დაფუძნებულია ხარისხზე, პროფესიონალიზმზე და გამჭვირვალობაზე. ჩვენ ინდივიდუალურად ვმუშაობთ თითოეულ პროექტზე, რომლის მიზანია ვიპოვოთ ყველაზე ეფექტური და ეკონომიური გადაწყვეტილებები. ',


      //registration component
      "Register": "რეგისტრაცია",
      "Enter Phone Number": "ტელეფონს ნომერი",
      "Enter Password": "პაროლი",
      "Confirm Password": "დაადასტურე პაროლი",
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

      //password reset request component
      "Reset Password": "პაროლის განახლება",
      "Enter your email": "ელ. ფოსტა",
      "Send Password Reset Email": "გაგზავნა",

      //password reset component
      "Password has chenged successfully!": "პაროლი შეიცვალა წარმატებით!",
      "Redirecting to login in": "გადასვლა შესვლის გვერდზე ",
      "seconds": "წამში",

      //profile complite component
      "Enter your name": "  სახელი",
      "Enter Company Name": "კომპანიის სახელი",
      "Complete Profile": "პროფილის დასრულება",

      //selectedproject cmponent
      "Description": "აღწერა",

      //profile update component
      "Profile Update": "პროფილის განახლება",
      "Change Profile Picture": "პროფილის სურათის შეცვლა",
      "Update Profile": "პროფილის განახლება",

      //mainpage copmponent
      "electric": "ელექტრული",
      "mechanical": "მექანიკური",
      "plumbing_2": "სანტექნიკური",
      "second_header_part": "პროექტები უმაღლესი ხარისხის სტანდარტებით",

      "Why Choose Us?": "რატომ ჩვენ?",
      "Experience": "გამოცდილება: ",
      'Experience_text': 'ფართო გამოცდილება პროექტების ფართო სპექტრში. ',
      'Client Engagement': 'კლიენტებთან ჩართულობა: ',
      'Client Engagement_text': "უწყვეტი კომუნიკაცია და კლიენტის საჭიროებების გათვალისწინება.  ",
      "Innovative Approaches": "ინოვაციური მიდგომები: ",
      "Innovative Approaches_text": "თანამედროვე ტექნოლოგიებისა და ტექნიკის გამოყენება.  ",
      "High Quality": "მაღალი ხარისხი: ",
      "High Quality_text": "ხარისხისა და გამძლეობის სტანდარტების მკაცრი დაცვა. ",
      "Time and Budget Management": "დროისა და ბიუჯეტის მართვა: ",
      "Time and Budget Management_text": 'ჩვენ ვუზრუნველყოფთ პროექტების დასრულებას დროულად და გამოყოფილი ბიუჯეტის ფარგლებში. ',
      "Goal": 'ჩვენი მიზანია დავეხმაროთ ჩვენს კლიენტებს წარმატების მიღწევაში და ხელი შევუწყოთ მათი ბიზნესის ან პროექტების ზრდას ყველაზე ეფექტური გზით. ',



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