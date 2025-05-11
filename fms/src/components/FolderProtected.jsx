import { MoreVertical } from "lucide-react";
import { FaFolder } from "react-icons/fa";
import { Link } from "react-router-dom";

const FolderProtected = ({ name, folderId, fileCount, size }) => {
  return (
    <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <FaFolder className="text-2xl" />
        </div>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>
      <Link to={`/folder/${folderId}`} key={folderId}>
      <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
      </Link>
      <div className="text-sm text-gray-500 flex gap-2">
        <span>{fileCount} Files</span>
        <span>|</span>
        <span>{size}</span>
      </div>
      <div className="text-sm text-red-500 mt-2">Protected</div>
    </div>
  );
};

export default FolderProtected;
