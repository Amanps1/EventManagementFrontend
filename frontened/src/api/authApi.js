
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

export const loginUser = async (loginDto) => {
  return await axios.post(`${API_URL}/login`, loginDto);
};

export const registerUser = async (registrationDto) => {
  return await axios.post(`${API_URL}/register`, registrationDto);
};

export const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

export const resetPassword = async (token, newPassword) => {
  return await axios.post(`${API_URL}/reset-password`, { token, newPassword });
};
