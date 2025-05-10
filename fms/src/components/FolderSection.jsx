import React from "react";
import Folder from "./Folder";
import FolderProtected from "./FolderProtected";

const FolderSection = ({ folderName = "My Folders", folders = [] }) => {
  // Function to format the size in MB
  const formatSizeInMB = (bytes) => {
    const sizeInMB = bytes / (1024 * 1024); // Convert bytes to MB
    return `${sizeInMB.toFixed(2)} MB`; // Limit to two decimal places
  };

  return (
    <section className="bg-blue-100 p-6 rounded-lg w-full">
      {/* Section Header */}
      <h1 className="text-lg font-semibold mb-2">{folderName}</h1>
      <hr className="border-blue-300 mb-4" />

      {/* Grid Layout (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {folders.length === 0 ? (
          <p>No files or folders in this section</p>
        ) : (
          folders.map((folder) => {
            // Convert the size to MB before passing to the Folder component
            const formattedSize = formatSizeInMB(folder.size);

            return folder.isPasswordProtected ? (
              <FolderProtected
                key={folder._id}
                name={folder.name}
                fileCount={folder.fileCount}
                size={formattedSize}
                className="w-full"
              />
            ) : (
              <Folder
                key={folder._id}
                name={folder.name}
                fileCount={folder.fileCount}
                size={formattedSize}
                className="w-full"
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default FolderSection;
