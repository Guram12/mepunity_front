import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../App';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');
  const [password1, setPassword1] = useState<string>('');
  const [password2, setPassword2] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  const navigate = useNavigate();


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    try {
      const response = await axios.post(`${baseURL}/auth/registration/`, {
        username,
        email,
        password1: password1,
        password2: password2,
      });
      console.log(response)
      if (response.data.detail === 'Verification e-mail sent.') {
        console.log('Registration successful! Please check your email to confirm your account.');
        setSuccess('Registration successful! Please check your email to confirm your account.');
        setError("");  // Clear any previous errors
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.data) {
        const errorData = axiosError.response.data as { email: string; password1: String; username: string };
        // Handle different error types
        if (errorData.email) {
          setError(`Email: ${errorData.email}`);
        } else if (errorData.password1) {
          setError(`Password: ${errorData.password1}`);
        } else if (errorData.username) {
          setError(`Username: ${errorData.username}`);
        } else {
          setError('Registration failed. Please check the input fields.');
        }
      } else {
        setError('An unknown error occurred.');
      }
    }
  };


  const handleLogin = () => {
    navigate('/')
  }


  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password1}
            onChange={(e) => setPassword1(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
            required
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Register</button>
      </form>
      <button  onClick={handleLogin} >Go To Login</button>
    </div>
  );
};

export default Register;