import { MoreVertical, Lock } from "lucide-react";
import { FaFileAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  else if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
  else return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const getFileType = (fileName) => {
  const parts = fileName.split(".");
  return parts.length > 1 ? parts.pop() : "unknown";
};

const File = ({ name, size, fileId, isPasswordProtected }) => {
  const fileType = getFileType(name);
  const formattedSize = formatFileSize(size);

  return (
    <div className="bg-blue-50 p-6 rounded-2xl shadow-md flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center">
        <div className="bg-blue-500 text-white p-2 rounded-lg">
          <FaFileAlt className="text-2xl" />
        </div>
        <MoreVertical className="text-gray-500 cursor-pointer" />
      </div>

      <Link to={`/file/${fileId}`} key={fileId}>
      <h2 className="text-md font-semibold text-gray-900 break-words">{name}</h2>
      </Link>
      <div className="text-sm text-gray-500 flex gap-2 items-center flex-wrap">
        <span>{fileType.toUpperCase()}</span>
        <span>|</span>
        <span>{formattedSize}</span>
        {isPasswordProtected && (
          <>
            <span>|</span>
            <Lock size={14} className="text-gray-500" />
            <span>Protected</span>
          </>
        )}
      </div>
    </div>
  );
};

export default File;
