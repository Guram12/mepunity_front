import "../styles/PasswordResetRequest.css"
import "../styles/Loader.css"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { baseURL } from "../App";
import { BiMailSend } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { FaUserPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";


const PasswordResetRequest: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [secondMessage, setSecondMessage] = useState<string>('');
  const [error, setError] = useState<string>('');

  const { t } = useTranslation();
  const navigate = useNavigate();

  useEffect(() => {
    if (email) {
      setError('');
      setLoading(false);
    }
  }, [email])




  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${baseURL}/auth/password-reset/`, { email });
      setMessage(response.data.message);
      setEmail('');
      setSecondMessage("Please check youre email for password reset link");
      setLoading(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.error + ". Change email or register" || 'An error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <div className="password_reset_request_main_container">
      <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 549.67 802.83" className='login_company_logo' >
        <path className="cls-3" d="M99.79,438.3c.18.75.06,37.76.12,38.53.13,1.87-18.08,8.45-31.06,10.94-4.02.77-8.15.1-11.69-1.94-7.22-4.15-14.48-8.24-21.71-12.38-8.19-4.68-16.31-9.47-24.58-14.02-2.08-1.15-3.38-3.32-3.38-5.7.08-94.19.07-188.38.07-282.57v-18.66c0-1.94,2.07-3.18,3.75-2.21,7.41,4.23,92.08,51.55,109.11,61.07,1.9,1.06,3.28,2.86,3.81,4.97,5.97,23.53,42.57,162.55,44.8,156.68,15.58-41.09,34.55-90.45,39.86-104.25.77-1.99,3.08-2.83,4.94-1.79,11.1,6.19,45.84,25.57,64.25,36.02,2.18,1.24,2.99,2.58,2.99,5.15-.07,94.68-.07,280.37-.07,303.24,0,1.06-1.1,1.7-2.03,1.18-11.2-6.29-44.75-27.35-51.7-31.37-.8-.46-1.27-1.25-1.26-2.17.03-13.67.27-89.48.61-101.4,0-.27-15.9,49.55-15.9,49.55-.2.63-.63,1.14-1.22,1.42-6.16,2.96-41.52,19.83-44.89,18.72-6.12-2.02-27.16-12.93-36.84-18.01-3.17-1.66-5.48-4.52-6.43-7.97-7.3-26.5-39.8-144.66-55.42-203.59-.21-.8,21.53,69.62,33.87,120.58ZM58.3,481.43c.8.46,1.82-.06,1.82-.98,0-11.1,0-64.23,0-91.04,0-30.33,0-60.66,0-91,0-6.18,3.19-7.53,5.29.53,5.09,18.98,10.13,37.97,15.17,56.97,5.77,21.79,11.52,43.58,17.28,65.37,8.4,31.78,17.83,63.68,26.23,95.47.14.54.42,1.74.92,3.15,1.07,3.01,1.39,4.73,5.88,7.35,11.23,6.54,26.51,14.26,31.2,15.29,1.68.37,3.44-1.25,4.05-2.86,10.41-27.65,22.44-57.22,32.91-84.85,7.99-21.08,15.97-42.15,23.92-63.24.79-2.09,1.58-3.64,4.22-2.48.96.35,1.06,3.74,1.06,3.74l-.14,182.81c0,1.31.66,2.51,1.78,3.18,5.27,3.19,20.86,12.63,28.26,16.85,5.48,3.13,10.98,6.23,16.71,9.48.69.39,1.56-.09,1.56-.88.06-19.83.11-202.05.15-294.78,0-1.45-.78-2.73-2.03-3.45-20.36-11.58-40.68-23.24-60.94-34.99-2.48-1.44-2.87-.12-3.54,1.67-18.36,48.44-54.38,143.59-63.83,167.6-.71,1.8-3.29,1.64-3.79-.24-4.42-16.58-17.23-64.87-24.15-90.94-13.63-51.33-27.28-102.64-40.84-153.99-.63-2.37-2.04-2.8-4.8-4.47-14.37-8.69-49.9-28.89-59.04-34-.79-.44-1.76.12-1.76,1.03,0,21.07,0,202.45-.04,294.9,0,1.49.81,2.81,2.12,3.54,7.55,4.18,15.01,8.52,22.51,12.8,7.14,4.08,14.29,8.15,21.88,12.48Z" />
        <path className="cls-1" d="M17.74,145.54L284.11,14.85c1.05-.51,2.25-.49,3.26.09,7.03,4.01,35.23,20.11,41.47,23.83.51.3.47,1.01-.04,1.29-16.01,8.63-135.49,71.08-173.93,92.18-2.43,1.33-1.92,1.83.03,3.01,16.48,9.98,53.23,35.94,54.83,35.06,29.48-16.3,121.33-65.88,133.99-72.71.93-.5,2.01-.5,2.95-.03,6.53,3.28,32.82,16.48,48.44,24.44.52.27.52.98,0,1.26-40.03,22.08-97.51,53.78-137.37,75.77,3.99,2.44,29.86,18.63,44.56,27.71,2.23,1.38,29.72-15.27,32.1-16.58,47.33-26.21,106.73-54.31,154.45-80.52,1.37-.75,2.96-.79,4.35-.09,9.82,4.93,36.73,18.53,45.81,23.41,1.32.71,1.32,2.58,0,3.3-27.74,15.25-228.25,125.43-251.21,138.05-1.36.75-2.96.72-4.32-.03L17.69,147.76c-.89-.49-.85-1.77.05-2.22ZM544.52,157.62c0-2.29-1.25-4.39-3.29-5.45-9.84-5.14-38.95-20.31-47.93-24.92-1.72-.88-3.7-.89-5.42,0-21.22,10.9-160.5,82.46-161.03,82.29-35.03-11.12,56.23-68.16,71.48-77.47,1.34-.82,2.13-2.26,2.13-3.83v-4.79c0-.58-.32-1.11-.83-1.37l-53.02-27.39c-.9-.46-1.97-.45-2.85.04l-110.78,60.25c-40.28-13.04,79.35-92.48,97.81-104.71,1.51-1,2.39-2.65,2.42-4.46l.06-4.16c.02-1.45-.7-2.79-1.95-3.54-3.15-1.88-9.51-5.68-15.24-9.12-7.68-4.6-20.93-12.63-26.57-16.04-1.67-1.01-3.67-1.13-5.43-.28C257.35,25.56,45.04,127.89,11.95,144.97c-1.49.77-1.49,2.85-.02,3.65,26.57,14.5,202.09,111.24,270.93,149.63q2.83,1.58,5.72-.08c19.85-11.38,40.56-22.89,60.8-34.06,23.5-12.97,55.37-33.83,90.82-46.73,91.53-33.32,104.32,17.99,104.32,17.99v-77.75Z" />
        <path className="cls-2" d="M542.37,246.18c-3.54-15.91-12.17-27.47-28-32.57-9.58-3.09-19.41-3.32-29.21-2.15-29.31,3.52-56.49,14.14-82.07,28.37-36.78,20.46-72.83,42.28-109.26,63.39-2.13,1.24-3.45,3.47-3.44,5.97.08,94.09.07,278.95.07,301.98,0,1.07,1.12,1.72,2.04,1.19,10.4-6,57.3-33.23,81.18-47.01,1.86-1.07,2.99-3.07,2.98-5.24-.11-26.24-.03-52.48-.12-78.72,0-2.03,1.07-3.89,2.81-4.88,9.52-5.39,18.95-10.96,28.41-16.45,34.13-19.8,64.58-44.19,89.69-75.1,21.38-26.32,37.34-55.49,43.91-89.34,3.18-16.39,4.7-32.92,1.02-49.46ZM535.52,302.51c-7.44,30.37-22.48,56.74-42.06,80.56-25.49,31.02-56.32,55.41-90.94,75.04-9.43,5.35-18.72,10.96-28.17,16.28-1.9,1.07-2.11,2.38-2.11,4.25.04,26.54,0,53.09.08,79.63,0,1.76-.91,3.38-2.43,4.26-21.12,12.21-62.91,36.3-72.89,42.05-.98.57-2.18-.16-2.18-1.3l-.08-293.44c0-1.35.71-2.6,1.87-3.29,11.86-7.01,77.03-45.46,110.34-63.83,25.53-14.08,52.66-24.51,82.02-27.31,6.84-.65,13.63-.28,20.32,1.24,16.73,3.8,25.94,15.02,29.16,31.59,3.55,18.28,1.44,36.4-2.93,54.25Z" />
        <path className="cls-2" d="M465.19,312.57c-1.15-14.1-9.46-21.85-23.5-21.84-6.37,0-12.41,1.7-18.32,3.88-16.44,6.05-31.47,14.82-46.15,24.23-2.16,1.17-2.79,2.53-2.78,4.91.08,29.55.05,59.1.06,88.65v3.05c.9.42,1.37.04,1.82-.23,12.54-7.63,25.74-14.15,38.02-22.23,13.74-9.04,26.1-19.59,35.82-32.97,10.26-14.13,16.5-29.58,15.05-47.44ZM418.5,342.6c-5.31,7.31-12.07,13.08-19.58,18.02-6.71,4.42-13.93,7.98-20.78,12.15-.25.15-.5.36-.99.13v-1.67c0-16.16.02-32.31-.03-48.47,0-1.3.34-2.04,1.52-2.68,8.02-5.14,16.24-9.94,25.23-13.24,3.23-1.19,6.54-2.12,10.02-2.12,7.68,0,12.22,4.23,12.85,11.94.79,9.77-2.62,18.21-8.23,25.94Z" />
        <g>
          <path className="cls-4" d="M7.37,713.93v-59.07h24.93v59.07c0,16.92,8.31,25.08,20.7,25.08s20.7-8.16,20.7-25.08v-59.07h24.93v59.07c0,33.39-19.11,48.5-45.63,48.5s-45.63-15.11-45.63-48.5Z" />
          <path className="cls-4" d="M231.65,722.47v38.15h-23.95v-34.52c0-10.2-3.78-16.47-11.63-16.47s-14.05,6.65-14.05,18.21v32.78h-24.4v-67.31h24.4v11.18c5.67-8.23,14.5-12.46,23.42-12.46,15.11,0,26.21,9.75,26.21,30.44Z" />
          <path className="cls-4" d="M287.26,679.94v-23.95h23.95v23.95h-23.95ZM287.26,760.61v-66.78h23.95v66.78h-23.95Z" />
          <path className="cls-4" d="M417.27,693.84v19.64h-17.15v47.14h-23.95v-47.14h-12.31v-19.64h12.31v-25.08h23.95v25.08h17.15Z" />
          <path className="cls-4" d="M519.63,693.84h25l-43.06,107.27h-25l16.32-34.97-29.16-72.29h26.14l15.03,44.72,14.73-44.72Z" />
        </g>
      </svg>

      <div className="password_reset_conmtent_container" >
        <div className="reset_password_request_container" >
          <h1 className="reset_password_request_h1" >{t("Reset Password")}</h1>
        </div>
        <form
          onSubmit={handleSubmit}>
          <div className="mark_and_input_container_resetrequest" >
            <BiMailSend className='resset_password_request_email_icon' />

            <input
              type="email"
              className="reset_request_email_input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("Enter your email")}
              required
            />
          </div>
          <div className="reset_request_button_container" >
            {!loading && !message && (
              <button type="submit" className="reset_request_button" >{t("Send Password Reset Email")}</button>
            )}

            {loading && !error && (

              <div className="dot-spinner"  >
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
                <div className="dot-spinner__dot"></div>
              </div>
            )}

            {message &&
              <div className="request_reset_massage_container" >
                <div className="request_reset_massage_child_container" >
                  <p className="password_reset_request_p" >{message}</p>
                  <GiConfirmed className="password_reset_request_icon" />
                </div>

                <p className="second_message" >{secondMessage}</p>
              </div>
            }
            {error &&
              <div className="reset_request_error_container" >
                <p className="error_message">{error}</p>

                <div className="request_reset_register_and_icon" >
                  <p className="reset_page_register_p" onClick={handleRegister} > Register</p>
                  <FaUserPlus />
                </div>
              </div>
            }

          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordResetRequest;



// g.nishnianidze97@gmail.com

