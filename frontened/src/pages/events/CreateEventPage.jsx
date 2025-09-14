import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  Clock,
  FileText,
  Tag,
  Save,
  ArrowLeft,
  AlertCircle,
  CheckCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { createEvent } from "../../api/eventApi";
import { getAllVenues } from "../../api/venueApi";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [venues, setVenues] = useState([]);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "SOCIAL",
    startDatetime: "",
    endDatetime: "",
    location: "",
    venueName: "",
    maxCapacity: "",
    registrationDeadline: "",
    isRecurring: false,
    recurrencePattern: ""
  });

  const categories = [
    { value: "SOCIAL", label: "Social", icon: "🎉", color: "from-pink-500 to-rose-500" },
    { value: "EDUCATIONAL", label: "Educational", icon: "📚", color: "from-blue-500 to-indigo-500" },
    { value: "RECREATIONAL", label: "Recreational", icon: "🎮", color: "from-green-500 to-emerald-500" },
    { value: "CIVIC", label: "Civic", icon: "🏛️", color: "from-purple-500 to-violet-500" },
    { value: "EMERGENCY", label: "Emergency", icon: "🚨", color: "from-red-500 to-orange-500" }
  ];

  useEffect(() => {
    fetchVenues();
  }, []);

  const fetchVenues = async () => {
    try {
      const response = await getAllVenues();
      setVenues(response.data.data || []);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startDatetime) newErrors.startDatetime = "Start date is required";
    if (!formData.endDatetime) newErrors.endDatetime = "End date is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.venueName) newErrors.venueName = "Venue is required";

    if (!formData.maxCapacity || formData.maxCapacity <= 0) newErrors.maxCapacity = "Valid capacity is required";

    // Date validation
    if (formData.startDatetime && formData.endDatetime) {
      const start = new Date(formData.startDatetime);
      const end = new Date(formData.endDatetime);
      if (end <= start) {
        newErrors.endDatetime = "End date must be after start date";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted');
    console.log('Current form data:', formData);
    
    const isValid = validateForm();
    console.log('Validation result:', isValid);
    console.log('Validation errors:', errors);
    
    if (!isValid) {
      console.log('Form validation failed');
      return;
    }

    setLoading(true);
    try {
      // Hardcode organizerName as Aman (existing user in database)
      const eventData = {
        ...formData,
        organizerName: "Aman"
      };
      
      console.log('Submitting form data:', eventData);
      
      const response = await createEvent(eventData);
      console.log('Event created successfully:', response);
      setSuccess(true);
      setTimeout(() => {
        navigate("/events");
      }, 2000);
    } catch (error) {
      console.error("Error creating event:", error);
      console.error("Error response:", error.response?.data);
      setErrors({ submit: error.response?.data?.message || "Failed to create event. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, transition: { duration: 0.2 } },
    blur: { scale: 1, transition: { duration: 0.2 } }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center justify-center h-64"
      >
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-600" />
          </motion.div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Event Created Successfully!</h2>
          <p className="text-gray-600">Redirecting to events page...</p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/events")}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Create New Event
            </h1>
            <p className="text-gray-600 mt-1">Fill in the details to create your event</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <FileText className="w-5 h-5 mr-2 text-indigo-600" />
            Basic Information
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Title *
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.title ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Enter event title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <motion.textarea
                variants={inputVariants}
                whileFocus="focus"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all resize-none ${
                  errors.description ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Describe your event"
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="grid grid-cols-1 gap-2">
                {categories.map((category) => (
                  <motion.label
                    key={category.value}
                    whileHover={{ scale: 1.02 }}
                    className={`flex items-center p-3 border rounded-xl cursor-pointer transition-all ${
                      formData.category === category.value
                        ? "border-indigo-500 bg-indigo-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="category"
                      value={category.value}
                      checked={formData.category === category.value}
                      onChange={handleInputChange}
                      className="sr-only"sName="sr-only"
                    />
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <span className="font-medium text-gray-700">{category.label}</span>
                  </motion.label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Max Capacity *
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="number"
                name="maxCapacity"
                value={formData.maxCapacity}
                onChange={handleInputChange}
                min="1"
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.maxCapacity ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Maximum attendees"
              />
              {errors.maxCapacity && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.maxCapacity}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-indigo-600" />
            Date & Time
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Start Date & Time *
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="datetime-local"
                name="startDatetime"
                value={formData.startDatetime}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.startDatetime ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.startDatetime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.startDatetime}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                End Date & Time *
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="datetime-local"
                name="endDatetime"
                value={formData.endDatetime}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.endDatetime ? "border-red-300" : "border-gray-200"
                }`}
              />
              {errors.endDatetime && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.endDatetime}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Registration Deadline
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="datetime-local"
                name="registrationDeadline"
                value={formData.registrationDeadline}
                onChange={handleInputChange}
                className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
            </div>
          </div>
        </motion.div>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-5 h-5 mr-2 text-indigo-600" />
            Location
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Venue *
              </label>
              <motion.select
                variants={inputVariants}
                whileFocus="focus"
                name="venueName"
                value={formData.venueName}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.venueName ? "border-red-300" : "border-gray-200"
                }`}
              >
                <option value="">Select a venue</option>
                {venues.map((venue) => (
                  <option key={venue.id} value={venue.venueName}>
                    {venue.venueName} (Capacity: {venue.capacity})
                  </option>
                ))}
              </motion.select>
              {errors.venueName && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.venueName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specific Location *
              </label>
              <motion.input
                variants={inputVariants}
                whileFocus="focus"
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${
                  errors.location ? "border-red-300" : "border-gray-200"
                }`}
                placeholder="Room number, floor, etc."
              />
              {errors.location && (
                <p className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.location}
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Submit Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-end space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            onClick={() => navigate("/events")}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
          >
            Cancel
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              console.log('Button clicked');
              handleSubmit(e);
            }}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <Save className="w-5 h-5" />
            )}
            <span>{loading ? "Creating..." : "Create Event"}</span>
          </motion.button>
        </motion.div>

        {errors.submit && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center"
          >
            <AlertCircle className="w-5 h-5 mr-2" />
            {errors.submit}
          </motion.div>
        )}
      </form>
    </motion.div>
  );
};

export default CreateEventPage;