import axios from "axios";

const BASE_URL = "/api/zones";

export const getZones = () => axios.get(BASE_URL);
export const getZoneById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createZone = (data) => axios.post(BASE_URL, data);
export const updateZone = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteZone = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getZoneEvents = (id) => axios.get(`${BASE_URL}/${id}/events`);
export const getZoneResidents = (id) =>
  axios.get(`${BASE_URL}/${id}/residents`);
