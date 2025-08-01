
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:2000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
//admin
export const getAdminLogin = async (email, password) => {
  const response = await api.post('/admin/', { email, password });
  return response.data;
};
//login User

export const getUserlogin = async (email,password)=>{
    const response = await api.post('/auth/login',{email,password});
    return response.data
}

//registered User
export const createUser = async (email, password, username) => {
  const response = await api.post('/auth/register', { email, password, username });
  return response.data;
};
//get ticket
export const getAllTicket = async () => {
  const token = localStorage.getItem("token"); 
  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/ticket/", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data; 
};

//Create ticket
export const createTicket = async (ticketData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.post("/ticket/", ticketData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};


//admin
export const getDashboardStats = async () => {
  const token = localStorage.getItem("admintoken");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/admin/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
// get all tickets by admin 
export const getAlltickesAdmin = async() => {
  const token = localStorage.getItem("admintoken");

  if (!token) {
    throw new Error("No token found");
  }

  const response = await api.get("/admin/admintickets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
export default api;
