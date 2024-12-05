import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FaAnchor, FaMapMarkerAlt, FaMapPin, FaCalendarAlt, FaClock, FaRoute, FaSearch, FaShip } from "react-icons/fa";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import ShipHealth from "./ShipHealth";

// Sample routeCoordinates in JSON format with latitude and longitude
const routeCoordinates = [
  { latitude: 18.9601, longitude: 72.8502 },
  { latitude: 15.777777777777786, longitude: 73.28888888888889 },
  { latitude: 11.866666666666674, longitude: 74.95555555555555 },
  { latitude: 11.844444444444449, longitude: 74.97777777777779 },
  { latitude: 9.044444444444451, longitude: 76.2 },
  { latitude: 9.022222222222226, longitude: 76.22222222222223 },
  { latitude: 8.733333333333334, longitude: 76.33333333333334 },
  { latitude: 8.288888888888891, longitude: 76.6888888888889 },
  { latitude: 8.177777777777777, longitude: 76.77777777777777 },
  { latitude: 6.0, longitude: 78.97777777777779 },
  { latitude: 6.9404, longitude: 79.8464 }
];

const MainLayout = () => (
  <div className="flex h-screen">
    {/* Sidebar */}
    <aside className="w-1/4 bg-gradient-to-br from-gray-100 to-gray-200 p-5 shadow-lg flex flex-col gap-6">
      <h1 className="text-2xl font-bold text-teal-700 flex items-center gap-3">
        <FaAnchor /> SamudraPath
      </h1>

      {/* Form Inputs */}
      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FaMapMarkerAlt /> Source
        </label>
        <input
          type="text"
          placeholder="Enter source"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FaMapPin /> Destination
        </label>
        <input
          type="text"
          placeholder="Enter destination"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FaCalendarAlt /> Departure Date
        </label>
        <input
          type="date"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FaClock /> Departure Time
        </label>
        <input
          type="time"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <button className="flex items-center justify-center gap-2 p-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transform transition duration-300 hover:-translate-y-1">
        <FaRoute /> Find Routes
      </button>

      <div className="border-t my-4"></div>

      <div className="space-y-3">
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
          <FaShip /> IMO Number
        </label>
        <input
          type="text"
          placeholder="Search IMO number"
          className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      <button className="flex items-center justify-center gap-2 p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transform transition duration-300 hover:-translate-y-1">
        <FaSearch /> Search
      </button>
    </aside>

    {/* Main Content */}
    <main className="flex-1 flex flex-col items-center justify-center bg-gray-100 p-5">
      {/* Map */}
      <div className="w-full h-full">
        <Map
          initialViewState={{
            longitude: 74.5,
            latitude: 10.5,
            zoom: 5,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
          <Source
            id="route"
            type="geojson"
            data={{
              type: "Feature",
              geometry: {
                type: "LineString",
                coordinates: routeCoordinates.map(point => [point.longitude, point.latitude]),
              },
            }}
          >
            <Layer
              id="route-layer"
              type="line"
              paint={{
                "line-color": "#FF5733",
                "line-width": 4,
              }}
            />
          </Source>
        </Map>
      </div>
    </main>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/> }/>
        <Route path="/shiphealth" element={<ShipHealth />} />
      </Routes>
    </Router>
  );
};

export default App;
