import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  Users,
  Calendar,
  MapPin,
  Activity,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30d");

  const metrics = [
    {
      title: "Total Events",
      value: "156",
      change: "+12%",
      changeType: "increase",
      icon: Calendar,
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8%",
      changeType: "increase",
      icon: Users,
      color: "from-green-500 to-green-600"
    },
    {
      title: "Event Attendance",
      value: "89%",
      change: "+5%",
      changeType: "increase",
      icon: TrendingUp,
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Venue Utilization",
      value: "73%",
      change: "-2%",
      changeType: "decrease",
      icon: MapPin,
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-2">Track your event management performance</p>
        </div>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${metric.color}`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {metric.changeType === 'increase' ? 
                    <ArrowUpRight className="w-4 h-4" /> : 
                    <ArrowDownRight className="w-4 h-4" />
                  }
                  <span className="font-medium">{metric.change}</span>
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{metric.value}</p>
                <p className="text-gray-600 text-sm">{metric.title}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h3 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-indigo-600" />
          Recent Activity
        </h3>
        <div className="space-y-4">
          {[
            { action: "New event created", details: "Annual Tech Conference", time: "2 hours ago" },
            { action: "Event approved", details: "Community Meetup", time: "4 hours ago" },
            { action: "User registered", details: "John Doe joined", time: "6 hours ago" },
            { action: "Event completed", details: "Workshop Series", time: "1 day ago" }
          ].map((activity, index) => (
            <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <div className="flex-1">
                <p className="text-gray-900 font-medium">{activity.action}</p>
                <p className="text-gray-600 text-sm">{activity.details}</p>
              </div>
              <span className="text-gray-500 text-sm">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default AnalyticsPage;