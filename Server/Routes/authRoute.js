import { Router } from "express";
import { Registration } from "../Controller/userController.js";

const router = Router();
router.get("/register", Registration);

export default router;
