import express from "express";
const router = express.Router();
import { register, login, verifyEmail } from "../controllers/Auth.js";
router.post("/register", register);
router.post("/login", login);
router.get("/verify-email/:token", verifyEmail);
export default router;
