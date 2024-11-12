import axios from 'axios';

const baseURL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://api.mepunity.com';

const axiosInstance = axios.create({
  baseURL: baseURL,
});

// Request interceptor to add the access token to headers
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refresh_token');

    if (error.response.status === 401 && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
          refresh: refreshToken,
        });
        localStorage.setItem('access_token', response.data.access);
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token is invalid', refreshError);
        // Optionally, you can handle logout or redirect to login page here
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;