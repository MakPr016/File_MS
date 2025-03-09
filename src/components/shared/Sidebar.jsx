import React from "react";
import {
  FaFolder,
  FaUser,
  FaSignOutAlt,
  FaPlus,
  FaThLarge,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Sidebar = ({ isOpen, toggleSidebar, openNewItemModal }) => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic (e.g., clear tokens, redirect to login)
    console.log("User logged out");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav
      className={`z-10 fixed w-64 h-screen bg-white shadow-md flex flex-col transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">Files</h1>
        <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
          ✖
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          {/* Dashboard */}
          <SidebarItem
            icon={<FaThLarge />}
            text="Dashboard"
            onClick={() => navigate("/")} // Navigate to homepage
            active={window.location.pathname === "/"} // Highlight active route
          />

          {/* New Folder */}
          <SidebarItem
            icon={<FaPlus />}
            text="New Folder"
            onClick={() => openNewItemModal("folder")} // Open modal for folder
          />

          {/* New File */}
          <SidebarItem
            icon={<FaFileAlt />}
            text="New File"
            onClick={() => openNewItemModal("file")} // Open modal for file
          />

          {/* My Folders */}
          <SidebarItem
            icon={<FaFolder />}
            text="My Folders"
            onClick={() => navigate("/folders")} // Navigate to My Folders
            active={window.location.pathname === "/folders"} // Highlight active route
          />

          {/* My Account */}
          <SidebarItem
            icon={<FaUser />}
            text="My Account"
            onClick={() => navigate("/account")} // Navigate to My Account
            active={window.location.pathname === "/account"} // Highlight active route
          />
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <SidebarItem
          icon={<FaSignOutAlt />}
          text="Logout"
          isLogout
          onClick={handleLogout} // Handle logout
        />
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon, text, active, isLogout, onClick }) => {
  return (
    <li
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition ${
        active
          ? "bg-blue-100 text-blue-600"
          : "hover:bg-blue-50 text-gray-700"
      } ${isLogout ? "hover:bg-red-100 text-red-600" : ""}`}
    >
      {icon}
      <span className="text-lg">{text}</span>
    </li>
  );
};

export default Sidebar;