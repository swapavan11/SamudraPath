import React, { useState } from "react"; 
import Navbar from "../components/Homepage/Navbar";
import Sidebar from "../components/Homepage/Sidebar";
import MapView from "../components/Homepage/MapView";

const routeCoordinates = [
    [72.8502, 18.9601],
    [73.28888888888889, 15.777777777777786],
    [74.95555555555555, 11.866666666666674],
    [74.97777777777779, 11.844444444444449],
    [76.2, 9.044444444444451],
    [76.22222222222223, 9.022222222222226],
    [76.33333333333334, 8.733333333333334],
    [76.6888888888889, 8.288888888888891],
    [76.77777777777777, 8.177777777777777],
    [78.97777777777779, 6.0],
    [79.8464, 6.9404],
  ];
  
  const shipCategories = {
    "Cargo Ships": [
      "General Cargo Ship",
      "Refrigerated Cargo Ship",
      "Heavy Lift Cargo Ship",
    ],
    Tankers: ["Crude Oil Tanker", "Product Tanker", "Chemical Tanker"],
    "Container Ships": [
      "Feeder Ship",
      "Panamax Ship",
      "Ultra Large Container Ship (ULCS)",
    ],
    "Passenger Ships": ["Cruise Ship", "Ferries", "Yachts"],
    "Fishing Vessels": ["Trawler", "Longliner", "Seiner"],
    "Naval Ships": ["Aircraft Carrier", "Destroyer", "Frigate"],
    "Bulk Carriers": [
      "Handysize Bulk Carrier",
      "Panamax Bulk Carrier",
      "Capesize Bulk Carrier",
    ],
    "Research Vessels": [
      "Oceanographic Research Vessel",
      "Marine Research Vessel",
    ],
    "Offshore Vessels": [
      "Platform Supply Vessel (PSV)",
      "Anchor Handling Tug Supply Vessel (AHTS)",
      "Offshore Support Vessel (OSV)",
    ],
    Tugboats: ["Harbor Tug", "Ocean-going Tug"],
  };



  
const HomePage =()=>{
    const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [departureTime, setDepartureTime] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubtype, setSelectedSubtype] = useState("");
  const [sourceCoordinates, setSourceCoordinates] = useState(null);
  const [destinationCoordinates, setDestinationCoordinates] = useState(null);
  const [carriageWeight, setCarriageWeight] = useState(""); 

  

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
      // Assign map click to source if it's empty
      setSourceCoordinates({ lat, lng });
      setSource(`${lat}, ${lng}`);
    } else if (!destinationCoordinates && !destination) {
      // Assign map click to destination if it's empty
      setDestinationCoordinates({ lat, lng });
      setDestination(`${lat}, ${lng}`);
    }
  };
  
  

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
        setSourceCoordinates={setSourceCoordinates} // Pass setSourceCoordinates
  setDestinationCoordinates={setDestinationCoordinates}
      />
    </div>
    <div className="flex-1 w-full h-full">
      <MapView handleMapClick={handleMapClick} routeCoordinates={routeCoordinates} />
    </div>
  </div>

  </div>

  );
}

export default HomePage;