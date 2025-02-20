import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
  isVerified: { type: Boolean, default: false },
  lastSeen: { type: Date, default: Date.now },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

export const User = mongoose.model("User", userSchema);
