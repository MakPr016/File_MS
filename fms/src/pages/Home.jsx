import React, { useEffect, useState } from "react";
import FolderSection from "../components/FolderSection";
import toast from "react-hot-toast";

const Home = () => {
  const [ownedFolders, setOwnedFolders] = useState([]);
  const [sharedFolders, setSharedFolders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFolders = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("authToken");

        const ownedRes = await fetch(`${backendUrl}/api/folders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!ownedRes.ok) throw new Error("Failed to fetch your folders");
        const ownedData = await ownedRes.json();

        const sharedRes = await fetch(`${backendUrl}/api/folders/shared`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!sharedRes.ok) throw new Error("Failed to fetch shared folders");
        const sharedData = await sharedRes.json();

        setOwnedFolders(ownedData);
        setSharedFolders(sharedData);
      } catch (err) {
        setError(err.message);
        toast.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFolders();
  }, []);

  if (loading) return <p>Loading folders...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const recentFolders = ownedFolders.filter((folder) => folder.isRecent);

  return (
    <div className="space-y-6">
      <FolderSection folderName="Recent" folders={recentFolders} />
      <FolderSection folderName="My Folders" folders={ownedFolders} />
      <FolderSection folderName="Shared With Me" folders={sharedFolders} />
    </div>
  );
};

export default Home;
