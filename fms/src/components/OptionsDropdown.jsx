import { useEffect, useRef, useState } from "react";
import { MoreVertical } from "lucide-react";
import toast from "react-hot-toast";

const OptionsDropdown = ({ id, type, onAction }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const sendRequest = async (endpoint, action) => {
    try {
      const response = await fetch(`${backendUrl}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });

      const contentType = response.headers.get("content-type");
      const result = contentType?.includes("application/json")
        ? await response.json()
        : {};

      if (response.ok) {
        toast.success(`${action.charAt(0).toUpperCase() + action.slice(1)} successful`);
        console.log("[OptionsDropdown] Sending action:", { action, id, type });
        onAction(action, { id, type }); 
      } else {
        toast.error("Request failed");
        throw new Error(result?.message || "Request failed");
      }
    } catch (error) {
      console.error(`Error performing ${action}:`, error.message);
    }
  };

  const handleDelete = () => {
    setShowMenu(false);
    const endpoint =
      type === "file"
        ? `/api/files/delete/${id}?_method=DELETE`
        : `/api/folders/delete/${id}?_method=DELETE`;
    sendRequest(endpoint, "delete");
  };

  const handleRename = () => {
    setShowMenu(false);
    const endpoint =
      type === "file"
        ? `/api/files/${id}/rename`
        : `/api/folders/${id}/rename`;
    sendRequest(endpoint, "rename");
  };

  const handleShare = () => {
    setShowMenu(false);
    const endpoint =
      type === "file"
        ? `/api/files/${id}/share`
        : `/api/folders/${id}/share`;
    sendRequest(endpoint, "share");
  };

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="text-gray-500 cursor-pointer"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        <MoreVertical className="text-xl" />
      </div>
      {showMenu && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-10">
          <button
            onClick={handleDelete}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 hover:rounded-t-xl"
          >
            Delete
          </button>
          <button
            onClick={handleRename}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200"
          >
            Rename
          </button>
          <button
            onClick={handleShare}
            className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-200 hover:rounded-b-xl"
          >
            Share
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionsDropdown;