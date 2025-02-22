import mongoose, { Schema, model } from "mongoose";

const messageSchema = Schema(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      require: true,
    },
    content: {
      type: String,
      require: true,
    },
  },
  { timeStamp: true }
);

export const Message = model("Message", messageSchema);
