import { Router } from "express";
import {
  getUser,
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
router.get("/getuser", getUser);

export default router;
