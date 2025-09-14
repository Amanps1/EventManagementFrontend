import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserById, updateUserProfile } from "../../api/userApi";

const ProfilePage = () => {
  const { user: loggedInUser } = useAuth(); // get logged-in user
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const response = await getUserById(1); // Use hardcoded ID for now
      const userData = response.data?.data || response.data;
      setUser(userData);
      setFormData(userData);
    } catch (err) {
      console.error("Error fetching profile:", err);
      // Use mock data if API fails
      const mockUser = {
        id: 1,
        firstName: "Aman",
        lastName: "User",
        username: "aman",
        email: "aman@example.com",
        phoneNumber: "+1234567890",
        address: "123 Main St, City",
        emergencyContact: "Emergency Contact",
        role: "ADMIN"
      };
      setUser(mockUser);
      setFormData(mockUser);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      setEditMode(false);
      fetchProfile();
    } catch (err) {
      console.error("Error updating profile:", err);
      // Just update local state if API fails
      setUser(formData);
      setEditMode(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  if (!user) return <p className="p-6">Unable to load profile.</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-indigo-700 mb-4">My Profile</h1>

      <div className="space-y-4">
        {[
          "firstName",
          "lastName",
          "phoneNumber",
          "address",
          "emergencyContact",
        ].map((field) => (
          <div key={field} className="flex flex-col">
            <label className="font-medium capitalize">{field}</label>
            {editMode ? (
              <input
                type="text"
                value={formData[field] || ""}
                onChange={(e) =>
                  setFormData({ ...formData, [field]: e.target.value })
                }
                className="border p-2 rounded"
              />
            ) : (
              <p className="p-2 bg-gray-100 rounded">{user[field]}</p>
            )}
          </div>
        ))}

        {/* Non-editable fields */}
        <div className="flex flex-col">
          <label className="font-medium">Username</label>
          <p className="p-2 bg-gray-100 rounded">{user.username}</p>
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Email</label>
          <p className="p-2 bg-gray-100 rounded">{user.email}</p>
        </div>
      </div>

      <div className="mt-6 flex gap-3">
        {editMode ? (
          <>
            <button
              onClick={handleSave}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            onClick={() => setEditMode(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
