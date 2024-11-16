import "./Footer.css"
import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";


interface FooterProps {
  language: string;
}




const Footer: React.FC<FooterProps> = ({ language }) => {

  const [showFooter, setShowFooter] = useState<boolean>(true);
  const location = useLocation();
  const { t } = useTranslation();



  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register" ||
      location.pathname === "/password-reset" || location.pathname === "/reset-password/:uidb64/:token"
    ) {
      setShowFooter(false);
    }
    else {
      setShowFooter(true);
    }
  }, [location.pathname])


  const change_about_language = (language: string) => {
    if (language === "ka") {
      return "ჩვენი კომპანია არის წამყვანი კომპანია სამშენებლო და არქიტექტურის სფეროში. ჩვენ ამ სფეროში 20 წელზე მეტია ვმუშაობთ და ბევრი წარმატებული პროექტი გვაქვს განხორციელებული. ჩვენი გუნდი დაკომპლექტებულია მაღალკვალიფიციური სპეციალისტებისგან, რომლებიც ყოველთვის მზად არიან დაგეხმაროთ ნებისმიერ შეკითხვაში."
    } else {
      return "Our company is a leading company in the field of construction and architecture. We have been working in this field for over 20 years and have completed many successful projects. Our team consists of highly qualified specialists who are always ready to help you with any question."
    }
  }


  return (
    <footer className={`site_footer  ${!showFooter ? "remove_footer" : ""}`}>
      <div className="footer_content_container">

        <div className="about_continer" >
          <h1 className="footer_about_h1" >{t("About Us")}</h1>
          <p className="footer_about_p" >{change_about_language(language)}</p>
        </div>

        <div className="contact_container" >
          <h1 className="footer_contact_h1" >{t("Contact")} </h1>
          <div className="footer_mobile_email_container">
            <div className="footer_mobile_container" >
              <MdOutlinePhoneInTalk className="foolter_mobile_icon" />
              <p className="mobile_p" >+995 568 12 34 56  </p>
            </div>

            <div className="footer_email_container" >
              <CgMail className="footer_email_icon" />
              <p className="email_p" > mepunity@gmail.com  </p>
            </div>
          </div>


        </div>

        <p className="rights_reserver" >© 2024 All rights reserved.</p>
      </div>
    </footer>
  )
}


export default Footer;



















