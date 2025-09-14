import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserById } from "../../api/userApi";

const UserDetailPage = () => {
  const { id } = useParams(); // read userId from route (/users/:id)
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const { data } = await getUserById(id);
      setUser(data);
    } catch (err) {
      console.error("Error fetching user details:", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) return <p className="p-6">Loading user details...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">
        User Details: {user.username}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p>
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p>
            <span className="font-medium">Full Name:</span> {user.firstName}{" "}
            {user.lastName}
          </p>
          <p>
            <span className="font-medium">Phone:</span> {user.phoneNumber}
          </p>
          <p>
            <span className="font-medium">Address:</span> {user.address}
          </p>
        </div>

        <div>
          <p>
            <span className="font-medium">Role:</span> {user.role}
          </p>
          <p>
            <span className="font-medium">Active:</span>{" "}
            {user.active ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Email Verified:</span>{" "}
            {user.emailVerified ? "Yes" : "No"}
          </p>
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {new Date(user.createdDate).toLocaleString()}
          </p>
          <p>
            <span className="font-medium">Last Login:</span>{" "}
            {new Date(user.lastLogin).toLocaleString()}
          </p>
        </div>
      </div>                                                                                                  
    </div>
  );
};

export default UserDetailPage;
