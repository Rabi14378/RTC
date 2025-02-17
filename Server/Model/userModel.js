import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field cannot be empty"],
  },
  email: {
    type: String,
    required: [true, "please add a email"],
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, "please add a password"],
    minLength: [8, "password must be up to 8 characters"],
  },
  avatar: {
    type: String,
    default: "",
  },
  status: {
    type: String,
    enum: ["online", "offline"],
    default: "offline",
  },
  lastSeen: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
