import File from "../models/File.js";
import bcrypt from "bcryptjs";

// Upload a new file
export const uploadFile = async (req, res) => {
  const { description, parentFolder, isPasswordProtected, password } = req.body;
  const file = req.file;
  const ownerId = req.user._id;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded." });
  }

  try {
    let hashedPassword = null;
    if (isPasswordProtected && password) {
      const salt = await bcrypt.genSalt(10);
      hashedPassword = await bcrypt.hash(password, salt);
    }
    const newFile = new File({
      name: file.filename,
      fileId: file._id,
      size: file.size,
      description,
      parentFolder: parentFolder || null,
      isPasswordProtected,
      password: hashedPassword,
      owner: ownerId,
    });

    await newFile.save();

    res.status(201).json(newFile);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const shareFile = async (req, res) => {
  const { fileId, userIdToShare } = req.body;

  try {
    const file = await File.findById(fileId);

    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    file.sharedWith.push(userIdToShare);
    await file.save();
    res.status(200).json({ message: "File shared successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getFileDetails = async (req, res) => {
  const { fileId } = req.params;

  try {
    const file = await File.findById(fileId).populate("owner sharedWith parentFolder");
    if (!file) {
      return res.status(404).json({ message: "File not found" });
    }
    res.status(200).json(file);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};