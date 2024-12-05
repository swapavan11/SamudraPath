import React, { useState } from 'react';

const Header = ({ onSearch }) => {
  const [imo, setImo] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(imo);
  };

  return (
    <header className="bg-indigo-600 p-6 mb-6 rounded-lg shadow-md flex justify-between items-center">
      <h1 className="text-white text-2xl font-bold">Ship Health Dashboard</h1>
      <form onSubmit={handleSubmit} className="flex items-center">
        <input
          type="text"
          value={imo}
          onChange={(e) => setImo(e.target.value)}
          placeholder="Enter IMO number"
          className="p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white p-2 rounded-r-lg hover:bg-indigo-700 transition duration-200"
        >
          Search
        </button>
      </form>
    </header>
  );
};

export default Header;
