import Folder from "./Folder";
import File from "./File";
import FolderProtected from "./FolderProtected";

const FolderSection = ({ folderName = "My Folders", folders = [], files = [] }) => {
  const formatSizeInMB = (bytes) => {
    const sizeInMB = bytes / (1024 * 1024); 
    return `${sizeInMB.toFixed(2)} MB`;
  };

  const isEmpty = folders.length === 0 && files.length === 0;

  return (
    <section className="bg-blue-100 p-6 rounded-lg w-full">
      <h1 className="text-lg font-semibold mb-2">{folderName}</h1>
      <hr className="border-blue-300 mb-4" />

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 w-full">
        {isEmpty ? (
          <p>No files or folders in this section</p>
        ) : (
          <>
            {folders.map((folder) => {
              const formattedSize = formatSizeInMB(folder.size);
              return (
                folder.isPasswordProtected ? (
                    <FolderProtected
                      name={folder.name}
                      fileCount={folder.fileCount}
                      folderId={folder._id}
                      size={formattedSize}
                      className="w-full"
                      key={folder._id}
                      />
                    ) : (
                      <Folder
                      name={folder.name}
                      folderId={folder._id}
                      key={folder._id}
                      fileCount={folder.fileCount}
                      size={formattedSize}
                      className="w-full"
                    />
                  )
              );
            })}

            {files.map((file) => (
                <File
                  name={file.name}
                  size={file.size}
                  fileId={file._id}
                  key={file._id}
                  isPasswordProtected={file.isPasswordProtected}
                  className="w-full"
                />
            ))}
          </>
        )}
      </div>
    </section>
  );
};

export default FolderSection;
