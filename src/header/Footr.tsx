import "./Footer.css"
import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { CgMail } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";



const Footer: React.FC = () => {

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



  // footer content 
  return (
    <footer className={`site_footer  ${!showFooter ? "remove_footer" : ""}`}>
      <div className="footer_content_container">

        <div className="about_continer" >

          <h1 className="footer_about_h1" >{t("About Us")}</h1>
          <p className="footer_about_p" > {t("about_us_1")} </p>
          <p className="footer_about_p" > {t("about_us_2")} </p>
          <p className="footer_about_p" > {t("about_us_3")} </p>


        </div>

        <div className="contact_container" >
          <h1 className="footer_contact_h1" >{t("Contact")} </h1>
          <div className="footer_mobile_email_container">
            <div className="footer_mobile_container" >
              <MdOutlinePhoneInTalk className="foolter_mobile_icon" />
              <p className="mobile_p" >+995 568 24 24 41</p>
            </div>

            <div className="footer_email_container" >
              <CgMail className="footer_email_icon" />
              <p className="email_p" > infomepunity@gmail.com </p>
            </div>
          </div>

        </div>
        <p className="rights_reserver" >© 2024 All rights reserved.</p>
      </div>
    </footer>
  )
}


export default Footer;




