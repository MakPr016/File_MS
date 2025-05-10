const express = require("express");
const { createFolder, shareFolder, getFolders, getSharedFolders } = require("../controllers/folderController.js");
const { protect } = require("../middlewares/authMiddleware.js"); // Assume JWT protection

const router = express.Router();

router.get("/", protect, getFolders);
router.post("/create", protect, createFolder);
router.post("/share", protect, shareFolder);
router.get("/shared", protect, getSharedFolders);


module.exports = router;

