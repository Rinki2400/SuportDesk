
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:2000/api/auth',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
//admin
export const getAdminLogin = async (email, password) => {
  const response = await api.post('/admin', { email, password });
  return response.data;
};
//login User

export const getUserlogin = async (email,password)=>{
    const response = await api.post('/login',{email,password});
    return response.data
}

//registered User
export const createUser = async (email, password, username) => {
  const response = await api.post('/register', { email, password, username });
  return response.data;
};

export default api;
