import { Router } from "express";
import {
  getUser,
  login,
  logout,
  Registration,
  verifyToken,
} from "../Controller/manualAuthController.js";
import { Protect } from "../middleWares/authMiddleware.js";

const router = Router();
router.post("/register", Registration);
router.post("/verify/:verificationToken", verifyToken);
router.post("/login", login);
router.post("/logout", logout);
router.get("/getuser", Protect, getUser);

export default router;
