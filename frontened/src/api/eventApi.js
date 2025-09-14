import axios from "axios";

const BASE_URL = "http://localhost:8080/api/events";
export const getAllEvents = (page = 0, size = 10, sortBy = "startDatetime") =>
  axios.get(`${BASE_URL}?page=${page}&size=${size}&sortBy=${sortBy}`);
export const getEventById = (id) => axios.get(`${BASE_URL}/${id}`);
export const createEvent = (data, config = {}) => axios.post(BASE_URL, data, config);
export const updateEvent = (id, data) => axios.put(`${BASE_URL}/${id}`, data);
export const deleteEvent = (id) => axios.delete(`${BASE_URL}/${id}`);
export const getEventsByCategory = (category) =>
  axios.get(`${BASE_URL}/category/${category}`);
export const getEventsByZone = (zoneId) =>
  axios.get(`${BASE_URL}/zone/${zoneId}`);
export const getUpcomingEvents = () => axios.get(`${BASE_URL}/upcoming`);

export const getMyEvents = (username) =>
  axios.get(`${BASE_URL}/my-events?username=${username}`);
export const getMyRegistrations = (username) =>
  axios.get(`${BASE_URL}/my-registrations?username=${username}`);
export const getCalendarEvents = (start, end) =>
  axios.get(`${BASE_URL}/calendar?start=${start}&end=${end}`);
export const searchEvents = (keyword = "", category = "") =>
  axios.get(`${BASE_URL}/search?keyword=${keyword}&category=${category}`);
