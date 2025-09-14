import React, { useState } from "react";

const ResourceManagementPage = () => {
  const [resources, setResources] = useState([
    { id: 1, name: "Projector", type: "Equipment", available: true },
    { id: 2, name: "Main Hall", type: "Venue", available: false },
    { id: 3, name: "Microphone", type: "Equipment", available: true },
  ]);

  const toggleAvailability = (id) => {
    setResources((prev) =>
      prev.map((res) =>
        res.id === id ? { ...res, available: !res.available } : res
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">
        Resource Management
      </h1>

      <div className="bg-white shadow rounded-lg p-6">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3">Resource</th>
              <th className="p-3">Type</th>
              <th className="p-3">Availability</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {resources.map((res) => (
              <tr key={res.id} className="border-t">
                <td className="p-3">{res.name}</td>
                <td className="p-3">{res.type}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-sm ${
                      res.available
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {res.available ? "Available" : "Unavailable"}
                  </span>
                </td>
                <td className="p-3">
                  <button
                    onClick={() => toggleAvailability(res.id)}
                    className="text-sm bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700"
                  >
                    Toggle
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResourceManagementPage;
