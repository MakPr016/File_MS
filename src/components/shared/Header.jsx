import React, { useState } from "react";
import { FaFolder, FaUserCircle, FaSearch, FaPlus, FaFileAlt, FaBars } from "react-icons/fa";

const Header = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="flex items-center justify-between w-full px-4 py-2">
      {/* Left Side - Sidebar Toggle & Title */}
      <div className="flex items-center gap-3 text-lg font-semibold">
        <FaBars className="text-blue-500 cursor-pointer lg:hidden" onClick={toggleSidebar} />
        <span className="hidden md:inline text-blue-500"><FaFolder /></span> {/* 🔹 Folder Icon Hidden on Small Screens */}
        <span>All Folders</span> {/* ✅ Title always visible */}
      </div>

      {/* Search Bar - Hidden on Small Screens */}
      <div className={`flex-1 mx-4 ${showSearch ? "block" : "hidden sm:block"}`}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            placeholder="Search files..."
            className="w-full px-10 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />
        </div>
      </div>

      {/* Right Side - Actions & User */}
      <div className="flex items-center gap-3">
        {/* Search Icon for Small Screens */}
        <button className="block sm:hidden" onClick={() => setShowSearch(!showSearch)}>
          <FaSearch className="text-blue-500 text-lg" />
        </button>

        {/* Add Folder Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 md:w-auto md:px-4 md:py-2 md:gap-2">
          <FaPlus />
          <span className="hidden md:inline">Add Folder</span>
        </button>

        {/* Add File Button */}
        <button className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 md:w-auto md:px-4 md:py-2 md:gap-2">
          <FaFileAlt />
          <span className="hidden md:inline">Add File</span>
        </button>

        {/* User Icon */}
        <div className="flex items-center gap-2">
          <FaUserCircle className="text-blue-500 text-3xl" />
        </div>
      </div>
    </header>
  );
};

export default Header;
