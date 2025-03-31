import { MoreVertical } from "lucide-react";
import { FaFolder, FaLock } from "react-icons/fa";

const FolderProtected = () => {
  return (
    <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex flex-col gap-3 w-full">
      {/* Header: Folder Icon & More Options */}
      <div className="flex justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <FaFolder className="text-2xl" />
        </div>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>

      {/* Folder Name */}
      <h2 className="text-lg font-semibold">Folder Name</h2>

      {/* Protected Label */}
      <div className="flex items-center text-green-500 gap-1">
        <FaLock className="text-sm" />
        <span className="text-sm text-gray-600">Protected</span>
      </div>

      {/* File Info */}
      <div className="text-sm text-gray-500 flex gap-2">
        <span>10 Files</span>
        <span>|</span>
        <span>2.50 MB</span>
      </div>
    </div>
  );
};

export default FolderProtected;
