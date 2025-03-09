import React from "react";
import {
  FaFolder,
  FaUser,
  FaSignOutAlt,
  FaPlus,
  FaThLarge,
  FaFileAlt,
} from "react-icons/fa";

const Sidebar = ({ isOpen, toggleSidebar }) => {
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
          <SidebarItem icon={<FaThLarge />} text="Dashboard" active />
          <SidebarItem icon={<FaPlus />} text="New Folder" />
          <SidebarItem icon={<FaFileAlt />} text="New File" />
          <SidebarItem icon={<FaFolder />} text="My Folders" />
          <SidebarItem icon={<FaUser />} text="My Account" />
        </ul>
      </div>

      {/* Logout Button (Pinned at Bottom) */}
      <div className="p-4">
        <SidebarItem icon={<FaSignOutAlt />} text="Logout" isLogout />
      </div>
    </nav>
  );
};

// Sidebar Item Component
const SidebarItem = ({ icon, text, active, isLogout }) => {
  return (
    <li
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