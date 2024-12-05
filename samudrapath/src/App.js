import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { FaAnchor, FaMapMarkerAlt, FaMapPin, FaCalendarAlt, FaClock, FaRoute, FaSearch, FaShip } from "react-icons/fa";
import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Papa from "papaparse";
import * as turf from "@turf/turf"; // Import Turf for geometry operations
import { bezierSpline, bbox } from "@turf/turf";
import ShipHealth from "./Pages/ShipHealth";
import HomePage from "./Pages/HomePage";

const MainLayout = () => {
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState({
    longitude: 74.5,
    latitude: 10.5,
    zoom: 5,
  });

  useEffect(() => {
    // Fetch and parse CSV file
    fetch("/path_safe.csv")  // Adjust path as needed
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const coordinates = results.data.map((row) => ({
              latitude: parseFloat(row.Latitude),
              longitude: parseFloat(row.Longitude),
            }));

            // Convert coordinates to GeoJSON LineString
            const line = turf.lineString(
              coordinates.map((point) => [point.longitude, point.latitude])
            );

            // Smooth the path using Turf's bezierSpline
            const smoothPath = bezierSpline(line, { resolution: 105000 });

            // Convert the smoothed path back to coordinates
            const smoothCoordinates = smoothPath.geometry.coordinates.map((coord) => ({
              latitude: coord[1],
              longitude: coord[0],
            }));

            // Calculate the bounding box of the route
            const bounds = bbox(smoothPath);

            // Set the smoothed coordinates and map bounds for full visibility
            setRouteCoordinates(smoothCoordinates);
            setMapBounds({
              longitude: (bounds[0] + bounds[2]) / 2,  // Center the map
              latitude: (bounds[1] + bounds[3]) / 2,
              zoom: 8,  // Adjust zoom level
            });
          },
        });
      });
  }, []);

  return (
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
            {routeCoordinates.length > 0 && (
              <Source
                id="route"
                type="geojson"
                data={{
                  type: "Feature",
                  geometry: {
                    type: "LineString",
                    coordinates: routeCoordinates.map((point) => [
                      point.longitude,  // Longitude first
                      point.latitude,   // Latitude second
                    ]),
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
            )}
          </Map>
        </div>
      </main>
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MainLayout />} />
      <Route path="/shiphealth" element={<ShipHealth />} />
    </Routes>
  </Router>
);

export default App;
