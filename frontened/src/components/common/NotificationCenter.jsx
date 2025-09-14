import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  Calendar,
  Users,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock
} from "lucide-react";
import { updateEvent, getEventById, getAllEvents } from "../../api/eventApi";

const NotificationCenter = ({ isOpen, onClose }) => {
  const [notifications, setNotifications] = useState([]);
  const [realEvents, setRealEvents] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchEventsForNotifications();
    }
  }, [isOpen]);

  const fetchEventsForNotifications = async () => {
    try {
      const response = await getAllEvents(0, 10);
      const events = response.data.data || [];
      setRealEvents(events);
      
      // Create notifications for pending events
      const pendingEvents = events.filter(event => event.status === 'PENDING_APPROVAL');
      const eventNotifications = pendingEvents.map((event, index) => ({
        id: `event_${event.id}`,
        type: "EVENT_APPROVAL_PENDING",
        title: "Event Approval Required",
        message: `Event '${event.title}' by ${event.organizerName || 'Unknown'} requires approval.`,
        timestamp: new Date(Date.now() - (index + 1) * 5 * 60 * 1000),
        isRead: false,
        priority: "HIGH",
        eventId: event.id,
        requiresAction: true
      }));
      
      // Add some static notifications
      const staticNotifications = [
        {
          id: 'static_1',
          type: "REGISTRATION_CONFIRMATION",
          title: "New Registration",
          message: "John Doe has registered for your event.",
          timestamp: new Date(Date.now() - 15 * 60 * 1000),
          isRead: false,
          priority: "MEDIUM"
        },
        {
          id: 'static_2',
          type: "SYSTEM_NOTIFICATION",
          title: "System Maintenance",
          message: "Scheduled maintenance will occur tonight from 2-4 AM.",
          timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
          isRead: true,
          priority: "LOW"
        }
      ];
      
      setNotifications([...eventNotifications, ...staticNotifications]);
    } catch (error) {
      console.error('Error fetching events for notifications:', error);
      // Fallback to static notifications
      setNotifications([
        {
          id: 'fallback_1',
          type: "SYSTEM_NOTIFICATION",
          title: "Welcome",
          message: "Welcome to the Event Management System!",
          timestamp: new Date(),
          isRead: false,
          priority: "LOW"
        }
      ]);
    }
  };

  const getNotificationIcon = (type) => {
    const icons = {
      EVENT_UPDATE: Calendar,
      EVENT_APPROVAL_PENDING: AlertTriangle,
      REGISTRATION_CONFIRMATION: Users,
      REMINDER: Clock,
      COMMUNITY_ALERT: AlertTriangle,
      SYSTEM_NOTIFICATION: Info
    };
    return icons[type] || Info;
  };

  const getNotificationColor = (type, priority) => {
    if (priority === "HIGH") return "from-red-500 to-orange-500";
    if (priority === "MEDIUM") return "from-blue-500 to-indigo-500";
    
    const colors = {
      EVENT_UPDATE: "from-green-500 to-emerald-500",
      EVENT_APPROVAL_PENDING: "from-yellow-500 to-orange-500",
      REGISTRATION_CONFIRMATION: "from-purple-500 to-violet-500",
      REMINDER: "from-yellow-500 to-amber-500",
      COMMUNITY_ALERT: "from-red-500 to-orange-500",
      SYSTEM_NOTIFICATION: "from-gray-500 to-slate-500"
    };
    return colors[type] || "from-gray-500 to-slate-500";
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, isRead: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleApproval = (notificationId, eventId, action) => {
    console.log(`${action}ing event with ID:`, eventId, 'type:', typeof eventId);
    
    // Remove the notification after action
    setNotifications(prev => prev.filter(notif => notif.id !== notificationId));
    
    // Add a new notification about the action taken
    const newNotification = {
      id: Date.now(),
      type: "EVENT_UPDATE",
      title: `Event ${action === 'approve' ? 'Approved' : 'Rejected'}`,
      message: `Event has been ${action === 'approve' ? 'approved and is now live' : 'rejected'}.`,
      timestamp: new Date(),
      isRead: false,
      priority: "MEDIUM"
    };
    
    setNotifications(prev => [newNotification, ...prev]);
    
    // Dispatch custom event to refresh events list
    const eventDetail = { 
      eventId, 
      action, 
      newStatus: action === 'approve' ? 'APPROVED' : 'CANCELLED' 
    };
    console.log('Dispatching event with detail:', eventDetail);
    window.dispatchEvent(new CustomEvent('eventStatusUpdated', { detail: eventDetail }));
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-25 z-40"
            onClick={onClose}
          />

          {/* Notification Panel */}
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Bell className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">Notifications</h2>
                    {unreadCount > 0 && (
                      <p className="text-white/80 text-sm">{unreadCount} unread</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 text-white/80 hover:text-white hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Actions */}
              {unreadCount > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={markAllAsRead}
                  className="mt-4 text-white/80 hover:text-white text-sm font-medium transition-colors"
                >
                  Mark all as read
                </motion.button>
              )}
            </div>

            {/* Notifications List */}
            <div className="flex-1 overflow-y-auto">
              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <Bell className="w-12 h-12 mb-4 text-gray-300" />
                  <p className="text-lg font-medium">No notifications</p>
                  <p className="text-sm">You're all caught up!</p>
                </div>
              ) : (
                <div className="p-4 space-y-3">
                  <AnimatePresence>
                    {notifications.map((notification, index) => {
                      const Icon = getNotificationIcon(notification.type);
                      return (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: 300 }}
                          transition={{ delay: index * 0.05 }}
                          className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                            notification.isRead
                              ? "bg-gray-50 border-gray-200"
                              : "bg-white border-indigo-200 shadow-md"
                          }`}
                          onClick={() => markAsRead(notification.id)}
                        >
                          {/* Unread Indicator */}
                          {!notification.isRead && (
                            <div className="absolute top-4 right-4 w-2 h-2 bg-indigo-500 rounded-full"></div>
                          )}

                          <div className="flex items-start space-x-3">
                            {/* Icon */}
                            <div className={`p-2 rounded-lg bg-gradient-to-r ${getNotificationColor(notification.type, notification.priority)}`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h3 className={`font-medium truncate ${
                                  notification.isRead ? "text-gray-700" : "text-gray-900"
                                }`}>
                                  {notification.title}
                                </h3>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    deleteNotification(notification.id);
                                  }}
                                  className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                              <p className={`text-sm mb-2 ${
                                notification.isRead ? "text-gray-500" : "text-gray-600"
                              }`}>
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-400">
                                  {formatTimestamp(notification.timestamp)}
                                </span>
                                {notification.priority === "HIGH" && (
                                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
                                    High Priority
                                  </span>
                                )}
                              </div>
                              
                              {/* Approval Actions */}
                              {notification.requiresAction && (
                                <div className="flex space-x-2 mt-3">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApproval(notification.id, notification.eventId, 'approve');
                                    }}
                                    className="flex-1 px-3 py-2 bg-green-500 text-white text-xs font-medium rounded-lg hover:bg-green-600 transition-colors"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleApproval(notification.id, notification.eventId, 'reject');
                                    }}
                                    className="flex-1 px-3 py-2 bg-red-500 text-white text-xs font-medium rounded-lg hover:bg-red-600 transition-colors"
                                  >
                                    Reject
                                  </button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <button className="w-full text-center text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors">
                View All Notifications
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default NotificationCenter;