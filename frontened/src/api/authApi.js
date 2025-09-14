// src/api/authApi.js
import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";

// Login
export const loginUser = async (loginDto) => {
  return await axios.post(`${API_URL}/login`, loginDto);
};

// Register
export const registerUser = async (registrationDto) => {
  return await axios.post(`${API_URL}/register`, registrationDto);
};

// Forgot Password
export const forgotPassword = async (email) => {
  return await axios.post(`${API_URL}/forgot-password`, { email });
};

// Reset Password
export const resetPassword = async (token, newPassword) => {
  return await axios.post(`${API_URL}/reset-password`, { token, newPassword });
};
