import "../styles/GoogleSignUp.css"
import "../styles/Loader.css"
import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axiosInstance from "../utils/axiosInstance";
import { RiUserSearchFill } from "react-icons/ri";
import { MdBusinessCenter } from "react-icons/md";
import { ImMobile2 } from "react-icons/im";
import { useTranslation } from "react-i18next";

interface GoogleOuthProps {
  setIsAuthenticated: (value: boolean) => void;
  setIsGoogleLoggedIn: (value: boolean) => void;
  isGoogleLoggedIn: boolean;
  language: string;
}

export interface ProfileData {
  username: string;
  company: string;
  phone_number: string;
}


const GoogleSignUp: React.FC<GoogleOuthProps> = ({ setIsAuthenticated, setIsGoogleLoggedIn, isGoogleLoggedIn, language }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    phone_number: '',
    company: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // State for error messages


  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      const response = await axiosInstance.post(`/dj-rest-auth/google/`, {
        id_token: credentialResponse.credential,  // Send credential as id_token
      });
      if (response.data.access && response.data.refresh) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Fetch user profile to get the user_id
        const profileResponse = await axiosInstance.get(`/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        });
        localStorage.setItem('user_id', profileResponse.data.id);
        if (profileResponse.data.username | profileResponse.data.company | profileResponse.data.phone_number) {
          setIsAuthenticated(true);
          navigate("/");
        }
        setIsGoogleLoggedIn(true);
      }
    } catch (error: any) {
      console.error('Error during Google login:', error.response);
      setError(error.response?.data?.detail || 'Error during Google login. Please try again.'); // Set error message

    }
  };

  // Handle Google Login failure
  const handleGoogleLoginFailure = () => {
    console.error('Google login error');
    setError('Google login error. Please try again.'); // Set error message

  };


  const handleProfileSetupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        await axiosInstance.put(`/auth/profile/complite/`, profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsAuthenticated(true);
        setLoading(false);
        navigate("/");

      }
    } catch (error: any) {
      setLoading(false);
      console.error('Error during profile setup:', error.response);
      const errorMessage = error.response?.data?.username?.[0] || error.response?.data?.detail || error.response?.data?.company?.[0] ||  'Error during profile setup. Please try again.';
      setError(errorMessage); // Set error message

    }
  };


  return (
    <div>
      {!isGoogleLoggedIn && (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            theme="filled_black"  // Options: 'outline' or 'filled'
            size="large"     // Options: 'small', 'medium', 'large'
            text="signup_with"    // Options: 'signin_with', 'signup_with', 'continue_with', 'signin'
            width="50px"
            locale={language}

          />
        </GoogleOAuthProvider>
      )}

      {isGoogleLoggedIn && (
        <form onSubmit={handleProfileSetupSubmit}>

          <div className="register_input_container_google" >
            <RiUserSearchFill className='mark_email_icon_register_google' />
            <label>
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value.replace(/\s/g, '') })}
                required
                className="register_input_google"
                placeholder={t("Enter your name")}
                name="username"
              />
            </label>
          </div>

          <div className="register_input_container_google" >
            <MdBusinessCenter className='mark_email_icon_register_google' />
            <label>
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                required
                className="register_input_google"
                placeholder={t("Enter Company Name")}
                name="company"
              />
            </label>
          </div>

          <div className="register_input_container_google" >
            <ImMobile2 className='mark_email_icon_register_google' />
            <label>
              <input
                type="text"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                required
                className="register_input_google"
                placeholder={t("Enter Phone Number")}
                name="phone_number"
              />
            </label>
          </div>
          <div className="google_complite_container" >
            {loading ?
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
              :
              <button type="submit" className="complite_profile_burron">{t("Complete Profile")}</button>
            }
          </div>
        </form>
      )}
      {error && <div className="google_complite_error">{error}</div>} 

    </div>
  );
};

export default GoogleSignUp;