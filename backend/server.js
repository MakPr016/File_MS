import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import methodOverride from "method-override";
import connectDB from "./config/db.js";
import File from "./models/File.js";
import Folder from "./models/Folder.js";
import {protect} from "./middlewares/authMiddleware.js";

import userRoutes from "./routes/userRoute.js";
import fileRoutes from "./routes/fileRoute.js";
import folderRoutes from "./routes/folderRoute.js";

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: "*",
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.get("/", (req, res) => {
  res.send("API is running...");
});

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/folders", folderRoutes);

// Search endpoint
app.get("/api/search", protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const q = req.query.q?.toLowerCase();

    if (!q) {
      return res.status(400).json({ message: 'Query param "q" is required' });
    }

    const files = await File.find({
        owner: userId,
        name: { $regex: q, $options: "i" }, 
        }).populate("parentFolder", "name");;
    const folders = await Folder.find({
        owner: userId,
        name: { $regex: q, $options: "i" } 
        }).populate("parentFolder", "name");
    
    const formatResults = (items) =>
      items.map((item) => ({
        _id: item._id,
        name: item.name,
        parentFolderName: item.parentFolder ? item.parentFolder.name : "Root",
    }));

    res.json({
      files: formatResults(files),
      folders: formatResults(folders),
    });
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}/`);
});
