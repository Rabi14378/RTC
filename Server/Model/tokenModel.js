import { Schema, model } from "mongoose";

const tokenSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    token: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now() + 7 * 24 * 60 * 60 * 1000,
    },
  },
  { timestamps: true }
);

export const Token = model("Token", tokenSchema);
