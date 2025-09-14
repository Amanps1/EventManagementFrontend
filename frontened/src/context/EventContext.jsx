import React, { createContext, useContext, useState, useCallback } from "react";
import * as eventApi from "../api/eventApi";

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  // Fetch all events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await eventApi.getAllEvents();
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  }, []);

  // Fetch single event
  const fetchEventById = async (id) => {
    try {
      const res = await eventApi.getEventById(id);
      return res.data;
    } catch (err) {
      console.error("Error fetching event:", err);
      throw err;
    }
  };

  // Create a new event
  const createNewEvent = async (data) => {
    try {
      const res = await eventApi.createEvent(data);
      setEvents((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      console.error("Error creating event:", err);
      throw err;
    }
  };

  // Update event
  const updateExistingEvent = async (id, data) => {
    try {
      const res = await eventApi.updateEvent(id, data);
      setEvents((prev) => prev.map((e) => (e.id === id ? res.data : e)));
      return res.data;
    } catch (err) {
      console.error("Error updating event:", err);
      throw err;
    }
  };

  // Delete event
  const deleteEvent = async (id) => {
    try {
      await eventApi.deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Error deleting event:", err);
      throw err;
    }
  };

  // Submit feedback for an event
  const submitFeedback = async (eventId, feedbackData) => {
    try {
      await eventApi.updateEvent(eventId, { feedback: feedbackData });
      // optionally update local state if needed
    } catch (err) {
      console.error("Error submitting feedback:", err);
      throw err;
    }
  };

  return (
    <EventContext.Provider
      value={{
        events,
        fetchEvents,
        fetchEventById,
        createNewEvent,
        updateExistingEvent,
        deleteEvent,
        submitFeedback,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

export const useEvent = () => useContext(EventContext);
