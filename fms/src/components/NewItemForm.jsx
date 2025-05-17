import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const NewItemForm = ({ itemType }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("Root");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [folders, setFolders] = useState([]);

  const navigate = useNavigate();
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setFolders(data);
        } else {
          console.error("Failed to fetch folders:", data.message);
        }
      } catch (err) {
        console.error("Error fetching folders:", err);
      }
    };

    fetchFolders();
  }, []);

  const handleSave = async () => {
    try {
      if (itemType === "file") {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("name", name);
        formData.append("description", description);
        formData.append("parentFolder", isValidObjectId(location) ? location : "");

        const response = await fetch(`${backendUrl}/api/files/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("File uploaded successfully!");
          navigate(-1);
        } else {
          toast.error("File upload failed!");
          console.error(data);
        }
      } else {
        const body = {
          name,
          parentFolder: isValidObjectId(location) ? location : null,
          isPasswordProtected: isProtected,
          password: isProtected ? password : null,
        };

        const response = await fetch(`${backendUrl}/api/folders/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const data = await response.json();
        if (response.ok) {
          toast.success("Folder created successfully!");
          navigate(-1);
        } else {
          toast.error("Folder creation failed!");
          console.error(data);
        }
      }

    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h2 className="text-xl font-semibold mb-4">
        {itemType === "file" ? "Upload File" : "Create New Folder"}
      </h2>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {itemType === "file" ? "File Name *" : "Folder Name *"}
          </label>
          <input
            type="text"
            placeholder={`Enter ${itemType === "file" ? "file name" : "folder name"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg"
          />
        </div>

        {itemType === "file" && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">
              Upload File *
            </label>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center bg-white hover:border-blue-400 transition-colors">
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <svg
                  className="w-8 h-8 text-gray-400 mb-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="text-gray-600 text-sm text-center">
                  {file ? (
                    <>
                      <span className="font-medium text-green-600 block">{file.name}</span>
                      <span className="text-blue-500 underline">Choose another file</span>
                    </>
                  ) : (
                    <>
                      Drag & Drop your files or <span className="text-blue-500">Browse</span>
                    </>
                  )}
                </span>
              </label>
            </div>
            <p className="text-sm text-gray-500 mt-2">
              Note: Max. 25 MB file size is allowed.
            </p>
          </div>
        )}


        {/* Description */}
        {itemType === "file" && (
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">File Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter file description..."
              className="w-full p-2.5 border border-gray-300 rounded-lg resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Folder location */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg"
          >
            <option value="Root">Root</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        {/* Password protection for folders */}
        {itemType === "folder" && (
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isProtected}
                onChange={() => setIsProtected(!isProtected)}
              />
              <span>Add Password Protection</span>
            </label>
            {isProtected && (
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 w-full p-2.5 border border-gray-300 rounded-lg"
              />
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {itemType === "file" ? "Upload File" : "Create Folder"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewItemForm;
