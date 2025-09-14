import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  ArrowLeft,
  User,
  Tag,
  CheckCircle
} from "lucide-react";
import { getEventById } from "../../api/eventApi";

const EventDetailPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await getEventById(id);
        setEvent(response.data.data || response.data);
      } catch (err) {
        console.error('Error fetching event:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Event not found</h2>
        <p className="text-gray-600">The event you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/events')}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const getStatusColor = (status) => {
    const colors = {
      DRAFT: "bg-gray-100 text-gray-800",
      PENDING_APPROVAL: "bg-yellow-100 text-yellow-800",
      APPROVED: "bg-green-100 text-green-800",
      CANCELLED: "bg-red-100 text-red-800",
      COMPLETED: "bg-blue-100 text-blue-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getCategoryIcon = (category) => {
    const icons = {
      SOCIAL: "🎉",
      EDUCATIONAL: "📚",
      RECREATIONAL: "🎮",
      CIVIC: "🏛️",
      EMERGENCY: "🚨"
    };
    return icons[category] || "📅";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <div className="flex items-center space-x-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/events')}
          className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Event Details
          </h1>
          <p className="text-gray-600 mt-1">View complete event information</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-8 pb-6">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-3">
              <span className="text-3xl">{getCategoryIcon(event.category)}</span>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
                <p className="text-gray-600 mt-1">{event.category}</p>
              </div>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(event.status)}`}>
              {event.status?.replace('_', ' ')}
            </span>
          </div>
          
          <p className="text-gray-700 text-lg leading-relaxed">{event.description}</p>
        </div>

        <div className="px-8 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Start Date</p>
                  <p className="text-gray-600">{new Date(event.startDatetime).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">End Date</p>
                  <p className="text-gray-600">{new Date(event.endDatetime).toLocaleString()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Location</p>
                  <p className="text-gray-600">{event.location}</p>
                  <p className="text-sm text-gray-500">{event.venueName}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Organizer</p>
                  <p className="text-gray-600">{event.organizerName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Users className="w-5 h-5 text-indigo-600" />
                <div>
                  <p className="font-medium text-gray-900">Capacity</p>
                  <p className="text-gray-600">{event.currentRegistrations || 0}/{event.maxCapacity} registered</p>
                </div>
              </div>
              
              {event.registrationDeadline && (
                <div className="flex items-center space-x-3">
                  <Tag className="w-5 h-5 text-indigo-600" />
                  <div>
                    <p className="font-medium text-gray-900">Registration Deadline</p>
                    <p className="text-gray-600">{new Date(event.registrationDeadline).toLocaleString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="px-8 pb-8">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-gray-900">Registration Progress</h3>
              <span className="text-sm text-gray-600">
                {Math.round(((event.currentRegistrations || 0) / event.maxCapacity) * 100)}% full
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-indigo-500 to-purple-500 h-3 rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(((event.currentRegistrations || 0) / event.maxCapacity) * 100, 100)}%`
                }}
              ></div>
            </div>
          </div>
        </div>

        {event.isRecurring && (
          <div className="px-8 pb-8">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-indigo-600" />
                <p className="font-medium text-indigo-900">Recurring Event</p>
              </div>
              <p className="text-indigo-700 mt-2">
                Pattern: {event.recurrencePattern || 'Not specified'}
              </p>
            </div>
          </div>
        )}

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate(`/events/${id}/post`)}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              Register for Event
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/events')}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
            >
              Back to Events
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventDetailPage;
