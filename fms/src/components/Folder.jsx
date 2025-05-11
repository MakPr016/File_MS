import { useState, useRef, useEffect } from "react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";
import OptionsDropdown from "./OptionsDropdown";

const Folder = ({ name, fileCount, folderId, size, onAction}) => {
  return (
    <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex flex-col gap-3 w-full h-full relative">
      <div className="flex justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <FaFolder className="text-2xl" />
        </div>

        <OptionsDropdown id={folderId} type="folder" onAction={onAction} />
      </div>

      <Link to={`/folder/${folderId}`} key={folderId}>
        <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      </Link>

      <div className="text-sm text-gray-500 flex gap-2">
        <span>{fileCount} Files</span>
        <span>|</span>
        <span>{size} MB</span>
      </div>
    </div>
  );
};

export default Folder;
