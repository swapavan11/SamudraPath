import React from 'react';

const ShipDetails = ({ details }) => {
  return (
    <div className="bg-white shadow-lg rounded-xl p-8 mb-8 border border-gray-300">
      <h3 className="text-3xl font-semibold text-indigo-600 mb-6 border-b-2 border-indigo-500 pb-2">Ship Details</h3>
      <div className="space-y-4">
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Name:</strong> {details.name}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Type:</strong> {details.type}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Flag:</strong> {details.flag}
        </p>
        <p className="text-lg text-gray-800">
          <strong className="font-medium text-indigo-600">Year Built:</strong> {details.yearBuilt}
        </p>
      </div>
    </div>
  );
};

export default ShipDetails;
