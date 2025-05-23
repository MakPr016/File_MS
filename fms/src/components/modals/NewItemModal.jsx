import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import toast from 'react-hot-toast';

const NewItemModal = ({ isOpen, onClose, onSave, itemType }) => {
  const [name, setName] = useState("");
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState("Current Directory");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [isProtected, setIsProtected] = useState(false);
  const [folders, setFolders] = useState([]);
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFolders = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/folders`, {
          headers: {
            "Authorization": `Bearer ${token}`,
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

    if (!isOpen) {
      setName("");
      setFile(null);
      setLocation("Current Directory");
      setDescription("");
      setPassword("");
      setIsProtected(false);
      fetchFolders();
    }
  }, [isOpen]);

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
            "Authorization": `Bearer ${token}`,
          },
          body: formData,
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          console.log("File uploaded:");
          toast.success("File uploaded successfully!");
        } else {
          console.error("File upload failed:", data);
          toast.error("File upload failed!");
        }

      } else if (itemType === "folder") {
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
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(body),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Folder created:");
          toast.success("Folder created successfully!");
        } else {
          console.error("Folder creation failed:", data);
          toast.error("Folder creation failed!");
        }
      }

      onClose();
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={itemType === "file" ? "Upload File" : "New Folder"}
    >
      <div className="space-y-4">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            {itemType === "file" ? "File Name *" : "Folder Name *"}
          </label>
          <input
            type="text"
            placeholder={`Enter ${itemType === "file" ? "file name" : "folder name"}`}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
          />
        </div>

        {/* File Upload Section */}
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
              placeholder="Write file description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white h-24 resize-none"
            />
          </div>
        )}

        {/* Location Selector */}
        <div>
          <label className="block text-sm font-semibold mb-2 text-gray-700">Location</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
          >
            <option value="Root">Root</option>
            {folders.map((folder) => (
              <option key={folder._id} value={folder._id}>
                {folder.name}
              </option>
            ))}
          </select>
        </div>

        {/* Password Protection */}
        {itemType === "folder" && (
          <div className="space-y-2">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={isProtected}
                onChange={() => setIsProtected(!isProtected)}
                className="rounded text-blue-500 focus:ring-blue-400 h-4 w-4"
              />
              <span className="text-sm text-gray-700">Add Password Protection</span>
            </label>
            {isProtected && (
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 bg-white"
              />
            )}
            {isProtected && (
              <span className="inline-block ml-2 px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-md">
                Protected
              </span>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6 border-t border-gray-200 pt-6">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium shadow-sm"
          >
            {itemType === "file" ? "Upload" : "Create Folder"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewItemModal;
