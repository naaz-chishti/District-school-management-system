import express from "express";

import {
  markAttendance,
  getAttendance,
  updateAttendance,
  deleteAttendance
} from "../controllers/attendanceController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router =
  express.Router();

// Mark Attendance
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

// Get Attendance
router.get(
  "/all",
  protect,
  getAttendance
);

// Update Attendance
router.put(
  "/update/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin",
    "teacher"
  ),
  updateAttendance
);

// Delete Attendance
router.delete(
  "/delete/:id",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  deleteAttendance
);

export default router;