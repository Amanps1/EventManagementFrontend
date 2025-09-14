import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const data = [
  { name: "Jan", registrations: 40, feedback: 30 },
  { name: "Feb", registrations: 80, feedback: 45 },
  { name: "Mar", registrations: 65, feedback: 60 },
  { name: "Apr", registrations: 100, feedback: 70 },
];

const AnalyticsPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">Analytics</h1>

      {/* Registrations Bar Chart */}
      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h2 className="text-lg font-semibold mb-4">Event Registrations</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="registrations" fill="#6366F1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Feedback Line Chart */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Feedback Trends</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="feedback"
              stroke="#10B981"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AnalyticsPage;
