import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Plus,
  Trash2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ResourceBookingPage = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([
    {
      id: 1,
      resourceName: 'Conference Room A',
      resourceType: 'ROOM',
      bookedBy: 'John Doe',
      startTime: '2024-01-15T09:00:00',
      endTime: '2024-01-15T12:00:00',
      purpose: 'Team Meeting',
      status: 'CONFIRMED',
      totalCost: 75,
      attendees: 15
    },
    {
      id: 2,
      resourceName: 'Sound System Pro',
      resourceType: 'EQUIPMENT',
      bookedBy: 'Sarah Wilson',
      startTime: '2024-01-16T14:00:00',
      endTime: '2024-01-16T18:00:00',
      purpose: 'Workshop Event',
      status: 'PENDING',
      totalCost: 60,
      attendees: 30
    },
    {
      id: 3,
      resourceName: 'Outdoor Pavilion',
      resourceType: 'VENUE',
      bookedBy: 'Mike Johnson',
      startTime: '2024-01-20T10:00:00',
      endTime: '2024-01-20T16:00:00',
      purpose: 'Community Gathering',
      status: 'CONFIRMED',
      totalCost: 240,
      attendees: 100
    }
  ]);

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [newBooking, setNewBooking] = useState({
    resourceName: '',
    startTime: '',
    endTime: '',
    purpose: '',
    attendees: '',
    bookedBy: 'Current User'
  });

  const availableResources = [
    'Conference Room A',
    'Conference Room B',
    'Sound System Pro',
    'Outdoor Pavilion',
    'Projector Set',
    'Meeting Room C'
  ];

  const getStatusColor = (status) => {
    const colors = {
      CONFIRMED: 'bg-green-100 text-green-800',
      PENDING: 'bg-yellow-100 text-yellow-800',
      CANCELLED: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getResourceTypeIcon = (type) => {
    const icons = {
      ROOM: MapPin,
      EQUIPMENT: Users,
      VENUE: Calendar
    };
    const Icon = icons[type] || MapPin;
    return <Icon className="w-4 h-4" />;
  };

  const formatDateTime = (dateTime) => {
    return new Date(dateTime).toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const calculateDuration = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const hours = (endTime - startTime) / (1000 * 60 * 60);
    return hours;
  };

  const filteredBookings = bookings.filter(booking => {
    if (selectedFilter === 'all') return true;
    return booking.status === selectedFilter;
  });

  const handleAddBooking = () => {
    const booking = {
      id: Date.now(),
      ...newBooking,
      resourceType: 'ROOM', 
      status: 'PENDING',
      totalCost: calculateDuration(newBooking.startTime, newBooking.endTime) * 25, 
      attendees: parseInt(newBooking.attendees)
    };
    
    setBookings([...bookings, booking]);
    setNewBooking({
      resourceName: '',
      startTime: '',
      endTime: '',
      purpose: '',
      attendees: '',
      bookedBy: 'Current User'
    });
    setShowBookingModal(false);
  };

  const handleCancelBooking = (id) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      setBookings(bookings.map(booking => 
        booking.id === id ? { ...booking, status: 'CANCELLED' } : booking
      ));
    }
  };

  const handleConfirmBooking = (id) => {
    setBookings(bookings.map(booking => 
      booking.id === id ? { ...booking, status: 'CONFIRMED' } : booking
    ));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/resources')}
            className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Resource Bookings
            </h1>
            <p className="text-gray-600 mt-2">Manage and track resource reservations</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBookingModal(true)}
          className="flex items-center space-x-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          <span>New Booking</span>
        </motion.button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Bookings', value: bookings.length, color: 'from-blue-500 to-indigo-500', icon: Calendar },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'CONFIRMED').length, color: 'from-green-500 to-emerald-500', icon: CheckCircle },
          { label: 'Pending', value: bookings.filter(b => b.status === 'PENDING').length, color: 'from-yellow-500 to-amber-500', icon: Clock },
          { label: 'Total Revenue', value: `$${bookings.reduce((sum, b) => sum + b.totalCost, 0)}`, color: 'from-purple-500 to-violet-500', icon: DollarSign }
        ].map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-xl bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex space-x-4">
          {['all', 'CONFIRMED', 'PENDING', 'CANCELLED'].map(filter => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-xl font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {filter === 'all' ? 'All Bookings' : filter.charAt(0) + filter.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Booking History</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booked By</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cost</th>
                <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <AnimatePresence>
                {filteredBookings.map((booking, index) => (
                  <motion.tr
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-indigo-100 rounded-lg">
                          {getResourceTypeIcon(booking.resourceType)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{booking.resourceName}</p>
                          <p className="text-sm text-gray-500">{booking.attendees} attendees</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">{booking.bookedBy}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <p className="font-medium text-gray-900">{formatDateTime(booking.startTime)}</p>
                        <p className="text-sm text-gray-500">to {formatDateTime(booking.endTime)}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="text-gray-900">{booking.purpose}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-medium text-gray-900">${booking.totalCost}</p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex space-x-2">
                        {booking.status === 'PENDING' && (
                          <button
                            onClick={() => handleConfirmBooking(booking.id)}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Confirm Booking"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {booking.status !== 'CANCELLED' && (
                          <button
                            onClick={() => handleCancelBooking(booking.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Cancel Booking"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">New Booking</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Resource</label>
                  <select
                    value={newBooking.resourceName}
                    onChange={(e) => setNewBooking({...newBooking, resourceName: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a resource</option>
                    {availableResources.map(resource => (
                      <option key={resource} value={resource}>{resource}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
                  <input
                    type="datetime-local"
                    value={newBooking.startTime}
                    onChange={(e) => setNewBooking({...newBooking, startTime: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
                  <input
                    type="datetime-local"
                    value={newBooking.endTime}
                    onChange={(e) => setNewBooking({...newBooking, endTime: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
                  <input
                    type="text"
                    value={newBooking.purpose}
                    onChange={(e) => setNewBooking({...newBooking, purpose: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Meeting purpose"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Attendees</label>
                  <input
                    type="number"
                    value={newBooking.attendees}
                    onChange={(e) => setNewBooking({...newBooking, attendees: e.target.value})}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Number of attendees"
                  />
                </div>
              </div>
              
              <div className="flex space-x-3 pt-6">
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddBooking}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  Create Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResourceBookingPage;