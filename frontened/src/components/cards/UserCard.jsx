import React from "react";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-blue-700">{user.username}</h3>
      <p className="text-sm text-gray-600">{user.email}</p>
      <div className="mt-3 text-sm text-gray-500">
        <p>
          👤 {user.firstName} {user.lastName}
        </p>
        <p>📞 {user.phoneNumber}</p>
        <p>📍 {user.address}</p>
        <p>🛡 Role: {user.role}</p>
      </div>
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            user.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </div>
    </div>
  );
};

export default UserCard;
