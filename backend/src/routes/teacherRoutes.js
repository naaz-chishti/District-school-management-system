import express from "express";

import {
  addTeacher,
  getTeachers,
  updateTeacher,
  deleteTeacher
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

// Update Teacher
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  updateTeacher
);

// Delete Teacher
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteTeacher
);

export default router;