import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import ShipHealth from "./Pages/ShipHealth";
import HomePage from "./Pages/HomePage";
import './style.css'; // Import the global CSS file

const App = () => {
  return (
    <div className="h-screen ">
    <Router>
      <Routes>
        <Route path="/" element={<HomePage/> }/>
        <Route path="/shiphealth" element={<ShipHealth />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;