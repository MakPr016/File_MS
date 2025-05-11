import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Folder from "../components/Folder";
import FolderProtected from "../components/FolderProtected";
import File from "../components/File";

const FolderPage = () => {
  const { id } = useParams();
  const [folderData, setFolderData] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const res = await fetch(`${backendUrl}/api/folders/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch folder data");
        }
        const data = await res.json();
        setFolderData(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFolder();
  }, [id]);

  const formatSizeInMB = (bytes) => {
    if (typeof bytes !== "number" || isNaN(bytes)) return "0.00 MB";
    const sizeInMB = bytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)}`;
  };

  const handleAction = (action, result) => {
    console.log("Action:", action);

    if (action === "delete") {
      setFolderData((prevData) => {
      if (result.type === "folder") {
        const updatedFolders = prevData.folders.filter(f => 
          String(f._id) !== String(result.id)
        );
        return { ...prevData, folders: updatedFolders };
      }
      const updatedFiles = prevData.files.filter(f => 
        String(f._id) !== String(result.id)
      );
      return { ...prevData, files: updatedFiles };
    });
  }
    if (action === "rename") {
      setFolderData((prevData) => {
        const updatedFolders = prevData.folders.map((folder) =>
          folder._id === result.id ? { ...folder, name: result.name } : folder
        );
        const updatedFiles = prevData.files.map((file) =>
          file._id === result.id ? { ...file, name: result.name } : file
        );
        console.log("Updated Folders:", updatedFolders);
        console.log("Updated Files:", updatedFiles);
        return { ...prevData, folders: updatedFolders, files: updatedFiles };
      });
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!folderData) return <div>Folder not found</div>;

  return (
    <section className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-4">{folderData.name}</h1>

      <div className="mb-8">
        <h2 className="text-lg font-medium mb-2">Subfolders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {folderData.folders.length === 0 ? (
            <p>No subfolders</p>
          ) : (
            folderData.folders.map((folder) =>
              folder.isPasswordProtected ? (
                <FolderProtected
                  key={folder._id}
                  name={folder.name}
                  fileCount={folder.fileCount}
                  size={formatSizeInMB(folder.size)}
                  folderId={folder._id}
                  onAction={handleAction}
                />
              ) : (
                <Folder
                  key={folder._id}
                  name={folder.name}
                  fileCount={folder.fileCount}
                  size={formatSizeInMB(folder.size)}
                  folderId={folder._id}
                  onAction={handleAction}
                />
              )
            )
          )}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Files</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {folderData.files.length === 0 ? (
            <p>No files</p>
          ) : (
            folderData.files.map((file) => (
              <File
                key={file._id}
                fileId={file._id}
                name={file.name}
                type={file.type}
                size={file.size}
                onAction={handleAction}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default FolderPage;
