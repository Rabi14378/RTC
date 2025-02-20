import { Router } from "express";
import {
  login,
  logout,
  Registration,
  verifyToken,
} from "../Controller/userController.js";

const router = Router();
router.post("/register", Registration);
router.post("/verify/:verificationToken", verifyToken);
router.post("/login", login);
router.post("/logout", logout);

export default router;
