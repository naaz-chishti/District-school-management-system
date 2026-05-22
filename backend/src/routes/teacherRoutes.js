import express from "express";

import {
  addTeacher,
  getTeachers
} from "../controllers/teacherController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Teacher
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addTeacher
);

// Get Teachers
router.get(
  "/all",
  protect,
  getTeachers
);

export default router;