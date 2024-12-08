import React from "react";

const ShipDetails = ({ details, riskLevel }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-300">
      <h3 className="text-3xl font-semibold text-indigo-600 mb-6 border-b-2 border-indigo-500 pb-2">
        Ship Details
      </h3>
      <div className="space-y-4">
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Name:</strong> {details.name}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">IMO:</strong> {details.imo}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">MMSI:</strong> {details.mmsi}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Latitude:</strong> {details.latitude}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Longitude:</strong> {details.longitude}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Speed (knots):</strong> {details.speed}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Heading (degrees):</strong> {details.heading}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Position Timestamp:</strong> {new Date(details.positionTime).toLocaleString()}
        </p>
        
        {/* Display risk level if available */}
        {riskLevel && (
          <p className="text-lg text-gray-800">
            <strong className="font-medium text-indigo-600">Risk Level:</strong> {riskLevel}
          </p>
        )}
      </div>
    </div>
  );
};

export default ShipDetails;
