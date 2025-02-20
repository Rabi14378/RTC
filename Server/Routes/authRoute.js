import { Router } from "express";
import { Registration, verifyToken } from "../Controller/userController.js";

const router = Router();
router.get("/register", Registration);
router.post("/verify/:verificationToken", verifyToken);

export default router;
