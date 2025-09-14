import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Calendar, 
  MapPin, 
  TrendingUp, 
  Activity, 
  Clock,
  Star,
  ArrowUpRight,
  BarChart3
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

const DashboardPage = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    eventsHosted: 0,
    venuesAvailable: 0,
    activeEvents: 0,
    pendingApprovals: 0,
    totalRegistrations: 0
  });
  const [recentEvents, setRecentEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch system statistics
        const statsResponse = await axios.get("http://localhost:8080/api/admin/statistics");
        setStats(statsResponse.data.data);
        
        // Fetch recent events
        const eventsResponse = await axios.get("http://localhost:8080/api/events?page=0&size=5");
        setRecentEvents(eventsResponse.data.data || []);
      } catch (err) {
        console.error("Error fetching dashboard data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers || 1247,
      icon: Users,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      change: "+12%",
      changeType: "increase"
    },
    {
      title: "Active Events",
      value: stats.activeEvents || 23,
      icon: Calendar,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      change: "+8%",
      changeType: "increase"
    },
    {
      title: "Venues Available",
      value: stats.venuesAvailable || 15,
      icon: MapPin,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-50",
      change: "+3%",
      changeType: "increase"
    },
    {
      title: "Total Registrations",
      value: stats.totalRegistrations || 3456,
      icon: TrendingUp,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-50",
      change: "+15%",
      changeType: "increase"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-6 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Welcome back, {user?.username || user?.email || "Guest"} 👋
            </h1>
            <p className="text-gray-600 mt-2">Here's what's happening with your events today.</p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="w-4 h-4" />
            <span>{new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <motion.div 
        variants={itemVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                  <Icon className={`w-6 h-6 bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  <ArrowUpRight className="w-4 h-4" />
                  <span className="font-medium">{stat.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">
                  {stat.value.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm">{stat.title}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Events */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              Recent Events
            </h2>
            <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentEvents.length > 0 ? recentEvents.slice(0, 4).map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.title}</h3>
                    <p className="text-sm text-gray-600">{event.category} • {event.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(event.startDatetime).toLocaleDateString()}
                  </p>
                  <p className="text-xs text-gray-500">{event.status}</p>
                </div>
              </motion.div>
            )) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent events found</p>
              </div>
            )}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div 
          variants={itemVariants}
          className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
        >
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Star className="w-5 h-5 mr-2 text-indigo-600" />
            Quick Actions
          </h2>
          <div className="space-y-3">
            {[
              { title: "Create Event", icon: Calendar, color: "from-blue-500 to-blue-600" },
              { title: "Manage Users", icon: Users, color: "from-green-500 to-green-600" },
              { title: "View Analytics", icon: BarChart3, color: "from-purple-500 to-purple-600" },
              { title: "System Settings", icon: Activity, color: "from-orange-500 to-orange-600" }
            ].map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.button
                  key={action.title}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    if (action.title === "Create Event") {
                      window.location.href = "/events/create";
                    }
                  }}
                  className="w-full flex items-center space-x-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left"
                >
                  <div className={`p-2 rounded-lg bg-gradient-to-r ${action.color}`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-medium text-gray-700">{action.title}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;