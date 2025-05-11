import Folder from "../models/Folder.js";
import File from "../models/File.js";
import bcrypt from "bcryptjs";

// Create new folder
export const createFolder = async (req, res) => {
  const { name, parentFolder, isPasswordProtected, password } = req.body;
  const ownerId = req.user._id; // Assuming JWT middleware adds `user` to req

  try {
    let hashedPassword = null;

    if (isPasswordProtected && password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }

    const newFolder = new Folder({
      name,
      parentFolder: parentFolder || null,
      isPasswordProtected,
      password: hashedPassword,
      owner: ownerId,
    });

    await newFolder.save();

    res.status(201).json(newFolder);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Optional: Add user to sharedWith
export const shareFolder = async (req, res) => {
  const { folderId, userIdToShare } = req.body;

  try {
    const folder = await Folder.findById(folderId);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    folder.sharedWith.push(userIdToShare);
    await folder.save();

    res.status(200).json({ message: "Folder shared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all folders created by the user
export const getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({ owner: req.user.id });

    const foldersWithDetails = await Promise.all(
      folders.map(async (folder) => {
        const files = await File.find({ parentFolder: folder._id });
        const fileCount = files.length;
        const size = files.reduce((acc, file) => acc + file.size, 0); // size in bytes

        return {
          ...folder.toObject(),
          fileCount,
          size,
        };
      })
    );

    res.json(foldersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve folders" });
  }
};

// Get all folders shared with the current user
export const getSharedFolders = async (req, res) => {
  try {
    const userId = req.user._id;

    const sharedFolders = await Folder.find({ sharedWith: userId });

    const foldersWithDetails = await Promise.all(
      sharedFolders.map(async (folder) => {
        const files = await File.find({ parentFolder: folder._id });
        const fileCount = files.length;
        const size = files.reduce((acc, file) => acc + file.size, 0); // size in bytes

        return {
          ...folder.toObject(),
          fileCount,
          size,
        };
      })
    );

    res.status(200).json(foldersWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to retrieve shared folders" });
  }
};

export const getFolderContents = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const rawFolders = await Folder.find({ parentFolder: id, owner: userId });
    const files = await File.find({ parentFolder: id, owner: userId });

    const folders = await Promise.all(
      rawFolders.map(async (folder) => {
        const folderFiles = await File.find({ parentFolder: folder._id });
        const fileCount = folderFiles.length;
        const size = folderFiles.reduce((acc, file) => acc + file.size, 0);

        return {
          ...folder.toObject(),
          fileCount,
          size,
        };
      })
    );

    res.status(200).json({ folders, files });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const deleteFolder = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;
  try {
    const folder = await Folder.findById(id);
    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }
    if (!folder.owner.equals(userId)) {
      return res.status(403).json({ message: "Not authorized to delete this folder" });
    }
    await File.deleteMany({ parentFolder: id });
    await Folder.findByIdAndDelete(id);
    res.status(200).json({ message: "Folder deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
