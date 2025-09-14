// src/components/common/Sidebar.jsx
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  HomeIcon,
  CalendarIcon,
  UsersIcon,
  CogIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { useAuth } from "../../context/AuthContext";

const menuItems = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    name: "Events",
    path: "/events",
    icon: <CalendarIcon className="h-6 w-6" />,
  },
  {
    name: "Users",
    path: "/users",
    icon: <UsersIcon className="h-6 w-6" />,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <CogIcon className="h-6 w-6" />,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <motion.div
      animate={{ width: isOpen ? 220 : 70 }}
      className="bg-gray-800 text-white h-screen p-4 flex flex-col shadow-lg z-50"
    >
      <div className="flex items-center justify-between mb-8">
        {isOpen && <h1 className="text-xl font-bold">EventManager</h1>}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none bg-gray-700 p-1 rounded hover:bg-gray-600 transition"
        >
          {isOpen ? "<" : ">"}
        </button>
      </div>
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded transition-colors ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            {item.icon}
            {isOpen && <span className="text-md font-medium">{item.name}</span>}
          </NavLink>
        ))}
      </nav>
      {user && (
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 p-3 mt-auto rounded hover:bg-red-600 transition-colors w-full"
        >
          <LogoutIcon className="h-6 w-6" />
          {isOpen && <span className="text-md font-medium">Logout</span>}
        </button>
      )}
    </motion.div>
  );
}
