import express from "express";

import {
  addStudent,
  getStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent
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
    "school_admin",
    "teacher"
  ),
  addStudent
);

// Get Students
router.get(
  "/all",
  protect,
  getStudents
);

router.get(
  "/:id",
  protect,
  getSingleStudent
);

// Update Student
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  updateStudent
);

// Delete Student
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteStudent
);



export default router;