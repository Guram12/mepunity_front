import "./Footer.css"
import React from "react";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { CgMail } from "react-icons/cg";










const Footer: React.FC = () => {


  return (
    <footer className="site_footer">
      <div className="footer_content_container">

        <div className="about_continer" >
          <h1 className="footer_about_h1" >About Us</h1>
          <p className="footer_about_p" >Our company is a leading company in the field of construction and architecture. We have been working in this field for over 20 years and have completed many successful projects. Our team consists of highly qualified specialists who are always ready to help you with any question.</p>
        </div>

        <div className="contact_container" >
          <h1 className="footer_contact_h1" >Contact </h1>
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



















