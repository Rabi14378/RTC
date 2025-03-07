import asyncHandler from "express-async-handler";
import User from "../Model/userModel";
import { Conversation } from "../Model/conversationModel";
import { Message } from "../Model/messageModel";

export const findUsers = asyncHandler(async (req, res) => {
  if (!req.body.userQuery) {
    res.status(400);
    throw new Error("enter something to search you fool!!");
  }
  const user = await User.find({ name: req.body.userQuery }).select(
    "_id name avatar"
  );
  if (!user) {
    res.status(404);
    throw new Error("no users found");
  }
  res.status(200).json(user);
});

export const addUser = asyncHandler(async (req, res) => {
  //todo: check for valid mongoose id aswell maybe!!
  const { userId } = req.params;
  if (!userId) {
    res.status(400);
    throw new Error("no user id ");
  }
  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error(`no user with user id: ${userId} found`);
  }
  const conversation = await Conversation.create({
    participants: [req.user._id, userId],
  });
  res.redirect(`/getConversation/${conversation._id}`);
});

export const getConversation = asyncHandler(async (req, res) => {
  const conversation = await Conversation.findById(req.params.conversationId);

  if (!conversation) {
    res.status(404);
    throw new Error("no conversation could be found");
  }
  const messages = await Message.find({ conversationId: conversation._id })
    .popuate("senderId", "_id name avatar")
    .sort("-createdAt");

  res.status(200).json(messages);
});

export const getConversations = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const conversations = await Conversation.find({
    participants: userId,
  })
    .populate({
      path: "participants",
      select: "_id name avatar",
      match: { _id: { $ne: userId } },
    })
    .sort("updatedAt");
  res.status(200).json(conversations);
});
