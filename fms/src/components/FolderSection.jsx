import { useState } from "react";
import Folder from "./Folder";
import File from "./File";
import FolderProtected from "./FolderProtected";

const FolderSection = ({ folderName = "My Folders", folders = [], files = [] }) => {
  const [folderList, setFolderList] = useState(folders);
  const [fileList, setFileList] = useState(files);

  const formatSizeInMB = (bytes) => {
    const sizeInMB = bytes / (1024 * 1024);
    return `${sizeInMB.toFixed(2)} MB`;
  };

  const handleAction = (action, result) => {
    const { id, name } = result;

    if (action === "delete") {
      setFolderList((prev) => prev.filter((f) => f._id !== id));
      setFileList((prev) => prev.filter((f) => f._id !== id));
    }

    if (action === "rename") {
      setFolderList((prev) =>
        prev.map((f) => (f._id === id ? { ...f, name } : f))
      );
      setFileList((prev) =>
        prev.map((f) => (f._id === id ? { ...f, name } : f))
      );
    }
  };

  const isEmpty = folderList.length === 0 && fileList.length === 0;

  return (
    <section className="bg-blue-100 p-6 rounded-lg w-full">
      <h1 className="text-lg font-semibold mb-2">{folderName}</h1>
      <hr className="border-blue-300 mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {isEmpty ? (
          <p>No files or folders in this section</p>
        ) : (
          <>
            {folderList.map((folder) => {
              const formattedSize = formatSizeInMB(folder.size);
              const commonProps = {
                name: folder.name,
                folderId: folder._id,
                fileCount: folder.fileCount,
                size: formattedSize,
                onAction: handleAction,
              };

              return folder.isPasswordProtected ? (
                <FolderProtected key={folder._id} {...commonProps} />
              ) : (
                <Folder key={folder._id} {...commonProps} />
              );
            })}

            {fileList.map((file) => (
              <File
                key={file._id}
                name={file.name}
                size={file.size}
                fileId={file._id}
                isPasswordProtected={file.isPasswordProtected}
                onAction={handleAction}
              />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default FolderSection;
