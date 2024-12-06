import React, { useState, useEffect } from "react";
import Navbar from "../components/Homepage/Navbar";
import Sidebar from "../components/Homepage/Sidebar";
import MapView from "../components/Homepage/MapView";
import Papa from "papaparse";
import * as turf from "@turf/turf"; // Import Turf for geometry operations
import { bezierSpline, bbox } from "@turf/turf";

const shipCategories = {
  "Cargo Ships": ["General Cargo Ship", "Refrigerated Cargo Ship", "Heavy Lift Cargo Ship"],
  Tankers: ["Crude Oil Tanker", "Product Tanker", "Chemical Tanker"],
  "Container Ships": ["Feeder Ship", "Panamax Ship", "Ultra Large Container Ship (ULCS)"],
  "Passenger Ships": ["Cruise Ship", "Ferries", "Yachts"],
  "Fishing Vessels": ["Trawler", "Longliner", "Seiner"],
  "Naval Ships": ["Aircraft Carrier", "Destroyer", "Frigate"],
  "Bulk Carriers": ["Handysize Bulk Carrier", "Panamax Bulk Carrier", "Capesize Bulk Carrier"],
  "Research Vessels": ["Oceanographic Research Vessel", "Marine Research Vessel"],
  "Offshore Vessels": [
    "Platform Supply Vessel (PSV)",
    "Anchor Handling Tug Supply Vessel (AHTS)",
    "Offshore Support Vessel (OSV)",
  ],
  Tugboats: ["Harbor Tug", "Ocean-going Tug"],
};

const HomePage = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [sourceCoordinates, setSourceCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [carriageWeight, setCarriageWeight] = useState("");
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [mapBounds, setMapBounds] = useState({
    longitude: 74.5,
    latitude: 10.5,
    zoom: 5,
  });

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setSelectedSubtype("");
  };

  const handleSubtypeChange = (event) => {
    setSelectedSubtype(event.target.value);
  };

  const handleMapClick = (event) => {
    const { lng, lat } = event.lngLat;

    if (!sourceCoordinates && !source) {
      setSourceCoordinates({ lat, lng });
      setSource(`${lat}, ${lng}`);
    } else if (!destinationCoordinates && !destination) {
      setDestinationCoordinates({ lat, lng });
      setDestination(`${lat}, ${lng}`);
    }
  };

  useEffect(() => {
    // Fetch and parse CSV file
    fetch("/path_safe.csv") // Adjust path as needed
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const coordinates = results.data.map((row) => [
              parseFloat(row.Longitude),
              parseFloat(row.Latitude),
            ]);

            const line = turf.lineString(coordinates);
            const smoothPath = bezierSpline(line, { resolution: 105000 });
            setRouteCoordinates(smoothPath.geometry.coordinates);

            const bounds = bbox(smoothPath);
            setMapBounds({
              longitude: (bounds[0] + bounds[2]) / 2,
              latitude: (bounds[1] + bounds[3]) / 2,
              zoom: 8,
            });
          },
        });
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="w-3/15">
          <Sidebar
            source={source}
            setSource={setSource}
            destination={destination}
            setDestination={setDestination}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedSubtype={selectedSubtype}
            setSelectedSubtype={setSelectedSubtype}
            departureDate={departureDate}
            setDepartureDate={setDepartureDate}
            departureTime={departureTime}
            setDepartureTime={setDepartureTime}
            shipCategories={shipCategories}
            carriageWeight={carriageWeight}
            setCarriageWeight={setCarriageWeight}
            handleCategoryChange={handleCategoryChange}
            handleSubtypeChange={handleSubtypeChange}
            setSourceCoordinates={setSourceCoordinates}
            setDestinationCoordinates={setDestinationCoordinates}
          />
        </div>
        <div className="flex-1 w-full h-full">
          <MapView
            handleMapClick={handleMapClick}
            routeCoordinates={routeCoordinates}
            mapBounds={mapBounds}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
