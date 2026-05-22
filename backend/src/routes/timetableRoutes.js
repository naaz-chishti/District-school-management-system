import express from "express";

import {
  addTimetable,
  getTimetable
} from "../controllers/timetableController.js";

import {
  protect,
  authorizeRoles
} from "../middleware/authMiddleware.js";

const router = express.Router();

// Add Timetable
router.post(
  "/add",
  protect,
  authorizeRoles(
    "district_admin",
    "school_admin"
  ),
  addTimetable
);

// View Timetable
router.get(
  "/all",
  protect,
  getTimetable
);

export default router;