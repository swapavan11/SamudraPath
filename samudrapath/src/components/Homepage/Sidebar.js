import React from "react";
import {
  FaMapMarkerAlt,  FaMapPin,  FaCalendarAlt,  FaClock,  FaRoute,  FaSearch,  FaShip,  FaWeightHanging,
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

  return (
    <aside className="w-3/15 bg-gradient-to-br from-gray-100 to-gray-200 p-5 shadow-lg flex flex-col gap-4">
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
                setSource(e.target.value); // Allow manual input
                setSourceCoordinates(null); // Clear map selection if manually editing
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
                setDestination(e.target.value); // Allow manual input
                setDestinationCoordinates(null); // Clear map selection if manually editing
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


          <div className="flex space-x-4">
  {/* Departure Date */}
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

  {/* Departure Time */}
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
          <button className="flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transform transition duration-300  h-10"> 
            {/* hover:-translate-y-1 */}
            <FaRoute /> Find Routes
          </button>

          {/* IMO Number Search */}
          <div className="space-y-1">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <FaShip /> IMO Number
            </label>
            <input
              type="text"
              placeholder="Search IMO number"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 h-8"
            />
          </div>

          {/* Search Button */}
          <button className="flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transform transition duration-300  h-10">
            <FaSearch /> Search
          </button>
        </aside>
  );
};

export default Sidebar;
