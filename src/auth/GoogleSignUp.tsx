import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';


interface GoogleOuthProps {
  setIsAuthenticated: (value: boolean) => void;
  setIsGoogleLoggedIn: (value: boolean) => void;
  isGoogleLoggedIn: boolean;
}

interface ProfileData {
  username: string;
  company: string;
  phone_number: string;
}


const GoogleSignUp: React.FC<GoogleOuthProps> = ({ setIsAuthenticated, setIsGoogleLoggedIn, isGoogleLoggedIn }) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    username: '',
    phone_number: '',
    company: '',
  });


  const navigate = useNavigate();

  const handleGoogleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    console.log('Google login success:', credentialResponse);
    try {
      const response = await axios.post(`${baseURL}/dj-rest-auth/google/`, {
        id_token: credentialResponse.credential,  // Send credential as id_token
      });
      console.log('Google login response:', response.data);
      if (response.data.access && response.data.refresh) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        // Fetch user profile to get the user_id
        const profileResponse = await axios.get(`${baseURL}/auth/profile/`, {
          headers: {
            Authorization: `Bearer ${response.data.access}`,
          },
        });
        localStorage.setItem('user_id', profileResponse.data.id);
        if (profileResponse.data.username | profileResponse.data.company | profileResponse.data.phone_number) {
          setIsAuthenticated(true);
        }
        setIsGoogleLoggedIn(true);
      }
    } catch (error: any) {
      console.error('Error during Google login:', error.response);
    }
  };

  // Handle Google Login failure
  const handleGoogleLoginFailure = () => {
    console.error('Google login error');
  };


  const handleProfileSetupSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem('access_token');
      if (token) {
        const response = await axios.put(`${baseURL}/auth/profile/complite/`, profileData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Profile setup response:', response.data);
        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error: any) {
      console.error('Error during profile setup:', error.response);
    }
  };


  return (
    <div>
      {!isGoogleLoggedIn && (
        <GoogleOAuthProvider clientId="1006633413820-umehv7r3fdj53sf5duud48bcbl7mie3o.apps.googleusercontent.com">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            theme="filled_black"  // Options: 'outline' or 'filled'
            size="large"     // Options: 'small', 'medium', 'large'
            text="signup_with"    // Options: 'signin_with', 'signup_with', 'continue_with', 'signin'
            width="50px"
            locale="ka" 

          />
        </GoogleOAuthProvider>
      )}

      {isGoogleLoggedIn && (
        <form onSubmit={handleProfileSetupSubmit}>

          <div>
            <label>
              UserName:
              <input
                type="text"
                value={profileData.username}
                onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Company:
              <input
                type="text"
                value={profileData.company}
                onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                required
              />
            </label>
          </div>

          <div>
            <label>
              Phone Number:
              <input
                type="text"
                value={profileData.phone_number}
                onChange={(e) => setProfileData({ ...profileData, phone_number: e.target.value })}
                required
              />
            </label>
          </div>
          <button type="submit">Complete Profile</button>
        </form>
      )}
    </div>
  );
};

export default GoogleSignUp;