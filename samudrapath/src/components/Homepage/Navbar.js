import React from "react";
import { FaAnchor, FaRoute, FaHeartbeat } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-teal-600 p-4 shadow-md flex justify-between items-center">
      <div className="flex items-center gap-4">
        <h1 className="text-white text-xl font-bold flex items-center gap-2">
          <FaAnchor /> SamudraPath
        </h1>
      </div>
      <div className="flex gap-4">
        <button className="bg-white text-teal-600 px-4 py-2 rounded-md shadow hover:bg-teal-400 hover:text-black transition">
          <FaRoute className="inline mr-2" /> Optimal Route
        </button>
        <Link to="/shiphealth">
        <button className="bg-white text-teal-600 px-4 py-2 rounded-md shadow hover:bg-teal-400 hover:text-black transition">
          <FaHeartbeat className="inline mr-2" /> Health Checkup
        </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

