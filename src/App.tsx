import './App.css'
import { useState, useEffect } from 'react';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './header/Header';
import Projects from './components/Projects';
import Login from './auth/Login';
import Register from './auth/Register';
import FileUpload from './components/FileUpload';
import Calculate from './components/Calculate';
import Footer from './header/Footr';
import PasswordReset from './auth/PasswordReset';
import PasswordResetRequest from './auth/PasswordResetRequest';
import ProfileUpdate from './components/ProfileUpdate';
import SelectedProject from './components/SelectedProject';
import axiosInstance from './utils/axiosInstance';
import MarginElement from './components/Margin_element';


export interface ProjectType {
  id: number,
  images: { id: number, image: string }[],
  title_ka: string,
  title_en: string,
  description_ka: string,
  description_en: string
}

export interface ProfileData {
  company: string;
  discount: string;
  email: string;
  id: number;
  image: string | null;
  is_email_verified: boolean;
  phone_number: string;
  username: string;
}



const App: React.FC = () => {
  const [language, setLanguage] = useState('ka');


  const [showSplashScreen, setShowSplashScreen] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [profileUpdated, setProfileUpdated] = useState<boolean>(false);


  const accessToken: string | null = localStorage.getItem('access_token');
  const refreshToken: string | null = localStorage.getItem('refresh_token');


  // ========================================== google gtag function ==============================================
  const gtagId = import.meta.env.VITE_GTAG_ID;

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${gtagId}`;
    script.async = true;
    document.head.appendChild(script);

    const script2 = document.createElement('script');
    script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${gtagId}');
  `;
    document.head.appendChild(script2);
  }, []);


  // ===================================================================================================================


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSplashScreen(false);
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, []);


  //======================================== fetch profile data ==================================================
  useEffect(() => {

    if (accessToken) {
      try {
        const fetchprofile = async () => {
          const response = await axiosInstance.get(`/auth/profile/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          // console.log("profile data from app",response.data)
          setProfileData(response.data)

        }
        fetchprofile()
      } catch (error) {
        console.error("Error while retrieving profile data", error)
      }

    }

  }, [isAuthenticated, accessToken, refreshToken, profileUpdated])


  // =================================  validate tokens on website load ==================================



  const validateTokens = async () => {

    if (accessToken) {
      try {
        const response = await axiosInstance.post(`/auth/token/verify/`, {
          token: accessToken,
        });
        return response.status === 200;
      } catch (error) {
        console.error('Access token is invalid', error);
      }
    }

    if (refreshToken) {
      try {
        const response = await axiosInstance.post(`/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', response.data.access);
        return true;
      } catch (error) {
        console.error('Refresh token is invalid', error);
      }
    }

    return false;
  };

  // --------------------------------------------------------------------------------------------------------
  useEffect(() => {
    const checkAuthentication = async () => {
      const isValid = await validateTokens();
      if (isValid) {
        setIsAuthenticated(true);
      }
    };

    checkAuthentication();
  }, []);

  // ========================================================================================================





  if (showSplashScreen) {
    return (
      <div className='shpash_screen_container' >

        <svg
          id="Layer_1"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="0 0 600 600"
          className="main_logo_svg"

        >

          <path className="cls-1" d="M394.45,283.23" />
          <g>
            <path className="logo_m" d="M196.32,318.83c.11.44.04,22.21.07,22.66.08,1.1-10.63,4.97-18.27,6.43-2.36.45-4.79.06-6.88-1.14-4.25-2.44-8.52-4.85-12.77-7.28-4.82-2.75-9.6-5.57-14.46-8.24-1.23-.67-1.99-1.95-1.99-3.35.05-55.41.04-110.81.04-166.22v-10.98c0-1.14,1.22-1.87,2.21-1.3,4.36,2.49,54.17,30.32,64.18,35.92,1.12.63,1.93,1.68,2.24,2.92,3.51,13.84,25.04,95.62,26.35,92.16,9.16-24.17,20.33-53.2,23.45-61.32.45-1.17,1.81-1.67,2.91-1.06,6.53,3.64,26.96,15.04,37.79,21.19,1.28.73,1.76,1.52,1.76,3.03-.04,55.69-.04,164.92-.04,178.37,0,.62-.65,1-1.19.69-6.59-3.7-26.33-16.09-30.41-18.45-.47-.27-.74-.73-.74-1.28.02-8.04.16-52.63.36-59.64,0-.16-9.35,29.14-9.35,29.14-.12.37-.37.67-.72.84-3.63,1.74-24.42,11.67-26.41,11.01-3.6-1.19-15.97-7.61-21.67-10.6-1.86-.98-3.22-2.66-3.78-4.69-4.29-15.59-23.41-85.09-32.6-119.76-.12-.47,12.67,40.95,19.92,70.93ZM171.91,344.2c.47.27,1.07-.03,1.07-.58,0-6.53,0-37.78,0-53.55,0-17.84,0-35.68,0-53.53,0-3.64,1.87-4.43,3.11.31,2.99,11.17,5.96,22.34,8.92,33.51,3.4,12.82,6.78,25.64,10.17,38.45,4.94,18.7,10.49,37.46,15.43,56.16.08.32.25,1.03.54,1.85.63,1.77.82,2.78,3.46,4.32,6.61,3.85,15.59,8.39,18.35,8.99.99.22,2.02-.74,2.38-1.68,6.13-16.26,13.2-33.66,19.36-49.91,4.7-12.4,9.4-24.79,14.07-37.2.46-1.23.93-2.14,2.49-1.46.57.21.63,2.2.63,2.2l-.08,107.54c0,.77.39,1.47,1.05,1.87,3.1,1.88,12.27,7.43,16.62,9.91,3.23,1.84,6.46,3.66,9.83,5.57.41.23.92-.05.92-.52.03-11.66.07-118.85.09-173.4,0-.85-.46-1.61-1.2-2.03-11.98-6.81-23.93-13.67-35.85-20.58-1.46-.85-1.69-.07-2.08.98-10.8,28.5-31.99,84.47-37.55,98.59-.42,1.06-1.94.96-2.23-.14-2.6-9.76-10.14-38.16-14.21-53.49-8.02-30.19-16.05-60.38-24.03-90.58-.37-1.39-1.2-1.65-2.82-2.63-8.45-5.11-29.35-17-34.73-20-.47-.26-1.04.07-1.04.6,0,12.39,0,119.09-.02,173.47,0,.88.48,1.65,1.25,2.08,4.44,2.46,8.83,5.01,13.24,7.53,4.2,2.4,8.4,4.79,12.87,7.34Z" />
            <path className="logo_e" d="M148.05,146.62l156.69-76.88c.61-.3,1.32-.29,1.92.05,4.14,2.36,20.72,11.83,24.4,14.02.3.18.28.59-.03.76-9.42,5.08-79.7,41.81-102.31,54.22-1.43.79-1.13,1.08.02,1.77,9.7,5.87,31.31,21.14,32.26,20.62,17.34-9.59,71.37-38.75,78.82-42.77.55-.29,1.18-.3,1.74-.02,3.84,1.93,19.3,9.69,28.5,14.38.31.16.31.57,0,.74-23.55,12.99-57.36,31.64-80.8,44.57,2.34,1.43,17.56,10.96,26.21,16.3,1.31.81,17.48-8.98,18.88-9.76,27.84-15.42,62.78-31.95,90.85-47.36.8-.44,1.74-.46,2.56-.05,5.78,2.9,21.6,10.9,26.95,13.77.78.42.78,1.52,0,1.94-16.32,8.97-134.26,73.78-147.77,81.2-.8.44-1.74.43-2.54-.01l-156.36-86.19c-.52-.29-.5-1.04.03-1.3ZM457.92,153.72c0-1.35-.74-2.58-1.93-3.2-5.79-3.02-22.91-11.95-28.19-14.66-1.01-.52-2.17-.52-3.19,0-12.48,6.41-94.41,48.5-94.73,48.41-20.61-6.54,33.08-40.09,42.05-45.57.79-.48,1.25-1.33,1.25-2.25v-2.82c0-.34-.19-.65-.49-.81l-31.19-16.11c-.53-.27-1.16-.26-1.68.03l-65.17,35.44c-23.69-7.67,46.67-54.4,57.53-61.6.89-.59,1.41-1.56,1.42-2.62l.04-2.44c.01-.86-.41-1.64-1.15-2.08-1.85-1.11-5.59-3.34-8.97-5.37-4.52-2.71-12.31-7.43-15.63-9.44-.98-.59-2.16-.66-3.19-.17-15.73,7.58-140.62,67.77-160.08,77.82-.87.45-.88,1.68-.01,2.15,15.63,8.53,118.88,65.44,159.37,88.02q1.66.93,3.37-.05c11.68-6.69,23.86-13.47,35.76-20.04,13.82-7.63,32.57-19.9,53.42-27.49,53.84-19.6,61.36,10.58,61.36,10.58v-45.74Z" />
            <path className="logo_p" d="M456.66,205.82c-2.08-9.36-7.16-16.16-16.47-19.16-5.63-1.82-11.42-1.96-17.18-1.26-17.24,2.07-33.23,8.32-48.28,16.69-21.64,12.03-42.84,24.87-64.27,37.29-1.25.73-2.03,2.04-2.03,3.51.05,55.35.04,164.09.04,177.64,0,.63.66,1.01,1.2.7,6.12-3.53,33.71-19.55,47.75-27.65,1.09-.63,1.76-1.81,1.75-3.08-.06-15.43-.02-30.87-.07-46.3,0-1.19.63-2.29,1.66-2.87,5.6-3.17,11.15-6.44,16.71-9.68,20.08-11.65,37.99-25.99,52.76-44.18,12.58-15.48,21.96-32.64,25.83-52.55,1.87-9.64,2.76-19.37.6-29.09ZM452.62,238.95c-4.37,17.86-13.23,33.38-24.74,47.39-14.99,18.25-33.13,32.6-53.49,44.14-5.55,3.15-11.01,6.45-16.57,9.58-1.12.63-1.24,1.4-1.24,2.5.02,15.61,0,31.23.05,46.84,0,1.04-.53,1.99-1.43,2.51-12.42,7.18-37.01,21.35-42.87,24.74-.58.33-1.28-.1-1.28-.77l-.05-172.61c0-.79.42-1.53,1.1-1.93,6.97-4.12,45.31-26.74,64.9-37.55,15.02-8.28,30.98-14.42,48.25-16.06,4.02-.38,8.02-.16,11.96.73,9.84,2.23,15.26,8.84,17.15,18.58,2.09,10.75.85,21.41-1.73,31.91Z" />
            <path className="logo_p" d="M411.26,244.87c-.67-8.3-5.56-12.85-13.83-12.84-3.75,0-7.3,1-10.78,2.28-9.67,3.56-18.51,8.72-27.15,14.25-1.27.69-1.64,1.49-1.64,2.89.05,17.38.03,34.77.03,52.15v1.79c.53.24.8.02,1.07-.14,7.38-4.49,15.14-8.32,22.36-13.08,8.08-5.32,15.35-11.52,21.07-19.39,6.04-8.31,9.71-17.4,8.85-27.91ZM383.79,262.54c-3.13,4.3-7.1,7.7-11.52,10.6-3.95,2.6-8.19,4.69-12.23,7.15-.14.09-.29.21-.58.08v-.98c0-9.5,0-19.01-.02-28.51,0-.77.2-1.2.89-1.58,4.72-3.03,9.55-5.85,14.84-7.79,1.9-.7,3.84-1.25,5.89-1.25,4.52,0,7.19,2.49,7.56,7.02.47,5.75-1.54,10.71-4.84,15.26Z" />
            <g>
              <path className="logo_unity first" fill='white' d="M141.95,480.97v-34.75h14.66v34.75c0,9.95,4.89,14.75,12.18,14.75s12.18-4.8,12.18-14.75v-34.75h14.66v34.75c0,19.64-11.24,28.53-26.84,28.53s-26.84-8.89-26.84-28.53Z" />
              <path className="logo_unity second" fill='white' d="M273.88,485.99v22.44h-14.09v-20.31c0-6-2.22-9.69-6.84-9.69s-8.27,3.91-8.27,10.71v19.28h-14.35v-39.59h14.35v6.58c3.33-4.84,8.53-7.33,13.78-7.33,8.89,0,15.42,5.73,15.42,17.91Z" />
              <path className="logo_unity third" fill='white' d="M306.59,460.97v-14.09h14.09v14.09h-14.09ZM306.59,508.43v-39.28h14.09v39.28h-14.09Z" />
              <path className="logo_unity fourth" fill='white' d="M383.07,469.15v11.55h-10.09v27.73h-14.09v-27.73h-7.24v-11.55h7.24v-14.75h14.09v14.75h10.09Z" />
              <path className="logo_unity fivth" fill='white' d="M443.28,469.15h14.71l-25.33,63.1h-14.71l9.6-20.57-17.15-42.53h15.37l8.84,26.31,8.67-26.31Z" />
            </g>
          </g>
        </svg>
      </div>
    )
  }


  return (
    <Router>

      <Header
        language={language}
        setLanguage={setLanguage}
        profileData={profileData}
        isAuthenticated={isAuthenticated}
      />
      <MarginElement />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/price-calculation" element={<Calculate language={language} profileData={profileData} isAuthenticated={isAuthenticated} />} />
        <Route path="/projects" element={<Projects language={language} />} />
        <Route path="/upload-file" element={<FileUpload />} />
        <Route path="/profile-update" element={<ProfileUpdate profileData={profileData} setProfileUpdated={setProfileUpdated} profileUpdated={profileUpdated} />} />
        <Route path="/projects/:projectId" element={<SelectedProject language={language} />} />
        <Route path="/login" element={<Login language={language} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/password-reset" element={<PasswordResetRequest />} />
        <Route path="/reset-password/:uidb64/:token" element={<PasswordReset />} />
      </Routes>
      <Footer language={language} />
    </Router>
  )
}


export default App

