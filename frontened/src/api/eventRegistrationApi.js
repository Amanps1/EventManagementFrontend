import axios from "axios";

const BASE_URL = "http://localhost:8080/api/events";

export const registerForEvent = (eventId, data) => 
  axios.post(`${BASE_URL}/${eventId}/register`, data);

export const unregisterFromEvent = (eventId, userId) => 
  axios.delete(`${BASE_URL}/${eventId}/unregister?userId=${userId}`);

export const getEventRegistrations = (eventId) => 
  axios.get(`${BASE_URL}/${eventId}/registrations`);

export const updateRegistrationStatus = (eventId, registrationId, status) => 
  axios.put(`${BASE_URL}/${eventId}/registrations/${registrationId}?status=${status}`);

export const checkInUser = (eventId, userId) => 
  axios.post(`${BASE_URL}/${eventId}/check-in/${userId}`);

export const getEventAttendees = (eventId) => 
  axios.get(`${BASE_URL}/${eventId}/attendees`);

export const submitEventFeedback = (eventId, userId, rating, comment) => 
  axios.post(`${BASE_URL}/${eventId}/feedback?userId=${userId}&rating=${rating}&comment=${comment}`);

export const getEventFeedback = (eventId) => 
  axios.get(`${BASE_URL}/${eventId}/feedback`);