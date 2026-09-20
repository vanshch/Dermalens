import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'}/api/auth`;

export async function loginUser({ email, password }) {
  const response = await axios.post(`${API_URL}/login`, { email, password });
  return response.data.data;
}

export async function registerUser({ name, email, password }) {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
}
