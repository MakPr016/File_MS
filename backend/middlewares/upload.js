import multer from "multer";
import { GridFSBucket } from "mongodb";
import crypto from "crypto";
import path from "path";
import fs from "fs";
import mongoose from "mongoose";

const db = mongoose.connection;
let gfsBucket;

db.once("open", () => {
  gfsBucket = new GridFSBucket(db.db, { bucketName: "uploads" });
});

const tempStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const tempPath = "./temp";
    if (!fs.existsSync(tempPath)) fs.mkdirSync(tempPath);
    cb(null, tempPath);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = crypto.randomBytes(8).toString("hex") + path.extname(file.originalname);
    cb(null, uniqueSuffix);
  },
});

const uploadMiddleware = multer({ storage: tempStorage });

export const upload = uploadMiddleware.single("file");

// Custom middleware after multer to upload to GridFS
export const handleGridFsUpload = async (req, res, next) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const { originalname, mimetype, path: filePath } = req.file;
  const filename = req.body.customName
    ? req.body.customName + path.extname(originalname)
    : originalname;

  const uploadStream = gfsBucket.openUploadStream(filename, {
    contentType: mimetype,
  });

  fs.createReadStream(filePath)
    .pipe(uploadStream)
    .on("error", (err) => {
      console.error("GridFS upload error:", err);
      return res.status(500).send("Error uploading file to DB");
    })
    .on("finish", function () {
      const stats = fs.statSync(filePath);
      const size = stats.size;
      fs.unlinkSync(filePath); // Clean temp file
      req.file = {
        filename: filename,
        contentType: mimetype,
        _id: this.id,
        size: size,
      };
      next();
    });    
};
