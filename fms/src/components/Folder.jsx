import { useState, useRef, useEffect } from "react";
import { MoreVertical } from "lucide-react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";

const Folder = ({ name, fileCount, folderId, size, onDelete, onRename, onShare }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex flex-col gap-3 w-full h-full relative">
      <div className="flex justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <FaFolder className="text-2xl" />
        </div>
        <div className="relative" ref={menuRef}>
          <MoreVertical
            className="text-gray-500 cursor-pointer"
            onClick={() => setShowMenu((prev) => !prev)}
          />
          {showMenu && (
            <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-10">
              <button
                onClick={() => {
                  setShowMenu(false);
                  onDelete?.();
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Delete
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onRename?.();
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Rename
              </button>
              <button
                onClick={() => {
                  setShowMenu(false);
                  onShare?.();
                }}
                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100"
              >
                Share
              </button>
            </div>
          )}
        </div>
      </div>

      <Link to={`/folder/${folderId}`} key={folderId}>
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      </Link>

      <div className="text-sm text-gray-500 flex gap-2">
        <span>{fileCount} Files</span>
        <span>|</span>
        <span>{(size / (1024 * 1024)).toFixed(2)} MB</span>
      </div>
    </div>
  );
};

export default Folder;
