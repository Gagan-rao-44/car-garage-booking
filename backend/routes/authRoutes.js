import express from "express";
import { registerUser, loginUser, adminLoginUser } from "../controllers/authController.js";
import { forgotPassword } from "../controllers/authController.js";
import { resetPassword } from "../controllers/authController.js";




const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/admin/login", adminLoginUser);
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);

export default router;