import { GoogleOAuthProvider, GoogleLogin, CredentialResponse } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../App';

interface GoogleOuthProps {
  setIsAuthenticated: (value: boolean) => void;
}

const GoogleSignUp: React.FC<GoogleOuthProps> = ({ setIsAuthenticated }) => {
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

        setIsAuthenticated(true);
        navigate("/");
      }
    } catch (error: any) {
      console.error('Error during Google login:', error.response);
    }
  };

  // Handle Google Login failure
  const handleGoogleLoginFailure = () => {
    console.error('Google login error');
  };

  return (
    <div>
      <GoogleOAuthProvider clientId="1006633413820-umehv7r3fdj53sf5duud48bcbl7mie3o.apps.googleusercontent.com">
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginFailure}
          theme="outline"  // Options: 'outline' or 'filled'
          size="large"     // Options: 'small', 'medium', 'large'
          text="signup_with"    // Options: 'signin_with', 'signup_with', 'continue_with', 'signin'
          width="50px"
        />
      </GoogleOAuthProvider>
    </div>
  );
};

export default GoogleSignUp;