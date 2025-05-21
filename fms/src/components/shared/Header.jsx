import { useState, useEffect, useCallback } from "react";
import { FaFolder, FaSearch, FaPlus, FaFileAlt, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import debounce from "lodash.debounce";

const Header = ({ toggleSidebar }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState({ files: [], folders: [] });
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query) {
        setResults({ files: [], folders: [] });
        setShowResults(false);
        return;
      }

      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/search?q=${query}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setResults(res.data);
        setShowResults(true);
      } catch (error) {
        console.error("Search error:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    debouncedSearch(searchTerm);
  }, [searchTerm, debouncedSearch]);

  const handleResultClick = (type, item) => {
    navigate(`/${type}/${item._id}`);
    setShowResults(false);
    setSearchTerm("");
  };

  return (
    <header className="flex items-center justify-between w-full px-4 py-2 relative">
      <div className="flex items-center gap-3 text-lg font-semibold">
        <FaBars
          className="text-blue-500 cursor-pointer lg:hidden"
          size={24}
          onClick={toggleSidebar}
        />
        <span className="hidden md:inline text-blue-500">
          <FaFolder />
        </span>
        <span>
          File <span className="text-blue-500">MS</span>
        </span>
      </div>

      <div className={`flex-1 mx-4 ${showSearch ? "block" : "hidden sm:block"}`}>
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-500" />
          <input
            type="text"
            placeholder="Search files and folders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-10 py-2 bg-white rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
          />
          {showResults && (results.files.length > 0 || results.folders.length > 0) && (
            <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-60 overflow-y-auto shadow-lg">
              {results.folders.map((folder) => (
                <div
                  key={folder._id}
                  onClick={() => handleResultClick("folder", folder)}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FaFolder className="text-blue-600" />
                    <span>{folder.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs italic">
                    {folder.parentFolderName || "Root"}
                  </span>
                </div>
              ))}

              {/* Files */}
              {results.files.map((file) => (
                <div
                  key={file._id}
                  onClick={() => handleResultClick("file", file)}
                  className="flex justify-between items-center px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <div className="flex items-center gap-2">
                    <FaFileAlt className="text-blue-600" />
                    <span>{file.name}</span>
                  </div>
                  <span className="text-gray-400 text-xs italic">
                    {file.parentFolderName || "Root"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="block sm:hidden" onClick={() => setShowSearch(!showSearch)}>
          <FaSearch className="text-blue-500 text-lg" />
        </button>

        <button
          className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 md:w-auto md:px-4 md:py-2 md:gap-2"
          onClick={() => navigate("/new-folder")}
        >
          <FaPlus />
          <span className="hidden md:inline">Add Folder</span>
        </button>

        <button
          className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 md:w-auto md:px-4 md:py-2 md:gap-2"
          onClick={() => navigate("/new-file")}
        >
          <FaFileAlt />
          <span className="hidden md:inline">Add File</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
