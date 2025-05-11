import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const FilePage = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  // Function to format the size with commas
  const formatSize = (sizeInBytes) => {
    if (sizeInBytes >= 1024 * 1024) {
        return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
    } else if (sizeInBytes >= 1024) {
        return (sizeInBytes / 1024).toFixed(2) + " KB";
    } else {
    return sizeInBytes + " bytes";
    }
  };

  useEffect(() => {
    const fetchFileDetails = async () => {
      try {
        const response = await fetch(`${backendUrl}/api/files/${fileId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
        });
        
        if (!response.ok) {
          throw new Error("Failed to fetch file details");
        }

        const data = await response.json();
        setFile(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching file details:", err);
      }
    };

    fetchFileDetails();
  }, [fileId]);

  if (error) return <div>Error: {error}</div>;
  if (!file) return <div>Loading...</div>;

  return (
    <div className="file-page">
      <h2>File Details</h2>
      <p><strong>Name:</strong> {file.name}</p>
      <p><strong>Size:</strong> {formatSize(file.size)}</p>
      <p><strong>Description:</strong> {file.description || "No description"}</p>
      <p><strong>Owner:</strong> {file.owner ? file.owner.name : "Unknown"}</p>
      <p><strong>Shared With:</strong> {file.sharedWith.map(user => user.name).join(", ") || "No one"}</p>
      <p><strong>Parent Folder:</strong> {file.parentFolder ? file.parentFolder.name : "No folder"}</p>
      <p><strong>Password Protected:</strong> {file.isPasswordProtected ? "Yes" : "No"}</p>
    </div>
  );
};

export default FilePage;
