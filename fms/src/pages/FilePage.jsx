import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const FilePage = () => {
  const { fileId } = useParams();
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const [loadingDownload, setLoadingDownload] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

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
            Authorization: `Bearer ${token}`,
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
  }, [fileId, backendUrl, token]);

  const handleDownload = async () => {
    setLoadingDownload(true);
    try {
      const response = await fetch(`${backendUrl}/api/files/${fileId}/download`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Download failed");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");

      const disposition = response.headers.get("Content-Disposition");
      const filenameMatch = disposition?.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
      const filename = filenameMatch ? filenameMatch[1].replace(/['"]/g, "") : file?.name || "downloaded-file";

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
      toast.success("Download started");
    } catch (error) {
      console.error("Error downloading file:", error.message);
      toast.error("Download failed");
    }
    setLoadingDownload(false);
  };

  if (error) return <div className="p-4 text-red-600">Error: {error}</div>;
  if (!file) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">File Details</h2>

      <div className="space-y-4 text-gray-700">
        <div>
          <span className="font-semibold">Name: </span>
          {file.name}
        </div>
        <div>
          <span className="font-semibold">Size: </span>
          {formatSize(file.size)}
        </div>
        <div>
          <span className="font-semibold">Description: </span>
          {file.description || <span className="italic text-gray-400">No description</span>}
        </div>
        <div>
          <span className="font-semibold">Owner: </span>
          {file.owner ? file.owner.name : "Unknown"}
        </div>
        <div>
          <span className="font-semibold">Shared With: </span>
          {file.sharedWith?.length > 0
            ? file.sharedWith.map((user) => user.name).join(", ")
            : <span className="italic text-gray-400">No one</span>}
        </div>
        <div>
          <span className="font-semibold">Parent Folder: </span>
          {file.parentFolder ? file.parentFolder.name : <span className="italic text-gray-400">No folder</span>}
        </div>
        <div>
          <span className="font-semibold">Password Protected: </span>
          {file.isPasswordProtected ? "Yes" : "No"}
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={loadingDownload}
        className={`mt-6 px-6 py-2 rounded-md font-semibold text-white ${
          loadingDownload ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {loadingDownload ? "Downloading..." : "Download File"}
      </button>
    </div>
  );
};

export default FilePage;
