
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:2000/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getAdminLogin = async (email, password) => {
  const response = await api.post('/admin', { email, password });
  return response.data;
};

export default api;
