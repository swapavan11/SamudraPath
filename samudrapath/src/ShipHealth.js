import React, { useState } from "react";
import Header from "./components/Header";
import ShipDetails from "./components/ShipDetails";
import HealthBarometer from "./components/HealthBarometer";
import LastMaintenanceHistory from "./components/LastMaintenanceHistory";

const ShipHealth = () => {
  const [shipData, setShipData] = useState(null);

  const handleSearch = (imo) => {
    // Mock Data for now
    setShipData({
      details: {
        imoNumber: "IMO 9754929",
        name: "Ever Golden",
        type: "Container Ship (commercial cargo)",
        flag: "Panama",
        owner: "Evergreen Marine Corp.",
        yearBuilt: 2018,
        dimensions: {
          length: 400,
          beam: 58.8,
          depth: 32.9,
          draught: 16,
        },
        capacity: {
          teu: "20,150 TEU",
          grossTonnage: 217612,
          dwt: 218000,
        },
        engine: {
          type: "MAN B&W Engine (two-stroke diesel)",
          serviceSpeed: 22.5,
          maxSpeed: 24,
        },
      },
      riskLevel: 10,
      assistance: {
        latitude: "28.0330° N",
        longitude: "125.5654° E",
        city: "Taiwan",
        port: "Taiwan International Port",
        nearbyShip: "Evergreen fleet 2",
        militaryShip: "INS Vikramaditya",
      },
    });
  };

  return (
    <div className="p-8">
      <Header onSearch={handleSearch} />
      {shipData && (
        <>
          <ShipDetails details={shipData.details} />
          <HealthBarometer riskLevel={shipData.riskLevel} />
          <LastMaintenanceHistory />
        </>
      )}
    </div>
  );
};

export default ShipHealth;
