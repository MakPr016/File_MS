const express = require("express");
const { uploadFile, shareFile, getFileDetails, deleteFile, downloadFile } = require("../controllers/fileController.js");
const { upload, handleGridFsUpload  } = require("../middlewares/upload.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/:fileId", protect, getFileDetails);
router.post("/upload", protect, upload, handleGridFsUpload , uploadFile);
router.post("/share", protect, shareFile);
router.delete("/delete/:fileId", protect, deleteFile);
router.get("/files/:fileId/download", protect, downloadFile);

module.exports = router;

