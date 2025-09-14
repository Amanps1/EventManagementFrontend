import axios from "axios";

const BASE_URL = "/api/resources";

export const getResources = () => axios.get(BASE_URL);
export const getResourceById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createResource = (data) => axios.post(BASE_URL, data);
export const updateResource = (id, data) =>
  axios.put(`${BASE_URL}/${id}`, data);
export const deleteResource = (id) => axios.delete(`${BASE_URL}/${id}`);
