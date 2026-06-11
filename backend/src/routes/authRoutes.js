import express from "express";
import {
  register,
  login,
  changePassword,
  resetPassword
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put(
  "/change-password/:id",
  changePassword
);
router.put(
  "/reset-password",
  resetPassword
);

export default router;