import React, { useState } from "react";
import Header from "../components/Shiphealth/Header";
import ShipDetails from "../components/Shiphealth/ShipDetails";
import HealthBarometer from "../components/Shiphealth/HealthBarometer";
import LastMaintenanceHistory from "../components/Shiphealth/LastMaintenanceHistory";

// const ShipHealth = () => {
//   const [shipData, setShipData] = useState(null);

//   const handleSearch = (imo) => {
//     // Mock Data for now
//     setShipData({
//       details: {
//         imoNumber: "IMO 9754929",
//         name: "Ever Golden",
//         type: "Container Ship (commercial cargo)",
//         flag: "Panama",
//         owner: "Evergreen Marine Corp.",
//         yearBuilt: 2018,
//         dimensions: {
//           length: 400,
//           beam: 58.8,
//           depth: 32.9,
//           draught: 16,
//         },
//         capacity: {
//           teu: "20,150 TEU",
//           grossTonnage: 217612,
//           dwt: 218000,
//         },
//         engine: {
//           type: "MAN B&W Engine (two-stroke diesel)",
//           serviceSpeed: 22.5,
//           maxSpeed: 24,
//         },
//       },
//       riskLevel: 10,
//       assistance: {
//         latitude: "28.0330° N",
//         longitude: "125.5654° E",
//         city: "Taiwan",
//         port: "Taiwan International Port",
//         nearbyShip: "Evergreen fleet 2",
//         militaryShip: "INS Vikramaditya",
//       },
//     });
//   };

//   return (
//     <div className="p-8">
//       <Header onSearch={handleSearch} />
//       {shipData && (
//         <>
//           <ShipDetails details={shipData.details} />
//           <HealthBarometer riskLevel={shipData.riskLevel} />
//           <LastMaintenanceHistory />
//         </>
//       )}
//     </div>
//   );
// };

// export default ShipHealth;


// import React, { useState } from "react";
// import Header from "../Components/Shiphealth/Header";
// import ShipDetails from "../Components/Shiphealth/ShipDetails";
// import HealthBarometer from "../Components/Shiphealth/HealthBarometer";
// import LastMaintenanceHistory from "../Components/Shiphealth/LastMaintenanceHistory";
 
 

const ShipHealth = () => {
  const [shipData, setShipData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Added loading state

  const fetchShipDetails = async (imo) => {
    const options = {
      method: 'GET',
      headers: {
        Authorization: '88f1VhNUindHAbwmYSJZgmCp', // Your API key here
      },
    };

    setLoading(true); // Start loading
    setError(null);   // Clear previous errors
    setShipData(null); // Clear previous data

    try {
      const response = await fetch('https://cors-anywhere.herokuapp.com/https://api.terminal49.com/v2/vessels/9839143', options);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Ship Data:', data); // Log the response data to verify

      if (!data.data || !data.data.attributes) {
        throw new Error('No valid ship data returned');
      }

      const details = {
        name: data.data.attributes.name,
        imo: data.data.attributes.imo,
        mmsi: data.data.attributes.mmsi,
        latitude: data.data.attributes.latitude,
        longitude: data.data.attributes.longitude,
        speed: data.data.attributes.nautical_speed_knots,
        heading: data.data.attributes.navigational_heading_degrees,
        positionTime: data.data.attributes.position_timestamp,
      };

      // Mock risk level logic based on speed
      // const riskLevel = details.speed > 15 ? 'High' : 'Low';
      const riskLevel =6;

      setShipData({ details, riskLevel });
      // setShipData({ details,6 });
    } catch (err) {
      console.error('Error:', err); // Log the error for debugging
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="p-8">
      <Header onSearch={fetchShipDetails} />

      {loading && <p className="text-indigo-600 mt-4">Loading ship details...</p>}

      {error && <p className="text-red-500 mt-4">Error: {error}</p>}

      {shipData && (
        <>
          <ShipDetails details={shipData.details} />
          {/* <HealthBarometer   /> */}
          <HealthBarometer riskLevel={shipData.riskLevel} />
          <LastMaintenanceHistory />
        </>
      )}

      {!loading && !shipData && !error && (
        <p className="text-gray-500 mt-4">Enter an IMO number to view ship details.</p>
      )}
    </div>
  );
};

export default ShipHealth;

