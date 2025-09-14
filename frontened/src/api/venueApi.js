import axios from "axios";

const BASE_URL = "http://localhost:8080/api/venues";

export const getAllVenues = (page = 0, size = 50) =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}`);

export const getVenueById = (id) => axios.get(`${BASE_URL}/${id}`);

export const createVenue = (data) => axios.post(BASE_URL, data);

export const updateVenue = (id, data) => axios.put(`${BASE_URL}/${id}`, data);

export const deleteVenue = (id) => axios.delete(`${BASE_URL}/${id}`);

export const getAvailableVenues = (startDate, endDate) =>
  axios.get(`${BASE_URL}/available?startDate=${startDate}&endDate=${endDate}`);

export const getVenueBookings = (id) => axios.get(`${BASE_URL}/${id}/bookings`);

export const getVenuesByZone = (zoneId) => axios.get(`${BASE_URL}/zone/${zoneId}`);