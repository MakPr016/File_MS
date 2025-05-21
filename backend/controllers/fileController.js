import File from "../models/File.js";
import bcrypt from "bcryptjs";
import { GridFSBucket, ObjectId } from "mongodb";
import mongoose from "mongoose";

let gfsBucket;
const db = mongoose.connection;
db.once("open", () => {
  gfsBucket = new GridFSBucket(db.db, { bucketName: "uploads" });
});

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

// share a file with another user using their user ID
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

// get details of a single file using fileID 
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

export const deleteFile = async (req, res) => {
  const {fileId} = req.params;
  try {
    const file = await File.findByIdAndDelete(fileId);
    if(!file){
      return res.status(404).json({ message: "File not found" });
    }

    if (file.fileId) {
      try {
        await gfsBucket.delete(new ObjectId(file.fileId));
      } catch (err) {
        console.error("Failed to delete from GridFS:", err.message);
      }
    }

    res.status(200).json({ message: "File deleted successfully" });
  }
  catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

export const downloadFile = async (req, res) => {
  const { fileId } = req.params;

  try {
    const fileMeta = await File.findById(fileId);
    if (!fileMeta) {
      return res.status(404).json({ message: "File metadata not found" });
    }
    const file = await gfsBucket.find({ _id: new ObjectId(fileMeta.fileId) }).next();
    if (!file) {
      return res.status(404).json({ message: "File not found in storage" });
    }
    res.set("Content-Type", file.contentType || "application/octet-stream");
    res.set("Content-Disposition", `attachment; filename="${fileMeta.name}"`);
    res.setHeader("Access-Control-Expose-Headers", "Content-Disposition");
    gfsBucket.openDownloadStream(new ObjectId(fileMeta.fileId)).pipe(res);
  } catch (err) {
    console.error("Download error:", err);
    res.status(500).json({ message: "Download failed", error: err.message });
  }
};
