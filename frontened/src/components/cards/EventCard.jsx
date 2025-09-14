import React from "react";

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-indigo-700">{event.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
      <div className="mt-3 text-sm text-gray-500">
        <p>
           {event.location} | {event.venueName}
        </p>
        <p>
          🗓 {new Date(event.startDatetime).toLocaleString()} -{" "}
          {new Date(event.endDatetime).toLocaleString()}
        </p>
        <p>👤 Organizer: {event.organizerName}</p>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
          {event.status}
        </span>
        <span className="text-sm text-gray-600">
          {event.currentRegistrations}/{event.maxCapacity} registered
        </span>
      </div>
    </div>
  );
};

export default EventCard;
