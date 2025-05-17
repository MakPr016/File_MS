import { useEffect, useRef, useState } from "react";
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem("authToken"); 
    if (token) {
      setIsAuthenticated(true);
    }

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

  const handleItemClick = (action) => {
    action();
    if (isOpen) toggleSidebar();
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken"); 
    setIsAuthenticated(false);
    navigate("/login"); 
    if (isOpen) toggleSidebar();
  };

  const handleLogin = () => {
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
      <div className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-gray-800">File <span className="text-blue-500">MS</span></h1>
        <button className="lg:hidden text-gray-700" onClick={toggleSidebar}>
          ✖
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-2">
          <SidebarItem
            icon={<FaHome />}
            text="Home"
            onClick={() => handleItemClick(() => navigate("/home"))}
            active={window.location.pathname === "/home"}
          />
          <SidebarItem
            icon={<FaPlus />}
            text="New Folder"
            onClick={() => handleItemClick(() => navigate("/new-folder"))}
            active={window.location.pathname === "/new-folder"}
          />
          <SidebarItem
            icon={<FaFileAlt />}
            text="New File"
            onClick={() => handleItemClick(() => navigate("/new-file"))}
            active={window.location.pathname === "/new-file"}
          />
          <SidebarItem
            icon={<FaUser />}
            text="My Account"
            onClick={() => handleItemClick(() => navigate("/account"))}
            active={window.location.pathname === "/account"}
          />
        </ul>
      </div>

      <div className="p-4">
        {isAuthenticated ? (
          <SidebarItem
            icon={<FaSignOutAlt />}
            text="Logout"
            isLogout
            onClick={handleLogout}
          />
        ) : (
          <SidebarItem
            icon={<FaUser />}
            text="Login"
            onClick={handleLogin} 
          />
        )}
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
