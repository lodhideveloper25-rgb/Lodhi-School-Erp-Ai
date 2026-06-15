import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    let token = null;
    const authStorage = localStorage.getItem('auth-storage');

    if (authStorage) {
      try {
        const stored = JSON.parse(authStorage);
        token = stored?.state?.user?.token;
      } catch (err) {
        // ignore invalid storage data
      }
    }

    if (!token) {
      token = localStorage.getItem('token');
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
