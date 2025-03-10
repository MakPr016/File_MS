import React, { useEffect, useRef } from "react";
import {
  FaFolder,
  FaUser,
  FaSignOutAlt,
  FaPlus,
  FaHome,
  FaFileAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar, openNewItemModal }) => {
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        toggleSidebar();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, toggleSidebar]);

  // mobile only 
  const handleItemClick = (action) => {
    action();
    if (isOpen) toggleSidebar();
  };

  // Logout handler
  const handleLogout = () => {
    navigate("/login");
    if (isOpen) toggleSidebar();
  };

  return (
    <nav
      ref={sidebarRef}
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
          <SidebarItem
            icon={<FaHome />}
            text="Home"
            onClick={() => handleItemClick(() => navigate("/"))}
            active={window.location.pathname === "/"}
          />
          <SidebarItem
            icon={<FaPlus />}
            text="New Folder"
            onClick={() => handleItemClick(() => openNewItemModal("folder"))}
          />
          <SidebarItem
            icon={<FaFileAlt />}
            text="New File"
            onClick={() => handleItemClick(() => openNewItemModal("file"))}
          />
          <SidebarItem
            icon={<FaFolder />}
            text="My Folders"
            onClick={() => handleItemClick(() => navigate("/folders"))}
            active={window.location.pathname === "/folders"}
          />
          <SidebarItem
            icon={<FaUser />}
            text="My Account"
            onClick={() => handleItemClick(() => navigate("/account"))}
            active={window.location.pathname === "/account"}
          />
        </ul>
      </div>

      {/* Logout Button */}
      <div className="p-4">
        <SidebarItem
          icon={<FaSignOutAlt />}
          text="Logout"
          isLogout
          onClick={handleLogout}
        />
      </div>
    </nav>
  );
};

const SidebarItem = ({ icon, text, active, isLogout, onClick }) => (
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

export default Sidebar;