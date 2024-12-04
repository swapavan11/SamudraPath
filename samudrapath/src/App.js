import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";  
import ShipHealth from "./Pages/ShipHealth";
import HomePage from "./Pages/HomePage";

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
