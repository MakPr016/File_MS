import React from "react";
import Folder from "./Folder";
import FolderProtected from "./FolderProtected";

const FolderSection = ({folderName="My Folders"}) => {
  return (
    <section className="bg-blue-100 p-6 rounded-lg w-full">
      {/* Section Header */}
      <h1 className="text-lg font-semibold mb-2">{folderName}</h1>
      <hr className="border-blue-300 mb-4" />

      {/* Grid Layout (Responsive) */}
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        <Folder className="w-full" />
        <FolderProtected className="w-full" />
        <FolderProtected className="w-full" />
      </div>
    </section>
  );
};

export default FolderSection;
