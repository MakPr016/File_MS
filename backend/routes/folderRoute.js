const express = require("express");
const { createFolder, shareFolder, getFolders, getSharedFolders, getFolderContents, deleteFolder } = require("../controllers/folderController.js");
const { protect } = require("../middlewares/authMiddleware.js");

const router = express.Router();

router.get("/", protect, getFolders);
router.post("/create", protect, createFolder);
router.post("/share", protect, shareFolder);
router.get("/shared", protect, getSharedFolders);
router.get("/:id", protect, getFolderContents);
router.delete("/delete/:id", protect, deleteFolder);


module.exports = router;

