import axios from 'axios';

// Create an instance of axios with your backend base URL
const api = axios.create({
// baseURL: 'https://7000-154-80-16-21.ngrok-free.app/', // Replace with your backend API URL
 baseURL: 'http://localhost:5000/api/', // Replace with your backend API URL
});

// Intercept requests and responses to handle tokens and errors
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Get the token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token to the header if it exists
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // Handle request error
  }
);

// Intercept responses to handle errors globally
api.interceptors.response.use(
  (response) => {
    return response; // Return response if no error
  },
  (error) => {
    // Handle error responses
    if (error.response) {
      console.error('Error response:', error.response.data);
      // Optionally: Show a notification or alert to the user
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error); // Propagate error to the calling function
  }
);
export default api;