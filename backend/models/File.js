import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    required: true,
  },
  fileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  description: {
    type: String,
  },
  parentFolder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Folder",
    default: null,
  },
  isPasswordProtected: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String, // hashed if protected
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

fileSchema.index({ name: 1, parentFolder: 1 }, { unique: true });

export default mongoose.model("File", fileSchema);
