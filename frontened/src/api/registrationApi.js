import axios from "axios";

export const registerForEvent = (eventId, data) =>
  axios.post(`/api/events/${eventId}/register`, data);
export const unregisterFromEvent = (eventId, userId) =>
  axios.delete(`/api/events/${eventId}/unregister`, { params: { userId } });
export const getRegistrations = (eventId) =>
  axios.get(`/api/events/${eventId}/registrations`);
export const updateRegistrationStatus = (eventId, registrationId, status) =>
  axios.put(`/api/events/${eventId}/registrations/${registrationId}`, null, {
    params: { status },
  });
export const submitFeedback = (eventId, userId, rating, comment) =>
  axios.post(`/api/events/${eventId}/feedback`, null, {
    params: { userId, rating, comment },
  });
