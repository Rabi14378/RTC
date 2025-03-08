import Protect from "../middleWares/authMiddleware.js";
import {
  addUser,
  findUsers,
  getConversation,
  getConversations,
} from "../Controller/userController.js";
import { Router } from "express";
const router = Router();

router.get("/finduser", Protect, findUsers);
router.get("/adduser", Protect, addUser);
router.get("/conversation/:conversationId", Protect, getConversation);
router.get("/conversations", Protect, getConversations);

export default router;
