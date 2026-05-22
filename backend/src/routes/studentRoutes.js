import express from "express";

import {
  addStudent,
  getStudents
} from "../controllers/studentController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Student
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addStudent
);

// Get Students
router.get(
  "/all",
  protect,
  getStudents
);

export default router;