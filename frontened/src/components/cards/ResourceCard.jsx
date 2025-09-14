import React from "react";

const ResourceCard = ({ resource }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-green-700">
        {resource.resourceName}
      </h3>
      <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
      <div className="mt-3 text-sm text-gray-500">
        <p>🏷 Type: {resource.resourceType}</p>
        <p> Available: {resource.quantityAvailable}</p>
        <p> Rate: {resource.hourlyRate} / hour</p>
      </div>
      <div className="mt-4">
        <span
          className={`px-3 py-1 text-xs rounded-full ${
            resource.isAvailable
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {resource.isAvailable ? "Available" : "Unavailable"}
        </span>
      </div>
    </div>
  );
};

export default ResourceCard;
