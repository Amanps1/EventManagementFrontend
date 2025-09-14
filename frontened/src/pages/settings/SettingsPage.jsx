import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import {
  Settings,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Mail,
  Users,
  Calendar
} from "lucide-react";

const SettingsPage = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("general");
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      eventReminders: true,
      approvalAlerts: true
    },
    system: {
      autoApproval: false,
      maxCapacity: 1000,
      defaultDuration: 2
    }
  });

  const tabs = [
    { id: "general", label: "General", icon: Settings },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "system", label: "System", icon: Database }
  ];

  const handleSettingChange = (category, key, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [key]: value
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            System Settings
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your application preferences and configurations</p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => {
              console.log('Toggle button clicked, current theme:', theme);
              const newTheme = theme === 'light' ? 'dark' : 'light';
              console.log('Setting theme to:', newTheme);
              setTheme(newTheme);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Current: {theme} | Toggle to {theme === 'light' ? 'Dark' : 'Light'}
          </button>
          <button
            onClick={() => {
              localStorage.removeItem('theme');
              document.documentElement.classList.remove('dark');
              setTheme('light');
              console.log('Force reset to light mode');
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Force Light Mode + Reload
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div 
          className="rounded-2xl p-6 shadow-lg border transition-colors duration-300"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#f3f4f6'
          }}
        >
          <nav className="space-y-2">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors text-left border"
                  style={{
                    backgroundColor: activeTab === tab.id 
                      ? (theme === 'dark' ? '#312e81' : '#eef2ff')
                      : 'transparent',
                    color: activeTab === tab.id
                      ? (theme === 'dark' ? '#a5b4fc' : '#4f46e5')
                      : (theme === 'dark' ? '#d1d5db' : '#4b5563'),
                    borderColor: activeTab === tab.id
                      ? (theme === 'dark' ? '#4338ca' : '#c7d2fe')
                      : 'transparent'
                  }}
                  onMouseEnter={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = theme === 'dark' ? '#374151' : '#f9fafb';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeTab !== tab.id) {
                      e.target.style.backgroundColor = 'transparent';
                    }
                  }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div 
          className="lg:col-span-3 rounded-2xl p-6 shadow-lg border transition-colors duration-300"
          style={{
            backgroundColor: theme === 'dark' ? '#1f2937' : '#ffffff',
            borderColor: theme === 'dark' ? '#374151' : '#f3f4f6'
          }}
        >
          {activeTab === "general" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">General Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    defaultValue="Event Management System"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                      borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    defaultValue="admin@eventmanagement.com"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                      borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Notification Settings</h2>
              <div className="space-y-4">
                {[
                  { key: "email", label: "Email Notifications", desc: "Receive notifications via email" },
                  { key: "push", label: "Push Notifications", desc: "Browser push notifications" },
                  { key: "eventReminders", label: "Event Reminders", desc: "Reminders for upcoming events" },
                  { key: "approvalAlerts", label: "Approval Alerts", desc: "Alerts for pending approvals" }
                ].map((item) => (
                  <div key={item.key} className="p-4 bg-gray-50 rounded-xl">
                    <div>
                      <h3 className="font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "security" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Security Settings</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Password Policy</h3>
                  <p className="text-sm text-gray-600">Minimum 8 characters with special characters required</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">Two-Factor Authentication</h3>
                  <p className="text-sm text-gray-600">Enhanced security for admin accounts</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Appearance Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => {
                      console.log('Theme changing from', theme, 'to', e.target.value);
                      setTheme(e.target.value);
                    }}
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                      borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Language</label>
                  <select
                    defaultValue="en"
                    className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    style={{
                      backgroundColor: theme === 'dark' ? '#374151' : '#ffffff',
                      borderColor: theme === 'dark' ? '#4b5563' : '#d1d5db',
                      color: theme === 'dark' ? '#ffffff' : '#000000'
                    }}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === "system" && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">System Configuration</h2>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h3 className="font-medium text-gray-900">Auto-approve Events</h3>
                    <p className="text-sm text-gray-600">Automatically approve new events</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Max Capacity
                    </label>
                    <input
                      type="number"
                      value={settings.system.maxCapacity}
                      onChange={(e) => handleSettingChange("system", "maxCapacity", parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Default Duration (hours)
                    </label>
                    <input
                      type="number"
                      value={settings.system.defaultDuration}
                      onChange={(e) => handleSettingChange("system", "defaultDuration", parseInt(e.target.value))}
                      className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end pt-6 border-t border-gray-200">
            <button 
              onClick={() => {
                alert('Settings saved successfully!');
                console.log('Current theme:', theme);
                console.log('Current settings:', settings);
              }}
              className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SettingsPage;