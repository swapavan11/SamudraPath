import React, { useState } from "react";
import {
  FaMapMarkerAlt,
  FaMapPin,
  FaCalendarAlt,
  FaClock,
  FaRoute,
  FaSearch,
  FaShip,
  FaWeightHanging,
  FaList,
  FaWeight,
} from "react-icons/fa";

const Sidebar = ({
  source,
  setSource,
  destination,
  setDestination,
  selectedCategory,
  setSelectedCategory,
  selectedSubtype,
  setSelectedSubtype,
  departureDate,
  setDepartureDate,
  departureTime,
  setDepartureTime,
  shipCategories,
  carriageWeight,
  setCarriageWeight,
  handleCategoryChange,
  handleSubtypeChange,
  setSourceCoordinates,
  setDestinationCoordinates,
}) => {
  const [activeTab, setActiveTab] = useState("details");
  const [safetyWeight, setSafetyWeight] = useState(0);
  const [fuelWeight, setFuelWeight] = useState(0);
  const [distanceWeight, setDistanceWeight] = useState(0);
  const [showCustomizedRoute, setShowCustomizedRoute] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const mockRoutes = [
    { id: 1, route: "Route A", description: "Source to Destination via Path A" },
    { id: 2, route: "Route B", description: "Source to Destination via Path B" },
    { id: 3, route: "Route C", description: "Source to Destination via Path C" },
  ];

  const handleWeightSubmit = () => {
    const totalWeight = parseFloat(safetyWeight) + parseFloat(fuelWeight) + parseFloat(distanceWeight);
    if (totalWeight === 1) {
      setShowCustomizedRoute(true);
      setErrorMessage(""); // Clear any previous error messages
    } else {
      setErrorMessage("The weights must add up to 1. Please adjust them.");
      setShowCustomizedRoute(false);
    }
  };

  return (
    <div className="flex h-screen" style={{ minWidth: "450px", maxWidth: "450px" }}>
      <nav className="w-1/6 bg-gray-600 text-white flex flex-col">
        <button
          className={`p-4 text-left hover:bg-teal-600 ${activeTab === "details" ? "bg-teal-700 drop-shadow-md" : ""}`}
          onClick={() => setActiveTab("details")}
        >
          <FaList /> Ship Details
        </button>
        <button
          className={`p-4 text-left hover:bg-teal-600 ${activeTab === "routes" ? "bg-teal-700" : ""}`}
          onClick={() => setActiveTab("routes")}
        >
          <FaRoute /> Ship Routes
        </button>
      </nav>

      <aside
        className="w-5/6 bg-gradient-to-br from-gray-100 to-gray-200 p-5 shadow-lg flex flex-col gap-4 transition-all overflow-y-auto"
        style={{
          maxHeight: "100vh", // To prevent it from growing beyond the screen height
          scrollbarWidth: "none", // For Firefox
        }}
      >
        <style>
          {`
            /* Hide scrollbar for Webkit browsers */
            ::-webkit-scrollbar {
              display: none;
            }
          `}
        </style>

        {activeTab === "details" && (
          <div className="space-y-4">
            {/* Source Input */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapMarkerAlt /> Source
              </label>
              <input
                type="text"
                placeholder="Enter source or click on map"
                value={source}
                onChange={(e) => {
                  setSource(e.target.value);
                  setSourceCoordinates(null);
                }}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
              />
            </div>

            {/* Destination Input */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaMapPin /> Destination
              </label>
              <input
                type="text"
                placeholder="Enter destination or click on map"
                value={destination}
                onChange={(e) => {
                  setDestination(e.target.value);
                  setDestinationCoordinates(null);
                }}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
              />
            </div>

            {/* Ship Category Dropdown */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Select Ship Category
              </label>
              <select
                className="w-full bg-white p-2 rounded-md shadow-md focus:outline-none h-9"
                value={selectedCategory}
                onChange={handleCategoryChange}
              >
                <option value="">-- Select Category --</option>
                {Object.keys(shipCategories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Ship Subcategory Dropdown */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                Select Ship Subcategory
              </label>
              <select
                className="w-full bg-white p-2 rounded-md shadow-md focus:outline-none h-9"
                value={selectedSubtype}
                onChange={handleSubtypeChange}
                disabled={!selectedCategory}
              >
                <option value="">-- Select Subcategory --</option>
                {selectedCategory &&
                  shipCategories[selectedCategory].map((subtype) => (
                    <option key={subtype} value={subtype}>
                      {subtype}
                    </option>
                  ))}
              </select>
            </div>

            {/* Carriage Weight */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FaWeightHanging /> Carriage Weight
              </label>
              <input
                type="number"
                placeholder="Enter Carriage Weight in kg"
                value={carriageWeight}
                onChange={(e) => setCarriageWeight(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
              />
            </div>

            {/* Departure Date and Time */}
            <div className="flex space-x-4">
              <div className="flex-1 space-y-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaCalendarAlt /> Departure Date
                </label>
                <input
                  type="date"
                  value={departureDate}
                  onChange={(e) => setDepartureDate(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
                />
              </div>
              <div className="flex-1 space-y-1">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <FaClock /> Departure Time
                </label>
                <input
                  type="time"
                  value={departureTime}
                  onChange={(e) => setDepartureTime(e.target.value)}
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
                />
              </div>
            </div>

            {/* Find Routes Button */}
            <button
              className="w-full flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transform transition duration-300 h-10"
              onClick={() => setActiveTab("routes")}
            >
              <FaRoute /> Find Optimized Routes
            </button>
          </div>
        )}

        {/* Routes Tab */}
        {activeTab === "routes" && (
          <div className="flex flex-col gap-4">
            <h2 className="text-xl font-semibold">Respective Optimized Routes</h2>
            {mockRoutes.map((route) => (
              <div
              key={route.id}
                className="p-4 bg-white rounded-md shadow-md hover:shadow-lg transition"
              >
                <h3 className="text-lg font-bold">{route.route}</h3>
                <p className="text-gray-700">{route.description}</p>
              </div>
            ))}

            {/* Weight Inputs for Customized Route */}
            <h2 className="text-xl font-semibold">Custom Weighted Route</h2>
            <h2 className="text-l font-semibold text-gray-800">Enter Weights for each</h2>
            <div className="space-y-4 mt-6">
          {/* Inputs in a horizontal flex */}
          <div className="flex space-x-4">
            {/* Safety Weight */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700">Safety </label>
              <input
                type="number"
                value={safetyWeight}
                onChange={(e) => setSafetyWeight(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
                step="0.01"
                min="0"
              />
            </div>

            {/* Fuel Weight */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700">Fuel </label>
              <input
                type="number"
                value={fuelWeight}
                onChange={(e) => setFuelWeight(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
                step="0.01"
                min="0"
              />
            </div>

            {/* Distance Weight */}
            <div className="flex-1">
              <label className="text-sm font-semibold text-gray-700">Distance </label>
              <input
                type="number"
                value={distanceWeight}
                onChange={(e) => setDistanceWeight(e.target.value)}
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
                step="0.01"
                min="0"
              />
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          {/* Submit Button */}
          <button
            className="w-full flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transform transition duration-300 h-10"
              onClick={handleWeightSubmit}
            >
              <FaWeight className="text-lg" />
              {/* <FaRoute className="text-lg" /> */}
              <span>Find Custom Weight Route</span>
            </button>

        </div>


            {/* Customized Weight Path */}
            {showCustomizedRoute && (
              <div className="mt-6 p-4 bg-teal-100 rounded-md shadow-md">
                <h3 className="text-lg font-bold">Customized Route Based on Weights</h3>
                <p>Safety Weight: {safetyWeight} kg</p>
                <p>Fuel Weight: {fuelWeight} kg</p>
                <p>Distance Weight: {distanceWeight} km</p>
                <p>Customized route details will appear here based on the input weights.</p>
              </div>
            )}
          </div>
        )}
      </aside>
    </div>
  );
};

export default Sidebar;
