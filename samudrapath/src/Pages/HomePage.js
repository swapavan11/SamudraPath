import React, { useState, useEffect } from "react";
import Navbar from "../components/Homepage/Navbar";
import Sidebar from "../components/Homepage/Sidebar";
import MapView from "../components/Homepage/MapView";
import Papa from "papaparse";

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
  const [pirateCoordinates, setPirateCoordinates] = useState([]);
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
    fetch("/filtered_coordinates.csv") // Adjust path as needed
      .then((response) => response.text())
      .then((data) => {
        Papa.parse(data, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            const coordinates = results.data.map((row) => [
              parseFloat(row.longitude),
              parseFloat(row.latitude),
            ]);

            setPirateCoordinates(coordinates);
          },
        });
      });

    // Fetch and parse CSV file
    fetch("/path_safe_smoothed.csv") // Adjust path as needed
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

            setRouteCoordinates((prevRoutes) => [
              ...prevRoutes,
              { coordinates, color:"#00ff00" }
            ]);
          },
        });
      });
    fetch("/path_fuel_smoothed.csv") // Adjust path as needed
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
            setRouteCoordinates((prevRoutes) => [
              ...prevRoutes,
              { coordinates, color: "#0000FF" }
            ]);
          },
        });
      });
    fetch("/path_short_smoothed.csv") // Adjust path as needed
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
            setRouteCoordinates((prevRoutes) => [
              ...prevRoutes,
              { coordinates, color: "#FFA500" }
            ]);
          },
        });
      });
    fetch("/path_weighted_smoothed.csv") // Adjust path as needed
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
            setRouteCoordinates((prevRoutes) => [
              ...prevRoutes,
              { coordinates, color: "#00FFFF" }
            ]);
          },
        });
      });
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex flex-row flex-grow overflow-hidden">
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
          routes={routeCoordinates}
        />
        <MapView
          handleMapClick={handleMapClick}
          routes={routeCoordinates}
          mapBounds={mapBounds}
          pirateCoordinates={pirateCoordinates}
        />
        </div>
      </div>
  );
};

export default HomePage;
