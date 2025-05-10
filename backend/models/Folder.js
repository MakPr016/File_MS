import mongoose from "mongoose";

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null, // root if null
  },
  isPasswordProtected: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String, // hashed
    default: null,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  sharedWith: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
}, {
  timestamps: true,
});

export default mongoose.model("Folder", folderSchema);
