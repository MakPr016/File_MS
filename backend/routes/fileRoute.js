const express = require("express");
const { uploadFile, shareFile } = require("../controllers/fileController.js");
const { upload, handleGridFsUpload  } = require("../middlewares/upload.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.post("/upload", protect, upload, handleGridFsUpload , uploadFile);
router.post("/share", protect, shareFile);

module.exports = router;

