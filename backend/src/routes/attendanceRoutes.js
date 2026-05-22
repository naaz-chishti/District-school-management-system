import express from "express";

import {
  markAttendance,
  getAttendance
} from "../controllers/attendanceController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Teacher/Admin Mark Attendance
router.post(
  "/mark",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  markAttendance
);

// View Attendance
router.get(
  "/all",
  protect,
  getAttendance
);

export default router;