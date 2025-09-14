import axios from "axios";

const BASE_URL = "http://localhost:8080/api/users";

export const getAllUsers = (page = 0, size = 100) =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}`);

export const getUserById = (id) => axios.get(`${BASE_URL}/${id}`);

export const updateUserRole = (id, role) =>
  axios.put(`${BASE_URL}/${id}/role?role=${role}`);

export const deactivateUser = (id) => axios.delete(`${BASE_URL}/${id}`);

export const getUsersByZone = (zoneId) => axios.get(`${BASE_URL}/zone/${zoneId}`);

export const getCurrentUserProfile = () => axios.get(`${BASE_URL}/profile`);

export const updateUserProfile = (data) => axios.put(`${BASE_URL}/profile`, data);