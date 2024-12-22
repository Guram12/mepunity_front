import './Header.css';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ProfileData } from '../App';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import geo_flag from "../assets/ka.png";
import us_flag from "../assets/en.png";
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import default_image from "../assets/default.jpg";
import { TbInfoCircle } from "react-icons/tb";
import { Tooltip } from 'react-tooltip'






interface HeaderProps {
  profileData: ProfileData | null,
  isAuthenticated: boolean,
  language: string,
  setLanguage: (language: "ka" | "en") => void,

}
// ===================================================================================
const Header: React.FC<HeaderProps> = ({
  profileData,
  isAuthenticated,
  language,
  setLanguage
}) => {


  const [showHeader, setShowHeader] = useState<boolean>(true);
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [is_desktop_TooltipOpen, setIs_desktop_TooltipOpen] = useState<boolean>(false);
  const [is_mobile_TooltipOpen, setIs_mobile_TooltipOpen] = useState<boolean>(false);


  const location = useLocation();

  const { t, i18n } = useTranslation();

  const navigate = useNavigate();


  useEffect(() => {
    const showTooltipTimeout = setTimeout(() => {
      setIs_desktop_TooltipOpen(true);
      const hideTooltipTimeout = setTimeout(() => {
        setIs_desktop_TooltipOpen(false);
      }, 4000);
      return () => clearTimeout(hideTooltipTimeout);
    }, 3000);
    return () => clearTimeout(showTooltipTimeout);
  }, []);


  useEffect(() => {
    if (window.innerWidth < 768) {
      const showTooltipTimeout = setTimeout(() => {
        setIs_mobile_TooltipOpen(true);
        const hideTooltipTimeout = setTimeout(() => {
          setIs_mobile_TooltipOpen(false);
        }, 4000);
        return () => clearTimeout(hideTooltipTimeout);
      }, 3000);
      return () => clearTimeout(showTooltipTimeout);
    }
  }, []);


  // ==============================================================================
  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  }


  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.setItem("login_status", "false");
    window.location.replace("/");
    setMenuVisible(false);
  }

  const handle_Login_Logout_Click = () => {
    localStorage.setItem("login_status", "false");
    setMenuVisible(false);
  }

  const languageOptions = [
    { value: 'ka', label: <><img src={geo_flag} alt="Georgian" style={{ width: '20px', marginRight: '8px' }} />GE</> },
    { value: 'en', label: <><img src={us_flag} alt="English" style={{ width: '20px', marginRight: '8px' }} />EN</> },
  ];

  const handleLanguageChange = (selectedOption: any) => {
    setLanguage(selectedOption.value);
    i18n.changeLanguage(selectedOption.value);
  };

  const handle_profile_update = () => {
    navigate("/profile-update");
    setMenuVisible(false);

  }


  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      minWidth: 120,
      backgroundColor: 'rgb(28, 28, 30)',
      borderColor: state.isFocused ? '#00a753' : '#4b4b4b',
      boxShadow: state.isFocused ? '0 0 0 0.15vw #00a753' : '0 0 0 0.15vw transparent',
      transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        borderColor: '#00a753',
        boxShadow: '0 0 0 0.15vw rgba(135, 207, 235, 0.186)',
      },
    }),
    singleValue: (provided: any) => ({
      ...provided,
      color: '#ffffff',
      transition: 'color 0.3s ease',
    }),
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'rgb(28, 28, 30)',
      transition: 'opacity 0.3s ease',
      animation: 'slideDown 0.3s ease',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected ? '#00a753' : state.isFocused ? '#313131' : 'rgb(28, 28, 30)',
      color: '#ffffff',
      transition: 'background-color 0.3s ease, color 0.3s ease',
      '&:hover': {
        backgroundColor: '#00a75496',
      },
    }),
    placeholder: (provided: any) => ({
      ...provided,
      color: '#ffffff',
      transition: 'color 0.3s ease',
    }),
    dropdownIndicator: (provided: any, state: any) => ({
      ...provided,
      color: state.isFocused ? '#00a753' : '#4b4b4b',
      transition: 'color 0.3s ease',
      '&:hover': {
        color: '#00a753',
      },
    }),
    indicatorSeparator: (provided: any) => ({
      ...provided,
      backgroundColor: '#4b4b4b',
      transition: 'background-color 0.3s ease',
    }),
  };

  const hanbdleLgoClick = () => {
    navigate("/");
  }



  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/register" ||
      location.pathname === "/password-reset" || location.pathname === "/reset-password/:uidb64/:token"
    ) {
      setShowHeader(false);
    }
    else {
      setShowHeader(true);
    }
  }, [location.pathname])


  return (
    <div className={`main_header_cont  ${!showHeader ? "remove_header" : ""}`} >
      <div className='logo_cont'>
        <svg
          onClick={hanbdleLgoClick}
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1" viewBox="0 -80 600 600"
          className='logo'
        >
          <g>
            <path className="header_latter_m" d="M170.33,323.58c.13.55.05,27.77.09,28.33.1,1.37-13.3,6.21-22.85,8.04-2.97.57-6.04.04-8.67-1.47-5.29-3.04-10.6-6.03-15.89-9.06-6.02-3.44-12-6.96-18.07-10.31-1.53-.84-2.49-2.44-2.49-4.19.06-69.26.05-138.52.05-207.78v-13.72c0-1.43,1.52-2.34,2.76-1.63,5.45,3.11,67.71,37.91,80.23,44.9,1.4.78,2.41,2.1,2.8,3.65,4.39,17.3,31.3,119.52,32.94,115.2,11.46-30.22,25.42-66.53,29.32-76.67.56-1.45,2.27-2.07,3.63-1.31,8.16,4.55,33.7,18.8,47.24,26.48,1.6.91,2.2,1.9,2.2,3.79-.05,69.63-.05,206.19-.05,222.97,0,.76-.81,1.24-1.48.87-8.23-4.62-32.99-20.16-38.05-23.08-.57-.33-.91-.92-.91-1.58.02-10.04.2-65.79.45-74.56,0-.2-11.69,36.43-11.69,36.43-.14.46-.46.84-.9,1.05-4.53,2.18-30.53,14.58-33.01,13.76-4.5-1.49-19.99-9.52-27.1-13.25-2.32-1.22-4.01-3.33-4.71-5.85-5.36-19.47-29.27-106.37-40.75-149.71-.16-.59,15.83,51.19,24.9,88.66ZM139.96,355.39c.57.33,1.3-.08,1.3-.74,0-8.16,0-47.28,0-67.02,0-22.33,0-44.65,0-66.98,0-4.55,2.35-5.54,3.89.39,3.74,13.97,7.46,27.95,11.16,41.93,4.25,16.04,8.48,32.08,12.72,48.12,6.18,23.39,13.13,46.87,19.31,70.26.1.4.31,1.28.67,2.32.79,2.22,1.02,3.48,4.33,5.41,8.27,4.81,19.51,10.5,22.96,11.25,1.24.27,2.53-.92,2.98-2.11,7.66-20.35,16.52-42.12,24.23-62.45,5.88-15.51,11.76-31.02,17.6-46.55.58-1.54,1.16-2.68,3.11-1.83.71.26.78,2.75.78,2.75l-.1,134.56c0,.96.49,1.85,1.32,2.35,3.88,2.35,15.35,9.29,20.79,12.4,4.04,2.3,8.09,4.59,12.31,6.98.5.29,1.14-.07,1.14-.65.04-14.58.08-148.73.11-216.98,0-1.04-.56-1.99-1.46-2.51-15-8.53-29.96-17.11-44.89-25.77-1.82-1.06-2.11-.09-2.61,1.23-13.51,35.65-40.02,105.68-46.98,123.35-.52,1.32-2.42,1.21-2.79-.16-3.25-12.2-12.68-47.75-17.78-66.95-10.03-37.78-20.08-75.55-30.06-113.34-.46-1.74-1.5-2.06-3.53-3.29-10.58-6.4-36.75-21.28-43.47-25.03-.58-.32-1.29.09-1.29.75,0,15.45,0,149.02-.03,217.07,0,1.08.58,2.05,1.53,2.57,5.57,3.08,11.07,6.28,16.6,9.44,5.27,3.01,10.54,6.01,16.15,9.21Z" />
            <path className="header_latter_e" d="M110.07,108.32L305.93,12.22c.77-.38,1.66-.36,2.4.06,5.17,2.95,25.9,14.79,30.5,17.53.37.22.35.74-.03.95-11.77,6.35-99.63,52.27-127.89,67.78-1.79.98-1.42,1.34.02,2.21,12.12,7.34,39.14,26.43,40.32,25.78,21.68-11.98,89.21-48.44,98.52-53.47.68-.37,1.48-.37,2.17-.02,4.8,2.41,24.13,12.12,35.62,17.97.38.2.39.72,0,.93-29.44,16.24-71.7,39.55-101,55.71,2.93,1.79,21.95,13.7,32.77,20.38,1.64,1.02,21.85-11.22,23.6-12.19,34.8-19.27,78.47-39.93,113.57-59.2,1.01-.55,2.18-.58,3.2-.06,7.22,3.63,27.01,13.62,33.68,17.22.97.52.97,1.89,0,2.43-20.39,11.22-167.83,92.23-184.72,101.5-1,.55-2.18.53-3.18-.02L110.03,109.95c-.65-.36-.63-1.3.04-1.63ZM497.51,117.17c0-1.69-.94-3.23-2.43-4.01-7.27-3.79-28.72-14.98-35.35-18.38-1.27-.65-2.73-.66-3.99,0-15.65,8.04-118.38,60.82-118.77,60.69-25.83-8.2,41.41-50.23,52.71-57.13.99-.6,1.58-1.67,1.58-2.83v-3.26c0-.42-.23-.81-.61-1.01l-39.42-20.37c-.67-.34-1.46-.33-2.12.03l-82.37,44.8c-29.95-9.7,58.99-68.76,72.72-77.85,1.12-.74,1.78-1.97,1.8-3.32l.05-3.09c.02-1.07-.53-2.06-1.45-2.61-2.33-1.39-7.03-4.2-11.27-6.74-5.7-3.42-15.55-9.38-19.69-11.89-1.2-.73-2.69-.8-3.96-.19-19.71,9.5-176.77,85.2-201.24,97.83-1.1.57-1.1,2.11-.02,2.7,19.65,10.72,149.44,82.26,200.33,110.64q2.09,1.17,4.23-.06c14.68-8.42,29.99-16.93,44.96-25.19,17.38-9.59,40.94-25.01,67.16-34.55,67.68-24.64,77.14,13.3,77.14,13.3v-57.53Z" />
            <path className="header_latter_p" d="M495.82,182.32c-2.6-11.7-8.95-20.2-20.59-23.95-7.04-2.27-14.27-2.44-21.48-1.58-21.55,2.59-41.54,10.4-60.35,20.86-27.05,15.04-53.55,31.09-80.34,46.61-1.57.91-2.53,2.55-2.53,4.39.06,69.18.05,205.11.05,222.05,0,.79.83,1.27,1.5.88,7.65-4.41,42.14-24.44,59.69-34.57,1.37-.79,2.2-2.26,2.19-3.86-.08-19.29-.02-38.59-.09-57.88,0-1.49.79-2.86,2.07-3.59,7-3.96,13.93-8.06,20.89-12.09,25.1-14.56,47.48-32.49,65.95-55.22,15.72-19.35,27.45-40.8,32.29-65.69,2.34-12.05,3.45-24.21.75-36.37ZM490.74,223.73c-5.47,22.33-16.53,41.72-30.93,59.24-18.74,22.81-41.41,40.75-66.87,55.18-6.94,3.93-13.77,8.06-20.71,11.97-1.39.79-1.55,1.75-1.55,3.13.03,19.52,0,39.05.06,58.57,0,1.28-.67,2.47-1.78,3.11-15.53,8.98-46.26,26.69-53.6,30.92-.72.42-1.6-.12-1.6-.96l-.06-215.77c0-.99.52-1.91,1.38-2.41,8.71-5.15,56.64-33.42,81.13-46.93,18.77-10.35,38.72-18.02,60.31-20.08,5.03-.48,10.02-.2,14.94.91,12.3,2.79,19.08,11.05,21.44,23.22,2.61,13.44,1.06,26.77-2.16,39.89Z" />
            <path className="header_latter_p" d="M439.2,231.14c-.84-10.37-6.95-16.07-17.28-16.06-4.68,0-9.13,1.25-13.47,2.85-12.09,4.45-23.14,10.9-33.93,17.81-1.59.86-2.05,1.86-2.04,3.61.06,21.73.04,43.46.04,65.19v2.24c.66.31,1,.03,1.34-.17,9.22-5.61,18.92-10.41,27.95-16.35,10.1-6.64,19.19-14.4,26.33-24.24,7.55-10.39,12.13-21.75,11.07-34.88ZM404.17,253.21c-3.91,5.38-8.88,9.62-14.4,13.25-4.94,3.25-10.24,5.87-15.28,8.94-.18.11-.37.26-.73.09v-1.23c0-11.88.01-23.76-.02-35.64,0-.96.25-1.5,1.12-1.97,5.9-3.78,11.94-7.31,18.55-9.74,2.38-.87,4.81-1.56,7.37-1.56,5.65,0,8.99,3.11,9.45,8.78.58,7.18-1.93,13.39-6.05,19.07Z" />
          </g>
        </svg>
      </div>

      {/* if user is authenticated and also if mobile version, i should show the discount */}
      {isAuthenticated && (
        <div className='mobile_userdata_container'
          onClick={handle_profile_update}
        >
          <img
            src={profileData?.image || default_image}
            alt="profile picture"
            style={{ width: "40px" }}
            className='profile_picture'
          />


          <div>
            <h1 className='mobile_discount' >Discount: {profileData?.discount} % </h1>
            <p className='header_profile_data_p' > {profileData ? profileData.username : "Guest"}</p>
            <p className='header_profile_data_p' > {profileData ? profileData.company : ""}</p>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className='login_button_mobile' >
          <Link to="/login">
            <button onClick={handle_Login_Logout_Click} className='header_button'>{t("log in")}</button>
          </Link>

          {/* ------------- tooltip container ---------------------- */}
          <div className='info_container'>
            <TbInfoCircle
              className='info_sign'
              data-tooltip-id='infoTooltipMobile'
              data-tooltip-events='click'
              onMouseEnter={() => setIs_mobile_TooltipOpen(true)}
              onMouseLeave={() => setIs_mobile_TooltipOpen(false)}
              onClick={() => setMenuVisible(false)}
            />
            <Tooltip id='infoTooltipMobile' place="top" openOnClick={true} isOpen={is_mobile_TooltipOpen} >
              <h3 className='tooltip_h3 info_fot_mobile'>{t("For custom discount, please log in or register")}</h3>
            </Tooltip>
          </div>
        </div>
      )}

      <FaBars className='menu_icon' onClick={toggleMenu} />

      <div className={`header_button_container ${menuVisible === null ? '' : menuVisible ? 'mobile_visible' : 'mobile_hidden'}`}>

        <Link to="/">
          <button
            className={`header_button ${location.pathname === '/' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            {t("home")}
          </button>
        </Link>

        <Link to="/projects">
          <button
            className={`header_button ${location.pathname === '/projects' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            {t("projects")}
          </button>
        </Link>

        <Link to="/price-calculation">
          <button
            className={`header_button ${location.pathname === '/price-calculation' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            {t("calculate price")}
          </button>
        </Link>

        <Link to="/upload-file">
          <button
            className={`header_button ${location.pathname === '/upload-file' ? 'active' : ''}`}
            onClick={toggleMenu}
          >
            {t("upload file")}
          </button>
        </Link>
        {!isAuthenticated && (
          <div className='login_and_warinng_cont' >
            <Link to="/login">
              <button onClick={handle_Login_Logout_Click} className='header_button'>{t("log in")}</button>
            </Link>

            {/* ------------- tooltip container ---------------------- */}
            {!is_mobile_TooltipOpen && (
              <div className='info_container'>
                <TbInfoCircle
                  className='info_sign'
                  data-tooltip-id='infoTooltipDesktop'
                  data-tooltip-events='hover'
                  onMouseEnter={() => setIs_desktop_TooltipOpen(true)}
                  onMouseLeave={() => setIs_desktop_TooltipOpen(false)}
                />
                <Tooltip
                  id='infoTooltipDesktop'
                  place="top"
                  openOnClick={false} isOpen={is_desktop_TooltipOpen}
                // style={{ backgroundColor: "#121212", border: "1px solid #00a753" }}
                >
                  <h3 className='tooltip_h3'>{t("For custom discount, please log in or register")}</h3>
                </Tooltip>
                <div className='info_container'>
                </div>
              </div>
            )}

          </div>
        )}
        {isAuthenticated && (
          <h1 className='discount  old_discount_remove_on_mobile' >{t("Discount")} {profileData?.discount} % </h1>
        )}
        <Select
          id="language-select"
          value={languageOptions.find(option => option.value === language)}
          onChange={handleLanguageChange}
          options={languageOptions}
          styles={customStyles}
          classNamePrefix="react-select"
          blurInputOnSelect={true}

        />

        <div className='header_profile_data_parent_container' >
          <div className='header_profile_data_child_container' >
            <p className={`header_profile_data_p ${!profileData ? "guest" : ""}  `} > {profileData ? profileData.username : t("guest")}</p>
            <p className='header_profile_data_p' > {profileData ? profileData.company : ""}</p>
          </div>

          {isAuthenticated && (
            <>
              <img
                src={profileData?.image || default_image}
                onClick={handle_profile_update}
                alt="profile picture"
                style={{ width: "40px" }}
                className='profile_picture' />
              <div className="tooltip">{t("Click on image to update profile data")}</div>
            </>
          )}

        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className='header_button logout_button'>{t("log out")}</button>
        )}

      </div>
    </div>
  );
}

export default Header;
